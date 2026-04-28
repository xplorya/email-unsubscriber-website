<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { loadGsap, prefersReducedMotion } from '$lib/utilities/gsap-utils'
  import FiltersChipGroup from './webapp-mockup/FiltersChipGroup.svelte'
  import FreqBadge from './webapp-mockup/FreqBadge.svelte'
  import ScanProgress from './webapp-mockup/ScanProgress.svelte'
  import ScopePillsWithRescan from './webapp-mockup/ScopePillsWithRescan.svelte'
  import SingleRow from './webapp-mockup/SingleRow.svelte'
  import { seedRows } from './webapp-mockup/seed-rows'

  let stageEl: HTMLDivElement | undefined = $state()

  // Scan chip state — shared between ScanProgress (autoplay) and the
  // ScopePillsWithRescan row. Rescan bumps restartSignal which the
  // ScanProgress watches via $effect.
  const scanScopes = ['7d', '30d', '6m', '12m']
  let scanSelectedIndex = $state(2) // '6m'
  let scanRestartSignal = $state(0)

  let entranceTl: { kill: () => void } | null = null

  onMount(async () => {
    if (prefersReducedMotion()) return
    if (!stageEl) return

    const { gsap } = await loadGsap()
    if (!stageEl.isConnected) return

    const cards = stageEl.querySelectorAll<HTMLElement>('.chip-float')
    gsap.set(cards, { autoAlpha: 0, y: 24, scale: 0.95 })

    entranceTl = gsap.to(cards, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      stagger: 0.12,
      delay: 0.4,
      ease: 'expo.out',
    })
  })

  onDestroy(() => {
    entranceTl?.kill()
  })
</script>

<div bind:this={stageEl} class="chip-stage" aria-hidden="false">
  <!-- Ambient glow + grid bg -->
  <div class="chip-glow" aria-hidden="true"></div>
  <div class="chip-grid-bg" aria-hidden="true"></div>

  <!-- 1 — Filters chip (top-left, slight tilt) -->
  <div
    class="chip-float chip-float-chips"
    style="--bob-delay: -0.5s;"
  >
    <div class="chip-caption">filters</div>
    <FiltersChipGroup selectedTone="active" />
  </div>

  <!-- 2 — Live scan (mid-left) -->
  <div
    class="chip-float chip-float-scan"
    style="--bob-delay: -2s;"
  >
    <div class="chip-caption">Intuitive scanning controls</div>
    <ScanProgress
      scanScope="last-6-months"
      autoplay
      restartSignal={scanRestartSignal}
    />
    <div class="mt-1">
      <ScopePillsWithRescan
        values={scanScopes}
        selectedIndex={scanSelectedIndex}
        onSelect={(i) => {
          scanSelectedIndex = i
        }}
        onRescan={() => {
          scanRestartSignal += 1
        }}
        ariaLabel="Scan time period"
      />
    </div>
  </div>

  <!-- 3 — Single row (center, slight tilt) -->
  <div
    class="chip-float chip-float-row"
    style="--bob-delay: -3.5s;"
  >
    <div class="chip-caption">insights at glance</div>
    <SingleRow sub={seedRows[1]} />
  </div>

  <!-- 4 — Frequency badge stack (bottom-right) -->
<!--  <div-->
<!--    class="chip-float chip-float-badges"-->
<!--    style="&#45;&#45;bob-delay: -5s;"-->
<!--  >-->
<!--    <div class="flex flex-col items-start gap-1.5">-->
<!--      <FreqBadge freq="daily" />-->
<!--      <FreqBadge freq="weekly" />-->
<!--      <FreqBadge freq="monthly" />-->
<!--      <FreqBadge freq="rare" />-->
<!--    </div>-->
<!--  </div>-->

  <!-- 5 — Counter (top-right, gradient, glowing) -->
<!--  <div-->
<!--    class="chip-float chip-float-counter"-->
<!--    style="&#45;&#45;bob-delay: -6.5s;"-->
<!--  >-->
<!--    <div class="counter-num">Унсуб</div>-->
<!--    <div class="counter-label">subscriptions<br />found</div>-->
<!--  </div>-->
</div>

<style>
  .chip-stage {
    position: relative;
    width: 100%;
    min-height: 560px;
    isolation: isolate;
  }

  @media (max-width: 1023px) {
    .chip-stage {
      min-height: 520px;
    }
  }

  .chip-glow {
    position: absolute;
    inset: 8% -10% 8% -5%;
    background: radial-gradient(
      closest-side,
      color-mix(in srgb, var(--color-accent) 28%, transparent),
      transparent 70%
    );
    filter: blur(70px);
    opacity: 0.55;
    pointer-events: none;
    z-index: 0;
  }

  .chip-grid-bg {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(to right, color-mix(in srgb, var(--color-border) 50%, transparent) 1px, transparent 1px),
      linear-gradient(to bottom, color-mix(in srgb, var(--color-border) 50%, transparent) 1px, transparent 1px);
    background-size: 40px 40px;
    opacity: 0.25;
    mask-image: radial-gradient(ellipse 60% 60% at 50% 50%, #000, transparent 80%);
    -webkit-mask-image: radial-gradient(ellipse 60% 60% at 50% 50%, #000, transparent 80%);
    pointer-events: none;
    z-index: 0;
  }

  .chip-float {
    position: absolute;
    z-index: 2;
    background: var(--color-bg-secondary-solid);
    border: 1px solid var(--color-border);
    border-radius: 12px;
    box-shadow:
      0 30px 60px -20px rgba(2, 30, 40, 0.28),
      0 10px 25px -10px rgba(2, 30, 40, 0.15);
    animation: chip-bob 8s ease-in-out infinite;
    animation-delay: var(--bob-delay, 0s);
    transition: box-shadow 0.3s ease, transform 0.3s ease;
  }

  .chip-float:hover {
    box-shadow:
      0 40px 80px -20px rgba(2, 30, 40, 0.35),
      0 15px 35px -10px rgba(2, 30, 40, 0.22);
  }

  @keyframes chip-bob {
    0%, 100% { transform: var(--base-transform, translateY(0)); }
    50% { transform: var(--base-transform, translateY(0)) translateY(-6px); }
  }

  @media (prefers-reduced-motion: reduce) {
    .chip-float { animation: none !important; }
  }

  .chip-caption {
    position: absolute;
    top: -22px;
    left: 6px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-accent);
    opacity: 0.85;
  }

  /* Individual card positions (match prototype v1-refined.css) */
  .chip-float-chips {
    top: 2%;
    left: 2%;
    padding: 14px 16px;
    --base-transform: rotate(-1.2deg);
    transform: var(--base-transform);
  }

  .chip-float-scan {
    top: 52%;
    left: -4%;
    width: min(440px, 90%);
    padding: 14px 16px;
    --base-transform: rotate(0.5deg);
    transform: var(--base-transform);
  }

  .chip-float-row {
    top: 22%;
    right: 4%;
    left: auto;
    width: fit-content;
    padding: 4px 8px;
    --base-transform: rotate(1.2deg);
    transform: var(--base-transform);
  }

  .chip-float-badges {
    top: 70%;
    right: 12%;
    padding: 14px 16px;
    --base-transform: rotate(-2deg);
    transform: var(--base-transform);
  }

  .chip-float-counter {
    top: 0%;
    right: 6%;
    padding: 20px 24px;
    text-align: center;
    background: linear-gradient(
      135deg,
      var(--color-accent),
      color-mix(in srgb, var(--color-accent) 60%, #000)
    );
    border-color: var(--color-accent);
    color: #fff;
    box-shadow:
      0 20px 40px -10px color-mix(in srgb, var(--color-accent) 50%, transparent),
      0 0 30px var(--color-accent-glow);
    --base-transform: rotate(3deg);
    transform: var(--base-transform);
  }

  .counter-num {
    font-size: 48px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.03em;
  }

  .counter-label {
    font-size: 11px;
    font-weight: 500;
    margin-top: 6px;
    opacity: 0.9;
    line-height: 1.3;
  }

  /* ── Mobile ── */
  @media (max-width: 1023px) {
    .chip-float-chips { top: 0; left: 0; }
    .chip-float-scan  { top: 51%; left: 2%; width: 90%; }
    .chip-float-row   {
      top: 20%;
      left: 50%;
      width: fit-content;
      --base-transform: translateX(-50%) rotate(1.2deg);
      transform: var(--base-transform);
    }
    .chip-float-badges { top: 72%; right: 4%; }
    .chip-float-counter { top: 3%; right: 3%; padding: 14px 16px; }
    .counter-num { font-size: 34px; }
  }

  @media (max-width: 640px) {
    .chip-float-chips { top: 0; left: 0; right: auto; }
    .chip-float-counter { top: 0%; right: 0%; }
    .chip-float-row {
      top: 22%;
      left: 50%;
      width: fit-content;
      --base-transform: translateX(-50%) rotate(1.2deg);
      transform: var(--base-transform);
    }
    .chip-float-scan { top: 48%; left: 0; width: 98%; }
    .chip-float-badges { top: 78%; right: 2%; }
  }
</style>
