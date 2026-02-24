<script lang="ts">
  import { onMount } from 'svelte'
  import { APP_URL } from '$lib/utilities/constants'
  import ThemeToggle from './ThemeToggle.svelte'

  const NAV_ITEMS = [
    { label: 'Home', href: '/#home' },
    { label: 'Why Us', href: '/#why' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Compare', href: '/#comparison' },
    { label: 'Trust', href: '/#trust' },
    { label: 'About', href: '/#about' }
  ] as const

  let scrolled = $state(false)
  let heroCTAVisible = $state(true)
  let activeSection = $state('home')
  let mobileMenuOpen = $state(false)
  let prefersReducedMotion = $state(false)

  function closeMobileMenu() {
    mobileMenuOpen = false
  }

  function handleNavClick() {
    closeMobileMenu()
  }

  function ctaIn(node: HTMLElement) {
    if (prefersReducedMotion) {
      return { duration: 0 }
    }
    return {
      duration: 300,
      css: (t: number) => {
        return `opacity: ${t}; transform: translateY(${-8 * (1 - t)}px) scale(${0.95 + 0.05 * t})`
      }
    }
  }

  function ctaOut(node: HTMLElement) {
    if (prefersReducedMotion) {
      return { duration: 0 }
    }
    return {
      duration: 200,
      css: (t: number) => {
        return `opacity: ${t}; transform: translateY(${-8 * (1 - t)}px) scale(${0.95 + 0.05 * t})`
      }
    }
  }

  onMount(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion = motionQuery.matches
    const onMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches
    }
    motionQuery.addEventListener('change', onMotionChange)

    // Resolve elements once for scroll-based tracking
    const ctaEl = document.getElementById('hero-cta')
    if (!ctaEl) {
      heroCTAVisible = false
    }

    const sectionEls = NAV_ITEMS.map((item) => item.href.split('#')[1])
      .filter(Boolean)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    // Sort by actual DOM position so scroll logic picks the correct section
    sectionEls.sort((a, b) => a.offsetTop - b.offsetTop)

    let lastSyncedSection = ''

    function onScroll() {
      // Header background toggle
      scrolled = window.scrollY > 80

      // Hero CTA visibility: show header CTA once hero CTA scrolls above viewport
      if (ctaEl) {
        const ctaRect = ctaEl.getBoundingClientRect()
        heroCTAVisible = ctaRect.bottom > 0
      }

      // Active section tracking:
      // Find the section whose top is closest to (but above) 30% of the viewport.
      // This replicates the rootMargin: '-20% 0px -60% 0px' observation band.
      const trigger = window.innerHeight * 0.3
      let current = sectionEls[0]?.id ?? 'home'

      for (const el of sectionEls) {
        if (el.getBoundingClientRect().top <= trigger) {
          current = el.id
        }
      }

      activeSection = current

      // Sync URL hash only when section actually changes
      if (current !== lastSyncedSection) {
        lastSyncedSection = current
        const hash = current === 'home' ? '' : current
        history.replaceState(null, '', hash ? '#' + hash : '/')
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      motionQuery.removeEventListener('change', onMotionChange)
    }
  })
</script>

<header
  class="sticky top-0 z-50 header-base"
  class:header-scrolled={scrolled}
>
  <nav class="flex md:grid md:grid-cols-[1fr_auto_1fr] items-center justify-between h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Left: Logo -->
    <div class="flex items-center">
      <a
        href="/"
        class="text-lg font-bold text-(--color-text) hover:text-(--color-primary) transition-colors"
      >
        Email Unsubscriber
      </a>
    </div>

    <!-- Center: Nav links (desktop only, always centered) -->
    <div class="hidden md:flex items-center justify-center gap-1">
      {#each NAV_ITEMS as item (item.href)}
        {@const id = item.href.split('#')[1]}
        {@const isActive = activeSection === id}
        <a
          href={item.href}
          class="px-3 py-2 text-sm font-medium rounded-md transition-colors {isActive ? 'text-(--color-text) font-semibold' : 'text-(--color-text-secondary) hover:text-(--color-text)'}"
        >
          {item.label}
        </a>
      {/each}
    </div>

    <!-- Right: CTA + Theme Toggle (desktop) -->
    <div class="hidden md:flex items-center justify-end gap-3">
      {#if !heroCTAVisible}
        <a
          href={APP_URL}
          class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-(--color-button-solid-bg) text-(--color-button-solid-fg) hover:bg-(--color-button-solid-bg-hover) transition-colors"
          in:ctaIn
          out:ctaOut
        >
          Go to App
        </a>
      {/if}
      <ThemeToggle />
    </div>

    <!-- Mobile right side: CTA + Theme Toggle + Hamburger -->
    <div class="flex md:hidden items-center justify-end gap-2">
      {#if !heroCTAVisible}
        <a
          href={APP_URL}
          class="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md bg-(--color-button-solid-bg) text-(--color-button-solid-fg) hover:bg-(--color-button-solid-bg-hover) transition-colors"
          in:ctaIn
          out:ctaOut
        >
          Open App
        </a>
      {/if}
      <ThemeToggle />
      <button
        onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileMenuOpen}
        class="relative w-8 h-8 flex items-center justify-center rounded-md text-(--color-text) hover:bg-(--color-button-ghost-bg-hover) transition-colors"
      >
        <span
          class="hamburger-line hamburger-line-1"
          class:hamburger-open={mobileMenuOpen}
        ></span>
        <span
          class="hamburger-line hamburger-line-2"
          class:hamburger-open={mobileMenuOpen}
        ></span>
        <span
          class="hamburger-line hamburger-line-3"
          class:hamburger-open={mobileMenuOpen}
        ></span>
      </button>
    </div>
  </nav>
</header>

<!-- Mobile menu overlay -->
{#if mobileMenuOpen}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 z-40 bg-(--color-bg)/95 backdrop-blur-md"
    onkeydown={(e) => e.key === 'Escape' && closeMobileMenu()}
  >
    <nav class="flex flex-col items-center justify-center h-full gap-6 pt-16">
      {#each NAV_ITEMS as item (item.href)}
        {@const id = item.href.split('#')[1]}
        {@const isActive = activeSection === id}
        <a
          href={item.href}
          onclick={handleNavClick}
          class="text-xl font-medium transition-colors {isActive ? 'text-(--color-text)' : 'text-(--color-text-secondary)'}"
        >
          {item.label}
        </a>
      {/each}
      <a
        href={APP_URL}
        class="mt-4 inline-flex items-center px-6 py-3 text-base font-medium rounded-lg bg-(--color-button-solid-bg) text-(--color-button-solid-fg) hover:bg-(--color-button-solid-bg-hover) transition-colors"
      >
        Get Started
      </a>
    </nav>
  </div>
{/if}

<style>
  /* Header always visible — smooth transition for background/border on scroll */
  .header-base {
    background: transparent;
    border-bottom: 1px solid transparent;
    transition: background-color 300ms ease, border-color 300ms ease, backdrop-filter 300ms ease, -webkit-backdrop-filter 300ms ease;
  }

  .header-scrolled {
    background: color-mix(in srgb, var(--color-bg) 80%, transparent);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom-color: var(--color-border);
  }

  @media (prefers-reduced-motion: reduce) {
    .header-base {
      transition: none;
    }
  }

  /* Hamburger icon lines */
  .hamburger-line {
    position: absolute;
    width: 18px;
    height: 2px;
    background: currentColor;
    transition: transform 200ms ease, opacity 200ms ease;
    border-radius: 1px;
  }

  .hamburger-line-1 {
    transform: translateY(-5px);
  }

  .hamburger-line-2 {
    transform: translateY(0);
  }

  .hamburger-line-3 {
    transform: translateY(5px);
  }

  .hamburger-line-1.hamburger-open {
    transform: rotate(45deg);
  }

  .hamburger-line-2.hamburger-open {
    opacity: 0;
  }

  .hamburger-line-3.hamburger-open {
    transform: rotate(-45deg);
  }
</style>
