<script lang="ts">
  import { APP_URL } from '$lib/utilities/constants'
  import DeviceScreenshot from '$lib/components/DeviceScreenshot.svelte'
</script>

<section id="home" class="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">

  <div class="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 py-12 lg:py-0">
    <!-- Left column: text content -->
    <div class="flex-1 text-center lg:text-left">
      <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-(--color-text)">
        Email Unsubscriber
      </h1>

      <p class="mt-4 sm:mt-6 text-xl sm:text-2xl md:text-3xl font-medium text-(--color-primary)">
        Clean your inbox. For good.
      </p>

      <p class="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-(--color-text-secondary) max-w-2xl mx-auto lg:mx-0 leading-relaxed">
        Scan your inbox, find every subscription, and unsubscribe in few clicks.
        No monthly fees. No data harvesting. Just a clean inbox.
      </p>

      <div class="mt-8 sm:mt-10">
        <a
          id="hero-cta"
          href={APP_URL}
          class="hero-cta-button inline-block px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg bg-(--color-accent) text-white hover:bg-(--color-accent-hover) transition-all duration-200"
        >
          Get Started
        </a>
      </div>

      <p class="mt-4 sm:mt-6 text-sm text-(--color-text-secondary)">
        No subscriptions. Make a one-off payment only when in use. Done.
      </p>
    </div>

    <!-- Right column: product screenshot -->
    <div class="flex-1 w-full max-w-lg lg:max-w-none">
      <DeviceScreenshot feature="hero" alt="Email Unsubscriber app screenshot" />
    </div>
  </div>
</section>

<style>
  .hero-cta-button {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  }

  .hero-cta-button:hover {
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -4px rgba(0, 0, 0, 0.1),
      0 0 20px var(--color-accent-glow);
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-cta-button,
    .hero-cta-button:hover {
      transition: none !important;
    }
  }
</style>
