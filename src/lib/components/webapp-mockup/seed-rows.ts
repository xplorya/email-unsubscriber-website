/**
 * Deterministic seed data used by the marketing-site mockups.
 *
 * Shape matches the real webapp `Subscription` type so the same
 * helpers (calculateFrequency, getFrequencyLabel, etc.) work on this
 * data unchanged.
 */
import type { MockSubscription } from './helpers'

// Reference "now" used to derive last/first email dates so that
// calculateFrequency() lands on the intended frequency bucket.
const NOW = new Date(2026, 3, 24)
const day = (offset: number) => new Date(NOW.getTime() - offset * 86400000)

/**
 * Build a subscription whose firstEmailDate is far enough in the past
 * for `calculateFrequency` to land on the requested bucket.
 *
 *   daily   ⇒ emailsPerDay >= 0.8
 *   weekly  ⇒ emailsPerDay >= 0.14
 *   monthly ⇒ emailsPerDay >= 0.03
 *   rare    ⇒ everything else
 */
function pickFirstDate(emailCount: number, freq: 'daily' | 'weekly' | 'monthly' | 'rare'): Date {
  if (emailCount <= 1) return day(180)
  // pick a span (in days) inside the target bucket with comfortable margin
  const daysSpan =
    freq === 'daily' ? Math.max(1, Math.round(emailCount / 1.0)) // ~1/day
    : freq === 'weekly' ? Math.max(7, Math.round(emailCount / 0.25)) // ~1/4 days
    : freq === 'monthly' ? Math.max(30, Math.round(emailCount / 0.05)) // ~1/20 days
    : Math.max(180, Math.round(emailCount / 0.01)) // <1/month
  return day(daysSpan)
}

export const seedRows: MockSubscription[] = [
  {
    id: 'r1',
    senderName: 'Medium Daily Digest',
    senderEmail: 'noreply@medium.com',
    emailCount: 42,
    lastEmailDate: day(3),
    firstEmailDate: pickFirstDate(42, 'daily'),
    unsubscribeType: 'https-header',
    status: 'active',
    unsubscribeUrls: ['https://medium.com/unsubscribe'],
  },
  {
    id: 'r2',
    senderName: 'Daily Promos',
    senderEmail: 'news@daily-pro.com',
    emailCount: 128,
    lastEmailDate: day(2),
    firstEmailDate: pickFirstDate(128, 'daily'),
    unsubscribeType: 'https-header',
    status: 'active',
    unsubscribeUrls: ['https://linkedin.com/unsub'],
  },
  {
    id: 'r3',
    senderName: 'The Pragmatic Engineer',
    senderEmail: 'hello@subbedex.com',
    emailCount: 14,
    lastEmailDate: day(6),
    firstEmailDate: pickFirstDate(14, 'weekly'),
    unsubscribeType: 'https-header',
    status: 'active',
    unsubscribeUrls: ['https://substack.com/unsub'],
  },
  {
    id: 'r4',
    senderName: 'Random Promotions',
    senderEmail: 'promos@rndm.com',
    emailCount: 9,
    lastEmailDate: day(14),
    firstEmailDate: pickFirstDate(9, 'monthly'),
    unsubscribeType: 'https-header',
    status: 'active',
    unsubscribeUrls: ['https://airbnb.com/unsub'],
  },
  {
    id: 'r5',
    senderName: 'shopzone.io',
    senderEmail: 'no-reply@shopzone.io',
    emailCount: 147,
    lastEmailDate: day(1),
    firstEmailDate: pickFirstDate(147, 'daily'),
    unsubscribeType: 'https-header',
    status: 'violation',
    unsubscribeUrls: ['https://shopzone.io/unsub'],
  },
  {
    id: 'r6',
    senderName: 'Starsfort Online',
    senderEmail: 'news@starsfort.ss',
    emailCount: 33,
    lastEmailDate: day(9),
    firstEmailDate: pickFirstDate(33, 'weekly'),
    unsubscribeType: 'https-header',
    status: 'active',
    unsubscribeUrls: ['https://starsfort.ss/unsub'],
  },
  {
    id: 'r7',
    senderName: 'Local Meetups',
    senderEmail: 'events@localmeetups.dev',
    emailCount: 1,
    lastEmailDate: day(22),
    firstEmailDate: day(22),
    unsubscribeType: 'mailto-header',
    status: 'active',
    unsubscribeUrls: ['mailto:events@localmeetups.dev'],
  },
  {
    id: 'r8',
    senderName: 'TechiHub',
    senderEmail: 'noreply@techi-hub.io',
    emailCount: 2,
    lastEmailDate: day(13),
    firstEmailDate: pickFirstDate(2, 'monthly'),
    unsubscribeType: 'https-header',
    status: 'unsubscribed',
    unsubscribeUrls: ['https://techi-hub.io/unsub'],
  },
]

// Reference scan date used for deterministic frequency calculation in mockups
export const MOCK_SCAN_DATE = NOW
