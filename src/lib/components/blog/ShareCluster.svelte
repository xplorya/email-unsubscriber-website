<script lang="ts">
  import { icons } from '$lib/icons'

  interface Props {
    title: string
    url: string
  }

  let { title, url }: Props = $props()

  const tweetUrl = $derived(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
  )
  const linkedInUrl = $derived(
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  )

  let copied = $state(false)
  let copyError = $state(false)
  let copyTimer: ReturnType<typeof setTimeout> | null = null

  async function onCopy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url)
      } else {
        // Legacy fallback
        const ta = document.createElement('textarea')
        ta.value = url
        ta.setAttribute('readonly', '')
        ta.style.position = 'absolute'
        ta.style.left = '-9999px'
        document.body.appendChild(ta)
        ta.select()
        const ok = document.execCommand('copy')
        document.body.removeChild(ta)
        if (!ok) throw new Error('execCommand copy failed')
      }
      copied = true
      copyError = false
      if (copyTimer) clearTimeout(copyTimer)
      copyTimer = setTimeout(() => {
        copied = false
      }, 2000)
    } catch {
      // Don't lie — don't show "Copied" on failure.
      copied = false
      copyError = true
    }
  }
</script>

<div
  class="share-cluster flex flex-wrap items-center gap-2 my-8 px-4 py-3.5 border border-(--color-border) rounded-xl bg-(--color-bg-secondary)"
>
  <span
    class="text-xs font-semibold uppercase tracking-wider text-(--color-text-secondary) mr-auto"
  >
    Share
  </span>

  <a
    href={tweetUrl}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Share on X"
    class="share-btn inline-flex items-center justify-center w-9 h-9 rounded-full border border-(--color-border) bg-(--color-bg) text-(--color-accent-text) transition-colors focus:outline-none"
  >
    <span class="w-4 h-4 inline-flex [&>svg]:w-full [&>svg]:h-full" aria-hidden="true">
      {@html icons.twitter}
    </span>
  </a>

  <a
    href={linkedInUrl}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Share on LinkedIn"
    class="share-btn inline-flex items-center justify-center w-9 h-9 rounded-full border border-(--color-border) bg-(--color-bg) text-(--color-accent-text) transition-colors focus:outline-none"
  >
    <span class="w-4 h-4 inline-flex [&>svg]:w-full [&>svg]:h-full" aria-hidden="true">
      {@html icons.linkedin}
    </span>
  </a>

  <button
    type="button"
    onclick={onCopy}
    aria-label="Copy link to this post"
    class="share-btn inline-flex items-center justify-center w-9 h-9 rounded-full border border-(--color-border) bg-(--color-bg) text-(--color-accent-text) transition-colors focus:outline-none"
  >
    <span class="w-4 h-4 inline-flex [&>svg]:w-full [&>svg]:h-full" aria-hidden="true">
      {@html icons.copy}
    </span>
  </button>

  <span
    role="status"
    aria-live="polite"
    class="copy-feedback text-xs font-medium text-(--color-accent-text) ml-1 transition-[opacity,transform] duration-200"
    class:visible={copied}
  >
    {#if copied}Copied{/if}
    {#if copyError}<span class="sr-only">Copy failed</span>{/if}
  </span>
</div>

<style>
  .share-btn:hover {
    color: var(--color-accent-hover);
    border-color: var(--color-accent-border);
    background: var(--color-accent-light);
  }

  .share-btn:focus-visible {
    box-shadow: 0 0 0 3px var(--color-accent-glow);
    border-color: var(--color-accent);
  }

  .copy-feedback {
    opacity: 0;
    transform: translateY(2px);
  }

  .copy-feedback.visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    .copy-feedback {
      transition: none;
    }
    .share-btn {
      transition: none;
    }
  }
</style>
