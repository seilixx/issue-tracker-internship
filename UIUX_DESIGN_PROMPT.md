# Prompt UI/UX Design — Issue Tracker Ooredoo

> **Contexte :** Tu es un designer UI/UX senior spécialisé dans les applications web d'entreprise B2B. Tu dois concevoir l'interface complète d'une application Issue Tracker destinée à Ooredoo (opérateur télécom). 
>
> **Contrainte absolue :** Chaque écran, composant et interaction que tu proposes doit être réalisable avec le backend existant. Tu ne dois PAS proposer de fonctionnalités qui n'existent pas dans le backend. Consulte le document `ISSUE_TRACKER_BACKEND_UIUX_SPEC.md` comme source de vérité.
>
> **Livrable attendu :** Un design system complet + maquettes détaillées pour toutes les pages supportées, sous forme de spécifications textuelles précises qu'un développeur front-end peut implémenter.

---

## 1. IDENTITÉ VISUELLE & DESIGN SYSTEM

### Marque & Contexte
- **Entreprise :** Ooredoo — opérateur télécom majeur en Tunisie et dans la région MENA
- **Contexte métier :** Suivi d'incidents réseau, maintenance infrastructure, gestion de projets télécoms
- **Ton :** Professionnel, fiable, orienté données, clair et efficace
- **Public :** Équipes techniques (NOC, ingénieurs réseau), managers de projet, administrateurs système

### Palette de couleurs (suggérée — adaptée au contexte Ooredoo)

```
PRIMARY
- primary-500 : #E60000 (Rouge Ooredoo — identité marque)
- primary-600 : #CC0000
- primary-400 : #FF3333

SECONDARY (Teal/Technique)
- secondary-500 : #0D7377
- secondary-600 : #095A5D
- secondary-400 : #14A0A5

NEUTRAL
- neutral-900 : #111827 (Texte principal)
- neutral-700 : #374151 (Texte secondaire)
- neutral-500 : #6B7280 (Texte tertiaire, placeholders)
- neutral-300 : #D1D5DB (Bordures)
- neutral-200 : #E5E7EB (Séparateurs)
- neutral-100 : #F3F4F6 (Fonds alternés)
- neutral-50  : #F9FAFB (Fond principal)

SEMANTIC
- success-500 : #10B981 (Résolu, succès)
- warning-500 : #F59E0B (En attente, avertissement)
- danger-500  : #EF4444 (Critique, erreur)
- info-500    : #3B82F6 (Information, en cours)
```

### Typographie
- **Police principale :** Inter ou Roboto — lisible à petite taille, professionnelle
- **Hiérarchie :**
  - H1 (Page title) : 24px / 700 / tracking-tight
  - H2 (Section title) : 18px / 600
  - H3 (Card title) : 16px / 600
  - Body : 14px / 400 / line-height 1.5
  - Small / Caption : 12px / 400
  - Label / Badge : 11px / 600 / uppercase

### Espacement & Layout
- **Max-width :** 1440px (centered)
- **Sidebar :** 240px expanded / 64px collapsed
- **Topbar :** 56px fixed height
- **Content padding :** 24px
- **Card border-radius :** 8px
- **Button border-radius :** 6px
- **Input border-radius :** 6px
- **Shadows :**
  - sm : 0 1px 2px rgba(0,0,0,0.05)
  - md : 0 4px 6px rgba(0,0,0,0.07)
  - lg : 0 10px 15px rgba(0,0,0,0.1)

### Composants de base (spécifications)

#### Boutons
```
PRIMARY
- Fond : primary-500, Texte : white
- Hover : primary-600
- Active : primary-600 + shadow-sm
- Disabled : neutral-300 + text-neutral-500
- Padding : 8px 16px
- Font : 14px / 500

SECONDARY
- Fond : white, Bordure : neutral-300, Texte : neutral-700
- Hover : neutral-50
- Même padding et font

GHOST
- Fond : transparent, Texte : primary-500
- Hover : primary-50

DANGER
- Fond : danger-500, Texte : white
- Hover : #DC2626
```

#### Inputs
```
- Hauteur : 36px
- Bordure : 1px solid neutral-300
- Border-radius : 6px
- Padding : 8px 12px
- Focus : border-primary-500 + ring-2 ring-primary-200
- Error : border-danger-500 + ring-2 ring-danger-200
- Placeholder : neutral-400
```

#### Badges / Tags
```
STATUS
- OPEN         : bg-blue-50   text-blue-700   border-blue-200
- IN_PROGRESS  : bg-amber-50  text-amber-700  border-amber-200
- DONE         : bg-green-50  text-green-700  border-green-200

PRIORITY
- LOW      : bg-neutral-100  text-neutral-600  border-neutral-200
- MEDIUM   : bg-blue-50      text-blue-700     border-blue-200
- HIGH     : bg-orange-50    text-orange-700   border-orange-200
- CRITICAL : bg-red-50       text-red-700      border-red-200   + icon alert

ROLE
- ADMIN   : bg-purple-50  text-purple-700  border-purple-200
- MANAGER : bg-teal-50    text-teal-700    border-teal-200
- USER    : bg-neutral-50 text-neutral-600 border-neutral-200
```

#### Avatars
```
- Small  : 24px (table rows, comments)
- Medium : 32px (cards, assignee lists)
- Large  : 64px (profile pages)
- Fallback : Initials sur fond neutre dérivé du nom
```

---

## 2. STRUCTURE DE NAVIGATION

### Sidebar (Navigation principale)

```
┌─────────────────────────────────────┐
│  🔴  IssueTracker        [≡]        │  ← Brand + Collapse toggle
├─────────────────────────────────────┤
│  ◆ Dashboard                        │  ← / (index)
│  👥 Team                            │  ← /users/search
│  ⚙️ Settings                        │  ← /profile/edit
├─────────────────────────────────────┤
│  📁 Projects              [+]       │  ← Section header + Create (if ADMIN/MANAGER)
│     Software                        │  ← Category group
│       ○ Network Infra               │  ← /projects/3
│       ○ Billing System              │  ← /projects/1
│     Support                         │
│       ○ Customer Care               │  ← /projects/2
│     Internal                        │
│       ○ HR Portal                   │  ← /projects/4
├─────────────────────────────────────┤
│  🛡️ Admin (ADMIN only)              │  ← Visible uniquement pour ADMIN
│     User Management                 │  ← /users/search (mode admin)
└─────────────────────────────────────┘
```

**Comportements :**
- Collapsible : 240px → 64px (icons only)
- Projects listée par catégorie (SOFTWARE, SUPPORT, INTERNAL)
- Indicateur actif : fond primary-50 + bordure gauche primary-500
- Badge "+" pour créer projet (visible si role ADMIN ou MANAGER)

### Topbar

```
┌──────────────────────────────────────────────────────────────────────┐
│  Dashboard                                    [🔍] [🔔] [👤 Moha ▼]  │
│  (Breadcrumb / Page title)                                           │
└──────────────────────────────────────────────────────────────────────┘
```

**Éléments :**
- Titre de page contextuel
- Barre de recherche globale (recherche d'utilisateurs — déclenche /users/search)
- Bouton notifications (placeholder — backend non implémenté, afficher badge "0" ou cacher)
- User Menu (avatar + nom) : dropdown avec Profile, Settings, Logout

---

## 3. PAGES DÉTAILLÉES

### Page 1 — Login

**Layout :** Centré, card sur fond dégradé subtil (neutral-50 → neutral-100)

```
┌────────────────────────────────────────┐
│                                        │
│           🔴 IssueTracker              │
│                                        │
│   ┌────────────────────────────────┐   │
│   │         Welcome back           │   │
│   │   Sign in to your account      │   │
│   │                                │   │
│   │   Username                     │   │
│   │   [____________________]       │   │
│   │                                │   │
│   │   Password                     │   │
│   │   [____________________] 👁️    │   │
│   │                                │   │
│   │   [      Sign In      ]        │   │ ← Primary button, full width
│   │                                │   │
│   │   Don't have an account?       │   │
│   │   Sign up                      │   │ ← Link vers /register
│   └────────────────────────────────┘   │
│                                        │
└────────────────────────────────────────┘
```

**États :**
- Loading : spinner sur le bouton, inputs disabled
- Error : message inline rouge sous le formulaire
- Validation : messages sous chaque champ (ex: "Username is required")

### Page 2 — Register

**Layout :** Même structure que Login

```
┌────────────────────────────────────────┐
│   Create your account                  │
│   ─────────────────────────────────    │
│   First Name       Last Name           │
│   [________]       [________]          │
│   Username                             │
│   [________________________]           │
│   Email                                │
│   [________________________]           │
│   Password                             │
│   [________________________]           │
│   [      Create Account    ]           │
│   Already have an account? Sign in     │
└────────────────────────────────────────┘
```

**Validation :**
- Username : requis, unique (vérifié côté serveur)
- Email : requis, format valide, unique
- Password : min 6 caractères

### Page 3 — Dashboard

**Layout :** Full width, vertical stack

```
┌──────────────────────────────────────────────────────────────────────┐
│  Dashboard                                              [+ New Issue]│
├──────────────────────────────────────────────────────────────────────┤
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌────────────────┐│
│  │  47     │ │  23     │ │   5     │ │   3     │ │    [DONUT]     ││
│  │ Open    │ │ In Prog │ │ Critical│ │Resolved │ │  By Priority   ││
│  │ 32% ▓▓▓ │ │ 16% ▓▓  │ │  3% ▓   │ │  2% ▓   │ │ L M H C        ││
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └────────────────┘│
├──────────────────────────────────────────────────────────────────────┤
│  [Board ▼] [Table ▼]          Filter: [All Projects ▼] [Status ▼]  │
│  [Priority ▼] [Assignee ▼]              [Clear] [Sort ▼]             │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                │
│   │ 🟡 IN_PROG   │ │ 🔵 OPEN      │ │ 🟢 DONE      │                │
│   │              │ │              │ │              │                │
│   │ ┌──────────┐ │ │ ┌──────────┐ │ │ ┌──────────┐ │                │
│   │ │#42 BSC-..│ │ │ │#38 Anten.│ │ │ │#15 Power.│ │                │
│   │ │HIGH 🔴   │ │ │ │MEDIUM 🟡 │ │ │ │DONE ✅   │ │                │
│   │ │👤 👤     │ │ │ │👤        │ │ │ │👤        │ │                │
│   │ └──────────┘ │ │ └──────────┘ │ │ └──────────┘ │                │
│   │ ┌──────────┐ │ │              │ │              │                │
│   │ │#45 Fiber.│ │ │              │ │              │                │
│   │ │CRITICAL🔴│ │ │              │ │              │                │
│   │ └──────────┘ │ │              │ │              │                │
│   └──────────────┘ └──────────────┘ └──────────────┘                │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Composants clés :**

#### KPI Cards (Row)
- 4 stat cards + 1 donut chart card
- Chaque card : valeur en grand (28px / 700), label en petit, barre de progression (% du total)
- Loading : afficher "—" comme valeur
- Critical card : icône triangle d'alerte orange

#### Donut Chart (Priority Distribution)
- 4 segments : LOW, MEDIUM, HIGH, CRITICAL
- Couleurs : gris, bleu, orange, rouge
- Center : total issues ou label
- Légende à droite ou en dessous

#### Filtres Bar
- View toggle : Board | Table (segmented control)
- Project filter : dropdown (groupé par catégorie)
- Status filter : multi-select ou dropdown
- Priority filter : dropdown
- Assignee filter : user search dropdown
- Sort : sortBy + sortDir
- Clear button (visible seulement si filtres actifs)

#### Board View (Kanban)
- 3 colonnes : OPEN (bleu), IN_PROGRESS (ambre), DONE (vert)
- Cartes drag-and-drop (visuellement — le backend accepte PATCH status)
- Chaque carte : #ID, Titre, Priority badge, Assignee avatars (max 3)
- Scroll vertical indépendant par colonne
- Colonne header : statut + compteur

#### Table View
- Colonnes : ID, Title, Status, Priority, Project, Assignees, Created
- Row clickable → ouvre detail panel
- Pagination : page numbers + "Showing X-Y of Z"
- Sortable headers : flèche ↑↓ sur colonnes triables

### Page 4 — Project Board (/projects/:id)

**Layout :** Même structure que Dashboard mais avec header projet

```
┌──────────────────────────────────────────────────────────────────────┐
│  Network Infrastructure — Central Region                [Edit] [⚙️] │
│  📁 INTERNAL  •  Led by Mohamed Ali                                  │
├──────────────────────────────────────────────────────────────────────┤
│  [Même contenu que Dashboard — IssuesView filtré par projectId]      │
│                                                                      │
│  [Board/Table avec filtres]                                          │
└──────────────────────────────────────────────────────────────────────┘
```

**Project Header :**
- Titre du projet
- Catégorie badge
- Leader avatar + nom
- Actions : Edit (ADMIN/MANAGER), Delete (ADMIN — avec confirmation modal)

**Actions contextuelles :**
- Edit Project Modal : titre, description, leader (user search)
- Delete : confirmation "Are you sure? This will delete all issues in this project."

### Page 5 — Issue Detail Panel (Slide-over / Modal)

**Layout :** Slide-over from right (width 560px) ou Modal centered (large)

```
┌────────────────────────────────────────────────────┐
│  #42                                  [✕]          │
│  Base station BSC-042 connectivity drop in Tunis   │
│  ───────────────────────────────────────────────── │
│  Status : [OPEN ▼] → [IN_PROGRESS ▼] → [DONE ▼]  │
│  [Status control : dropdown ou boutons progression]│
│                                                      │
│  ┌────────────────────────────────────────────┐    │
│  │ Priority : HIGH 🔴                         │    │
│  │ Project : Network Infrastructure           │    │
│  │ Created : Aug 18, 2025 by tech_ops_1       │    │
│  │ Assignees : 👤 👤 [+ Add]                  │    │
│  └────────────────────────────────────────────┘    │
│                                                      │
│  Description                                        │
│  [Textarea — éditable si permissions]               │
│                                                      │
│  ┌────────────────────────────────────────────┐    │
│  │ 💬 Comments (3)                            │    │
│  │                                            │    │
│  │ 👤 tech_ops_1 • 2d ago                     │    │
│  │ Initial assessment                         │    │
│  │ Power supply unit showing...               │    │
│  │  [Reply] [Edit] [Delete]                   │    │
│  │                                            │    │
│  │   ↳ 👤 mali • 2d ago                       │    │
│  │     Re: Initial assessment                 │    │
│  │     Dispatching field team...              │    │
│  │                                            │    │
│  │ [Add comment...]                           │    │
│  └────────────────────────────────────────────┘    │
│                                                      │
│  ┌────────────────────────────────────────────┐    │
│  │ 📎 Attachments (1)              [Upload +] │    │
│  │ 📄 bsc042_rssi_log.csv (45 KB)   [⬇] [🗑]│    │
│  │    Uploaded by tech_ops_1 • Aug 18        │    │
│  └────────────────────────────────────────────┘    │
│                                                      │
│  [Save changes] [Cancel]              [Delete Issue] │
└────────────────────────────────────────────────────┘
```

**États de l'issue :**

**OPEN / IN_PROGRESS (editable) :**
- Titre éditable
- Description éditable (textarea riche ou simple)
- Priority éditable (dropdown)
- Project éditable (dropdown)
- Assignees éditables (multi-select user search)
- Status changeable via control
- Comment input visible
- Upload attachment button visible

**DONE (read-only / restricted) :**
- Badge "CLOSED" prominent (rouge)
- Titre/description en read-only
- Status control disabled (montre "Closed on Aug 19 by mali")
- Comment input visible (comments still allowed)
- Upload attachment button hidden/disabled
- Edit fields hidden behind "Issue is closed" notice

**Permissions visuelles :**
- Si l'utilisateur n'a pas le droit d'éditer : cacher les boutons d'action, rendre les champs read-only
- Bouton Delete Issue : visible uniquement ADMIN/MANAGER

**Comment Threading :**
- Comment parent : aligné à gauche, pleine largeur
- Reply : indenté (24px), bordure gauche subtile
- Deleted comment : texte italique gris "[comment deleted]", sans actions
- Chaque comment : avatar (24px), username, timestamp relatif ("2d ago"), titre en gras, contenu
- Actions par comment : Reply, Edit (auteur/admin/manager), Delete (auteur/admin/manager — soft delete)

### Page 6 — Create Issue Modal

```
┌────────────────────────────────────────┐
│  Create New Issue            [✕]       │
│  ──────────────────────────────────    │
│  Title *                               │
│  [______________________________]      │
│  Description                           │
│  [                              ]      │
│  [                              ]      │
│  Priority *        Project *           │
│  [CRITICAL ▼]      [Network Inf ▼]     │
│  Assignees                             │
│  [Search users...] → dropdown          │
│  [👤 mali] [👤 tech_ops_1] [×]        │
│                                        │
│  [    Create Issue    ]  [Cancel]      │
└────────────────────────────────────────┘
```

**Champs obligatoires :** Title, Priority, Project
**Assignee search :** Appel à `GET /api/users/search?q=...`

### Page 7 — Team / User Search (/users/search)

```
┌──────────────────────────────────────────────────────────────────────┐
│  Team                                                  [Search bar]  │
├──────────────────────────────────────────────────────────────────────┤
│  Search by name, username, or email                                  │
│  [________________________________________] [Search]                 │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐     │
│  │ 👤  Mohamed Ali        mali             MANAGER            │     │
│  │     Network operations team lead                           │     │
│  │     [View Profile]                                         │     │
│  ├────────────────────────────────────────────────────────────┤     │
│  │ 👤  Sara Ben           sara_b           USER               │     │
│  │     Field engineer                                           │     │
│  ├────────────────────────────────────────────────────────────┤     │
│  │ 👤  Ahmed K            ahmed_k          ADMIN              │     │
│  └────────────────────────────────────────────────────────────┘     │
│                                                                      │
│  [<] 1  2  3  ...  15  [>]                                          │
└──────────────────────────────────────────────────────────────────────┘
```

**Pour ADMIN uniquement :**
- Dropdown de rôle sur chaque carte (éditable inline)
- "User Management" mode avec colonne actions

### Page 8 — User Profile (/profile/:uuid)

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐     │
│  │                    [👤 Avatar 80px]                        │     │
│  │                    Mohamed Ali                             │     │
│  │                    @mali     MANAGER                       │     │
│  │                    Network operations team lead            │     │
│  │                    [Edit Profile] (if own profile)         │     │
│  └────────────────────────────────────────────────────────────┘     │
│                                                                      │
│  ┌─────────────┐  ┌─────────────┐                                   │
│  │  12         │  │   5         │                                   │
│  │  Assigned   │  │  Closed     │                                   │
│  └─────────────┘  └─────────────┘                                   │
│                                                                      │
│  Assigned Issues (12)                                  [View All →] │
│  ┌────────────────────────────────────────────────────────────┐     │
│  │ #42  BSC-042 drop...    HIGH   IN_PROGRESS   Aug 18       │     │
│  │ #38  Antenna align...   MEDIUM OPEN          Aug 17       │     │
│  └────────────────────────────────────────────────────────────┘     │
│  [Pagination]                                                        │
│                                                                      │
│  Closed Issues (5)                                                   │
│  ┌────────────────────────────────────────────────────────────┐     │
│  │ #15  Power outage...    HIGH   DONE          Aug 15       │     │
│  └────────────────────────────────────────────────────────────┘     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Page 9 — Edit Profile (/profile/edit)

```
┌──────────────────────────────────────────────────────────────────────┐
│  Settings                                                            │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Profile Picture                                                     │
│  [👤 Avatar 96px]  [Change Photo]                                    │
│  Max 3MB. PNG, JPEG, GIF, WEBP.                                     │
│                                                                      │
│  First Name *                                                        │
│  [Mohamed____________________]                                       │
│                                                                      │
│  Last Name *                                                         │
│  [Ali________________________]                                       │
│                                                                      │
│  Bio                                                                 │
│  [Network operations team lead at Ooredoo________]                   │
│  [________________________________________________]                  │
│                                                                      │
│  [    Save Changes    ]                                              │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Avatar upload :**
- Zone de drop ou bouton "Change Photo"
- Preview immédiate
- Validation : max 3MB, types images uniquement
- Crop optionnel (si librairie disponible)

---

## 4. ÉTATS & FEEDBACK UI

### Toast Notifications
Position : bottom-right
```
Success : 🟢 Title + message, auto-dismiss 4s
Error   : 🔴 Title + message, persiste jusqu'à fermeture
Warning : 🟡 Title + message, auto-dismiss 6s
Info    : 🔵 Title + message, auto-dismiss 4s
```

### Loading States
- **Page initiale :** Skeleton screens (pas de spinner plein écran)
- **Cards :** Shimmer effect sur les valeurs
- **Tables :** 5-10 rows skeleton
- **Buttons :** Spinner à l'intérieur du bouton, texte caché

### Empty States
```
Issues :
┌──────────────────────────┐
│    📭                    │
│  No issues found         │
│  Create your first issue │
│  [+ New Issue]           │
└──────────────────────────┘

Comments :
┌──────────────────────────┐
│  No comments yet         │
│  Be the first to comment │
└──────────────────────────┘

Search :
┌──────────────────────────┐
│  No users match "xyz"    │
│  Try a different search  │
└──────────────────────────┘
```

### Error States
```
┌──────────────────────────┐
│    ⚠️                    │
│  Couldn't load data      │
│  Something went wrong    │
│  [Retry]                 │
└──────────────────────────┘
```

### Modals de confirmation
```
Delete Issue :
┌──────────────────────────┐
│  ⚠️ Delete Issue?        │
│  This action cannot be   │
│  undone.                 │
│  [Cancel]  [Delete]      │
└──────────────────────────┘

Delete Project :
┌──────────────────────────┐
│  ⚠️ Delete Project?      │
│  This will also delete   │
│  all issues in this      │
│  project.                │
│  [Cancel]  [Delete]      │
└──────────────────────────┘
```

---

## 5. INTERACTIONS & MICRO-INTERACTIONS

### Drag & Drop (Kanban)
- **Drag start :** Card légèrement réduite (scale 0.95), ombre portée accentuée
- **Drag over column :** Column highlight (border dashed primary-400, fond primary-50)
- **Drop :** Animation snap, PATCH status API call, toast success/error
- **Non autorisé :** Cursor not-allowed, tooltip "You don't have permission"

### Hover Effects
- **Cards :** translateY(-2px) + shadow-md
- **Rows :** fond neutral-50
- **Buttons :** brightness adjustment
- **Avatars :** scale(1.1) + tooltip avec nom complet

### Status Transition Animation
```
OPEN → IN_PROGRESS : slide droite, couleur bleu → ambre
IN_PROGRESS → DONE : slide droite, couleur ambre → vert, badge "Closed" apparait
```

### Comment Thread
- **Reply :** Click "Reply" → input apparaît indenté sous le comment
- **Edit :** Click "Edit" → comment devient textarea inline
- **Delete :** Click "Delete" → confirmation → soft delete (grisé, "[comment deleted]")

### File Upload
- **Drag & drop zone :** Bordure dashed qui devient solid au drag
- **Progress :** Barre horizontale ou spinner circulaire
- **Success :** Checkmark + fade in dans la liste
- **Error :** Message inline rouge (taille, type)

---

## 6. RESPONSIVE DESIGN

### Breakpoints
```
Mobile  : < 640px   (sm)
Tablet  : 640-1024px (md/lg)
Desktop : > 1024px   (xl)
```

### Mobile (< 640px)
- Sidebar : drawer slide-in from left (overlay), toggle via hamburger
- Topbar : titre + hamburger + user menu
- Dashboard : KPI cards en 2-col grid, puis 1-col
- Board : horizontal scroll entre colonnes (swipe) ou single column
- Table : transformée en cards list
- Detail Panel : full-screen modal au lieu de slide-over
- Filters : collapsible section ou bottom sheet

### Tablet (640-1024px)
- Sidebar : collapsed by default (64px), expandable
- Board : 3 colonnes visibles
- Table : toutes les colonnes avec scroll horizontal si nécessaire

### Desktop (> 1024px)
- Sidebar : expanded (240px)
- Board : 3 colonnes fixes
- Table : toutes colonnes visibles
- Detail Panel : slide-over 560px from right

---

## 7. ACCESSIBILITÉ (A11Y)

### Requis
- **Contraste :** Minimum 4.5:1 pour le texte
- **Focus visible :** Ring 2px primary-500 sur tous les éléments interactifs
- **ARIA labels :** Tous les boutons icon-only (ex: [×], [🗑], [⬇])
- **Keyboard navigation :**
  - Tab order logique
  - Escape ferme modals/panels
  - Enter/Space active boutons
  - Flèches naviguent dans dropdowns
- **Screen reader :**
  - `aria-expanded` sur dropdowns
  - `aria-selected` sur options
  - `aria-live="polite"` sur les toasts
  - Status badges avec `sr-only` texte descriptif
- **Réduction de mouvement :** Respecter `prefers-reduced-motion`

---

## 8. SPÉCIFICITÉS MÉTIER TÉLÉCOM

### Contexte dans les données exemples
- Issues : "Base station BSC-042 connectivity drop", "Antenna alignment", "Power supply fault"
- Projets : "Network Infrastructure — Central Region", "Customer Care"
- Priorités : incidents réseau CRITICAL = impact service client

### Terminologie UI
- "Issue" → garder le terme anglais (c'est le nom du produit)
- "Assignee" → "Assigné" ou garder en anglais
- "Status : OPEN" → "À traiter" ou "Ouvert"
- "Status : IN_PROGRESS" → "En cours"
- "Status : DONE" → "Résolu"
- "Priority : CRITICAL" → "Critique" + icône d'alerte

### Badges réseau (optionnel — si on veut enrichir)
Bien que le backend n'ait pas de champ "type d'incident", on peut suggérer des icônes contextuelles basées sur le titre :
- 🗼 Antenne / BTS
- 🔌 Alimentation
- 🌐 Connectivité
- 📡 Transmission

---

## 9. CHECKLIST DE LIVRABLES

Pour chaque page, fournir :
- [ ] Wireframe / structure (ASCII ou description)
- [ ] Spécifications de layout (grids, flex, gaps)
- [ ] Liste des composants réutilisables utilisés
- [ ] Spécifications des états (loading, empty, error, success)
- [ ] Interactions et transitions
- [ ] Responsive behavior par breakpoint
- [ ] Notes d'accessibilité spécifiques

Pages à maquetter :
1. [ ] Login
2. [ ] Register
3. [ ] Dashboard (Board view)
4. [ ] Dashboard (Table view)
5. [ ] Project Board
6. [ ] Issue Detail Panel (OPEN/IN_PROGRESS)
7. [ ] Issue Detail Panel (DONE — read-only)
8. [ ] Create Issue Modal
9. [ ] Edit Issue Modal
10. [ ] Team / User Search
11. [ ] User Profile
12. [ ] Edit Profile
13. [ ] Admin — User Management
14. [ ] Empty States (collection)
15. [ ] Error States (collection)

---

> **Rappel final :** Ce design doit être 100% réalisable avec le backend documenté dans `ISSUE_TRACKER_BACKEND_UIUX_SPEC.md`. Ne pas inventer de pages comme "Notifications", "Reports", ou "System Settings" — elles n'ont pas d'endpoints backend.
