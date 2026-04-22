<script lang="ts">
  import { icons } from '$lib/icons'
  import { reveal, revealStaggered } from '$lib/utilities/scroll-reveal'

  interface Props {
    title: string
    subtitle?: string
    eyebrow?: string
  }

  let { title, subtitle, eyebrow }: Props = $props()
</script>

<section class="pt-8 pb-12 lg:pb-20">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <nav class="text-sm text-(--color-text-secondary) mb-4" aria-label="Breadcrumb">
      <a href="/" class="hover:text-(--color-accent-text) transition-colors">Home</a>
      <span class="mx-1.5 opacity-50">/</span>
      <span class="text-(--color-text)">Writing</span>
    </nav>

    {#if eyebrow}
      <span
        use:reveal
        class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-(--color-accent-light) text-(--color-accent-text) border border-(--color-accent-border) mb-5"
      >
        <span class="w-3.5 h-3.5 inline-flex [&>svg]:w-full [&>svg]:h-full" aria-hidden="true">
          {@html icons.tag}
        </span>
        {eyebrow}
      </span>
    {/if}

    <h1
      use:reveal
      class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-(--color-text) leading-[1.1]"
    >
      {title}
    </h1>

    {#if subtitle}
      <p
        use:revealStaggered={{ delay: 100 }}
        class="mt-5 text-lg sm:text-xl text-(--color-text-secondary) leading-relaxed max-w-[42rem]"
      >
        {subtitle}
      </p>
    {/if}
  </div>
</section>
