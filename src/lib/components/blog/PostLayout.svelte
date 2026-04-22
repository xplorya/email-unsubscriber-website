<script lang="ts">
  /**
   * mdsvex layout for every `src/content/blog/*.md` post.
   *
   * The `.md` file's frontmatter is passed as individual props by mdsvex
   * (one prop per frontmatter key). We collect them all via `$props()` rest
   * so the prop names don't have to match — they're only used for type
   * inference; the actual render target is the children slot.
   *
   * The surrounding `<article class="prose">` wrapper is owned by the blog
   * post route (`src/routes/blog/[slug]/+page.svelte`) so it can co-locate
   * the compiled markdown body and the `<ShareCluster>` inside the same
   * article element (per design spec §4). This layout just passes through.
   */
  type Props = {
    children: import('svelte').Snippet
    // mdsvex passes every frontmatter key as a prop; accept & discard.
    [key: string]: unknown
  }
  const { children }: Props = $props()
</script>

{@render children()}
