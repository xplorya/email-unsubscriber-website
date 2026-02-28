<script lang="ts">
  import '../app.css'
  import { initTheme } from '$lib/utilities/theme'
  import { onMount } from 'svelte'
  import Header from '$lib/components/Header.svelte'
  import Footer from '$lib/components/Footer.svelte'
  import CookieConsent from '$lib/components/CookieConsent.svelte'

  let { children } = $props()

  onMount(() => {
    initTheme()

    // Parallax scroll: move dots at 1/10th of scroll speed
    const dots = document.getElementById('site-dots')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    function onScroll() {
      if (dots && !motionQuery.matches) {
        dots.style.setProperty('--scroll-offset', `${window.scrollY * -0.2}px`)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  })
</script>

<!-- Fixed parallax background layers (below content) -->
<div id="site-halo" aria-hidden="true"></div>
<div id="site-dots" aria-hidden="true"></div>

<div class="relative z-10 min-h-screen flex flex-col">
  <Header />
  <main class="flex-1">
    {@render children()}
  </main>
  <Footer />
</div>
<CookieConsent />
