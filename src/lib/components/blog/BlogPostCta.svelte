<script lang="ts">
  import { SITE_URL } from '$lib/utilities/constants'
  import { captureEvent } from '$lib/utilities/posthog'

  interface Props {
    slug: string
    title?: string
    subtitle?: string
    ctaTitle?: string
  }

  let {
    slug,
    title = 'Looking for a safe alternative?',
    subtitle = 'Try Email Unsubscriber: our privacy-first tool for safe inbox cleanup.',
    ctaTitle = 'Visit the Homepage'
  }: Props = $props()

  const href = $derived(
    `${SITE_URL}/?utm_source=blog&utm_medium=post&utm_campaign=${encodeURIComponent(slug)}`
  )

  function handleClick() {
    captureEvent('blog_cta_click', { slug, cta_label: ctaTitle, cta_target: href })
  }
</script>

<aside class="blog-cta my-12" aria-label="Try Email Unsubscriber">
  <div class="blog-cta-inner">
    <div class="blog-cta-text">
      <h3 class="blog-cta-heading">{title}</h3>
      <p class="blog-cta-sub">{subtitle}</p>
    </div>
    <a
      {href}
      data-sveltekit-preload-data="hover"
      onclick={handleClick}
      class="blog-cta-button inline-block px-4 py-2 text-base sm:text-lg font-semibold rounded-lg bg-(--color-accent) text-white hover:bg-(--color-accent-hover) transition-all duration-200"
    >
      {ctaTitle}
    </a>
  </div>
</aside>

<style>
  .blog-cta {
    position: relative;
    border: 1px solid var(--color-accent-border);
    border-radius: 1rem;
    background:
      linear-gradient(
        135deg,
        var(--color-accent-gradient-from) 0%,
        var(--color-accent-gradient-to) 100%
      );
    overflow: hidden;
  }

  .blog-cta::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(
      circle at top right,
      var(--color-accent-glow),
      transparent 60%
    );
  }

  .blog-cta-inner {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
    padding: 1.25rem;
  }

  @media (min-width: 640px) {
    .blog-cta-inner {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      padding: 1.25rem 1.25rem;
    }
  }

  .blog-cta-text {
    min-width: 0;
    width: 100%;
    text-align: center;
  }

  @media (min-width: 640px) {
    .blog-cta-text {
      width: auto;
      text-align: left;
    }
  }

  .blog-cta-heading {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: -0.01em;
    color: var(--color-text);
  }

  @media (min-width: 640px) {
    .blog-cta-heading {
      font-size: 1.375rem;
    }
  }

  .blog-cta-sub {
    margin: 0.375rem 0 0;
    font-size: 0.95rem;
    line-height: 1.5;
    color: var(--color-text-secondary);
  }

  .blog-cta-button,
  .blog-cta-button:hover,
  .blog-cta-button:focus-visible {
    color: #fff;
    text-decoration: none;
  }

  .blog-cta-button {
    align-self: flex-end;
    text-align: center;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
    transition: background-color 200ms ease, box-shadow 200ms ease, color 200ms ease;
  }

  .blog-cta-button:hover {
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -4px rgba(0, 0, 0, 0.1),
      0 0 20px var(--color-accent-glow);
  }

  @media (prefers-reduced-motion: reduce) {
    .blog-cta-button,
    .blog-cta-button:hover {
      transition: none !important;
    }
  }
</style>
