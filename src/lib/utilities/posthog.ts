/**
 * PostHog analytics for the marketing website (anonymous-only).
 *
 * Mirrors the webapp module but never handles PII: no email, no HMAC hashing,
 * no identify(). Privacy posture matches the webapp:
 * - Pre-consent: origin-scoped localStorage (anonymous error tracking, no
 *   cross-subdomain cookie).
 * - Post-consent: a cross-subdomain cookie on `.email-unsubscriber.com` so the
 *   anonymous device_id is shared with the webapp and the blog -> app funnel
 *   joins into a single person.
 */

import posthog from 'posthog-js'
import { isAnalyticsAllowed } from './consent'

const API_KEY = 'phc_DeIlxY4LmAu2Y52R3TWc2Nr7Nd5IiKCa07GC1NZDmsX'
const API_HOST = 'https://eta.email-unsubscriber.com' // custom proxy to mitigate adblockers
const UI_HOST = 'https://eu.posthog.com'

let initialized = false
let analyticsEnabled = false

/** Initialize PostHog. Returns true on success. */
export function initPostHog(): boolean {
  // Guard both same-bundle re-init and the SDK's own __loaded flag.
  if (initialized || (posthog as unknown as { __loaded?: boolean }).__loaded) {
    initialized = true
    return true
  }

  try {
    // When consent already exists at boot, init directly with the shared
    // cross-subdomain cookie so PostHog READS/adopts the device_id written by
    // the other subdomain (a set_config switch after init would NOT adopt it —
    // it only preserves and writes the current in-memory id).
    const consented = isAnalyticsAllowed()

    posthog.init(API_KEY, {
      api_host: API_HOST,
      ui_host: UI_HOST,
      capture_pageview: false,
      capture_exceptions: {
        capture_unhandled_errors: true,
        capture_unhandled_rejections: true,
        capture_console_errors: false
      },
      persistence: consented ? 'localStorage+cookie' : 'localStorage',
      cross_subdomain_cookie: consented,
      respect_dnt: false,
      disable_session_recording: true,
      autocapture: false
    })

    initialized = true
    return true
  } catch (error) {
    console.error('[PostHog] Failed to initialize:', error)
    return false
  }
}

/**
 * Enable the analytics tier once the user consents.
 * Switches to a shared cross-subdomain cookie (seeding it with the current
 * device_id if we were still on localStorage) and captures the pageview.
 */
export function enableAnalytics(): void {
  if (!initialized) return

  analyticsEnabled = true
  posthog.set_config({ persistence: 'localStorage+cookie', cross_subdomain_cookie: true })
  posthog.capture('$pageview')
}

/** Capture a custom event. No-ops until the analytics tier is enabled. */
export function captureEvent(event: string, properties?: Record<string, unknown>): void {
  try {
    if (!initialized || !analyticsEnabled) return
    posthog.capture(event, properties)
  } catch (error) {
    console.error('[PostHog] Failed to capture event:', error)
  }
}
