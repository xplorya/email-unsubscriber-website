<script lang="ts">
  /**
   * Pixel-perfect mirror of one `<tr>` from the real webapp's
   * SubscriptionTable
   *   (webapp/src/modules/dashboard/common/components/SubscriptionTable.svelte:151-230)
   * extracted into a standalone <table> so it works as a marketing chip.
   *
   * Matches the real webapp 1:1:
   *  - 4 <td> cells: Sender / # / Last / Pace
   *  - Sender cell embeds the unsubscribe button next to the sender
   *    text (flex justify-start gap-3) — not a separate cluster.
   *    Real webapp uses fixed col widths + justify-between so the
   *    button sits at the cell's right edge; the marketing chip is
   *    too narrow for that to read as one cohesive row, so we let
   *    the table auto-size and keep the button hugging the sender.
   *  - Last column uses formatLastDate (Apr 24 style)
   *  - border-b only (NOT a full rounded card), hover bg, transition
   *  - opacity-50 on unsubscribed, red bg on violation
   *  - Same warning icon (failure color) for violations,
   *    same inline "Unsubscribed" pill, same getTypeBadgeClasses tones,
   *    same getFrequencyBadgeClasses + getFrequencyLabel
   *
   * No responsive variants — desktop sizes only (post-`sm:` values).
   *
   * State handling:
   *  - `sub` provides the base data; `local.status` is the runtime state.
   *  - `initialStatus` overrides the starting status (decorative use cases
   *    like the violation nugget that reuse the same seed row).
   *  - Click on the unsubscribe button:
   *      violation    → unsubscribed (one-way; matches real-world unsub semantics)
   *      active       → unsubscribed
   *      unsubscribed → active
   *    So the row stays sensible across clicks for any starting status.
   */
  import { untrack } from 'svelte'
  import { icons, iconColor } from '$lib/icons'
  import {
    calculateFrequency,
    getFrequencyLabel,
    getFrequencyBadgeClasses,
    getTypeBadgeClasses,
    type MockSubscription,
    type SubscriptionStatus,
  } from './helpers'
  import { seedRows, MOCK_SCAN_DATE } from './seed-rows'

  interface Props {
    sub?: MockSubscription
    /** Optional override for the starting status (defaults to `sub.status`). */
    initialStatus?: SubscriptionStatus
  }

  let { sub = seedRows[1], initialStatus }: Props = $props()

  // Capture initial sub once so prop swaps don't reset toggled state.
  // `initialStatus` (when provided) wins over `sub.status`.
  let local = $state<MockSubscription>(
    untrack(() => ({
      ...sub,
      status: initialStatus ?? sub.status,
    })),
  )

  const freq = $derived(calculateFrequency(local, MOCK_SCAN_DATE))
  const freqLabel = $derived(getFrequencyLabel(freq))
  const freqClasses = $derived(getFrequencyBadgeClasses(freq))
  const isUnsub = $derived(local.status === 'unsubscribed')
  const isViolation = $derived(local.status === 'violation')

  const buttonTone = $derived(
    getTypeBadgeClasses(isUnsub ? 'none' : local.unsubscribeType),
  )
  const buttonIconColor = $derived(
    (isUnsub ? iconColor.lock : iconColor.mailUnsubscribe) ?? '',
  )

  const rowOpacityClass = $derived(isUnsub ? 'opacity-50' : '')
  const rowViolationClass = $derived(isViolation ? 'bg-red-50 dark:bg-red-950/30' : '')

  function toggle() {
    // violation + active both flip to unsubscribed; unsubscribed flips back to active.
    local = { ...local, status: isUnsub ? 'active' : 'unsubscribed' }
  }
</script>

<div class="w-80 md:w-100">
  <div>
    <div class="flex flex-row justify-between items-center border-b border-(--color-border)">
      <!--        Sender Header-->
      <div class="pt-1 px-2 w-[55%] text-left font-medium text-xs sm:text-sm text-(--color-text-secondary)">
        <button
          class="flex items-center gap-1 'hover:text-(--color-text) cursor-pointer'"
        >
          Sender
        </button>
      </div>
      <div class="w-[5%]"></div>
      <!--        Emails header-->
      <div class="w-[0%] pt-1 text-center font-medium text-xs sm:text-sm text-(--color-text-secondary)">
        <button
          class="flex items-center justify-center w-full 'hover:text-(--color-text) cursor-pointer'"
        >
            <span class="relative">
              #
            </span>
        </button>
      </div>
      <!--        Last Received header-->
      <div class="w-[15%] pt-1 text-start font-medium text-xs sm:text-sm text-(--color-text-secondary)">
        <button
          class="flex items-center justify-center w-full 'hover:text-(--color-text) cursor-pointer'"
        >
            <span class="relative">
              Last
            </span>
        </button>
      </div>
      <!--        Frequency header-->
      <div class="pt-1 pr-5 w-[9%] text-center font-medium text-xs sm:text-sm text-(--color-text-secondary)">
        <button
          class="flex items-center justify-center w-full 'hover:text-(--color-text) cursor-pointer'"
        >
            <span class="relative">
              Pace
            </span>
        </button>
      </div>
    </div>
  </div>
  <div
    class="flex flex-row justify-between items-center border-b border-(--color-border) hover:bg-(--color-bg-secondary) transition-colors {rowOpacityClass} {rowViolationClass}">
    <!--          Sender-->
    <div class="py-2 px-1 sm:py-3 sm:px-2 w-full">
      <div class="flex justify-between items-center gap-2">
        <button
          type="button"
          onclick={() => {}}
          class="text-left 'cursor-pointer' group"
          title='View emails from this sender'
        >
          <div class="font-medium text-xs sm:text-sm text-(--color-text) 'group-hover:underline'">
            {#if isViolation}
                      <span class="inline-block w-3.5 h-3.5 align-text-bottom mr-0.5 {iconColor.failure ?? ''}">
                        {@html icons.warning}
                      </span>
            {/if}
            {local.senderName}
            {#if isUnsub}
              <span class="inline-block px-1.5 py-0.5 text-[9px] sm:text-[10px] font-medium rounded-full bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400">Unsubscribed</span>
            {/if}
          </div>
          <div class="text-[10px] sm:text-xs text-(--color-text-secondary) break-all">{local.senderEmail}</div>
        </button>
        <div class="shrink-0">
          <button
            type="button"
            onclick={toggle}
            class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full {buttonTone} hover:opacity-80 cursor-pointer transition-opacity"
            title="Unsubscribe"
          >
            <div class="w-4 h-4 {buttonIconColor}">{@html icons.mailUnsubscribe}</div>
          </button>
        </div>
      </div>
    </div>
    <!--          #-->
    <div class="py-2 px-1 sm:py-3 sm:px-2 text-center text-xs sm:text-sm text-(--color-text)">
            <span class="inline-flex items-center gap-1">
              {local.emailCount}
            </span>
    </div>
    <!--          Last-->
    <div class="py-2 px-1 sm:py-3 sm:px-2 text-center text-xs sm:text-sm text-(--color-text-secondary) whitespace-nowrap">
      12 Apr
    </div>
    <!--          Pace-->
    <div class="py-2 px-1 sm:py-3 sm:px-2 text-center">
            <span class="inline-flex px-2 py-0.5 text-[10px] sm:text-xs rounded-full {freqClasses}">
              {freqLabel}
            </span>
    </div>
  </div>
</div>
