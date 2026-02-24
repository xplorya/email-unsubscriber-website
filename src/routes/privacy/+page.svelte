<script lang="ts">
  import { CONTACT_EMAIL } from '$lib/utilities/constants'
</script>

<div class="max-w-3xl mx-auto px-4 pt-24 py-8 sm:px-6 lg:px-8">
  <!-- Back link -->
  <a
    href="/"
    class="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 mb-8 transition-colors"
  >
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>
    Back to Home
  </a>

  <article class="max-w-none">
    <h1 class="text-3xl font-bold text-(--color-text) mb-2">Privacy Policy</h1>
    <p class="text-sm text-slate-500 mb-8">Last Updated: February 23, 2026</p>

    <!-- Privacy-First Hero Section -->
    <div class="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4 mb-8">
      <div class="flex items-start gap-4">
        <div>
          <div class="flex items-start gap-2 mb-2">
            <div class="shrink-0">
              <svg class="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-emerald-800 dark:text-emerald-200 mt-0 mb-2">Your Privacy is Our Priority</h2>
          </div>
          <div class="space-y-2 text-emerald-700 dark:text-emerald-300">
            <p class="flex items-center gap-2 m-0">
              <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <strong>100% Browser-Based:</strong> All email scanning happens entirely in YOUR browser
            </p>
            <p class="flex items-center gap-2 m-0">
              <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <strong>Never Leaves Your Device:</strong> Your emails NEVER leave your computer
            </p>
            <p class="flex items-center gap-2 m-0">
              <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <strong>Zero Server Storage:</strong> We NEVER see, store, or process your email content
            </p>
            <p class="flex items-center gap-2 m-0">
              <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <strong>No AI blackbox:</strong> Our approach is purely algorithmic, leaving no room for surprises
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Section 1: Introduction -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">1. Introduction</h2>
      <p class="text-(--color-text-secondary) leading-relaxed">
        Email Unsubscriber ("The company", "we", "us", or "our") provides a browser-based tool that helps you identify and unsubscribe from unwanted email subscriptions. This Privacy Policy explains how we handle your information when you use our service.
      </p>
      <p class="text-(--color-text-secondary) leading-relaxed">
        We built this service with privacy as the foundation. Unlike other email management tools, we designed our architecture so that your email data never touches our servers.
      </p>
    </section>

    <!-- Section 2: Information We DON'T Collect (emphasized) -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">2. Information We Do NOT Collect</h2>
      <div class="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 mb-4">
        <p class="text-(--color-text) font-medium mb-3">We want to be absolutely clear about what we never access:</p>
        <ul class="space-y-2 text-(--color-text-secondary)">
          <li class="flex items-start gap-2">
            <svg class="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span><strong>Email content</strong> - We never see the body, subject lines, or text of your emails</span>
          </li>
          <li class="flex items-start gap-2">
            <svg class="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span><strong>Email metadata</strong> - Senders, recipients, timestamps, or any header information</span>
          </li>
          <li class="flex items-start gap-2">
            <svg class="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span><strong>Subscription lists</strong> - Your scan results and subscription data stay on your device</span>
          </li>
          <li class="flex items-start gap-2">
            <svg class="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span><strong>Inbox data</strong> - Any information from your email inbox</span>
          </li>
          <li class="flex items-start gap-2">
            <svg class="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span><strong>Email provider access tokens</strong> - The credentials that allow reading your emails stay in your browser and are never sent to our servers</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- Section 3: Information We Do Collect -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">3. Information We Do Collect</h2>
      <p class="text-(--color-text-secondary) leading-relaxed mb-4">
        We collect minimal information necessary to provide our service:
      </p>
      <ul class="space-y-3 text-(--color-text-secondary)">
        <li class="flex items-start gap-2">
          <svg class="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <span><strong>Account Email Address:</strong> Used solely for account identification and authentication</span>
        </li>
        <li class="flex items-start gap-2">
          <svg class="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <span><strong>Subscription Status:</strong> For paid users, we track payment status to provide full access to all features</span>
        </li>
        <li class="flex items-start gap-2">
          <svg class="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <span><strong>Basic Usage Analytics:</strong> Anonymous page views and feature usage (not tied to email data)</span>
        </li>
      </ul>
    </section>

    <!-- Section 4: How Our Service Works -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">4. How Our Service Works</h2>
      <p class="text-(--color-text-secondary) leading-relaxed mb-4">
        Understanding our architecture helps explain why your data stays private:
      </p>
      <div class="space-y-4">
        <div class="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
          <span class="shrink-0 w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-sm font-medium text-(--color-text)">1</span>
          <div>
            <p class="font-medium text-(--color-text) m-0">Direct Browser-to-Provider Communication</p>
            <p class="text-sm text-(--color-text-secondary) m-0">All email API requests go directly from your browser to your email provider's servers (e.g., Google or Microsoft). Our servers are never involved in this data flow.</p>
          </div>
        </div>
        <div class="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
          <span class="shrink-0 w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-sm font-medium text-(--color-text)">2</span>
          <div>
            <p class="font-medium text-(--color-text) m-0">OAuth Authentication Only</p>
            <p class="text-sm text-(--color-text-secondary) m-0">Our servers never receive your email access credentials. Authentication happens directly between your browser and your email provider - our backend only receives an identity token (JWT) that proves who you are, but cannot be used to access your emails.</p>
          </div>
        </div>
        <div class="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
          <span class="shrink-0 w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-sm font-medium text-(--color-text)">3</span>
          <div>
            <p class="font-medium text-(--color-text) m-0">Local Processing</p>
            <p class="text-sm text-(--color-text-secondary) m-0">The dashboard code runs entirely in your browser. Email scanning, analysis, and unsubscribe detection all happen on your device.</p>
          </div>
        </div>
      </div>
      <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p class="font-medium text-blue-800 dark:text-blue-200 m-0 mb-2">Token Separation Architecture</p>
        <p class="text-sm text-blue-700 dark:text-blue-300 m-0">
          When you sign in with your email provider, two different tokens are created: an <strong>access token</strong> (which can read your emails) and an <strong>identity token</strong> (which only proves who you are). The OAuth standard requires a backend intermediary to securely exchange your authorization code for these tokens. To maximize transparency, we have split this intermediary into a <strong>standalone, open-source, fully auditable service</strong> that is hosted separately on a public cloud (Cloudflare Workers). This token-exchange service is <strong>fully isolated from the rest of our backend</strong>, meaning our backend has no chance of ever seeing your access token. After the exchange, your browser keeps the access token and uses it to communicate directly with your email provider. Our backend only ever receives the identity token, which cannot be used to access your emails. This architectural choice means our servers are physically incapable of reading your emails, even if compromised.
        </p>
      </div>
    </section>

    <!-- Section 5: Local Data Storage -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">5. Local Data Storage</h2>
      <p class="text-(--color-text-secondary) leading-relaxed mb-4">
        Your scan results and authentication data are stored locally in your browser:
      </p>
      <ul class="space-y-2 text-(--color-text-secondary)">
        <li><strong>IndexedDB:</strong> Scan results and subscription data are stored in your browser's IndexedDB</li>
        <li><strong>localStorage:</strong> OAuth tokens are stored in browser localStorage for session persistence</li>
        <li><strong>Data Clearing:</strong> All local data is automatically cleared when you clear your browser data</li>
      </ul>
      <p class="text-(--color-text-secondary) leading-relaxed mt-4">
        This data never leaves your device and is only accessible to you.
      </p>
    </section>

    <!-- Section 6: Third-Party Services -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">6. Third-Party Services</h2>
      <p class="text-(--color-text-secondary) leading-relaxed mb-4">
        We integrate with the following third-party services:
      </p>
      <ul class="space-y-3 text-(--color-text-secondary)">
        <li>
          <strong>Google (OAuth & Gmail API):</strong> We use Google's OAuth 2.0 for authentication. Your browser communicates directly with Google's Gmail API to read email data. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" class="text-slate-600 dark:text-slate-400 underline hover:text-slate-800 dark:hover:text-slate-200">Google's privacy policy</a> applies to data they process.
        </li>
        <li>
          <strong>Microsoft (OAuth & Outlook API):</strong> We use Microsoft's OAuth 2.0 for authentication. Your browser communicates directly with Microsoft's Graph API to read email data. <a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noopener noreferrer" class="text-slate-600 dark:text-slate-400 underline hover:text-slate-800 dark:hover:text-slate-200">Microsoft's privacy statement</a> applies to data they process.
        </li>
        <li>
          <strong>Stripe (Payment Processing):</strong> If you subscribe to a paid plan, Stripe handles payment processing. We never see or store your full credit card information.
        </li>
        <li>
          <strong>Cloudflare (Hosting & CDN):</strong> Our service is hosted on Cloudflare. Cloudflare may collect standard server logs (IP addresses, request times) as part of their service.
        </li>
        <li>
          <strong>PostHog (Product Analytics):</strong> We use PostHog for basic product analytics. To protect your privacy, we only ever send a cryptographically hashed (obfuscated) version of your email address to PostHog — your real email address is never transmitted and cannot be recovered, even by PostHog themselves. The hashed identifier is used solely to distinguish between users, not to identify them. No email content, metadata, or inbox data is ever sent to PostHog. <a href="https://posthog.com/privacy" target="_blank" rel="noopener noreferrer" class="text-slate-600 dark:text-slate-400 underline hover:text-slate-800 dark:hover:text-slate-200">PostHog's privacy policy</a> applies to data they process.
        </li>
      </ul>
    </section>

    <!-- Section 7: Data Retention & Account Deletion -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">7. Data Retention & Account Deletion</h2>
      <p class="text-(--color-text-secondary) leading-relaxed mb-4">
        You can delete your account at any time using the "Erase Data" feature in your profile. When you erase your account, we process your data as follows:
      </p>

      <h3 class="text-lg font-medium text-(--color-text) mt-6 mb-3">7.1 Anonymization Process</h3>
      <p class="text-(--color-text-secondary) leading-relaxed">
        Account deletion is performed through anonymization rather than hard deletion. All personally identifiable information (PII) associated with your account (which is your email address only as we never collect any other PII) is permanently replaced with an irreversible, one-way cryptographic hash. After this process, your account record can no longer be linked back to you.
      </p>

      <h3 class="text-lg font-medium text-(--color-text) mt-6 mb-3">7.2 Data That Is Permanently Deleted</h3>
      <ul class="space-y-3 text-(--color-text-secondary)">
        <li>
          <strong>Unsubscribe history:</strong> All records of your unsubscribe actions, which may contain third-party sender information, are permanently and fully deleted — not anonymized.
        </li>
        <li>
          <strong>Whitelist/early access entries:</strong> Any early access or whitelist entries associated with your account are removed.
        </li>
      </ul>

      <h3 class="text-lg font-medium text-(--color-text) mt-6 mb-3">7.3 Data That Is Retained</h3>
      <p class="text-(--color-text-secondary) leading-relaxed mb-3">
        Certain data is retained after account deletion for legal and security purposes. In all cases, personally identifiable information is replaced with the anonymized hash described above.
      </p>
      <ul class="space-y-3 text-(--color-text-secondary)">
        <li>
          <strong>Payment records (up to 7 years):</strong> Anonymized payment records are retained to comply with tax and financial reporting obligations. This retention is permitted under GDPR Article 17(3)(b), which allows data controllers to retain data necessary for compliance with a legal obligation.
        </li>
        <li>
          <strong>Anonymized user identifier:</strong> A one-way cryptographic hash derived from your email address is retained to detect returning users and prevent abuse of promotional offers (such as referral incentives). This hash cannot be reversed to recover your email address. This retention is justified under legitimate interest as recognized by GDPR Recital 47 — specifically, the prevention of fraud and misuse of services.
        </li>
        <li>
          <strong>Blacklist entries:</strong> If your account was placed on a security blacklist prior to deletion, that entry is retained for ongoing security and abuse prevention purposes.
        </li>
      </ul>

      <h3 class="text-lg font-medium text-(--color-text) mt-6 mb-3">7.4 Local Browser Data</h3>
      <p class="text-(--color-text-secondary) leading-relaxed">
        The "Erase Data" feature removes your account from our servers. Data stored locally in your browser (localStorage, IndexedDB) is not affected by this process. You can clear local data at any time through your browser settings.
      </p>
    </section>

    <!-- Section 8: Your Rights -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">8. Your Rights</h2>
      <p class="text-(--color-text-secondary) leading-relaxed mb-4">
        You have full control over your data and access:
      </p>
      <ul class="space-y-3 text-(--color-text-secondary)">
        <li>
          <strong>Revoke Access:</strong> You can revoke our access at any time through your <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer" class="text-slate-600 dark:text-slate-400 underline hover:text-slate-800 dark:hover:text-slate-200">Google Account settings</a> or <a href="https://account.live.com/consent/Manage" target="_blank" rel="noopener noreferrer" class="text-slate-600 dark:text-slate-400 underline hover:text-slate-800 dark:hover:text-slate-200">Microsoft Account settings</a>, depending on which provider you signed in with.
        </li>
        <li>
          <strong>Clear Local Data:</strong> Clear your browser's localStorage and IndexedDB to remove all locally stored data.
        </li>
        <li>
          <strong>Account Deletion:</strong> Use the "Erase Data" feature in your profile to anonymize and remove your account data from our servers. See Section 7 for details on what is deleted, what is anonymized, and what is retained.
        </li>
        <li>
          <strong>Data Export:</strong> Since all scan data is stored locally in your browser, you already have direct access to your data.
        </li>
      </ul>
    </section>

    <!-- Section 9: Contact -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">9. Contact Us</h2>
      <p class="text-(--color-text-secondary) leading-relaxed">
        If you have any questions about this Privacy Policy or our data practices, please contact us at:
      </p>
      <p class="text-(--color-text-secondary)">
        <strong>Email:</strong> {CONTACT_EMAIL}
      </p>
    </section>

    <!-- Section 10: Changes to This Policy -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">10. Changes to This Policy</h2>
      <p class="text-(--color-text-secondary) leading-relaxed">
        We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
      </p>
    </section>
  </article>

  <!-- Back to Home button at bottom -->
  <div class="mt-8 pt-8 border-t border-(--color-border)">
    <a
      href="/"
      class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Back to Home
    </a>
  </div>
</div>
