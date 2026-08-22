import { useStore } from '@/store/AppStore'
import { AppShell, CreateIssueButton } from '@/components/AppShell'
import { IssueWorkspace } from '@/components/IssueWorkspace'

export function BoardPage({ onCreateIssue }: { onCreateIssue: () => void }) {
  const s = useStore()
  return (
    <AppShell title="Issue Board" breadcrumb="Main / Issue Board" primaryAction={<CreateIssueButton onClick={onCreateIssue} />}>
      <div className="mx-auto max-w-[1400px] px-4 py-5 lg:px-6">
        <div className="mb-4">
          <p className="text-xs text-neutral-500">
            {s.issues.length} issues across {new Set(s.issues.map((i) => i.projectId)).size} projects · drag cards between columns to change status
          </p>
        </div>
        <IssueWorkspace onCreateIssue={onCreateIssue} />
      </div>
    </AppShell>
  )
}
