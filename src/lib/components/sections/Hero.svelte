<script lang="ts">
  import { APP_URL } from '$lib/utilities/constants'
</script>

<section id="home" class="min-h-screen flex items-center justify-center bg-(--color-bg) px-4 sm:px-6 lg:px-8 relative overflow-hidden">
  <!-- Subtle gradient overlay -->
  <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
    <div class="absolute inset-0 bg-linear-to-b from-(--color-bg-secondary)/50 via-transparent to-(--color-bg-secondary)/30"></div>
  </div>

  <!-- Dot grid pattern overlay -->
  <div class="hero-dot-grid absolute inset-0 pointer-events-none" aria-hidden="true"></div>

  <div class="max-w-4xl mx-auto text-center relative z-10">
    <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-(--color-text)">
      Email Unsubscriber
    </h1>

    <p class="mt-4 sm:mt-6 text-xl sm:text-2xl md:text-3xl font-medium text-(--color-primary)">
      Clean your inbox. For good.
    </p>

    <p class="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-(--color-text-secondary) max-w-2xl mx-auto leading-relaxed">
      Scan your inbox, find every subscription, and unsubscribe in few clicks.
      No monthly fees. No data harvesting. Just a clean inbox.
    </p>

    <div class="mt-8 sm:mt-10">
      <a
        id="hero-cta"
        href={APP_URL}
        class="hero-cta-button inline-block px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg bg-(--color-accent) text-white hover:bg-(--color-accent-hover) transition-all duration-200"
      >
        Get Started -> Go to App
      </a>
    </div>

    <p class="mt-4 sm:mt-6 text-sm text-(--color-text-secondary)">
      No subscriptions. Make a one-off payment only when in use. Done.
    </p>
  </div>
</section>

<style>
  .hero-dot-grid {
    background-image: radial-gradient(circle, var(--color-hero-dot) 1px, transparent 1px);
    background-size: 24px 24px;
    mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
  }

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