# Handoff — Issue Tracker Phase 2

Dernière mise à jour : 2026-08-16, session Claude Code.
Repo : `https://github.com/seilixx/issue-tracker-internship.git` (privé)
Branche courante : **`beta`**
Spec de référence : `docs/Issue_Tracker_Phase2_Spec.docx` (9 features backend + brief frontend)

Ce fichier sert à reprendre le travail dans une autre session Claude Code sans
perdre le contexte. Donne-le à lire en premier avant de continuer.

---

## 1. État global

Backend Java 17+/Spring Boot 4.1.0/Spring Data JPA/PostgreSQL dans `backend/`.
Frontend React 19 + Vite + TypeScript (pas de Tailwind, CSS Modules + design
tokens maison) dans `frontend/`, reconstruit de zéro cette session en suivant
le sprint 3 du spec.

Features du spec Phase 2 :

| # | Feature | Statut |
|---|---|---|
| — | Réparation compilation cassée | ✅ fait |
| 2 | Rôles admin/manager/user + `@PreAuthorize` | ✅ fait |
| 3 | Catégorie + leader de projet | ✅ fait |
| 7 | Fermeture d'issue (closed_by/closed_at, statut terminal) | ✅ fait |
| 1 | Attachments (upload/liste/suppression/téléchargement) | ✅ fait |
| 4 | Commentaires en thread (parent_comment_id, soft-delete) | ✅ fait |
| 5 | Profil utilisateur + recherche (paginés) | ✅ fait |
| 6 | Tri + pagination sur la liste d'issues | ✅ fait |
| 8 | Vue détail complète (attachments + N+1) | ✅ fait côté code — vérif runtime anti-`MultipleBagFetchException` jamais faite contre une vraie DB (voir §5) |
| 9 | Visibilité vs permission d'écriture | ✅ fait (audit complet + 2 failles corrigées) |
| 10 | Édition de profil + avatar | ✅ fait cette session (backend + frontend) |
| — | Frontend (sprint 3 du spec) | ✅ fait : design tokens/thème, layout shell, board+liste, panneau de détail, profil/édition/recherche, passe de polish |

Aucune migration Flyway/Liquibase — le schéma est géré par `ddl-auto=update`
en dev, `validate` en prod (voir §6).

**Le point le plus important pour la suite** : il n'y a **aucune authentification
réelle** côté frontend (pas de login/JWT). Toute l'app tourne contre un
`CURRENT_USER` simulé en dur (`frontend/src/features/users/currentUser.ts`,
uuid `current-user-mock-uuid`, rôle `USER`). C'est la feature qui débloquerait
le plus de choses si une session future s'y attaque : connecter le vrai flux
JWT existant côté backend (`AuthenticationController`/`JwtService`, déjà
fonctionnels) au frontend, remplacer `CURRENT_USER` par le principal
réellement authentifié, et faire suivre `apiClient.ts` (le token
`issuetracker-auth-token` en localStorage est déjà prévu comme placeholder).

---

## 2. Conventions établies côté backend

- **Package-by-layer** : `entity`, `repository`, `service`, `controller`, `dto`, `security`, `exception`.
- **DTOs** : classes Lombok `@Data`, jamais de `record`. Validation via `@NotBlank`/`@NotNull` + `@Valid` dans les controllers.
- **Réponses** : toujours enveloppées dans `GenericType<T>{success, message, data}`.
- **Pagination** : wrapper maison `PagedResponse<T>{content, page, size, totalElements, totalPages}`.
- **Séparation update DTO / permission** : un champ qui a besoin d'une permission plus stricte que le reste d'un endpoint d'édition générale sort du DTO général et passe par un PATCH dédié. Exemples : `ProjectUpdateRequest` (pas de `category`) + `PATCH /api/projects/{id}/category` (admin-only) ; `IssueUpdateRequest` (pas de `status`) + `PATCH /api/issues/{id}/status`.
- **Sécurité par ownership** : beans `@Component("xxxSecurity")` (`IssueSecurity`, `AttachmentSecurity`, `CommentSecurity`) référencés dans `@PreAuthorize("hasAnyRole('ADMIN','MANAGER') or @xxxSecurity.method(#id, authentication)")`. `#id` fonctionne directement (compile avec `-parameters`).
- **Deux périmètres de permission distincts sur les issues** (feature 9) :
  - `IssueSecurity.isCreatorOrAssignee` (reporter/assigné/manager/admin) → commenter, changer le statut.
  - `IssueSecurity.isCreatorOrAssigneeOrProjectLeader` (+ leader du projet) → éditer les champs de l'issue, attacher un fichier.
- **Avatars** : même pattern que les attachments — on ne stocke jamais d'URL publique en dur, seulement `avatarStoragePath`/`avatarContentType` sur `User`, et `UserDto.avatarUrl` est **calculé** dynamiquement (`/api/users/{uuid}/avatar` si un avatar existe, sinon `null`). Réutilise `FileStorageService` (upload) mais avec un allowlist image-only et un cap de taille propres (3MB), séparés de l'allowlist générale des attachments.
- **GlobalExceptionHandler** — mapping : `ResourceNotFoundException`→404, `AccessDeniedException`→403, `IssueClosedException`→409, `MaxUploadSizeExceededException`→413, `MethodArgumentNotValidException`→400, `RuntimeException`→400, `Exception`→500.
- **Chaque service mappe ses propres DTOs** — pas d'appel service→service (duplication assumée, pattern déjà en place).

### Pièges Spring Boot 4.1.0
- `spring-boot-starter-webmvc` (pas `-web`), `spring-boot-starter-data-jpa-test`/`spring-boot-starter-webmvc-test` : noms **corrects** en Boot 4.
- `@WebMvcTest` → `org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest`.
- `@MockBean` → `@MockitoBean`. Pour un bean nommé, il faut **explicitement** `@MockitoBean(name = "issueSecurity")` sinon `@PreAuthorize` ne résout pas le SpEL au runtime (pas d'erreur à la compilation).

---

## 3. Feature 10 — Édition de profil + avatar (backend, ajouté cette session)

Le backend n'avait **rien** pour cette feature avant cette session (pas de
`avatarUrl`/`bio` sur `User`, pas d'endpoint `/me`). Ajouté :

- `User` : `bio`, `avatarStoragePath`, `avatarContentType` (tous nullable, pas de backfill nécessaire).
- `UserDto` : `bio` + `avatarUrl` (calculé, voir §2).
- `UpdateProfileRequest{firstName, lastName, bio}` — username **non éditable** via cet endpoint (choix de scope, pas demandé).
- `GET /api/users/me`, `PATCH /api/users/me`, `POST /api/users/me/avatar` (multipart, champ `file`, image uniquement, 3MB max), `GET /api/users/{uuid}/avatar` (stream, pas de restriction au-delà de `authenticated()`, cohérent avec la règle de lecture ouverte de la feature 9).
- `UserService` : `getMyProfile`/`updateMyProfile`/`updateMyAvatar`/`downloadAvatar`, toutes résolvent l'utilisateur courant via `SecurityContextHolder` (même pattern que le reste du code), pas de paramètre uuid — impossible d'éditer le profil de quelqu'un d'autre par construction.

---

## 4. Frontend — architecture et points d'attention

Structure (`frontend/src/`) : `components/` (UI partagée : `EmptyState`, `Skeleton`,
`StatusBadge`, `PriorityIcon`, `AvatarChip`/`AvatarStack`, `ThemeToggle`, icônes,
`layout/` pour `AppShell`/`Sidebar`/`Topbar`/`UserMenu`), `features/{issues,projects,users}/`
(chacune avec `api.ts`, `types.ts`, `hooks/`, `components/`), `providers/` (thème),
`routes/router.tsx`, `utils/` (`apiClient`, `apiTypes`, `format`).

Points à connaître avant de continuer :

- **Permissions calculées côté client** (`features/issues/permissions.ts`) —
  reproduit fidèlement les règles backend de la feature 9, évaluées contre
  `CURRENT_USER` (voir §1). Le backend reste la seule source de vérité ; les
  actions mutantes gèrent un 403/409 en repli (rollback optimiste sur le
  board, bannière d'erreur sur le panneau de détail).
- **Filtre catégorie sur les issues** : le backend n'accepte pas de paramètre
  `category` sur `GET /api/issues` (seulement sur `GET /api/projects`). Le
  filtre "catégorie" du frontend réduit donc juste la liste déroulante
  "projet" — un message explicite s'affiche quand catégorie est choisie sans
  projet précis, pour ne pas laisser croire que ça filtre silencieusement.
- **Pagination du profil** (`GET /users/{uuid}/profile`) : un seul couple
  `page`/`size` s'applique aux deux listes (assignées/fermées) en même temps
  côté backend — pas de pagination indépendante possible sans changer
  l'endpoint. Le frontend affiche un pager partagé, limitation assumée.
- **Panneau de détail d'issue non réutilisable depuis la page profil** —
  les issues listées sur `/profile/:uuid` ne sont pas cliquables (le panneau
  de détail vit dans l'arbre de `IssuesView`, pas remonté plus haut). À faire
  si un jour on veut ouvrir le détail depuis n'importe où : faire remonter
  `openIssueId`/`IssueDetailPanel` au niveau `AppShell`.
- **Cropper d'avatar fait maison** (`features/users/components/AvatarCropper.tsx`)
  — Canvas natif, pas de dépendance externe (zoom + pan, export 320×320 en PNG).
- **Design tokens** : tout dans `frontend/src/index.css` (`:root` = light,
  `[data-theme='dark']` = dark). Thème résolu en `"light"`/`"dark"` explicite
  avant le premier paint (script inline dans `index.html` + `ThemeProvider`),
  persisté dans `localStorage` (`issuetracker-theme`), suit `prefers-color-scheme`
  tant que l'utilisateur n'a pas fait de choix explicite.
- **Alias `@/`** → `frontend/src/` (configuré dans `vite.config.ts` + `tsconfig.app.json`).

### Vérification de cette session

Le vrai backend Java ne peut pas tourner dans cet environnement (pas de
Postgres, pas de docker/WSL disponibles). Toutes les features frontend ont
été testées avec un **serveur mock jetable** (Node `http` natif, hors dépôt,
reproduisant fidèlement le contrat `GenericType`/`PagedResponse`/DTOs) plutôt
que non testées — mais ça reste une simulation, pas une vérification contre
le vrai backend Spring. À refaire dès que Postgres est disponible.

---

## 5. Comment vérifier que tout va bien

Backend :
```bash
cd backend
./mvnw -q compile
./mvnw -q test-compile
./mvnw -q test -Dtest=IssueServiceTest,IssueStatusControllerTest,IssueSecurityTest,CommentSecurityTest,CommentSecurityControllerTest,IssueTrackerApplicationTests
```
- `IssueTrackerApplicationTests` nécessite Postgres local (`jdbc:postgresql://localhost:5432/issuetracker`, credentials dans `application-dev.yml`) — seul test de la liste qui ne passe pas dans cet environnement.
- Vérification runtime anti-`MultipleBagFetchException` sur `IssueRepository.findDetailById` (feature 8) : jamais faite contre une vraie DB, voir §1.

Frontend :
```bash
cd frontend
npm ci          # si node_modules absent
npx tsc -b       # type-check
npx oxlint       # lint
npm run build    # build de production (tsc -b && vite build)
```
Les trois passent proprement à la fin de cette session.

## 6. État de la base Postgres locale (dev) — info d'une session précédente

`ddl-auto=update` ne peut pas ajouter une colonne `NOT NULL` sur une table
qui a déjà des lignes (pas de backfill automatique par Hibernate). Si ça
se reproduit sur une DB existante : `ALTER TABLE ... ADD COLUMN` (nullable)
→ `UPDATE ... SET ... WHERE ... IS NULL` (backfill) → `ALTER TABLE ... ALTER
COLUMN ... SET NOT NULL`. Sur une DB fraîche (table vide), ce problème ne se
pose pas. Les colonnes ajoutées cette session (`User.bio`/`avatarStoragePath`/
`avatarContentType`) sont toutes nullable, donc pas concernées.

## 7. Points connus à traiter plus tard (pas bloquants)

- **Pas d'authentification réelle côté frontend** — voir §1, le point le plus important.
- **Secrets en clair** dans `application-dev.yml` (mot de passe DB, secret JWT par défaut) — préexistant. Repo privé donc pas urgent, mais à sortir en variables d'env avant tout merge/passage en public.
- **Content-type des attachments/avatars** déclaré par le client, pas vérifié par inspection des octets (pas de Tika).
- **Pas de vraie migration DB** (Flyway/Liquibase).
- **Pas de redimensionnement d'avatar côté serveur** (le spec le mentionne comme optionnel — "if you want to keep payloads small") — le crop côté client suffit pour l'instant (sortie fixe 320×320).
- **Recherche globale de la topbar** ne cherche que les utilisateurs (feature 5) — le placeholder dit "issues, projects, people" mais seule la recherche de personnes est branchée.
- **Pas de bouton "créer une issue"** fonctionnel dans la topbar (juste affiché) — la création d'issue passe encore par l'API directement, pas de formulaire dédié construit.

## 8. Breaking changes backend introduits en cours de session (à répercuter côté tests manuels)

- `GET /api/issues` retourne `GenericType<PagedResponse<IssueDto>>` au lieu de `GenericType<List<IssueDto>>`.
- `POST /api/comments` (issueId dans le body) supprimé → remplacé par `POST /api/issues/{id}/comments`.
- `PUT /api/issues/{id}` prend `IssueUpdateRequest` (sans `status`).
- `PUT /api/projects/{id}` prend `ProjectUpdateRequest` (sans `category`).
- `GET /api/users` (liste complète) est admin-only.
- `UserDto` a deux nouveaux champs (`bio`, `avatarUrl`) — non-breaking (additions), mais à savoir si un client existant désérialise strictement.
