<script lang="ts">
  import { reveal, revealStaggered } from '$lib/utilities/scroll-reveal'
  import { icons } from '$lib/icons'
  import type { Action } from 'svelte/action'

  // TODO: - Add CCPA Compliant
  // TODO: - Hook counter to backend to update dynamically (poll, webhook, socket, whatever's lightest)
  // TODO: - Add "give feedback/suggestions" to webapp (and here?) - if possible through PostHog's survey?, if easy enough - implement In-House form
  // TODO: - Hook feedback to this testimonials section

  const TARGET_COUNT = 182
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

  const testimonials = [
    // {
    //   quote: "Finally, an unsubscribe tool I actually trust. No creepy email reading, and I only paid once.",
    //   name: 'Sarah K.',
    //   role: 'Product Manager'
    // },
    // {
    //   quote: "I was skeptical, but the browser-only approach sold me. Cleaned up 200+ subscriptions in minutes.",
    //   name: 'Marcus T.',
    //   role: 'Software Engineer'
    // },
    // {
    //   quote: "No subscription? No data selling? Take my money. Best purchase I've ever made for productivity.",
    //   name: 'Priya R.',
    //   role: 'Freelance Designer'
    // }
  ]

  // TODO: - Quite importaint: Reach out to these to ask for featuring
  // const mediaLogos = ['TechCrunch', 'Product Hunt', 'Hacker News', 'The Verge', "Trust Pilot"]
  const mediaLogos: string[] = []
</script>

<section id="trust" class="bg-(--color-bg-secondary) py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
  <div use:reveal class="max-w-7xl mx-auto">
    <h2 class="text-3xl sm:text-4xl font-bold text-center text-(--color-text)">
      Trusted by Many
    </h2>

    <!-- Animated Counter -->
    <div use:observeCounter class="mt-10 sm:mt-12 text-center">
      <p class="text-4xl sm:text-5xl font-bold text-(--color-text)">
        {formattedCount}
      </p>
      <p class="mt-2 text-(--color-text-secondary) text-lg">
        users have already decluttered their inboxes
      </p>
    </div>

    <!-- Trust Badges -->
    <div class="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      {#each trustBadges as badge (badge.label)}
        <div class="flex flex-col items-center gap-3 p-4 sm:p-6 rounded-xl border border-(--color-border) bg-(--color-bg)">
          <div class="w-10 h-10 flex items-center justify-center">
            <span class="inline-block w-8 h-8 text-(--color-primary) [&>svg]:w-full [&>svg]:h-full">{@html badge.icon}</span>
          </div>
          <span class="text-sm font-medium text-(--color-text) text-center">{badge.label}</span>
        </div>
      {/each}
    </div>

    <!-- Testimonials -->
    <div class="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      {#each testimonials as testimonial, i (testimonial.name)}
        <blockquote use:revealStaggered={{ delay: i * 100 }} class="p-6 sm:p-8 rounded-xl border border-(--color-border) bg-(--color-bg)">
          <p class="text-(--color-text) leading-relaxed italic">
            "{testimonial.quote}"
          </p>
          <footer class="mt-4 flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-(--color-bg-secondary) border border-(--color-border) flex items-center justify-center text-sm font-semibold text-(--color-primary)">
              {testimonial.name.charAt(0)}
            </div>
            <div>
              <p class="text-sm font-semibold text-(--color-text)">{testimonial.name}</p>
              <p class="text-sm text-(--color-text-secondary)">{testimonial.role}</p>
            </div>
          </footer>
        </blockquote>
      {/each}
    </div>

    <!-- Media Logos -->
    <div class="mt-12 sm:mt-16">
<!--      <p class="text-center text-sm text-(&#45;&#45;color-text-secondary) mb-6">As seen in</p>-->
      <div class="flex flex-wrap justify-center gap-6 sm:gap-10">
        {#each mediaLogos as logo (logo)}
          <div class="px-6 py-3 rounded-lg bg-(--color-bg) border border-(--color-border) text-sm font-medium text-(--color-text-secondary)/50">
            {logo}
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
