<script lang="ts">
  interface Props {
    label: string
    count?: number
    active?: boolean
    onclick?: () => void
  }

  let { label, count, active = false, onclick }: Props = $props()
</script>

<button
  type="button"
  {onclick}
  aria-pressed={active}
  class="chip inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] sm:min-h-0 rounded-full border text-sm font-medium whitespace-nowrap transition-[background,color,border-color,box-shadow,transform] duration-150 focus:outline-none"
  class:chip-active={active}
  class:chip-idle={!active}
>
  <span>{label}</span>
  {#if count !== undefined}
    <span
      class="count-badge text-[0.7rem] px-1.5 py-[1px] rounded-full font-medium"
      class:active
    >
      {count}
    </span>
  {/if}
</button>

<style>
  .chip-idle {
    background: transparent;
    border-color: var(--color-border);
    color: var(--color-text-secondary);
  }

  .chip-idle:hover {
    color: var(--color-text);
    border-color: var(--color-text-secondary);
  }

  .chip-active {
    background: var(--color-accent);
    color: #fff;
    border-color: var(--color-accent);
    font-weight: 600;
  }

  .chip:focus-visible {
    box-shadow: 0 0 0 4px var(--color-accent-glow);
    border-color: var(--color-accent);
  }

  .count-badge {
    background: color-mix(in srgb, currentColor 12%, transparent);
  }

  .count-badge.active {
    background: rgba(255, 255, 255, 0.22);
  }

  @media (prefers-reduced-motion: reduce) {
    .chip {
      transition: none;
    }
  }
</style>
