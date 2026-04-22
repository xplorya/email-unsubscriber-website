<script lang="ts">
  import type { Post } from '$lib/blog/types'
  import CategoryBadge from './CategoryBadge.svelte'
  import PostMeta from './PostMeta.svelte'

  interface Props {
    post: Post
  }

  let { post }: Props = $props()

  const hasCover = $derived(Boolean(post.cover))
  const primaryCategory = $derived(post.categories[0] ?? 'Writing')
</script>

<div class="pt-8 pb-12 lg:pb-20">
  <nav class="text-sm text-(--color-text-secondary) mb-5" aria-label="Breadcrumb">
    <a href="/" class="hover:text-(--color-accent-text) transition-colors">Home</a>
    <span class="mx-1.5 opacity-50">/</span>
    <a href="/blog" class="hover:text-(--color-accent-text) transition-colors">Writing</a>
    <span class="mx-1.5 opacity-50">/</span>
    <span class="text-(--color-text)">{post.title}</span>
  </nav>

  <div class="mb-5">
    <CategoryBadge label={primaryCategory} variant="inline" icon />
  </div>

  <h1
    class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-(--color-text) leading-[1.15]"
  >
    {post.title}
  </h1>

  <p class="mt-5 text-lg text-(--color-text-secondary) leading-relaxed">{post.excerpt}</p>

  <div class="mt-6">
    <PostMeta {post} show={['author', 'date', 'readingTime']} />
  </div>

  <div
    class="hero-cover relative mt-10 rounded-2xl overflow-hidden border border-(--color-border) aspect-[21/9]"
  >
    {#if hasCover}
      <img
        src={post.cover}
        alt={post.coverAlt ?? post.title}
        width="1600"
        height="685"
        loading="eager"
        fetchpriority="high"
        decoding="async"
        class="w-full h-full object-cover"
      />
    {:else}
      <div class="hero-fallback absolute inset-0 flex items-center justify-center">
        <span
          class="text-sm font-semibold uppercase tracking-[0.14em] text-(--color-accent-text) opacity-55"
        >
          {primaryCategory}
        </span>
      </div>
    {/if}
  </div>
</div>

<style>
  /* Hero cover matches /.design/mockups/blog-post: diagonal linear-gradient base,
     repeating diagonal stripes (45deg, 12/13px, accent @ 7%) on the placeholder. */
  .hero-cover {
    background: linear-gradient(135deg, var(--color-accent-light), var(--color-bg-secondary-solid));
  }
  .hero-fallback {
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 12px,
      color-mix(in srgb, var(--color-accent) 7%, transparent) 12px,
      color-mix(in srgb, var(--color-accent) 7%, transparent) 13px
    );
  }
</style>
