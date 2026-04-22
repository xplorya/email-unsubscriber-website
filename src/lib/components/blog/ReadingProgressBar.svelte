<script lang="ts">
  import { onMount } from 'svelte'

  let wrapperEl: HTMLElement | undefined = $state()
  let barEl: HTMLElement | undefined = $state()
  let topPx = $state(64) // optimistic default matching h-16 header

  onMount(() => {
    // 1. Pin the wrapper to the current Header's bottom edge. Recompute on
    //    resize + a short interval post-mount so font-load reflows land.
    function positionProgress() {
      if (!wrapperEl) return
      const header = document.querySelector('header')
      if (!header) return
      const rect = header.getBoundingClientRect()
      topPx = Math.max(0, rect.bottom - 1)
    }

    positionProgress()
    window.addEventListener('resize', positionProgress, { passive: true })
    // Best-effort settle after font-load + theme init
    const t1 = setTimeout(positionProgress, 200)
    const t2 = setTimeout(positionProgress, 1000)

    // 2. Wire up scroll-driven progress between two anchors:
    //    - start: cover's bottom edge passes behind the sticky header
    //    - end:   share-cluster's top edge meets the header's bottom
    const cover = document.querySelector<HTMLElement>('.hero-cover')
    const share = document.querySelector<HTMLElement>('.share-cluster')
    if (!cover || !share || !barEl || !wrapperEl) {
      return () => {
        window.removeEventListener('resize', positionProgress)
        clearTimeout(t1)
        clearTimeout(t2)
      }
    }

    let ticking = false
    let lastAria = -1

    function update() {
      if (!cover || !share || !barEl || !wrapperEl) {
        ticking = false
        return
      }
      // Recompute anchors each call — cheap on already-laid-out elements and
      // avoids stale values after image load / font reflow / resize.
      const coverBottomDoc = cover.getBoundingClientRect().bottom + window.scrollY
      const shareTopDoc = share.getBoundingClientRect().top + window.scrollY
      const startY = coverBottomDoc - topPx
      const endY = shareTopDoc - topPx
      const span = endY - startY
      let pct: number
      if (span <= 0) {
        // Degenerate (tiny article / overlap): 100% past start, else 0%.
        pct = window.scrollY >= startY ? 100 : 0
      } else {
        const raw = (window.scrollY - startY) / span
        pct = Math.max(0, Math.min(1, raw)) * 100
      }
      barEl.style.width = pct.toFixed(2) + '%'
      const rounded = Math.round(pct)
      if (rounded !== lastAria) {
        wrapperEl.setAttribute('aria-valuenow', rounded.toString())
        lastAria = rounded
      }
      ticking = false
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    requestAnimationFrame(update)

    return () => {
      window.removeEventListener('resize', positionProgress)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  })
</script>

<div
  bind:this={wrapperEl}
  role="progressbar"
  aria-label="Article reading progress"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-valuenow="0"
  class="reading-progress"
  style:top="{topPx}px"
>
  <span bind:this={barEl} class="bar" aria-hidden="true"></span>
</div>

<style>
  .reading-progress {
    position: fixed;
    left: 0;
    right: 0;
    height: 3px;
    z-index: 19;
    pointer-events: none;
    background: transparent;
  }

  .bar {
    display: block;
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, var(--color-accent) 0%, var(--color-accent-hover) 100%);
    box-shadow: 0 0 8px var(--color-accent-glow);
    transition: width 80ms linear;
    transform-origin: left center;
  }

  @media (prefers-reduced-motion: reduce) {
    .bar {
      transition: none;
    }
  }

  @media print {
    .reading-progress {
      display: none;
    }
  }
</style>
