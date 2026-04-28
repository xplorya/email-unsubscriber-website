<script lang="ts">
  import { revealHeading } from '$lib/utilities/gsap-utils'
  import ParallaxDashboard from '$lib/components/ParallaxDashboard.svelte'
</script>

<section id="demo" class="section-fade-top bg-(--color-bg-secondary) pt-16 sm:pt-20 lg:pt-24">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 use:revealHeading class="text-3xl sm:text-4xl font-bold text-center text-(--color-text)">
      See It In Action
    </h2>
    <p class="mt-4 text-center text-(--color-text-secondary) text-lg max-w-2xl mx-auto">
      Play with the demo to get a feel of what the app is like.
    </p>
  </div>

  <div class="mt-12 mb-24 sm:mt-16">
    <ParallaxDashboard />
  </div>
</section>
