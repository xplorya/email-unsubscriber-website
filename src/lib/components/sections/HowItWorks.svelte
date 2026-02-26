<script lang="ts">
  import { reveal, revealStaggered } from '$lib/utilities/scroll-reveal'
  import { icons } from '$lib/icons'
  import FootnoteExpander from '$lib/components/FootnoteExpander.svelte'
  import FeatureCarousel from '$lib/components/FeatureCarousel.svelte'
  import StepConnector from '$lib/components/StepConnector.svelte'

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

  const featurePages = [
    {
      icon: icons.scan,
      title: 'Email Scanning',
      description: 'Connect your email and scan for subscriptions across your inbox.',
      screenshotFeature: 'email-scanning'
    },
    {
      icon: icons.clock,
      title: 'Scan Periods',
      description: 'Choose how far back to scan — recent emails or your entire inbox history.',
      screenshotFeature: 'scan-periods'
    },
    {
      icon: icons.list,
      title: 'Results List',
      description: 'See all discovered subscriptions organized in a clear, sortable list.',
      screenshotFeature: 'results-list'
    },
    {
      icon: icons.lightbulb,
      title: 'Smart Insights',
      description: "Understand each subscription's frequency, sender info, and relevance.",
      screenshotFeature: 'smart-insights'
    },
    {
      icon: icons.mailX,
      title: 'Unsubscribe Actions',
      description: 'One-tap unsubscribe from unwanted emails — we handle the process.',
      screenshotFeature: 'unsubscribe-actions'
    },
    {
      icon: icons.filter,
      title: 'Filtered View',
      description: 'Filter and sort your results to focus on what matters most.',
      screenshotFeature: 'filtered-view'
    },
    {
      icon: icons.clock,
      title: 'History & Records',
      description: 'Track all your past unsubscribe actions in your profile.',
      screenshotFeature: 'history-records'
    },
    {
      icon: icons.trash,
      title: 'Account Erasing',
      description: 'GDPR-compliant full account deletion — your data, your control.',
      screenshotFeature: 'account-erasing'
    }
  ]
</script>

<section id="how-it-works" class="bg-(--color-bg) py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
  <div use:reveal class="max-w-7xl mx-auto">
    <h2 class="text-3xl sm:text-4xl font-bold text-center text-(--color-text)">
      How It Works
    </h2>
    <p class="mt-4 text-center text-(--color-text-secondary) text-lg max-w-2xl mx-auto">
      Easy as 1, 2, 3.
    </p>

    <div class="mt-12 sm:mt-16 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0">
      {#each steps as step, i (step.number)}
        <div use:revealStaggered={{ delay: i * 100 }} class="group flex flex-col items-center text-center max-w-xs md:max-w-[280px] lg:max-w-sm">
          <div class="relative">
            <div class="icon-glow w-16 h-16 rounded-full border-2 border-(--color-accent-border) flex items-center justify-center bg-(--color-accent-light)">
              <span class="icon-hover-scale inline-block w-7 h-7 text-(--color-accent-text) [&>svg]:w-full [&>svg]:h-full">{@html step.icon}</span>
            </div>
            <span class="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-(--color-accent) text-white text-sm font-bold flex items-center justify-center shadow-sm">
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
        {#if i < steps.length - 1}
          <StepConnector class="my-2 md:my-0 md:mx-4 lg:mx-8 shrink-0" />
        {/if}
      {/each}
    </div>

    <FootnoteExpander id="features-detail" triggerText="Explore all features in detail — tap to learn more">
      <FeatureCarousel pages={featurePages} />
      <p class="mt-6 text-center text-sm text-(--color-text-secondary)/50">
        <span class="inline-flex items-center gap-1.5 cursor-not-allowed" title="Coming soon">
          <span class="w-4 h-4 [&>svg]:w-full [&>svg]:h-full">{@html icons.eye}</span>
          See onboarding guide
          <span class="text-xs px-1.5 py-0.5 rounded bg-(--color-bg-secondary) border border-(--color-border)">Coming soon</span>
        </span>
      </p>
    </FootnoteExpander>
  </div>
</section>
