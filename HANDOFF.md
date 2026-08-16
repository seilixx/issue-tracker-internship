# Handoff — Issue Tracker Phase 2

Dernière mise à jour : 2026-08-16, session Claude Code.
Repo : `https://github.com/seilixx/issue-tracker-internship.git` (privé)
Branche courante : **`beta`** (poussée, commit `fdcdfc6`)
Spec de référence : `docs/Issue_Tracker_Phase2_Spec.docx` (9 features backend + brief frontend)

Ce fichier sert à reprendre le travail dans une autre session Claude Code sans
perdre le contexte. Donne-le à lire en premier avant de continuer.

---

## 1. État global

Backend Java 17+/Spring Boot 4.1.0/Spring Data JPA/PostgreSQL dans `backend/`.
Frontend React (Vite+TS+Tailwind) scaffoldé dans `frontend/` mais **pas touché
cette session** (hors scope, focus 100% backend).

Features du spec Phase 2 implémentées, dans cet ordre :

| # | Feature | Statut |
|---|---|---|
| — | Réparation compilation cassée (AuthenticationService supprimé du disque, RegisterRequest/Role désynchronisés) | ✅ fait |
| 2 | Rôles admin/manager/user + `@PreAuthorize` | ✅ fait |
| 3 | Catégorie + leader de projet | ✅ fait |
| 7 | Fermeture d'issue (closed_by/closed_at, statut terminal) | ✅ fait |
| 1 | Attachments (upload/liste/suppression/téléchargement) | ✅ fait |
| 4 | Commentaires en thread (parent_comment_id, soft-delete) | ✅ fait |
| 5 | Profil utilisateur + recherche (paginés) | ✅ fait |
| 6 | Tri + pagination sur la liste d'issues | ✅ fait |
| 8 | Vue détail complète (attachments + N+1) | 🟡 **en cours, voir §3** |
| 9 | Visibilité vs permission d'écriture | ⬜ pas fait explicitement (déjà largement couvert en pratique par `@PreAuthorize`, mais pas d'audit dédié) |
| 10 | Édition de profil + avatar | ⬜ pas fait |
| — | Frontend (sprint 3 du spec) | ⬜ pas touché |

Aucune migration Flyway/Liquibase dans le projet — le schéma est géré par
`ddl-auto=update` en dev, `validate` en prod (voir §5, point important).

---

## 2. Conventions établies (à respecter si tu continues)

- **Package-by-layer** : `entity`, `repository`, `service`, `controller`, `dto`, `security`, `exception`.
- **DTOs** : classes Lombok `@Data`, jamais de `record`. Validation via `@NotBlank`/`@NotNull` + `@Valid` dans les controllers.
- **Réponses** : toujours enveloppées dans `GenericType<T>{success, message, data}`.
- **Pagination** : wrapper maison `PagedResponse<T>{content, page, size, totalElements, totalPages}` (pas `Page<T>` de Spring directement, pour éviter les soucis de sérialisation).
- **Séparation update DTO / permission** : quand un champ d'un endpoint d'édition générale doit avoir une permission plus stricte que le reste (catégorie de projet, statut d'issue), on **retire le champ du DTO d'update général** et on ajoute un endpoint PATCH dédié avec sa propre règle. Voir `ProjectUpdateRequest` (pas de `category`) + `PATCH /api/projects/{id}/category` (admin-only), et `IssueUpdateRequest` (pas de `status`) + `PATCH /api/issues/{id}/status`.
- **Sécurité par ownership** : beans `@Component("xxxSecurity")` (`IssueSecurity`, `AttachmentSecurity`) exposant des méthodes `isCreatorOrAssignee(Long id, Authentication auth)` / `isUploader(...)`, référencées dans `@PreAuthorize("hasAnyRole('ADMIN','MANAGER') or @issueSecurity.isCreatorOrAssignee(#id, authentication)")`. `#id` fonctionne directement (le projet compile avec `-parameters`, vérifié empiriquement — pas besoin de `@P`).
- **GlobalExceptionHandler** (`backend/src/main/java/com/seilixx/issuetracker/exception/GlobalExceptionHandler.java`) — mapping actuel :
  - `ResourceNotFoundException` → 404
  - `AccessDeniedException` → 403
  - `IssueClosedException` → 409
  - `MaxUploadSizeExceededException` → 413
  - `RuntimeException` (générique) → 400
  - `MethodArgumentNotValidException` → 400
  - `Exception` (catch-all) → 500
- **Chaque service mappe ses propres DTOs** — pas d'appel service→service. Ça duplique un peu le mapping `Comment→CommentDto` entre `CommentService`, `IssueService` et `UserService`, mais c'est le pattern déjà en place, on l'a suivi plutôt que d'introduire un nouveau pattern.

### Pièges Spring Boot 4.1.0 découverts cette session
- Les artifact-id `spring-boot-starter-webmvc` (au lieu de `-web`) et `spring-boot-starter-data-jpa-test`/`spring-boot-starter-webmvc-test` sont **corrects** en Boot 4 (renommage officiel) — ne pas les "corriger" vers les noms Boot 3.
- `@WebMvcTest` a bougé vers `org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest`.
- `@MockBean` est remplacé par `@MockitoBean` (`org.springframework.test.context.bean.override.mockito.MockitoBean`). Pour un bean nommé (`@Component("issueSecurity")`), il faut **explicitement** `@MockitoBean(name = "issueSecurity")` sinon Spring Security ne résout pas `@issueSecurity` dans le SpEL de `@PreAuthorize` (`NoSuchBeanDefinitionException` au runtime, pas à la compilation).

---

## 3. Feature 8 — EN COURS, à terminer en premier

Objectif : `GET /api/issues/{id}` doit retourner en un seul appel logique
(peu de requêtes SQL) : champs, projet, reporter, assigné, priorité, statut,
closed_by/closed_at, **attachments**, et commentaires en thread.

**Déjà fait** (committé sur `beta`) :
- `IssueDto` a un nouveau champ `attachments: List<AttachmentDto>` (`backend/src/main/java/com/seilixx/issuetracker/dto/IssueDto.java`).
- `IssueRepository.findDetailById(Long id)` — requête avec `LEFT JOIN FETCH` sur `project`, `creator`, `closedBy`, `assignees` (une seule collection jointe pour éviter `MultipleBagFetchException`).
- `CommentRepository.findDetailByIssueId(Long issueId)` — `LEFT JOIN FETCH authorUser, parentComment`, triée par id.
- `AttachmentRepository.findDetailByIssueId(Long issueId)` — `LEFT JOIN FETCH uploadedBy`, triée par id.
- `IssueService.java` a déjà les imports (`AttachmentDto`, `AttachmentRepository`, `CommentRepository`) mais **ces repos ne sont pas encore injectés ni utilisés**.

**Reste à faire** (`backend/src/main/java/com/seilixx/issuetracker/service/IssueService.java`) :
1. Ajouter `CommentRepository commentRepository` et `AttachmentRepository attachmentRepository` au constructeur.
2. Réécrire `getIssueById(Long id)` pour appeler `issueRepository.findDetailById(id)` (au lieu de `findById`), puis `commentRepository.findDetailByIssueId(id)` et `attachmentRepository.findDetailByIssueId(id)` séparément (3 requêtes au lieu d'1 base + N lazy loads).
3. Extraire un helper privé `mapCommentToDto(Comment comment, long issueId)` à partir du lambda déjà dupliqué dans `mapToDto` (le contenu exact est déjà écrit inline, juste à extraire) — le réutiliser à la fois dans l'ancien `mapToDto` (list/create/update) et dans le nouveau chemin détail.
4. Ajouter un helper privé `mapAttachmentToDto(Attachment attachment, long issueId)` (mêmes champs que `AttachmentService.mapToDto`, dupliqué ici volontairement — convention du projet).
5. Construire l'`IssueDto` du détail avec `dto.setAttachments(...)` en plus du reste.
6. **Ne pas toucher** `getIssues()`/`getIssuesByFilters()`/`createIssue()`/`updateIssue()`/`updateStatus()` — ils gardent l'ancien `mapToDto` léger (sans attachments), l'optimisation N+1 ne concerne que `GET /api/issues/{id}` (c'est ce que demande le spec, pas les listes).
7. Compiler (`./mvnw -q compile`), puis vérifier qu'il n'y a pas de `MultipleBagFetchException` au runtime — la méthode de vérification rapide utilisée cette session : un test `@SpringBootTest` jetable qui autowire `IssueRepository` et appelle `findDetailById` sur l'unique issue de la DB dev, en lisant le SQL généré dans les logs (`show-sql: true` déjà actif en dev). Supprimer le test après vérification (pas demandé par l'utilisateur comme livrable).
8. Relancer la suite de tests existante (voir §4).

---

## 4. Comment vérifier que tout va bien

```bash
cd backend
./mvnw -q compile
./mvnw -q test-compile
./mvnw -q test -Dtest=IssueServiceTest,IssueStatusControllerTest,IssueSecurityTest,IssueTrackerApplicationTests
```

- `IssueSecurityTest` (unit, Mockito) — logique de `IssueSecurity.isCreatorOrAssignee`.
- `IssueServiceTest` (unit, Mockito) — `updateStatus` refuse un changement sur une issue déjà `DONE`.
- `IssueStatusControllerTest` (`@WebMvcTest`) — un user ni créateur ni assigné reçoit bien un 403 HTTP réel sur `PATCH /api/issues/{id}/status`.
- `IssueTrackerApplicationTests` — charge tout le contexte Spring **contre la vraie base Postgres locale** (`jdbc:postgresql://localhost:5432/issuetracker`, credentials dans `application-dev.yml`). Postgres doit tourner localement pour que ça passe.

## 5. État de la base Postgres locale (dev)

Cette session a dû réparer le schéma dev à la main parce que `ddl-auto=update`
ne peut pas ajouter une colonne `NOT NULL` sur une table qui a déjà des lignes
(Hibernate ne fait pas le backfill lui-même) :
- `project.category` / `project.leader_id` — backfillés (`SOFTWARE`, user id 4) puis passés `NOT NULL`.
- `comment.deleted` — backfillé à `false` puis passé `NOT NULL`.

**Si tu repars sur une autre machine / DB fraîche**, ce problème ne se
posera pas (table vide au premier `ddl-auto=update`). Si tu retombes dessus
sur CETTE base (colonnes déjà là mais nouvelle colonne `NOT NULL` ajoutée par
une future feature), le pattern est : `ALTER TABLE ... ADD COLUMN ... ` (nullable)
→ `UPDATE ... SET ... WHERE ... IS NULL` (backfill) → `ALTER TABLE ... ALTER COLUMN ... SET NOT NULL`.

Pas de client `psql` disponible dans l'environnement — les vérifications/fix
de cette session sont passés par un petit programme Java JDBC jetable
(driver déjà en cache Maven : `~/.m2/repository/org/postgresql/postgresql/42.7.11/`).

## 6. Points connus à traiter plus tard (pas bloquants)

- **Secrets en clair** dans `backend/src/main/resources/application-dev.yml` (mot de passe DB, secret JWT par défaut) — préexistant, pas introduit cette session. Repo privé donc pas urgent, mais à sortir en variables d'env avant tout merge/passage en public.
- **Content-type des attachments** déclaré par le client, pas vérifié par inspection des octets (pas de Tika). Acceptable pour l'instant (allowlist limitée), à durcir si les fichiers sont un jour servis inline dans un navigateur.
- **Pas de vraie migration DB** (Flyway/Liquibase) — à introduire si le projet doit un jour supporter plusieurs environnements sans intervention manuelle comme au §5.
- Feature 9 (visibilité vs permission d'écriture) n'a pas eu de passe dédiée — c'est déjà largement couvert par les `@PreAuthorize` posés au fil des features 2/7, mais personne n'a vérifié exhaustivement que chaque règle du tableau du spec (feature 9) est bien respectée endpoint par endpoint.

## 7. Breaking changes introduits cette session (à répercuter côté frontend/tests manuels)

- `GET /api/issues` retourne `GenericType<PagedResponse<IssueDto>>` au lieu de `GenericType<List<IssueDto>>`.
- `POST /api/comments` (issueId dans le body) supprimé → remplacé par `POST /api/issues/{id}/comments` (`CommentCreateRequest`, sans issueId).
- `PUT /api/issues/{id}` prend `IssueUpdateRequest` (sans `status` — passer par `PATCH /api/issues/{id}/status`).
- `PUT /api/projects/{id}` prend `ProjectUpdateRequest` (sans `category` — passer par `PATCH /api/projects/{id}/category`).
- `GET /api/users` (liste complète) est maintenant admin-only — utiliser `GET /api/users/search?q=` pour un picker côté frontend.
