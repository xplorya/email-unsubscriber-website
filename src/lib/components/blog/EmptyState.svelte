<script lang="ts">
  import { icons } from '$lib/icons'

  interface Props {
    title: string
    message: string
    action?: { label: string; onClick: () => void }
  }

  let { title, message, action }: Props = $props()
</script>

<div
  role="status"
  aria-live="polite"
  class="text-center py-20 px-4 border border-dashed border-(--color-border) rounded-2xl bg-(--color-bg-secondary)"
>
  <span
    class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-(--color-accent-light) text-(--color-accent-text) mb-4"
    aria-hidden="true"
  >
    <span class="w-5 h-5 inline-flex [&>svg]:w-full [&>svg]:h-full">{@html icons.search}</span>
  </span>
  <h3 class="text-xl font-semibold text-(--color-text)">{title}</h3>
  <p class="text-(--color-text-secondary) max-w-md mx-auto mt-2 mb-5 text-[0.9375rem] leading-[1.55]">
    {message}
  </p>
  {#if action}
    <button
      type="button"
      onclick={action.onClick}
      class="inline-flex items-center border border-(--color-border) bg-(--color-bg) px-4 py-2 rounded-lg font-medium text-sm text-(--color-text) hover:border-(--color-accent) hover:text-(--color-accent-text) transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg)"
    >
      {action.label}
    </button>
  {/if}
</div>
