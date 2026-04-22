<script lang="ts">
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
      <h1 class="text-3xl font-bold text-(--color-text) mb-2">Email Unsubscriber<span class="align-super text-sm">&trade;</span> Security Transparency Report</h1>
      <!-- Close button -->
      <button
        onclick={handleClose}
        class="inline-flex items-center justify-center w-9 h-9 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-label="Close"
      >
        <span class="inline-block w-5 h-5 [&>svg]:w-full [&>svg]:h-full">{@html icons.xMark}</span>
      </button>
    </div>
    <p class="text-sm text-slate-500 mb-8">Last Updated: April 22, 2026</p>

    <p class="text-(--color-text-secondary) leading-relaxed mb-8">
      We believe security claims should be verifiable, not just marketable. This report details our verification status, security tooling, and how to confirm our claims yourself.
    </p>

    <!-- Section 1: Google Verification Status -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">1. Google Verification Status</h2>
      <p class="text-(--color-text-secondary) leading-relaxed">Our Google OAuth integration has completed every stage of Google's multi-stage verification pipeline, including <a href="https://appdefensealliance.dev/casa" target="_blank" rel="noopener noreferrer" class="text-slate-600 dark:text-slate-400 underline hover:text-slate-800 dark:hover:text-slate-200">CASA</a> (Cloud Application Security Assessment) — a security framework administered by the <a href="https://appdefensealliance.dev" target="_blank" rel="noopener noreferrer" class="text-slate-600 dark:text-slate-400 underline hover:text-slate-800 dark:hover:text-slate-200">App Defense Alliance</a> that Google requires for apps accessing sensitive user data:
      </p>
      <div class="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 mb-4">
        <ul class="space-y-3 text-(--color-text-secondary)">
          <li class="flex items-start gap-2">
            <span class="inline-block w-5 h-5 text-teal-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.verifyRibbonNoTail}</span>
            <span><strong>OAuth compliance</strong> — Approved</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="inline-block w-5 h-5 text-teal-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.verifyRibbonNoTail}</span>
            <span><strong>Privacy policy</strong> — Approved</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="inline-block w-5 h-5 text-teal-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.verifyRibbonNoTail}</span>
            <span><strong>Scope justification</strong> — Approved</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="inline-block w-5 h-5 text-teal-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.verifyRibbonNoTail}</span>
            <span><strong>Limited Use compliance</strong> — Approved</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="inline-block w-5 h-5 text-teal-500 shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.verifyRibbonNoTail}</span>
            <span><strong>CASA security assessment</strong> — Approved</span>
          </li>
        </ul>
      </div>
      <p class="text-(--color-text-secondary) leading-relaxed">
        Both Google and Microsoft OAuth integrations are fully verified;
      </p>
    </section>

    <!-- Section 2: Security Assessment -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">2. Security Assessment</h2>
      <p class="text-(--color-text-secondary) leading-relaxed mb-4">
        We perform continuous static application security testing (SAST) and software composition analysis (SCA) using <strong>FluidAttacks</strong> — the same tool used by ADA-authorized assessment labs to evaluate applications.
      </p>

      <!-- Comparison table -->
      <div class="overflow-x-auto mb-4">
        <table class="w-full text-sm border-collapse">
          <thead>
            <tr>
              <th class="text-left py-3 px-4 font-medium text-(--color-text-secondary) border-b border-(--color-border)"></th>
              <th class="text-left py-3 px-4 font-medium text-(--color-text-secondary) border-b border-(--color-border)">CASA Tier 2 Requirement</th>
              <th class="text-left py-3 px-4 font-semibold text-teal-700 dark:text-teal-300 border-b-2 border-teal-500">Our Practice</th>
            </tr>
          </thead>
          <tbody class="text-(--color-text-secondary)">
            <tr>
              <td class="py-3 px-4 font-medium border-b border-(--color-border)">Scope</td>
              <td class="py-3 px-4 border-b border-(--color-border)">73 specific CWEs</td>
              <td class="py-3 px-4 border-b border-(--color-border) text-teal-700 dark:text-teal-300 font-medium">Full OWASP catalog</td>
            </tr>
            <tr>
              <td class="py-3 px-4 font-medium border-b border-(--color-border)">Frequency</td>
              <td class="py-3 px-4 border-b border-(--color-border)">Annual</td>
              <td class="py-3 px-4 border-b border-(--color-border) text-teal-700 dark:text-teal-300 font-medium">Every release</td>
            </tr>
            <tr>
              <td class="py-3 px-4 font-medium border-b border-(--color-border)">Open critical/high findings</td>
              <td class="py-3 px-4 border-b border-(--color-border)">—</td>
              <td class="py-3 px-4 border-b border-(--color-border) text-teal-700 dark:text-teal-300 font-medium">0</td>
            </tr>
            <tr>
              <td class="py-3 px-4 font-medium border-b border-(--color-border)">Open medium findings</td>
              <td class="py-3 px-4 border-b border-(--color-border)">—</td>
              <td class="py-3 px-4 border-b border-(--color-border) text-teal-700 dark:text-teal-300 font-medium">0</td>
            </tr>
            <tr>
              <td class="py-3 px-4 font-medium">Tolerance</td>
              <td class="py-3 px-4">Low-risk acceptable</td>
              <td class="py-3 px-4 text-teal-700 dark:text-teal-300 font-medium">Zero tolerance — all findings addressed</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="text-(--color-text-secondary) leading-relaxed">
        Our most recent assessment found <strong>0 open CWEs</strong> across all severity levels. We don't limit ourselves to the minimum CASA threshold — every finding is resolved before release, regardless of severity. Our testing covers the full <a href="https://owasp.org/www-project-application-security-verification-standard/" target="_blank" rel="noopener noreferrer" class="text-slate-600 dark:text-slate-400 underline hover:text-slate-800 dark:hover:text-slate-200">OWASP ASVS</a> catalog;
      </p>
    </section>

    <!-- Section 3: Architecture at a Glance -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">3. Architecture at a Glance</h2>
      <p class="text-(--color-text-secondary) leading-relaxed mb-4">
        Your emails never leave your browser. For the complete technical breakdown, see our <a href="/privacy" target="_blank" rel="noopener noreferrer" class="text-slate-600 dark:text-slate-400 underline hover:text-slate-800 dark:hover:text-slate-200">Privacy Policy</a>.
      </p>

      <div class="space-y-2 text-(--color-text-secondary) mb-6">
        <p class="flex items-start gap-3 m-0">
          <span class="inline-block w-5 h-5 shrink-0 text-center">1.</span>
          <span>Email scanning happens entirely client-side via direct API calls to your email provider</span>
        </p>
        <p class="flex items-start gap-3 m-0">
          <span class="inline-block w-5 h-5 shrink-0 text-center">2.</span>
          <span>Our backend receives an identity token only — it cannot access your emails</span>
        </p>
        <p class="flex items-start gap-3 m-0">
          <span class="inline-block w-5 h-5 shrink-0 text-center">3.</span>
          <span>Your email access token is never transmitted to or through our servers</span>
        </p>
        <p class="flex items-start gap-3 m-0">
          <span class="inline-block w-5 h-5 shrink-0 text-center">4.</span>
          <span>We request read-only access — we cannot modify, delete, or send emails</span>
        </p>
      </div>

    </section>

    <!-- Section 4: Verify It Yourself -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold text-(--color-text) border-b border-(--color-border) pb-2">4. Verify It Yourself</h2>
      <p class="text-(--color-text-secondary) leading-relaxed">
        Our OAuth service is fully open source. Audit exactly how we handle authentication and confirm that email tokens never reach our infrastructure:
      </p>
      <p class="text-(--color-text-secondary)">
        <a href="https://github.com/micro-solutions-llc/email-unsubscriber-open-oauth" target="_blank" rel="noopener noreferrer" class="text-slate-600 dark:text-slate-400 underline hover:text-slate-800 dark:hover:text-slate-200">github.com/micro-solutions-llc/email-unsubscriber-open-oauth</a>
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
