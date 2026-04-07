<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { reveal } from '$lib/utilities/scroll-reveal'
  import { loadGsap, prefersReducedMotion, revealHeading } from '$lib/utilities/gsap-utils'
  import { icons } from '$lib/icons'
  import type { Action } from 'svelte/action'

  // TODO: - Add CCPA Compliant
  // TODO: - Hook counter to backend to update dynamically (poll, webhook, socket, whatever's lightest)
  // TODO: - Add "give feedback/suggestions" to webapp (and here?) - if possible through PostHog's survey?, if easy enough - implement In-House form
  // TODO: - Hook feedback to this testimonials section

  const TARGET_COUNT = 12994
  const ANIMATION_DURATION = 2000

  let displayCount = $state(TARGET_COUNT)
  let hasAnimated = false

  function animateCount(reducedMotion: boolean) {
    if (hasAnimated || reducedMotion) return
    hasAnimated = true

    const start = performance.now()
    displayCount = 0

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / ANIMATION_DURATION, 1)
      // Ease-out cubic for natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3)
      displayCount = Math.round(eased * TARGET_COUNT)

      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    requestAnimationFrame(tick)
  }

  const observeCounter: Action = (node) => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          animateCount(false)
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

  const formattedCount = $derived(displayCount.toLocaleString('en-US'))

  // TODO: - Update when California compliant
  const trustBadges = [
    { label: 'GDPR Compliant', icon: icons.shieldCheck },
    { label: 'No Data Selling', icon: icons.ban },
    { label: 'Browser-Only Processing', icon: icons.monitor },
    { label: 'One-Off Payments', icon: icons.creditCard }
  ] as const

  // TODO: - Add testimonials once we have real user feedback (hook to PostHog survey or in-house form)
  // TODO: - Reach out to media outlets (TechCrunch, Product Hunt, Hacker News, The Verge, Trust Pilot) for featuring

  /* ---- GSAP domino entrance animation for trust badges ---- */
  let badgeScrollTriggers: { kill: () => void }[] = []

  onMount(() => {
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

<section id="trust" class="bg-(--color-bg-secondary) py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
  <div class="max-w-7xl mx-auto">
    <h2 use:revealHeading class="text-3xl sm:text-4xl font-bold text-center text-(--color-text)">
      Trusted by Many
    </h2>

    <!-- Animated Counter -->
    <div use:reveal use:observeCounter class="mt-10 sm:mt-12 text-center">
      <p class="text-4xl sm:text-5xl font-bold text-(--color-accent-text)">
        {formattedCount}
      </p>
      <p class="mt-2 text-(--color-text-secondary) text-lg">
        users have already decluttered their inboxes
      </p>
    </div>

    <!-- Trust Badges -->
    <div class="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      {#each trustBadges as badge (badge.label)}
        <div class="trust-badge group card-elevated flex flex-col items-center gap-3 p-4 sm:p-6 rounded-xl border border-(--color-border) bg-(--color-bg)">
          <div class="icon-glow w-10 h-10 flex items-center justify-center rounded-full">
            <span class="icon-hover-scale inline-block w-8 h-8 text-(--color-accent-text) [&>svg]:w-full [&>svg]:h-full">{@html badge.icon}</span>
          </div>
          <span class="text-sm font-medium text-(--color-text) text-center">{badge.label}</span>
        </div>
      {/each}
    </div>

  </div>
</section>
