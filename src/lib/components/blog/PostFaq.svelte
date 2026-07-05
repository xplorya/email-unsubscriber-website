<script lang="ts">
  import type { FaqItem } from '$lib/blog/types'
  import { icons } from '$lib/icons'

  interface Props {
    items: FaqItem[]
  }

  let { items }: Props = $props()
</script>

<section class="post-faq" aria-labelledby="faq-heading">
  <h2 id="faq-heading" class="faq-heading">Frequently asked questions</h2>
  <div class="faq-list">
    {#each items as item (item.question)}
      <details class="faq-item">
        <summary class="faq-question">
          <span class="faq-question-text">{item.question}</span>
          <span class="faq-chevron" aria-hidden="true">{@html icons.chevronDown}</span>
        </summary>
        <div class="faq-answer">
          <p>{item.answer}</p>
        </div>
      </details>
    {/each}
  </div>
</section>

<style>
  .post-faq {
    margin-top: 4rem;
    padding-top: 3rem;
    border-top: 1px solid var(--color-border);
  }

  .faq-heading {
    font-size: 1.75rem;
    font-weight: 700;
    letter-spacing: -0.015em;
    line-height: 1.25;
    color: var(--color-text);
    margin: 0 0 1.5rem;
  }

  @media (min-width: 640px) {
    .faq-heading {
      font-size: 2rem;
    }
  }

  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .faq-item {
    border: 1px solid var(--color-border);
    border-radius: 0.75rem;
    background: var(--color-bg-secondary-solid);
    overflow: hidden;
  }

  .faq-item[open] {
    border-color: var(--color-accent-border);
  }

  .faq-question {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.1rem 1.25rem;
    cursor: pointer;
    list-style: none;
    font-weight: 600;
    font-size: 1.05rem;
    line-height: 1.4;
    color: var(--color-text);
  }

  .faq-question::-webkit-details-marker {
    display: none;
  }

  .faq-question:hover {
    color: var(--color-accent-text);
  }

  .faq-question:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: -2px;
    border-radius: 0.75rem;
  }

  .faq-chevron {
    display: inline-flex;
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
    color: var(--color-accent);
    transition: transform 0.25s ease;
  }

  .faq-item[open] .faq-chevron {
    transform: rotate(180deg);
  }

  .faq-chevron :global(svg) {
    width: 100%;
    height: 100%;
  }

  .faq-answer {
    padding: 0 1.25rem 1.25rem;
    color: var(--prose-body);
    font-size: 1rem;
    line-height: 1.7;
  }

  .faq-answer p {
    margin: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .faq-chevron {
      transition: none;
    }
  }
</style>
