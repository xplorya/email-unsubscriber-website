<script lang="ts">
  /**
   * Page 4 of the FeatureCarousel ("Unsubscribe History") — single
   * centered nugget showcasing the webapp's Profile-page audit log.
   *
   * Single nugget (vs the 2-nugget scatter on pages 1-3) — the history
   * card is dense and reads better on its own with a slight tilt + bob.
   *
   * Pattern matches EmailScanningButtons.svelte / ScanPeriodsButtons.svelte
   * / ResultsListButtons.svelte:
   *   - Two-layer transform decomposition (.btn-float / .btn-float-inner)
   *     so :active scale doesn't fight the bob keyframe.
   *   - prefers-reduced-motion bailout disables bob + hover/active.
   *   - Mobile (<480px) tightens the scatter footprint.
   */
  import UnsubscribeHistory from '$lib/components/webapp-mockup/UnsubscribeHistory.svelte'
  import type { UnsubRecord } from '$lib/components/webapp-mockup/helpers'

  // Build dummy entries with dates derived from `now()` math so the
  // history feels live across re-renders. Spread across last ~30 days.
  const NOW = Date.now()
  const DAY_MS = 1000 * 60 * 60 * 24

  const seedRecords: UnsubRecord[] = [
    {
      id: 'rec-1',
      sender_name: 'TechiHub',
      sender_email: 'noreply@techi-hub.io',
      created_at: new Date(NOW - DAY_MS),
    },
    {
      id: 'rec-2',
      sender_name: 'Local Meetups',
      sender_email: 'events@localmeetups.dev',
      created_at: new Date(NOW - 6 * DAY_MS),
    },
    {
      id: 'rec-3',
      sender_name: 'SneakerDrop',
      sender_email: 'hellp@news.sneakerdrop.io',
      created_at: new Date(NOW - 14 * DAY_MS),
    },
    {
      id: 'rec-4',
      sender_name: 'NetGuard',
      sender_email: 'notify@negguard.com',
      created_at: new Date(NOW - 27 * DAY_MS),
    },
  ]
</script>

<div class="scatter" aria-hidden="false">
  <!-- Ambient teal glow -->
  <div class="scatter-glow" aria-hidden="true"></div>

  <!-- Single centered nugget — slight clockwise tilt + bob -->
  <div class="btn-float btn-float-history" style="--bob-delay: -1.2s;">
    <div class="btn-float-inner">
      <div class="nugget">
        <UnsubscribeHistory records={seedRecords} />
      </div>
    </div>
  </div>
</div>

<style>
  .scatter {
    position: relative;
    width: 100%;
    min-height: 360px;
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

  /* Card surface — match webapp panel look. The inner UnsubscribeHistory
     already has its own border + bg; this wrapper just rounds the corners
     so the float shadow follows the actual card silhouette. */
  .nugget {
    border-radius: 0.5rem;
    overflow: hidden;
  }

  /* History — centered, slight clockwise tilt */
  .btn-float-history {
    top: 4%;
    left: 50%;
    width: min(360px, 88%);
    --base-rotate: 1.6deg;
    transform: translateX(-50%) rotate(var(--base-rotate));
  }

  @keyframes btn-bob {
    0%,
    100% {
      transform: translateX(-50%) rotate(var(--base-rotate, 0deg)) translateY(0);
    }
    50% {
      transform: translateX(-50%) rotate(var(--base-rotate, 0deg)) translateY(-5px);
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
      min-height: 380px;
    }
    .btn-float-history {
      top: 2%;
      width: 94%;
      --base-rotate: 1.2deg;
    }
  }

  /* Z-Fold-narrow + tiny phones — shrink glow, widen card */
  @media (max-width: 360px) {
    .scatter-glow {
      inset: 22% 18% 22% 18%;
      filter: blur(38px);
    }
    .btn-float-history {
      width: 98%;
    }
  }
</style>
