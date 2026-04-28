<script lang="ts">
  /**
   * ParallaxDashboard — embeds the real webapp Dashboard via `<iframe>?demo=1`.
   *
   * Layout:
   *   - Desktop (>820px): Mac-chrome window (title bar + traffic lights).
   *   - Mobile (≤820px): bare full-bleed iframe at 100dvh — no device chrome,
   *     edge-to-edge, immersive. Page-scroll continues past the iframe once its
   *     internal scroll reaches the bottom (native scroll-chaining).
   *
   * Behavior:
   *   - Renders inline (no 300vh pin / sticky scroll).
   *   - One-shot fade-in when the chrome enters viewport.
   *   - Pointer-events gate: `none` while offscreen so page scroll passes
   *     through (iOS Safari momentum-scroll mitigation), `auto` once visible.
   */
  import { onMount } from 'svelte'
  import { APP_URL } from '$lib/utilities/constants'

  let winEl: HTMLDivElement | undefined = $state()
  let iframeEl: HTMLIFrameElement | undefined = $state()

  let isMobile = $state(
    typeof window !== 'undefined' && window.matchMedia('(max-width: 820px)').matches,
  )
  let revealed = $state(false)
  let iframeInteractive = $state(false)

  onMount(() => {
    const mq = window.matchMedia('(max-width: 820px)')
    const onChange = () => (isMobile = mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  })

  $effect(() => {
    if (!winEl) return
    const io = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries[0]?.isIntersecting ?? false
        iframeInteractive = isIntersecting
        if (isIntersecting) revealed = true
      },
      { threshold: 0 },
    )
    io.observe(winEl)
    return () => io.disconnect()
  })
</script>

<div class="pd-inner" class:pd-inner-mobile={isMobile}>
  <div class="pd-frame" class:is-phone={isMobile}>
    {#if isMobile}
      <!-- Mobile: bare full-bleed iframe, no chrome -->
      <div bind:this={winEl} class="pd-win pd-win-mobile" class:pd-revealed={revealed}>
        <iframe
          bind:this={iframeEl}
          src={`${APP_URL}?demo=1`}
          loading="lazy"
          title="Email Unsubscriber demo"
          class="pd-iframe-mobile block border-0"
          referrerpolicy="no-referrer-when-downgrade"
          style:pointer-events={iframeInteractive ? 'auto' : 'none'}
        ></iframe>
      </div>
    {:else}
      <!-- Mac chrome -->
      <div class="pd-mac">
        <div class="pd-mac-bar">
          <span class="pd-tl pd-tl-r"></span>
          <span class="pd-tl pd-tl-y"></span>
          <span class="pd-tl pd-tl-g"></span>
          <div class="pd-mac-title">app.email-unsubscriber.com</div>
        </div>
        <div class="pd-mac-body">
          <div bind:this={winEl} class="pd-win" class:pd-revealed={revealed}>
            <iframe
              bind:this={iframeEl}
              src={`${APP_URL}?demo=1`}
              loading="lazy"
              title="Email Unsubscriber demo"
              class="w-full h-180 block border-0"
              referrerpolicy="no-referrer-when-downgrade"
              style:pointer-events={iframeInteractive ? 'auto' : 'none'}
            ></iframe>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .pd-inner {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 56px;
    width: 100%;
  }

  .pd-inner-mobile {
    padding: 0;
    max-width: none;
  }

  .pd-frame {
    position: relative;
    width: 100%;
    max-width: 1100px;
  }

  .pd-frame.is-phone {
    max-width: none;
    width: 100%;
  }

  .pd-win-mobile {
    width: 100%;
    line-height: 0;
    box-shadow:
      0 -4px 12px var(--color-card-shadow-hover),
      0 -2px 4px var(--color-card-shadow),
      0 4px 12px var(--color-card-shadow-hover),
      0 2px 4px var(--color-card-shadow);
    z-index: 1;
    position: relative;
  }

  .pd-iframe-mobile {
    width: 100%;
    height: 100dvh;
    display: block;
  }

  /* Fallback for browsers without dvh */
  @supports not (height: 100dvh) {
    .pd-iframe-mobile { height: 100vh; }
  }

  .pd-mac {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    background: var(--color-bg-secondary-solid);
    border: 1px solid var(--color-border);
    box-shadow:
      0 30px 60px -20px rgba(2, 30, 40, 0.35),
      0 10px 30px -10px rgba(2, 30, 40, 0.25);
  }

  .pd-mac-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    background: linear-gradient(
      to bottom,
      color-mix(in srgb, var(--color-bg-secondary-solid) 80%, #000),
      var(--color-bg-secondary-solid)
    );
    border-bottom: 1px solid var(--color-border);
    position: relative;
  }

  .pd-tl { width: 11px; height: 11px; border-radius: 50%; display: inline-block; }
  .pd-tl-r { background: #ff5f57; }
  .pd-tl-y { background: #febc2e; }
  .pd-tl-g { background: #28c840; }

  .pd-mac-title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    font-weight: 500;
    color: var(--color-text-secondary);
  }

  .pd-mac-body {
    background: var(--color-bg);
  }

  /* One-shot fade-in: hidden until viewport entry, then settles */
  .pd-win {
    position: relative;
    opacity: 0;
    transform: translateY(40px) scale(0.96);
    transition:
      opacity 700ms ease-out,
      transform 700ms ease-out;
    will-change: opacity, transform;
  }

  .pd-win.pd-revealed {
    opacity: 1;
    transform: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .pd-win {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
</style>
