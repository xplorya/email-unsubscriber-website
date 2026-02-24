<script lang="ts">
  import { reveal } from '$lib/utilities/scroll-reveal'
  import { APP_URL } from '$lib/utilities/constants'

  /** Placeholder price — update with the real value */
  const PRICE = '€2.99'

  const antiSubscription = [
    'No commitment',
    'No subscription',
    'No "pay-as-you-go"',
    'No referrals cap',
    'No auto-renewal',
    'No tiers'
  ]

  const ourPricingProposition = [
    'You Pay Only When You Want',
    'You get fixed access for a fixed price',
    'No tiers',
    'No annual subscription',
    'No hidden charges',
    'No auto-renewal'
  ]
</script>

<section id="pricing" class="bg-(--color-bg-secondary) py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
  <div use:reveal class="max-w-7xl mx-auto">
    <h2 class="text-3xl sm:text-4xl font-bold text-center text-(--color-text)">
      Pricing can't be simpler
    </h2>

    <!-- Pricing Card -->
    <div class="mt-12 sm:mt-16 max-w-md mx-auto">
      <div class="rounded-2xl border-2 border-(--color-border) bg-(--color-bg) p-8 sm:p-10 text-center shadow-sm">
        <p class="text-5xl sm:text-6xl font-bold text-(--color-text)">
          {PRICE}
        </p>
        <p class="mt-2 text-lg font-medium text-(--color-primary)">
          One-Time Payment
        </p>
        <p class="mt-4 text-(--color-text-secondary)">
          One price. Unlimited usage. 30 days. No strings attached.
        </p>

        <a
          href={APP_URL}
          class="mt-8 inline-block w-full px-6 py-3.5 text-lg font-semibold rounded-lg bg-(--color-button-solid-bg) text-(--color-button-solid-fg) hover:bg-(--color-button-solid-bg-hover) transition-colors duration-200"
        >
          Get Started
        </a>
      </div>
    </div>

    <!-- Anti-subscription messaging -->
    <div class="flex flex-row mt-10 sm:mt-12 max-w-md mx-auto justify-between">
      <ul class="space-y-3">
        {#each antiSubscription as item (item)}
          <li class="flex items-center gap-3 text-(--color-text-secondary)">
            <span class="shrink-0 text-red-400 decoration-2" aria-hidden="true">&#10007;</span>
            <span class="line-through decoration-(--color-text-secondary)/40">{item}</span>
          </li>
        {/each}
      </ul>
      <ul class="space-y-3">
        {#each ourPricingProposition as item (item)}
          <li class="flex items-center gap-3 text-(--color-text-secondary)">
            <span class="shrink-0 text-green-400 decoration-2" aria-hidden="true">V</span>
            <span class="decoration-(--color-text-secondary)/40">{item}</span>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</section>
