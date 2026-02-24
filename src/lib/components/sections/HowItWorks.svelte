<script lang="ts">
  import { reveal, revealStaggered } from '$lib/utilities/scroll-reveal'
  import { icons } from '$lib/icons'

  // TODO: - Expanding Footer explaining our features. Might add link to an onboarding here once we got the onboarding

  const steps = [
    {
      number: 1,
      title: 'Connect',
      description:
        'Sign in securely with Google or Microsoft. We use read-only access — no stored passwords, no persistent tokens.',
      icon: icons.shield
    },
    {
      number: 2,
      title: 'Scan',
      description:
        'Your inbox is scanned and processed locally, entirely in your browser. No email content ever leaves your device.',
      icon: icons.search
    },
    {
      number: 3,
      title: 'Unsubscribe',
      description:
        "Review the list and unsubscribe from what you don't want. One click per subscription. That's it.",
      icon: icons.check
    }
  ] as const
</script>

<section id="how-it-works" class="bg-(--color-bg) py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
  <div use:reveal class="max-w-7xl mx-auto">
    <h2 class="text-3xl sm:text-4xl font-bold text-center text-(--color-text)">
      How It Works
    </h2>
    <p class="mt-4 text-center text-(--color-text-secondary) text-lg max-w-2xl mx-auto">
      Easy as 1, 2, 3.
    </p>

    <div class="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
      {#each steps as step, i (step.number)}
        <div use:revealStaggered={{ delay: i * 100 }} class="flex flex-col items-center text-center">
          <div class="relative">
            <div class="w-16 h-16 rounded-full border-2 border-(--color-border) flex items-center justify-center bg-(--color-bg)">
              <span class="inline-block w-7 h-7 text-(--color-primary) [&>svg]:w-full [&>svg]:h-full">{@html step.icon}</span>
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
