<script lang="ts">
  import { reveal } from '$lib/utilities/scroll-reveal'
</script>

<section id="legal" class="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
  <div use:reveal class="max-w-7xl mx-auto text-center">
    <h2 class="text-3xl sm:text-4xl font-bold text-(--color-text)">
      Legal
    </h2>

    <p class="mt-6 text-(--color-text-secondary) text-lg max-w-2xl mx-auto">
      We take your rights seriously. Review our policies to understand how we protect your data.
    </p>

    <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
      <a
        href="/privacy"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-(--color-border) bg-(--color-bg) text-(--color-text-link) hover:bg-(--color-button-ghost-bg-hover) transition-colors duration-200"
      >
        Privacy Policy
      </a>
      <a
        href="/terms"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-(--color-border) bg-(--color-bg) text-(--color-text-link) hover:bg-(--color-button-ghost-bg-hover) transition-colors duration-200"
      >
        Terms of Service
      </a>
    </div>
  </div>
</section>
