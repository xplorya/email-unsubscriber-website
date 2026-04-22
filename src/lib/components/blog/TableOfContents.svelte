<script lang="ts">
  import { onMount } from 'svelte'
  import type { Heading } from '$lib/blog/types'
  import { icons } from '$lib/icons'

  interface Props {
    variant: 'desktop' | 'mobile'
  }

  let { variant }: Props = $props()

  let headings = $state<Heading[]>([])
  let activeId = $state<string>('')
  let detailsEl: HTMLDetailsElement | undefined = $state()

  onMount(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>('.prose h2, .prose h3')
    ).filter((el) => Boolean(el.id))

    headings = nodes.map((el) => ({
      id: el.id,
      text: el.textContent?.trim() ?? '',
      level: el.tagName === 'H2' ? 2 : 3
    }))

    if (headings.length === 0) return

    const anchors = nodes.filter((el) => el.id)
    function onScroll() {
      const trigger = 120
      let current = anchors[0]?.id ?? ''
      for (const el of anchors) {
        if (el.getBoundingClientRect().top <= trigger) {
          current = el.id
        }
      }
      if (current !== activeId) activeId = current
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  })

  function onMobileLinkClick() {
    // Close the <details> after tapping a heading (mobile UX).
    if (detailsEl) detailsEl.open = false
  }
</script>

{#if headings.length > 0}
  {#if variant === 'desktop'}
    <nav aria-label="On this page" class="toc-desktop sticky top-24 text-sm pl-5 border-l border-(--color-border) relative">
      <p class="text-xs font-semibold uppercase tracking-wider text-(--color-text-secondary) mb-3">
        On this page
      </p>
      <ol class="space-y-2">
        {#each headings as h (h.id)}
          <li>
            <a
              href="#{h.id}"
              class="toc-link block py-1 transition-colors duration-150 text-(--color-text-secondary)"
              class:indent-link={h.level === 3}
              class:active={activeId === h.id}
            >
              {h.text}
            </a>
          </li>
        {/each}
      </ol>
    </nav>
  {:else}
    <details bind:this={detailsEl} class="toc-mobile rounded-xl border border-(--color-border) bg-(--color-bg-secondary) my-4">
      <summary
        class="flex items-center justify-between gap-3 px-4 py-3 cursor-pointer text-sm font-medium text-(--color-text) select-none"
      >
        <span>On this page</span>
        <span class="chev w-4 h-4 inline-flex [&>svg]:w-full [&>svg]:h-full text-(--color-text-secondary)" aria-hidden="true">
          {@html icons.chevronDown}
        </span>
      </summary>
      <ol class="px-4 pb-3 space-y-1.5 text-sm">
        {#each headings as h (h.id)}
          <li>
            <a
              href="#{h.id}"
              onclick={onMobileLinkClick}
              class="block py-1 text-(--color-text-secondary) hover:text-(--color-accent-text) transition-colors"
              class:indent-link={h.level === 3}
            >
              {h.text}
            </a>
          </li>
        {/each}
      </ol>
    </details>
  {/if}
{/if}

<style>
  .indent-link {
    padding-left: 0.75rem;
  }

  /* Desktop active-section indicator: 2px teal bar flush against aside's left delimiter.
     Positioned on the link itself (not li) to keep Svelte scoping reliable. */
  .toc-desktop .toc-link {
    position: relative;
  }

  .toc-desktop .toc-link::before {
    content: '';
    position: absolute;
    left: -0.75rem; /* nav padding-left; lands over aside's border-l */
    top: 0;
    bottom: 0;
    width: 2px;
    background: transparent;
    transition: background-color 150ms ease;
    z-index: 1;
  }

  .toc-desktop .toc-link.active::before {
    background: var(--color-accent);
    left: -0.75rem;
  }

  .toc-desktop .toc-link.indent-link::before {
    /* indent adds 0.75rem to link's left padding; bar still needs to land on aside border */
    left: -0.75rem;
  }

  .toc-link:hover {
    color: var(--color-text);
  }

  .toc-link.active {
    color: var(--color-accent-text);
    font-weight: 600;
  }

  .toc-mobile[open] .chev {
    transform: rotate(180deg);
  }

  .chev {
    transition: transform 200ms ease;
  }

  @media (prefers-reduced-motion: reduce) {
    .chev,
    .toc-link,
    .toc-desktop .toc-link::before {
      transition: none;
    }
  }
</style>
