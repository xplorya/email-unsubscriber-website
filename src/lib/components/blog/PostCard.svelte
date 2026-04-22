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

<a
  href="/blog/{post.slug}"
  class="post-card block bg-(--color-bg) border border-(--color-border) rounded-[14px] overflow-hidden flex flex-col shadow-[0_1px_3px_var(--color-card-shadow)] transition-[box-shadow,transform,border-color] duration-[250ms] focus:outline-none"
  aria-label="{post.title} — {post.readingTime}"
>
  <div class="card-cover relative aspect-[16/9] overflow-hidden">
    {#if hasCover}
      <img
        src={post.cover}
        alt={post.coverAlt ?? post.title}
        width="1200"
        height="675"
        loading="lazy"
        decoding="async"
        class="w-full h-full object-cover"
      />
    {:else}
      <div class="card-cover-fallback absolute inset-0 flex items-center justify-center">
        <span
          class="text-xs font-semibold uppercase tracking-[0.12em] text-(--color-text-secondary) opacity-60"
        >
          {primaryCategory}
        </span>
      </div>
    {/if}
    <div class="absolute top-3 left-3">
      <CategoryBadge label={primaryCategory} variant="overlay" />
    </div>
  </div>

  <div class="p-5 flex flex-col gap-2.5 flex-1">
    <h3 class="text-lg font-semibold leading-snug tracking-tight text-(--color-text) card-title">
      {post.title}
    </h3>
    <p class="text-[0.9375rem] text-(--color-text-secondary) leading-[1.55] flex-1 card-excerpt">
      {post.excerpt}
    </p>
    <div class="mt-1">
      <PostMeta {post} show={['date', 'readingTime']} />
    </div>
  </div>
</a>

<style>
  .post-card:hover {
    box-shadow: 0 8px 24px var(--color-card-shadow-hover);
    transform: translateY(-2px);
    border-color: var(--color-accent-border);
  }

  .post-card:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--color-accent-glow), 0 1px 3px var(--color-card-shadow);
    border-color: var(--color-accent);
  }

  .card-title,
  .card-excerpt {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card-title {
    -webkit-line-clamp: 3;
    line-clamp: 3;
  }

  .card-excerpt {
    -webkit-line-clamp: 3;
    line-clamp: 3;
  }

  /* Card cover matches the design mockup (/.design/mockups/blog-listing):
     diagonal linear-gradient base, no stripe overlay on the placeholder (only the featured card uses stripes). */
  .card-cover {
    background: linear-gradient(135deg, var(--color-bg-secondary-solid), var(--color-accent-light));
  }

  @media (prefers-reduced-motion: reduce) {
    .post-card {
      transition: box-shadow 250ms ease, border-color 250ms ease;
    }
    .post-card:hover {
      transform: none;
    }
  }
</style>
