<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { APP_URL } from '$lib/utilities/constants'
  import { loadGsap, prefersReducedMotion } from '$lib/utilities/gsap-utils'
  import DeviceScreenshot from '$lib/components/DeviceScreenshot.svelte'

  let h1El: HTMLHeadingElement | undefined = $state()
  let subtitleEl: HTMLParagraphElement | undefined = $state()
  let descriptionEl: HTMLParagraphElement | undefined = $state()
  let ctaEl: HTMLAnchorElement | undefined = $state()
  let ctaWrapperEl: HTMLDivElement | undefined = $state()
  let screenshotWrapperEl: HTMLDivElement | undefined = $state()
  let gradientBlobEl: HTMLDivElement | undefined = $state()
  let pricingNoteEl: HTMLParagraphElement | undefined = $state()

  let mainTimeline: { kill: () => void } | null = null
  let glowTween: { kill: () => void } | null = null
  let blobTween: { kill: () => void } | null = null
  let parallaxTween: { kill: () => void } | null = null
  let splitH1: { revert: () => void } | null = null
  let splitSubtitle: { revert: () => void } | null = null
  let matchMediaInstance: { revert: () => void } | null = null

  onMount(async () => {
    if (prefersReducedMotion()) return
    if (!h1El || !subtitleEl || !descriptionEl || !ctaEl || !screenshotWrapperEl || !gradientBlobEl) return

    const { gsap, SplitText, ScrollTrigger } = await loadGsap()

    // Guard: component may have been destroyed during the async import
    if (!h1El?.isConnected) return

    // Create SplitText instances — use 'words' for h1 to prevent
    // mid-word line breaks ("Unsubscriber" is too wide for char-level spans)
    splitH1 = SplitText.create(h1El, { type: 'words' })
    splitSubtitle = SplitText.create(subtitleEl, { type: 'words' })

    const h1Words = (splitH1 as any).words as HTMLElement[]
    const words = (splitSubtitle as any).words as HTMLElement[]

    // FOUC prevention: hide elements before timeline plays
    gsap.set(h1Words, { autoAlpha: 0, y: 80 })
    gsap.set(words, { autoAlpha: 0, y: 20 })
    gsap.set(descriptionEl, { autoAlpha: 0, y: 30 })
    gsap.set(ctaWrapperEl ?? ctaEl, { autoAlpha: 0, scale: 0.95 })
    if (pricingNoteEl) gsap.set(pricingNoteEl, { autoAlpha: 0, y: 15 })

    // Build main entrance timeline
    const tl = gsap.timeline()

    // 0.0s — h1 word reveal
    tl.to(h1Words, {
      y: 0,
      autoAlpha: 1,
      stagger: 0.12,
      duration: 0.8,
      ease: 'expo.out'
    }, 0)

    // 0.6s — subtitle word reveal
    tl.to(words, {
      y: 0,
      autoAlpha: 1,
      stagger: 0.05,
      duration: 0.6,
      ease: 'expo.out'
    }, 0.6)

    // 1.0s — description fade up
    tl.to(descriptionEl, {
      y: 0,
      autoAlpha: 1,
      duration: 0.8,
      ease: 'expo.out'
    }, 1.0)

    // 1.3s — CTA scale spring
    tl.to(ctaWrapperEl ?? ctaEl, {
      scale: 1,
      autoAlpha: 1,
      duration: 0.6,
      ease: 'back.out(1.7)'
    }, 1.3)

    // 1.5s — pricing note fade in
    if (pricingNoteEl) {
      tl.to(pricingNoteEl, {
        y: 0,
        autoAlpha: 1,
        duration: 0.5,
        ease: 'expo.out'
      }, 1.5)
    }

    mainTimeline = tl

    // CTA glow pulse (infinite, pronounced)
    // Use hex colors directly since GSAP cannot parse color-mix() or oklch
    // Layer the glow ON TOP of the existing base shadow so it doesn't replace it
    glowTween = gsap.fromTo(ctaEl,
      { boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)' },
      {
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1), 0 0 40px rgba(20, 184, 166, 0.4), 0 0 80px rgba(20, 184, 166, 0.15)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      }
    )

    // Gradient blob slow oscillation
    blobTween = gsap.to(gradientBlobEl, {
      opacity: 0.25,
      scale: 1.1,
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

    // DeviceScreenshot parallax (desktop only)
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px)', () => {
      if (!screenshotWrapperEl) return
      parallaxTween = gsap.fromTo(screenshotWrapperEl, {
        y: -60
      }, {
        y: 60,
        ease: 'none',
        scrollTrigger: {
          trigger: h1El?.closest('section'),
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })

      // Return cleanup for matchMedia context
      return () => {
        parallaxTween?.kill()
        parallaxTween = null
      }
    })
    matchMediaInstance = mm
  })

  onDestroy(() => {
    mainTimeline?.kill()
    glowTween?.kill()
    blobTween?.kill()
    parallaxTween?.kill()
    matchMediaInstance?.revert()
    splitH1?.revert()
    splitSubtitle?.revert()
  })
</script>

<section id="home" class="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">

  <!-- Gradient blob background -->
  <div bind:this={gradientBlobEl}
    class="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full pointer-events-none z-0"
    style="background: radial-gradient(circle, rgba(20, 184, 166, 0.5) 0%, transparent 70%); opacity: 0.15; filter: blur(40px);"
  ></div>

  <div class="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 py-12 lg:py-0">
    <!-- Left column: text content -->
    <div class="flex-1 text-center lg:text-left">
      <h1 bind:this={h1El} class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-(--color-text)">
        Email Unsubscriber
      </h1>

      <p bind:this={subtitleEl} class="mt-4 sm:mt-6 text-xl sm:text-2xl md:text-3xl font-medium text-(--color-primary)">
        Clean your inbox. For good.
      </p>

      <p bind:this={descriptionEl} class="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-(--color-text-secondary) max-w-2xl mx-auto lg:mx-0 leading-relaxed">
        Scan your inbox, find every subscription, and unsubscribe in few clicks.
        No ongoing fees. No data harvesting. Just a clean inbox.
      </p>

      <div bind:this={ctaWrapperEl} class="mt-8 sm:mt-10">
        <a
          bind:this={ctaEl}
          id="hero-cta"
          href={APP_URL}
          class="hero-cta-button inline-block px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg bg-(--color-accent) text-white hover:bg-(--color-accent-hover) transition-all duration-200"
        >
          Get Started
        </a>
      </div>

      <p bind:this={pricingNoteEl} class="mt-4 sm:mt-6 text-sm text-(--color-text-secondary)">
        No monthly or annual plans. Make a one-off payment for 30d of unlimited access. Done.
      </p>
    </div>

    <!-- Right column: product screenshot -->
    <div bind:this={screenshotWrapperEl} class="flex-1 w-full max-w-lg lg:max-w-none">
      <DeviceScreenshot feature="hero" alt="Email Unsubscriber app screenshot" />
    </div>
  </div>
</section>

<style>
  .hero-cta-button {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  }

  .hero-cta-button:hover {
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -4px rgba(0, 0, 0, 0.1),
      0 0 20px var(--color-accent-glow);
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-cta-button,
    .hero-cta-button:hover {
      transition: none !important;
    }
  }
</style>
