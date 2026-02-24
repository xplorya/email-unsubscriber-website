<script lang="ts">
  import { reveal } from '$lib/utilities/scroll-reveal'
  import { APP_URL } from '$lib/utilities/constants'
  import { icons } from '$lib/icons'

  // TODO: - We could add an expanding footer explaining our Referral program

  /** Placeholder price — update with the real value */
  const PRICE = '€2.99'
  const PRICE_USD = '$3.49'

  const ourPricingProposition = [
    {
    statement: 'No commitment:',
    explanation: 'You owe us nothing extra. Seriously.'
    },
    {
      statement: 'No subscription:',
      explanation: 'Nothing to cancel to stop paying.'
    },
    {
      statement: 'No pay-as-you-go:',
      explanation: 'You get unlimited access.'
    },
    {
      statement: 'No tiers:',
      explanation: 'You get Full Access to all features.'
    },
    {
      statement: 'No caps to referrals and bonuses:',
      explanation: 'The more you share, the more you get.'
    },
  ]
</script>

<section id="pricing" class="bg-(--color-bg-secondary) py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
  <div use:reveal class="max-w-7xl mx-auto">
    <h2 class="text-3xl sm:text-4xl font-bold text-center text-(--color-text)">
      Pricing
    </h2>
    <p class="mt-4 text-center text-(--color-text-secondary) text-lg max-w-2xl mx-auto">
      It doesn't get any simpler
    </p>

    <div class="flex flex-col min-[860px]:flex-row justify-center items-center gap-8 lg:gap-12 mt-12 sm:mt-16">
      <!-- Pricing Card -->
      <div class="max-w-md">
        <div class="rounded-2xl border-2 border-(--color-border) bg-(--color-bg) p-8 sm:p-10 text-center shadow-sm">
          <p class="text-5xl sm:text-6xl font-bold text-(--color-text)">
            {PRICE}
          </p>
          <p class="mt-2 text-lg font-medium text-(--color-primary)">
            One-Time Payment
          </p>
          <p class="mt-4 text-(--color-text-secondary)">
            One price. Full Access for 30 days. Unlimited usage. No strings attached.
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
      <div class="flex flex-row max-w-md justify-center">
        <ul class="space-y-3">
          {#each ourPricingProposition as proposition (proposition)}
            <li class="flex items-center gap-3 justify-start text-md text-(--color-text-secondary)">
              <span class="inline-block w-6 h-6 text-emerald-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
              <div class="flex flex-col justify-start items-start font-bold">
                <span class="decoration-(--color-text-secondary)/40 font-bold">{proposition.statement}</span>
                <span class="decoration-(--color-text-secondary)/40 font-normal">{proposition.explanation}</span>
              </div>


            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</section>
