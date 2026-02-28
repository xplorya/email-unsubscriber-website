<script lang="ts">
  interface Props {
    feature: string
    alt: string
  }

  let { feature, alt }: Props = $props()

  let mounted = $state(false)
  let device = $state<'mobile' | 'desktop'>('desktop')
  let theme = $state<'light' | 'dark'>('light')
  let errorForPath = $state('')

  let imagePath = $derived(`/screenshots/${feature}/${device}-${theme}.png`)
  let hasError = $derived(!mounted || errorForPath === imagePath)

  // Mark as mounted (client-side only) to avoid SSR prerender fetching missing images.
  $effect(() => {
    mounted = true
  })

  // Detect device type via matchMedia — requires event listener setup/teardown,
  // so $effect is the correct pattern here (cannot use $derived for browser APIs).
  $effect(() => {
    const mq = window.matchMedia('(max-width: 767px)')

    function onDeviceChange(e: MediaQueryList | MediaQueryListEvent) {
      device = e.matches ? 'mobile' : 'desktop'
    }

    onDeviceChange(mq)
    mq.addEventListener('change', onDeviceChange)

    return () => mq.removeEventListener('change', onDeviceChange)
  })

  // Observe theme changes on <html> element — requires MutationObserver
  // setup/teardown, so $effect is the correct pattern here.
  $effect(() => {
    function readTheme() {
      theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    }

    readTheme()

    const observer = new MutationObserver(readTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  })

  function handleImageError() {
    errorForPath = imagePath
  }
</script>

<div class="rounded-lg overflow-hidden">
  {#if hasError}
    <div
      class="flex min-h-[200px] items-center justify-center rounded-lg border-2 border-dashed border-(--color-border) bg-(--color-bg-secondary-solid)"
    >
      <p class="text-sm text-(--color-text-secondary)">Screenshot coming soon</p>
    </div>
  {:else}
    <img
      src={imagePath}
      {alt}
      class="w-full object-contain"
      onerror={handleImageError}
    />
  {/if}
</div>
