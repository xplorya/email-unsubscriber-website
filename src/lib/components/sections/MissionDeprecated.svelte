<script lang="ts">
  import { onMount, tick } from 'svelte'
  import { reveal, revealStaggered } from '$lib/utilities/scroll-reveal'
  import { icons } from '$lib/icons'
  import FootnoteExpander from '$lib/components/FootnoteExpander.svelte'
  import ParticleField from '$lib/components/ParticleField.svelte'

  const cellMinHeight = '86'
  const gridMaxHeight = 178

  let expanded = $state(false)
  let Flip: any = $state(null)

  const cell2height = $derived(expanded ? gridMaxHeight : 86)

  onMount(async () => {
    const gsap = (await import('gsap')).default
    // @ts-ignore
    const { Flip: FlipPlugin } = await import('gsap/Flip')
    gsap.registerPlugin(FlipPlugin)
    Flip = FlipPlugin
  })

  let gridEl: HTMLElement | undefined = $state()

  async function toggle() {
    if (!Flip || !gridEl) { expanded = !expanded; return }

    const gsapInstance = (await import('gsap')).default

    // 1. Capture old state + old grid dimensions
    const state = Flip.getState('.cell')
    const oldHeight = gridEl.getBoundingClientRect().height
    const oldWidth = gridEl.getBoundingClientRect().width

    // 2. Toggle
    expanded = !expanded
    await tick()

    // 3. Measure new natural grid height before locking
    const newHeight = gridEl.getBoundingClientRect().height

    // 4. Lock grid to old dimensions (Flip will set children absolute)
    gridEl.style.width = oldWidth + 'px'
    gridEl.style.height = oldHeight + 'px'

    // 5. Animate cells from old → new positions
    Flip.from(state, {
      duration: 0.6,
      ease: 'power2.inOut',
      absolute: true,
      onComplete: () => {
        if (gridEl) {
          gridEl.style.width = ''
          gridEl.style.height = ''
        }
      },
    })

    // 6. Animate grid height from old → new simultaneously
    gsapInstance.fromTo(gridEl,
      { height: oldHeight },
      {
        height: newHeight,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
          if (gridEl) gridEl.style.height = ''
        },
      }
    )
  }
</script>

<section id="why" class="section-fade-top bg-(--color-bg-secondary) py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
  <div use:reveal class="max-w-7xl mx-auto">
    <h2 class="text-3xl sm:text-4xl font-bold text-center text-(--color-text)">
      Why Email Unsubscriber?
    </h2>
    <p class="mt-4 text-center text-(--color-text-secondary) text-lg max-w-2xl mx-auto">
      We believe your email is your business, not ours.
    </p>

    <!-- Bento Grid -->
    <div bind:this={gridEl} class="bento-grid mt-12 sm:mt-16 min-[880px]:h-{gridMaxHeight} gap-4 sm:gap-5 lg:gap-6" class:collapsed={!expanded} class:expanded={expanded}>

      <!-- Cell 1 (top-left): We never read your emails -->
      <div class="cell cell-1 rounded-xl">
        <div
          use:revealStaggered={{ delay: 0, variant: 'scale' }}
          class="cell cell-1 group bento-cell card-elevated rounded-xl p-6 sm:p-8 border border-(--color-border) border-l-4 border-l-(--color-accent-border) h-{cellMinHeight}"
          style="background: linear-gradient(135deg, var(--color-accent-gradient-from), var(--color-bg-secondary-solid));"
        >
          <div class="icon-glow w-10 h-10 rounded-lg bg-(--color-accent-light) border border-(--color-accent-border) flex items-center justify-center mb-4">
            <span class="icon-hover-scale inline-block w-5 h-5 text-(--color-accent-text) [&>svg]:w-full [&>svg]:h-full">{@html icons.shield}</span>
          </div>
          <h3 class="text-lg font-semibold text-(--color-text)">We never read your emails</h3>
          <p class="mt-2 text-(--color-text-secondary) leading-relaxed">
            We don't access, store, or sell email content. Period.
          </p>
        </div>
      </div>

      <!-- Cell 2 (top-right): Verifiable Zero-Trust approach — expandable -->
      <div class="cell cell-2 relative rounded-xl z-10 min-w-67"
           style:height="{cell2height * 0.25}rem">
        <div
          use:revealStaggered={{ delay: 100, variant: 'scale' }}
          class="cell cell-2 group bento-cell card-elevated rounded-xl p-6 sm:p-8 relative border border-(--color-border) border-l-4 border-l-(--color-accent-border) bg-(--color-bg-secondary-solid) overflow-hidden h-full"
        >
          <div class="cell-2-dots"></div>
          <div class="relative z-10">
            <div class="icon-glow w-10 h-10 rounded-lg bg-(--color-accent-light) border border-(--color-accent-border) flex items-center justify-center">
              <span class="icon-hover-scale inline-block w-5 h-5 text-(--color-accent-text) [&>svg]:w-full [&>svg]:h-full">{@html icons.lock}</span>
            </div>
            <h3 class="mt-3 text-lg font-semibold text-(--color-text)">Verifiable Zero-Trust approach</h3>
            <p class="mt-2 text-(--color-text-secondary) leading-relaxed">
              We don't want you to have to trust us. That's why <span class="font-bold">your</span> email <code class="text-sm bg-(--color-bg) px-1.5 py-0.5 rounded border border-(--color-border)">access_token</code> is never sent to, or passed through our backend - and you can verify this.
            </p>
            <div class="absolute top-65">
              <button
                onclick={toggle}
                aria-expanded={expanded}
                class="w-full justify-end mt-4 inline-flex items-center gap-1 text-sm font-medium text-(--color-accent-text) hover:text-(--color-accent-hover) hover:underline transition-colors cursor-pointer"
              >
                Learn More
                <span
                  class="inline-flex w-4 h-4 shrink-0 transition-transform duration-300 ease-in-out"
                  class:rotate-180={expanded}
                >
                  {@html icons.chevronDown}
                </span>
              </button>

              <!-- Always rendered, clipped by overflow:hidden when collapsed -->
              <div class="pt-4 mt-4 border-t border-(--color-border)">
                <div class="flex items-center gap-3 mb-3">
                  <div class="icon-glow w-10 h-10 rounded-full bg-(--color-accent-light) flex items-center justify-center">
                    <span class="icon-hover-scale w-5 h-5 text-(--color-accent-text) [&>svg]:w-full [&>svg]:h-full">{@html icons.code}</span>
                  </div>
                  <h4 class="font-semibold text-(--color-text)">Auditable Open-Source Auth</h4>
                </div>
                <p class="text-sm text-(--color-text-secondary) leading-relaxed">
                  Our authentication service is fully open-source for complete transparency
                  and independent verification. You don't have to trust our word — you can
                  inspect every line of code yourself.
                </p>
                <a href="https://github.com/micro-solutions-llc/email-unsubscriber-open-oauth" target="_blank" rel="noopener noreferrer"
                   class="mt-3 inline-flex items-center gap-2 text-sm font-medium text-(--color-accent-text) hover:text-(--color-accent-hover) hover:underline transition-colors">
                  <span class="w-4 h-4 [&>svg]:w-full [&>svg]:h-full">{@html icons.github}</span>
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cell 3 (bot-left): Privacy by design -->
      <div class="cell cell-3 rounded-xl h-{cellMinHeight} min-w-70">
        <div
          use:revealStaggered={{ delay: 200, variant: 'scale' }}
          class="cell cell-3 group bento-cell card-elevated rounded-xl p-6 sm:p-8 h-full border border-(--color-border) border-l-4 border-l-(--color-accent-border)"
          style="background: linear-gradient(to bottom, var(--color-bg-secondary-solid), var(--color-accent-gradient-from));"
        >
          <div class="icon-glow w-10 h-10 rounded-lg bg-(--color-accent-light) border border-(--color-accent-border) flex items-center justify-center mb-4">
            <span class="icon-hover-scale inline-block w-5 h-5 text-(--color-accent-text) [&>svg]:w-full [&>svg]:h-full">{@html icons.heart}</span>
          </div>
          <h3 class="text-lg font-semibold text-(--color-text)">Privacy by design, not by marketing</h3>
          <p class="mt-2 text-(--color-text-secondary) leading-relaxed">
            Most tools say they care about privacy. We built our entire architecture around it. Browser-only features and authentication service segregation isn't a feature - it's the foundation.
          </p>
        </div>
      </div>

      <!-- Cell 4 (bot-right): Everything stays in your browser -->
      <div class="cell cell-4 rounded-xl h-{cellMinHeight} min-w-60">
        <div
          use:revealStaggered={{ delay: 300, variant: 'scale' }}
          class="cell cell-4 group bento-cell card-elevated rounded-xl p-6 sm:p-8 relative h-full overflow-hidden border-2 border-(--color-accent-border) bg-(--color-bg-secondary-solid)"
        >
          <ParticleField />
          <div class="relative z-10">
            <div class="icon-glow w-10 h-10 rounded-lg bg-(--color-accent-light) border border-(--color-accent-border) flex items-center justify-center mb-4">
              <span class="icon-hover-scale inline-block w-5 h-5 text-(--color-accent-text) [&>svg]:w-full [&>svg]:h-full">{@html icons.monitor}</span>
            </div>
            <h3 class="text-lg font-semibold text-(--color-text)">Everything stays in your browser</h3>
            <p class="mt-2 text-(--color-text-secondary) leading-relaxed">
              All scanning happens locally in your browser. Your email data never touches our servers. Not during the scan, not after, not ever.
            </p>
          </div>
          <div class="absolute inset-0 pointer-events-none" aria-hidden="true" style="background: radial-gradient(ellipse at 50% 80%, var(--color-accent-glow), transparent 70%);"></div>
        </div>
      </div>

      <!-- Cell [5]: Independently Verified -->
<!--      <div-->
<!--        use:revealStaggered={{ delay: 400, variant: 'scale' }}-->
<!--        class="cell-5 group bento-cell card-elevated rounded-xl p-6 sm:p-8 border border-(&#45;&#45;color-border) border-l-4 border-l-(&#45;&#45;color-accent-border) bg-(&#45;&#45;color-bg-secondary-solid)"-->
<!--      >-->
<!--        <div class="icon-glow w-12 h-12 rounded-lg bg-(&#45;&#45;color-accent-light) border border-(&#45;&#45;color-accent-border) flex items-center justify-center mb-4">-->
<!--          <span class="icon-hover-scale inline-block w-6 h-6 text-(&#45;&#45;color-accent-text) [&>svg]:w-full [&>svg]:h-full">{@html icons.shieldVerified}</span>-->
<!--        </div>-->
<!--        <h3 class="text-lg font-semibold text-(&#45;&#45;color-text)">Independently Verified</h3>-->
<!--        <p class="mt-2 text-(&#45;&#45;color-text-secondary) leading-relaxed">-->
<!--          Our security practices are assessed by independent third-party auditors under Google's CASA framework. Full transparency in our Security Report.-->
<!--        </p>-->
<!--        <a-->
<!--          href="/security"-->
<!--          target="_blank"-->
<!--          rel="noopener noreferrer"-->
<!--          class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-(&#45;&#45;color-accent-text) hover:text-(&#45;&#45;color-accent-hover) hover:underline transition-colors"-->
<!--        >-->
<!--          View Security Report &rarr;-->
<!--        </a>-->
<!--      </div>-->

      <!-- Cell [6]: No Tracking. No Profiling. — 2 cols on lg -->
<!--      <div-->
<!--        use:revealStaggered={{ delay: 500, variant: 'scale' }}-->
<!--        class="cell-6 group bento-cell card-elevated rounded-xl p-6 sm:p-8 border border-(&#45;&#45;color-border) border-b-4 border-b-(&#45;&#45;color-accent-border)"-->
<!--        style="background: linear-gradient(to right, var(&#45;&#45;color-accent-gradient-from), var(&#45;&#45;color-bg-secondary-solid));"-->
<!--      >-->
<!--        <div class="icon-glow w-12 h-12 rounded-lg bg-(&#45;&#45;color-accent-light) border border-(&#45;&#45;color-accent-border) flex items-center justify-center mb-4">-->
<!--          <span class="icon-hover-scale inline-block w-6 h-6 text-(&#45;&#45;color-accent-text) [&>svg]:w-full [&>svg]:h-full">{@html icons.eye}</span>-->
<!--        </div>-->
<!--        <h3 class="text-lg font-semibold text-(&#45;&#45;color-text)">No Tracking. No Profiling.</h3>-->
<!--        <p class="mt-2 text-(&#45;&#45;color-text-secondary) leading-relaxed">-->
<!--          We don't analyze your email patterns, build behavioral profiles, or monetize your data. Your inbox activity is yours alone — we couldn't track it even if we wanted to.-->
<!--        </p>-->
<!--      </div>-->
    </div>

    <FootnoteExpander id="privacy-tech" triggerText="Learn more about our privacy-first technology — tap to expand">
      <div class="group card-elevated p-6 rounded-xl border border-(--color-border)" style="background: linear-gradient(to bottom, var(--color-accent-gradient-from), var(--color-bg));">
        <div class="flex items-center gap-3 mb-4">
          <div class="icon-glow w-10 h-10 rounded-full bg-(--color-accent-light) flex items-center justify-center">
            <span class="icon-hover-scale w-5 h-5 text-(--color-accent-text) [&>svg]:w-full [&>svg]:h-full">{@html icons.cpu}</span>
          </div>
          <h4 class="font-semibold text-(--color-text)">Proprietary On-Device Algorithm</h4>
        </div>
        <p class="text-sm text-(--color-text-secondary) leading-relaxed">
          Email scanning and analysis happens entirely on your device. No email content is ever sent to or stored on our servers. The processing algorithm gets dynamically fetched on your device on-demand so it can analyze the emails locally — your inbox data never leaves your browser.
        </p>
      </div>
    </FootnoteExpander>
  </div>
</section>

<style>
  /* ── Bento Grid Layout ─────────────────────────────────────────── */

  .bento-grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: minmax(120px, auto);
    position: relative;
  }

  /* Mobile: top-to-bottom order */
  .cell-1 { order: 1; }
  .cell-2 { order: 2; }
  .cell-3 { order: 3; }
  .cell-4 { order: 4; }

  /* Tablet (sm): 2-col grid */
  @media (min-width: 640px) {
    .bento-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .cell-1 {
      grid-column: 1 / span 2;
      order: unset;
    }
    .cell-4 {
      grid-column: 1 / span 2;
      order: unset;
    }
    .cell-2 { order: unset; }
    .cell-3 { order: unset; }
  }

  /* Desktop: 3-col bento with collapsed/expanded states
   *
   * Collapsed:
   * | cell-1 (col 1-2)  | cell-2 (col 3)    |
   * | cell-3 (col 1)    | cell-4 (col 2-3)  |
   *
   * Expanded:
   * | cell-1 (col 1-2)  | cell-2 (col 3, spans 2 rows) |
   * | cell-3 (col 1)    | cell-4 (col 2)                |
   */
  @media (min-width: 880px) {
    .bento-grid {
      grid-template-columns: repeat(3, 1fr);
    }

    .collapsed .cell-1 { grid-column: 1 / span 2; grid-row: 1; }
    .collapsed .cell-2 { grid-column: 3; grid-row: 1; }
    .collapsed .cell-3 { grid-column: 1; grid-row: 2; }
    .collapsed .cell-4 { grid-column: 2 / span 2; grid-row: 2; }

    .expanded .cell-1 { grid-column: 1 / span 2; grid-row: 1; }
    .expanded .cell-2 { grid-column: 3; grid-row: 1 / span 2; }
    .expanded .cell-3 { grid-column: 1; grid-row: 2; }
    .expanded .cell-4 { grid-column: 2; grid-row: 2; }
  }

  /* ── Cell 2 dot-grid corner overlay ─────────────────────────── */

  .cell-2-dots {
    position: absolute;
    top: 0;
    right: 0;
    width: 80px;
    height: 80px;
    pointer-events: none;
    z-index: 0;
    background-image: radial-gradient(circle, var(--color-dot-grid) 1px, transparent 1px);
    background-size: 10px 10px;
    mask-image: linear-gradient(135deg, transparent 30%, black 100%);
    -webkit-mask-image: linear-gradient(135deg, transparent 30%, black 100%);
  }

  /* ── Bento cell hover — lift + border color shift ────────────── */

  :global(.bento-cell) {
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  }
  :global(.bento-cell:hover) {
    transform: translateY(-3px);
  }

  /* ── Reduced motion overrides ────────────────────────────────── */

  @media (prefers-reduced-motion: reduce) {
    :global(.bento-cell) {
      transition: none !important;
    }
  }
</style>