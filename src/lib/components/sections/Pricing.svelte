<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { loadGsap, prefersReducedMotion, revealHeading } from '$lib/utilities/gsap-utils'
  import { APP_URL } from '$lib/utilities/constants'
  import { icons } from '$lib/icons'
  import FootnoteExpander from '$lib/components/FootnoteExpander.svelte'
  import StepConnector from '$lib/components/StepConnector.svelte'

  const referralSteps = [
    {
      number: 1,
      title: 'Share',
      description: 'Share your unique referral link with friends and family',
      icon: icons.share
    },
    {
      number: 2,
      title: 'Friends Join',
      description: 'When they sign up using your link, they get a discount on their purchase',
      icon: icons.userPlus
    },
    {
      number: 3,
      title: 'You Earn',
      description: 'You receive discount coupons as rewards when your referrals pay — everyone wins',
      icon: icons.wallet
    }
  ] as const

  /** Placeholder price — update with the real value */
  const PRICE = '€2.99'
  const PRICE_USD = '$3.49'

  const ourPricingProposition = [
    {
    statement: 'No commitment:',
    explanation: 'You owe us nothing extra. Seriously.'
    },
    {
      statement: 'No subscription:',
      explanation: 'Nothing to cancel to stop paying.'
    },
    {
      statement: 'No pay-as-you-go:',
      explanation: 'You get unlimited access.'
    },
    {
      statement: 'No tiers:',
      explanation: 'You get Full Access to all features.'
    },
    {
      statement: 'No caps to referrals and bonuses:',
      explanation: 'The more you share, the more you get.'
    },
  ]

  /* ---- Element refs ---- */
  let cardWrapperEl: HTMLDivElement | undefined = $state()

  /* ---- GSAP cleanup tracking ---- */
  let tweens: { kill: () => void }[] = []
  let triggers: { kill: () => void }[] = []

  function trackTween(t: any) {
    tweens.push(t)
    if (t.scrollTrigger) triggers.push(t.scrollTrigger)
    return t
  }

  onMount(async () => {
    if (prefersReducedMotion()) return

    const { gsap, ScrollTrigger } = await loadGsap()

    // Guard: component may have unmounted during async load
    if (!cardWrapperEl) return

    /* ---- 1. Pricing card entrance ---- */
    gsap.set(cardWrapperEl, { autoAlpha: 0, y: 40, scale: 0.97 })
    trackTween(
      gsap.to(cardWrapperEl, {
        scrollTrigger: {
          trigger: cardWrapperEl,
          start: 'top 80%',
          once: true
        },
        y: 0,
        autoAlpha: 1,
        scale: 1,
        duration: 0.8,
        ease: 'expo.out'
      })
    )

    /* ---- 2. Proposition items stagger ---- */
    const propositionEls = cardWrapperEl.closest('section')?.querySelectorAll('.pricing-proposition')
    if (propositionEls && propositionEls.length > 0) {
      gsap.set(propositionEls, { autoAlpha: 0, y: 20 })

      ScrollTrigger.batch('.pricing-proposition', {
        onEnter: (batch: Element[]) => {
          trackTween(
            gsap.to(batch, {
              y: 0,
              autoAlpha: 1,
              stagger: 0.08,
              duration: 0.6,
              ease: 'back.out(1.7)'
            })
          )
        },
        start: 'top 85%',
        once: true
      })
    }
  })

  onDestroy(() => {
    for (const t of tweens) t.kill()
    for (const st of triggers) st.kill()
    tweens = []
    triggers = []
  })
</script>

<section id="pricing" class="section-fade-top bg-(--color-bg-secondary) py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
  <div class="max-w-7xl mx-auto">
    <h2 use:revealHeading class="text-3xl sm:text-4xl font-bold text-center text-(--color-text)">
      Pricing
    </h2>
    <p class="mt-4 text-center text-(--color-text-secondary) text-lg max-w-2xl mx-auto">
      It doesn't get any simpler
    </p>

    <div class="relative flex flex-col min-[860px]:flex-row justify-center items-center gap-8 lg:gap-12 mt-12 sm:mt-16">
      <!-- Decorative radial accent glow -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none -z-0" style="background: radial-gradient(circle, var(--color-accent) 0%, transparent 70%); opacity: 0.04;"></div>

      <!-- Pricing Card -->
      <div bind:this={cardWrapperEl} class="relative z-10 max-w-md">
        <div class="card-elevated rounded-2xl border-2 border-(--color-border) border-t-4 border-t-(--color-accent) p-8 sm:p-10 text-center" style="background: linear-gradient(to bottom, var(--color-accent-gradient-from), var(--color-bg))">
          <p class="text-5xl sm:text-6xl font-bold text-(--color-text)">
            {PRICE}
          </p>
          <p class="mt-2 text-lg font-medium text-(--color-accent-text)">
            One-Off Payment
          </p>
          <p class="mt-4 text-(--color-text-secondary)">
            One price. Full Access for 30 days. Unlimited usage. No strings attached.
          </p>

          <a
            href={APP_URL}
            class="mt-8 inline-block w-full px-6 py-3.5 text-lg font-semibold rounded-lg bg-(--color-accent) text-white hover:bg-(--color-accent-hover) transition-colors duration-200"
          >
            Start Cleaning
          </a>
        </div>
      </div>

      <!-- Anti-subscription messaging -->
      <div class="flex flex-row max-w-md justify-center">
        <ul class="space-y-3">
          {#each ourPricingProposition as proposition (proposition)}
            <li class="pricing-proposition flex items-center gap-3 justify-start text-md text-(--color-text-secondary)">
              <span class="inline-block w-6 h-6 text-(--color-accent-text) shrink-0 mt-0.5 [&>svg]:w-full [&>svg]:h-full">{@html icons.checkBold}</span>
              <div class="flex flex-col justify-start items-start font-bold">
                <span class="decoration-(--color-text-secondary)/40 font-bold">{proposition.statement}</span>
                <span class="decoration-(--color-text-secondary)/40 font-normal">{proposition.explanation}</span>
              </div>
            </li>
          {/each}
        </ul>
      </div>
    </div>

    <FootnoteExpander id="pricing-referral" triggerText="We also have a Referral Program — tap to expand">
      <div class="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0">
        {#each referralSteps as step, i (step.number)}
          <div class="group card-elevated p-4 sm:p-6 rounded-xl border border-(--color-border) bg-(--color-bg-secondary-solid) flex flex-col items-center text-center max-w-xs w-full">
            <div class="relative">
              <div class="icon-glow w-12 h-12 rounded-full border-2 border-(--color-accent-border) bg-(--color-accent-light) flex items-center justify-center">
                <span class="icon-hover-scale w-6  h-6 text-(--color-accent-text) [&>svg]:w-full [&>svg]:h-full">{@html step.icon}</span>
              </div>
              <span class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-(--color-accent) text-white text-xs font-bold flex items-center justify-center">
                {step.number}
              </span>
            </div>
            <p class="mt-3 font-semibold text-(--color-text)">{step.title}</p>
            <p class="mt-1 text-sm text-(--color-text-secondary)">{step.description}</p>
          </div>
          {#if i < referralSteps.length - 1}
            <StepConnector class="shrink-0 my-1 md:mx-2" />
          {/if}
        {/each}
      </div>
    </FootnoteExpander>
  </div>
</section>
