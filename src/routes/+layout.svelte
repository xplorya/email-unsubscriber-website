<script lang="ts">
  import '../app.css'
  import { initTheme } from '$lib/utilities/theme'
  import { onMount } from 'svelte'
  import { browser } from '$app/environment'
  import { page } from '$app/state'
  import Header from '$lib/components/Header.svelte'
  import Footer from '$lib/components/Footer.svelte'
  import CookieConsent from '$lib/components/CookieConsent.svelte'
  import { initPostHog, enableAnalytics } from '$lib/utilities/posthog'
  import { isAnalyticsAllowed } from '$lib/utilities/consent'
  import { SITE_URL, CONTACT_EMAIL, COMPANY_NAME, SOCIAL_LINKS } from '$lib/utilities/constants'

  let { children } = $props()

  // Init PostHog in the layout's instance script (browser-only) so it runs
  // before any child page's onMount — page-view events must never fire before
  // PostHog is ready. Error tracking is always on; the analytics tier (and the
  // shared cross-subdomain cookie) only turns on with consent.
  if (browser) {
    initPostHog()
    if (isAnalyticsAllowed()) enableAnalytics()
  }

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

  const SITE_DESCRIPTION = 'Privacy-first one-click email unsubscribe tool for Gmail and Outlook.'
  const ORG_ID = `${SITE_URL}#organization`

  function escapeJsonLd(value: unknown): string {
    return JSON.stringify(value).replace(/</g, '\\u003c')
  }

  const organizationJsonLd = escapeJsonLd({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Email Unsubscriber',
    legalName: COMPANY_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icons/Email_Unsubscriber_v1_logo.svg`,
    email: CONTACT_EMAIL,
    description: SITE_DESCRIPTION,
    sameAs: [
      SOCIAL_LINKS.x,
      SOCIAL_LINKS.linkedin,
      SOCIAL_LINKS.facebook,
      SOCIAL_LINKS.instagram
    ]
  })

  const websiteJsonLd = escapeJsonLd({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Email Unsubscriber',
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: 'en',
    publisher: { '@id': ORG_ID }
  })

  onMount(() => {
    initTheme()
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotion = mq.matches
    mq.addEventListener('change', (e) => { reducedMotion = e.matches })
  })
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${organizationJsonLd}</script>`}
  {@html `<script type="application/ld+json">${websiteJsonLd}</script>`}
</svelte:head>

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
