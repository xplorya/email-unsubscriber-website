<script lang="ts">
  /**
   * Marketing-site mockup of the webapp Profile-page
   * "Email / Erase Account" card.
   *
   * Self-contained — no API, no real InfoTooltip, no SkeletonLoader,
   * no analytics. State machine matches webapp's `EraseState`:
   *   default -> confirm -> loading -> success
   *
   * The success state auto-resets after a short idle window so the
   * marketing demo loops without forcing a tap. The "Good Bye"
   * button still resets immediately when tapped.
   *
   * Source markup:
   *   webapp/src/modules/dashboard/dashboard-screen/components/Profile.svelte:476-578
   */
  import { slide } from 'svelte/transition'
  import { onDestroy } from 'svelte'

  interface Props {
    /** Email shown in card + required for "Erase" button to enable. */
    email: string
    /** Simulated network delay before landing on `success`. */
    loadingMs?: number
    /** Auto-reset from success → default. 0 disables auto-reset. */
    successAutoResetMs?: number
  }

  let {
    email,
    loadingMs = 1500,
    successAutoResetMs = 4000,
  }: Props = $props()

  type EraseState = 'default' | 'confirm' | 'loading' | 'success'
  let eraseState = $state<EraseState>('default')
  let eraseConfirmInput = $state('')

  const eraseInputMatches = $derived(eraseConfirmInput === email)

  let loadingTimer: ReturnType<typeof setTimeout> | null = null
  let successTimer: ReturnType<typeof setTimeout> | null = null

  function clearTimers() {
    if (loadingTimer) {
      clearTimeout(loadingTimer)
      loadingTimer = null
    }
    if (successTimer) {
      clearTimeout(successTimer)
      successTimer = null
    }
  }

  function reset() {
    clearTimers()
    eraseState = 'default'
    eraseConfirmInput = ''
  }

  function startErase() {
    if (eraseState === 'default') {
      eraseState = 'confirm'
    } else {
      reset()
    }
  }

  function handleErase() {
    if (!eraseInputMatches) return
    eraseState = 'loading'
    clearTimers()
    loadingTimer = setTimeout(() => {
      loadingTimer = null
      eraseState = 'success'
      if (successAutoResetMs > 0) {
        successTimer = setTimeout(() => {
          successTimer = null
          reset()
        }, successAutoResetMs)
      }
    }, loadingMs)
  }

  onDestroy(clearTimers)
</script>

<div class="rounded-lg border border-(--color-border) bg-(--color-bg-secondary) p-4 text-left">
  <div class="flex flex-col gap-0">
    <div class="flex flex-row justify-between items-center">
      <h3 class="text-sm font-medium text-(--color-text)">Email</h3>
      <!-- Decorative info icon — non-interactive (real one has tooltip) -->
      <span
        class="inline-block w-4 h-4 text-(--color-text-secondary) opacity-70 [&>svg]:w-full [&>svg]:h-full"
        aria-hidden="true"
      >
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      </span>
    </div>
    <div class="flex flex-row justify-between items-center gap-3">
      <p class="text-sm text-(--color-text-secondary) truncate">{email}</p>
      {#if eraseState !== 'success'}
        <button
          type="button"
          onclick={startErase}
          class="px-3 py-0.5 text-xs font-medium rounded-md border transition-colors shrink-0
            bg-(--color-button-ghost-bg) text-(--color-button-ghost-fg) border-(--color-button-ghost-fg) cursor-pointer"
        >
          {eraseState === 'default' ? 'Erase Account' : 'Cancel'}
        </button>
      {/if}
    </div>
  </div>

  {#if eraseState === 'confirm'}
    <div
      class="mt-4 pt-4 border-t border-(--color-border)"
      transition:slide={{ duration: 200 }}
    >
      <p class="text-sm text-(--color-text-secondary) mb-3">
        <span class="text-rose-700 dark:text-rose-400">This action cannot be reversed!</span>
        <br />
        Please, type your email below and hit 'Erase' to confirm.
      </p>
      <div class="flex items-center gap-2">
        <input
          type="text"
          bind:value={eraseConfirmInput}
          placeholder={email}
          autocomplete="off"
          spellcheck="false"
          class="flex-1 min-w-0 px-3 py-1 text-xs rounded-md border border-(--color-border) bg-(--color-bg) text-(--color-text) placeholder:text-(--color-text-secondary) placeholder:opacity-40 focus:outline-none focus:ring-1 focus:ring-(--color-border)"
        />
        <button
          type="button"
          onclick={handleErase}
          disabled={!eraseInputMatches}
          class="px-3 py-1 text-xs font-medium rounded-md border transition-colors shrink-0
            {eraseInputMatches
              ? 'bg-rose-700 text-rose-50 border-rose-700 hover:bg-rose-600 hover:text-white hover:border-rose-600 cursor-pointer'
              : 'bg-(--color-bg) text-(--color-text-secondary) border-(--color-border) opacity-50 cursor-default'}"
        >
          Erase
        </button>
      </div>
    </div>
  {:else if eraseState === 'loading'}
    <div
      class="mt-4 pt-4 border-t border-(--color-border)"
      transition:slide={{ duration: 200 }}
    >
      <div class="flex items-center gap-3 py-2">
        <svg
          class="w-4 h-4 animate-spin text-(--color-text-secondary) shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p class="text-sm text-(--color-text-secondary)">Deleting your data...</p>
      </div>
    </div>
  {:else if eraseState === 'success'}
    <div
      class="mt-4 pt-4 border-t border-(--color-border)"
      transition:slide={{ duration: 200 }}
    >
      <div class="flex flex-col items-center gap-3 py-2">
        <div class="flex items-center gap-2">
          <span
            class="inline-block w-6 h-6 text-teal-600 dark:text-teal-400 [&>svg]:w-full [&>svg]:h-full"
            aria-hidden="true"
          >
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </span>
          <p class="text-sm text-(--color-text)">Your data has been erased.</p>
        </div>
        <button
          type="button"
          onclick={reset}
          class="px-4 py-1.5 text-sm font-medium rounded-md bg-(--color-button-solid-bg) text-(--color-button-solid-fg) hover:bg-(--color-button-solid-bg-hover) transition-colors cursor-pointer"
        >
          Good Bye
        </button>
      </div>
    </div>
  {/if}
</div>
