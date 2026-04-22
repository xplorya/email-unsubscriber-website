<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { loadGsap, prefersReducedMotion, revealHeading } from '$lib/utilities/gsap-utils'
  import { icons } from '$lib/icons'
  import FootnoteExpander from '$lib/components/FootnoteExpander.svelte'
  import FeatureCarousel from '$lib/components/FeatureCarousel.svelte'

  const steps = [
    {
      number: 1,
      title: 'Authenticate',
      description:
        'Sign in securely with Google or Microsoft. We use read-only access — no stored passwords, no persistent tokens.',
      icon: icons.authenticate
    },
    {
      number: 2,
      title: 'Scan',
      description:
        'Your inbox is scanned and processed locally, entirely in your browser. No email content ever leaves your device.',
      icon: icons.search
    },
    {
      number: 3,
      title: 'Unsubscribe',
      description:
        "Review the list and unsubscribe from what you don't want. One click per subscription. That's it.",
      icon: icons.mailUnsubscribe
    }
  ] as const

  const featurePages = [
    {
      icon: icons.scan,
      title: 'Email Scanning',
      description: 'Connect your email and scan for subscriptions across your inbox.',
      screenshotFeature: 'email-scanning'
    },
    {
      icon: icons.clock,
      title: 'Scan Periods',
      description: 'Choose how far back to scan — recent emails or your entire inbox history.',
      screenshotFeature: 'scan-periods'
    },
    {
      icon: icons.list,
      title: 'Results List',
      description: 'See all discovered subscriptions organized in a clear, sortable list.',
      screenshotFeature: 'results-list'
    },
    {
      icon: icons.lightbulb,
      title: 'Smart Insights',
      description: "Understand each subscription's frequency, sender info, and relevance.",
      screenshotFeature: 'smart-insights'
    },
    {
      icon: icons.mailX,
      title: 'Unsubscribe Actions',
      description: 'One-tap unsubscribe from unwanted emails — we handle the process.',
      screenshotFeature: 'unsubscribe-actions'
    },
    {
      icon: icons.filter,
      title: 'Filtered View',
      description: 'Filter and sort your results to focus on what matters most.',
      screenshotFeature: 'filtered-view'
    },
    {
      icon: icons.history,
      title: 'History & Records',
      description: 'Track all your past unsubscribe actions in your profile.',
      screenshotFeature: 'history-records'
    },
    {
      icon: icons.trash,
      title: 'Account Erasing',
      description: 'GDPR-compliant full account deletion — your data, your control.',
      screenshotFeature: 'account-erasing'
    }
  ]

  /* ── Element refs ───────────────────────────────────────── */
  let sectionEl: HTMLElement | undefined = $state()
  let subtitleEl: HTMLParagraphElement | undefined = $state()
  let progressFillEl: HTMLDivElement | undefined = $state()

  // Per-step refs (3 each)
  let iconEls: HTMLDivElement[] = $state([])
  let titleEls: HTMLHeadingElement[] = $state([])
  let descEls: HTMLParagraphElement[] = $state([])
  let badgeEls: HTMLSpanElement[] = $state([])

  // Connector wrapper refs (2 connectors between 3 steps — desktop + mobile)
  let hConnectorEls: HTMLDivElement[] = $state([])
  let vConnectorEls: HTMLDivElement[] = $state([])

  /* ── Cleanup handles ────────────────────────────────────── */
  let timeline: { kill: () => void } | null = null
  let splitInstances: Array<{ revert: () => void }> = []

  onMount(async () => {
    if (prefersReducedMotion()) return

    const { gsap, SplitText, ScrollTrigger } = await loadGsap()

    // Guard: component may have unmounted during async import
    if (!sectionEl?.isConnected) return

    // Collect all animatable elements
    const allIcons = iconEls.filter(Boolean)
    const allTitles = titleEls.filter(Boolean)
    const allDescs = descEls.filter(Boolean)
    const allBadges = badgeEls.filter(Boolean)
    const allHConnectors = hConnectorEls.filter(Boolean)
    const allVConnectors = vConnectorEls.filter(Boolean)

    // ── Set initial hidden states BEFORE ScrollTrigger creation ──
    gsap.set(allIcons, { scale: 0, autoAlpha: 0 })
    gsap.set(allBadges, { scale: 0, autoAlpha: 0 })
    gsap.set(allDescs, { autoAlpha: 0 })
    gsap.set(allHConnectors, { scaleX: 0, autoAlpha: 0, transformOrigin: 'left center' })
    gsap.set(allVConnectors, { scaleY: 0, autoAlpha: 0, transformOrigin: 'top center' })
    if (subtitleEl) gsap.set(subtitleEl, { autoAlpha: 0, y: 20 })
    if (progressFillEl) gsap.set(progressFillEl, { scaleX: 0, transformOrigin: 'left center' })

    // ── Create SplitText instances for each title ──
    const splits = allTitles.map((titleEl) => {
      const split = SplitText.create(titleEl, { type: 'words,chars' })
      splitInstances.push(split)
      // Hide chars initially
      gsap.set(split.chars, { autoAlpha: 0 })
      return split
    })

    // ── Build the timeline ──
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionEl,
        start: 'top 75%',
        once: true
      }
    })

    timeline = tl

    // Subtitle fade in first
    if (subtitleEl) {
      tl.to(subtitleEl, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'expo.out' }, 0)
    }

    // ── Animate each step sequentially ──
    for (let i = 0; i < 3; i++) {
      const icon = allIcons[i]
      const split = splits[i]
      const desc = allDescs[i]
      const badge = allBadges[i]
      const hConnector = allHConnectors[i]
      const vConnector = allVConnectors[i]
      const progressTarget = (i + 1) / 3

      // Use a label for each step
      const stepLabel = `step${i}`

      // Step 1 starts at 0.3 (after subtitle begins), subsequent steps chain after previous connector
      if (i === 0) {
        tl.addLabel(stepLabel, 1)
      }

      // 1. Icon appears — elastic scale
      if (icon) {
        tl.to(
          icon,
          { scale: 1, autoAlpha: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)' },
          stepLabel
        )
      }

      // 2. Title chars stagger in (0.2s after icon starts, i.e. overlapping)
      if (split?.chars?.length) {
        tl.to(
          split.chars,
          { y: 0, autoAlpha: 1, stagger: 0.02, duration: 0.5, ease: 'expo.out' },
          `${stepLabel}+=0.2`
        )
      }

      // 3. Description fades up (0.1s after title starts)
      if (desc) {
        tl.to(
          desc,
          { autoAlpha: 1, y: 0, duration: 0.6, ease: 'expo.out' },
          `${stepLabel}+=0.6`
        )
      }

      // 4. Badge pops in (0.5s after title/desc started = stepLabel+1.0)
      if (badge) {
        tl.to(
          badge,
          { scale: 1, autoAlpha: 1, duration: 0.4, ease: 'back.out(2)' },
          `${stepLabel}+=1.0`
        )
      }

      // 5. Progress bar fills to current step fraction
      if (progressFillEl) {
        tl.to(
          progressFillEl,
          {
            scaleX: progressTarget,
            duration: 0.6,
            ease: 'power2.inOut'
          },
          `${stepLabel}+=1.0`
        )
      }

      // 6. Connector arrow reveals (only between steps, not after the last)
      if (i < 2) {
        const connectorStart = `${stepLabel}+=1.2`

        // Horizontal connector (visible on desktop via CSS)
        if (hConnector) {
          tl.to(
            hConnector,
            { scaleX: 1, autoAlpha: 1, duration: 0.5, ease: 'power2.out' },
            connectorStart
          )
        }

        // Vertical connector (visible on mobile via CSS)
        if (vConnector) {
          tl.to(
            vConnector,
            { scaleY: 1, autoAlpha: 1, duration: 0.5, ease: 'power2.out' },
            connectorStart
          )
        }

        // Next step starts after connector finishes
        tl.addLabel(`step${i + 1}`, `${connectorStart}+=0.4`)
      }
    }
  })

  onDestroy(() => {
    timeline?.kill()
    splitInstances.forEach((s) => s.revert())
    splitInstances = []
  })
</script>

<section id="how-it-works" bind:this={sectionEl} class="min-h-screen">
  <div
    class="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24"
  >
    <div class="max-w-7xl mx-auto w-full pt-12">
      <h2 use:revealHeading class="text-3xl sm:text-4xl font-bold text-center text-(--color-text)">
        How It Works
      </h2>
      <p
        bind:this={subtitleEl}
        class="mt-4 text-center text-(--color-text-secondary) text-lg max-w-2xl mx-auto"
      >
        Easy as 1, 2, 3.
      </p>

      <!-- Steps area -->
      <div class="relative mt-12 sm:mt-16">
        <!-- Progress bar track (desktop only) -->
<!--        <div-->
<!--          class="hidden md:block absolute top-0 left-0 right-0 h-[3px] rounded-full bg-(&#45;&#45;color-border) overflow-hidden"-->
<!--        >-->
<!--          <div-->
<!--            bind:this={progressFillEl}-->
<!--            class="absolute inset-0 bg-(&#45;&#45;color-accent)"-->
<!--            style="transform: scaleX(0); transform-origin: left center;"-->
<!--          ></div>-->
<!--        </div>-->

        <div
          class="md:pt-12 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0"
        >
          {#each steps as step, i (step.number)}
            <div
              class="step-card group flex flex-col items-center text-center max-w-xs md:max-w-70 lg:max-w-sm"
            >
              <div class="relative">
                <div
                  bind:this={iconEls[i]}
                  class="icon-glow w-16 h-16 rounded-full border-2 border-(--color-accent-border) flex items-center justify-center bg-(--color-accent-light)"
                >
                  <span
                    class="inline-block w-7 h-7 text-(--color-accent-text) [&>svg]:w-full [&>svg]:h-full"
                  >{@html step.icon}</span>
                </div>
                <span
                  bind:this={badgeEls[i]}
                  class="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-(--color-accent) text-white text-sm font-bold flex items-center justify-center shadow-sm"
                >
                  {step.number}
                </span>
              </div>

              <h3
                bind:this={titleEls[i]}
                class="mt-6 text-xl font-semibold text-(--color-text)"
              >
                {step.title}
              </h3>
              <p
                bind:this={descEls[i]}
                class="mt-3 text-(--color-text-secondary) leading-relaxed max-w-sm"
              >
                {step.description}
              </p>
            </div>

            {#if i < steps.length - 1}
              <!-- Horizontal connector (desktop) -->
              <div
                bind:this={hConnectorEls[i]}
                class="hidden md:flex items-center justify-center my-0 mx-4 lg:mx-8 shrink-0"
                aria-hidden="true"
              >
                <svg
                  width="48"
                  height="16"
                  viewBox="0 0 48 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="0"
                    y1="8"
                    x2="38"
                    y2="8"
                    stroke="var(--color-connector-accent)"
                    stroke-width="2"
                    stroke-dasharray="6 4"
                    stroke-linecap="round"
                  />
                  <polygon
                    points="36,3 46,8 36,13"
                    fill="var(--color-connector-accent)"
                  />
                </svg>
              </div>

              <!-- Vertical connector (mobile) -->
              <div
                bind:this={vConnectorEls[i]}
                class="flex md:hidden items-center justify-center my-2 shrink-0"
                aria-hidden="true"
              >
                <svg
                  width="16"
                  height="48"
                  viewBox="0 0 16 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="8"
                    y1="0"
                    x2="8"
                    y2="38"
                    stroke="var(--color-connector-accent)"
                    stroke-width="2"
                    stroke-dasharray="6 4"
                    stroke-linecap="round"
                  />
                  <polygon
                    points="3,36 8,46 13,36"
                    fill="var(--color-connector-accent)"
                  />
                </svg>
              </div>
            {/if}
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- FootnoteExpander stays in normal document flow -->
  <div class="px-4 mt-20 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <FootnoteExpander
        id="features-detail"
        triggerText="Explore all features in detail — tap to expand"
      >
        <FeatureCarousel pages={featurePages} />
        <p class="mt-6 text-center text-sm text-(--color-text-secondary)/50">
          <span
            class="inline-flex items-center gap-1.5 cursor-not-allowed"
            title="Coming soon"
          >
            <span class="w-4 h-4 [&>svg]:w-full [&>svg]:h-full">{@html icons.eye}</span>
            See onboarding guide
            <span
              class="text-xs px-1.5 py-0.5 rounded bg-(--color-bg-secondary-solid) border border-(--color-border)"
              >Coming soon</span
            >
          </span>
        </p>
      </FootnoteExpander>
    </div>
  </div>
</section>
