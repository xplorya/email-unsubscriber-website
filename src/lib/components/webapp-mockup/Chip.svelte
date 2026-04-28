<script lang="ts">
  /**
   * Mirror of the inline filter buttons in the real webapp at
   *   webapp/src/modules/dashboard/dashboard-screen/Dashboard.svelte:1287-1340
   *
   * Three tones — active / unsubscribed / violation — with exact
   * Tailwind classes from the source. Inactive chips fade to
   * opacity-40 with a transparent border; active chips show a tone
   * border. Layout is "{count}{label}" with no leading dot.
   */

  type Tone = 'active' | 'unsubscribed' | 'violation'

  interface Props {
    tone: Tone
    /** Whether the filter is currently selected */
    active?: boolean
    count: number
    label: string
    onclick?: () => void
    /**
     * If true, the chip renders as a non-interactive `<span>` (used in
     * the hero floating-chips composition where chips are decorative).
     */
    decorative?: boolean
  }

  let {
    tone,
    active = false,
    count,
    label,
    onclick,
    decorative = false,
  }: Props = $props()

  const baseClasses =
    'inline-block mt-0.5 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-medium rounded-full transition-opacity'

  const toneBg = $derived.by(() => {
    switch (tone) {
      case 'active':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-500 dark:text-gray-100'
      case 'unsubscribed':
        return 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
      case 'violation':
        return 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400'
    }
  })

  const toneBorder = $derived.by(() => {
    if (!active) return 'opacity-40 border border-transparent'
    switch (tone) {
      case 'active':
        return 'border border-gray-600 dark:border-gray-300'
      case 'unsubscribed':
        return 'border border-gray-400 dark:border-gray-500'
      case 'violation':
        return 'border border-red-300 dark:border-red-500'
    }
  })
</script>

{#if decorative}
  <span class="{baseClasses} {toneBg} {toneBorder}">
    <span class="flex items-center">
      {count}
      {label}
    </span>
  </span>
{:else}
  <button
    type="button"
    {onclick}
    aria-pressed={active}
    class="{baseClasses} {toneBg} {toneBorder} cursor-pointer hover:opacity-100 motion-safe:active:scale-95 motion-safe:transition-transform"
  >
    <div class="flex items-center">
      {count}
      {label}
    </div>
  </button>
{/if}
