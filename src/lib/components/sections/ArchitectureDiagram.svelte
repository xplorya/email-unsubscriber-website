
<script lang="ts">
  import { onMount, onDestroy } from 'svelte'

  let journeyEl: HTMLDivElement | undefined = $state()
  let rootEl: HTMLDivElement | undefined = $state()
  let topEdge: SVGLineElement | undefined = $state()
  let flapLeft: SVGLineElement | undefined = $state()
  let flapRight: SVGLineElement | undefined = $state()
  let letter: SVGRectElement | undefined = $state()
  let scanLine: SVGLineElement | undefined = $state()
  let beamToBackend: HTMLDivElement | undefined = $state()
  let laserToMail: HTMLDivElement | undefined = $state()
  let codePulse1: HTMLSpanElement | undefined = $state()
  let codePulse2: HTMLSpanElement | undefined = $state()
  let codePulse3: HTMLSpanElement | undefined = $state()
  let progressBar: SVGRectElement | undefined = $state()
  let tl: { kill: () => void; pause: () => void; play: () => void } | null = null
  let intersectionObserver: IntersectionObserver | null = null
  let resizeHandler: (() => void) | null = null

  onMount(async () => {
    if (
      !journeyEl || !topEdge || !flapLeft || !flapRight || !letter || !scanLine ||
      !beamToBackend || !laserToMail || !codePulse1 || !codePulse2 || !codePulse3 ||
      !progressBar
    ) return

    const gsap = (await import('gsap')).default

    // Component may have been destroyed during the async import (e.g. layout switch on hydration)
    if (!rootEl?.isConnected) return

    const styles = getComputedStyle(document.documentElement)
    // const archBeam = styles.getPropertyValue('--arch-beam').trim()
    const progressBarColor = styles.getPropertyValue('--arch-progress').trim()
    const progressBarFlashColor = styles.getPropertyValue('--arch-progress-flash').trim()
    const archScan = styles.getPropertyValue('--arch-scan').trim()

    // Pulse index cycles through the 3 code snippets across repeats
    let pulseIdx = 0
    const pulses = [codePulse1, codePulse2, codePulse3]

    const timeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.5,
      onRepeat: () => { pulseIdx = (pulseIdx + 1) % 3 }
    })

    // ── t=0: Reset everything to start positions ──
    timeline.set(beamToBackend, { left: 'calc(50% - 60px)', opacity: 0 }, 0)
    timeline.set(laserToMail, { left: 'auto', right: 'calc(50% - 60px)', opacity: 0 }, 0)
    timeline.set(journeyEl, { left: '92%', top: '28%', xPercent: -50, yPercent: -50, scale: 0.6, opacity: 0 }, 0)
    timeline.set(topEdge, { opacity: 1 }, 0)
    timeline.set([flapLeft, flapRight], { attr: { y2: 13 } }, 0)
    timeline.set(letter, { attr: { y: 14 } }, 0)
    timeline.set(scanLine, { opacity: 0, attr: { y1: -5, y2: -5 } }, 0)
    timeline.set(pulses, { left: 0, x: '-100%', opacity: 0, display: 'none' }, 0)
    timeline.set(progressBar, { attr: { width: 0, x: 3, y: 4 }, fill: progressBarColor, opacity: 0 }, 0)

    // ── Phase 1: Device -> Backend beam (0.1 -> 0.9s) ──
    // Teal beam travels from center (50%) toward backend — stops at icon's inner edge (64px from left)
    timeline.to(beamToBackend, { left: 60, opacity: 1, duration: 0.6, ease: 'power4.in' }, 0.1)
    timeline.to(beamToBackend, { opacity: 0, duration: 0.2 }, 0.6)

    // ── Phase 2: Backend -> Device code pulse (0.9 -> 2.0s) ──
    // Show the current snippet, animate it left-to-right across the code-stream
    timeline.call(() => {
      pulses.forEach((p, i) => {
        if (p) {
          gsap.set(p, {
            display: i === pulseIdx ? 'inline-block' : 'none',
            left: 0,
            x: '-100%',
            opacity: 0
          })
        }
      })
    }, [], 0.6)
    // Fade in the active snippet
    timeline.call(() => {
      const active = pulses[pulseIdx]
      if (active) {
        gsap.to(active, { opacity: 0.7, duration: 0.1 })
        gsap.to(active, { left: '100%', x: '0%', duration: 2.0, ease: 'none' })
      }
    }, [], 0.65)
    // Progress bar fills inside monitor as code loads (synced with code pulse)
    timeline.to(progressBar, { opacity: 1, duration: 0.2 }, 0.65)
    timeline.to(progressBar, { attr: { width: 18 }, duration: 1.9, ease: 'power1.in' }, 0.65)
    // Fade out all code pulse spans at the end of phase 2
    timeline.call(() => {
      pulses.forEach((p) => {
        if (p) gsap.set(p, { opacity: 0 })
      })
    }, [], 3.0)
    // Progress bar flash on completion — algo loaded, ready to scan
    timeline.to(progressBar, { fill: progressBarFlashColor, duration: 0.1 }, 2.55)
    timeline.to(progressBar, { fill: progressBarColor, duration: 0.2 }, 2.65)

    // ── Phase 3: Device -> Mail laser (2.65s -> 3.25s) ──
    // Teal gradient beam travels from center toward mail provider — head stops at icon's inner edge (64px from right)
    timeline.set(laserToMail, { left: 'auto', right: 'calc(50% - 60px)', opacity: 0 }, 2.65)
    timeline.to(laserToMail, { right: 60, opacity: 1, duration: 0.6, ease: 'power4.in' }, 2.65)
    timeline.to(laserToMail, { opacity: 0, duration: 0.1 }, 3.25)

    // ── Phase 4: Envelope journey — Mail Provider -> Device (3.25 -> ~8.8s) ──
    const E = 3.25
    // Travel from mail provider toward center
    timeline.to(journeyEl, { left: '50%', top: '36.5%', scale: 1.0, opacity: 1, duration: 1, ease: 'power2.inOut' }, E)
    // Scale up for inspection
    timeline.to(journeyEl, { scale: 1.8, duration: 1, ease: 'power2.out' }, E + 0.5)
    // Flap opens
    timeline.to([flapLeft, flapRight], { attr: { y2: 2 }, duration: 0.5, ease: 'power2.inOut' }, E + 1.2)
    // Top edge snaps away when flap tip crosses y=6
    timeline.set(topEdge, { opacity: 0 }, E + 1.52)
    // Letter rises out
    timeline.to(letter, { attr: { y: -6.5 }, duration: 0.8, ease: 'power3.out' }, E + 1.8)

    // Progress bar morphs into scan line — 3 parallel transitions:
    const M = E + 2.3 // (5.55) morph start
    // 1. Parabolic arc: up (easeOut) then down (easeIn). SVG y: lower = higher on screen.
    timeline.to(progressBar, { attr: { y: 0 }, duration: 0.2, ease: 'power2.out' }, M)
    timeline.to(progressBar, { attr: { y: 4 }, duration: 0.2, ease: 'power2.in' }, M + 0.2)
    // 2. Color shift: teal → red (spans full arc)
    timeline.to(progressBar, { fill: archScan, duration: 0.4, ease: 'none' }, M)
    // 3. Resize to match scan line visual dimensions (narrows + thins to match envelope scan line at 1.8x scale)
    timeline.to(progressBar, { attr: { width: 9.5, height: 1, x: 7.5 }, duration: 0.4, ease: 'power2.inOut' }, M)
    // 4. Opacity → 1 during descent so it's fully visible at snap-switch
    timeline.to(progressBar, { opacity: 1, duration: 0.2 }, M + 0.2)
    // Snap-switch at arc end: progress bar disappears, scan line appears instantly
    timeline.set(progressBar, { opacity: 0 }, M + 0.4)
    timeline.set(scanLine, { opacity: 0.8 }, M + 0.4)
    timeline.to(scanLine, { attr: { y1: 5, y2: 5 }, duration: 0.5, ease: 'none' }, E + 2.7)
    timeline.set(scanLine, { opacity: 0 }, E + 3.3)
    // Letter goes back in
    timeline.to(letter, { attr: { y: 14 }, duration: 0.6, ease: 'power2.in' }, E + 3.5)
    // Scale back down
    timeline.to(journeyEl, { scale: 1.0, duration: 0.6, ease: 'power2.in' }, E + 3.8)
    // Flap closes
    timeline.to([flapLeft, flapRight], { attr: { y2: 13 }, duration: 0.6, ease: 'power2.inOut' }, E + 4.1)
    // Top edge reappears
    timeline.set(topEdge, { opacity: 1 }, E + 4.28)
    // Depart and fade
    timeline.to(journeyEl, { left: '55%', top: '15%', scale: 0.8, opacity: 0, duration: 0.6, ease: 'power2.in' }, E + 4.3)

    // Total active: E + 4.9 = ~7.8s + 0.5s repeatDelay = ~8.3s per cycle

    tl = timeline

    // Invalidate GSAP on resize so calc() values re-resolve (e.g., orientation change)
    resizeHandler = () => timeline.invalidate()
    window.addEventListener('resize', resizeHandler)

    // IntersectionObserver: pause animations when off-screen
    if (rootEl) {
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          const isVisible = entries[0]?.isIntersecting ?? false
          if (isVisible) {
            rootEl?.classList.remove('paused')
            tl?.play()
          } else {
            rootEl?.classList.add('paused')
            tl?.pause()
          }
        },
        { threshold: 0 }
      )
      intersectionObserver.observe(rootEl)
    }
  })

  onDestroy(() => {
    tl?.kill()
    intersectionObserver?.disconnect()
    if (resizeHandler) window.removeEventListener('resize', resizeHandler)
  })
</script>

<div bind:this={rootEl} class="architecture-root">
  <div class="architecture-container ">

    <!-- Device -> Backend beam (teal dot) -->
    <div bind:this={beamToBackend} class="beam-dot"></div>

    <!-- Device -> Mail laser (gradient beam) -->
    <div bind:this={laserToMail} class="laser-beam"></div>

    <!-- Code pulse: Backend -> Client (scanning algorithm sent to device) -->
    <div class="code-stream" style="left: calc(0% + 60px); right: calc(50% + 56px); top: 28%;">
      <span bind:this={codePulse1} class="code-pulse"><em>const</em> unsub<b>=</b>e<b>.</b>headers<b>.</b><em>filter</em>(h<b>=></b>h[<u>'list-unsubscribe'</u>]<b>.</b><em>match</em>(<u>/mailto:|https?:/</u>))</span>
      <span bind:this={codePulse2} class="code-pulse"><em>if</em>(msg<b>.</b>from<b>.</b><em>includes</em>(<u>'noreply@'</u>)<b>&&</b>msg<b>.</b>body<b>.</b><em>indexOf</em>(<u>'unsubscribe'</u>)<b>></b><i>-1</i>)<em>return</em> <i>true</i></span>
      <span bind:this={codePulse3} class="code-pulse">scan(inbox<b>.</b><em>map</em>(e<b>=></b>{'{'}<em>let</em> h<b>=</b><em>parseHeaders</em>(e<b>.</b>raw)<b>;</b><em>return</em>{'{'} id<b>:</b>e<b>.</b>id<b>,</b>unsub<b>:</b>h[<u>'list-unsub'</u>] {'}'}{'}'})) </span>
    </div>

    <!-- Backend Node -->
    <div class="absolute left-0 top-[15%]" style="z-index: 10;">
      <div class="node-backend relative">
        <div class="flex flex-col items-start">
          <!-- Lucid Server icon -->
          <svg class="w-16 h-16 text-(--arch-icon)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect width="20" height="8" x="2" y="2" rx="2" ry="2"/>
            <rect width="20" height="8" x="2" y="14" rx="2" ry="2"/>
            <circle cx="6" cy="6" r="1" fill="var(--arch-led)" stroke="none" class="led-blink-1"/>
            <circle cx="6" cy="18" r="1" fill="var(--arch-led)" stroke="none" class="led-blink-2"/>
          </svg>
          <div class="text-(--arch-label) text-sm font-mono text-center">Our Backend</div>
        </div>
      </div>
    </div>

    <!-- Client Node (center) -->
    <div class="absolute left-1/2 bottom-0 -translate-x-1/2" style="z-index: 10;">
      <div class="node-client relative">
        <div class="flex flex-col items-center">
          <!-- Lucide Monitor icon -->
          <svg class="w-30 text-(--arch-icon)" viewBox="0 2 24 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" overflow="visible">
            <rect width="20" height="14" x="2" y="3" rx="2"/>
            <!-- Loading progress bar (fills during code stream, inside screen bottom) -->
            <rect bind:this={progressBar} x="3" y="4" width="0" height="1.5" rx="0.5"
                  fill="var(--arch-beam)" stroke="none" opacity="0"/>
            <line x1="8" x2="16" y1="21" y2="21"/>
            <line x1="12" x2="12" y1="17" y2="21"/>
          </svg>
          <div class="text-(--arch-label) text-sm font-mono text-center">Your Device</div>
        </div>
      </div>
    </div>

    <!-- Mail Provider Node -->
    <div class="absolute right-0 top-[15%]" style="z-index: 10;">
      <div class="node-mail relative">
        <div class="flex flex-col items-end">
          <!-- Server rack with @ symbols (mail server) -->
          <svg class="w-16 h-16 text-(--arch-icon)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect width="20" height="8" x="2" y="2" rx="2" ry="2"/>
            <rect width="20" height="8" x="2" y="14" rx="2" ry="2"/>
            <circle cx="6" cy="6" r="1" fill="var(--arch-led)" stroke="none" class="led-blink-3"/>
            <circle cx="6" cy="18" r="1" fill="var(--arch-led)" stroke="none" class="led-blink-4"/>
            <text x="18" y="6" fill="currentColor" stroke="none" font-size="5" text-anchor="middle" dominant-baseline="middle" font-family="monospace">@</text>
            <text x="18" y="18" fill="currentColor" stroke="none" font-size="5" text-anchor="middle" dominant-baseline="middle" font-family="monospace">@</text>
          </svg>
          <div class="text-(--arch-label) text-sm font-mono text-center">Mail Provider</div>
        </div>
      </div>
    </div>

    <!-- Animated Email Journey: Mail Provider -> Client -->
    <div bind:this={journeyEl} class="absolute" style="left: 92%; top: 25%; z-index: 20; opacity: 0;">
      <svg
        width="30" height="41" viewBox="0 -9 24 33"
        fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round"
        class="text-(--arch-envelope)"
      >
        <defs>
          <!-- V-shaped clip matching the inner fold: letter bottom follows the fold contour -->
          <clipPath id="letter-above-envelope">
            <polygon points="2,-100 22,-100 22,6 12,13 2,6"/>
          </clipPath>
        </defs>

        <!-- U-shaped envelope body (no top edge -- drawn separately) -->
        <path d="M2 6 L2 16 Q2 18 4 18 L20 18 Q22 18 22 16 L22 6"/>

        <!-- Top edge (hidden when flap opens) -->
        <line bind:this={topEdge} x1="2" y1="6" x2="22" y2="6"/>

        <!-- Inner fold (always visible, corners and tip match outer flap exactly) -->
        <path d="M2 6L12 13L22 6"/>

        <!-- Flap: two arms sharing tip at (12, y2). y2=13 closed, y2=2 open -->
        <line bind:this={flapLeft}  x1="2"  y1="6" x2="12" y2="13"/>
        <line bind:this={flapRight} x1="22" y1="6" x2="12" y2="13"/>

        <!-- Letter paper: opaque fill, clipped to only show above the inner fold V -->
        <rect bind:this={letter} x="4.5" y="14" width="15" height="14" rx="0.5"
              color="var(--arch-letter)"
              stroke-width="1" fill="white"
              clip-path="url(#letter-above-envelope)"/>

        <!-- Scan line (red, sweeps over letter during hold) -->
        <line bind:this={scanLine} x1="2" y1="-5" x2="22" y2="-5"
              stroke="var(--arch-scan)" stroke-width="1.5" opacity="0"/>
      </svg>
    </div>

  </div>
</div>

<style>
  /* ── Root container ── */
  .architecture-root {
    width: 100%;
  }

  .architecture-container {
    position: relative;
    width: 100%;
    height: clamp(120px, 18vw, 120px);
  }

  /* ── Device -> Backend beam (gradient laser, mirrored — travels leftward) ── */
  .beam-dot {
    position: absolute;
    width: 8%;
    height: 2px;
    background: linear-gradient(to left, transparent 0%, var(--arch-beam) 40%, var(--arch-beam-bright) 80%, var(--arch-beam-tip) 100%);
    top: 55%;
    transform: translateY(-50%);
    opacity: 0;
    z-index: 2;
    box-shadow: 0 0 6px var(--arch-beam-glow);
  }

  /* ── Device -> Mail laser (gradient beam) ── */
  .laser-beam {
    position: absolute;
    width: 8%;
    height: 2px;
    background: linear-gradient(to right, transparent 0%, var(--arch-beam) 40%, var(--arch-beam-bright) 80%, var(--arch-beam-tip) 100%);
    top: 55%;
    transform: translateY(-50%);
    opacity: 0;
    z-index: 2;
    box-shadow: 0 0 6px var(--arch-beam-glow);
  }

  /* ── Server LED indicators (green, pseudo-random blink via staggered periods) ── */
  .led-blink-1 { animation: led-blink 1.3s step-end infinite; }
  .led-blink-2 { animation: led-blink 1.7s step-end infinite; animation-delay: 0.4s; }
  .led-blink-3 { animation: led-blink 2.1s step-end infinite; animation-delay: 0.2s; }
  .led-blink-4 { animation: led-blink 1.5s step-end infinite; animation-delay: 0.7s; }

  @keyframes led-blink {
    0%, 49%  { opacity: 1; }
    50%, 100% { opacity: 0.15; }
  }

  /* ── Code pulse: Backend -> Client ──
     GSAP-driven: snippets cycle via onRepeat callback, animated left-to-right.
     CSS handles only static styling; no @keyframes needed. */
  .code-stream {
    position: absolute;
    overflow: hidden;
    transform: translateY(-50%);
    z-index: 1;
    height: 1rem;
  }

  .code-pulse {
    position: absolute;
    top: 0;
    white-space: nowrap;
    font-family: ui-monospace, monospace;
    font-size: 0.8rem;
    color: var(--arch-code);
    opacity: 0;
    display: none;
  }

  /* Syntax highlighting via inline elements -- 4 teal shades */
  .code-pulse em  { font-style: normal; color: var(--arch-code-kw); }    /* keywords */
  .code-pulse b   { font-weight: normal; color: var(--arch-code-op); }   /* operators */
  .code-pulse u   { text-decoration: none; color: var(--arch-code-str); } /* strings */
  .code-pulse i   { font-style: normal; color: var(--arch-code-lit); }   /* literals */

  /* ── Pause LED animations when component is off-screen ──
     The .paused class is added via classList (JS), so it won't have Svelte's
     scoping attribute. We use .architecture-root (scoped) :global(.paused) to
     match the dynamically-added class, then descend into scoped children. */
  .architecture-root:global(.paused) .led-blink-1,
  .architecture-root:global(.paused) .led-blink-2,
  .architecture-root:global(.paused) .led-blink-3,
  .architecture-root:global(.paused) .led-blink-4 {
    animation-play-state: paused !important;
  }
</style>
