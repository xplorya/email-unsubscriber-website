<script lang="ts">
  import { reveal } from '$lib/utilities/scroll-reveal'

  interface Competitor {
    name: string
    privacy: string
    pricing: string
    dataAccess: string
    processing: string
    persistentAccess: string
  }

  const us: Competitor = {
    name: 'Email Unsubscriber',
    privacy: 'Browser-only',
    pricing: 'One-time payment',
    dataAccess: 'Metadata only',
    processing: 'In your browser',
    persistentAccess: 'No'
  }

  const competitors: Competitor[] = [
    {
      name: 'Unroll.me',
      privacy: 'Reads emails server-side',
      pricing: 'Free (sells data)',
      dataAccess: 'Full email access',
      processing: 'Their servers',
      persistentAccess: 'Yes'
    },
    {
      name: 'Clean Email',
      privacy: 'Cloud processing',
      pricing: 'Subscription',
      dataAccess: 'Full email access',
      processing: 'Their servers',
      persistentAccess: 'Yes'
    },
    {
      name: 'Leave Me Alone',
      privacy: 'Cloud processing',
      pricing: 'Pay-per-use',
      dataAccess: 'Full email access',
      processing: 'Their servers',
      persistentAccess: 'Yes'
    },
    {
      name: 'Cleanfox',
      privacy: 'Reads emails server-side',
      pricing: 'Free (ad-supported)',
      dataAccess: 'Full email access',
      processing: 'Their servers',
      persistentAccess: 'Yes'
    }
  ]

  const features = [
    { label: 'Privacy Model', key: 'privacy' as const },
    { label: 'Pricing', key: 'pricing' as const },
    { label: 'Data Access', key: 'dataAccess' as const },
    { label: 'Processing', key: 'processing' as const },
    { label: 'Persistent Access', key: 'persistentAccess' as const }
  ]
</script>

<section id="comparison" class="bg-(--color-bg) py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
  <div use:reveal class="max-w-7xl mx-auto">
    <h2 class="text-3xl sm:text-4xl font-bold text-center text-(--color-text)">
      Us vs. The Rest
    </h2>
    <p class="mt-4 text-center text-(--color-text-secondary) text-lg max-w-2xl mx-auto">
      See how we compare on the things that matter
    </p>

    <!-- Desktop: full table -->
    <div class="mt-12 sm:mt-16 hidden lg:block overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr>
            <th class="p-4 text-sm font-medium text-(--color-text-secondary) border-b border-(--color-border)">
              Feature
            </th>
            <th class="p-4 text-sm font-semibold text-(--color-text) border-b-2 border-(--color-primary) bg-(--color-bg-secondary) rounded-t-lg">
              {us.name}
            </th>
            {#each competitors as comp (comp.name)}
              <th class="p-4 text-sm font-medium text-(--color-text-secondary) border-b border-(--color-border)">
                {comp.name}
              </th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each features as feature (feature.key)}
            <tr>
              <td class="p-4 text-sm font-medium text-(--color-text) border-b border-(--color-border)">
                {feature.label}
              </td>
              <td class="p-4 text-sm font-semibold text-(--color-text) border-b border-(--color-border) bg-(--color-bg-secondary)">
                {us[feature.key]}
              </td>
              {#each competitors as comp (comp.name)}
                <td class="p-4 text-sm text-(--color-text-secondary) border-b border-(--color-border)">
                  {comp[feature.key]}
                </td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- Mobile: card-based comparison -->
    <div class="mt-12 sm:mt-16 lg:hidden space-y-6">
      <!-- Our card (highlighted) -->
      <div class="rounded-xl border-2 border-(--color-primary) bg-(--color-bg-secondary) p-6">
        <h3 class="text-lg font-bold text-(--color-text) mb-4">{us.name}</h3>
        <dl class="space-y-3">
          {#each features as feature (feature.key)}
            <div class="flex justify-between gap-4">
              <dt class="text-sm text-(--color-text-secondary) shrink-0">{feature.label}</dt>
              <dd class="text-sm font-semibold text-(--color-text) text-right">{us[feature.key]}</dd>
            </div>
          {/each}
        </dl>
      </div>

      <!-- Competitor cards -->
      {#each competitors as comp (comp.name)}
        <div class="rounded-xl border border-(--color-border) bg-(--color-bg) p-6">
          <h3 class="text-lg font-medium text-(--color-text-secondary) mb-4">{comp.name}</h3>
          <dl class="space-y-3">
            {#each features as feature (feature.key)}
              <div class="flex justify-between gap-4">
                <dt class="text-sm text-(--color-text-secondary) shrink-0">{feature.label}</dt>
                <dd class="text-sm text-(--color-text-secondary) text-right">{comp[feature.key]}</dd>
              </div>
            {/each}
          </dl>
        </div>
      {/each}
    </div>
  </div>
</section>
