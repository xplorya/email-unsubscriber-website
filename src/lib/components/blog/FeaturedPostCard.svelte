<script lang="ts">
  import type { Post } from '$lib/blog/types'
  import { icons } from '$lib/icons'
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
  class="featured-card relative grid lg:grid-cols-[1.15fr_1fr] rounded-2xl border border-(--color-border) overflow-hidden bg-(--color-bg) shadow-[0_1px_3px_var(--color-card-shadow)] transition-shadow duration-[250ms] focus:outline-none"
  aria-label="Featured post: {post.title}"
>
  <span class="featured-spine" aria-hidden="true"></span>

  <div class="cover-wrap relative aspect-[21/10] lg:aspect-auto lg:min-h-[360px] overflow-hidden">
    {#if hasCover}
      <img
        src={post.cover}
        alt={post.coverAlt ?? post.title}
        width="1200"
        height="675"
        loading="eager"
        fetchpriority="high"
        decoding="async"
        class="w-full h-full object-cover"
      />
    {:else}
      <div class="cover-fallback absolute inset-0 flex items-center justify-center">
        <span
          class="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-(--color-accent-text) opacity-60"
        >
          {primaryCategory}
        </span>
      </div>
    {/if}
    <div
      class="featured-badge absolute top-4 left-4 z-[2] inline-flex items-center gap-[0.35rem] bg-(--color-accent) text-white text-[0.7rem] font-semibold uppercase tracking-[0.08em] rounded-full"
    >
      <span class="inline-flex [&>svg]:w-full [&>svg]:h-full" aria-hidden="true">
        {@html icons.star}
      </span>
      Featured
    </div>
  </div>

  <div class="p-7 lg:p-10 flex flex-col justify-center gap-4">
    <span class="text-xs font-semibold uppercase tracking-wider text-(--color-accent-text)">
      {primaryCategory}
    </span>
    <h2 class="text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-(--color-text)">
      {post.title}
    </h2>
    <p class="text-base text-(--color-text-secondary) leading-relaxed">
      {post.excerpt}
    </p>
    <PostMeta {post} show={['author', 'date', 'readingTime']} />
    <span
      class="read-link inline-flex items-center gap-1.5 font-semibold text-(--color-accent-text) mt-2"
      aria-hidden="true"
    >
      Read the article
      <span class="arrow w-4 h-4 inline-flex [&>svg]:w-full [&>svg]:h-full">
        {@html icons.arrowRight}
      </span>
    </span>
  </div>
</a>

<style>
  .featured-card:hover {
    box-shadow: 0 12px 32px var(--color-card-shadow-hover);
  }

  .featured-card:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--color-accent-glow), 0 1px 3px var(--color-card-shadow);
  }

  .featured-spine {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: var(--color-accent);
    z-index: 3;
  }

  @media (min-width: 1024px) {
    .featured-spine {
      width: 6px;
    }
  }

  /* Cover placeholder matches the design mockup (/.design/mockups/blog-listing):
     base diagonal linear-gradient on the container, diagonal stripes overlaid on the placeholder. */
  .cover-wrap {
    background: linear-gradient(135deg, var(--color-accent-light), var(--color-bg-secondary-solid));
  }
  .cover-fallback {
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 12px,
      color-mix(in srgb, var(--color-accent) 8%, transparent) 12px,
      color-mix(in srgb, var(--color-accent) 8%, transparent) 13px
    );
  }

  /* Featured badge — exact mockup dims (height driven by padding + line-height). */
  .featured-badge {
    padding: 0.25rem 0.625rem;
  }
  .featured-badge > span:first-child {
    width: 11px;
    height: 11px;
  }

  .featured-card:hover .arrow {
    transform: translateX(3px);
  }

  .arrow {
    transition: transform 200ms ease;
  }

  .read-link:hover {
    color: var(--color-accent-hover);
  }

  @media (prefers-reduced-motion: reduce) {
    .arrow {
      transition: none;
    }
    .featured-card:hover .arrow {
      transform: none;
    }
  }
</style>
