<script lang="ts">
  import { reveal, revealStaggered } from '$lib/utilities/scroll-reveal'
  import {CONTACT_EMAIL, COMPANY_NAME, COMPANY_UIC} from '$lib/utilities/constants'
  import { icons } from '$lib/icons'

  const values = [
    {
      title: 'Privacy First',
      description: "Every technical decision starts with 'does this protect user data?'",
      icon: icons.shield
    },
    {
      title: 'Simplicity',
      description: 'One product, one purpose, one payment. No bloat.',
      icon: icons.star
    },
    {
      title: 'Transparency',
      description:
        "Our architecture is our proof. Browser-only features isn't just a claim — it's verifiable.",
      icon: icons.eye
    }
  ] as const
</script>

<section id="about" class="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
  <div use:reveal class="max-w-7xl mx-auto">
    <h2 class="text-3xl sm:text-4xl font-bold text-center text-(--color-text)">
      About Us
    </h2>

    <p class="mt-6 text-center text-(--color-text-secondary) text-lg max-w-3xl mx-auto leading-relaxed">
      Email Unsubscriber<span class="text-sm align-text-top">&trade;</span> is built by "{COMPANY_NAME}", an EU-based development studio delivering solutions focused on solving individual problems and solving them well. We always build with digital privacy and consumer protection in mind.
    </p>

    <!-- Values -->
    <div class="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      {#each values as value, i (value.title)}
        <div use:revealStaggered={{ delay: i * 100 }} class="group card-elevated rounded-xl border border-(--color-border) bg-(--color-bg) text-center p-6 sm:p-8">
          <div class="icon-glow w-12 h-12 rounded-lg bg-(--color-accent-light) border border-(--color-accent-border) flex items-center justify-center mx-auto">
            <span class="icon-hover-scale inline-block w-6 h-6 text-(--color-accent-text) [&>svg]:w-full [&>svg]:h-full">{@html value.icon}</span>
          </div>

          <h3 class="mt-4 text-lg font-semibold text-(--color-text)">
            {value.title}
          </h3>
          <p class="mt-2 text-(--color-text-secondary) leading-relaxed">
            {value.description}
          </p>
        </div>
      {/each}
    </div>

    <!-- Contact -->
    <div class="mt-12 sm:mt-16 text-center">
      <p class="text-(--color-text-secondary)">
        Questions? Reach us at
        <a
          href="mailto:{CONTACT_EMAIL}"
          class="text-(--color-text-link) underline underline-offset-4 hover:text-(--color-primary-hover) transition-colors"
        >
          {CONTACT_EMAIL}
        </a>
      </p>
    </div>
  </div>
</section>
