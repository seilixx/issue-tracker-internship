const THEME_STORAGE_KEY = 'issuetracker-theme'

export type Theme = 'light' | 'dark'

export function getStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

export function setStoredTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // localStorage unavailable (private browsing, disabled storage) — theme just won't persist
  }
}
