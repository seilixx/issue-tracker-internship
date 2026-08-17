# Audit complet — Issue Tracker (backend + frontend)

Date : 2026-08-16
Périmètre : application web uniquement (backend Spring Boot + frontend React). La partie MCP (Part B du plan de stage) est explicitement exclue de cet audit.
Méthode : lecture exhaustive du code source (tous les controllers, services, entités, DTOs, repositories, config de sécurité, fichiers frontend concernés), tentative de démarrage réel du backend, exécution de la suite de tests backend, et test interactif du frontend contre un serveur mock reproduisant fidèlement le contrat API (voir §4 pour le détail de cette limitation).

**Aucune correction n'a été appliquée.** Ce document est un état des lieux, pas un patch. Chaque point est marqué **OK**, **MANQUANT** ou **À CORRIGER**, avec le ou les fichiers concernés.

---

## Résumé exécutif

Trois constats dominaient à la production de ce rapport ; les deux premiers ont depuis été corrigés dans des sessions suivantes (voir la note de mise à jour) :

1. ~~**Il n'y a aucune authentification réelle côté frontend.**~~ **CORRIGÉ.** Le backend JWT (register/login) fonctionne, et le frontend a depuis été branché dessus : pages `/login`/`/register` réelles, `ProtectedRoute`, `CURRENT_USER` entièrement supprimé et remplacé par l'utilisateur réellement authentifié (`useAuth()`), déconnexion automatique propre sur 401.
2. ~~**Un vrai bug de sécurité/robustesse a été trouvé dans le filtre JWT**~~ **CORRIGÉ.** Un token expiré ou malformé faisait planter `JwtAuthenticationFilter` avec une exception non interceptée ; il renvoie maintenant un 401 propre au format `GenericType` (voir §2, S1).
3. **Le backend n'a jamais pu être démarré contre une vraie base Postgres dans cet environnement** (ni tout au long des sessions précédentes) — confirmé de nouveau ici (pas de service Postgres, pas de Docker). Le graphe de beans Spring se construit intégralement sans erreur ; l'échec survient uniquement à la connexion JDBC (attendu). La section 4 documente précisément ce qui a pu être vérifié malgré cette contrainte. **Toujours d'actualité.**

> **Note de mise à jour (post-audit)** : les points 1 et 2 ci-dessus, ainsi que S1-S5 (§2.3), le manque de `createdAt` sur `Comment` (§1.2, feature 4), la sidebar déconnectée de l'API (§4.3) et le leader de projet jamais affiché (§1.2, feature 3), ont été corrigés après la rédaction de ce rapport. Le reste du document est laissé tel quel pour préserver l'état des lieux original ; se référer aux annotations ~~barrées~~ pour les points résolus. Voir `HANDOFF.md` §7 pour le résumé à jour du backlog restant.

---

## 1. Complétude fonctionnelle

### 1.1 Socle (plan de stage initial)

| Point | Statut | Fichier(s) | Détail |
|---|---|---|---|
| Entités Project, Issue, Status, Priority, User, Comment + relations | **OK** | `backend/.../entity/*.java` | Toutes présentes, relations correctes : Issue→Project (N:1), Issue→User creator/closedBy (N:1), Issue↔User assignees (N:N, table `issue_assignees`), Comment→Issue (N:1), Comment→User author (N:1), Comment→Comment parent (auto-référence N:1), Project→User leader (N:1). `Attachment` existe aussi (feature 1, hors socle initial). |
| CRUD projets — backend | **OK** | `ProjectController.java`, `ProjectService.java` | POST/GET/GET-by-id/PUT/DELETE tous présents et fonctionnels. |
| CRUD projets — frontend | **MANQUANT** | `frontend/src/features/projects/` | Lecture seule (liste dans la barre de filtres, avec projets **statiques en dur** dans la sidebar — voir §3). **Aucune UI de création, modification ou suppression de projet.** |
| CRUD issues — backend | **OK** | `IssueController.java`, `IssueService.java` | POST/GET/GET-by-id (paginé+filtré)/PUT/DELETE tous présents. |
| CRUD issues — frontend | **À CORRIGER / MANQUANT** | `frontend/src/components/layout/Topbar.tsx`, `frontend/src/features/issues/` | Lecture excellente (board+liste+détail). Le bouton "Create issue" de la topbar **n'a aucun gestionnaire `onClick`** — il ne fait rien. Aucune UI d'édition des champs d'une issue (titre/description/priorité/projet), ni de suppression. Seul le changement de statut est éditable depuis le frontend. |
| Assignation d'issue | **À CORRIGER (mineur, backend) / MANQUANT (frontend)** | `IssueService.java:157`, `IssueUpdateRequest.java` | Backend : fonctionne via `PUT /api/issues/{id}` mais `if (assignedUuids != null && !isEmpty())` — envoyer une liste **vide** est silencieusement ignoré, donc **impossible de désassigner tout le monde** d'une issue via l'API. Frontend : aucune UI de réassignation nulle part (ni dans le panneau de détail, ni ailleurs). |
| Changement de statut | **OK** | `IssueController.java` (`PATCH /{id}/status`), `frontend/.../IssueStatusControl.tsx` | Backend et frontend fonctionnels, testés (voir §4). |
| Ajout de commentaire | **OK** | `CommentController.java`, `frontend/.../CommentForm.tsx` | Fonctionnel avec threading, testé (voir §4). Voir aussi §2 pour un bug sur l'édition d'un commentaire supprimé. |
| Filtrage/recherche (projet, statut, assigné, priorité) | **OK** | `IssueRepository.findByFilters`, `frontend/.../IssueFiltersBar.tsx` | Fonctionnel des deux côtés, testé. |
| Authentification JWT — backend | **OK avec réserve** | `AuthenticationController.java`, `JwtService.java`, `JwtAuthenticationFilter.java` | `/register` et `/login` fonctionnels, génèrent un JWT valide. Réserve : bug de gestion des tokens invalides (voir §2). |
| Authentification — frontend | **MANQUANT** | *(aucun fichier — n'existe pas)* | **Aucune page login/register, aucun `ProtectedRoute`, aucun flux de connexion.** `apiClient.ts` a un emplacement prévu pour le token (`issuetracker-auth-token` en localStorage) mais rien ne l'y écrit jamais. Toute l'app tourne contre `CURRENT_USER` simulé. |
| Validation des inputs | **OK** | DTOs (`@NotBlank`/`@NotNull`/`@Email`/`@Size`) | Cohérent sur l'ensemble des DTOs d'écriture. |
| Gestion centralisée des erreurs | **OK avec réserve** | `GlobalExceptionHandler.java` | Centralisée et cohérente pour tout ce qui passe par le dispatcher Spring MVC. Réserve : les exceptions levées dans `JwtAuthenticationFilter` ne passent pas par ce handler (voir §2/§3). |
| Frontend de visualisation/interaction avec les issues | **OK (partiel)** | `frontend/src/features/issues/` | Board kanban + vue liste + panneau de détail très complets. Limité par l'absence de création/édition/réassignation/suppression d'issue côté UI (voir ci-dessus). |

### 1.2 Phase 2 — features 1 à 10 du spec

| # | Feature | Statut | Fichier(s) | Détail |
|---|---|---|---|---|
| 1 | Attachments | **OK avec réserve** | `AttachmentController/Service.java`, `frontend/.../IssueAttachmentsSection.tsx` | Upload/liste/suppression/téléchargement fonctionnels, taille et content-type validés, blocage sur issue fermée à l'upload. Réserves : `DELETE /api/attachments/{id}` ne vérifie pas si l'issue est fermée (À CORRIGER mineur, cohérence avec la règle "no attachments once closed") ; content-type non vérifié par inspection des octets (voir §2, sécurité). |
| 2 | Rôles + permissions | **OK** | `Role.java`, `@PreAuthorize` sur tous les controllers, `frontend/.../permissions.ts` | Voir audit détaillé §2. Auto-promotion bloquée. Frontend reflète fidèlement les règles, mais évaluées contre `CURRENT_USER` simulé (cf. lacune d'authentification). |
| 3 | Catégorie + leader de projet | **OK (mineur : leader jamais affiché au frontend)** | `Project.java`, `ProjectController.java` | Backend complet (catégorie + leader, PATCH catégorie admin-only). Le frontend affiche/filtre la catégorie, mais **n'affiche le leader d'un projet nulle part** dans l'UI actuelle. |
| 7 | Fermeture d'issue (closed_by/closed_at, statut terminal) | **OK** | `IssueService.updateStatus`, `frontend/.../IssueDetailPanel.tsx` | Vérifié par relecture de code, tests unitaires, et test manuel E2E cette session (voir §4) : `closed_by`/`closed_at` correctement renseignés, changement de statut bloqué après fermeture, message d'erreur clair. |
| 4 | Commentaires en thread | **OK avec un bug** | `Comment.java`, `CommentService.java`, `frontend/.../IssueCommentsSection.tsx` | Threading + soft-delete-avec-placeholder fonctionnels et testés. **Bug** : `CommentService.updateComment` ne vérifie jamais `comment.isDeleted()` — un commentaire supprimé peut être "ressuscité" via `PUT /api/comments/{id}` (À CORRIGER, voir §2). Mineur : l'entité `Comment` n'a aucun champ de date de création, donc `CommentDto.createdAt` est toujours `null` (MANQUANT mineur). |
| 5 | Profil utilisateur + recherche | **OK** | `UserController.java`, `frontend/.../ProfilePage.tsx`, `UserSearchPage.tsx` | Fonctionnel des deux côtés, testé. Limitation connue et documentée : `GET /users/{uuid}/profile` applique le même couple page/size aux deux listes (assignées/fermées) — pas de pagination indépendante possible sans changer l'endpoint. |
| 6 | Tri des filtres (sortBy/sortDir) | **OK** | `IssueService.getIssuesByFilters`, `frontend/.../IssueTable.tsx` | Tri stable (secondaire par id), 4 champs triables, en-têtes de colonnes cliquables testés dans les deux sens. |
| 8 | Vue détail complète en un seul appel (pas de N+1) | **OK côté code, MANQUANT côté vérification runtime** | `IssueRepository.findDetailById`, `IssueService.getIssueById` | La requête utilise `LEFT JOIN FETCH` sur project/creator/closedBy/assignees (une seule collection, pour éviter `MultipleBagFetchException`), puis 2 requêtes dédiées pour comments/attachments — 3 requêtes au total, logique correcte à la lecture. **Mais jamais vérifié contre une vraie base** (SQL réellement généré, absence effective de N+1) faute de Postgres disponible dans tout l'historique de ce projet. Voir la recommandation Testcontainers en §4. |
| 9 | Séparation lecture/écriture selon les rôles | **OK** | Tous les controllers, `frontend/.../permissions.ts` | Audité endpoint par endpoint dans une session précédente (2 failles trouvées et corrigées à l'époque : `PUT/DELETE /api/comments/{id}` sans aucune vérification, et `IssueSecurity` sans le palier "leader de projet"). Ré-audité intégralement dans cette session, voir tableau §2 — aucune régression, aucune nouvelle faille de ce type trouvée. |
| 10 | Édition du profil + avatar | **OK** | `UserController.java` (`/me`, `/me/avatar`), `frontend/.../ProfileEditPage.tsx`, `AvatarCropper.tsx` | Implémenté cette session-ci (backend + frontend), testé de bout en bout y compris l'upload et le crop réels d'une image (voir §4). |

---

## 2. Sécurité

### 2.1 Revue endpoint par endpoint (tous les endpoints mutants POST/PUT/PATCH/DELETE)

| Endpoint | Autorisation serveur | Statut | Remarque |
|---|---|---|---|
| `POST /api/auth/register` | `permitAll` (public, attendu) | **OK** | Rôle forcé à `USER` côté serveur (`AuthenticationService.register`), impossible de s'auto-créer admin. |
| `POST /api/auth/login` | `permitAll` (public, attendu) | **OK** | — |
| `POST /api/issues` | Authentifié seulement | **OK** | Ouvert à tout utilisateur connecté (cohérent avec le spec, personne n'est explicitement restreint pour le reporting). `status` forcé à `OPEN` côté serveur quoi que le client envoie. `creatorUuid` pris du principal authentifié, jamais du body. |
| `PUT /api/issues/{id}` | `hasAnyRole('ADMIN','MANAGER') or @issueSecurity.isCreatorOrAssigneeOrProjectLeader` | **OK** | + blocage serveur si issue fermée (`IssueClosedException`, 409). |
| `PATCH /api/issues/{id}/status` | `hasAnyRole('ADMIN','MANAGER') or @issueSecurity.isCreatorOrAssignee` | **OK** | + blocage serveur si déjà fermée. |
| `DELETE /api/issues/{id}` | `hasAnyRole('ADMIN','MANAGER')` | **OK** | — |
| `POST /api/issues/{id}/comments` | `hasAnyRole('ADMIN','MANAGER') or @issueSecurity.isCreatorOrAssignee` | **OK** | Pas de blocage sur issue fermée — **volontaire**, conforme au spec ("comments can usually stay open even when closed"). |
| `PUT /api/comments/{id}` | `hasAnyRole('ADMIN','MANAGER') or @commentSecurity.isAuthor` | **À CORRIGER** | Autorisation OK. Mais `CommentService.updateComment` ne vérifie pas `deleted` : un commentaire supprimé peut être modifié/ressuscité (voir 2.3). |
| `DELETE /api/comments/{id}` | `hasAnyRole('ADMIN','MANAGER') or @commentSecurity.isAuthor` | **OK** | — |
| `POST /api/issues/{id}/attachments` | `hasAnyRole('ADMIN','MANAGER') or @issueSecurity.isCreatorOrAssigneeOrProjectLeader` | **OK** | + content-type/taille validés + blocage si issue fermée. |
| `DELETE /api/attachments/{id}` | `hasAnyRole('ADMIN','MANAGER') or @attachmentSecurity.isUploader` | **À CORRIGER (mineur)** | Autorisation OK, mais ne vérifie pas si l'issue parente est fermée — incohérent avec la règle "no attachments once closed" si on considère la suppression comme une forme de modification. |
| `POST /api/projects` | `hasAnyRole('ADMIN','MANAGER')` | **OK** | `leaderUuid` validé (404 si utilisateur inexistant). |
| `PUT /api/projects/{id}` | `hasAnyRole('ADMIN','MANAGER')` | **OK** | Le DTO n'a délibérément pas de champ `category` (protection par conception). |
| `DELETE /api/projects/{id}` | `hasRole('ADMIN')` | **OK** | Plus strict que MANAGER — choix défendable, pas exigé explicitement par le spec mais raisonnable. |
| `PATCH /api/projects/{id}/category` | `hasRole('ADMIN')` | **OK** | Conforme au spec ("only by an admin"). |
| `PATCH /api/users/{uuid}/role` | `hasRole('ADMIN')` | **OK** | + garde applicative explicite contre l'auto-promotion (`UserService.updateUserRole`, `AccessDeniedException` si `uuid == currentUser.uuid`). |
| `PATCH /api/users/me` | Authentifié seulement, **pas de paramètre uuid** | **OK** | Auto-restreint par construction : résout toujours l'utilisateur courant via `SecurityContextHolder`, aucune donnée d'un autre utilisateur n'est jamais accessible via cet endpoint. |
| `POST /api/users/me/avatar` | Idem | **OK** | Idem, + content-type image-only + taille max 3MB. |

**Aucun IDOR trouvé** sur les endpoints mutants : chaque action est soit globalement restreinte par rôle, soit vérifiée par un bean `@xxxSecurity` qui recharge la ressource par son ID et compare le propriétaire/l'assignation réels (pas de confiance dans un champ du body), soit auto-restreinte par construction (endpoints `/me/*`, aucun paramètre d'ID exploitable).

### 2.2 Lecture (GET) — pas de fuite de données sensibles

**OK.** `UserDto` (utilisé par tous les endpoints exposant des infos utilisateur) ne contient **jamais** `password`/`mail` — seulement `uuid, firstName, lastName, username, role, bio, avatarUrl`. `AttachmentDto` n'expose pas `storagePath` (chemin disque interne), seulement les métadonnées utiles. Tous les GET mutant-adjacents (`/api/issues`, `/api/issues/{id}`, `/api/projects`, `/api/comments*`, `/api/attachments/{id}/content`, `/api/users/*`) sont ouverts à tout utilisateur authentifié sans restriction supplémentaire, conformément à la feature 9 du spec.

### 2.3 Bugs et lacunes trouvés

| # | Sévérité | Fichier | Description |
|---|---|---|---|
| S1 | ~~Élevée~~ **CORRIGÉ** | `backend/.../security/JwtAuthenticationFilter.java` | ~~`jwtService.extractUsername(jwt)` est appelé sans `try/catch`...~~ Corrigé : le parsing est maintenant entouré d'un `try/catch` (`ExpiredJwtException`, `MalformedJwtException`/`SignatureException`, `JwtException`/`IllegalArgumentException` en repli) qui renvoie un 401 au même format `GenericType` que `GlobalExceptionHandler`, sans laisser l'exception planter le filtre. Testé par `JwtAuthenticationFilterTest` (token expiré → 401, token malformé → 401) — les deux passent contre le vrai filtre/la vraie `SecurityConfig`, pas un mock. |
| S2 | ~~Moyenne~~ **CORRIGÉ** | `backend/.../service/CommentService.java` | ~~`updateComment` ne vérifie jamais `comment.isDeleted()`...~~ Corrigé : `updateComment` vérifie `isDeleted()` en tout premier et lève `CommentDeletedException` (409, même pattern que `IssueClosedException`) au lieu de ré-écrire le commentaire. Testé par `CommentServiceTest`. |
| S3 | ~~Moyenne~~ **CORRIGÉ** | ~~`backend/src/main/resources/application.properties`~~ | ~~Fichier de config dupliqué et orphelin avec un mot de passe DB en clair...~~ Corrigé : le fichier a été supprimé après vérification que chacune de ses clés était déjà couverte par `application.yml`/`application-dev.yml`/`application-prod.yml` (qui utilisent des variables d'env pour les credentials). |
| S4 | ~~Moyenne~~ **CORRIGÉ** | `backend/src/main/resources/application.yml` | ~~`jwt.secret` a une valeur de secours codée en dur...~~ Corrigé : `jwt.secret: ${JWT_SECRET}` n'a plus de valeur de repli. Vérifié en conditions réelles : sans `JWT_SECRET` dans l'environnement, `mvn spring-boot:run` refuse de démarrer avec `PlaceholderResolutionException: Could not resolve placeholder 'JWT_SECRET'` ; avec `JWT_SECRET` positionné, le démarrage passe ce point et échoue au même endroit qu'avant (connexion Postgres, cf. §4) — aucune régression. |
| S5 | ~~Faible~~ **CORRIGÉ** | `backend/.../service/FileStorageService.java`, `AttachmentService.java`, `UserService.updateMyAvatar` | ~~Le content-type d'un fichier est entièrement déclaré par le client...~~ Corrigé : `FileStorageService.detectContentType` sniffe le vrai type via Apache Tika (`tika-core`) en inspectant les octets réels du flux, ignorant le `Content-Type` déclaré et le nom de fichier. Appliqué aux attachments et à l'avatar ; le type détecté (pas le type déclaré) est celui stocké et resservi. Testé par `AttachmentServiceTest` (fichier aux octets GZip renommé `photo.png` avec `Content-Type: image/png` mensonger → upload rejeté). |

### 2.4 Points positifs à noter (déjà bien faits)

- `FileStorageService.store()` génère toujours un nom de fichier aléatoire (UUID) pour le stockage disque, jamais le nom fourni par le client — protection efficace contre le path traversal.
- CORS configuré avec une liste explicite d'origines (`localhost:3000`/`5173`) plutôt qu'un wildcard, compatible avec `allowCredentials(true)` — pas de piège CORS classique.
- Toutes les requêtes JPQL paramétrées (aucune concaténation de chaîne côté requêtes) — pas d'injection SQL trouvée.
- La comparaison de rôle/propriétaire dans les beans `@xxxSecurity` recharge systématiquement la ressource depuis la base par son ID plutôt que de faire confiance à un champ du payload — bonne pratique anti-IDOR.
- CSRF désactivé de façon appropriée pour une API REST stateless basée sur JWT (pas de cookies de session).

---

## 3. Cohérence technique

| Point | Statut | Détail |
|---|---|---|
| Enums cohérents backend/DTO/frontend | **OK** | `Status` (OPEN/IN_PROGRESS/DONE), `Priority` (LOW/MEDIUM/HIGH/CRITICAL), `Role` (USER/ADMIN/MANAGER), `ProjectCategory` (SOFTWARE/SUPPORT/INTERNAL) — valeurs identiques des deux côtés, vérifié champ par champ (`backend/.../entity/*.java` vs `frontend/src/utils/apiTypes.ts`). |
| Migrations DB présentes/ordonnées/appliquées proprement | **MANQUANT** | Aucun système de migration (pas de Flyway/Liquibase, pas de dossier `db/migration`). Le schéma est géré par `ddl-auto=update` (dev) / `validate` (prod, `application-prod.yml`). Sur une base **vraiment neuve**, `ddl-auto=update` créerait tout le schéma sans erreur (pas de contrainte NOT NULL à backfiller sur une table vide) — donc pas de blocage immédiat — mais l'absence totale d'un système de migration versionné est en soi un manque d'outillage pour un projet qui vise la prod. |
| Gestion d'erreurs cohérente (mêmes codes/formats) | **OK** | Cohérente pour tout ce qui passe par `GlobalExceptionHandler` (404/403/409/413/400/500, toujours enveloppé dans `GenericType{success,message,data}`). Les échecs de parsing JWT dans `JwtAuthenticationFilter` (S1, corrigé) suivent maintenant le même format `GenericType`, même s'ils ne passent pas littéralement par `GlobalExceptionHandler` (le filtre construit la même enveloppe lui-même, puisqu'il s'exécute avant le dispatch Spring MVC). |
| Pas de code mort / TODO oublié / endpoint dupliqué-orphelin | **À CORRIGER** | Plusieurs cas trouvés — détail en 3.1 ci-dessous. |
| Frontend gère les erreurs backend sans crash, reflète les permissions réelles | **OK (avec la réserve d'authentification déjà notée)** | Vérifié extensivement (voir §4) : `EmptyState` avec retry sur les échecs réseau, bannière d'erreur dismissible sur le board (rollback optimiste), `RestrictedNote` cohérent pour chaque action non autorisée. Les permissions affichées sont calculées côté client à partir des **mêmes règles exactes** que le backend (`frontend/.../permissions.ts`), donc cohérentes avec ce que le backend autoriserait *pour l'utilisateur évalué* — mais cet utilisateur est `CURRENT_USER` simulé, pas un utilisateur réellement authentifié (cf. lacune §1). |

### 3.1 Code mort / endpoints orphelins trouvés

| Élément | Fichier | Détail |
|---|---|---|
| `getIssues()`, `getIssueByProjectId()`, `getIssueByStatus()`, `getIssueByPriority()` | `IssueService.java:56,80,85,90` | Aucune de ces 4 méthodes n'est appelée par un controller. Le seul endpoint de liste réellement exposé est `getIssuesByFilters` (paginé). |
| `findByProjectId`, `findByStatus`, `findByPriority`, `findByProjectIdAndStatus`, `findByAssigneeUuid` | `IssueRepository.java:16-21` | `findByProjectId/Status/Priority` ne sont utilisées que par les méthodes de service mortes ci-dessus. `findByProjectIdAndStatus` et `findByAssigneeUuid` ne semblent appelées nulle part du tout dans le code actuel. |
| `GET /api/comments` (`getAllComments`) | `CommentController.java:36` | Retourne **tous** les commentaires de l'app, non paginé. Jamais appelé par le frontend (qui récupère les commentaires via le détail d'issue). Pas forcément à supprimer (peut servir à un futur client), mais orphelin aujourd'hui et potentiellement coûteux (dump complet sans pagination) — à surveiller. |
| `GET /api/comments/issue/{issueId}` | `CommentController.java:42` | Même remarque : endpoint valide mais jamais appelé par le frontend actuel (qui utilise les commentaires embarqués dans `GET /api/issues/{id}`). |
| `application.properties` | `backend/src/main/resources/application.properties` | Fichier de config mort/redondant avec `application.yml`+`application-dev.yml` (voir S3 en §2). |
| Testcontainers déclaré mais jamais utilisé | `backend/pom.xml:88-104` | `testcontainers`/`junit-jupiter`/`postgresql` (scope test) sont dans les dépendances mais **aucun test ne les utilise** (`@Testcontainers`/`@Container` introuvables dans le code). C'est une occasion manquée : `IssueTrackerApplicationTests` (et potentiellement la vérification runtime de la feature 8) pourrait tourner contre un Postgres éphémère sans dépendre d'une installation locale — recommandation détaillée en §4. |

---

## 4. Test de bout en bout

### 4.1 Ce qui a pu être testé, et comment

Le backend Spring Boot **n'a jamais pu être démarré avec succès** dans cet environnement, ici comme lors de toutes les sessions précédentes : ni Postgres local, ni Docker/WSL ne sont disponibles. Pour confirmer que ce n'est pas un problème de câblage applicatif, une tentative réelle de démarrage (`mvn spring-boot:run`) a été relancée pendant cet audit : **tout le graphe de beans Spring se construit avec succès** (sécurité, controllers, services, repositories, tous les beans nommés `@xxxSecurity`...) ; l'échec ne survient qu'au tout dernier moment, à la résolution du dialecte Hibernate faute de connexion JDBC — exactement le comportement attendu sans base disponible, et une confirmation que le câblage Spring lui-même est correct.

En conséquence :
- **Backend seul** : vérifié par lecture de code exhaustive (ce rapport) + exécution de la suite de tests unitaires/`@WebMvcTest` qui ne nécessitent pas de base (`IssueServiceTest`, `IssueStatusControllerTest`, `IssueSecurityTest`, `CommentSecurityTest`, `CommentSecurityControllerTest`) — **tous passent**. `IssueTrackerApplicationTests` (le seul test nécessitant une vraie base) n'a pas pu tourner.
- **Parcours utilisateur complet** : testé contre le **frontend réel**, branché sur un **serveur mock** Node maison (hors dépôt, non livré) qui reproduit fidèlement le contrat API exact du backend (mêmes enveloppes `GenericType`/`PagedResponse`, mêmes DTOs, mêmes règles métier comme l'immuabilité d'une issue fermée). Ce n'est **pas** un test contre le vrai backend Spring — c'est la meilleure approximation possible dans cet environnement, et elle a l'avantage de tester le frontend réel (React, permissions calculées côté client, gestion d'erreurs, etc.) en conditions quasi réelles.

### 4.2 Parcours demandé — ce qui a fonctionné, ce qui est bloqué

| Étape demandée | Résultat |
|---|---|
| Login | **Impossible** — aucune UI de login n'existe (voir §1). Contourné en utilisant `CURRENT_USER` simulé, déjà "connecté" par construction. |
| Création de projet | **Impossible** — aucune UI (voir §1). |
| Création d'issue | **Impossible via l'UI** — le bouton "Create issue" n'a pas de gestionnaire (voir §1). |
| Assignation d'issue | **Impossible via l'UI** — aucun formulaire de réassignation nulle part (voir §1). Testé indirectement : les issues pré-assignées dans les données de test s'affichent correctement (chips d'avatar, résolution des UUIDs). |
| Changement de statut | **Fonctionne.** Testé : Open → In Progress → Closed, `closed_by`/`closed_at` correctement renseignés et affichés, contrôle de statut se verrouille après fermeture avec message explicite. |
| Ajout de commentaire en réponse | **Fonctionne.** Testé : commentaire de premier niveau + réponse imbriquée, profondeur visuelle plafonnée à 3 niveaux confirmée (0/24/48px), placeholder "[comment deleted]" avec réponses toujours visibles confirmé. |
| Upload d'attachment | **Fonctionne.** Testé avec un vrai fichier (`File`/`DataTransfer`), upload réel, apparition dans la liste, suppression testée également (gated à l'uploader). |
| Fermeture d'issue | **Fonctionne** (cf. changement de statut ci-dessus). Attachments et statut se bloquent bien après fermeture, commentaires restent possibles (conforme au spec). |
| Tentative d'action interdite | **Fonctionne — échoue proprement.** Testé sur une issue où l'utilisateur courant n'a aucun lien (ni reporter, ni assigné, ni leader) : statut/attachments/commentaire tous masqués avec message explicite (`RestrictedNote`), pas de bouton actif à cliquer. Testé aussi le cas intermédiaire (leader de projet sans être assigné) : accès large (édition/attachment) accordé, accès étroit (commentaire/statut) toujours refusé — la distinction à deux niveaux du spec fonctionne exactement comme prévu. Testé également un rollback réseau : en coupant le serveur en plein drag-and-drop, la carte revient à sa position d'origine et une bannière d'erreur apparaît. |
| Édition de profil | **Fonctionne.** Testé de bout en bout cette session : changement de prénom/nom/bio sauvegardé et confirmé, upload+crop d'avatar (glisser dans le cadre, zoom, export 320×320) réellement envoyé au serveur et ré-affiché ensuite sur la page profil, le board (chip d'assigné) et la page de recherche. |

### 4.3 Comportements inattendus notés pendant les tests

- Le bouton "Create issue" de la topbar ne fait strictement rien au clic (pas de handler) — confirmé par inspection DOM (`onclick === null`).
- ~~La sidebar affiche une liste de projets **totalement statique**, indépendante de `GET /api/projects`~~ — **CORRIGÉ** après cet audit : `Sidebar.tsx` utilise maintenant `useProjects()` (même source que la barre de filtres), et ses liens mènent à une vraie page de board filtrée par projet (`ProjectBoardPage.tsx`) avec le leader du projet affiché en en-tête, au lieu du stub cité ci-dessus.
- Aucune erreur console inattendue rencontrée sur les parcours testables (les erreurs observées dans les logs de session provenaient toutes d'un historique de rechargement HMR antérieur, pas d'un état courant réel — vérifié en comparant avec des requêtes réseau fraîches, toutes en 200/201).

### 4.4 Recommandation pour lever le blocage Postgres

Le projet déclare déjà `testcontainers`/`testcontainers-postgresql` dans `pom.xml` (scope test) mais ne les utilise nulle part (voir §3.1). Brancher `IssueTrackerApplicationTests` (et, plus important, un test dédié pour `IssueRepository.findDetailById` avec inspection du SQL généré) sur un `PostgreSQLContainer` via `@Testcontainers`/`@DynamicPropertySource` permettrait de vérifier réellement l'absence de `MultipleBagFetchException` (feature 8) et de faire tourner la suite complète dans n'importe quel environnement disposant de Docker — ce qui n'est pas non plus le cas de cet environnement-ci, mais le serait probablement en CI ou sur la machine de développement habituelle.

---

## Récapitulatif des points à traiter (par sévérité)

**Bloquant / élevé**
1. ~~Aucune authentification frontend (login/register/protected routes)~~ **CORRIGÉ** — §1
2. ~~`JwtAuthenticationFilter` plante sur un token expiré/malformé au lieu de renvoyer 401/403~~ **CORRIGÉ** — §2 (S1)

**Moyen**
3. ~~`CommentService.updateComment` permet de ressusciter un commentaire supprimé~~ **CORRIGÉ** — §2 (S2)
4. ~~`application.properties` orphelin avec mot de passe DB en clair~~ **CORRIGÉ** (fichier supprimé) — §2 (S3)
5. ~~Secret JWT avec valeur de repli codée en dur~~ **CORRIGÉ** (l'app refuse de démarrer sans `JWT_SECRET`) — §2 (S4)
6. ~~Content-type des uploads (attachments + avatar) jamais vérifié par les octets réels~~ **CORRIGÉ** (détection Tika) — §2 (S5)
7. ~~Sidebar déconnectée de la vraie liste de projets (deux sources de vérité)~~ **CORRIGÉ** — §4.3
8. Pas de bouton "Create issue"/formulaire de création de projet/issue/réassignation fonctionnel — §1

**Mineur**
9. `assignedUuids` vide silencieusement ignoré sur `PUT /api/issues/{id}` (impossible de tout désassigner) — §1
10. `DELETE /api/attachments/{id}` ne bloque pas sur issue fermée — §1/§2
11. ~~Pas de `createdAt` sur `Comment`~~ **CORRIGÉ** — §1
12. ~~Leader de projet jamais affiché côté frontend~~ **CORRIGÉ** — §1
13. Code mort (méthodes de service/repository non appelées) — §3.1
14. Pas de système de migration DB versionné — §3
15. Testcontainers déclaré mais inutilisé (occasion manquée pour lever le blocage Postgres) — §3.1/§4.4
16. `application-dev.yml` a un mot de passe DB de repli en clair (`${DB_PASSWORD:seilixx1514}`) — pattern différent de S3 (fichier canonique de dev, pas dupliqué/orphelin) donc pas corrigé automatiquement avec S3 ; à statuer explicitement (acceptable en local, à bannir si ce fichier sert jamais de base pour un environnement partagé)

---

*Rapport généré sans aucune correction appliquée, conformément à la demande. En attente de validation avant de traiter les points un par un.*
