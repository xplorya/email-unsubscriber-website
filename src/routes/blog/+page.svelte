<script lang="ts">
  import type { Post } from '$lib/blog/types'
  import { SITE_URL } from '$lib/utilities/constants'
  import BlogHero from '$lib/components/blog/BlogHero.svelte'
  import FeaturedPostCard from '$lib/components/blog/FeaturedPostCard.svelte'
  import PostCard from '$lib/components/blog/PostCard.svelte'
  import SearchInput from '$lib/components/blog/SearchInput.svelte'
  import CategoryChip from '$lib/components/blog/CategoryChip.svelte'
  import EmptyState from '$lib/components/blog/EmptyState.svelte'

  interface PageData {
    /** ALL posts (including the featured one). Grid filters apply to this set. */
    posts: Post[]
    /** Featured post (if any). Always rendered as a permanent marquee slot; also appears in the filtered grid when it matches. */
    featured: Post | null
    categories: string[]
    categoryCounts: Record<string, number>
  }

  let { data }: { data: PageData } = $props()

  let query = $state('')
  let activeCategory = $state<string>('All')

  const queryLower = $derived(query.trim().toLowerCase())

  /**
   * Grid filter runs across ALL posts (including the featured one). The featured
   * post remains rendered independently in its marquee slot above the grid;
   * duplication in the grid when it matches the active filter is intentional.
   */
  const filtered = $derived.by(() => {
    return data.posts.filter((p) => {
      if (activeCategory !== 'All' && !p.categories.includes(activeCategory)) return false
      if (queryLower.length === 0) return true
      const hay = [p.title, p.excerpt, ...(p.categories ?? []), ...(p.tags ?? [])]
        .join(' ')
        .toLowerCase()
      return hay.includes(queryLower)
    })
  })

  const filtersActive = $derived(activeCategory !== 'All' || queryLower.length > 0)
  const gridEmpty = $derived(filtered.length === 0)

  function clearFilters() {
    query = ''
    activeCategory = 'All'
  }

  const pageTitle = 'Writing — Email Unsubscriber'
  const pageDescription =
    'Notes on inbox hygiene, privacy-first engineering, and what we learn running Email Unsubscriber.'
  const canonical = `${SITE_URL}/blog`
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={pageDescription} />
  <link rel="canonical" href={canonical} />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={pageDescription} />
  <meta property="og:url" content={canonical} />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={pageTitle} />
  <meta name="twitter:description" content={pageDescription} />
</svelte:head>

<section>
  <BlogHero
    eyebrow="Writing"
    title="Notes on inbox hygiene."
    subtitle="What we're learning about privacy-first engineering, product trade-offs, and what helps the humans behind the inbox."
  />

  <!--
    Featured post — ALWAYS rendered when one exists. Search + category filters
    only affect the grid below; the featured slot is a permanent marquee.
  -->
  {#if data.featured}
    <section class="pt-8 pb-4" aria-label="Featured post">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FeaturedPostCard post={data.featured} />
      </div>
    </section>
  {/if}

  <section class="pt-10 pb-6">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <SearchInput bind:value={query} />
        <div
          class="chip-row flex items-center gap-2 overflow-x-auto lg:overflow-visible lg:flex-wrap -mx-4 px-4 lg:mx-0 lg:px-0"
          role="group"
          aria-label="Filter posts by category"
        >
          <CategoryChip
            label="All"
            count={data.posts.length}
            active={activeCategory === 'All'}
            onclick={() => (activeCategory = 'All')}
          />
          {#each data.categories as cat (cat)}
            <CategoryChip
              label={cat}
              count={data.categoryCounts[cat]}
              active={activeCategory === cat}
              onclick={() => (activeCategory = cat)}
            />
          {/each}
        </div>
      </div>
    </div>
  </section>

  <section class="pb-16 lg:pb-24" aria-label="Posts">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {#if gridEmpty}
        {#if filtersActive}
          <EmptyState
            title="No posts match that search."
            message="Try a different keyword, or clear filters to see everything we've written."
            action={{ label: 'Clear filters', onClick: clearFilters }}
          />
        {:else}
          <EmptyState
            title="No posts yet."
            message="Come back soon — we're writing."
          />
        {/if}
      {:else}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {#each filtered as p (p.slug)}
            <PostCard post={p} />
          {/each}
        </div>
      {/if}
    </div>
  </section>
</section>

<style>
  .chip-row {
    -webkit-mask-image: linear-gradient(to right, black 85%, transparent);
    mask-image: linear-gradient(to right, black 85%, transparent);
  }

  @media (min-width: 1024px) {
    .chip-row {
      -webkit-mask-image: none;
      mask-image: none;
    }
  }
</style>
