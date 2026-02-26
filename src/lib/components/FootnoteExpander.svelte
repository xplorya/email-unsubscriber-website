<script lang="ts">
  import { icons } from '$lib/icons'

  interface Props {
    triggerText: string
    id?: string
    children: import('svelte').Snippet
  }

  let { triggerText, id, children }: Props = $props()

  let isExpanded = $state(false)

  function toggle() {
    isExpanded = !isExpanded
    if (id) {
      if (isExpanded) {
        window.history.replaceState(null, '', `#${id}`)
      } else {
        window.history.replaceState(null, '', window.location.pathname)
      }
    }
  }

  $effect(() => {
    if (id && window.location.hash === `#${id}`) {
      isExpanded = true
      const el = document.getElementById(id)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
      }
    }
  })
</script>

<div class="mt-8 border-t border-(--color-border) pt-6" {id}>
  <button
    onclick={toggle}
    aria-expanded={isExpanded}
    class="group flex w-full items-center gap-2 text-left text-sm italic text-(--color-text-secondary) hover:text-(--color-text) transition-colors cursor-pointer"
  >
    <span class="flex-1">{triggerText}</span>
    <span
      class="inline-flex w-4 h-4 shrink-0 transition-transform duration-300 ease-in-out"
      class:rotate-180={isExpanded}
    >
      {@html icons.chevronDown}
    </span>
  </button>

  <div
    class="expandable-content"
    class:expanded={isExpanded}
    aria-hidden={!isExpanded}
  >
    <div class="pt-4">
      {@render children()}
    </div>
  </div>
</div>

<style>
  .expandable-content {
    display: grid;
    grid-template-rows: 0fr;
    opacity: 0;
    transition:
      grid-template-rows 0.3s ease-in-out,
      opacity 0.3s ease-in-out;
  }

  .expandable-content.expanded {
    grid-template-rows: 1fr;
    opacity: 1;
  }

  .expandable-content > :global(div) {
    overflow: hidden;
  }
</style>
