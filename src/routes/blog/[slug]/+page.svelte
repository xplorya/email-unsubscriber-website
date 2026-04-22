<script lang="ts">
  import type { Post } from '$lib/blog/types'
  import type { Component } from 'svelte'
  import { SITE_URL } from '$lib/utilities/constants'
  import PostHero from '$lib/components/blog/PostHero.svelte'
  import TableOfContents from '$lib/components/blog/TableOfContents.svelte'
  import ShareCluster from '$lib/components/blog/ShareCluster.svelte'
  import RelatedPosts from '$lib/components/blog/RelatedPosts.svelte'
  import ReadingProgressBar from '$lib/components/blog/ReadingProgressBar.svelte'

  interface PageData {
    post: Post
    related: Post[]
  }

  let { data }: { data: PageData } = $props()

  const PostBody = $derived(data.post.Component as Component)
  const canonical = $derived(`${SITE_URL}/blog/${data.post.slug}`)
  const pageTitle = $derived(`${data.post.title} — Email Unsubscriber`)
  // Only emit an og:image when the post actually has a cover. If none,
  // omit the meta entirely rather than pointing at a placeholder that 404s.
  const ogImage = $derived(
    data.post.cover
      ? `${SITE_URL}${data.post.cover.startsWith('/') ? data.post.cover : '/' + data.post.cover}`
      : null
  )
  const ogImageAlt = $derived(data.post.coverAlt ?? data.post.title)

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
    }).replace(/<\/script>/gi, '<\\/script>')
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
          <TableOfContents variant="mobile" />
        </div>
        <article class="prose">
          <PostBody />
          <ShareCluster title={data.post.title} url={canonical} />
        </article>
      </div>

      <aside class="hidden lg:block lg:col-start-2 lg:row-start-2" aria-label="Page tools">
        <TableOfContents variant="desktop" />
      </aside>
    </div>

    <RelatedPosts posts={data.related} />
  </div>
</section>
