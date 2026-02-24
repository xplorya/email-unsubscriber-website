<script lang="ts">
  import { reveal, revealStaggered } from '$lib/utilities/scroll-reveal'
  import type { Action } from 'svelte/action'

  const TARGET_COUNT = 2754
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

  const trustBadges = [
    { label: 'GDPR Compliant', icon: 'shield-check' },
    { label: 'No Data Selling', icon: 'ban' },
    { label: 'Browser-Only Processing', icon: 'browser' },
    { label: 'One-Time Payment', icon: 'credit-card' }
  ] as const

  const testimonials = [
    {
      quote: "Finally, an unsubscribe tool I actually trust. No creepy email reading, and I only paid once.",
      name: 'Sarah K.',
      role: 'Product Manager'
    },
    {
      quote: "I was skeptical, but the browser-only approach sold me. Cleaned up 200+ subscriptions in minutes.",
      name: 'Marcus T.',
      role: 'Software Engineer'
    },
    {
      quote: "No subscription? No data selling? Take my money. Best purchase I've ever made for productivity.",
      name: 'Priya R.',
      role: 'Freelance Designer'
    }
  ]

  const mediaLogos = ['TechCrunch', 'Product Hunt', 'Hacker News', 'The Verge']
</script>

<section id="trust" class="bg-(--color-bg-secondary) py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
  <div use:reveal class="max-w-7xl mx-auto">
    <h2 class="text-3xl sm:text-4xl font-bold text-center text-(--color-text)">
      Trusted by Thousands
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
            {#if badge.icon === 'shield-check'}
              <svg class="w-8 h-8 text-(--color-primary)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <polyline points="9 12 11 14 15 10"/>
              </svg>
            {:else if badge.icon === 'ban'}
              <svg class="w-8 h-8 text-(--color-primary)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
              </svg>
            {:else if badge.icon === 'browser'}
              <svg class="w-8 h-8 text-(--color-primary)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            {:else}
              <svg class="w-8 h-8 text-(--color-primary)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                <line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
            {/if}
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
      <p class="text-center text-sm text-(--color-text-secondary) mb-6">As seen in</p>
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
