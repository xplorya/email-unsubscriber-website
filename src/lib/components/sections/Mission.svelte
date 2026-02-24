<script lang="ts">
  import { reveal, revealStaggered } from '$lib/utilities/scroll-reveal'

  const points = [
    {
      title: 'We never read your emails',
      description:
        "We don't access, store, or sell email content. Period. We only look at sender addresses and unsubscribe links — the metadata, not the message.",
      icon: 'shield'
    },
    {
      title: 'Everything stays in your browser',
      description:
        'All scanning happens locally in your browser. Your email data never touches our servers. Not during the scan, not after, not ever.',
      icon: 'browser'
    },
    {
      title: 'No persistent access',
      description:
        "After your scan is complete, we don't retain any connection to your inbox. No stored OAuth tokens, no background access, no surprises.",
      icon: 'lock'
    },
    {
      title: 'Privacy by design, not by marketing',
      description:
        "Most tools say they care about privacy. We built our entire architecture around it. Browser-only processing isn't a feature — it's the foundation.",
      icon: 'heart'
    }
  ] as const
</script>

<section id="why" class="bg-(--color-bg) py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
  <div use:reveal class="max-w-7xl mx-auto">
    <h2 class="text-3xl sm:text-4xl font-bold text-center text-(--color-text)">
      Why Email Unsubscriber?
    </h2>
    <p class="mt-4 text-center text-(--color-text-secondary) text-lg max-w-2xl mx-auto">
      Built from the ground up to protect your privacy
    </p>

    <div class="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
      {#each points as point, i (point.title)}
        <div use:revealStaggered={{ delay: i * 100 }} class="p-6 sm:p-8 rounded-xl border border-(--color-border) bg-(--color-bg-secondary)">
          <div class="w-12 h-12 rounded-lg bg-(--color-bg) border border-(--color-border) flex items-center justify-center mb-4">
            {#if point.icon === 'shield'}
              <svg class="w-6 h-6 text-(--color-primary)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            {:else if point.icon === 'browser'}
              <svg class="w-6 h-6 text-(--color-primary)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            {:else if point.icon === 'lock'}
              <svg class="w-6 h-6 text-(--color-primary)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            {:else}
              <svg class="w-6 h-6 text-(--color-primary)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            {/if}
          </div>

          <h3 class="text-lg font-semibold text-(--color-text)">
            {point.title}
          </h3>
          <p class="mt-2 text-(--color-text-secondary) leading-relaxed">
            {point.description}
          </p>
        </div>
      {/each}
    </div>
  </div>
</section>
