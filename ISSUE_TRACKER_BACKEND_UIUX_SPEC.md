# 11. User Actions Matrix

| Page | Action | Supported by Backend | Endpoint | Role Restriction |
|------|--------|---------------------|----------|------------------|
| Login | Login | Yes | POST /api/auth/login | None |
| Login | Register | Yes | POST /api/auth/register | None |
| Dashboard | View Issues List | Yes | GET /api/issues | Authenticated |
| Dashboard | Create Issue | Yes | POST /api/issues | Authenticated |
| Dashboard | Filter Issues | Yes | GET /api/issues?... | Authenticated |
| Dashboard | Sort Issues | Yes | GET /api/issues?sortBy=... | Authenticated |
| Dashboard | Change Issue Status | Yes | PATCH /api/issues/{id}/status | Admin/Manager/Creator/Assignee |
| Issue Detail | View Details | Yes | GET /api/issues/{id} | Authenticated |
| Issue Detail | Edit Fields | Yes | PUT /api/issues/{id} | Admin/Manager/Creator/Assignee/Leader |
| Issue Detail | Change Status | Yes | PATCH /api/issues/{id}/status | Admin/Manager/Creator/Assignee |
| Issue Detail | Delete Issue | Yes | DELETE /api/issues/{id} | Admin/Manager |
| Issue Detail | Add Comment | Yes | POST /api/issues/{id}/comments | Admin/Manager/Creator/Assignee |
| Issue Detail | Edit Comment | Yes | PUT /api/comments/{id} | Admin/Manager/Author |
| Issue Detail | Delete Comment | Yes | DELETE /api/comments/{id} | Admin/Manager/Author |
| Issue Detail | Upload Attachment | Yes | POST /api/issues/{id}/attachments | Admin/Manager/Creator/Assignee/Leader |
| Issue Detail | Download Attachment | Yes | GET /api/attachments/{id}/content | Authenticated |
| Issue Detail | Delete Attachment | Yes | DELETE /api/attachments/{id} | Admin/Manager/Uploader |
| Project Board | View Project | Yes | GET /api/projects/{id} | Authenticated |
| Project Board | Create Project | Yes | POST /api/projects | Admin/Manager |
| Project Board | Edit Project | Yes | PUT /api/projects/{id} | Admin/Manager |
| Project Board | Delete Project | Yes | DELETE /api/projects/{id} | Admin only |
| Project Board | Change Category | Yes | PATCH /api/projects/{id}/category | Admin only |
| User Search | Search Users | Yes | GET /api/users/search?q=... | Authenticated |
| User Profile | View Profile | Yes | GET /api/users/{uuid}/profile | Authenticated |
| Edit Profile | Update Profile | Yes | PATCH /api/users/me | Authenticated |
| Edit Profile | Upload Avatar | Yes | POST /api/users/me/avatar | Authenticated |
| Admin | List All Users | Yes | GET /api/users | Admin only |
| Admin | Change User Role | Yes | PATCH /api/users/{uuid}/role | Admin only |
| Admin | Delete User | **No** | — | — |
| Admin | Disable User | **No** | — | — |
| Notifications | View Notifications | **No** | — | — |
| Reports | Generate Report | **No** | — | — |
| Reports | Export CSV/PDF | **No** | — | — |

---

# 12. UI States Required

## Issues List / Board

| State | UI Treatment |
|-------|-------------|
| Loading | Skeleton rows/cards |
| Empty | "No issues found" message |
| Error | Error banner with retry button |
| No Results | "No issues match your filters" with clear filters button |
| Unauthorized | Redirect to login |

## Issue Detail Panel

| State | UI Treatment |
|-------|-------------|
| Loading | Skeleton detail view |
| Not Found | "Issue not found" message |
| Error | Error state with retry |
| Forbidden | "You don't have permission" message |
| Closed Issue | Disable edit/attach/status actions, show "Closed" badge |

## Comments Section

| State | UI Treatment |
|-------|-------------|
| Loading | Skeleton comment rows |
| Empty | "No comments yet" with prompt to add |
| Deleted Comment | Show "[comment deleted]" placeholder, preserve thread |

## Attachment Section

| State | UI Treatment |
|-------|-------------|
| Loading | Skeleton attachment rows |
| Empty | "No attachments" |
| Uploading | Progress indicator |
| Upload Error | Error message with retry |
| File Too Large | Error: "File exceeds 10MB limit" |
| Invalid Type | Error: "File type not allowed" |

## Projects List

| State | UI Treatment |
|-------|-------------|
| Loading | Skeleton project items |
| Empty | "No projects yet" with create button (if authorized) |
| Error | Error banner with retry |

## User Search

| State | UI Treatment |
|-------|-------------|
| Loading | Skeleton search results |
| Empty Query | Prompt to enter search term |
| No Results | "No users found" |

## Authentication

| State | UI Treatment |
|-------|-------------|
| Logging In | Loading spinner on button |
| Login Error | Inline error message |
| Registration Validation | Field-level validation errors |
| Session Expired | Auto-redirect to login with message |

---

# 13. Realistic Sample Data

## User

```json
{
  "uuid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "firstName": "Mohamed",
  "lastName": "Ali",
  "username": "mali",
  "role": "MANAGER",
  "bio": "Network operations team lead at Ooredoo",
  "avatarUrl": "/api/users/a1b2c3d4-e5f6-7890-abcd-ef1234567890/avatar"
}
```

## Issue

```json
{
  "id": 42,
  "title": "Base station BSC-042 connectivity drop in Tunis",
  "description": "Intermittent connectivity loss affecting 3G services in central Tunis. RSSI levels fluctuating between -85 and -105 dBm.",
  "status": "IN_PROGRESS",
  "priority": "HIGH",
  "projectId": 3,
  "creatorUuid": "b2c3d4e5-f6a7-8901-bcde-f23456789012",
  "createdAt": "2025-08-18T09:30:00",
  "updatedAt": "2025-08-19T14:22:00",
  "closedAt": null,
  "closedByUuid": null,
  "assignedUuids": ["a1b2c3d4-e5f6-7890-abcd-ef1234567890", "c3d4e5f6-a7b8-9012-cdef-345678901234"]
}
```

## Issue Detail (with comments and attachments)

```json
{
  "id": 42,
  "title": "Base station BSC-042 connectivity drop in Tunis",
  "description": "Intermittent connectivity loss affecting 3G services...",
  "status": "IN_PROGRESS",
  "priority": "HIGH",
  "projectId": 3,
  "creatorUuid": "b2c3d4e5-f6a7-8901-bcde-f23456789012",
  "createdAt": "2025-08-18T09:30:00",
  "updatedAt": "2025-08-19T14:22:00",
  "closedAt": null,
  "closedByUuid": null,
  "assignedUuids": ["a1b2c3d4-e5f6-7890-abcd-ef1234567890"],
  "comments": [
    {
      "id": 101,
      "title": "Initial assessment",
      "content": "Power supply unit showing intermittent faults. Recommend on-site inspection.",
      "issueId": 42,
      "authorUuid": "c3d4e5f6-a7b8-9012-cdef-345678901234",
      "authorUserName": "tech_ops_1",
      "createdAt": "2025-08-18T10:15:00",
      "parentCommentId": null,
      "deleted": false
    },
    {
      "id": 102,
      "title": "Re: Initial assessment",
      "content": "Dispatching field team today. ETA 14:00.",
      "issueId": 42,
      "authorUuid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "authorUserName": "mali",
      "createdAt": "2025-08-18T11:00:00",
      "parentCommentId": 101,
      "deleted": false
    }
  ],
  "attachments": [
    {
      "id": 15,
      "issueId": 42,
      "fileName": "bsc042_rssi_log.csv",
      "contentType": "text/plain",
      "sizeBytes": 45230,
      "uploadedByUuid": "c3d4e5f6-a7b8-9012-cdef-345678901234",
      "uploadedAt": "2025-08-18T10:20:00"
    }
  ]
}
```

## Project

```json
{
  "id": 3,
  "title": "Network Infrastructure — Central Region",
  "description": "Base station maintenance and connectivity monitoring for central Tunisia",
  "category": "INTERNAL",
  "leaderUuid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
}
```

## Comment (Deleted)

```json
{
  "id": 103,
  "title": null,
  "content": "[comment deleted]",
  "issueId": 42,
  "authorUuid": "d4e5f6a7-b8c9-0123-defa-456789012345",
  "authorUserName": "former_user",
  "createdAt": "2025-08-18T12:00:00",
  "parentCommentId": null,
  "deleted": true
}
```

## Paged Response Example

```json
{
  "success": true,
  "message": "List of issues",
  "data": {
    "content": [/* IssueDto array */],
    "page": 0,
    "size": 10,
    "totalElements": 147,
    "totalPages": 15
  }
}
```

---

# 14. UI/UX Design Requirements Based on Backend

## Must Have Pages (Fully Supported)

1. **Login/Register** — Authentication gateway
2. **Dashboard** — Overview with KPI cards (Open, In Progress, Critical, Resolved Today) + issue board/table
3. **Project Board** — Issues filtered by project with full CRUD
4. **Issue Detail Panel/Modal** — Full issue view with comments, attachments, status control
5. **User Search** — Team directory with search
6. **User Profile** — Public profile with assigned/closed issues
7. **Edit Profile** — Personal settings + avatar upload

## Partially Supported Pages

1. **Admin Panel** — Can list users and change roles, but cannot create/delete/disable users
2. **Project Management** — Can CRUD projects but no advanced project settings (members, archiving)
3. **Kanban Board** — Fully functional via status filtering and PATCH status, but pure client-side visualization

## Do Not Design Yet (Not Supported by Backend)

1. **Notifications Page** — No notification system
2. **Reports/Analytics Page** — No reporting endpoints, no export
3. **System Settings** — No application configuration endpoints
4. **User Management (full)** — Cannot delete/disable users
5. **Activity Log / Audit Trail** — No history tracking
6. **Email/Integration Settings** — No integrations

## Available Filters to Integrate

### Issues
- **Project** — Dropdown of available projects
- **Status** — Tabs or dropdown: OPEN, IN_PROGRESS, DONE
- **Priority** — Dropdown: LOW, MEDIUM, HIGH, CRITICAL
- **Assignee** — User search/selection
- **Sort By** — createdAt, updatedAt, status, priority
- **Sort Direction** — Ascending / Descending

### Projects
- **Category** — Tabs or dropdown: SOFTWARE, SUPPORT, INTERNAL

### Users
- **Search Query** — Text input searching across name, username, email

## Available Actions and Buttons

### Global (for authorized users)
- Create Issue (always available)
- Create Project (ADMIN/MANAGER only)

### Issue Detail (contextual based on permissions)
- Edit Issue (broad access: creator/assignee/leader/admin/manager, NOT if DONE)
- Change Status (narrow access: creator/assignee/admin/manager, NOT if DONE)
- Delete Issue (ADMIN/MANAGER only)
- Add Comment (narrow access)
- Edit Comment (author/admin/manager, NOT if deleted)
- Delete Comment (author/admin/manager — soft delete)
- Upload Attachment (broad access, NOT if DONE)
- Download Attachment (any authenticated)
- Delete Attachment (uploader/admin/manager)

### Admin Actions
- Change User Role
- View All Users

## Role-Based UI Requirements

### ADMIN
- See "Admin" section in navigation
- Can access user list
- Can change any user's role
- Can delete any project
- Can change project category
- Can delete any issue
- Can edit/delete any comment

### MANAGER
- Can create/edit projects
- Can delete issues
- Can edit/delete any comment
- Cannot delete projects
- Cannot change roles

### USER
- Can create issues
- Can edit issues they created/are assigned to/lead
- Can comment on issues they created/are assigned to
- Can change status of issues they created/are assigned to
- Can upload attachments to issues they have broad access to
- Can only edit/delete their own comments
- Can only delete their own attachments

## Important Data Relationships for UI

1. **Issue + Project** — Always show project name with issue (issue belongs to exactly one project)
2. **Issue + Creator + Assignees** — Show creator badge and assignee avatars together
3. **Issue + Comments** — Comments must display author info, timestamp, and threading hierarchy
4. **Issue + Attachments** — Attachments should show uploader, size, upload time
5. **User + Avatar** — Avatar is served via separate endpoint; use `avatarUrl` from UserDto
6. **Project + Leader** — Project card must show leader name/avatar
7. **Project + Category** — Category is a required enum; use color-coded badges

## Recommended Navigation Structure

```
Sidebar Navigation
├── Dashboard (/) — Issues board + KPI stats
├── Team (/users/search) — User directory
├── Settings (/profile/edit) — Edit own profile
│
├── Projects (dynamic list grouped by category)
│   ├── Software
│   │   └── Project A (/projects/1)
│   │   └── Project B (/projects/2)
│   ├── Support
│   │   └── Project C (/projects/3)
│   └── Internal
│       └── Project D (/projects/4)
│
└── Admin (visible to ADMIN only)
    └── User Management (/users/search with admin features)
```

## Key UI Behaviors to Implement

1. **Auto-refresh token** — Frontend handles 401 with silent refresh; only redirects to login if refresh fails
2. **Closed Issue Lock** — When status=DONE, disable/hide all edit fields, status changer, and attachment upload. Show "Closed" badge prominently.
3. **Comment Threading** — Indent replies under parent comments; show "[comment deleted]" for soft-deleted comments.
4. **Avatar Fallback** — If `avatarUrl` is null, show initials or default avatar.
5. **Permission-Based Button Visibility** — Compute permissions client-side (mirroring backend rules) to proactively hide/disable actions.
6. **File Upload Validation** — Check file size (10MB for attachments, 3MB for avatars) and type client-side before upload.
7. **Pagination** — Use backend pagination for issues (page + size) and user search.
8. **Dashboard Stats** — Make 6 parallel API calls on dashboard load; cache or debounce to avoid hammering.

---

> **Document Version:** 1.0  
> **Generated From:** Direct analysis of backend source code (Spring Boot + JPA + PostgreSQL) and frontend source code (React + Vite + TypeScript)  
> **Rule Compliance:** No features, endpoints, fields, or relationships have been invented. All information is derived directly from existing code.
