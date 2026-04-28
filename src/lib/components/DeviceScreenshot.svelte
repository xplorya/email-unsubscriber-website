<script lang="ts">
  import { onMount } from 'svelte'

  interface Props {
    feature: string
    alt: string
    fill?: boolean
    index?: number
  }

  let { feature, alt, fill = false, index = 1 }: Props = $props()

  let mounted = $state(false)
  let errorForPath = $state('')

  let imageUrl = $derived(`https://assets.email-unsubscriber.com/marketing/${feature}/${index}.png`)
  let hasError = $derived(!mounted || errorForPath === imageUrl)

  // Mark as mounted (client-side only) to avoid SSR prerender fetching missing images.
  onMount(() => {
    mounted = true
  })

  function handleImageError() {
    errorForPath = imageUrl
  }
</script>

<div class="rounded-lg overflow-hidden {fill ? 'h-full lg:absolute lg:inset-0 lg:h-auto' : ''}">
  {#if hasError}
    <div
      class="flex min-h-50 items-center justify-center rounded-lg border-2 border-dashed border-(--color-border) bg-(--color-bg-secondary-solid) {fill ? 'h-full' : ''}"
    >
      <p class="text-sm text-(--color-text-secondary)">Screenshot coming soon</p>
    </div>
  {:else}
    <img
      src={imageUrl}
      {alt}
      class="opacity-60 w-full {fill ? 'h-full object-cover object-top' : 'object-contain'}"
      onerror={handleImageError}
    />
  {/if}
</div>
