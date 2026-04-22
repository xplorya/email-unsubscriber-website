<script lang="ts">
  import '../app.css'
  import { initTheme } from '$lib/utilities/theme'
  import { onMount } from 'svelte'
  import { page } from '$app/state'
  import Header from '$lib/components/Header.svelte'
  import Footer from '$lib/components/Footer.svelte'
  import CookieConsent from '$lib/components/CookieConsent.svelte'

  let { children } = $props()

  const isLegalPage = $derived(
    page.url.pathname === '/privacy' || page.url.pathname === '/terms' || page.url.pathname === '/security'
  )
  const isBlogRoute = $derived(
    page.url.pathname === '/blog' || page.url.pathname.startsWith('/blog/')
  )

  let scrollY = $state(0)
  let reducedMotion = $state(false)

  // Parallax offset: dots move at 1/10th scroll speed
  let dotOffset = $derived(reducedMotion ? 0 : Math.round(scrollY * -0.15))

  onMount(() => {
    initTheme()
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotion = mq.matches
    mq.addEventListener('change', (e) => { reducedMotion = e.matches })
  })
</script>

<svelte:window bind:scrollY />

<!-- Fixed parallax background layers (below content) -->
<div id="site-halo" aria-hidden="true"></div>
<div id="site-dots" aria-hidden="true" style:transform="translateY({dotOffset}px)"></div>

<a
  href="#main-content"
  class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-3 focus:py-2 focus:bg-(--color-bg) focus:border focus:border-(--color-accent) focus:rounded"
>
  Skip to content
</a>

<div class="relative z-10 min-h-screen flex flex-col">
  {#if !isLegalPage && !isBlogRoute}
    <Header />
  {/if}
  <main id="main-content" class="flex-1">
    {@render children()}
  </main>
  <Footer minimal={isLegalPage} />
</div>
<CookieConsent />
