<script lang="ts">
  /**
   * Page 3 of the FeatureCarousel ("Results List") — two scattered,
   * tactile nuggets that mirror the webapp Dashboard results-list UI:
   *
   *   Nugget A (filters):  3-tone filter chip cluster, "Still emailing"
   *                        (violation) currently selected.
   *   Nugget B (row):      A single result row in the violation state
   *                        (red bg + warning icon).
   *
   * Pattern matches EmailScanningButtons.svelte / ScanPeriodsButtons.svelte:
   *   - Two-layer transform decomposition (.btn-float / .btn-float-inner)
   *     so :active scale doesn't fight the bob keyframe.
   *   - prefers-reduced-motion bailout disables bob + hover/active.
   *   - Mobile (<480px) stacks the nuggets full-width.
   */
  import FiltersChipGroup from '$lib/components/webapp-mockup/FiltersChipGroup.svelte'
  import SingleRow from '$lib/components/webapp-mockup/SingleRow.svelte'
  import { seedRows } from '$lib/components/webapp-mockup/seed-rows'

  // shopzone.io row already has status: 'violation'. Pass it through
  // explicitly for clarity even though `initialStatus` is redundant here.
  const violationRow = seedRows[4]
</script>

<div class="scatter" aria-hidden="true">
  <!-- Ambient teal glow -->
  <div class="scatter-glow" aria-hidden="true"></div>

  <!-- Nugget A — Filters cluster (top-left, slight counter-clockwise tilt) -->
  <div class="btn-float btn-float-filters" style="--bob-delay: -0.4s;">
    <div class="btn-float-inner">
      <div class="nugget nugget-filters">
        <div class="nugget-caption">filters</div>
        <FiltersChipGroup selectedTone="violation" />
      </div>
    </div>
  </div>

  <!-- Nugget B — Violation row (bottom-right, slight clockwise tilt) -->
  <div class="btn-float btn-float-row" style="--bob-delay: -2.6s;">
    <div class="btn-float-inner">
      <div class="nugget nugget-row">
        <SingleRow sub={violationRow} initialStatus="violation" />
      </div>
    </div>
  </div>
</div>

<style>
  .scatter {
    position: relative;
    width: 100%;
    min-height: 320px;
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
    padding: 12px 14px;
  }

  .nugget-row {
    /* Let the SingleRow's own w-80/md:w-100 dictate width */
    padding: 4px 8px;
    width: fit-content;
  }

  .nugget-caption {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-accent);
    opacity: 0.85;
    margin-bottom: 6px;
  }

  /* Nugget A — upper-left, slight clockwise tilt (flipped vs page 1) */
  .btn-float-filters {
    top: 10%;
    left: 9%;
    --base-rotate: 2.5deg;
    transform: rotate(var(--base-rotate));
  }

  /* Nugget B — lower-right, strong counter-clockwise tilt (flipped vs page 1) */
  .btn-float-row {
    top: 48%;
    right: 14%;
    --base-rotate: -3.2deg;
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

  /* Tighter scatter on narrow screens — keep nuggets fully on-screen. */
  @media (max-width: 480px) {
    .scatter {
      min-height: 360px;
    }
    .btn-float-filters {
      top: 2%;
      left: 1%;
      width: 94%;
    }
    .btn-float-row {
      top: 42%;
      right: 0;
      left: auto;
      --base-rotate: -1.5deg;
      transform-origin: right center;
    }
    /* Cap SingleRow's intrinsic w-80 (320px) so it fits inside the slide
       once outer page + carousel padding are accounted for. Override scoped
       to this nugget so HeroFloatingChips' SingleRow stays untouched. */
    .btn-float-row .nugget-row :global(> div) {
      width: 310px !important;
    }
  }

  /* Z-Fold-narrow + tiny phones — shrink glow, narrow row further. */
  @media (max-width: 360px) {
    .scatter-glow {
      inset: 22% 18% 22% 18%;
      filter: blur(38px);
    }
    .btn-float-filters {
      width: 95%;
      left: 0;
    }
    .btn-float-row .nugget-row :global(> div) {
      width: 270px !important;
    }
  }
</style>
