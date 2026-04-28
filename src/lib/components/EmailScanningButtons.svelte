<script lang="ts">
  import { icons } from '$lib/icons'
</script>

<!--
  Decorative scatter of mock Google + Microsoft sign-in buttons.
  Mirrors the webapp Landing button markup 1:1 (idle branch only) but renders
  inert <div>s — no onclick, no OAuth, no functionality. Pure visual nuggets.

  Two-layer transform decomposition:
    .btn-float        → position + rotate + bob keyframe (translateY)
    .btn-float-inner  → hover/active scale (independent, no keyframe interference)
  This avoids the var()-in-keyframe resolution bug where :active changes to
  --interact-scale don't propagate to a running animation in Chrome/Safari.
-->
<div class="scatter" aria-hidden="true">
  <!-- Ambient teal glow -->
  <div class="scatter-glow" aria-hidden="true"></div>

  <!-- Google button (left, slight counter-clockwise tilt) -->
  <div class="btn-float btn-float-google" style="--bob-delay: -0.5s;">
    <div class="btn-float-inner">
      <div
        class="w-full px-6 py-3 bg-(--color-bg-secondary) border border-(--color-border) text-(--color-text) rounded-lg flex items-center justify-center gap-3 font-medium shadow-sm"
      >
        {@html icons.googleIcon}
        Sign in with Google
      </div>
    </div>
  </div>

  <!-- Microsoft/Outlook button (right, slight clockwise tilt, lower) -->
  <div class="btn-float btn-float-outlook" style="--bob-delay: -2.5s;">
    <div class="btn-float-inner">
      <div
        class="w-full px-6 py-3 bg-(--color-bg-secondary) border border-(--color-border) text-(--color-text) rounded-lg flex items-center justify-center gap-3 font-medium shadow-sm"
      >
        {@html icons.microsoftIcon}
        Sign in with Outlook
      </div>
    </div>
  </div>
</div>

<style>
  .scatter {
    position: relative;
    width: 100%;
    min-height: 240px;
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

  .btn-float {
    position: absolute;
    z-index: 2;
    box-shadow:
      0 24px 48px -18px rgba(2, 30, 40, 0.28),
      0 8px 20px -8px rgba(2, 30, 40, 0.15);
    animation: btn-bob 7s ease-in-out infinite;
    animation-delay: var(--bob-delay, 0s);
    border-radius: 0.5rem;
    cursor: pointer;
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

  /* :active rule comes AFTER :hover so cascade order favors press state.
     Snap down fast (60ms linear), let :hover handle smooth release. */
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

  /* Google — upper-left, strong counter-clockwise tilt */
  .btn-float-google {
    top: 8%;
    left: 8%;
    width: min(280px, 78%);
    --base-rotate: -4.5deg;
    transform: rotate(var(--base-rotate));
  }

  /* Outlook — lower-right, gentle clockwise tilt */
  .btn-float-outlook {
    top: 54%;
    right: 7%;
    width: min(280px, 78%);
    --base-rotate: 1.5deg;
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
      min-height: 220px;
    }
    .btn-float-google {
      top: 8%;
      left: 2%;
      width: 84%;
    }
    .btn-float-outlook {
      top: 52%;
      right: 2%;
      width: 84%;
    }
  }

  /* Z-Fold-narrow + tiny phones — shrink glow, widen nuggets */
  @media (max-width: 360px) {
    .scatter-glow {
      inset: 22% 18% 22% 18%;
      filter: blur(38px);
    }
    .btn-float-google {
      width: 96%;
    }
    .btn-float-outlook {
      width: 96%;
    }
  }
</style>
