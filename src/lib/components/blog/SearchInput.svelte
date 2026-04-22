<script lang="ts">
  import { icons } from '$lib/icons'

  interface Props {
    value: string
    placeholder?: string
  }

  let { value = $bindable(''), placeholder = 'Search posts…' }: Props = $props()
</script>

<div class="relative w-full max-w-[22rem]">
  <span
    class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-(--color-text-secondary) pointer-events-none [&>svg]:w-full [&>svg]:h-full"
    aria-hidden="true"
  >
    {@html icons.search}
  </span>
  <input
    type="search"
    aria-label="Search posts"
    {placeholder}
    bind:value
    class="search-field w-full pl-10 pr-4 py-3 rounded-[10px] border border-(--color-border) bg-(--color-bg) text-(--color-text) placeholder:text-(--color-text-secondary) text-[0.9375rem] transition-[border-color,box-shadow] duration-150"
  />
</div>

<style>
  .search-field:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 4px var(--color-accent-glow);
  }

  @media (prefers-reduced-motion: reduce) {
    .search-field {
      transition: none;
    }
  }
</style>
