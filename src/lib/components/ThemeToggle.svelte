<script lang="ts">
  import { getEffectiveTheme, toggleTheme } from '$lib/utilities/theme'
  import { icons } from '$lib/icons'

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
        {@html icons.sun}
      </span>
    {/if}
    {#if isDark}
      <span class="icon" in:clockwiseIn out:clockwiseOut>
        {@html icons.moon}
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
