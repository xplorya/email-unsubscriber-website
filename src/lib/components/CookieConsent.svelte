<script lang="ts">
  import { onMount } from 'svelte'

  const STORAGE_KEY = 'cookie-consent'

  let visible = $state(false)

  onMount(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      // Small delay for a smooth fade-in after page load
      requestAnimationFrame(() => {
        visible = true
      })
    }
  })

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    visible = false
  }

  function reject() {
    localStorage.setItem(STORAGE_KEY, 'rejected')
    visible = false
  }
</script>

{#if visible}
  <div
    class="fixed bottom-0 left-0 right-0 z-40 p-4 sm:p-6 cookie-banner"
    role="dialog"
    aria-label="Cookie consent"
  >
    <div
      class="mx-auto max-w-4xl rounded-xl border border-(--color-border) bg-(--color-bg) p-4 sm:p-6 shadow-lg"
    >
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-sm text-(--color-text-secondary) sm:flex-1">
          We use cookies to improve your experience. By continuing to browse, you agree to our
          <a
            href="/privacy"
            class="underline text-(--color-text-link) hover:text-(--color-text) transition-colors"
          >
            Privacy Policy</a
          >.
        </p>
        <div class="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
          <button
            onclick={reject}
            class="px-4 py-2 text-sm font-medium rounded-lg text-(--color-button-ghost-fg) hover:text-(--color-button-ghost-fg-hover) hover:bg-(--color-button-ghost-bg-hover) transition-colors"
          >
            Reject Non-Essential
          </button>
          <button
            onclick={accept}
            class="px-4 py-2 text-sm font-medium rounded-lg bg-(--color-button-solid-bg) text-(--color-button-solid-fg) hover:bg-(--color-button-solid-bg-hover) transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .cookie-banner {
    animation: fade-in 300ms ease-out;
  }

  @media (prefers-reduced-motion: reduce) {
    .cookie-banner {
      animation: none;
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(1rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
