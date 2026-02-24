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
  })
</script>

<Header />
<div class="min-h-screen flex flex-col">
  <main class="flex-1">
    {@render children()}
  </main>
  <Footer />
</div>
<CookieConsent />
