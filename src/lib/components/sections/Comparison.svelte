<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { loadGsap, prefersReducedMotion, revealHeading } from '$lib/utilities/gsap-utils'

  // TODO: - This section needs work in the features comparison row and the footnote

  interface Competitor {
    name: string
    privacy: string
    pricing: string
    dataAccess: string
    features: string
    persistentAccess: string
  }

  const us: Competitor = {
    name: 'Email Unsubscriber',
    privacy: 'On your device in full isolation',
    pricing: '€2.99 / 30 days',
    dataAccess: 'Read-only, <a href="/privacy#how-it-works" target="_blank" rel="noopener noreferrer" class="underline hover:text-(--color-accent)">browser-contained</a>',
    features: "Unwanted emails detection<br>" +
      "Real unsubscribing assistance<br>" +
      "Filtering and cleanup assistance<br>" +

      "Unsubscribe Violation Detection<br>" +
      "Coupons & discounts<br>" +
      "Audit Log",
    persistentAccess: 'No, refresh tokens not utilized by design'
  }

  const competitors: Competitor[] = [
    {
      name: 'Unroll.me',
      privacy: 'On their loud',
      pricing: 'Free (sells data)',
      dataAccess: 'Full read/write access',
      features: "Unsubscribing<br>" +
        "Rollup digest",
      persistentAccess: 'Yes'
    },
    {
      name: 'Clean Email',
      privacy: 'On their cloud',
      pricing: '€11.99 / month',
      dataAccess: 'Full read/write access',
      features: "Unsubscribing<br>" +
        "Auto categories and digests<br>" +
        "Cleaning rules<br>" +
        "Sender blocking<br>" +
        "Email size analysis",
      persistentAccess: 'Yes'
    },
    {
      name: 'Leave Me Alone',
      privacy: 'On their cloud',
      pricing: '€17 / 7 days unlimited<br>Or limited features for €8 / month',
      dataAccess: 'Full read/write access',
      features: "Unsubscribing<br>" +
        "Rollup digests<br>" +
        "Automatic filtering<br>" +
        "Curated blocklists<br>" +
        "Two addresses under one account",
      persistentAccess: 'Yes'
    },
    {
      name: 'Cleanfox',
      privacy: 'On their cloud',
      pricing: 'Free (sells data)',
      dataAccess: 'Full read/write access',
      features: "Unsubscribing<br>" +
        "Bulk deletes<br>" +
        "Automatic filtering<br>" +
        "Sources scoring<br>" +
        "Carbon footprint tracker",
      persistentAccess: 'Yes'
    }
  ]

  const features = [
    { label: 'Pricing', key: 'pricing' as const },
    { label: 'Data processing', key: 'privacy' as const },
    { label: 'Granted Permissions', key: 'dataAccess' as const },
    { label: 'Persistent Access', key: 'persistentAccess' as const },
    { label: 'Features', key: 'features' as const },
  ]

  /* ── GSAP cleanup tracking ─────────────────────────────── */
  let tweens: { kill: () => void }[] = []
  let triggers: { kill: () => void }[] = []
  let matchMediaInstance: { revert: () => void } | null = null

  function trackTween(t: any) {
    tweens.push(t)
    if (t.scrollTrigger) triggers.push(t.scrollTrigger)
    return t
  }

  let sectionEl: HTMLElement | undefined = $state()

  onMount(async () => {
    if (prefersReducedMotion()) return

    const { gsap, ScrollTrigger } = await loadGsap()

    // Guard: component may have unmounted during async load
    if (!sectionEl?.isConnected) return

    const mm = gsap.matchMedia()
    matchMediaInstance = mm

    /* ═══ DESKTOP: Table row batch reveals + featured glow ═══ */
    mm.add('(min-width: 1024px)', () => {
      const rows = sectionEl!.querySelectorAll('.comparison-row')
      if (rows.length > 0) {
        gsap.set(rows, { autoAlpha: 0, y: 20 })

        ScrollTrigger.batch('.comparison-row', {
          onEnter: (batch: Element[]) => {
            trackTween(
              gsap.to(batch, {
                y: 0,
                autoAlpha: 1,
                stagger: 0.05,
                duration: 0.6,
                ease: 'back.out(1.7)'
              })
            )
          },
          start: 'top 90%',
          once: true
        })
      }

      /* Featured column glow intensification on scroll.
       * Uses hex rgba for the glow color (teal-500 = #14b8a6) to
       * avoid GSAP's inability to parse oklch values from theme(). */
      const tableEl = sectionEl!.querySelector('table')
      const glowCells = sectionEl!.querySelectorAll('.featured-column-cell')
      if (tableEl && glowCells.length > 0) {
        trackTween(
          gsap.to(glowCells, {
            scrollTrigger: {
              trigger: tableEl,
              start: 'top 80%',
              end: 'bottom 40%',
              scrub: true
            },
            boxShadow: '-4px 0 16px -2px rgba(20, 184, 166, 0.25), 4px 0 16px -2px rgba(20, 184, 166, 0.25)',
            ease: 'none'
          })
        )
      }

      return () => {
        // matchMedia revert callback — ScrollTrigger cleans up automatically
      }
    })

    /* ═══ MOBILE: Card batch reveals ═════════════════════════ */
    mm.add('(max-width: 1023px)', () => {
      const cards = sectionEl!.querySelectorAll('.comparison-mobile-card')
      if (cards.length > 0) {
        gsap.set(cards, { autoAlpha: 0, y: 30 })

        ScrollTrigger.batch('.comparison-mobile-card', {
          onEnter: (batch: Element[]) => {
            trackTween(
              gsap.to(batch, {
                y: 0,
                autoAlpha: 1,
                stagger: 0.08,
                duration: 0.7,
                ease: 'back.out(1.7)'
              })
            )
          },
          start: 'top 85%',
          once: true
        })
      }

      return () => {
        // matchMedia revert callback
      }
    })
  })

  onDestroy(() => {
    matchMediaInstance?.revert()
    for (const t of tweens) t.kill()
    for (const st of triggers) st.kill()
    tweens = []
    triggers = []
  })
</script>

<section id="comparison" class="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8" bind:this={sectionEl}>
  <div class="max-w-7xl mx-auto">
    <h2 use:revealHeading class="text-3xl sm:text-4xl font-bold text-center text-(--color-text)">
      Comparison To Other Services
    </h2>
    <p class="mt-4 text-center text-(--color-text-secondary) text-lg max-w-2xl mx-auto">
      See how we stack against others on the things that matter.
    </p>

    <!-- Desktop: full table -->
    <div class="mt-12 sm:mt-16 hidden lg:block overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr>
            <th class="p-4 text-sm font-medium text-(--color-text-secondary) border-b border-(--color-border)">
              Aspect
            </th>
            <th class="featured-column-header p-4 text-sm font-semibold text-(--color-text) rounded-t-lg">
              {us.name}
            </th>
            {#each competitors as comp (comp.name)}
              <th class="p-4 text-sm font-medium text-(--color-text-secondary) border-b border-(--color-border)">
                {comp.name}
              </th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each features as feature, i (feature.key)}
            <tr class="comparison-row">
              <td class="p-4 text-sm font-medium text-(--color-text) border-b border-(--color-border)">
                {feature.label}
              </td>
              <td class="featured-column-cell p-4 text-sm font-semibold text-(--color-text) border-b border-(--color-border) {i === features.length - 1 ? 'rounded-b-lg' : ''}">
                {@html us[feature.key]}
              </td>
              {#each competitors as comp (comp.name)}
                <td class="p-4 text-sm text-(--color-text-secondary) border-b border-(--color-border)">
                  {@html comp[feature.key]}
                </td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- Mobile: card-based comparison -->
    <div class="mt-12 sm:mt-16 lg:hidden space-y-6">
      <!-- Our card (highlighted) -->
      <div class="comparison-mobile-card featured-mobile-card card-elevated rounded-xl border-2 border-(--color-accent) p-6">
        <h3 class="text-lg font-bold text-(--color-text) mb-4">{us.name}</h3>
        <dl class="space-y-3">
          {#each features as feature (feature.key)}
            <div class="flex justify-between gap-4">
              <dt class="text-sm text-(--color-text-secondary) shrink-0">{feature.label}</dt>
              <dd class="text-sm font-semibold text-(--color-text) text-right">{@html us[feature.key]}</dd>
            </div>
          {/each}
        </dl>
      </div>

      <!-- Competitor cards -->
      {#each competitors as comp (comp.name)}
        <div class="comparison-mobile-card rounded-xl border border-(--color-border) bg-(--color-bg) p-6">
          <h3 class="text-lg font-medium text-(--color-text-secondary) mb-4">{comp.name}</h3>
          <dl class="space-y-3">
            {#each features as feature (feature.key)}
              <div class="flex justify-between gap-4">
                <dt class="text-sm text-(--color-text-secondary) shrink-0">{feature.label}</dt>
                <dd class="text-sm text-(--color-text-secondary) text-right">
                  <p>{@html comp[feature.key]}</p>
                </dd>
              </div>
            {/each}
          </dl>
        </div>
      {/each}
    </div>
    <div class="pt-6 pl-4 pr-2 border-l-2 border-(--color-accent) mt-4 text-(--color-text-secondary) text-sm italic">
      We're not a full-suite mailbox management tool — and that's by design. If something more feature-packed is what matters most to you, the options above might be a better fit for you. However, you should know that most of these extra features that our competitors have (automated bulk deletes, pre-filtering &amp; blacklists, rollups, auto-categorization, etc) are only possible when the service has direct access and write/delete permissions to your mailbox and its full content. That's exactly the reason we don't support many of these features. Our north star is simple: providing a solid, working solution while being the best at ensuring your data stays yours, no matter what.
    </div>
  </div>
</section>

<style>
  /* Desktop: featured column header with gradient + top accent */
  .featured-column-header {
    background: linear-gradient(
      to right,
      var(--color-accent-gradient-from),
      var(--color-accent-gradient-to)
    );
    border-top: 2px solid var(--color-accent);
  }

  /* Desktop: featured column body cells with subtle tint + shadow */
  .featured-column-cell {
    background-color: var(--color-accent-light);
    box-shadow:
      -4px 0 8px -4px var(--color-card-shadow),
       4px 0 8px -4px var(--color-card-shadow);
  }

  /* Mobile: our product card gradient background */
  .featured-mobile-card {
    background: linear-gradient(
      to bottom,
      var(--color-accent-gradient-from),
      var(--color-bg)
    );
  }
</style>
