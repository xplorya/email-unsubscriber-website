<script lang="ts">
  /**
   * Marketing-site mockup of the webapp Profile-page
   * "Unsubscribe Attempts History" card.
   *
   * Self-contained — no API, no real InfoTooltip, no SkeletonLoader,
   * no spinner. The trash button is interactive but UI-only:
   * clicking removes the entry from local state with a fade/slide.
   *
   * Source markup:
   *   webapp/src/modules/dashboard/dashboard-screen/components/Profile.svelte:823-906
   */
  import { fly } from 'svelte/transition'
  import { icons } from '$lib/icons'
  import { formatUnsubDate, type UnsubRecord } from '$lib/components/webapp-mockup/helpers'

  interface Props {
    records: UnsubRecord[]
  }

  let { records }: Props = $props()

  // Track locally-deleted ids so the trash click is a real visual
  // interaction without mutating the caller's seed array.
  let deletedIds = $state<Set<string>>(new Set())
  const visibleRecords = $derived(records.filter((r) => !deletedIds.has(r.id)))

  function deleteRecord(id: string) {
    deletedIds = new Set([...deletedIds, id])
  }
</script>

<div class="rounded-lg border border-(--color-border) bg-(--color-bg-secondary) p-4 text-left">
  <div class="flex items-center justify-between mb-3">
    <h3 class="text-sm font-medium text-(--color-text)">Unsubscribe Attempts History</h3>
    <!-- Decorative info icon — non-interactive (real one has tooltip) -->
    <span
      class="inline-block w-4 h-4 text-(--color-text-secondary) opacity-70 [&>svg]:w-full [&>svg]:h-full"
      aria-hidden="true"
    >
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    </span>
  </div>

  {#if visibleRecords.length === 0}
    <p class="text-sm text-(--color-text-secondary)">No unsubscribe history yet.</p>
  {:else}
    <div class="space-y-3">
      {#each visibleRecords as record (record.id)}
        <div
          class="flex items-start text-start justify-between gap-3"
          out:fly={{ x: -16, duration: 220 }}
        >
          <div class="flex-1 min-w-0">
            <div class="text-sm font-medium text-(--color-text) truncate">{record.sender_name}</div>
            <div class="text-xs text-(--color-text-secondary) truncate">{record.sender_email}</div>
            <div class="flex gap-3 items-center">
              <p class="text-[9px] text-(--color-text-secondary) mt-0.5">
                {formatUnsubDate(record.created_at)}
              </p>
              <span
                class="inline-block mt-0.5 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-medium rounded-full bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
              >
                Unsubscribed
              </span>
            </div>
          </div>
          <button
            type="button"
            onclick={() => deleteRecord(record.id)}
            aria-label="Delete unsubscribe record for {record.sender_email}"
            class="p-1.5 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-red-500 hover:text-red-600 shrink-0 cursor-pointer"
          >
            <span class="inline-block w-4 h-4 [&>svg]:w-full [&>svg]:h-full">
              {@html icons.trash}
            </span>
          </button>
        </div>
      {/each}
    </div>
  {/if}
</div>
