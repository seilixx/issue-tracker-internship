/**
 * Thin HTTP client for the IssueTracker REST API.
 *
 * The MCP server never talks to the database and never re-implements business
 * rules: every tool call goes through the backend's controllers, so DTO
 * validation, @PreAuthorize authorization and service-layer rules (status
 * transitions, closed-issue locking, ...) keep applying exactly like they do
 * for the web UI.
 *
 * Authentication: the server authenticates as a dedicated service account
 * (env ISSUE_TRACKER_USERNAME / ISSUE_TRACKER_PASSWORD) and manages the JWT
 * lifecycle itself: login on first call, transparent refresh on 401 with a
 * single retry (the backend rotates refresh tokens — they are single-use).
 */
export class ApiError extends Error {
    status;
    constructor(status, message) {
        super(message);
        this.status = status;
        this.name = 'ApiError';
    }
}
function getConfig() {
    const apiUrl = process.env.ISSUE_TRACKER_API_URL ?? 'http://localhost:8080/api';
    const username = process.env.ISSUE_TRACKER_USERNAME;
    const password = process.env.ISSUE_TRACKER_PASSWORD;
    if (!username || !password) {
        throw new Error('Missing credentials: set ISSUE_TRACKER_USERNAME and ISSUE_TRACKER_PASSWORD ' +
            'environment variables (service account for the IssueTracker API).');
    }
    return { apiUrl: apiUrl.replace(/\/$/, ''), username, password };
}
let tokens = null;
async function post(path, body, token) {
    const { apiUrl } = getConfig();
    const res = await fetch(`${apiUrl}${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(body),
    });
    const json = (await res.json().catch(() => ({})));
    if (!res.ok)
        throw new ApiError(res.status, json.message ?? `HTTP ${res.status}`);
    return json.data;
}
async function login() {
    const { username, password } = getConfig();
    tokens = await post('/auth/login', { username, password });
}
async function refresh() {
    if (!tokens?.refreshToken)
        return login();
    try {
        tokens = await post('/auth/refresh', { refreshToken: tokens.refreshToken });
    }
    catch {
        // Refresh token expired/revoked — fall back to a full login.
        await login();
    }
}
/** Authenticated request with one transparent 401 → refresh → retry cycle. */
export async function apiFetch(method, path, body, isRetry = false) {
    if (!tokens)
        await login();
    const { apiUrl } = getConfig();
    const res = await fetch(`${apiUrl}${path}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokens.token}`,
        },
        body: body === undefined ? undefined : JSON.stringify(body),
    });
    if (res.status === 401 && !isRetry) {
        await refresh();
        return apiFetch(method, path, body, true);
    }
    const json = (await res.json().catch(() => ({})));
    if (!res.ok)
        throw new ApiError(res.status, json.message ?? `HTTP ${res.status}`);
    return json.data;
}
