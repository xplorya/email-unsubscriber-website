<script lang="ts">
  /**
   * Mirror of webapp/src/modules/dashboard/common/components/SubscriptionTable.svelte.
   *
   * The internal `<table>` matches the real webapp byte-for-byte:
   *   - Column widths: 75% / 3% / 9% / 9%
   *   - Headers: Sender / # / Last / Pace
   *   - Sort arrows positioned absolutely with invisible placeholder
   *     for layout stability on numeric columns
   *   - Sender cell: warning icon on violation, "Unsubscribed" pill,
   *     mailUnsubscribe → lock swap on unsubscribe
   *   - Pace cell: FreqBadge using calculateFrequency + helpers
   *   - Empty state copy matches verbatim
   *
   * The chrome around the table (scope selector, rescan button,
   * title + filter chips) is added so the component renders standalone
   * for marketing previews. In the real webapp those live in the
   * parent Dashboard screen.
   */
  import { untrack } from 'svelte'
  import { SvelteSet } from 'svelte/reactivity'
  import { icons, iconColor } from '$lib/icons'
  import Chip from './Chip.svelte'
  import FreqBadge from './FreqBadge.svelte'
  import ScopeSelector from './ScopeSelector.svelte'
  import {
    calculateFrequency,
    getTypeBadgeClasses,
    formatLastDate,
    FREQ_ORDER,
    type EmailFrequency,
    type MockSubscription,
    type SubscriptionStatus,
    type ShortScope,
  } from './helpers'
  import { seedRows as defaultSeed, MOCK_SCAN_DATE } from './seed-rows'

  interface Props {
    seed?: MockSubscription[]
    /** Default true so sort works in marketing preview */
    isPaid?: boolean
    /** Compact body padding for the marketing card */
    compact?: boolean
  }

  let { seed = defaultSeed, isPaid = true, compact = false }: Props = $props()

  type SortField = 'senderName' | 'emailCount' | 'lastEmailDate' | 'frequency'
  type SortDirection = 'asc' | 'desc'

  // Local mutable state — clone seed once, never re-clone on prop change
  let rows = $state<MockSubscription[]>(untrack(() => seed.map(r => ({ ...r }))))

  let scope = $state<ShortScope>('6m')
  const activeFilters = new SvelteSet<SubscriptionStatus>(['active'])
  let sortField = $state<SortField>('lastEmailDate')
  let sortDirection = $state<SortDirection>('desc')

  const scopeValues: ShortScope[] = ['7d', '30d', '6m', '12m']
  const scopeIndex = $derived(scopeValues.indexOf(scope))

  const counts = $derived({
    active: rows.filter(r => r.status === 'active').length,
    unsubscribed: rows.filter(r => r.status === 'unsubscribed').length,
    violation: rows.filter(r => r.status === 'violation').length,
  })

  const filtered = $derived(rows.filter(r => activeFilters.has(r.status)))

  const sortedSubscriptions = $derived(
    [...filtered].sort((a, b) => {
      let comparison = 0
      switch (sortField) {
        case 'senderName':
          comparison = a.senderName.localeCompare(b.senderName)
          break
        case 'emailCount':
          comparison = a.emailCount - b.emailCount
          break
        case 'lastEmailDate':
          comparison = a.lastEmailDate.getTime() - b.lastEmailDate.getTime()
          break
        case 'frequency':
          comparison =
            FREQ_ORDER[calculateFrequency(a, MOCK_SCAN_DATE) as EmailFrequency] -
            FREQ_ORDER[calculateFrequency(b, MOCK_SCAN_DATE) as EmailFrequency]
          break
      }
      return sortDirection === 'asc' ? comparison : -comparison
    }),
  )

  function toggleSort(field: SortField) {
    if (!isPaid) return
    if (sortField === field) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc'
    } else {
      sortField = field
      sortDirection = 'desc'
    }
  }

  function toggleFilter(status: SubscriptionStatus) {
    if (activeFilters.has(status)) {
      activeFilters.delete(status)
    } else {
      activeFilters.add(status)
    }
  }

  function unsubscribe(id: string) {
    rows = rows.map(r => (r.id === id ? { ...r, status: 'unsubscribed' as SubscriptionStatus } : r))
  }
</script>

<div class={compact ? 'px-3 py-2 sm:px-4' : 'px-3.5 py-3 sm:px-4 sm:py-3.5'}>
  <!-- Toolbar: scope selector + rescan -->
  <div class="flex gap-2.5 pb-3.5 items-stretch">
    <div class="flex-1 h-8">
      <ScopeSelector
        values={[...scopeValues]}
        selectedValueIndex={scopeIndex}
        onSelect={(v) => (scope = v as ShortScope)}
        ariaLabel="Scan time period"
      />
    </div>
    <button
      type="button"
      class="px-3 py-1.5 rounded-md bg-transparent text-(--color-text) border border-(--color-border) text-[13px] font-medium cursor-pointer hover:bg-(--color-bg-secondary-solid) transition-colors"
    >
      Rescan
    </button>
  </div>

  <!-- Title -->
  <div class="pt-1 pb-1">
    <h3 class="text-[18px] font-semibold text-(--color-text) tracking-tight m-0">
      {rows.length} Subscriptions found
    </h3>
  </div>

  <!-- Filter chips — same conditional visibility as real webapp -->
  <div class="flex flex-wrap gap-2 mb-0 pt-2 pb-3">
    {#if counts.active > 0}
      <Chip
        tone="active"
        active={activeFilters.has('active')}
        count={counts.active}
        label="Active"
        onclick={() => toggleFilter('active')}
      />
    {/if}
    {#if counts.unsubscribed > 0}
      <Chip
        tone="unsubscribed"
        active={activeFilters.has('unsubscribed')}
        count={counts.unsubscribed}
        label="Unsubscribed"
        onclick={() => toggleFilter('unsubscribed')}
      />
    {/if}
    {#if counts.violation > 0}
      <Chip
        tone="violation"
        active={activeFilters.has('violation')}
        count={counts.violation}
        label="Still emailing"
        onclick={() => toggleFilter('violation')}
      />
    {/if}
  </div>

  <!-- Table — byte-for-byte parity with SubscriptionTable -->
  <div class="overflow-x-clip relative">
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b border-(--color-border)">
          <!-- Sender Header -->
          <th class="py-1 px-2 w-[75%] text-left font-medium text-xs sm:text-sm text-(--color-text-secondary)">
            <button
              type="button"
              onclick={() => toggleSort('senderName')}
              disabled={!isPaid}
              class="flex items-center gap-1 {isPaid ? 'hover:text-(--color-text) cursor-pointer' : 'cursor-not-allowed opacity-60'}"
              title={isPaid ? '' : 'Purchase access to enable sorting'}
            >
              Sender
              {#if sortField === 'senderName'}
                <span class="text-xs">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              {/if}
            </button>
          </th>
          <!-- # Header -->
          <th class="py-1 px-2 w-[3%] text-center font-medium text-xs sm:text-sm text-(--color-text-secondary)">
            <button
              type="button"
              onclick={() => toggleSort('emailCount')}
              disabled={!isPaid}
              class="flex items-center justify-center w-full {isPaid ? 'hover:text-(--color-text) cursor-pointer' : 'cursor-not-allowed opacity-60'}"
              title={isPaid ? '' : 'Purchase access to enable sorting'}
            >
              <span class="relative">
                #
                {#if sortField === 'emailCount'}
                  <span class="absolute -right-3 top-0 text-xs sm:text-sm">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                {:else}
                  <span class="absolute -right-3 top-0 text-xs sm:text-sm invisible">↓</span>
                {/if}
              </span>
            </button>
          </th>
          <!-- Last Header -->
          <th class="py-1 px-2 w-[9%] text-start font-medium text-xs sm:text-sm text-(--color-text-secondary)">
            <button
              type="button"
              onclick={() => toggleSort('lastEmailDate')}
              disabled={!isPaid}
              class="flex items-center justify-center w-full {isPaid ? 'hover:text-(--color-text) cursor-pointer' : 'cursor-not-allowed opacity-60'}"
              title={isPaid ? '' : 'Purchase access to enable sorting'}
            >
              <span class="relative">
                Last
                {#if sortField === 'lastEmailDate'}
                  <span class="absolute -right-3 top-0 text-xs sm:text-sm">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                {:else}
                  <span class="absolute -right-3 top-0 text-xs sm:text-sm invisible">↓</span>
                {/if}
              </span>
            </button>
          </th>
          <!-- Pace Header -->
          <th class="py-1 px-2 w-[9%] text-center font-medium text-xs sm:text-sm text-(--color-text-secondary)">
            <button
              type="button"
              onclick={() => toggleSort('frequency')}
              disabled={!isPaid}
              class="flex items-center justify-center w-full {isPaid ? 'hover:text-(--color-text) cursor-pointer' : 'cursor-not-allowed opacity-60'}"
              title={isPaid ? '' : 'Purchase access to enable sorting'}
            >
              <span class="relative">
                Pace
                {#if sortField === 'frequency'}
                  <span class="absolute -right-3 top-0 text-xs sm:text-sm">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                {:else}
                  <span class="absolute -right-3 top-0 text-xs sm:text-sm invisible">↓</span>
                {/if}
              </span>
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {#each sortedSubscriptions as sub (sub.id)}
          {@const buttonTone = getTypeBadgeClasses(sub.status === 'unsubscribed' ? 'none' : sub.unsubscribeType)}
          {@const buttonIconColor = (sub.status === 'unsubscribed' ? iconColor.lock : iconColor.mailUnsubscribe) ?? ''}
          <tr
            class="result-row border-b border-(--color-border) hover:bg-(--color-bg-secondary) transition-colors {sub.status === 'unsubscribed' ? 'opacity-50' : ''} {sub.status === 'violation' ? 'bg-red-50 dark:bg-red-950/30' : ''}"
          >
            <!-- Sender -->
            <td class="py-2 px-1 sm:py-3 sm:px-2">
              <div class="flex justify-between items-center gap-2">
                <div class="text-left">
                  <div class="font-medium text-xs sm:text-sm text-(--color-text)">
                    {#if sub.status === 'violation'}
                      <span class="inline-block w-3.5 h-3.5 align-text-bottom mr-0.5 {iconColor.warning ?? ''}">
                        {@html icons.warning}
                      </span>
                    {/if}
                    {sub.senderName}
                    {#if sub.status === 'unsubscribed'}
                      <span class="inline-block px-1.5 py-0.5 text-[9px] sm:text-[10px] font-medium rounded-full bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400">Unsubscribed</span>
                    {/if}
                  </div>
                  <div class="text-[10px] sm:text-xs text-(--color-text-secondary) break-all">{sub.senderEmail}</div>
                </div>
                <div class="shrink-0">
                  <button
                    type="button"
                    class="unsub-btn inline-flex items-center gap-1 px-2 py-0.5 rounded-full {buttonTone} hover:opacity-80 cursor-pointer transition-opacity border-0"
                    title="Unsubscribe"
                    onclick={() => unsubscribe(sub.id)}
                  >
                    <div class="w-4 h-4 {buttonIconColor}">
                      {#if sub.status === 'unsubscribed'}
                        {@html icons.lock}
                      {:else}
                        {@html icons.mailUnsubscribe}
                      {/if}
                    </div>
                  </button>
                </div>
              </div>
            </td>
            <!-- # -->
            <td class="py-2 px-1 sm:py-3 sm:px-2 text-center text-xs sm:text-sm text-(--color-text)">
              <span class="inline-flex items-center gap-1">{sub.emailCount}</span>
            </td>
            <!-- Last -->
            <td class="py-2 px-1 sm:py-3 sm:px-2 text-center text-xs sm:text-sm text-(--color-text-secondary) whitespace-nowrap">
              {formatLastDate(sub.lastEmailDate)}
            </td>
            <!-- Pace -->
            <td class="py-2 px-1 sm:py-3 sm:px-2 text-center">
              <FreqBadge freq={calculateFrequency(sub, MOCK_SCAN_DATE)} />
            </td>
          </tr>
        {/each}
      </tbody>
    </table>

    {#if sortedSubscriptions.length === 0}
      <div class="py-12 px-5 text-center text-sm text-(--color-text-secondary)">
        Scanning... Please wait or tap "Stop" to see the results we've gathered so far.
      </div>
    {/if}
  </div>
</div>
