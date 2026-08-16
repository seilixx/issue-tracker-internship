import { EmptyState } from '@/components/EmptyState'

interface MainPlaceholderProps {
  title: string
  description: string
}

// Stands in for routes that aren't wired to a real view yet.
export function MainPlaceholder({ title, description }: MainPlaceholderProps) {
  return <EmptyState title={title} description={description} />
}
