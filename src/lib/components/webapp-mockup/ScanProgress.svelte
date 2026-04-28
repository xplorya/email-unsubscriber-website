<script lang="ts">
  /**
   * Mirror of webapp/src/modules/dashboard/common/components/ProgressBar.svelte.
   *
   * Two modes:
   *
   *   1. Prop-driven (default): caller supplies `scannedCount`,
   *      `oldestScannedDate`, `scanScope` and the bar reflects them
   *      exactly like the real webapp. Same label format, same
   *      percentage formula:
   *        Math.min(100, (Date.now() - oldestScannedDate.getTime()) / range * 100)
   *
   *   2. Autoplay (set `autoplay = true`): the component drives a 2 Hz
   *      setInterval loop internally for marketing hero compositions
   *      (low CPU, ambient progress). Respects prefers-reduced-motion
   *      (snaps to final state).
   */
  import { onDestroy } from 'svelte'
  import { prefersReducedMotion } from '$lib/utilities/gsap-utils'
  import { getDaysForScope, type ScanScope } from './helpers'

  interface Props {
    /** Real webapp scope keys */
    scanScope?: ScanScope
    /** Caller-supplied current scanned-count (prop-driven mode) */
    scannedCount?: number
    /** Caller-supplied oldest scanned date (prop-driven mode) */
    oldestScannedDate?: Date
    /** Optional Stop callback. If omitted no button renders. */
    onCancel?: () => void
    /**
     * If true, ignores scannedCount/oldestScannedDate and runs an
     * internal 2 Hz setInterval loop for marketing chip use.
     */
    autoplay?: boolean
    /** Target count for autoplay mode */
    autoplayTarget?: number
    /**
     * Bump this number from the parent to restart the autoplay loop:
     * resets count/pct to 0, clears paused state, restarts the
     * interval. The indeterminate top bar resumes (via removal of
     * is-paused class). Only meaningful when `autoplay` is true.
     */
    restartSignal?: number
  }

  let {
    scanScope = 'last-6-months',
    scannedCount,
    oldestScannedDate,
    onCancel,
    autoplay = false,
    autoplayTarget = 840,
    restartSignal = 0,
  }: Props = $props()

  // ── Autoplay state ────────────────────────────────────────────────
  let autoCount = $state(0)
  let autoPct = $state(0)
  let intervalId: ReturnType<typeof setInterval> | null = null
  // Freeze flag — when true, the interval is cleared and
  // `.animate-loading-bar` CSS animation is paused via
  // `animation-play-state: paused`. Values at the moment of freeze are
  // retained.
  let paused = $state(false)
  // Captured at every loop start: anchors autoplay date math to "now at
  // restart time" so the oldest-date interpolation stays stable across
  // ticks but resets on restart. `sixMonthsAgoMs` uses real calendar
  // arithmetic (Date.setMonth(-6)) — not a 180*86400000 approximation.
  let nowMsAtLoopStart = $state(Date.now())
  let sixMonthsAgoMs = $state(Date.now())

  function computeSixMonthsAgo(): number {
    const d = new Date()
    d.setMonth(d.getMonth() - 6)
    return d.getTime()
  }

  function clearTick() {
    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  function startLoop() {
    if (!autoplay) return
    clearTick()
    nowMsAtLoopStart = Date.now()
    sixMonthsAgoMs = computeSixMonthsAgo()
    if (prefersReducedMotion()) {
      autoCount = autoplayTarget
      autoPct = 100
      return
    }
    paused = false
    autoCount = 0
    autoPct = 0
    intervalId = setInterval(() => {
      if (paused) return
      autoCount += 10
      if (autoCount >= autoplayTarget) {
        autoCount = 0
      }
      autoPct = Math.min(100, (autoCount / autoplayTarget) * 100)
    }, 500)
  }

  // Single source of truth for starting/restarting the autoplay loop:
  // - Runs once on mount (initial render of the effect).
  // - Re-runs whenever the parent bumps `restartSignal`.
  // Reading `restartSignal` here is what subscribes the effect to it.
  $effect(() => {
    // Touch the prop so the effect tracks it.
    restartSignal
    startLoop()
  })

  onDestroy(() => {
    clearTick()
  })

  function handleCancel() {
    paused = true
    clearTick()
    onCancel?.()
  }

  // ── Effective values (autoplay vs prop-driven) ────────────────────
  const effectiveCount = $derived(autoplay ? autoCount : (scannedCount ?? 0))

  const effectiveOldest = $derived.by(() => {
    if (oldestScannedDate) return oldestScannedDate
    if (autoplay) {
      // Linear interp from nowAtLoopStart down to exactly 6 months ago
      // (real calendar math, captured once per loop start). At
      // autoPct=100 this lands precisely on the 6mo-ago timestamp.
      const ms =
        nowMsAtLoopStart - (autoPct / 100) * (nowMsAtLoopStart - sixMonthsAgoMs)
      return new Date(ms)
    }
    return undefined
  })

  // Same percentage formula as the real ProgressBar
  const percentage = $derived.by(() => {
    if (!effectiveOldest) return 0
    const range = getDaysForScope(scanScope) * 86400000
    return Math.min(100, ((Date.now() - effectiveOldest.getTime()) / range) * 100)
  })

  function formatScanDate(date: Date): string {
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' })
  }

  const progressLabel = $derived.by(() => {
    const count = effectiveCount.toLocaleString()
    if (effectiveOldest) {
      return `${count} scanned emails, dating back to ${formatScanDate(effectiveOldest)}`
    }
    return `${count} scanned emails...`
  })
</script>

<div class="mb-6">
  <!-- Row 1: Indeterminate animated bar -->
  <div class="w-full bg-(--color-border) rounded-full h-1.5 overflow-hidden">
    <div
      class="h-full bg-(--color-primary) rounded-full animate-loading-bar"
      class:is-paused={paused}
    ></div>
  </div>

  <!-- Row 2: Determinate date-based progress bar with text overlay -->
  <div class="relative h-6 mt-3 rounded-full bg-(--color-border) overflow-hidden">
    <!-- Fill -->
    <div
      class="absolute inset-y-0 left-0 rounded-full bg-(--color-primary) opacity-50 transition-[width] duration-300 ease-in-out"
      style="width: {percentage}%"
    ></div>

    <!-- Text overlay -->
    <div class="absolute inset-0 flex items-center justify-between px-3">
      <span class="text-xs text-(--color-text) truncate opacity-65">
        {progressLabel}
      </span>
      {#if onCancel}
        <button
          type="button"
          onclick={handleCancel}
          class="text-xs text-(--color-button-ghost-fg) hover:text-(--color-button-ghost-fg-hover) transition-colors ml-2 shrink-0 bg-transparent border-0 cursor-pointer"
        >
          Stop
        </button>
      {/if}
    </div>
  </div>
</div>

<style>
  @keyframes loading-bar {
    0%   { width: 0;   margin-left: 0; }
    50%  { width: 30%; margin-left: 35%; }
    100% { width: 0;   margin-left: 100%; }
  }

  .animate-loading-bar {
    animation: loading-bar 1.5s ease-in-out infinite;
  }

  .animate-loading-bar.is-paused {
    animation-play-state: paused;
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-loading-bar {
      animation: none;
      width: 40%;
      margin-left: 30%;
    }
  }
</style>
