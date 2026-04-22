<script lang="ts">
  import {CONTACT_EMAIL, GDPR_EMAIL} from '$lib/utilities/constants'
  import { icons } from '$lib/icons'

  function handleClose() {
    window.close()
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
</script>

<div class="max-w-3xl mx-auto px-4 pt-4 py-8 sm:px-6 lg:px-8">
  <article class="max-w-none">
    <div class="flex justify-between items-start">
      <!-- Header title -->
      <h1 class="text-3xl font-bold text-(--color-text) mb-2">Email Unsubscriber<span class="align-super text-sm">&trade;</span> Privacy Policy</h1>
      <!-- Close button -->
      <button
        onclick={handleClose}
        class="inline-flex items-center justify-center w-9 h-9 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-label="Close"
      >
        <span class="inline-block w-5 h-5 [&>svg]:w-full [&>svg]:h-full">{@html icons.xMark}</span>
      </button>
    </div>
    <p class="text-sm text-slate-500 mb-8">Last Updated: April 16, 2026</p>

    <!-- Privacy-First Hero Section -->
    <div class="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg p-4 mb-8">
      <div class="flex items-start gap-4">
        <div>
          <div class="flex items-start gap-2 mb-2">
            <div class="shrink-0">
              <span class="inline-block w-8 h-8 text-teal-600 dark:text-teal-400 [&>svg]:w-full [&>svg]:h-full">{@html icons.shieldCheck}</span>
            </div>
            <h2 class="text-xl font-semibold text-teal-800 dark:text-teal-200 mt-0 mb-2">Your Privacy is Our Priority</h2>
          </div>
          <div class="space-y-2 text-teal-700 dark:text-teal-300">
            <p class="flex items-center gap-2 m-0">
              <span class="inline-block w-5 h-5 shrink-0 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
              <strong>100% Browser-Based:</strong> All email scanning happens entirely in YOUR browser
            </p>
            <p class="flex items-center gap-2 m-0">
              <span class="inline-block w-5 h-5 shrink-0 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
              <strong>Never Leaves Your Device:</strong> Your emails NEVER leave your computer
            </p>
            <p class="flex items-center gap-2 m-0">
              <span class="inline-block w-5 h-5 shrink-0 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
              <strong>Zero Server Storage:</strong> We NEVER see, store, or process your email content
            </p>
            <p class="flex items-center gap-2 m-0">
              <span class="inline-block w-5 h-5 shrink-0 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
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
        Email Unsubscriber, operated by Micro Solutions LLC ("The company", "we", "us", or "our") provides a browser-based tool that helps you identify and unsubscribe from unwanted email subscriptions. This Privacy Policy explains how we handle your information when you use our service.
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
            <span class="inline-block w-5 h-5 text-red-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.xMark}</span>
            <span><strong>Email content</strong> - We never see the body, subject lines, or text of your emails</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="inline-block w-5 h-5 text-red-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.xMark}</span>
            <span><strong>Email metadata</strong> - Senders, recipients, timestamps, or any header information</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="inline-block w-5 h-5 text-red-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.xMark}</span>
            <span><strong>Subscription lists</strong> - Your scan results and subscription data stay on your device</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="inline-block w-5 h-5 text-red-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.xMark}</span>
            <span><strong>Inbox data</strong> - Any information from your email inbox</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="inline-block w-5 h-5 text-red-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.xMark}</span>
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
          <span class="inline-block w-5 h-5 text-teal-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
          <span><strong>Account Email Address:</strong> Used solely for account identification and authentication</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="inline-block w-5 h-5 text-teal-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
          <span><strong>Subscription Status:</strong> For paid users, we track payment status to provide full access to all features</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="inline-block w-5 h-5 text-teal-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
          <span><strong>Basic Usage Analytics:</strong> Anonymous page views and feature usage (not tied to email data)</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="inline-block w-5 h-5 text-teal-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
          <span><strong>Unsubscribe History:</strong> When you unsubscribe from a sender through our service, we store a record of the sender's email address and name as part of your unsubscribe audit log. This data enables our Unsubscribe Violation Detection feature, which monitors whether senders comply with your unsubscribe requests by flagging any non-individual emails received from them after your request.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="inline-block w-5 h-5 text-teal-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
          <span><strong>Referral Data:</strong> If you participate in our referral program, we store your unique referral code and track your referral progress (number of successful referrals). Referral relationships are tracked using anonymized identifiers, not raw email addresses.</span>
        </li>
      </ul>
    </section>

    <!-- Section 4: Legal Basis for Processing -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">4. Legal Basis for Processing</h2>
      <p class="text-(--color-text-secondary) leading-relaxed mb-4">
        We process your personal data under the following legal bases as defined by GDPR Article 6:
      </p>
      <ul class="space-y-3 text-(--color-text-secondary)">
        <li>
          <strong>Contract Performance (Art. 6(1)(b)):</strong> Processing your email address and account data to provide the email unsubscription service, process payments, and maintain your account.
        </li>
        <li>
          <strong>Consent (Art. 6(1)(a)):</strong> Analytics cookies, session recording, and behavioral tracking — only activated when you explicitly consent via our cookie banner.
        </li>
        <li>
          <strong>Legitimate Interest (Art. 6(1)(f)):</strong> Essential error tracking and performance monitoring to maintain service reliability; security measures including blacklist maintenance for fraud and abuse prevention.
        </li>
        <li>
          <strong>Legal Obligation (Art. 6(1)(c)):</strong> Retention of anonymized payment records for 7 years as required by applicable tax and financial regulations.
        </li>
      </ul>
    </section>

    <!-- Section 5: How Our Service Works -->
    <section id="how-it-works" class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">5. How Our Service Works</h2>
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

    <!-- Section 6: Cookies -->
    <section id="cookies" class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">6. Cookies</h2>
      <p class="text-(--color-text-secondary) leading-relaxed mb-4">
        We use cookies to enhance your browsing experience. Cookies are small text files stored in your browser.
      </p>
      <ul class="space-y-3 text-(--color-text-secondary)">
        <li>
          <strong>Essential Cookies:</strong> These are required for the site to function. They store your theme preference (light/dark mode) and your cookie consent choice. They also include a cookie that tracks whether you have read our Security Transparency Report, used to gate access to Google sign-in while our Google verification is being finalized (30-day expiry). These cannot be disabled.
        </li>
        <li>
          <strong>Analytics Cookies:</strong> With your consent, we use anonymous analytics cookies to understand how visitors interact with our site. These cookies do not collect personally identifiable information. You can opt in or out at any time via the cookie consent banner.
        </li>
        <li>
          <strong>Session Recording:</strong> When you consent to analytics cookies, we may also enable session recording through PostHog. Session recordings capture your interactions with the application (clicks, scrolling, page navigation) to help us identify usability issues and improve the user experience. Session recordings are tied to your anonymized identifier, not your email address. You can opt out at any time by rejecting analytics cookies.
        </li>
      </ul>
      <p class="text-(--color-text-secondary) leading-relaxed mt-4">
        Cookies are set with a domain of <code class="text-sm bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">.email-unsubscriber.com</code> so your preferences carry across our sites. Most cookies expire after 400 days (the <code class="text-sm bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">security_read</code> cookie has a shorter 30-day expiry). You can delete cookies at any time through your browser settings.
      </p>
    </section>

    <!-- Section 7: Third-Party Services -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">7. Third-Party Services</h2>
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
          <strong>Stripe (Payment Processing):</strong> If you purchase access to our service, Stripe handles payment processing. We never see or store your full credit card information. Please note that after account deletion, your email address and payment details may still be retained by Stripe in accordance with their own data retention policies. We anonymize all payment records stored on our servers, but cannot force deletion of data held by Stripe.
        </li>
        <li>
          <strong>Cloudflare (Hosting & CDN):</strong> Our service is hosted on Cloudflare. Cloudflare may collect standard server logs (IP addresses, request times) as part of their service.
        </li>
        <li>
          <strong>PostHog (Product Analytics):</strong> We use PostHog for basic product analytics. To protect your privacy, we only ever send a cryptographically hashed (obfuscated) version of your email address to PostHog — your real email address is never transmitted and cannot be recovered, even by PostHog themselves. The hashed identifier is used solely to distinguish between users, not to identify them. No email content, metadata, or inbox data is ever sent to PostHog. <a href="https://posthog.com/privacy" target="_blank" rel="noopener noreferrer" class="text-slate-600 dark:text-slate-400 underline hover:text-slate-800 dark:hover:text-slate-200">PostHog's privacy policy</a> applies to data they process.
        </li>
      </ul>

      <div class="mt-6 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg p-4">

        <!-- Prohibited Uses of Email User Data -->
        <div class="">
          <div class="flex items-start gap-2 mb-3">
            <p class="font-semibold text-teal-800 dark:text-teal-200 m-0">Prohibited Uses of Email User Data</p>
          </div>
          <p class="text-sm text-teal-700 dark:text-teal-300 mb-3">
            Email Unsubscriber <strong>never</strong> uses email user data obtained from any provider (Google, Microsoft, or any future integration) for any of the following purposes:
          </p>
          <ul class="space-y-2 text-sm text-teal-700 dark:text-teal-300">
            <li class="flex items-start gap-2">
              <span class="inline-block w-4 h-4 text-red-500 dark:text-red-400 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.xMark}</span>
              <span>Targeted advertising, personalized advertising, retargeted advertising, or interest-based advertising</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="inline-block w-4 h-4 text-red-500 dark:text-red-400 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.xMark}</span>
              <span>Serving advertisements or ad-related profiling of any kind</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="inline-block w-4 h-4 text-red-500 dark:text-red-400 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.xMark}</span>
              <span>Selling, renting, or providing data to data brokers or information resellers</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="inline-block w-4 h-4 text-red-500 dark:text-red-400 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.xMark}</span>
              <span>Determining credit-worthiness, lending eligibility, or insurance underwriting</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="inline-block w-4 h-4 text-red-500 dark:text-red-400 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.xMark}</span>
              <span>Creating, compiling, or augmenting databases for sale, rental, or transfer to third parties</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="inline-block w-4 h-4 text-red-500 dark:text-red-400 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.xMark}</span>
              <span>Training, fine-tuning, or improving machine learning or artificial intelligence models (including generative AI, large language models, or any automated decision-making systems)</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="inline-block w-4 h-4 text-red-500 dark:text-red-400 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.xMark}</span>
              <span>Market research, email campaign tracking, or competitive intelligence</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="inline-block w-4 h-4 text-red-500 dark:text-red-400 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.xMark}</span>
              <span>Surveillance, user profiling, or behavioral tracking beyond what is necessary for the core email unsubscribe functionality</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="inline-block w-4 h-4 text-red-500 dark:text-red-400 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.xMark}</span>
              <span>Any purpose other than providing or improving the Email Unsubscriber service as described in this Privacy Policy</span>
            </li>
          </ul>
        </div>

        <!-- Third-Party Transfer Restrictions -->
        <div class="mt-5 pt-4 border-t border-teal-200 dark:border-teal-700">
          <div class="flex items-start gap-2 mb-3">
            <p class="font-semibold text-teal-800 dark:text-teal-200 m-0">Third-Party Transfer Restrictions</p>
          </div>
          <p class="text-sm text-teal-700 dark:text-teal-300 mb-3">
            Sensitive email user data — including email content, metadata, headers, and access tokens — is <strong>never transferred to any third party, for any purpose whatsoever</strong>, regardless of whether you use Gmail, Outlook, or any other supported email provider. This data is processed exclusively within your browser and is architecturally inaccessible to our servers and any third party. Specifically:
          </p>
          <ul class="space-y-2 text-sm text-teal-700 dark:text-teal-300">
            <li class="flex items-start gap-2">
              <span class="inline-block w-4 h-4 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
              <span>We do not share, sell, rent, or disclose email content, metadata, headers, or access tokens to any third party for any reason — including for service-related purposes</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="inline-block w-4 h-4 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
              <span>No email content, email metadata, email headers, sender information, or email access tokens are ever transmitted to any third party, or any external system</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="inline-block w-4 h-4 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
              <span>The only data shared with third-party services (such as our analytics provider, PostHog) consists of irreversibly hashed identifiers that cannot be used to recover any email user data, email addresses, or personal information</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="inline-block w-4 h-4 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
              <span>For payment processing, Stripe collects payment information directly from your browser — we never collect, handle, or transmit your payment or banking data to Stripe or any other party. Data retained by Stripe is subject to Stripe's own privacy policy and is outside our control</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="inline-block w-4 h-4 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
              <span>These restrictions apply equally to all email user data from all supported providers (Google, Microsoft, and any future integrations), regardless of whether it is processed on our servers or in your browser</span>
            </li>
          </ul>
        </div>

        <!-- Google API Services Limited Use Disclosure -->
        <div class="mt-5 pt-4 border-t border-teal-200 dark:border-teal-700">
          <p class="font-semibold text-teal-800 dark:text-teal-200 mb-3">Google API Services Limited Use Disclosure</p>
          <p class="text-sm text-teal-700 dark:text-teal-300 mb-3">
            Email Unsubscriber's use and transfer of information received from Google APIs adheres to the
            <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" class="text-teal-800 dark:text-teal-200 underline font-medium hover:text-teal-900 dark:hover:text-teal-100">Google API Services User Data Policy</a>,
            including the Limited Use requirements. Specifically:
          </p>
          <ul class="space-y-2 text-sm text-teal-700 dark:text-teal-300">
            <li class="flex items-start gap-2">
              <span class="inline-block w-4 h-4 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
              <span>Email data accessed through the Gmail API is used exclusively to identify subscription senders and extract unsubscribe methods, enabling you to unsubscribe from unwanted emails</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="inline-block w-4 h-4 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
              <span>All email content is processed locally in your browser and is never transmitted to or stored on our servers</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="inline-block w-4 h-4 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
              <span>Email data is not used for serving advertisements, market research, email campaign tracking, or any purpose unrelated to the core unsubscribe functionality</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="inline-block w-4 h-4 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
              <span>Email data is not transferred to third parties</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="inline-block w-4 h-4 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
              <span>Email data is not used for training machine learning or artificial intelligence models</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Section 8: Local Data Storage -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">8. Local Data Storage</h2>
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

    <!-- Section 9: Data Protection & Security -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">9. Data Protection & Security</h2>

      <!-- Summary info box -->
      <div class="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg p-4 mb-6 mt-4">
        <div class="flex items-start gap-2 mb-3">
          <div class="shrink-0">
            <span class="inline-block w-7 h-7 text-teal-600 dark:text-teal-400 [&>svg]:w-full [&>svg]:h-full">{@html icons.lock}</span>
          </div>
          <p class="font-semibold text-teal-800 dark:text-teal-200 m-0">Your Data Is Protected by Design</p>
        </div>
        <div class="space-y-2 text-sm text-teal-700 dark:text-teal-300">
          <p class="flex items-start gap-2 m-0">
            <span class="inline-block w-4 h-4 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
            <span>All data encrypted in transit with industry-standard TLS</span>
          </p>
          <p class="flex items-start gap-2 m-0">
            <span class="inline-block w-4 h-4 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
            <span>Email data processed entirely in your browser — never on our servers</span>
          </p>
          <p class="flex items-start gap-2 m-0">
            <span class="inline-block w-4 h-4 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
            <span>Email access tokens never leave your browser or reach our backend</span>
          </p>
          <p class="flex items-start gap-2 m-0">
            <span class="inline-block w-4 h-4 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
            <span>Personal identifiers are irreversibly hashed before storage or analytics transmission</span>
          </p>
          <p class="flex items-start gap-2 m-0">
            <span class="inline-block w-4 h-4 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
            <span>Open-source token exchange service enables independent security audits</span>
          </p>
        </div>
      </div>

      <!-- 9.1 Encryption in Transit -->
      <h3 class="text-lg font-medium text-(--color-text) mt-6 mb-3">9.1 Encryption in Transit</h3>
      <p class="text-(--color-text-secondary) leading-relaxed">
        All communications between your browser and email providers (Google, Microsoft), as well as between your browser and our services, are encrypted using industry-standard TLS (Transport Layer Security). This ensures your data cannot be intercepted or tampered with during transmission.
      </p>

      <!-- 9.2 Client-Side Processing Architecture -->
      <h3 class="text-lg font-medium text-(--color-text) mt-6 mb-3">9.2 Client-Side Processing Architecture</h3>
      <p class="text-(--color-text-secondary) leading-relaxed">
        All email data — including content, headers, metadata, and subscription information — is processed entirely within your browser. Email data never reaches our servers, architecturally eliminating the possibility of server-side data breaches for this information.
      </p>

      <!-- 9.3 Token Isolation -->
      <h3 class="text-lg font-medium text-(--color-text) mt-6 mb-3">9.3 Token Isolation</h3>
      <p class="text-(--color-text-secondary) leading-relaxed">
        Your email access tokens (which grant the ability to read your emails) never leave your browser and are never sent to our backend servers. Our backend only receives identity tokens (JWTs) that verify your identity but cannot be used to access your email data. The token exchange is handled by a standalone, open-source service that is fully isolated from our main backend.
      </p>

      <!-- 9.4 PII Protection Through One-Way Hashing -->
      <h3 class="text-lg font-medium text-(--color-text) mt-6 mb-3">9.4 PII Protection Through One-Way Hashing</h3>
      <p class="text-(--color-text-secondary) leading-relaxed">
        Before any personally identifiable information (such as email addresses) is stored in our database or transmitted to any third-party service (such as our analytics provider), it is irreversibly transformed using one-way cryptographic hashing (SHA-256). The original email address cannot be recovered from these hashes, even by us or our service providers.
      </p>

      <!-- 9.5 Data Minimization -->
      <h3 class="text-lg font-medium text-(--color-text) mt-6 mb-3">9.5 Data Minimization</h3>
      <p class="text-(--color-text-secondary) leading-relaxed">
        We follow the principle of data minimization — we collect only the absolute minimum data required to provide and improve the Email Unsubscriber service. We do not collect or retain any data beyond what is strictly necessary for service functionality.
      </p>

      <!-- 9.6 Open-Source Transparency -->
      <h3 class="text-lg font-medium text-(--color-text) mt-6 mb-3">9.6 Open-Source Transparency</h3>
      <p class="text-(--color-text-secondary) leading-relaxed">
        Our OAuth token exchange service is open-source and publicly auditable, enabling independent verification of our data handling practices.
      </p>
    </section>

    <!-- Section 10: Data Retention & Account Deletion -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">10. Data Retention & Account Deletion</h2>
      <p class="text-(--color-text-secondary) leading-relaxed mb-4">
        You can delete your account at any time using the "Erase Account" feature in your profile. When you erase your account, we process your data as follows:
      </p>

      <h3 class="text-lg font-medium text-(--color-text) mt-6 mb-3">10.1 Anonymization Process</h3>
      <p class="text-(--color-text-secondary) leading-relaxed">
        Account deletion is performed through anonymization rather than hard deletion. All personally identifiable information (PII) associated with your account (which is your email address only as we never collect any other PII) is permanently replaced with an irreversible, one-way cryptographic hash. After this process, your account record can no longer be linked back to you.
      </p>

      <h3 class="text-lg font-medium text-(--color-text) mt-6 mb-3">10.2 Data That Is Permanently Deleted</h3>
      <ul class="space-y-3 text-(--color-text-secondary)">
        <li>
          <strong>Unsubscribe history:</strong> All records of your unsubscribe actions, which may contain third-party sender information, are permanently and fully deleted — not anonymized.
        </li>
        <li>
          <strong>Whitelist/early access entries:</strong> Any early access or whitelist entries associated with your account are removed.
        </li>
      </ul>

      <h3 class="text-lg font-medium text-(--color-text) mt-6 mb-3">10.3 Data That Is Retained</h3>
      <p class="text-(--color-text-secondary) leading-relaxed mb-3">
        Certain data is retained after account deletion for legal and security purposes. In all cases, personally identifiable information is replaced with the anonymized hash described above.
      </p>
      <ul class="space-y-3 text-(--color-text-secondary)">
        <li>
          <strong>Payment records (up to 7 years):</strong> Anonymized payment records — including payment amounts, dates, currency, and Stripe transaction identifiers — are retained to comply with tax and financial reporting obligations. This retention is permitted under GDPR Article 17(3)(b), which allows data controllers to retain data necessary for compliance with a legal obligation.
        </li>
        <li>
          <strong>Anonymized user identifier:</strong> A one-way cryptographic hash derived from your email address is retained to detect returning users and prevent abuse of promotional offers (such as referral incentives). This hash cannot be reversed to recover your email address. This retention is justified under legitimate interest as recognized by GDPR Recital 47 — specifically, the prevention of fraud and misuse of services.
        </li>
        <li>
          <strong>Blacklist entries:</strong> If your account was placed on a security blacklist prior to deletion, that entry is retained for ongoing security and abuse prevention purposes.
        </li>
      </ul>

      <h3 class="text-lg font-medium text-(--color-text) mt-6 mb-3">10.4 Local Browser Data</h3>
      <p class="text-(--color-text-secondary) leading-relaxed">
        The "Erase Account" feature removes your account from our servers. Data stored locally in your browser (localStorage, IndexedDB) is not affected by this process. You can clear local data at any time through your browser settings.
      </p>
    </section>

    <!-- Section 11: Your Rights -->
    <section id="your-rights" class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">11. Your Rights</h2>
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
          <strong>Account Deletion:</strong> Use the "Erase Account" feature in your profile to anonymize and remove your account data from our servers. See Section 10 for details on what is deleted, what is anonymized, and what is retained.
        </li>
        <li>
          <strong>Data Export:</strong> Since all scan data is stored locally in your browser, you already have direct access to your data.
        </li>
      </ul>
    </section>

    <!-- Section 12: California Privacy Rights -->
    <section id="california" class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">12. California Privacy Rights (CCPA/CPRA)</h2>

      <h3 class="text-lg font-medium text-(--color-text) mt-6 mb-3">12.1 Scope</h3>
      <p class="text-(--color-text-secondary) leading-relaxed">
        This section applies to California residents and supplements the rest of this Privacy Policy with the disclosures required by the California Consumer Privacy Act (CCPA), as amended by the California Privacy Rights Act (CPRA). Where this section conflicts with another part of this Policy for California residents, this section controls.
      </p>

      <h3 class="text-lg font-medium text-(--color-text) mt-6 mb-3">12.2 We Do Not Sell or Share Your Personal Information</h3>
      <div class="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg p-4">
        <p class="text-teal-800 dark:text-teal-200 leading-relaxed m-0">
          We have <strong>not sold</strong> and have <strong>not shared</strong> personal information of California residents in the preceding 12 months, and we do not do so as an ongoing practice. "Sale" and "share" are used here as defined under CCPA/CPRA, including sharing for cross-context behavioral advertising. Because we do not engage in either activity, there is no opt-out mechanism to provide.
        </p>
      </div>

      <h3 class="text-lg font-medium text-(--color-text) mt-6 mb-3">12.3 Your Rights</h3>
      <p class="text-(--color-text-secondary) leading-relaxed mb-4">
        California residents have the following rights under CCPA/CPRA:
      </p>
      <ul class="space-y-3 text-(--color-text-secondary)">
        <li class="flex items-start gap-2">
          <span class="inline-block w-5 h-5 text-teal-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
          <span><strong>Right to Know:</strong> request the categories and specific pieces of personal information we have collected about you, the sources, the purposes for collection, and the categories of recipients.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="inline-block w-5 h-5 text-teal-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
          <span><strong>Right to Delete:</strong> request that we delete personal information we have collected from you, subject to legal exceptions.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="inline-block w-5 h-5 text-teal-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
          <span><strong>Right to Correct:</strong> request that we correct inaccurate personal information we hold about you.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="inline-block w-5 h-5 text-teal-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
          <span><strong>Right to Opt-Out of Sale/Share:</strong> opt out of the sale or sharing of personal information. <em>Not applicable here</em> &mdash; we do not sell or share personal information.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="inline-block w-5 h-5 text-teal-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
          <span><strong>Right to Limit Use of Sensitive PI:</strong> direct us to limit our use of sensitive personal information to purposes permitted under CPRA &sect;1798.121. See section 12.6.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="inline-block w-5 h-5 text-teal-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
          <span><strong>Right to Non-Discrimination:</strong> we will not deny service, charge different prices, or provide a different level of quality because you exercised any of these rights.</span>
        </li>
      </ul>

      <h3 class="text-lg font-medium text-(--color-text) mt-6 mb-3">12.4 Categories of Personal Information We Collect</h3>
      <p class="text-(--color-text-secondary) leading-relaxed mb-4">We collect:</p>
      <ul class="space-y-3 text-(--color-text-secondary)">
        <li class="flex items-start gap-2">
          <span class="inline-block w-5 h-5 text-teal-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
          <span><strong>Identifiers:</strong> your email address (used as your account identifier).</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="inline-block w-5 h-5 text-teal-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
          <span><strong>Commercial information:</strong> payment amounts, transaction identifiers, and subscription/payment status.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="inline-block w-5 h-5 text-teal-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
          <span><strong>Internet or other electronic network activity:</strong> analytics page views and session recordings (consent-gated via our cookie banner).</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="inline-block w-5 h-5 text-teal-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
          <span><strong>Inferences:</strong> aggregate usage statistics derived from your interactions with the service.</span>
        </li>
      </ul>

      <p class="text-(--color-text-secondary) leading-relaxed mt-6 mb-4">We do <strong>NOT</strong> collect:</p>
      <ul class="space-y-3 text-(--color-text-secondary)">
        <li class="flex items-start gap-2">
          <span class="inline-block w-5 h-5 text-red-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.xMark}</span>
          <span>Sensitive government identifiers (SSN, driver's license, passport, state ID).</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="inline-block w-5 h-5 text-red-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.xMark}</span>
          <span>Biometric data (fingerprints, facial geometry, voiceprints).</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="inline-block w-5 h-5 text-red-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.xMark}</span>
          <span>Health, medical, or genetic information.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="inline-block w-5 h-5 text-red-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.xMark}</span>
          <span>Precise geolocation (we have no GPS-level location data).</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="inline-block w-5 h-5 text-red-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.xMark}</span>
          <span>Contact lists, address books, or your email content.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="inline-block w-5 h-5 text-red-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.xMark}</span>
          <span>Racial or ethnic origin.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="inline-block w-5 h-5 text-red-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.xMark}</span>
          <span>Religious or philosophical beliefs.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="inline-block w-5 h-5 text-red-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.xMark}</span>
          <span>Sexual orientation or sex life.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="inline-block w-5 h-5 text-red-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.xMark}</span>
          <span>Union membership.</span>
        </li>
      </ul>
      <p class="text-(--color-text-secondary) leading-relaxed mt-4">
        The categories above reflect our ongoing practice and will be updated if our sources, purposes, or recipients materially change.
      </p>

      <h3 class="text-lg font-medium text-(--color-text) mt-6 mb-3">12.5 Sources, Purposes, and Recipients</h3>
      <p class="text-(--color-text-secondary) leading-relaxed mb-4">
        For each category we collect, the source, business purpose, and recipients are as follows:
      </p>
      <ul class="space-y-3 text-(--color-text-secondary)">
        <li><strong>Identifiers (email address):</strong> collected directly from you via OAuth sign-in with your email provider. Used for authentication, account identification, transactional communication, and service provision. Shared with Google or Microsoft (your chosen identity provider for sign-in), Stripe (for payment receipt and customer matching), Cloudflare (CDN/edge processing of authentication requests), and PostHog (only if you have consented to analytics &mdash; as a hashed identifier for product analytics).</li>
        <li><strong>Commercial information (payment data):</strong> collected from Stripe upon successful payment. Used to determine your subscription/payment status and provide paid features. Shared with Stripe (the source and processor of this data) and stored on our backend.</li>
        <li><strong>Internet/network activity (analytics, session recordings):</strong> collected from your browser/device when you interact with our service. Used for product analytics, debugging, and improving the user experience. Shared only with PostHog, and only if you have granted analytics consent through our cookie banner.</li>
        <li><strong>Inferences (usage statistics):</strong> derived internally from your interactions with the service. Used to inform product decisions and personalize your experience. Not shared with third parties.</li>
      </ul>
      <p class="text-(--color-text-secondary) leading-relaxed mt-4">
        This list reflects ongoing practice and will be updated if sources, purposes, or recipients materially change.
      </p>

      <h3 class="text-lg font-medium text-(--color-text) mt-6 mb-3">12.6 Sensitive Personal Information</h3>
      <p class="text-(--color-text-secondary) leading-relaxed">
        Under CPRA, an email address used in combination with a password or security credential is considered "sensitive personal information" (SPI). We use your email address only for the purposes permitted under CPRA &sect;1798.121: authenticating you, providing the service you have requested, ensuring the security and integrity of our service, and complying with legal obligations. Because we do not use SPI to infer characteristics about you or for any other purpose, the "Right to Limit Use of Sensitive PI" is already satisfied by our existing practice &mdash; no further action is needed from you.
      </p>

      <h3 class="text-lg font-medium text-(--color-text) mt-6 mb-3">12.7 How to Exercise Your Rights</h3>
      <p class="text-(--color-text-secondary) leading-relaxed mb-4">
        You may exercise any of the rights described above by either:
      </p>
      <ul class="space-y-3 text-(--color-text-secondary)">
        <li class="flex items-start gap-2">
          <span class="inline-block w-5 h-5 text-teal-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
          <span>Emailing <span class="text-slate-600 dark:text-slate-400 underline hover:text-slate-800 dark:hover:text-slate-200">{GDPR_EMAIL}</span> from the email address associated with your account, or</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="inline-block w-5 h-5 text-teal-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
          <span>Using the <strong>"Erase Account"</strong> feature in your account profile within the web app to initiate account deletion directly.</span>
        </li>
      </ul>
      <p class="text-(--color-text-secondary) leading-relaxed mt-4">
        We will acknowledge receipt of your request within <strong>10 business days</strong> and respond substantively within <strong>45 calendar days</strong>. If we need more time, we may extend the response window by an additional 45 days and will notify you of the extension and the reasons for it. There is no charge for submitting or fulfilling a request, although we may decline to act on requests that are manifestly unfounded or excessive (for example, repetitive requests). If we decline a request, we will explain why.
      </p>

      <h3 class="text-lg font-medium text-(--color-text) mt-6 mb-3">12.8 Authorized Agents</h3>
      <p class="text-(--color-text-secondary) leading-relaxed">
        You may designate an authorized agent to make a CCPA/CPRA request on your behalf. The agent must provide written authorization signed by you, along with government-issued photo identification for both you and the agent. We may also contact you directly to verify the request. If the agent has a power of attorney pursuant to California Probate Code &sect;&sect;4000-4465, the foregoing requirements may be satisfied by providing that documentation.
      </p>

      <h3 class="text-lg font-medium text-(--color-text) mt-6 mb-3">12.9 Non-Discrimination</h3>
      <p class="text-(--color-text-secondary) leading-relaxed">
        We will not discriminate against you for exercising any of your CCPA/CPRA rights. Specifically, we will not deny you our service, charge you different prices or rates, provide a different level or quality of service, or suggest that you will receive a different price, rate, level, or quality of service because you exercised your rights.
      </p>

      <h3 class="text-lg font-medium text-(--color-text) mt-6 mb-3">12.10 Minors</h3>
      <p class="text-(--color-text-secondary) leading-relaxed">
        We do not knowingly collect personal information from anyone under 16 years of age. Our Terms of Service additionally require all users to be at least 18 years old. If we become aware that we have collected personal information from a minor without verified parental or guardian consent, we will delete that information promptly. To report such a situation, contact us at <span class="text-slate-600 dark:text-slate-400 underline hover:text-slate-800 dark:hover:text-slate-200">{GDPR_EMAIL}</span>.
      </p>

      <h3 class="text-lg font-medium text-(--color-text) mt-6 mb-3">12.11 Financial Incentives</h3>
      <p class="text-(--color-text-secondary) leading-relaxed">
        Our referral program qualifies as a "financial incentive" under CCPA &sect;1798.125(b). The program offers percentage-based discounts to both new users (when they sign up using a referral) and to referrers (when their referrals reach qualifying milestones). The current material terms &mdash; including the percentage discounts, qualifying actions, and program rules &mdash; are available on the in-app referral page within your account profile and may change from time to time.
      </p>
      <p class="text-(--color-text-secondary) leading-relaxed mt-4">
        Participation in the referral program is entirely voluntary. To opt out, simply do not participate &mdash; do not share your referral code and do not redeem one. Choosing not to participate does not affect the price you pay for the service or the level of service you receive in any way.
      </p>

      <h3 class="text-lg font-medium text-(--color-text) mt-6 mb-3">12.12 Shine the Light (CA Civil Code &sect;1798.83)</h3>
      <p class="text-(--color-text-secondary) leading-relaxed">
        California's "Shine the Light" law permits California residents to request information regarding the disclosure of personal information to third parties for those third parties' direct marketing purposes. <strong>We do not disclose personal information to third parties for their own direct marketing purposes</strong>, so there is nothing to report under this law. If you have questions about this practice, contact us at <span class="text-slate-600 dark:text-slate-400 underline hover:text-slate-800 dark:hover:text-slate-200">{GDPR_EMAIL}</span>.
      </p>
    </section>

    <!-- Section 13: Contact -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">13. Contact Us</h2>

      <h3 class="text-lg font-medium text-(--color-text) mt-6 mb-3">Data Protection Contact</h3>
      <p class="text-(--color-text-secondary) leading-relaxed">
        For data protection inquiries, you may contact our Data Protection Officer:
      </p>
      <p class="text-(--color-text-secondary)">
        <strong>Email: </strong>
        <span class="text-slate-600 dark:text-slate-400 underline hover:text-slate-800 dark:hover:text-slate-200">{GDPR_EMAIL}</span>
      </p>

      <h3 class="text-lg font-medium text-(--color-text) mt-6 mb-3">General Inquiries</h3>
      <p class="text-(--color-text-secondary) leading-relaxed">
        For general inquiries about this Privacy Policy or our data practices, contact us at:
      </p>
      <p class="text-(--color-text-secondary)">
        <strong>Email: </strong>
        <span class="text-slate-600 dark:text-slate-400 underline hover:text-slate-800 dark:hover:text-slate-200">{CONTACT_EMAIL}</span>
      </p>
    </section>

    <!-- Section 14: Changes to This Policy -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">14. Changes to This Policy</h2>
      <p class="text-(--color-text-secondary) leading-relaxed">
        We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
      </p>
    </section>
  </article>

  <!-- Go to Top button at bottom -->
  <div class="mt-8 pt-8 border-t border-(--color-border)">
    <button
      onclick={scrollToTop}
      class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
    >
      <span class="inline-block w-4 h-4 [&>svg]:w-full [&>svg]:h-full">{@html icons.chevronUp}</span>
      Go to Top
    </button>
  </div>
</div>