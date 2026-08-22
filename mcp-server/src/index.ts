import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import { apiFetch, ApiError } from './api.js'

/**
 * IssueTracker MCP server.
 *
 * Exposes the IssueTracker REST API as MCP tools so AI clients (Claude
 * Desktop, Cursor, ...) can query and manipulate projects and issues in
 * natural language. This server is a thin translation layer: it contains NO
 * business logic. Validation, authorization and status-transition rules all
 * live in the Spring Boot backend and apply to these calls exactly like they
 * apply to the web UI.
 */

const server = new McpServer({
  name: 'issue-tracker',
  version: '1.0.0',
})

/* ---------------------------------------------------------------- helpers */

const STATUS = z.enum(['OPEN', 'IN_PROGRESS', 'DONE'])
const PRIORITY = z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'])

/** Serialize a successful tool result as compact JSON text. */
function ok(data: unknown) {
  return { content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }] }
}

/** Surface backend errors (403, 404, 400...) to the AI client instead of hiding them. */
function fail(e: unknown) {
  const message =
    e instanceof ApiError
      ? `Backend error ${e.status}: ${e.message}`
      : e instanceof Error
        ? e.message
        : String(e)
  return { content: [{ type: 'text' as const, text: `Error: ${message}` }], isError: true as const }
}

/** Run a tool handler with uniform error translation. */
async function run<T>(fn: () => Promise<T>) {
  try {
    return ok(await fn())
  } catch (e) {
    return fail(e)
  }
}

/* ------------------------------------------------------------- read tools */

server.registerTool(
  'list_projects',
  {
    title: 'List projects',
    description:
      'List all projects in the issue tracker with their id, title, category and leader. ' +
      'Call this before creating an issue to find the correct projectId — never guess a project id.',
    inputSchema: {},
  },
  async () =>
    run(() => apiFetch<unknown[]>('GET', '/projects')),
)

server.registerTool(
  'search_issues',
  {
    title: 'Search issues',
    description:
      'Search and filter issues by project, status, priority and/or assignee. ' +
      'Returns a page of issues (id, title, status, priority, projectId, assignees, timestamps). ' +
      'Use this to find existing issues before creating a new one or to answer questions about the tracker.',
    inputSchema: {
      projectId: z.number().int().optional().describe('Filter by project id (see list_projects)'),
      status: STATUS.optional().describe('Filter by status'),
      priority: PRIORITY.optional().describe('Filter by priority'),
      assigneeUuid: z.string().optional().describe('Filter by assignee uuid (see search_users)'),
      page: z.number().int().min(0).optional().describe('Page number, 0-based (default 0)'),
      size: z.number().int().min(1).max(200).optional().describe('Page size (default 50)'),
    },
  },
  async ({ projectId, status, priority, assigneeUuid, page, size }) =>
    run(() => {
      const params = new URLSearchParams()
      if (projectId !== undefined) params.set('projectId', String(projectId))
      if (status) params.set('status', status)
      if (priority) params.set('priority', priority)
      if (assigneeUuid) params.set('assigneeUuid', assigneeUuid)
      params.set('page', String(page ?? 0))
      params.set('size', String(size ?? 50))
      params.set('sortBy', 'updatedAt')
      params.set('sortDir', 'desc')
      return apiFetch('GET', `/issues?${params.toString()}`)
    }),
)

server.registerTool(
  'get_issue',
  {
    title: 'Get issue details',
    description:
      'Get the full details of one issue by its numeric id, including its comments (threaded, with soft-deleted ones marked) and attachment metadata.',
    inputSchema: {
      issueId: z.number().int().describe('Numeric id of the issue (e.g. 42)'),
    },
  },
  async ({ issueId }) => run(() => apiFetch('GET', `/issues/${issueId}`)),
)

server.registerTool(
  'search_users',
  {
    title: 'Search users',
    description:
      'Search users by name, username or email. Returns uuid, name, username and role. ' +
      'Call this to resolve a person to their uuid before assigning an issue — never guess a uuid.',
    inputSchema: {
      query: z.string().describe('Search text; empty string lists all users'),
    },
  },
  async ({ query }) =>
    run(() => apiFetch('GET', `/users/search?q=${encodeURIComponent(query)}&size=50`)),
)

/* ------------------------------------------------------------ write tools */

server.registerTool(
  'create_issue',
  {
    title: 'Create issue',
    description:
      'Create a new issue in a project. The issue is created with status OPEN and the service account as creator. ' +
      'Use list_projects to find projectId and search_users to resolve assignedUuids first. ' +
      'Returns the created issue with its id.',
    inputSchema: {
      title: z.string().min(1).describe('Short issue title'),
      description: z.string().optional().describe('Detailed description'),
      priority: PRIORITY.describe('Issue priority'),
      projectId: z.number().int().describe('Id of the project (see list_projects)'),
      assignedUuids: z.array(z.string()).optional().describe('User uuids to assign (see search_users)'),
    },
  },
  async (args) => run(() => apiFetch('POST', '/issues', args)),
)

server.registerTool(
  'update_issue_status',
  {
    title: 'Update issue status',
    description:
      'Change the status of an issue. Valid statuses: OPEN, IN_PROGRESS, DONE. ' +
      'DONE is terminal: a DONE issue is locked and cannot be edited or reopened. ' +
      'The backend enforces who is allowed to change status and rejects invalid transitions with an error.',
    inputSchema: {
      issueId: z.number().int().describe('Numeric id of the issue'),
      status: STATUS.describe('New status'),
    },
  },
  async ({ issueId, status }) =>
    run(() => apiFetch('PATCH', `/issues/${issueId}/status`, { status })),
)

server.registerTool(
  'assign_issue',
  {
    title: 'Assign issue',
    description:
      'Replace the assignees of an issue with the given user uuids (empty array unassigns everyone). ' +
      'Use search_users to resolve people to uuids first. The issue must not be DONE.',
    inputSchema: {
      issueId: z.number().int().describe('Numeric id of the issue'),
      assignedUuids: z.array(z.string()).describe('New list of assignee uuids'),
    },
  },
  async ({ issueId, assignedUuids }) =>
    run(async () => {
      // PUT /issues/{id} replaces the whole resource, so merge with current values.
      const current = (await apiFetch('GET', `/issues/${issueId}`)) as Record<string, unknown>
      return apiFetch('PUT', `/issues/${issueId}`, {
        title: current.title,
        description: current.description,
        priority: current.priority,
        projectId: current.projectId,
        assignedUuids,
      })
    }),
)

server.registerTool(
  'add_comment',
  {
    title: 'Add comment',
    description:
      'Add a comment to an issue, optionally as a reply to an existing comment (parentCommentId). ' +
      'The author is the service account. Comments stay allowed on DONE issues.',
    inputSchema: {
      issueId: z.number().int().describe('Numeric id of the issue'),
      content: z.string().min(1).describe('Comment body'),
      title: z.string().optional().describe('Optional comment title'),
      parentCommentId: z.number().int().optional().describe('Id of the comment to reply to'),
    },
  },
  async ({ issueId, content, title, parentCommentId }) =>
    run(() =>
      apiFetch('POST', `/issues/${issueId}/comments`, {
        title: title ?? '',
        content,
        parentCommentId,
      }),
    ),
)

/* ---------------------------------------------------------------- startup */

const transport = new StdioServerTransport()
await server.connect(transport)
