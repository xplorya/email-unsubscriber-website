<script lang="ts">
  import { APP_URL } from '$lib/utilities/constants'
</script>

<section id="home" class="min-h-screen flex items-center justify-center bg-(--color-bg) px-4 sm:px-6 lg:px-8 relative overflow-hidden">
  <!-- Subtle gradient overlay -->
  <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
    <div class="absolute inset-0 bg-gradient-to-b from-(--color-bg-secondary)/50 via-transparent to-(--color-bg-secondary)/30"></div>
  </div>

  <div class="max-w-4xl mx-auto text-center relative z-10">
    <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-(--color-text)">
      Email Unsubscriber
    </h1>

    <p class="mt-4 sm:mt-6 text-xl sm:text-2xl md:text-3xl font-medium text-(--color-primary)">
      Clean your inbox. For good.
    </p>

    <p class="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-(--color-text-secondary) max-w-2xl mx-auto leading-relaxed">
      Scan your inbox, find every subscription, and unsubscribe in one click.
      No monthly fees. No data harvesting. Just a clean inbox.
    </p>

    <div class="mt-8 sm:mt-10">
      <a
        id="hero-cta"
        href={APP_URL}
        class="inline-block px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg bg-(--color-button-solid-bg) text-(--color-button-solid-fg) hover:bg-(--color-button-solid-bg-hover) transition-colors duration-200"
      >
        Get Started -> Go to App
      </a>
    </div>

    <p class="mt-4 sm:mt-6 text-sm text-(--color-text-secondary)">
      No subscription. Pay once. Done.
    </p>
  </div>
</section>