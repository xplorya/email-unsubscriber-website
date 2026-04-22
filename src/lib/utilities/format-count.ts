/**
 * Format a count number for compact display.
 *
 * Rules:
 *   n < 1_000          → "${n}+"                 (e.g. 274 → "274+")
 *   1_000 ≤ n < 1_000_000 → truncate-down to 1 decimal + "k+"
 *                              6799 → "6.7k+"
 *                              10000 → "10k+"   (.0 stripped)
 *                              10500 → "10.5k+"
 *                              123000 → "123k+"
 *   n ≥ 1_000_000      → truncate-down to 1 decimal + "M+"
 *                              1234567 → "1.2M+"
 *                              2000000 → "2M+"  (.0 stripped)
 *
 * Negative / NaN / zero defensively render as "0+".
 * Truncation uses Math.floor to avoid rounding up (prevents inflated counts).
 */
export function formatCount(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return '0+'

  if (n < 1_000) return `${Math.floor(n)}+`

  const { divisor, suffix } = n < 1_000_000
    ? { divisor: 1_000, suffix: 'k' }
    : { divisor: 1_000_000, suffix: 'M' }

  // Truncate-down to 1 decimal place.
  const truncated = Math.floor((n / divisor) * 10) / 10

  // Drop trailing ".0" for whole numbers.
  const formatted = truncated % 1 === 0 ? `${Math.trunc(truncated)}` : `${truncated}`

  return `${formatted}${suffix}+`
}
