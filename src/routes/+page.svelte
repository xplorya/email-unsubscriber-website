<script lang="ts">
  import { onMount } from 'svelte'
  import { SITE_URL } from '$lib/utilities/constants'
  import { captureEvent } from '$lib/utilities/posthog'
  import Hero from '$lib/components/sections/Hero.svelte'
  import HowItWorks from '$lib/components/sections/HowItWorks.svelte'
  import Mission from '$lib/components/sections/Mission.svelte'
  import Pricing from '$lib/components/sections/Pricing.svelte'
  import Comparison from '$lib/components/sections/Comparison.svelte'
  import LiveDemo from '$lib/components/sections/LiveDemo.svelte'
  import SocialProof from '$lib/components/sections/SocialProof.svelte'
  import AboutUs from '$lib/components/sections/AboutUs.svelte'
  import Legal from '$lib/components/sections/Legal.svelte'

  const pageTitle = 'Email Unsubscriber - Privacy First Inbox Cleanup'
  const pageDescription =
    'Scan Gmail or Outlook in one go, find every subscription, unsubscribe in clicks. Pay once. Privacy-first.'
  const canonical = SITE_URL

  const softwareApplicationJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Email Unsubscriber',
    url: SITE_URL,
    applicationCategory: 'ProductivityApplication',
    operatingSystem: 'Web',
    description: pageDescription,
    offers: {
      '@type': 'Offer',
      price: '2.99',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock'
    },
    publisher: { '@id': `${SITE_URL}#organization` }
  }).replace(/</g, '\\u003c')

  onMount(() => {
    captureEvent('homepage_view')
  })
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={pageDescription} />
  <link rel="canonical" href={canonical} />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={pageDescription} />
  <meta property="og:url" content={canonical} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Email Unsubscriber" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={pageTitle} />
  <meta name="twitter:description" content={pageDescription} />
  {@html `<script type="application/ld+json">${softwareApplicationJsonLd}</script>`}
</svelte:head>

<Hero />
<Mission />
<HowItWorks />
<Pricing />
<Comparison />
<LiveDemo />
<SocialProof />
<AboutUs />
<Legal />
