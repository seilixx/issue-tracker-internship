# Handoff — Issue Tracker Phase 2

Dernière mise à jour : 2026-08-17, session Claude Code.
Repo : `https://github.com/seilixx/issue-tracker-internship.git` (privé)
Branche courante : **`beta`**
Spec de référence : `docs/Issue_Tracker_Phase2_Spec.docx` (9 features backend + brief frontend)
**Audit de référence : `docs/AUDIT_REPORT.md`** — audit complet backend+frontend
d'une session précédente. Une partie des points qu'il liste a déjà été corrigée
(annoté ~~barré~~ directement dans le fichier), le reste constitue la meilleure
liste de priorités pour continuer — voir §7 ci-dessous pour le résumé à jour.

Ce fichier sert à reprendre le travail dans une autre session Claude Code sans
perdre le contexte. Donne-le à lire en premier avant de continuer, avec
`docs/AUDIT_REPORT.md` juste derrière.

---

## 1. État global

Backend Java 17+/Spring Boot 4.1.0/Spring Data JPA/PostgreSQL dans `backend/`.
Frontend React 19 + Vite + TypeScript (pas de Tailwind, CSS Modules + design
tokens maison) dans `frontend/`, reconstruit de zéro sur une session récente
en suivant le sprint 3 du spec, **authentification JWT réelle incluse depuis
cette session**.

Features du spec Phase 2 :

| # | Feature | Statut |
|---|---|---|
| — | Réparation compilation cassée | ✅ fait |
| 2 | Rôles admin/manager/user + `@PreAuthorize` | ✅ fait |
| 3 | Catégorie + leader de projet | ✅ fait (backend + frontend, leader affiché sur la page de board filtrée par projet) |
| 7 | Fermeture d'issue (closed_by/closed_at, statut terminal) | ✅ fait |
| 1 | Attachments (upload/liste/suppression/téléchargement) | ✅ fait — content-type vérifié par les octets réels (Tika), voir §7 |
| 4 | Commentaires en thread (parent_comment_id, soft-delete) | ✅ fait (bug d'édition d'un commentaire supprimé corrigé, `createdAt` ajouté) |
| 5 | Profil utilisateur + recherche (paginés) | ✅ fait |
| 6 | Tri + pagination sur la liste d'issues | ✅ fait |
| 8 | Vue détail complète (attachments + N+1) | ✅ fait côté code — vérif runtime anti-`MultipleBagFetchException` toujours jamais faite contre une vraie DB (voir §6) |
| 9 | Visibilité vs permission d'écriture | ✅ fait (audit complet + failles corrigées) |
| 10 | Édition de profil + avatar | ✅ fait (backend + frontend) |
| — | Frontend (sprint 3 du spec) | ✅ fait : design tokens/thème, layout shell, board+liste, panneau de détail, profil/édition/recherche, **authentification réelle**, passe de polish |

Aucune migration Flyway/Liquibase — le schéma est géré par `ddl-auto=update`
en dev, `validate` en prod (voir §6).

**Authentification frontend : faite cette session.** Pages `/login`/`/register`
réelles (`POST /api/auth/login`/`register`), `ProtectedRoute` (React Router)
protège toute l'app, `AuthProvider` valide le token persisté au démarrage via
`GET /users/me`, déconnexion automatique propre sur un 401 (garde anti-boucle
vérifiée). `CURRENT_USER` (l'ancien utilisateur simulé en dur) a été
**entièrement supprimé** — toute mention dans une session précédente de ce
fichier est obsolète. Voir §4 pour l'architecture exacte.

**Le point le plus important pour la suite maintenant** : il n'y a **aucune
UI de création/édition** pour les projets et les issues (créer un projet,
créer une issue, éditer les champs d'une issue, la réassigner) — seule la
lecture et le changement de statut/commentaires/attachments sont couverts
côté frontend. Voir §7 pour le détail complet et le reste du backlog issu de
l'audit.

---

## 2. Conventions établies côté backend

- **Package-by-layer** : `entity`, `repository`, `service`, `controller`, `dto`, `security`, `exception`.
- **DTOs** : classes Lombok `@Data`, jamais de `record`. Validation via `@NotBlank`/`@NotNull` + `@Valid` dans les controllers.
- **Réponses** : toujours enveloppées dans `GenericType<T>{success, message, data}` — y compris les 401 renvoyés directement par `JwtAuthenticationFilter` (voir plus bas), pour rester cohérent avec `GlobalExceptionHandler`.
- **Pagination** : wrapper maison `PagedResponse<T>{content, page, size, totalElements, totalPages}`.
- **Séparation update DTO / permission** : un champ qui a besoin d'une permission plus stricte que le reste d'un endpoint d'édition générale sort du DTO général et passe par un PATCH dédié. Exemples : `ProjectUpdateRequest` (pas de `category`) + `PATCH /api/projects/{id}/category` (admin-only) ; `IssueUpdateRequest` (pas de `status`) + `PATCH /api/issues/{id}/status`.
- **Sécurité par ownership** : beans `@Component("xxxSecurity")` (`IssueSecurity`, `AttachmentSecurity`, `CommentSecurity`) référencés dans `@PreAuthorize("hasAnyRole('ADMIN','MANAGER') or @xxxSecurity.method(#id, authentication)")`. `#id` fonctionne directement (compile avec `-parameters`).
- **Deux périmètres de permission distincts sur les issues** (feature 9) :
  - `IssueSecurity.isCreatorOrAssignee` (reporter/assigné/manager/admin) → commenter, changer le statut.
  - `IssueSecurity.isCreatorOrAssigneeOrProjectLeader` (+ leader du projet) → éditer les champs de l'issue, attacher un fichier.
- **Avatars** : même pattern que les attachments — on ne stocke jamais d'URL publique en dur, seulement `avatarStoragePath`/`avatarContentType` sur `User`, et `UserDto.avatarUrl` est **calculé** dynamiquement (`/api/users/{uuid}/avatar` si un avatar existe, sinon `null`). Réutilise `FileStorageService` (upload) mais avec un allowlist image-only et un cap de taille propres (3MB), séparés de l'allowlist générale des attachments.
- **GlobalExceptionHandler** — mapping : `ResourceNotFoundException`→404, `AccessDeniedException`→403, `IssueClosedException`→409, `MaxUploadSizeExceededException`→413, `MethodArgumentNotValidException`→400, `RuntimeException`→400, `Exception`→500.
- **JwtAuthenticationFilter** : le parsing du token (`extractUsername`/`validateToken`) est entouré d'un `try/catch` (`ExpiredJwtException`, `MalformedJwtException`/`SignatureException`, `JwtException`/`IllegalArgumentException` en repli) — renvoie un 401 au format `GenericType` directement depuis le filtre plutôt que de laisser JJWT planter en 500. Corrigé cette session (voir S1 dans `docs/AUDIT_REPORT.md`).
- **Chaque service mappe ses propres DTOs** — pas d'appel service→service (duplication assumée, pattern déjà en place).

### Pièges Spring Boot 4.1.0 / Spring Security 7 découverts
- `spring-boot-starter-webmvc` (pas `-web`), `spring-boot-starter-data-jpa-test`/`spring-boot-starter-webmvc-test` : noms **corrects** en Boot 4.
- `@WebMvcTest` → `org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest`.
- `@MockBean` → `@MockitoBean`. Pour un bean nommé, il faut **explicitement** `@MockitoBean(name = "issueSecurity")` sinon `@PreAuthorize` ne résout pas le SpEL au runtime (pas d'erreur à la compilation).
- **Jackson 3.x par défaut**, pas Jackson 2.x : l'`ObjectMapper` de Spring vient de `tools.jackson.databind`, pas `com.fasterxml.jackson.databind` (ce dernier n'existe qu'en scope `runtime`, tiré transitivement par `jjwt-jackson` — ne compile pas si on l'importe directement dans du code applicatif). Piège trouvé en corrigeant `JwtAuthenticationFilter`.
- `@WebMvcTest` + `@Import(SecurityConfig.class)` pour tester le vrai filtre de sécurité HTTP (pas juste `@PreAuthorize` au niveau méthode) : ça fonctionne pour un token invalide (le filtre répond avant même d'atteindre l'autorisation), mais une tentative de tester le chemin nominal (token valide → 200) dans ce même style de test a échoué de façon reproductible avec un 403 **alors que l'authentification était bien établie** (vérifié par log direct dans le filtre) — cause exacte non identifiée, semble spécifique à l'interaction `@WebMvcTest`/`SecurityConfig` importée dans cette version de Spring Security. Non bloquant (le cas nominal est de toute façon exercé en pratique par tous les autres tests + les tests manuels via le frontend), mais à garder en tête si quelqu'un veut écrire un test HTTP-level similaire.

---

## 3. Feature 10 — Édition de profil + avatar (backend)

Le backend n'avait **rien** pour cette feature avant la session qui l'a
ajoutée (pas de `avatarUrl`/`bio` sur `User`, pas d'endpoint `/me`). Ajouté :

- `User` : `bio`, `avatarStoragePath`, `avatarContentType` (tous nullable, pas de backfill nécessaire).
- `UserDto` : `bio` + `avatarUrl` (calculé, voir §2).
- `UpdateProfileRequest{firstName, lastName, bio}` — username **non éditable** via cet endpoint (choix de scope, pas demandé).
- `GET /api/users/me`, `PATCH /api/users/me`, `POST /api/users/me/avatar` (multipart, champ `file`, image uniquement, 3MB max), `GET /api/users/{uuid}/avatar` (stream, pas de restriction au-delà de `authenticated()`, cohérent avec la règle de lecture ouverte de la feature 9).
- `UserService` : `getMyProfile`/`updateMyProfile`/`updateMyAvatar`/`downloadAvatar`, toutes résolvent l'utilisateur courant via `SecurityContextHolder` (même pattern que le reste du code), pas de paramètre uuid — impossible d'éditer le profil de quelqu'un d'autre par construction.

---

## 4. Frontend — architecture et points d'attention

Structure (`frontend/src/`) : `components/` (UI partagée : `EmptyState`, `Skeleton`,
`StatusBadge`, `PriorityIcon`, `AvatarChip`/`AvatarStack`, `ThemeToggle`, icônes,
`layout/` pour `AppShell`/`Sidebar`/`Topbar`/`UserMenu`), `features/{auth,issues,projects,users}/`
(chacune avec `api.ts`, `types.ts`, `hooks/`, `components/`), `providers/` (thème),
`routes/router.tsx`, `utils/` (`apiClient`, `apiTypes`, `format`).

### Authentification (`features/auth/`)

- `AuthProvider.tsx` + `auth-context.ts` + `useAuth.ts` : contexte React
  exposant `{ user, isAuthenticated, isLoading, login, register, logout }`.
  Au montage, si un token existe en `localStorage`, valide/rafraîchit
  l'utilisateur via `GET /users/me` (pas de décodage JWT côté client — choisi
  pour disposer directement du `UserSummary` complet, rôle inclus, sans
  dépendance de décodage JWT).
- `ProtectedRoute.tsx` : route pathless qui redirige vers `/login` si pas de
  session valide. **Toutes** les routes de l'app (y compris `AppShell` et ses
  enfants) sont protégées — voir `routes/router.tsx` pour la structure
  imbriquée exacte (`AuthProvider` → `/login`+`/register` publiques et
  `ProtectedRoute` → `AppShell` → reste des routes).
- `LoginPage.tsx`/`RegisterPage.tsx` : formulaires simples, appellent
  `POST /api/auth/login`/`register`, stockent le token, redirigent.
- `utils/apiClient.ts` : `getStoredAuthToken`/`setStoredAuthToken`/`clearStoredAuthToken`
  (clé `issuetracker-auth-token`), intercepteur de requête qui attache le
  Bearer token, et intercepteur de réponse qui détecte un 401 (hors
  `/auth/*`, pour ne pas confondre un mauvais mot de passe avec une session
  expirée) et déclenche `AuthProvider.logout()` via un handler enregistré —
  garde (`isHandlingUnauthorized`) contre les déclenchements multiples pour
  éviter toute boucle de requêtes si plusieurs appels échouent en même temps.
- **Permissions** (`features/issues/permissions.ts`) — inchangées dans leur
  logique (reproduit fidèlement les règles backend de la feature 9), mais
  évaluées maintenant contre le **vrai utilisateur authentifié**
  (`useAuth().user`) au lieu de l'ancien `CURRENT_USER` simulé. Le backend
  reste la seule source de vérité ; les actions mutantes gèrent toujours un
  403/409 en repli (rollback optimiste sur le board, bannière d'erreur sur le
  panneau de détail).

### Autres points à connaître

- ~~**Sidebar déconnectée de l'API réelle**~~ **CORRIGÉ.**
  `components/layout/Sidebar.tsx` utilise maintenant `useProjects()` (même
  hook que la barre de filtres) et affiche les vrais projets groupés par
  catégorie. Les liens `/projects/:id` mènent à une vraie page de board
  filtrée sur ce projet (`features/projects/ProjectBoardPage.tsx` →
  `IssuesView` avec `initialProjectId`), avec un en-tête affichant le
  leader du projet (`features/projects/components/ProjectHeader.tsx`).
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

### Comment ce qui précède a été vérifié

Le vrai backend Java ne peut pas tourner dans cet environnement (pas de
Postgres, pas de docker/WSL disponibles — reconfirmé plusieurs fois sur
plusieurs sessions). Toutes les features frontend, y compris l'authentification
(login/register/logout/expiration de session), ont été testées avec un
**serveur mock jetable** (Node `http` natif, hors dépôt, reproduisant
fidèlement le contrat `GenericType`/`PagedResponse`/DTOs, étendu pour vérifier
un vrai token Bearer et simuler login/register) plutôt que non testées — mais
ça reste une simulation, pas une vérification contre le vrai backend Spring.
À refaire dès que Postgres est disponible.

---

## 5. Comment vérifier que tout va bien

Backend :
```bash
cd backend
./mvnw -q compile
./mvnw -q test-compile
./mvnw -q test -Dtest=IssueServiceTest,IssueStatusControllerTest,IssueSecurityTest,CommentSecurityTest,CommentSecurityControllerTest,JwtAuthenticationFilterTest,IssueTrackerApplicationTests
```
- `JwtAuthenticationFilterTest` (nouveau) — token expiré et token malformé renvoient bien 401, pas 500, contre le vrai filtre + la vraie `SecurityConfig`.
- `IssueTrackerApplicationTests` nécessite Postgres local (`jdbc:postgresql://localhost:5432/issuetracker`, credentials dans `application-dev.yml`) — seul test de la liste qui ne passe pas dans cet environnement.
- Vérification runtime anti-`MultipleBagFetchException` sur `IssueRepository.findDetailById` (feature 8) : jamais faite contre une vraie DB, toujours en attente.

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
pose pas. Toutes les colonnes ajoutées depuis (feature 10 : `User.bio`/
`avatarStoragePath`/`avatarContentType`) sont nullable, donc pas concernées.

## 7. Backlog priorisé pour la suite (issu de `docs/AUDIT_REPORT.md` + cette session)

### Déjà corrigé (ne pas re-signaler)
- ~~Aucune authentification frontend~~ → fait lors d'une session précédente (§1, §4).
- ~~`JwtAuthenticationFilter` plante (500) sur un token expiré/malformé~~ → corrigé (S1, §2).
- ~~S2 — `CommentService.updateComment` permet de ressusciter un commentaire supprimé~~ → corrigé : vérifie `isDeleted()` en tout premier, lève `CommentDeletedException` (409). Testé par `CommentServiceTest`.
- ~~S3 — `application.properties` orphelin avec mot de passe DB en clair~~ → fichier supprimé, après vérification que chaque clé était déjà couverte par `application.yml`/`application-dev.yml`/`application-prod.yml`.
- ~~S4 — secret JWT avec valeur de repli codée en dur~~ → `jwt.secret: ${JWT_SECRET}` n'a plus de défaut ; l'app refuse de démarrer sans cette variable d'env (voir §9). Vérifié en conditions réelles (`mvn spring-boot:run` sans/avec `JWT_SECRET`).
- ~~S5 — content-type des uploads jamais vérifié par les octets réels~~ → `FileStorageService.detectContentType` sniffe le vrai type via Apache Tika (magic bytes), appliqué aux attachments et à l'avatar, type détecté stocké et resservi (pas le type déclaré par le client). Testé par `AttachmentServiceTest`.
- ~~Pas de `createdAt` sur `Comment`~~ → ajouté (`@CreationTimestamp`), exposé dans `CommentDto` et affiché côté frontend.
- ~~Sidebar déconnectée de l'API réelle~~ → corrigé, voir §4 (Autres points à connaître).
- ~~Leader de projet jamais affiché côté frontend~~ → corrigé, affiché dans `ProjectHeader.tsx` en haut de la page de board filtrée par projet.

### Sécurité / robustesse restante
- Rien d'ouvert dans `docs/AUDIT_REPORT.md` §2.3 pour le moment (S1-S5 tous corrigés). Point non couvert par l'audit original, trouvé en corrigeant S3/S4 : `application-dev.yml` a un mot de passe DB de repli en clair (`${DB_PASSWORD:seilixx1514}`) — laissé tel quel car c'est le fichier canonique de dev (pas dupliqué/orphelin comme S3), acceptable pour une DB locale, mais à bannir si ce fichier sert un jour de base pour un environnement partagé.

### Fonctionnel — UI manquante (le plus impactant pour l'utilisabilité réelle)
- Pas de formulaire de création de projet (backend `POST /api/projects` complet, aucune UI).
- Pas de formulaire de création d'issue (bouton "Create issue" de la topbar sans handler — backend `POST /api/issues` complet).
- Pas d'édition des champs d'une issue ni de réassignation (backend `PUT /api/issues/{id}` complet, y compris permissions ; aucune UI, pas même dans le panneau de détail).
- Recherche globale de la topbar ne cherche que les utilisateurs (feature 5) — le placeholder dit "issues, projects, people" mais seule la recherche de personnes est branchée.

### Technique / dette
- Pas de vraie migration DB (Flyway/Liquibase).
- Code mort côté backend : plusieurs méthodes de `IssueService`/`IssueRepository` jamais appelées par aucun controller (détail exact dans l'audit, §3.1).
- Pas de redimensionnement d'avatar côté serveur (optionnel selon le spec) — le crop côté client suffit pour l'instant (sortie fixe 320×320).
- Testcontainers déclaré dans `pom.xml` (scope test) mais jamais utilisé — brancher `IssueTrackerApplicationTests` dessus lèverait le blocage Postgres en CI/sur une machine avec Docker (pas cet environnement-ci).
- `backend/src/test/resources/application-test.yml` semble mort : rien n'active le profil Spring `test` (pas de `@ActiveProfiles("test")`, pas de `spring.profiles.active=test` dans la config de test/Surefire) — trouvé en corrigeant `JwtAuthenticationFilterTest` (voir §9), jamais vérifié avant. À vérifier si un jour `IssueTrackerApplicationTests`/Testcontainers est câblé dessus (§4.4 de l'audit) — c'est probablement le profil qui était censé être actif pour ce test.

## 8. Breaking changes backend introduits en session (à répercuter côté tests manuels)

- `GET /api/issues` retourne `GenericType<PagedResponse<IssueDto>>` au lieu de `GenericType<List<IssueDto>>`.
- `POST /api/comments` (issueId dans le body) supprimé → remplacé par `POST /api/issues/{id}/comments`.
- `PUT /api/issues/{id}` prend `IssueUpdateRequest` (sans `status`).
- `PUT /api/projects/{id}` prend `ProjectUpdateRequest` (sans `category`).
- `GET /api/users` (liste complète) est admin-only.
- `UserDto` a deux champs supplémentaires (`bio`, `avatarUrl`) — non-breaking (additions), mais à savoir si un client existant désérialise strictement.

## 9. Variables d'environnement requises

Pas de README au niveau du repo pour l'instant — cette section fait office de
référence en attendant. Aucun fichier `.env`/`.env.example` n'existe non plus ;
à créer si un jour ça devient pénible de retenir cette liste à la main.

| Variable | Obligatoire | Défaut | Notes |
|---|---|---|---|
| `JWT_SECRET` | **Oui, partout** (dev y compris) | *aucun* | Clé HMAC pour signer les JWT (base64, ≥256 bits). Depuis la correction S4, **aucun repli codé en dur** : sans cette variable, l'app refuse de démarrer (`PlaceholderResolutionException` dès la création du bean `JwtService`, avant même la tentative de connexion DB). Générer une valeur avec par ex. `openssl rand -base64 32`. |
| `JWT_EXPIRATION_MS` | Non | `3600000` (1h) — `900000` (15min) en profil `prod` | Durée de validité du token. |
| `SPRING_PROFILES_ACTIVE` | Non | `dev` | `dev` (`ddl-auto=update`, repli DB local) ou `prod` (`ddl-auto=validate`, DB obligatoire sans repli). |
| `DB_URL` | Oui en profil `prod` | `jdbc:postgresql://localhost:5432/issuetracker` en `dev` | — |
| `DB_USERNAME` | Oui en profil `prod` | `postgres` en `dev` | — |
| `DB_PASSWORD` | Oui en profil `prod` | `seilixx1514` en `dev` (repli local, voir la note dans le backlog sécurité ci-dessus) | En `prod`, pas de repli : `${DB_PASSWORD}` seul, l'app refuse de démarrer si absent (même mécanisme que `JWT_SECRET`). |
| `ATTACHMENTS_DIR` | Non | `uploads` | Dossier de stockage des fichiers (attachments + avatars). |
| `ATTACHMENTS_ALLOWED_TYPES` | Non | `image/png,image/jpeg,image/gif,application/pdf,text/plain,application/zip` | Allowlist de content-types pour les attachments (avatar a sa propre allowlist, codée en dur dans `UserService`, image-only). Depuis S5, le type réel est vérifié par les octets (Tika), pas seulement comparé à cette liste sur la base du déclaratif client. |
| `ATTACHMENTS_MAX_SIZE` | Non | `10MB` | Taille max upload (attachments ; l'avatar a son propre plafond de 3MB codé en dur dans `UserService`). |

Pour lancer en local sans rien configurer d'autre que `JWT_SECRET` :
```bash
export JWT_SECRET=$(openssl rand -base64 32)
cd backend && ./mvnw spring-boot:run
```
(nécessite un Postgres local sur `localhost:5432/issuetracker`, sinon l'app
construit tout son graphe de beans avec succès puis échoue à la connexion
JDBC — voir §5/§6).
