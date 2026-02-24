<script lang="ts">
  import { reveal } from '$lib/utilities/scroll-reveal'

  // TODO: - This section needs work in the features comparison row and the footnote

  interface Competitor {
    name: string
    privacy: string
    pricing: string
    dataAccess: string
    features: string
    persistentAccess: string
  }

  const us: Competitor = {
    name: 'Email Unsubscriber',
    privacy: 'On-device in full isolation',
    pricing: '€2.99 / 30 days',
    dataAccess: 'No access to emails or access tokens',
    features: "Unwanted emails detection<br>" +
      "Real unsubscribing assistance<br>" +
      "Filtering and cleanup assistance<br>" +

      "Unsubscribe Violation Detection<br>" +
      "Cost-reduction programs / discounts<br>" +
      "Audit Log",
    persistentAccess: 'No, refresh tokens not utilized by design'
  }

  const competitors: Competitor[] = [
    {
      name: 'Unroll.me',
      privacy: 'On cloud',
      pricing: 'Free (sells data)',
      dataAccess: 'Full email access',
      features: "Email unsubscribing<br>" +
        "Inbox Management<br>" +
        "Rollups",
      persistentAccess: 'Yes'
    },
    {
      name: 'Clean Email',
      privacy: 'On cloud',
      pricing: '€11.99/month',
      dataAccess: 'Full email access',
      features: "Email Unsubscribing<br>" +
        "Full-suite management",
      persistentAccess: 'Yes'
    },
    {
      name: 'Leave Me Alone',
      privacy: 'On cloud',
      pricing: '€17 / 1 week or limited features for €8/month',
      dataAccess: 'Full email access',
      features: "Email Unsubscribing<br>" +
        "Full-suite management",
      persistentAccess: 'Yes'
    },
    {
      name: 'Cleanfox',
      privacy: 'On cloud',
      pricing: '$30/month',
      dataAccess: 'Full email access',
      features: "Email Unsubscribing<br>" +
        "Full-suite management",
      persistentAccess: 'Yes'
    }
  ]

  const features = [
    { label: 'Pricing', key: 'pricing' as const },
    { label: 'Data processing', key: 'privacy' as const },
    { label: 'Access Control', key: 'dataAccess' as const },
    { label: 'Persistent Access', key: 'persistentAccess' as const },
    { label: 'Features', key: 'features' as const },
  ]
</script>

<section id="comparison" class="bg-(--color-bg) py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
  <div use:reveal class="max-w-7xl mx-auto">
    <h2 class="text-3xl sm:text-4xl font-bold text-center text-(--color-text)">
      Our Place Under The Sun
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
              Aspect
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
                {@html us[feature.key]}
              </td>
              {#each competitors as comp (comp.name)}
                <td class="p-4 text-sm text-(--color-text-secondary) border-b border-(--color-border)">
                  {@html comp[feature.key]}
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
              <dd class="text-sm font-semibold text-(--color-text) text-right">{@html us[feature.key]}</dd>
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
                <dd class="text-sm text-(--color-text-secondary) text-right">
                  <p>{@html comp[feature.key]}</p>
                </dd>
              </div>
            {/each}
          </dl>
        </div>
      {/each}
    </div>
    <div class=" pt-6 px-2 text-(--color-text-secondary) text-sm">
      Let's be clear, we know we are not a full-suite mailbox management software packed with features and if you're looking for that, some of the options above would be a better suite for you. Our north-star is not to be jam-packed with features, it is to be the best at ensuring your data stays yours, even if we mess up.
    </div>
  </div>
</section>
