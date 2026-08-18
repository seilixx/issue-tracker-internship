import styles from './IssueDescription.module.css'

interface DescriptionPart {
  type: 'text' | 'code'
  content: string
  lang?: string
}

// There's no dedicated "code snippet" or "log" field on Issue (backend only
// has title/description) — so this doesn't invent one. It just renders
// fenced code blocks (```...```) *within* the real description text as a
// styled block instead of plain paragraph text, the same way most comment
// boxes/markdown renderers treat fences. Plain descriptions with no fences
// render exactly as before.
function parseDescription(description: string): DescriptionPart[] {
  const parts: DescriptionPart[] = []
  const fenceRegex = /```(\w*)\n?([\s\S]*?)```/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = fenceRegex.exec(description))) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: description.slice(lastIndex, match.index) })
    }
    parts.push({ type: 'code', content: match[2].replace(/\n$/, ''), lang: match[1] || undefined })
    lastIndex = fenceRegex.lastIndex
  }
  if (lastIndex < description.length) {
    parts.push({ type: 'text', content: description.slice(lastIndex) })
  }
  return parts
}

interface IssueDescriptionProps {
  description: string
}

export function IssueDescription({ description }: IssueDescriptionProps) {
  const parts = parseDescription(description)

  return (
    <div className={styles.wrapper}>
      {parts.map((part, index) => {
        if (part.type === 'code') {
          return (
            <pre key={index} className={styles.codeBlock}>
              {part.lang ? <span className={styles.codeLang}>{part.lang}</span> : null}
              <code>{part.content}</code>
            </pre>
          )
        }
        const trimmed = part.content.trim()
        return trimmed ? (
          <p key={index} className={styles.text}>
            {trimmed}
          </p>
        ) : null
      })}
    </div>
  )
}
