<script lang="ts">
  import { reveal, revealStaggered } from '$lib/utilities/scroll-reveal'

  const steps = [
    {
      number: 1,
      title: 'Connect',
      description:
        'Sign in securely with Google or Microsoft. We use read-only access — no stored passwords, no persistent tokens.',
      icon: 'shield'
    },
    {
      number: 2,
      title: 'Scan',
      description:
        'Your inbox is scanned entirely in your browser. No email content ever leaves your device. We only look at sender info and unsubscribe links.',
      icon: 'search'
    },
    {
      number: 3,
      title: 'Unsubscribe',
      description:
        "Review the list and unsubscribe from what you don't want. One click per subscription. That's it.",
      icon: 'check'
    }
  ] as const
</script>

<section id="how-it-works" class="bg-(--color-bg-secondary) py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
  <div use:reveal class="max-w-7xl mx-auto">
    <h2 class="text-3xl sm:text-4xl font-bold text-center text-(--color-text)">
      How It Works
    </h2>
    <p class="mt-4 text-center text-(--color-text-secondary) text-lg max-w-2xl mx-auto">
      Three simple steps to a cleaner inbox
    </p>

    <div class="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
      {#each steps as step, i (step.number)}
        <div use:revealStaggered={{ delay: i * 100 }} class="flex flex-col items-center text-center">
          <div class="relative">
            <div class="w-16 h-16 rounded-full border-2 border-(--color-border) flex items-center justify-center bg-(--color-bg)">
              {#if step.icon === 'shield'}
                <svg class="w-7 h-7 text-(--color-primary)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              {:else if step.icon === 'search'}
                <svg class="w-7 h-7 text-(--color-primary)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              {:else}
                <svg class="w-7 h-7 text-(--color-primary)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              {/if}
            </div>
            <span class="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-(--color-button-solid-bg) text-(--color-button-solid-fg) text-sm font-bold flex items-center justify-center">
              {step.number}
            </span>
          </div>

          <h3 class="mt-6 text-xl font-semibold text-(--color-text)">
            {step.title}
          </h3>
          <p class="mt-3 text-(--color-text-secondary) leading-relaxed max-w-sm">
            {step.description}
          </p>
        </div>
      {/each}
    </div>
  </div>
</section>
