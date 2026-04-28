<script lang="ts">
  /**
   * Page 2 of the FeatureCarousel ("Scan Periods") — two scattered,
   * tactile nuggets that mirror the webapp Dashboard scan-period UI:
   *
   *   Nugget A (idle):    [ScopeSelector | Rescan]
   *   Nugget B (running): [ScanProgress (autoplay) — Stop freezes]
   *
   * Pattern matches EmailScanningButtons.svelte:
   *   - Two-layer transform decomposition (.btn-float / .btn-float-inner)
   *     so :active scale doesn't fight the bob keyframe.
   *   - prefers-reduced-motion bailout disables bob + hover/active.
   *   - Mobile (<480px) stacks the nuggets full-width.
   *
   * Shared sub-composition: ScopePillsWithRescan owns the selector
   * pills + Rescan button row (also reused by HeroFloatingChips).
   *
   * State flow across the split-nugget layout:
   *   - `selectedIndex` lives here, passed into nugget A.
   *   - `restartSignal` lives here. Nugget A's Rescan bumps it.
   *     Nugget B's ScanProgress watches it via $effect and restarts
   *     its rAF autoplay loop (count/pct → 0, paused → false).
   */
  import ScanProgress from '$lib/components/webapp-mockup/ScanProgress.svelte'
  import ScopePillsWithRescan from '$lib/components/webapp-mockup/ScopePillsWithRescan.svelte'

  const scopes = ['7d', '30d', '6m', '12m']
  // Default to '12m' (index 3) per spec
  let selectedIndex = $state(3)
  let restartSignal = $state(0)
</script>

<div class="scatter" aria-hidden="true">
  <!-- Ambient teal glow -->
  <div class="scatter-glow" aria-hidden="true"></div>

  <!-- Nugget A — Period selector + Rescan (top-left, slight counter-clockwise tilt) -->
  <div class="btn-float btn-float-selector" style="--bob-delay: -0.3s;">
    <div class="btn-float-inner">
      <div class="nugget nugget-row">
        <ScopePillsWithRescan
          values={scopes}
          {selectedIndex}
          onSelect={(i) => {
            selectedIndex = i
          }}
          onRescan={() => {
            restartSignal += 1
          }}
          ariaLabel="Scan time period"
        />
      </div>
    </div>
  </div>

  <!-- Nugget B — Progress + Stop (bottom-right, slight clockwise tilt) -->
  <div class="btn-float btn-float-progress" style="--bob-delay: -2.5s;">
    <div class="btn-float-inner">
      <div class="nugget nugget-progress">
        <ScanProgress
          scanScope="last-6-months"
          autoplay
          {restartSignal}
          onCancel={() => {}}
        />
      </div>
    </div>
  </div>
</div>

<style>
  .scatter {
    position: relative;
    width: 100%;
    min-height: 280px;
    isolation: isolate;
  }

  .scatter-glow {
    position: absolute;
    inset: 10% 5% 10% 5%;
    background: radial-gradient(
      closest-side,
      color-mix(in srgb, var(--color-accent) 22%, transparent),
      transparent 70%
    );
    filter: blur(50px);
    opacity: 0.55;
    pointer-events: none;
    z-index: 0;
  }

  /* Outer layer — position + rotate + bob keyframe (translateY only). */
  .btn-float {
    position: absolute;
    z-index: 2;
    box-shadow:
      0 24px 48px -18px rgba(2, 30, 40, 0.28),
      0 8px 20px -8px rgba(2, 30, 40, 0.15);
    animation: btn-bob 7s ease-in-out infinite;
    animation-delay: var(--bob-delay, 0s);
    border-radius: 0.75rem;
    transition: box-shadow 200ms ease;
  }

  /* Inner layer owns hover/active scale — keeps it isolated from the keyframe */
  .btn-float-inner {
    transform: scale(1);
    transform-origin: center center;
    transition: transform 160ms cubic-bezier(0.2, 0.8, 0.2, 1);
    will-change: transform;
  }

  .btn-float:hover .btn-float-inner {
    transform: scale(1.015);
  }

  .btn-float:hover:active .btn-float-inner,
  .btn-float:active .btn-float-inner {
    transform: scale(0.982);
    transition: transform 60ms linear;
  }

  .btn-float:hover {
    box-shadow:
      0 26px 52px -18px rgba(2, 30, 40, 0.298),
      0 9px 21px -8px rgba(2, 30, 40, 0.165);
  }

  /* Card surface — match webapp panel look */
  .nugget {
    background: var(--color-bg-secondary-solid);
    border: 1px solid var(--color-border);
    border-radius: 0.75rem;
    padding: 12px;
  }

  /* ScanProgress's own .mb-6 leaves trailing margin we don't want inside
     the card — collapse it. */
  .nugget-progress :global(> div) {
    margin-bottom: 0;
  }

  /* Nugget A — upper-left, gentle clockwise tilt (flipped vs siblings) */
  .btn-float-selector {
    top: 14%;
    left: 7%;
    width: min(360px, 88%);
    --base-rotate: 1.8deg;
    transform: rotate(var(--base-rotate));
  }

  /* Nugget B — lower-right, counter-clockwise tilt (flipped vs siblings) */
  .btn-float-progress {
    top: 46%;
    right: 5%;
    width: min(380px, 88%);
    --base-rotate: -2.8deg;
    transform: rotate(var(--base-rotate));
  }

  @keyframes btn-bob {
    0%,
    100% {
      transform: rotate(var(--base-rotate, 0deg)) translateY(0);
    }
    50% {
      transform: rotate(var(--base-rotate, 0deg)) translateY(-5px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .btn-float {
      animation: none !important;
      transition: none !important;
    }
    .btn-float-inner,
    .btn-float:hover .btn-float-inner,
    .btn-float:active .btn-float-inner {
      transform: scale(1) !important;
      transition: none !important;
    }
  }

  /* Tighter scatter on narrow screens */
  @media (max-width: 480px) {
    .scatter {
      min-height: 280px;
    }
    .btn-float-selector {
      top: 4%;
      left: 2%;
      width: 92%;
    }
    .btn-float-progress {
      top: 52%;
      right: 2%;
      width: 92%;
    }
  }

  /* Z-Fold-narrow + tiny phones — shrink glow, widen nuggets */
  @media (max-width: 360px) {
    .scatter-glow {
      inset: 22% 18% 22% 18%;
      filter: blur(38px);
    }
    .btn-float-selector {
      width: 98%;
    }
    .btn-float-progress {
      width: 98%;
    }
  }
</style>
