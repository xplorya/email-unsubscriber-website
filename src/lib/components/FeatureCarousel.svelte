<script lang="ts">
  import { icons } from '$lib/icons'
  import DeviceScreenshot from '$lib/components/DeviceScreenshot.svelte'

  interface CarouselPage {
    icon: string
    title: string
    description: string
    screenshotFeature?: string
  }

  interface Props {
    pages: CarouselPage[]
    autoAdvance?: boolean
    autoAdvanceInterval?: number
  }

  const MANUAL_NAV_PAUSE_MS = 10_000

  let { pages, autoAdvance = true, autoAdvanceInterval = 5000 }: Props = $props()

  let currentPage = $state(0)
  let touchStartX = $state(0)
  let touchStartY = $state(0)

  let isInView = $state(false)
  let isPaused = $state(false)
  let manualNavResumeTimer: ReturnType<typeof setTimeout> | undefined
  let carouselEl: HTMLDivElement | undefined = $state(undefined)

  let isFirst = $derived(currentPage === 0)
  let isLast = $derived(currentPage === pages.length - 1)
  let translateX = $derived(`translateX(-${currentPage * 100}%)`)

  // Detect prefers-reduced-motion
  let prefersReducedMotion = $state(false)

  $effect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion = mql.matches
    function onChange(e: MediaQueryListEvent) {
      prefersReducedMotion = e.matches
    }
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  })

  // Observe carousel visibility via IntersectionObserver
  $effect(() => {
    if (!carouselEl) return

    const observer = new IntersectionObserver(
      (entries) => {
        isInView = entries[0]?.isIntersecting ?? false
      },
      { threshold: 0.3 }
    )

    observer.observe(carouselEl)
    return () => observer.disconnect()
  })

  // Auto-advance interval
  $effect(() => {
    if (!autoAdvance || !isInView || isPaused || prefersReducedMotion) return

    const id = setInterval(() => {
      if (currentPage < pages.length - 1) {
        currentPage++
      } else {
        currentPage = 0
      }
    }, autoAdvanceInterval)

    return () => clearInterval(id)
  })

  // Clean up manual-nav resume timer on destroy
  $effect(() => {
    return () => {
      if (manualNavResumeTimer) clearTimeout(manualNavResumeTimer)
    }
  })

  function pauseForManualNav() {
    isPaused = true
    if (manualNavResumeTimer) clearTimeout(manualNavResumeTimer)
    manualNavResumeTimer = setTimeout(() => {
      isPaused = false
      manualNavResumeTimer = undefined
    }, MANUAL_NAV_PAUSE_MS)
  }

  function goTo(index: number) {
    if (index >= 0 && index < pages.length) {
      currentPage = index
      pauseForManualNav()
    }
  }

  function prev() {
    if (!isFirst) {
      currentPage--
      pauseForManualNav()
    }
  }

  function next() {
    if (!isLast) {
      currentPage++
      pauseForManualNav()
    }
  }

  function handleTouchStart(e: TouchEvent) {
    touchStartX = e.touches[0].clientX
    touchStartY = e.touches[0].clientY
    isPaused = true
  }

  function handleTouchEnd(e: TouchEvent) {
    const touchEndX = e.changedTouches[0].clientX
    const touchEndY = e.changedTouches[0].clientY
    const diffX = touchStartX - touchEndX
    const diffY = touchStartY - touchEndY

    // Only trigger if horizontal swipe is dominant and exceeds threshold
    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        next()
      } else {
        prev()
      }
    }
  }

  function handleMouseEnter() {
    isPaused = true
    if (manualNavResumeTimer) {
      clearTimeout(manualNavResumeTimer)
      manualNavResumeTimer = undefined
    }
  }

  function handleMouseLeave() {
    isPaused = false
  }
</script>

<div
  bind:this={carouselEl}
  class="relative w-full overflow-hidden"
  role="region"
  aria-label="Feature carousel"
  aria-roledescription="carousel"
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  ontouchstart={handleTouchStart}
  ontouchend={handleTouchEnd}
>
  <!-- Slide track -->
  <div
    class="flex transition-transform duration-300 ease-in-out"
    style="transform: {translateX}"
  >
    {#each pages as page, i (i)}
      <div
        class="w-full shrink-0 flex flex-col items-center text-center px-6 py-8"
        role="group"
        aria-roledescription="slide"
        aria-label="Page {i + 1} of {pages.length}"
      >
        <!-- Icon -->
        <div
          class="flex items-center justify-center w-14 h-14 rounded-full mb-4 icon-glow"
          style="background-color: var(--color-accent-light); color: var(--color-accent-text); box-shadow: 0 0 12px var(--color-accent-glow)"
        >
          <span class="icon-hover-scale inline-block w-8 h-8 [&>svg]:w-full [&>svg]:h-full">
            {@html page.icon}
          </span>
        </div>

        <!-- Content container with subtle gradient -->
        <div
          class="w-full rounded-xl px-4 py-4"
          style="background: linear-gradient(to bottom, var(--color-accent-gradient-from), transparent)"
        >
          <!-- Title -->
          <h3 class="font-semibold text-lg mb-2" style="color: var(--color-text)">
            {page.title}
          </h3>

          <!-- Description -->
          <p class="text-sm max-w-md mx-auto mb-6" style="color: var(--color-text-secondary)">
            {page.description}
          </p>

          <!-- Optional screenshot -->
          {#if page.screenshotFeature}
            <div class="w-full max-w-sm mx-auto">
              <DeviceScreenshot feature={page.screenshotFeature} alt="{page.title} screenshot" />
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>

  <!-- Left arrow (desktop only) -->
  <button
    onclick={prev}
    disabled={isFirst}
    class="absolute left-2 top-1/2 -translate-y-1/2 z-10 hidden md:flex
           items-center justify-center w-10 h-10 rounded-full
           card-elevated transition-all duration-200 cursor-pointer"
    class:opacity-40={isFirst}
    class:cursor-not-allowed={isFirst}
    style="color: var(--color-text-secondary); background-color: var(--color-bg-secondary-solid); border: 1px solid var(--color-border)"
    aria-label="Previous page"
  >
    <span class="w-5 h-5">{@html icons.chevronLeft}</span>
  </button>

  <!-- Right arrow (desktop only) -->
  <button
    onclick={next}
    disabled={isLast}
    class="absolute right-2 top-1/2 -translate-y-1/2 z-10 hidden md:flex
           items-center justify-center w-10 h-10 rounded-full
           card-elevated transition-all duration-200 cursor-pointer"
    class:opacity-40={isLast}
    class:cursor-not-allowed={isLast}
    style="color: var(--color-text-secondary); background-color: var(--color-bg-secondary-solid); border: 1px solid var(--color-border)"
    aria-label="Next page"
  >
    <span class="w-5 h-5">{@html icons.chevronRight}</span>
  </button>

  <!-- Page indicator dots -->
  <div class="flex items-center justify-center gap-2 mt-4" role="tablist" aria-label="Carousel pages">
    {#each pages as _, i (i)}
      <button
        onclick={() => goTo(i)}
        class="rounded-full transition-all duration-300 cursor-pointer"
        class:w-3={currentPage === i}
        class:h-3={currentPage === i}
        class:w-2={currentPage !== i}
        class:h-2={currentPage !== i}
        style="background-color: {currentPage === i ? 'var(--color-accent)' : 'var(--color-border)'}; box-shadow: {currentPage === i ? '0 0 8px var(--color-accent-glow)' : 'none'}"
        role="tab"
        aria-selected={currentPage === i}
        aria-label="Go to page {i + 1}"
      ></button>
    {/each}
  </div>
</div>
