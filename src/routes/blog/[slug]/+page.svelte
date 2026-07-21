<script lang="ts">
  import type { Post } from '$lib/blog/types'
  import type { Component } from 'svelte'
  import { afterNavigate } from '$app/navigation'
  import { SITE_URL } from '$lib/utilities/constants'
  import { captureEvent } from '$lib/utilities/posthog'
  import PostHero from '$lib/components/blog/PostHero.svelte'
  import TableOfContents from '$lib/components/blog/TableOfContents.svelte'
  import ShareCluster from '$lib/components/blog/ShareCluster.svelte'
  import BlogPostCta from '$lib/components/blog/BlogPostCta.svelte'
  import PostFaq from '$lib/components/blog/PostFaq.svelte'
  import RelatedPosts from '$lib/components/blog/RelatedPosts.svelte'
  import ReadingProgressBar from '$lib/components/blog/ReadingProgressBar.svelte'

  interface PageData {
    post: Post
    related: Post[]
  }

  let { data }: { data: PageData } = $props()

  const PostBody = $derived(data.post.Component as Component)
  const canonical = $derived(`${SITE_URL}/blog/${data.post.slug}`)
  const pageTitle = $derived(`${data.post.title} - Email Unsubscriber`)
  // Only emit an og:image when the post actually has a cover. If none,
  // omit the meta entirely rather than pointing at a placeholder that 404s.
  const ogImage = $derived(
    data.post.cover
      ? `${SITE_URL}${data.post.cover.startsWith('/') ? data.post.cover : '/' + data.post.cover}`
      : null
  )
  const ogImageAlt = $derived(data.post.coverAlt ?? data.post.title)

  // Bypass the global `html { scroll-behavior: smooth }` for full-page nav
  // between blog posts: SvelteKit auto-scrolls to top after content swaps,
  // and animating that scroll over the already-swapped new content looks
  // broken. Hash-link clicks (TOC, footnotes) keep the smooth behavior
  // because they go through the CSS path, not this programmatic call.
  afterNavigate(({ to, type }) => {
    if (type === 'enter') return
    if (to?.url.hash) return
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  })

  function isGoogleReferrer(referrer: string): boolean {
    if (!referrer) return false
    try {
      return /(^|\.)google\./.test(new URL(referrer).hostname)
    } catch {
      return false
    }
  }

  // Fire per post view. Keyed on the slug so it also fires on client-side
  // blog -> blog navigation, where SvelteKit reuses this component instead of
  // remounting it (so onMount would only fire for the first post).
  $effect(() => {
    const slug = data.post.slug
    const referrer = document.referrer
    captureEvent('blog_view', {
      slug,
      referrer,
      referrer_is_google: isGoogleReferrer(referrer)
    })
  })

  const jsonLd = $derived(
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.post.title,
      description: data.post.excerpt,
      // Schema.org `image` is optional; omit rather than lie.
      ...(ogImage
        ? {
            image: {
              '@type': 'ImageObject',
              url: ogImage,
              description: ogImageAlt
            }
          }
        : {}),
      datePublished: data.post.date,
      author: { '@type': 'Organization', name: data.post.author },
      publisher: {
        '@type': 'Organization',
        name: 'Email Unsubscriber',
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.png` }
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonical }
    }).replace(/</g, '\\u003c')
  )

  // FAQPage JSON-LD. Only emitted when the post declares `faq` frontmatter.
  // The `text` values MUST match the visible PostFaq answers verbatim, or
  // Google flags the structured data as mismatched.
  const faqJsonLd = $derived(
    data.post.faq && data.post.faq.length > 0
      ? JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: data.post.faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer }
          }))
        }).replace(/</g, '\\u003c')
      : null
  )
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={data.post.excerpt} />
  <link rel="canonical" href={canonical} />
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.post.title} />
  <meta property="og:description" content={data.post.excerpt} />
  <meta property="og:url" content={canonical} />
  {#if ogImage}
    <meta property="og:image" content={ogImage} />
    <meta property="og:image:alt" content={ogImageAlt} />
  {/if}
  <meta property="article:published_time" content={data.post.date} />
  <meta property="article:author" content={data.post.author} />
  {#each data.post.categories as c (c)}
    <meta property="article:section" content={c} />
  {/each}
  {#each data.post.tags ?? [] as t (t)}
    <meta property="article:tag" content={t} />
  {/each}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={data.post.title} />
  <meta name="twitter:description" content={data.post.excerpt} />
  {#if ogImage}
    <meta name="twitter:image" content={ogImage} />
    <meta name="twitter:image:alt" content={ogImageAlt} />
  {/if}
  {@html `<script type="application/ld+json">${jsonLd}</script>`}
  {#if faqJsonLd}
    {@html `<script type="application/ld+json">${faqJsonLd}</script>`}
  {/if}
</svelte:head>

<ReadingProgressBar />

<section>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,48rem)_15rem] gap-x-12">
      <div class="min-w-0 lg:col-start-1">
        <PostHero post={data.post} />
      </div>

      <div class="min-w-0 lg:col-start-1 lg:row-start-2">
        <div class="lg:hidden">
          <TableOfContents variant="mobile" slug={data.post.slug} />
        </div>
        <article class="prose">
          <PostBody />
          <BlogPostCta slug={data.post.slug} />
          <ShareCluster title={data.post.title} url={canonical} />
        </article>
        {#if data.post.faq && data.post.faq.length > 0}
          <PostFaq items={data.post.faq} />
        {/if}
      </div>

      <aside class="hidden lg:block lg:col-start-2 lg:row-start-2" aria-label="Page tools">
        <TableOfContents variant="desktop" slug={data.post.slug} />
      </aside>
    </div>

    <RelatedPosts posts={data.related} />
  </div>
</section>
