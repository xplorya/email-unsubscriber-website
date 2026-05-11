<script lang="ts">
  import { onMount } from 'svelte'
  import { icons } from '$lib/icons'

  interface Props {
    title: string
    url: string
  }

  let { title, url }: Props = $props()

  const shareMessage = $derived(`${title}\n${url}`)

  const tweetUrl = $derived(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
  )
  const whatsappUrl = $derived(`https://wa.me/?text=${encodeURIComponent(shareMessage)}`)
  const telegramUrl = $derived(
    `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
  )
  const facebookUrl = $derived(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  )
  const messengerUrl = $derived(`fb-messenger://share/?link=${encodeURIComponent(url)}`)
  const linkedInUrl = $derived(
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  )
  const mailtoUrl = $derived(
    `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Thought you'd find this interesting:\n\n${title}\n${url}`)}`
  )

  let copied = $state(false)
  let copyError = $state(false)
  let copyTimer: ReturnType<typeof setTimeout> | null = null

  let canNativeShare = $state(false)

  onMount(() => {
    canNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function'
  })

  async function copyText(text: string): Promise<boolean> {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
        return true
      }
      // Legacy fallback
      const ta = document.createElement('textarea')
      ta.value = text
      ta.setAttribute('readonly', '')
      ta.style.position = 'absolute'
      ta.style.left = '-9999px'
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(ta)
      return ok
    } catch {
      return false
    }
  }

  async function onCopy() {
    const ok = await copyText(url)
    if (ok) {
      copied = true
      copyError = false
      if (copyTimer) clearTimeout(copyTimer)
      copyTimer = setTimeout(() => {
        copied = false
      }, 2000)
    } else {
      copied = false
      copyError = true
    }
  }

  async function shareNative() {
    try {
      await navigator.share({ title, text: title, url })
    } catch {
      // User cancelled or unavailable — silently ignore
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
    class="share-btn"
  >
    <span class="icon-slot" aria-hidden="true">{@html icons.twitter}</span>
  </a>

  <a
    href={whatsappUrl}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Share on WhatsApp"
    class="share-btn"
  >
    <span class="icon-slot" aria-hidden="true">{@html icons.whatsapp}</span>
  </a>

  <a
    href={telegramUrl}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Share on Telegram"
    class="share-btn"
  >
    <span class="icon-slot" aria-hidden="true">{@html icons.telegram}</span>
  </a>

  <a
    href={facebookUrl}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Share on Facebook"
    class="share-btn"
  >
    <span class="icon-slot" aria-hidden="true">{@html icons.facebook}</span>
  </a>

  <a
    href={messengerUrl}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Share on Messenger"
    class="share-btn"
  >
    <span class="icon-slot" aria-hidden="true">{@html icons.messenger}</span>
  </a>

  <a
    href={linkedInUrl}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Share on LinkedIn"
    class="share-btn"
  >
    <span class="icon-slot" aria-hidden="true">{@html icons.linkedin}</span>
  </a>

  <a
    href={mailtoUrl}
    aria-label="Share via email"
    class="share-btn"
  >
    <span class="icon-slot" aria-hidden="true">{@html icons.email}</span>
  </a>

  <button
    type="button"
    onclick={onCopy}
    aria-label="Copy link to this post"
    class="share-btn"
  >
    <span class="icon-slot" aria-hidden="true">{@html icons.copy}</span>
  </button>

  {#if canNativeShare}
    <button
      type="button"
      onclick={shareNative}
      aria-label="Share via system share sheet"
      class="share-btn"
    >
      <span class="icon-slot" aria-hidden="true">{@html icons.shareNative}</span>
    </button>
  {/if}

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
  .share-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 9999px;
    border: 1px solid var(--color-border);
    background: var(--color-bg);
    color: var(--color-accent-text);
    transition:
      color 0.15s,
      background 0.15s,
      border-color 0.15s;
  }

  .share-btn:focus {
    outline: none;
  }

  .share-btn:hover {
    color: var(--color-accent-hover);
    border-color: var(--color-accent-border);
    background: var(--color-accent-light);
  }

  .share-btn:focus-visible {
    box-shadow: 0 0 0 3px var(--color-accent-glow);
    border-color: var(--color-accent);
  }

  .icon-slot {
    display: inline-flex;
    width: 1rem;
    height: 1rem;
  }

  .icon-slot :global(svg) {
    width: 100%;
    height: 100%;
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
