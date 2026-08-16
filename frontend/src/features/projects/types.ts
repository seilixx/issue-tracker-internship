import type { ProjectCategory } from '@/utils/apiTypes'

export interface Project {
  id: number
  title: string
  description: string | null
  category: ProjectCategory
  leaderUuid: string
}
