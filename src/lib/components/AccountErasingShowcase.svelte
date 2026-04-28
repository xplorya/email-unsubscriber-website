<script lang="ts">
  /**
   * Page 8 of the FeatureCarousel ("Account Erasing") — single
   * centered nugget showcasing the webapp's GDPR account-deletion flow.
   *
   * The card itself is interactive (state machine: default → confirm →
   * loading → success), so this wrapper differs from the pure-decorative
   * scatters in EmailScanningButtons / ScanPeriodsButtons:
   *
   *   - No aria-hidden on the wrapper (card receives interaction).
   *   - Outer hover/active scale + bob keyframe still apply but the
   *     subtle 1.015 / 0.982 magnitudes don't fight typing focus.
   *   - prefers-reduced-motion bailout disables bob + hover/active.
   *   - Mobile (<480px) tightens the scatter footprint.
   */
  import AccountDeletionCard from '$lib/components/webapp-mockup/AccountDeletionCard.svelte'
</script>

<div class="scatter">
  <!-- Ambient teal glow -->
  <div class="scatter-glow" aria-hidden="true"></div>

  <!-- Single centered nugget — slight counter-clockwise tilt + bob -->
  <div class="btn-float btn-float-card" style="--bob-delay: -1.8s;">
    <div class="btn-float-inner">
      <div class="nugget">
        <AccountDeletionCard email="demo@mailprovider.com" />
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

  .btn-float:hover {
    box-shadow:
      0 26px 52px -18px rgba(2, 30, 40, 0.298),
      0 9px 21px -8px rgba(2, 30, 40, 0.165);
  }

  /* Card surface — wrapper rounds corners so float shadow follows the
     card silhouette. Inner AccountDeletionCard has its own border + bg. */
  .nugget {
    border-radius: 0.5rem;
    overflow: hidden;
  }

  /* Card — centered, slight counter-clockwise tilt */
  .btn-float-card {
    top: 18%;
    left: 50%;
    width: min(380px, 92%);
    --base-rotate: -1.4deg;
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
    .btn-float:hover .btn-float-inner {
      transform: scale(1) !important;
      transition: none !important;
    }
  }

  /* Tighter scatter on narrow screens */
  @media (max-width: 480px) {
    .scatter {
      min-height: 360px;
    }
    .btn-float-card {
      top: 14%;
      width: 96%;
      --base-rotate: -1deg;
    }
  }

  /* Z-Fold-narrow + tiny phones — shrink glow, widen card */
  @media (max-width: 360px) {
    .scatter-glow {
      inset: 22% 18% 22% 18%;
      filter: blur(38px);
    }
    .btn-float-card {
      width: 98%;
    }
  }
</style>
