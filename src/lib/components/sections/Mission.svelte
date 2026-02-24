<script lang="ts">
  import { reveal, revealStaggered } from '$lib/utilities/scroll-reveal'
  import { icons } from '$lib/icons'

  // TODO: - Expanding footer explaining our On-device processing proprietary algorithm, and our open-sourced Auth service with links to repo for verification.

  const points = [
    {
      title: 'We never read your emails',
      description:
        "We don't access, store, or sell email content. Period.",
      icon: icons.shield
    },
    {
      title: 'Everything stays in your browser',
      description:
        'All scanning happens locally in your browser. Your email data never touches our servers. Not during the scan, not after, not ever.',
      icon: icons.monitor
    },
    {
      title: 'Verifiable Zero-Trust approach',
      description: "We don't want you to have to trust us. That's why <span class='font-bold'>your</span> email <code class='text-sm bg-(--color-bg) px-1.5 py-0.5 rounded border border-(--color-border)'>access_token</code> is never sent to, or passed through our servers - and you can verify this.",
      icon: icons.lock
    },
    {
      title: 'Privacy by design, not by marketing',
      description:
        "Most tools say they care about privacy. We built our entire architecture around it. Browser-only features and authentication service segregation isn't a feature - it's the foundation.",
      icon: icons.heart
    }
  ] as const
</script>

<section id="why" class="bg-(--color-bg-secondary) py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
  <div use:reveal class="max-w-7xl mx-auto">
    <h2 class="text-3xl sm:text-4xl font-bold text-center text-(--color-text)">
      Why Email Unsubscriber?
    </h2>
    <p class="mt-4 text-center text-(--color-text-secondary) text-lg max-w-2xl mx-auto">
<!--      Built from the ground up to protect your privacy-->
      We believe your email is your business, not ours.
    </p>

    <div class="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
      {#each points as point, i (point.title)}
        <div use:revealStaggered={{ delay: i * 100 }} class="p-6 sm:p-8 rounded-xl border border-(--color-border) bg-(--color-bg-secondary)">
          <div class="w-12 h-12 rounded-lg bg-(--color-bg) border border-(--color-border) flex items-center justify-center mb-4">
            <span class="inline-block w-6 h-6 text-(--color-primary) [&>svg]:w-full [&>svg]:h-full">{@html point.icon}</span>
          </div>

          <h3 class="text-lg font-semibold text-(--color-text)">
            {point.title}
          </h3>
          <p class="mt-2 text-(--color-text-secondary) leading-relaxed">
            {@html point.description}
          </p>
        </div>
      {/each}
    </div>
  </div>
</section>
