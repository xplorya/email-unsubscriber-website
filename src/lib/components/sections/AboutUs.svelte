<script lang="ts">
  import { reveal, revealStaggered } from '$lib/utilities/scroll-reveal'
  import { CONTACT_EMAIL, COMPANY_NAME } from '$lib/utilities/constants'

  const values = [
    {
      title: 'Privacy First',
      description: "Every technical decision starts with 'does this protect user data?'",
      icon: 'shield'
    },
    {
      title: 'Simplicity',
      description: 'One product, one purpose, one payment. No bloat.',
      icon: 'sparkle'
    },
    {
      title: 'Transparency',
      description:
        "Our architecture is our proof. Browser-only processing isn't just a claim — it's verifiable.",
      icon: 'eye'
    }
  ] as const
</script>

<section id="about" class="bg-(--color-bg) py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
  <div use:reveal class="max-w-7xl mx-auto">
    <h2 class="text-3xl sm:text-4xl font-bold text-center text-(--color-text)">
      About Us
    </h2>

    <p class="mt-6 text-center text-(--color-text-secondary) text-lg max-w-3xl mx-auto leading-relaxed">
      Email Unsubscriber is built by {COMPANY_NAME} — a small team obsessed with
      digital privacy and inbox sanity. We believe your email is your business, not ours.
    </p>

    <!-- Values -->
    <div class="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      {#each values as value, i (value.title)}
        <div use:revealStaggered={{ delay: i * 100 }} class="text-center p-6 sm:p-8">
          <div class="w-12 h-12 rounded-lg bg-(--color-bg-secondary) border border-(--color-border) flex items-center justify-center mx-auto">
            {#if value.icon === 'shield'}
              <svg class="w-6 h-6 text-(--color-primary)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            {:else if value.icon === 'sparkle'}
              <svg class="w-6 h-6 text-(--color-primary)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            {:else}
              <svg class="w-6 h-6 text-(--color-primary)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            {/if}
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
