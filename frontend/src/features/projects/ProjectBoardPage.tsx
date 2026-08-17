import { useParams } from 'react-router-dom'
import { IssuesView } from '@/features/issues/IssuesView'

export function ProjectBoardPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const parsed = projectId ? Number(projectId) : NaN
  return <IssuesView initialProjectId={Number.isFinite(parsed) ? parsed : undefined} />
}
