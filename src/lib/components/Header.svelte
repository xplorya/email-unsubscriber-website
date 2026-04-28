<script lang="ts">
  import { onMount } from 'svelte'
  import { replaceState } from '$app/navigation'
  import { APP_URL } from '$lib/utilities/constants'
  import { icons } from '$lib/icons'
  import ThemeToggle from './ThemeToggle.svelte'

  const NAV_ITEMS = [
    { label: 'Home', href: '/#home' },
    { label: 'Why Us', href: '/#why' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Compare', href: '/#comparison' },
    { label: 'Preview', href: '/#demo' },
    { label: 'Trust', href: '/#trust' },
    { label: 'About', href: '/#about' }
  ] as const

  let { hideNav = false }: { hideNav?: boolean } = $props()

  let scrolled = $state(false)
  // Default to `false` so the header CTA is rendered in SSR on every route
  // (blog routes have no #hero-cta, so they always need the header CTA;
  // homepage SSR also renders the CTA, then `onMount` flips it to `true`
  // once the hero CTA is confirmed in-viewport, causing the header CTA to
  // fade out via the transition). This avoids a FOUC where the CTA pops in
  // on hydrate.
  let heroCTAVisible = $state(false)
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

    // Resolve elements once for scroll-based tracking. On blog routes
    // (`hideNav=true`) there is no hero CTA to mirror and no nav sections to
    // scroll-spy — keep the header CTA visible and skip those observers.
    const ctaEl = hideNav ? null : document.getElementById('hero-cta')
    if (ctaEl) {
      // On the homepage, set the initial visibility based on whether the
      // hero CTA is currently in viewport — this flips the header CTA to
      // hidden if the user lands at the top of the page.
      heroCTAVisible = ctaEl.getBoundingClientRect().bottom > 0
    }

    const sectionEls = hideNav
      ? []
      : NAV_ITEMS.map((item) => item.href.split('#')[1])
          .filter(Boolean)
          .map((id) => document.getElementById(id))
          .filter((el): el is HTMLElement => el !== null)

    // Sort by actual DOM position so scroll logic picks the correct section
    sectionEls.sort((a, b) => a.offsetTop - b.offsetTop)

    let lastSyncedSection = ''

    function onScroll() {
      // Header background toggle
      scrolled = window.scrollY > 8

      // Hero CTA visibility: show header CTA once hero CTA scrolls above viewport
      if (ctaEl) {
        const ctaRect = ctaEl.getBoundingClientRect()
        heroCTAVisible = ctaRect.bottom > 0
      }

      // Active section tracking:
      // Find the section whose top is closest to (but above) 30% of the viewport.
      // This replicates the rootMargin: '-20% 0px -60% 0px' observation band.
      if (sectionEls.length === 0) return

      const trigger = window.innerHeight * 0.3
      let current = sectionEls[0]?.id ?? 'home'

      for (const el of sectionEls) {
        if (el.getBoundingClientRect().top <= trigger) {
          current = el.id
        }
      }

      activeSection = current

      // Sync URL hash only when section actually changes and only on the homepage
      const isHomePage = window.location.pathname === '/' || window.location.pathname === ''
      if (isHomePage && current !== lastSyncedSection) {
        lastSyncedSection = current
        const hash = current === 'home' ? '' : current
        replaceState(hash ? '#' + hash : '/', {})
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
  class="sticky top-0 z-50 header-base px-4 sm:px-6 lg:px-8"
  class:header-scrolled={scrolled}
>
  <nav class="flex min-[860px]:grid min-[860px]:grid-cols-[1fr_auto_1fr] items-center justify-between h-16 max-w-7xl mx-auto">
    <!-- Left: Logo -->
    <div class="flex items-center">
      <a
        href="/"
        aria-label="Email Unsubscriber home"
        class="flex items-center gap-2 text-lg font-bold text-(--color-text) hover:text-(--color-primary) transition-colors"
      >
        <span class="inline-block h-7 shrink-0 [&>svg]:h-full [&>svg]:w-auto" aria-hidden="true">{@html icons.logoMark}</span>
        <span class="whitespace-nowrap text-xs">Email<br>Unsubscriber</span>
      </a>
    </div>

    {#if !hideNav}
      <!-- Center: Nav links (desktop only, always centered) -->
      <div class="hidden min-[860px]:flex items-center justify-center gap-0.5">
        {#each NAV_ITEMS as item (item.href)}
          {@const id = item.href.split('#')[1]}
          {@const isActive = activeSection === id}
          <a
            href={item.href}
            data-nav-id={id}
            class="nav-link whitespace-nowrap px-2 py-2 text-sm rounded-md {isActive ? 'nav-link-active' : 'text-(--color-text-secondary) hover:text-(--color-text)'}"
          >
            {item.label}
          </a>
        {/each}
      </div>
    {:else}
      <!-- Placeholder keeps 3-track grid intact so right cluster lands in col 3. -->
      <div class="hidden min-[860px]:block" aria-hidden="true"></div>
    {/if}

    <!-- Right: CTA + Theme Toggle (desktop) -->
    <div class="hidden min-[860px]:flex items-center justify-end gap-2">
      {#if !heroCTAVisible}
        <a
          href={APP_URL}
          class="inline-flex items-center whitespace-nowrap px-3 py-1.5 text-xs font-medium rounded-lg bg-(--color-button-solid-bg) text-(--color-button-solid-fg) hover:bg-(--color-button-solid-bg-hover) transition-colors "
          in:ctaIn
          out:ctaOut
        >
          Go to App
        </a>
      {/if}
      <ThemeToggle />
    </div>

    <!-- Mobile right side: CTA + Theme Toggle + Hamburger -->
    <div class="flex min-[860px]:hidden items-center justify-end gap-2">
      {#if !heroCTAVisible}
        <a
          href={APP_URL}
          class="inline-flex items-center whitespace-nowrap px-3 py-1.5 text-xs font-medium rounded-md bg-(--color-button-solid-bg) text-(--color-button-solid-fg) hover:bg-(--color-button-solid-bg-hover) transition-colors"
          in:ctaIn
          out:ctaOut
        >
          Go to App
        </a>
      {/if}
      <ThemeToggle />
      {#if !hideNav}
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
      {/if}
    </div>
  </nav>
</header>

<!-- Mobile menu overlay -->
{#if mobileMenuOpen && !hideNav}
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
          class="text-xl font-medium transition-colors {isActive ? 'text-(--color-accent-text) font-semibold' : 'text-(--color-text-secondary)'}"
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
    background: color-mix(in srgb, var(--color-bg) 30%, transparent);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom-color: var(--color-border);
  }

  /* Fallback for browsers without backdrop-filter support (older Safari, etc.)
     Use fully opaque background so the header does not appear to disappear. */
  @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
    .header-scrolled {
      background: var(--color-bg);
    }
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

  /* Nav link — smooth transition for active tab styling */
  .nav-link {
    font-weight: 500;
    font-size: 0.875rem; /* text-sm baseline */
    transition: font-size 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                font-weight 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .nav-link-active {
    color: var(--color-accent-text);
    font-weight: 600;
    font-size: 0.935rem;
  }
</style>
