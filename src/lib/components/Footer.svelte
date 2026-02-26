<script lang="ts">
  import {APP_URL, CONTACT_EMAIL, COMPANY_NAME, COMPANY_UIC} from '$lib/utilities/constants'
  import { icons } from '$lib/icons'

  const COLUMNS = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '/#how-it-works' },
        { label: 'Pricing', href: '/#pricing' },
        { label: 'Get Started', href: APP_URL }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/#about' },
        { label: 'Mission', href: '/#why' },
        // { label: 'Blog', href: '#' },
        // { label: 'Careers', href: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/privacy#cookies' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact', href: `mailto:${CONTACT_EMAIL}` },
        { label: 'GDPR', href: '#' }
        // { label: 'FAQ', href: '#' }
      ]
    }
  ] as const

  const SOCIAL_LINKS = [
    { label: 'Twitter / X', href: '#', icon: icons.twitter },
    { label: 'LinkedIn', href: '#', icon: icons.linkedin },
    { label: 'GitHub', href: '#', icon: icons.github }
  ] as const
</script>

<footer class="bg-(--color-bg-secondary) border-t border-(--color-border)">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
    <!-- Footer columns -->
    <div class="grid grid-cols-2 gap-8 md:grid-cols-4">
      {#each COLUMNS as column (column.title)}
        <div>
          <h3 class="text-sm font-semibold text-(--color-text) uppercase tracking-wider">
            {column.title}
          </h3>
          <ul class="mt-4 space-y-3">
            {#each column.links as link (link.label)}
              <li>
                <a
                  href={link.href}
                  class="text-sm text-(--color-text-secondary) hover:text-(--color-text) transition-colors"
                >
                  {link.label}
                </a>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>

    <!-- Social links -->
    <div class="mt-12 flex items-center justify-center gap-6">
      {#each SOCIAL_LINKS as social (social.label)}
        <a
          href={social.href}
          aria-label={social.label}
          class="text-(--color-text-secondary) hover:text-(--color-text) transition-colors"
        >
          <span class="inline-block w-5 h-5 [&>svg]:w-full [&>svg]:h-full">{@html social.icon}</span>
        </a>
      {/each}
    </div>

    <!-- Bottom bar -->
    <div class="mt-4 border-t border-(--color-border) pt-2 text-center max-h-0">
      <p class="text-xs text-(--color-text-secondary)">
        Email Unsubscriber&trade; is a product of {COMPANY_NAME}
      </p>
      <p class="text-xs text-(--color-text-secondary)">
        Reg. No. {COMPANY_UIC} &middot; &copy; {new Date().getFullYear()} All rights reserved
      </p>
    </div>
  </div>
</footer>
