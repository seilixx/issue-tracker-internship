# IssueTracker MCP Server

A [Model Context Protocol](https://modelcontextprotocol.io) server that exposes
the IssueTracker REST API as MCP tools, so AI clients (Claude Desktop, Cursor,
…) can query and manipulate projects and issues in natural language.

The server is a **thin translation layer**: it contains no business logic.
Validation, authorization (`@PreAuthorize`) and status-transition rules all
live in the Spring Boot backend and apply to these calls exactly like they
apply to the web UI.

## Architecture

```
AI client (Claude Desktop / Cursor)
   │  MCP protocol (JSON-RPC over stdio)
   ▼
mcp-server (this project)
   │  HTTP + JWT of a dedicated service account
   ▼
IssueTracker backend (Spring Boot)  →  PostgreSQL
```

## Tools

| Tool | Purpose | Backend endpoint |
|---|---|---|
| `list_projects` | List all projects (find `projectId`) | `GET /api/projects` |
| `search_issues` | Filter issues by project/status/priority/assignee | `GET /api/issues` |
| `get_issue` | Full issue detail incl. comments & attachments | `GET /api/issues/{id}` |
| `search_users` | Resolve people to uuids (find `assignedUuids`) | `GET /api/users/search` |
| `create_issue` | Create an issue (status OPEN) | `POST /api/issues` |
| `update_issue_status` | OPEN / IN_PROGRESS / DONE (DONE is terminal) | `PATCH /api/issues/{id}/status` |
| `assign_issue` | Replace an issue's assignees | `PUT /api/issues/{id}` |
| `add_comment` | Comment on an issue (threaded replies supported) | `POST /api/issues/{id}/comments` |

Backend errors (403 forbidden, 404 not found, 409 closed-issue, 400
validation) are returned to the AI client as tool errors, so the assistant can
explain *why* an action was refused instead of failing silently.

## Setup

```bash
cd mcp-server
npm install
npm run build        # compiles src/ → dist/
```

### Service account

The server authenticates against the backend as a dedicated user. Create it
once via `POST /api/auth/register` (or the UI), then set the environment
variables the server reads at startup:

| Variable | Default | Purpose |
|---|---|---|
| `ISSUE_TRACKER_API_URL` | `http://localhost:8080/api` | Backend base URL |
| `ISSUE_TRACKER_USERNAME` | — (required) | Service account username |
| `ISSUE_TRACKER_PASSWORD` | — (required) | Service account password |

The account's **role defines what the AI may do** (backend-enforced): `USER`
can comment/change status on its own issues, `MANAGER` can additionally
create/edit projects and issues. `ADMIN` is not needed for these tools.

## Client configuration

### Claude Desktop

Edit `%APPDATA%\Claude\claude_desktop_config.json` (Windows) or
`~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) —
see [`claude_desktop_config.example.json`](claude_desktop_config.example.json):

```json
{
  "mcpServers": {
    "issue-tracker": {
      "command": "node",
      "args": ["<absolute path>\\mcp-server\\dist\\index.js"],
      "env": {
        "ISSUE_TRACKER_API_URL": "http://localhost:8080/api",
        "ISSUE_TRACKER_USERNAME": "claude.bot",
        "ISSUE_TRACKER_PASSWORD": "<service account password>"
      }
    }
  }
}
```

Restart Claude Desktop after editing. If `node` is not on the system PATH, use
the absolute path to `node.exe` as `command`.

### Cursor

Cursor reads `~/.cursor/mcp.json` (per-user) or `.cursor/mcp.json` (per-project)
— same shape, see [`cursor_mcp.example.json`](cursor_mcp.example.json).

## Verifying

With the backend running, the repo includes a stdio E2E test that spawns the
server and drives every tool like a real MCP client:

```bash
node test-e2e.mjs     # expects claude.bot / password123 to exist (see test file)
```

You can also speak raw JSON-RPC over stdio:

```bash
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"t","version":"1"}}}' | node dist/index.js
```
