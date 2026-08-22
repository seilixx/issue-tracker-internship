# Ooredoo Issue Tracker — Frontend

React 19 + TypeScript + Vite SPA for the IssueTracker backend. The UI layer
follows the reference design (Tailwind CSS 3 + shadcn/ui + lucide icons) and is
wired directly to the real backend API — there is no mock data anywhere.

## Stack

| Layer | Choice |
|---|---|
| Framework | React 19, TypeScript (strict), Vite 8 |
| Routing | `react-router-dom` 7 (`createBrowserRouter`) |
| Styling | Tailwind CSS 3 + shadcn/ui primitives (`src/components/ui/`) |
| Icons | `lucide-react` |
| Toasts | `sonner` |
| HTTP | `axios` (`src/utils/apiClient.ts`) |
| Lint | `oxlint` |

Design tokens (in `src/index.css` as HSL CSS variables): primary `#E60012`,
dark red `#B0000E`, background `#F7F8FA`, borders `#E5E7EB`. Inter is bundled
via `@fontsource-variable/inter` — no external font requests.

## Project layout

```
src/
├── main.tsx              # RouterProvider + <Toaster/>
├── App.tsx               # Auth gate, global Issue form/detail overlays, route wrappers
├── routes/router.tsx     # Route table (see below)
├── types/index.ts        # UI domain types (epoch-ms timestamps)
├── store/AppStore.tsx    # Single app store — see "State & data flow"
├── lib/
│   ├── api.ts            # All backend calls + DTO→UI mapping (ISO→ms, null normalization)
│   ├── permissions.ts    # Role-based UI gates — mirrors backend authorization
│   ├── helpers.ts        # timeAgo, formatDate, labels, orders
│   ├── issueQuery.ts     # Client-side filter/sort for the issue list
│   └── utils.ts          # cn() (clsx + tailwind-merge)
├── components/           # AppShell, KanbanBoard, IssueTable, FilterBar,
│                         # IssueDetail, IssueForm, ProjectForm, AssigneePicker, bits
│   └── ui/               # shadcn primitives (only the ones actually used)
├── pages/                # Auth, Dashboard, BoardPage, ProjectPage, TeamPage,
│                         # Profiles, AdminUsers
└── utils/
    ├── apiClient.ts      # axios instance: bearer token, single-flight refresh,
    │                     # 401 → refresh → retry → redirect-to-login
    └── apiTypes.ts       # GenericResponse / PagedResponse envelopes
```

## State & data flow

`src/store/AppStore.tsx` is the single source of truth (React context). It
deliberately exposes the same interface the reference UI was built against, but
every method is backed by the real API:

- **Session**: on mount, a persisted token is validated via `GET /users/me`.
  Login/register store both tokens, fetch the profile, then hydrate.
- **Hydration**: projects (`GET /projects`), users (`GET /users` for admins,
  `GET /users/search?q=` for everyone else), and the full issue list (paged
  `GET /issues` loop, page size 200) — the UI filters/sorts client-side via
  `lib/issueQuery.ts`.
- **Detail on open**: comments and attachments load lazily via
  `GET /issues/{id}` when an issue is opened.
- **Optimistic updates with rollback**: issue status changes
  (`PATCH /issues/{id}/status`) and admin role changes
  (`PATCH /users/{uuid}/role`) apply locally first and roll back with an error
  toast if the server rejects them.
- **Auth failure**: any 401 that survives the silent refresh attempt in
  `apiClient.ts` triggers the same clean logout as the menu button (tokens
  cleared, redirect to `/login`).

## Routes

| Path | Page | Notes |
|---|---|---|
| `/login`, `/register` | Auth | bounce to `/dashboard` when already signed in |
| `/dashboard` | Dashboard | `/` redirects here (legacy bookmark) |
| `/board` | Issue board | kanban + table views |
| `/projects/:projectId` | Project page | |
| `/team` | Team directory | `/users/search` redirects here (legacy) |
| `/profile` | My profile | `/profile/edit` redirects here (legacy) |
| `/users/:uuid` | User profile | `/profile/:uuid` redirects here (legacy) |
| `/admin/users` | User management | admin-only (gated in UI **and** by the backend) |

## Running locally

Prerequisites: Node 20+, Java 21, and PostgreSQL on `localhost:5432`.

**1. Database** — create the database once:

```sql
CREATE DATABASE issuetracker;
```

**2. Backend** (from `backend/`) — `JWT_SECRET` is mandatory, the app refuses
to start without it:

```bash
export JWT_SECRET=$(openssl rand -base64 32)   # PowerShell: $env:JWT_SECRET = "..."
./mvnw spring-boot:run                          # serves http://localhost:8080
```

Default dev datasource is `jdbc:postgresql://localhost:5432/issuetracker` with
user `postgres` (override via `DB_URL` / `DB_USERNAME` / `DB_PASSWORD`).

**3. Frontend** (from `frontend/`):

```bash
npm install
npm run dev        # http://localhost:5173, proxies /api → localhost:8080
```

Other scripts: `npm run build` (type-check + production build),
`npm run lint` (oxlint), `npm run preview`.

## Conventions worth knowing

- **Timestamps**: the backend speaks ISO-8601; `lib/api.ts` converts to epoch
  ms at the boundary. All UI code uses numbers.
- **Comment edits** must resend `title` and `issueId` — the backend's
  `CommentDto` validates `issueId` as `@NotNull` and `updateComment` replaces
  title+content.
- **Issue updates** never send `status` (transitions only via
  `PATCH /issues/{id}/status`); **project updates** never send `category`
  (admin-only `PATCH /projects/{id}/category`).
- **Permission gates** in `lib/permissions.ts` hide/disable unauthorized
  actions; the backend enforces the same rules — treat the client checks as
  UX, not security.
- New accounts register with the `USER` role; an admin promotes roles from
  `/admin/users` (or directly in the DB for the very first admin).
