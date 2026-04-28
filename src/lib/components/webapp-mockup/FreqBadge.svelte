<script lang="ts">
  /**
   * Mirror of the frequency badge cell in the real webapp at
   *   webapp/src/modules/dashboard/common/components/SubscriptionTable.svelte:225
   * using helpers from `webapp/src/utilities/subscription-helpers.ts`
   * which we've ported verbatim into ./helpers.ts.
   *
   * Matches the wrapper classes byte-for-byte:
   *   inline-flex px-2 py-0.5 text-[10px] sm:text-xs rounded-full {classes}
   */
  import type { EmailFrequency } from './helpers'
  import { getFrequencyLabel, getFrequencyBadgeClasses } from './helpers'

  interface Props {
    freq: EmailFrequency
  }

  let { freq }: Props = $props()

  const classes = $derived(getFrequencyBadgeClasses(freq))
  const label = $derived(getFrequencyLabel(freq))
</script>

<span class="inline-flex px-2 py-0.5 text-[10px] sm:text-xs rounded-full {classes}">
  {label}
</span>
