<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { reveal } from '$lib/utilities/scroll-reveal'
  import { loadGsap, prefersReducedMotion, revealHeading } from '$lib/utilities/gsap-utils'
  import { icons } from '$lib/icons'
  import { fetchStats, FLOOR_STATS } from '$lib/utilities/stats'
  import { formatCount } from '$lib/utilities/format-count'
  import type { Action } from 'svelte/action'

  // TODO: - Add "give feedback/suggestions" to webapp (and here?) - if possible through PostHog's survey?, if easy enough - implement In-House form
  // TODO: - Hook feedback to this testimonials section

  const ANIMATION_DURATION = 2000

  // Currently displayed values (driven by rAF during animation) — seeded to floor
  // values exported from `stats.ts` so initial paint + fetch fallback stay in sync.
  let usersCount = $state(FLOOR_STATS.lifetime_users)
  let scansCount = $state(FLOOR_STATS.lifetime_scans)

  // Animation targets — replaced after fetchStats() resolves.
  let targetUsers = FLOOR_STATS.lifetime_users
  let targetScans = FLOOR_STATS.lifetime_scans

  let hasAnimated = false

  const formattedUsers = $derived(usersCount.toLocaleString('en-US'))
  const formattedScans = $derived(formatCount(scansCount))

  function runCounterAnimation(reducedMotion: boolean) {
    if (hasAnimated || reducedMotion) return
    hasAnimated = true

    const startUsers = 0
    const startScans = 0
    const start = performance.now()

    usersCount = startUsers
    scansCount = startScans

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / ANIMATION_DURATION, 1)
      // Ease-out cubic for natural deceleration.
      const eased = 1 - Math.pow(1 - progress, 3)
      usersCount = Math.round(startUsers + eased * (targetUsers - startUsers))
      scansCount = Math.round(startScans + eased * (targetScans - startScans))

      if (progress < 1) {
        requestAnimationFrame(tick)
      } else {
        usersCount = targetUsers
        scansCount = targetScans
      }
    }

    requestAnimationFrame(tick)
  }

  const observeCounter: Action = (node) => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion) {
      // Static render at floor; fetch may raise to real numbers without animating.
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          runCounterAnimation(false)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(node)

    return {
      destroy() {
        observer.disconnect()
      }
    }
  }

  const trustBadges = [
    { label: 'GDPR Compliant', icon: icons.gdprBadge },
    { label: 'No Data Selling', icon: icons.noDataSellingIcon },
    { label: 'Browser-Only Processing', icon: icons.monitor },
    { label: 'One-Off Payments', icon: icons.creditCard },
    { label: 'CCPA Compliant', icon: icons.shieldCheck }
  ] as const

  // GDPR badge: 12 stars equally spaced (30° apart) on a circle.
  // start at the top (-90 °), go clockwise.
  const GDPR_STAR_COUNT = 12
  const gdprStarAngles = Array.from(
    { length: GDPR_STAR_COUNT },
    (_, i) => i * (360 / GDPR_STAR_COUNT) - 90
  )

  // TODO: - Add testimonials once we have real user feedback (hook to PostHog survey or in-house form)
  // TODO: - Reach out to media outlets (TechCrunch, Product Hunt, Hacker News, The Verge, Trust Pilot) for featuring

  /* ---- GSAP domino entrance animation for trust badges ---- */
  let badgeScrollTriggers: { kill: () => void }[] = []

  onMount(() => {
    // Fetch live stats (browser-only). On failure returns floors silently.
    fetchStats().then((stats) => {
      targetUsers = stats.lifetime_users
      targetScans = stats.lifetime_scans

      // If animation already played (element was in view during first paint),
      // snap to the fresh target values. If not yet animated, the IntersectionObserver
      // trigger will pick up the new targets when it fires.
      if (hasAnimated) {
        usersCount = targetUsers
        scansCount = targetScans
      } else if (prefersReducedMotion()) {
        // Reduced motion: no animation; reflect real numbers immediately.
        usersCount = targetUsers
        scansCount = targetScans
      }
    })

    // No reduced-motion bailout needed — badges are visible by default in HTML.
    // If GSAP never loads (or reduced motion is on), badges stay naturally visible.
    if (prefersReducedMotion()) return

    loadGsap().then(({ gsap, ScrollTrigger }) => {
      // GSAP loaded successfully — NOW hide badges and set up the entrance animation.
      // This ordering guarantees: no GSAP = badges stay visible; GSAP = animated entrance.
      gsap.set('.trust-badge', { autoAlpha: 0, y: 60, rotation: -6 })

      ScrollTrigger.batch('.trust-badge', {
        onEnter: (batch: Element[]) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            rotation: 0,
            stagger: 0.12,
            duration: 0.9,
            ease: 'back.out(1.7)'
          })
        },
        start: 'top 88%',
        once: true
      })

      // Collect ScrollTrigger instances for trust badges so we can clean up on destroy
      badgeScrollTriggers = ScrollTrigger.getAll().filter((st: any) => {
        const trigger = st.trigger
        return trigger instanceof HTMLElement && trigger.classList.contains('trust-badge')
      })
    })
  })

  onDestroy(() => {
    for (const st of badgeScrollTriggers) {
      st.kill()
    }
    badgeScrollTriggers = []
  })
</script>

<!-- GDPR Compliant: custom layout (EU-flag circle of stars + keyhole lock + 2-line label + verification rosette) -->
{#snippet gdprCard()}
  <div
    class="trust-badge group card-elevated relative flex items-center justify-start gap-3 p-4 sm:p-6 rounded-xl border border-(--color-border) bg-(--color-bg) overflow-hidden">
    <!-- Stars-in-a-circle + centered lock ensemble -->
    <div class="relative shrink-0 w-19 h-19">
      {#each gdprStarAngles as angle, i (i)}
        <span
          class="absolute top-1/2 left-1/2 inline-block w-2.5 h-2.5 text-(--color-accent-text) [&>svg]:w-full [&>svg]:h-full [&>svg_path]:fill-current"
          style="transform: translate(-50%, -50%) rotate({angle}deg) translateY(-30px) rotate({-angle}deg);"
          aria-hidden="true"
        >
          {@html icons.lucideStar}
        </span>
      {/each}
      <span
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-block w-7 h-7 text-(--color-accent-text) [&>svg]:w-full [&>svg]:h-full"
        aria-hidden="true"
      >
                {@html icons.lucideLockKeyhole}
              </span>
    </div>

    <!-- Text block with top-right rosette; w-max so "Compliant" sets column width -->
    <div class="flex flex-col w-max">
      <div class="flex items-center justify-between gap-2">
        <span class="text-l font-medium text-(--color-text) leading-tight">GDPR</span>
      </div>
      <span class="text-l font-medium text-(--color-text) leading-tight">Compliant</span>
    </div>
<!--    <span class="absolute right-4 top-4 icon-hover-scale inline-block w-10 h-10 text-(&#45;&#45;color-accent-text) shrink-0 [&>svg]:w-full [&>svg]:h-full" aria-hidden="true">-->
<!--      {@html icons.ribbon}-->
<!--    </span>-->
  </div>
{/snippet}

{#snippet ccpaCompliantCard()}
  <div
    class="trust-badge group card-elevated relative flex items-center justify-start gap-3 p-4 sm:p-6 rounded-xl border border-(--color-border) bg-(--color-bg) overflow-hidden">
    <!-- Stars-in-a-circle + centered lock ensemble -->
    <span class="shrink-0 w-19 h-19 text-(--color-accent-text) [&>svg]:w-full [&>svg]:h-full">{@html icons.ccpaBadge}</span>

    <!-- Text block with top-right rosette; w-max so "Compliant" sets column width -->
    <div class="flex flex-col w-max">
      <div class="flex items-center justify-between gap-2">
        <span class="text-l font-medium text-(--color-text) leading-tight">CCPA</span>
      </div>
      <span class="text-l font-medium text-(--color-text) leading-tight">Compliant</span>
    </div>
<!--    <span class="absolute right-4 top-4 icon-hover-scale inline-block w-10 h-10 text-(&#45;&#45;color-accent-text) shrink-0 [&>svg]:w-full [&>svg]:h-full" aria-hidden="true">-->
<!--      {@html icons.ribbon}-->
<!--    </span>-->
  </div>
{/snippet}

{#snippet casaVerifiedCard()}
  <div
    class="trust-badge group card-elevated relative flex items-center justify-start gap-3 p-4 sm:p-6 rounded-xl border border-(--color-border) bg-(--color-bg) overflow-hidden">
    <!-- Stars-in-a-circle + centered lock ensemble -->
    <span class="inline-block shrink-0 w-19 h-19 text-(--color-accent-text) [&>svg]:w-full [&>svg]:h-full">{@html icons.casaVerifiedBadge}</span>

    <!-- Text block with top-right rosette; w-max so "Compliant" sets column width -->
    <div class="flex flex-col w-max">
      <div class="flex items-center justify-between gap-2">
        <span class="text-l font-medium text-(--color-text) leading-tight">ADA CASA T2</span>

      </div>
      <span class="text-l font-medium text-(--color-text) leading-tight">Validated</span>
    </div>
    <span class="absolute right-4 top-4 icon-hover-scale inline-block w-10 h-10 text-(--color-accent-text) shrink-0 [&>svg]:w-full [&>svg]:h-full" aria-hidden="true">
      {@html icons.ribbon}
    </span>
  </div>
{/snippet}

{#snippet noDataSellingCard()}
  <div
    class="trust-badge group card-elevated relative flex items-center justify-start gap-3 p-4 sm:p-6 rounded-xl border border-(--color-border) bg-(--color-bg) overflow-hidden">
    <!-- Stars-in-a-circle + centered lock ensemble -->
    <span class="inline-block shrink-0 w-19 h-19 text-(--color-accent-text) [&>svg]:w-full [&>svg]:h-full">{@html icons.noDataSellingIcon}</span>

    <!-- Text block with top-right rosette; w-max so "Compliant" sets column width -->
    <div class="flex flex-col w-max">
      <div class="flex items-center justify-between gap-2">
        <span class="text-l font-medium text-(--color-text) leading-tight">No-Data-Selling</span>
      </div>
      <span class="text-l font-medium text-(--color-text) leading-tight">Commitment</span>
    </div>
<!--    <span class="absolute right-4 top-4 icon-hover-scale inline-block w-10 h-10 text-(&#45;&#45;color-accent-text) shrink-0 [&>svg]:w-full [&>svg]:h-full" aria-hidden="true">-->
<!--      {@html icons.ribbon}-->
<!--    </span>-->
  </div>
{/snippet}

<section id="trust" class="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
  <div class="max-w-7xl mx-auto">
    <h2 use:revealHeading class="text-3xl sm:text-4xl font-bold text-center text-(--color-text)">
      Trusted by Many
    </h2>

    <!-- Animated Lifetime Usage Stats -->
    <div
      use:reveal
      use:observeCounter
      class="mt-10 sm:mt-12 text-center"
      aria-label="{usersCount}+ users have performed {scansCount}+ scans"
    >
      <!-- Desktop: single inline sentence. Mobile: 3-line stack via hidden <br>. -->
      <div class="text-lg text-(--color-text-secondary) leading-tight">
        <span>Join the club of</span>
        <span class="text-3xl sm:text-4xl lg:text-5xl font-bold text-(--color-accent-text)">
          {formattedUsers}
        </span>
        <span> users who have</span>
        <div>
          <span>performed</span>
          <span class="text-2xl sm:text-3xl lg:text-4xl font-bold text-(--color-accent-text)">
          {formattedScans}
        </span>
          <span> scans so far</span>
        </div>

      </div>
    </div>

    <!-- Trust Badges -->
    <div class="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {@render casaVerifiedCard()}
      {@render gdprCard()}
      {@render ccpaCompliantCard()}
      {@render noDataSellingCard()}
    </div>

  </div>
</section>
