const MAX_AGE_SECONDS = 34560000 // ~400 days

function getCookieDomain(): string {
  if (typeof location === 'undefined') return ''
  const host = location.hostname
  if (host === 'localhost' || host === '127.0.0.1') return ''
  return '.email-unsubscriber.com'
}

export function setCookie(name: string, value: string, maxAgeSec?: number): void {
  if (typeof document === 'undefined') return

  const domain = getCookieDomain()
  const secure = location.protocol === 'https:'
  const age = maxAgeSec ?? MAX_AGE_SECONDS

  let cookie = `${name}=${value}; path=/; max-age=${age}; SameSite=Lax`
  if (domain) cookie += `; domain=${domain}`
  if (secure) cookie += '; Secure'

  document.cookie = cookie
}

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null

  const match = document.cookie.match(`(?:^|; )${name}=([^;]*)`)
  return match ? match[1] : null
}

export function deleteCookie(name: string): void {
  if (typeof document === 'undefined') return

  const domain = getCookieDomain()

  let cookie = `${name}=; path=/; max-age=0; SameSite=Lax`
  if (domain) cookie += `; domain=${domain}`

  document.cookie = cookie
}
