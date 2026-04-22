<script lang="ts">
  import type { Post } from '$lib/blog/types'
  import PostCard from './PostCard.svelte'

  interface Props {
    posts: Post[]
  }

  let { posts }: Props = $props()
</script>

{#if posts.length > 0}
  <section
    class="mt-16 pt-12 pb-16 lg:pb-24 border-t border-(--color-border)"
    aria-labelledby="related-heading"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 id="related-heading" class="text-2xl font-bold tracking-tight text-(--color-text) mb-8">
        Related reading
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {#each posts as post (post.slug)}
          <PostCard {post} />
        {/each}
      </div>
    </div>
  </section>
{/if}
