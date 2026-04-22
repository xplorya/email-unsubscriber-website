<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte'
  import {icons} from "$lib/icons";
  import { reveal } from '$lib/utilities/scroll-reveal'
  import { loadGsap, revealHeading, prefersReducedMotion } from '$lib/utilities/gsap-utils'
  import ParticleField from "$lib/components/ParticleField.svelte";
  import FootnoteExpander from "$lib/components/FootnoteExpander.svelte";
  import ArchitectureDiagram from "$lib/components/sections/ArchitectureDiagram.svelte";

  let isWide = $state(false)

  let expanded = $state(false)
  let Flip: any = $state(null)

  let sectionEl: HTMLElement | undefined = $state()

  /** ScrollTrigger instances created by entrance animations (NOT Flip) */
  const scrollTriggers: Array<{ kill: () => void }> = []

  onMount(async () => {
    const mq = window.matchMedia('(min-width: 880px)')
    isWide = mq.matches
    mq.addEventListener('change', (e) => isWide = e.matches)

    const { Flip: FlipPlugin, gsap, ScrollTrigger } = await loadGsap()
    Flip = FlipPlugin

    // --- Entrance animations (skip if reduced motion) ---
    if (!prefersReducedMotion() && sectionEl) {
      // 1. Set initial hidden state BEFORE creating the batch trigger
      //    (prevents visible→invisible→animate flash)
      const cells = gsap.utils.toArray('.bento-cell') as HTMLElement[]
      gsap.set(cells, { autoAlpha: 0, y: 30, scale: 0.95 })

      // 2. Batch reveal for bento cells
      ScrollTrigger.batch('.bento-cell', {
        onEnter: (batch: Element[]) => {
          gsap.to(batch, {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            stagger: 0.08,
            duration: 0.7,
            ease: 'back.out(1.7)'
          })
        },
        start: 'top 90%',
        once: true
      })
      // Collect the batch ScrollTrigger for cleanup
      const batchTriggers = ScrollTrigger.getAll().filter(
        (st: any) => st.vars?.once === true
      )
      scrollTriggers.push(...batchTriggers)
    }
  })

  onDestroy(() => {
    // Kill only the entrance-animation ScrollTriggers, NOT the Flip plugin
    for (const st of scrollTriggers) {
      st.kill()
    }
    scrollTriggers.length = 0
  })

  let gridEl: HTMLElement | undefined = $state()

  async function toggle() {
    if (!Flip || !gridEl) { expanded = !expanded; return }

    const { gsap: gsapInstance } = await loadGsap()

    // 1. Capture old state + old grid height
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

<!--    Cell 1 -->
{#snippet cell1()}
  <div class="cell cell-1 rounded-xl flex h-full">
    <div class="cell cell-1 group bento-cell card-elevated rounded-xl p-6 pb-2 flex flex-col grow border border-(--color-border) border-l-4 border-l-(--color-accent-border)"
         style="background: linear-gradient(135deg, var(--color-accent-gradient-from), var(--color-bg-secondary-solid));">
      <div class="shrink-0 icon-glow w-10 h-10 rounded-lg bg-(--color-accent-light) border border-(--color-accent-border) flex items-center justify-center mb-4">
        <span class="icon-hover-scale inline-block w-6 h-6 text-(--color-accent-text) [&>svg]:w-full [&>svg]:h-full">{@html icons.neverReadYourMails}</span>
      </div>
      <h3 class="text-lg font-semibold text-(--color-text)">We Never Read Your Emails — Everything Stays in Your Browser</h3>
      <p class="mt-2 text-(--color-text-secondary) leading-relaxed">
        Our backend only serves the algorithm to your browser, which executes it locally to scan everything directly on your device. Your email data never touches our servers.
      </p>
      <div class="w-full mt-auto rounded-xl">
        <ArchitectureDiagram />
      </div>

    </div>
  </div>
{/snippet}

<!--    Cell 2 -->
{#snippet cell2()}
  <div class="cell cell-2 relative rounded-xl z-10 min-w-67 h-full cell-2-mobile"
       class:is-expanded={expanded}>
    <div
      class="cell cell-2 group bento-cell card-elevated rounded-xl p-6 sm:p-8 relative border border-(--color-border) border-l-4 border-l-(--color-accent-border) bg-(--color-bg-secondary-solid) overflow-hidden h-full"
    >
      <div class="cell-2-dots"></div>
      <div class="relative z-10 h-full">
        <div class="icon-glow w-10 h-10 rounded-lg bg-(--color-accent-light) border border-(--color-accent-border) flex items-center justify-center ">
          <span class="icon-hover-scale inline-block w-6 h-6 text-(--color-accent-text) [&>svg]:w-full [&>svg]:h-full">{@html icons.verifyRibbonNoTail}</span>
        </div>
        <h3 class="mt-3 text-lg font-semibold text-(--color-text)">Verifiable Zero-Trust Approach</h3>
        <p class="mt-2 text-(--color-text-secondary) leading-relaxed">
          We don't want you to have to trust us. That's why <span class="font-bold">your</span> email <code class="text-sm bg-(--color-bg) px-1.5 py-0.5 rounded border border-(--color-border)">access_token</code> is never sent to our backend or passed through it — and you can verify this.
        </p>
        <div class="absolute top-65 bottom-6">
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
          <div class="pt-4 mt-4 border-t border-(--color-border) h-full flex flex-col">
            <div class="flex items-center gap-3 mb-3">
<!--              <div class="icon-glow w-10 h-10 rounded-full bg-(&#45;&#45;color-accent-light) flex items-center justify-center">-->
<!--                <span class="icon-hover-scale w-7 h-7 text-(&#45;&#45;color-accent-text) [&>svg]:w-full [&>svg]:h-full">{@html icons.magnifyingGlassCode}</span>-->
<!--              </div>-->
              <div class="icon-glow w-10 h-10 rounded-lg bg-(--color-accent-light) border border-(--color-accent-border) flex items-center justify-center ">
                <span class="icon-hover-scale inline-block w-7 h-7 text-(--color-accent-text) [&>svg]:w-full [&>svg]:h-full">{@html icons.magnifyingGlassCode}</span>
              </div>
            <h4 class="font-semibold text-(--color-text)">Auditable Open-Source Auth</h4>
            </div>
            <p class="text-sm text-(--color-text-secondary) leading-relaxed">
              Our authentication service is fully open-source for complete transparency
              and independent verification. You don't have to trust our word — you can
              inspect every line of code yourself.
            </p>
            <div class="grow flex items-end justify-end mt-4 mb-6">
              <a href="https://github.com/micro-solutions-llc/email-unsubscriber-open-oauth" target="_blank" rel="noopener noreferrer"
                 class="inline-flex items-end gap-2 text-sm font-medium text-(--color-accent-text) hover:text-(--color-accent-hover) hover:underline transition-colors">
                <span class="w-4 h-4 [&>svg]:w-full [&>svg]:h-full">{@html icons.github}</span>
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/snippet}

<!--    Cell 3 -->
{#snippet cell3()}
  <div class="cell cell-3 rounded-xl min-w-70 h-full">
    <div
      class="cell cell-3 rounded-xl p-6 sm:p-8 group bento-cell card-elevated h-full border border-(--color-border) border-l-4 border-l-(--color-accent-border)"
      style="background: linear-gradient(to bottom, var(--color-bg-secondary-solid), var(--color-accent-gradient-from));"
    >
      <div class="icon-glow w-10 h-10 rounded-lg bg-(--color-accent-light) border border-(--color-accent-border) flex items-center justify-center mb-4">
        <span class="icon-hover-scale inline-block w-6 h-6 text-(--color-accent-text) [&>svg]:w-full [&>svg]:h-full">{@html icons.privacyByDesignGitCompare}</span>
      </div>
      <h3 class="text-lg font-semibold text-(--color-text)">Privacy by Design, Not by Marketing</h3>
      <p class="mt-2 text-(--color-text-secondary) leading-relaxed">
        Most tools say they care about privacy. We built our entire architecture around it. Browser-only execution and isolated authentication aren't add-ons — they're the foundation.
      </p>
    </div>
  </div>
{/snippet}

<!--    Cell 4 -->
{#snippet cell4()}
  <div class="cell cell-4 rounded-xl min-w-60 h-full">
    <div
      class="cell-4 rounded-xl p-6 sm:p-8 relative group bento-cell card-elevated h-full overflow-hidden border-2 border-(--color-accent-border) bg-(--color-bg-secondary-solid)"
    >
      <ParticleField />
      <div class="relative z-10">
        <div class="icon-glow w-10 h-10 rounded-lg bg-(--color-accent-light) border border-(--color-accent-border) flex items-center justify-center mb-4">
          <span class="icon-hover-scale inline-block w-6 h-6 text-(--color-accent-text) [&>svg]:w-full [&>svg]:h-full">{@html icons.committedToCompliance}</span>
        </div>
        <h3 class="text-lg font-semibold text-(--color-text)">Compliant by Conviction</h3>
        <p class="mt-2 text-(--color-text-secondary) leading-relaxed">
          We align with GDPR, CCPA, and leading data protection frameworks worldwide. We follow them proactively, not because we're always legally required to, but because that's the straight path to peace of mind — yours and ours.
        </p>
      </div>
      <div class="absolute inset-0 pointer-events-none" aria-hidden="true" style="background: radial-gradient(ellipse at 50% 80%, var(--color-accent-glow), transparent 70%);"></div>
    </div>
  </div>
{/snippet}

<!--    Cell 5 -->
{#snippet cell5()}
  <div
    class="cell-5 group bento-cell card-elevated rounded-xl p-6 sm:p-8 border border-(--color-border) border-l-4 border-l-(--color-accent-border) bg-(--color-bg-secondary-solid)"
  >
    <div class="icon-glow w-12 h-12 rounded-lg bg-(--color-accent-light) border border-(--color-accent-border) flex items-center justify-center mb-4">
      <span class="icon-hover-scale inline-block w-6 h-6 text-(--color-accent-text) [&>svg]:w-full [&>svg]:h-full">{@html icons.shieldVerified}</span>
    </div>
    <h3 class="text-lg font-semibold text-(--color-text)">Independently Verified</h3>
    <p class="mt-2 text-(--color-text-secondary) leading-relaxed">
      Our security practices are assessed by independent third-party auditors under Google's CASA framework. Full transparency in our Security Report.
    </p>
    <a
      href="/security"
      target="_blank"
      rel="noopener noreferrer"
      class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-(--color-accent-text) hover:text-(--color-accent-hover) hover:underline transition-colors"
    >
      View Security Report &rarr;
    </a>
  </div>
{/snippet}

<!--    Cell 6 -->
{#snippet cell6()}
  <div
    class="cell-6 group bento-cell card-elevated rounded-xl p-6 sm:p-8 border border-(--color-border) border-b-4 border-b-(--color-accent-border)"
    style="background: linear-gradient(to right, var(--color-accent-gradient-from), var(--color-bg-secondary-solid));"
  >
    <div class="icon-glow w-12 h-12 rounded-lg bg-(--color-accent-light) border border-(--color-accent-border) flex items-center justify-center mb-4">
      <span class="icon-hover-scale inline-block w-6 h-6 text-(--color-accent-text) [&>svg]:w-full [&>svg]:h-full">{@html icons.transparent}</span>
    </div>
    <h3 class="text-lg font-semibold text-(--color-text)">No Tracking. No Profiling.</h3>
    <p class="mt-2 text-(--color-text-secondary) leading-relaxed">
      We don't analyze your email patterns, build behavioral profiles, or monetize your data. Your inbox activity is yours alone — we couldn't track it even if we wanted to.
    </p>
  </div>
{/snippet}

{#snippet wideLayout()}
  <div bind:this={gridEl} use:reveal class="max-[880px]:hidden grid max-w-7xl mx-auto min-[880px]:h-178 mt-12 gap-6" class:collapsed={!expanded} class:expanded={expanded}>
    {@render cell1()}
    {@render cell2()}
    {@render cell3()}
    {@render cell4()}
    <!-- Cell [5]: Independently Verified -->
    <!--{@render cell5()}-->
    <!-- Cell [6]: No Tracking. No Profiling. (That's a total bullshit)) -->
    <!--{@render cell6()}-->
  </div>
{/snippet}

{#snippet narrowLayout()}
  <div class="min-[880px]:hidden flex flex-col gap-3">
    <div class="z-20">
      {@render cell1()}
    </div>
    {@render cell2()}
    {@render cell3()}
    {@render cell4()}
  </div>
{/snippet}

<section bind:this={sectionEl} id="why" class="section-fade-top bg-(--color-bg-secondary) py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
  <h2 use:revealHeading class="text-3xl sm:text-4xl font-bold text-center text-(--color-text)">
    Why Email Unsubscriber?
  </h2>
  <p class="mt-4 text-center text-(--color-text-secondary) text-lg max-w-2xl mx-auto">
    We believe your email is your business, not ours.
  </p>

  {#if isWide}
    <!--  Desktop Bento Grid -->
    {@render wideLayout()}
  {:else}
    <!--    Mobile Grid -->
    {@render narrowLayout()}
  {/if}

  <div class="max-w-7xl items-center justify-center mx-auto mt-12">
    <FootnoteExpander id="privacy-tech" triggerText="Learn more about our privacy-first technology — tap to expand">
      <div class="group card-elevated p-6 rounded-xl border border-(--color-border)" style="background: linear-gradient(to bottom, var(--color-accent-gradient-from), var(--color-bg));">
        <div class="flex items-center gap-3 mb-4">
          <div class="icon-glow w-10 h-10 rounded-full bg-(--color-accent-light) flex items-center justify-center">
            <span class="icon-hover-scale w-6 h-6 text-(--color-accent-text) [&>svg]:w-full [&>svg]:h-full">{@html icons.cpu}</span>
          </div>
          <h4 class="font-semibold text-(--color-text)">Proprietary On-Device Algorithm</h4>
        </div>
        <p class="text-sm text-(--color-text-secondary) leading-relaxed">
          The full process of fetching your emails, scanning and analyzing them, then discarding the content runs as a single uninterrupted sequence on your device. Once the scan completes, no residual email content stays in your browser's memory, so leaving your device unlocked or using a shared one won't expose it. Worth noting: your session token stays active for about 1 hour, so you (or someone else with access to your device and browser) can run unlimited re-scans during that window unless you explicitly log out.
        </p>
      </div>
    </FootnoteExpander>
  </div>

</section>

<style>
  .grid {
    grid-auto-rows: minmax(120px, auto);
    position: relative;
  }

  @media (min-width: 880px) {
    .grid {
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: 1fr 1fr;
      align-items: stretch;
    }

    /* Collapsed:
     * | cell-1 (col 1-2)  | cell-2 (col 3)   |
     * | cell-3 (col 1)    | cell-4 (col 2-3)  |
     */
    .collapsed .cell-1 { grid-column: 1 / span 2; grid-row: 1; }
    .collapsed .cell-2 { grid-column: 3; grid-row: 1; }
    .collapsed .cell-3 { grid-column: 1; grid-row: 2; }
    .collapsed .cell-4 { grid-column: 2 / span 2; grid-row: 2; }

    /* Expanded:
     * | cell-1 (col 1-2)  | cell-2 (col 3, 2 rows) |
     * | cell-3 (col 1)    | cell-4 (col 2)          |
     */
    .expanded .cell-1 { grid-column: 1 / span 2; grid-row: 1; }
    .expanded .cell-2 { grid-column: 3; grid-row: 1 / span 2; }
    .expanded .cell-3 { grid-column: 1; grid-row: 2; }
    .expanded .cell-4 { grid-column: 2; grid-row: 2; }
  }

  /* Mobile: cell-2 needs explicit height (absolute-positioned Learn More block) */
  @media (max-width: 879px) {
    .cell-2-mobile {
      height: 21rem;
      transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .cell-2-mobile.is-expanded {
      height: 38rem;
    }
  }

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

</style>
