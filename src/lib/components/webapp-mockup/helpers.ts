/**
 * Helpers ported VERBATIM from the real webapp so the marketing-site
 * mockup stays in lockstep with the production UI.
 *
 * Sources:
 *   webapp/src/utilities/subscription-helpers.ts
 *   webapp/src/utilities/types.ts (Subscription, EmailFrequency, ScanOptions, UnsubscribeType)
 *
 * Do NOT import this file from the real webapp; it lives here to keep
 * the website submodule independent.
 */

// ── Types (mirror of webapp shapes) ────────────────────────────────
export type UnsubscribeType = 'https-header' | 'mailto-header' | 'footer-url' | 'none'

export type EmailFrequency =
  | 'single'
  | 'multidaily'
  | 'daily'
  | 'multiweekly'
  | 'weekly'
  | 'multimonthly'
  | 'monthly'
  | 'rare'

export type SubscriptionStatus = 'active' | 'unsubscribed' | 'violation'

export type ScanScope = 'last-7-days' | 'last-30-days' | 'last-6-months' | 'last-year'

/**
 * Mockup subscription — superset of fields used by the real webapp's
 * SubscriptionTable cell. Dates are kept as `Date` (the webapp also
 * accepts ISO strings via `new Date(...)`); using `Date` here keeps
 * the seed data deterministic and TS-checked.
 */
export interface MockSubscription {
  id: string
  senderName: string
  senderEmail: string
  emailCount: number
  firstEmailDate: Date
  lastEmailDate: Date
  unsubscribeType: UnsubscribeType
  status: SubscriptionStatus
  unsubscribeUrls?: string[]
}

// ── Frequency helpers (ported verbatim) ────────────────────────────

const MS_PER_DAY = 1000 * 60 * 60 * 24

export function calculateFrequency(
  sub: MockSubscription,
  scanDate: Date = new Date(),
): EmailFrequency {
  if (sub.emailCount === 1) return 'single'

  const firstEmailTime = sub.firstEmailDate.getTime()
  const scanTime = scanDate.getTime()
  const daysSinceFirstEmail = Math.max(1, (scanTime - firstEmailTime) / MS_PER_DAY)
  const emailsPerDay = sub.emailCount / daysSinceFirstEmail

  if (emailsPerDay >= 0.8) return 'daily'
  if (emailsPerDay >= 0.14) return 'weekly'
  if (emailsPerDay >= 0.03) return 'monthly'
  return 'rare'
}

export function getFrequencyLabel(freq: EmailFrequency): string {
  switch (freq) {
    case 'single':
      return 'Single'
    case 'multidaily':
      return 'Multidaily'
    case 'daily':
      return 'Daily'
    case 'multiweekly':
      return 'Multiweekly'
    case 'weekly':
      return 'Weekly'
    case 'multimonthly':
      return 'Multimonthly'
    case 'monthly':
      return 'Monthly'
    case 'rare':
      return 'Rare'
  }
}

export function getFrequencyBadgeClasses(freq: EmailFrequency): string {
  switch (freq) {
    case 'single':
      return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
    case 'daily':
    case 'multidaily':
      return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
    case 'weekly':
    case 'multiweekly':
      return 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300'
    case 'monthly':
    case 'multimonthly':
      return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
    case 'rare':
      return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
  }
}

export function getTypeBadgeClasses(type: UnsubscribeType): string {
  switch (type) {
    case 'none':
      return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
    default:
      return 'bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300'
  }
}

// ── Scope helpers (ported verbatim) ────────────────────────────────

export function getDaysForScope(scope: ScanScope): number {
  switch (scope) {
    case 'last-7-days':
      return 7
    case 'last-30-days':
      return 30
    case 'last-6-months':
      return 180
    case 'last-year':
      return 365
  }
}

// ── Formatting (matches webapp SubscriptionTable.formatDate) ───────

export function formatLastDate(date: Date): string {
  return new Date(date).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  })
}

// ── Sort order for frequency (matches webapp toggleSort 'frequency') ──

export const FREQ_ORDER: Record<EmailFrequency, number> = {
  multidaily: 0,
  daily: 1,
  multiweekly: 2,
  weekly: 3,
  multimonthly: 4,
  monthly: 5,
  rare: 6,
  single: 7,
}

// ── Short-label scope → days for marketing autoplay ────────────────

export type ShortScope = '7d' | '30d' | '6m' | '12m'

export const SHORT_SCOPE_DAYS: Record<ShortScope, number> = {
  '7d': 7,
  '30d': 30,
  '6m': 180,
  '12m': 365,
}

// ── Unsubscribe history (mirror of webapp UnsubRecord shape) ───────

/**
 * Mirror of the webapp's `UnsubscribeRecord` shape, trimmed to what
 * the history list cell renders. Used by `UnsubscribeHistory.svelte`.
 */
export interface UnsubRecord {
  id: string
  sender_name?: string
  sender_email: string
  created_at: Date
}

/**
 * Matches the real webapp's `formatUnsubDate` output style.
 * Example: "27 Apr 2026"
 */
export function formatUnsubDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
