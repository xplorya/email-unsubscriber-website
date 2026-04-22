import { STATS_URL } from '$lib/utilities/constants'

export interface LifetimeStats {
  lifetime_users: number
  lifetime_scans: number
}

export const FLOOR_STATS: LifetimeStats = {
  lifetime_users: 274,
  lifetime_scans: 6720
}

// Defensive ceilings — clamp absurd values if R2 object is ever compromised
// or misconfigured. Values above these are obvious lies; the animation would
// look silly (and Number.isFinite checks in formatCount would produce ugly
// strings). Chosen well above realistic growth headroom.
const CEILING_STATS = {
  lifetime_users: 100_000_000,
  lifetime_scans: 1_000_000_000
}

function clamp(n: number, min: number, max: number): number {
  if (!Number.isFinite(n)) return min
  return Math.min(Math.max(n, min), max)
}

/**
 * Fetch lifetime usage stats from the public R2 JSON file.
 *
 * Browser-only — never call during prerender. On ANY failure (network,
 * parse, invalid shape, non-2xx, timeout/abort) returns floor values
 * silently (console.warn for debugging only). UI never shows an error state.
 */
export async function fetchStats(): Promise<LifetimeStats> {
  try {
    const response = await fetch(STATS_URL, {
      signal: AbortSignal.timeout(5000),
      cache: 'no-cache'
    })

    if (!response.ok) {
      console.warn(`[stats] non-ok response: ${response.status}`)
      return FLOOR_STATS
    }

    const json: unknown = await response.json()

    if (
      !json ||
      typeof json !== 'object' ||
      typeof (json as Record<string, unknown>).lifetime_users !== 'number' ||
      typeof (json as Record<string, unknown>).lifetime_scans !== 'number'
    ) {
      console.warn('[stats] invalid shape')
      return FLOOR_STATS
    }

    const parsed = json as { lifetime_users: number; lifetime_scans: number }

    return {
      lifetime_users: clamp(parsed.lifetime_users, FLOOR_STATS.lifetime_users, CEILING_STATS.lifetime_users),
      lifetime_scans: clamp(parsed.lifetime_scans, FLOOR_STATS.lifetime_scans, CEILING_STATS.lifetime_scans)
    }
  } catch (err) {
    console.warn('[stats] fetch failed', err)
    return FLOOR_STATS
  }
}
