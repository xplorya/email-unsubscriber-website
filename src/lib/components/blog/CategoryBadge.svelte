<script lang="ts">
  import { icons } from '$lib/icons'

  interface Props {
    label: string
    variant?: 'overlay' | 'inline'
    /** Inline variant only: render a leading tag icon (matches /.design/mockups/blog-post `.post-category`). */
    icon?: boolean
  }

  let { label, variant = 'overlay', icon = false }: Props = $props()
</script>

{#if variant === 'overlay'}
  <span
    class="overlay-badge inline-flex items-center rounded-full font-semibold uppercase bg-(--color-bg) text-(--color-accent-text) border border-(--color-accent-border) shadow-sm"
  >
    {label}
  </span>
{:else}
  <span
    class="inline-badge inline-flex items-center gap-[0.4rem] rounded-full font-semibold uppercase bg-(--color-accent-light) text-(--color-accent-text) border border-(--color-accent-border)"
  >
    {#if icon}
      <span class="inline-flex [&>svg]:w-full [&>svg]:h-full icon" aria-hidden="true">
        {@html icons.tag}
      </span>
    {/if}
    {label}
  </span>
{/if}

<style>
  /* Matches /.design/mockups/blog-listing `.card .category-badge`. */
  .overlay-badge {
    font-size: 0.7rem;
    letter-spacing: 0.06em;
    padding: 0.2rem 0.55rem;
  }
  /* Matches /.design/mockups/blog-post `.post-category`. */
  .inline-badge {
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    padding: 0.25rem 0.65rem;
  }
  .inline-badge .icon {
    width: 12px;
    height: 12px;
  }
</style>
