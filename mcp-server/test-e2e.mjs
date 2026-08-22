// E2E test: spawns the MCP server (stdio) and drives every tool against the
// live backend, exactly like an MCP client would.
import { spawn } from 'node:child_process'

const server = spawn(process.execPath, ['dist/index.js'], {
  env: {
    ...process.env,
    ISSUE_TRACKER_API_URL: 'http://localhost:8080/api',
    ISSUE_TRACKER_USERNAME: 'claude.bot',
    ISSUE_TRACKER_PASSWORD: 'password123',
  },
})

const pending = new Map()
let nextId = 0
let buffer = ''

server.stdout.on('data', (chunk) => {
  buffer += chunk.toString()
  let idx
  while ((idx = buffer.indexOf('\n')) >= 0) {
    const line = buffer.slice(0, idx).trim()
    buffer = buffer.slice(idx + 1)
    if (!line) continue
    const msg = JSON.parse(line)
    if (msg.id != null && pending.has(msg.id)) {
      pending.get(msg.id)(msg)
      pending.delete(msg.id)
    }
  }
})
server.stderr.on('data', (c) => console.error('SERVER ERR →', c.toString()))

function call(method, params) {
  const id = ++nextId
  return new Promise((resolve) => {
    pending.set(id, resolve)
    server.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n')
  })
}

const tool = (name, args) => call('tools/call', { name, arguments: args })
const results = []
const check = (name, ok, detail = '') => {
  results.push(ok)
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`)
}
const text = (r) => r.result?.content?.[0]?.text ?? ''

await call('initialize', {
  protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'e2e', version: '1.0' },
})
server.stdin.write(JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) + '\n')

const list = await call('tools/list')
const toolNames = list.result.tools.map((t) => t.name)
check('tools/list exposes 8 tools', toolNames.length === 8, toolNames.join(', '))

const projects = await tool('list_projects', {})
const projectList = JSON.parse(text(projects))
check('list_projects', Array.isArray(projectList) && projectList.length > 0, `${projectList.length} project(s)`)
const pid = projectList[0].id

const users = await tool('search_users', { query: '' })
const userList = JSON.parse(text(users))
check('search_users', Array.isArray(userList.content) && userList.content.length > 0, `${userList.content.length} user(s)`)
const assignee = userList.content.find((u) => u.username === 'e2e.user') ?? userList.content[0]

const created = await tool('create_issue', {
  title: 'MCP e2e issue', description: 'created via MCP stdio test', priority: 'HIGH',
  projectId: pid, assignedUuids: [assignee.uuid],
})
const createdIssue = JSON.parse(text(created))
check('create_issue', createdIssue.id != null && createdIssue.status === 'OPEN', `id=${createdIssue.id}`)
const iid = createdIssue.id

const searched = await tool('search_issues', { projectId: pid, status: 'OPEN' })
check('search_issues', text(searched).includes(`"id": ${iid}`) || JSON.parse(text(searched)).content.some((i) => i.id === iid))

const detail = await tool('get_issue', { issueId: iid })
check('get_issue', JSON.parse(text(detail)).title === 'MCP e2e issue')

const assigned = await tool('assign_issue', { issueId: iid, assignedUuids: [assignee.uuid] })
check('assign_issue', JSON.parse(text(assigned)).assignedUuids.includes(assignee.uuid))

const status = await tool('update_issue_status', { issueId: iid, status: 'IN_PROGRESS' })
check('update_issue_status', JSON.parse(text(status)).status === 'IN_PROGRESS')

const comment = await tool('add_comment', { issueId: iid, content: 'comment from MCP e2e', title: 'e2e' })
check('add_comment', JSON.parse(text(comment)).content === 'comment from MCP e2e')

const locked = await tool('update_issue_status', { issueId: iid, status: 'DONE' })
check('close issue (DONE)', JSON.parse(text(locked)).status === 'DONE')
const reopen = await tool('update_issue_status', { issueId: iid, status: 'OPEN' })
check('reopening DONE issue is rejected (backend rule)', JSON.parse('{"x":1}') && text(reopen).startsWith('Error:'), text(reopen).slice(0, 80))

const badProject = await tool('create_issue', { title: 'x', priority: 'LOW', projectId: 999999 })
check('unknown projectId is rejected', text(badProject).startsWith('Error:'), text(badProject).slice(0, 80))

server.kill()
const passed = results.filter(Boolean).length
console.log(`\n${passed}/${results.length} checks passed`)
process.exit(passed === results.length ? 0 : 1)
