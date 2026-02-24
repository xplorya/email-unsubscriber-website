import { setCookie, getCookie } from './cookies'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme.preference'

const isBrowser = typeof window !== 'undefined'

function getStoredTheme(): Theme | null {
  if (!isBrowser) return null
  const cookieVal = getCookie('theme')
  if (cookieVal === 'light' || cookieVal === 'dark') return cookieVal
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return null
}

export function getEffectiveTheme(): Theme {
  const stored = getStoredTheme()
  if (stored) return stored
  if (!isBrowser) return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyThemeToDOM(theme: Theme, isExplicit: boolean): void {
  const root = document.documentElement
  if (isExplicit) {
    root.classList.toggle('dark', theme === 'dark')
    root.classList.toggle('light', theme === 'light')
  } else {
    root.classList.remove('dark', 'light')
  }
}

export function toggleTheme(): void {
  const next: Theme = getEffectiveTheme() === 'dark' ? 'light' : 'dark'
  setCookie('theme', next)
  localStorage.setItem(STORAGE_KEY, next)
  applyThemeToDOM(next, true)
}

export function initTheme(): void {
  // Migrate localStorage -> cookie (one-time)
  const lsTheme = localStorage.getItem(STORAGE_KEY)
  if ((lsTheme === 'light' || lsTheme === 'dark') && !getCookie('theme')) {
    setCookie('theme', lsTheme)
  }

  const stored = getStoredTheme()
  if (stored) {
    applyThemeToDOM(stored, true)
  } else {
    // No stored preference - sync .dark class with OS for Tailwind dark: variant
    const osDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    document.documentElement.classList.toggle('dark', osDark)
    document.documentElement.classList.remove('light')
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!getStoredTheme()) {
      document.documentElement.classList.toggle('dark', e.matches)
      document.documentElement.classList.remove('light')
    }
  })
}
