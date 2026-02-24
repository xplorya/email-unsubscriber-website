<script lang="ts">
  import { getEffectiveTheme, toggleTheme } from '$lib/utilities/theme'

  let themeVersion = $state(0)

  const isDark = $derived.by(() => {
    void themeVersion
    return getEffectiveTheme() === 'dark'
  })

  function handleToggle() {
    toggleTheme()
    themeVersion++
  }

  $effect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    function onOSChange() {
      themeVersion++
    }
    mq.addEventListener('change', onOSChange)
    return () => mq.removeEventListener('change', onOSChange)
  })

  // Arc animation configuration
  const ARC_RADIUS = 400  // % of icon height
  const ARC_ANGLE = 25    // degrees
  const ARC_DURATION = 500 // ms

  function clockwiseIn(_node: HTMLElement) {
    return {
      duration: ARC_DURATION,
      css: (t: number) => {
        const angle = -ARC_ANGLE * (1 - t)
        return `transform-origin: center ${ARC_RADIUS}%; transform: rotate(${angle}deg); opacity: ${t}`
      }
    }
  }

  function clockwiseOut(_node: HTMLElement) {
    return {
      duration: ARC_DURATION,
      css: (t: number) => {
        const angle = ARC_ANGLE * (1 - t)
        return `transform-origin: center ${ARC_RADIUS}%; transform: rotate(${angle}deg); opacity: ${t}`
      }
    }
  }
</script>

<button
  onclick={handleToggle}
  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
  class="relative w-8 h-8 rounded-full overflow-hidden flex items-center justify-center hover:bg-(--color-button-ghost-bg-hover) transition-colors text-(--color-button-ghost-fg) hover:text-(--color-button-ghost-fg-hover)"
>
  <div class="icon-wrapper w-5 h-5">
    {#if !isDark}
      <span class="icon" in:clockwiseIn out:clockwiseOut>
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      </span>
    {/if}
    {#if isDark}
      <span class="icon" in:clockwiseIn out:clockwiseOut>
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
        </svg>
      </span>
    {/if}
  </div>
</button>

<style>
  .icon-wrapper {
    position: relative;
  }

  .icon {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon :global(svg) {
    width: 100%;
    height: 100%;
  }
</style>
