import { setCookie, getCookie } from './cookies'

const COOKIE_NAME = 'cookie_consent'
const LEGACY_LS_KEY = 'cookie-consent'

export interface ConsentPreferences {
  essential: true
  analytics: boolean
}

export function defaultConsent(): ConsentPreferences {
  return { essential: true, analytics: false }
}

export function getConsent(): ConsentPreferences {
  const raw = getCookie(COOKIE_NAME)
  if (!raw) return defaultConsent()

  try {
    const parsed = JSON.parse(decodeURIComponent(raw))
    return {
      essential: true,
      analytics: parsed.analytics === true
    }
  } catch {
    return defaultConsent()
  }
}

export function saveConsent(prefs: ConsentPreferences): void {
  const value = encodeURIComponent(JSON.stringify(prefs))
  setCookie(COOKIE_NAME, value)

  // Clear legacy localStorage entry if it exists
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(LEGACY_LS_KEY)
  }
}

export function hasConsentBeenGiven(): boolean {
  return getCookie(COOKIE_NAME) !== null
}

export function isAnalyticsAllowed(): boolean {
  return getConsent().analytics === true
}
