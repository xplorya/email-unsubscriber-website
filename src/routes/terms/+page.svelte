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
    <h1 class="text-3xl font-bold text-(--color-text) mb-2">Terms of Service</h1>
    <p class="text-sm text-slate-500 mb-8">Last Updated: 23.02.2026</p>

    <!-- Section 1: Service Description -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">1. Service Description</h2>
      <p class="text-(--color-text-secondary) leading-relaxed">
        Email Unsubscriber ("Xplorya LLC", "we", "us", or "our") provides a browser-based email management tool that helps you identify email subscriptions and facilitates unsubscribe requests. Our service scans your email inbox (Google/Gmail or Microsoft/Outlook) locally in your browser to detect newsletters and marketing emails, then assists you in unsubscribing from unwanted communications.
      </p>
      <p class="text-(--color-text-secondary) leading-relaxed">
        By using our service, you agree to these Terms of Service. Please read them carefully before using Email Unsubscriber.
      </p>
    </section>

    <!-- Section 2: Eligibility -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">2. Eligibility</h2>
      <p class="text-(--color-text-secondary) leading-relaxed mb-4">
        To use Email Unsubscriber, you must:
      </p>
      <ul class="space-y-2 text-(--color-text-secondary)">
        <li>Have a valid Google/Gmail or Microsoft/Outlook account</li>
        <li>Be at least 18 years old or have parental consent</li>
        <li>Have the legal capacity to enter into this agreement</li>
        <li>Not be prohibited from using the service under applicable laws</li>
      </ul>
    </section>

    <!-- Section 3: User Responsibilities -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">3. User Responsibilities</h2>
      <p class="text-(--color-text-secondary) leading-relaxed mb-4">
        When using our service, you agree to:
      </p>
      <ul class="space-y-3 text-(--color-text-secondary)">
        <li>
          <strong>Provide accurate information:</strong> Authenticate with your genuine Google or Microsoft account and provide accurate information when required.
        </li>
        <li>
          <strong>Use the service responsibly:</strong> Do not use our service for any illegal purposes or in ways that could harm others.
        </li>
        <li>
          <strong>Make informed decisions:</strong> You are solely responsible for deciding which emails to unsubscribe from. Review your choices carefully before confirming unsubscribe actions.
        </li>
        <li>
          <strong>Not abuse the service:</strong> Do not attempt to reverse engineer, decompile, or disassemble our service. Do not use automated scripts to access our service in ways that could impair its operation.
        </li>
        <li>
          <strong>Comply with provider terms:</strong> Your use of Gmail or Outlook through our service must comply with Google's and Microsoft's respective Terms of Service.
        </li>
      </ul>
    </section>

    <!-- Section 4: Service Limitations & Disclaimers -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">4. Service Limitations & Disclaimers</h2>
      <div class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4">
        <p class="text-amber-800 dark:text-amber-200 font-medium m-0">Important Disclaimers</p>
      </div>
      <ul class="space-y-3 text-(--color-text-secondary)">
        <li>
          <strong>Unsubscribe Success:</strong> We facilitate unsubscribe requests but cannot guarantee their success. Whether an unsubscribe request is honored depends entirely on the email sender's compliance with unsubscribe standards.
        </li>
        <li>
          <strong>Email Detection:</strong> Our subscription detection is based on common patterns and heuristics. We may not identify all subscriptions, and some identified items may not be subscriptions.
        </li>
        <li>
          <strong>"As Is" Service:</strong> The service is provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
        </li>
        <li>
          <strong>Service Availability:</strong> We do not guarantee uninterrupted access to our service. We may modify, suspend, or discontinue the service at any time without notice.
        </li>
        <li>
          <strong>Third-Party Dependencies:</strong> Our service relies on Google's Gmail API, Microsoft's Graph API, and their respective OAuth services. Changes to these third-party services may affect our functionality.
        </li>
      </ul>
    </section>

    <!-- Section 5: Limitation of Liability -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">5. Limitation of Liability</h2>
      <p class="text-(--color-text-secondary) leading-relaxed mb-4">
        To the maximum extent permitted by law:
      </p>
      <ul class="space-y-3 text-(--color-text-secondary)">
        <li>
          <strong>No liability for unsubscribe decisions:</strong> We are not responsible for any consequences of emails you choose to unsubscribe from. You make all unsubscribe decisions at your own discretion.
        </li>
        <li>
          <strong>No liability for missed emails:</strong> We are not responsible for any important emails you may miss after unsubscribing from a sender.
        </li>
        <li>
          <strong>No indirect damages:</strong> We shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill.
        </li>
        <li>
          <strong>Liability cap:</strong> Our total liability shall not exceed the amount you paid for the service in the twelve (12) months preceding the claim, or $100, whichever is greater.
        </li>
      </ul>
    </section>

    <!-- Section 6: Intellectual Property -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">6. Intellectual Property</h2>
      <p class="text-(--color-text-secondary) leading-relaxed mb-4">
        All intellectual property rights in our service belong to us or our licensors:
      </p>
      <ul class="space-y-2 text-(--color-text-secondary)">
        <li>Our code, design, logos, and trademarks are proprietary and protected by intellectual property laws.</li>
        <li>You may not copy, modify, distribute, or create derivative works from our service without our express written permission.</li>
        <li>We grant you a limited, non-exclusive, non-transferable license to use our service for its intended purpose.</li>
      </ul>
    </section>

    <!-- Section 7: Account Termination -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">7. Account Termination</h2>
      <p class="text-(--color-text-secondary) leading-relaxed mb-4">
        We may suspend or terminate your access to our service:
      </p>
      <ul class="space-y-2 text-(--color-text-secondary)">
        <li>If you violate these Terms of Service</li>
        <li>If you abuse the service or use it for illegal purposes</li>
        <li>If required by law or legal process</li>
        <li>If we discontinue the service</li>
      </ul>
      <p class="text-(--color-text-secondary) leading-relaxed mt-4">
        You may terminate your use at any time by using the "Erase Data" feature in your profile (see Section 8), revoking access through your Google or Microsoft account settings, and clearing your browser data.
      </p>
    </section>

    <!-- Section 8: Account Deletion & Data Handling -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">8. Account Deletion & Data Handling</h2>
      <p class="text-(--color-text-secondary) leading-relaxed mb-4">
        You can delete your account at any time using the "Erase Data" feature available in your profile. This section explains what happens when you do.
      </p>

      <h3 class="text-lg font-medium text-(--color-text) mt-6 mb-3">8.1 What "Erase Data" Does</h3>
      <p class="text-(--color-text-secondary) leading-relaxed mb-3">
        For legal compliance and for us to be able to prevent abuse, when you erase your account, not all of the records of your activity on the platform are hard-deleted from our databases, but all occurrences of your personally identifiable information (PII) - your email address, are permanently replaced with an irreversible, one-way cryptographic hash. This means that part of your account record is anonymized and can no longer be associated with your identity, while the rest of it gets completely and permanently deleted. We are permanently hard-deleting the following data:
      </p>
      <ul class="pl-5 space-y-3 text-(--color-text-secondary)">
        <li>
          <strong>Feature usage statistics :</strong> All records of your unsubscribe actions and other statistics are permanently and fully deleted.
        </li>
        <li>
          <strong>Whitelist/early access entries:</strong> Any early access or whitelist entries associated with your account are removed.
        </li>
        <li>
          <strong>Referrals statistics:</strong> All data related to the referrals you made is deleted.
        </li>
      </ul>

      <h3 class="text-lg font-medium text-(--color-text) mt-6 mb-3">8.2 Data Retained After Deletion</h3>
      <p class="text-(--color-text-secondary) leading-relaxed mb-3">
        The following data is retained after account deletion. In all cases, personally identifiable information is replaced with the anonymized hash described above.
      </p>
      <ul class="space-y-3 text-(--color-text-secondary)">
        <li>
          <strong>Payment records (up to 7 years):</strong> Anonymized payment records are retained to comply with applicable tax and financial reporting obligations, as permitted under GDPR Article 17(3)(b).
        </li>
        <li>
          <strong>Anonymized user identifier:</strong> A one-way cryptographic hash derived from your email address is retained to detect returning users and prevent abuse of promotional offers. This hash cannot be reversed to recover your email address and is maintained under the legitimate interest basis recognized by GDPR Recital 47.
        </li>
        <li>
          <strong>Blacklist entries:</strong> If your account was placed on a security blacklist prior to deletion, that entry is retained for security and abuse prevention purposes (not anonymized).
        </li>
      </ul>

      <h3 class="text-lg font-medium text-(--color-text) mt-6 mb-3">8.3 Re-Registration After Deletion</h3>
      <p class="text-(--color-text-secondary) leading-relaxed">
        If you choose to re-register after deleting your account, you will have full access to all features and functionality of the service — your experience will not be restricted or degraded in any way. The only difference is that returning users will not receive a welcome discount coupon that is normally offered to first-time users who sign up through a referral link. This is because our system uses the retained anonymized identifier to detect returning accounts solely for the purpose of preventing abuse of promotional and referral incentives. This detection does not affect your access to any features, functionality, or service tiers.
      </p>
    </section>

    <!-- Section 9: Service Changes -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">9. Service Changes</h2>
      <p class="text-(--color-text-secondary) leading-relaxed">
        We reserve the right to modify our service at any time, including:
      </p>
      <ul class="space-y-2 text-(--color-text-secondary) mt-4">
        <li>Adding, modifying, or removing features</li>
        <li>Changing pricing or subscription tiers</li>
        <li>Updating these Terms of Service</li>
      </ul>
      <p class="text-(--color-text-secondary) leading-relaxed mt-4">
        Material changes to these terms will be communicated through our website or email. Continued use of the service after changes constitutes acceptance of the modified terms.
      </p>
    </section>

    <!-- Section 10: Referral Program -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">10. Referral Program</h2>
      <p class="text-(--color-text-secondary) leading-relaxed mb-4">
        We may offer a referral program that allows you to earn bonus discounts by referring new users to our service. Participation in the referral program is subject to the following terms:
      </p>

      <h3 class="text-lg font-medium text-(--color-text) mt-6 mb-3">10.1 How It Works</h3>
      <ul class="space-y-3 text-(--color-text-secondary)">
        <li>
          You earn a referral bonus for each qualified referral. A qualified referral is a new user who has never previously signed in, arrived at the service via your referral link, and completed a purchase.
        </li>
        <li>
          Referral bonuses are stackable and may be claimed as discount coupons, subject to the program rules displayed in the application.
        </li>
        <li>
          New users who sign up through a referral link may receive a welcome discount as described in the application.
        </li>
      </ul>

      <h3 class="text-lg font-medium text-(--color-text) mt-6 mb-3">10.2 Prohibited Conduct</h3>
      <p class="text-(--color-text-secondary) leading-relaxed mb-3">
        The following activities are strictly prohibited and constitute abuse of the referral program:
      </p>
      <ul class="space-y-3 text-(--color-text-secondary)">
        <li>
          <strong>Selling or reselling coupons:</strong> Selling, reselling, trading, or otherwise transferring coupons for monetary or non-monetary compensation.
        </li>
        <li>
          <strong>Coupon aggregation:</strong> Posting or distributing referral links on coupon, deal, or discount aggregator websites or similar platforms.
        </li>
        <li>
          <strong>Paid promotion:</strong> Using referral links in paid advertisements (search ads, social media ads, etc.) without our prior written consent.
        </li>
        <li>
          <strong>Automated activity:</strong> Using bots, scripts, or other automated means to generate referrals.
        </li>
        <li>
          <strong>Misleading distribution:</strong> Sharing referral links in a way that implies official affiliation with or endorsement by us.
        </li>
      </ul>

      <h3 class="text-lg font-medium text-(--color-text) mt-6 mb-3">10.3 Abnormal Activity</h3>
      <p class="text-(--color-text-secondary) leading-relaxed">
        We monitor referral activity across our platform. Referral patterns that are significantly disproportionate to typical usage — including but not limited to unusually high referral frequency relative to platform-wide averages — may be flagged as abnormal activity and investigated.
      </p>

      <h3 class="text-lg font-medium text-(--color-text) mt-6 mb-3">10.4 Enforcement</h3>
      <p class="text-(--color-text-secondary) leading-relaxed mb-3">
        If we determine, at our sole discretion, that an account has engaged in abuse or abnormal activity, we reserve the right to, without prior notice:
      </p>
      <ul class="space-y-2 text-(--color-text-secondary)">
        <li>Throttle, reduce, or suspend the accumulation of referral bonuses</li>
        <li>Revoke or invalidate any coupons obtained through abusive or abnormal activity</li>
        <li>Limit or terminate access to the referral program</li>
        <li>Suspend or terminate the user's account</li>
      </ul>

      <h3 class="text-lg font-medium text-(--color-text) mt-6 mb-3">10.5 Program Changes</h3>
      <p class="text-(--color-text-secondary) leading-relaxed">
        We reserve the right to modify, suspend, or discontinue the referral program — including bonus percentages, stacking limits, and qualification criteria — at any time and at our sole discretion, with or without notice.
      </p>
    </section>

    <!-- Section 11: Governing Law -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">11. Governing Law</h2>
      <p class="text-(--color-text-secondary) leading-relaxed">
        These Terms of Service shall be governed by and construed in accordance with the laws of Bulgaria, without regard to its conflict of law provisions.
      </p>
      <p class="text-(--color-text-secondary) leading-relaxed mt-4">
        Any disputes arising from these terms or your use of the service shall be resolved in the courts of Bulgaria.
      </p>
    </section>

    <!-- Section 12: Contact -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">12. Contact Us</h2>
      <p class="text-(--color-text-secondary) leading-relaxed">
        If you have any questions about these Terms of Service, please contact us at:
      </p>
      <p class="text-(--color-text-secondary)">
        <strong>Email:</strong> {CONTACT_EMAIL}
      </p>
    </section>

    <!-- Section 13: Severability -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">13. Severability</h2>
      <p class="text-(--color-text-secondary) leading-relaxed">
        If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and effect.
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
