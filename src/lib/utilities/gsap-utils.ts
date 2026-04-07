/**
 * Centralised GSAP loader and reusable animation helpers.
 *
 * Every call to `loadGsap()` returns the same cached promise so the library
 * and its plugins are only imported and registered once per session.
 */
import type { Action } from 'svelte/action'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface GsapBundle {
  gsap: typeof import('gsap').default
  ScrollTrigger: any
  Flip: any
  SplitText: any
  ScrambleTextPlugin: any
  DrawSVGPlugin: any
}

/* ------------------------------------------------------------------ */
/*  Singleton loader                                                   */
/* ------------------------------------------------------------------ */

let cached: Promise<GsapBundle> | null = null

/**
 * Lazy-loads GSAP + every premium plugin the site uses.
 * The first invocation fires the dynamic imports; subsequent calls
 * return the same resolved promise.
 */
export function loadGsap(): Promise<GsapBundle> {
  if (typeof window === 'undefined') {
    // SSR — return a promise that never resolves (components should
    // only call this inside onMount / $effect which are client-only).
    return new Promise<GsapBundle>(() => {})
  }

  if (!cached) {
    cached = (async () => {
      const gsapModule = await import('gsap')
      // @ts-ignore — GSAP plugins ship with conflicting type declarations on case-insensitive FS
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      // @ts-ignore
      const { Flip } = await import('gsap/Flip')
      // @ts-ignore
      const { SplitText } = await import('gsap/SplitText')
      // @ts-ignore
      const { ScrambleTextPlugin } = await import('gsap/ScrambleTextPlugin')
      // @ts-ignore
      const { DrawSVGPlugin } = await import('gsap/DrawSVGPlugin')

      const gsap = gsapModule.default

      gsap.registerPlugin(
        ScrollTrigger,
        Flip,
        SplitText,
        ScrambleTextPlugin,
        DrawSVGPlugin
      )

      gsap.defaults({ ease: 'expo.out', duration: 0.8 })

      return { gsap, ScrollTrigger, Flip, SplitText, ScrambleTextPlugin, DrawSVGPlugin }
    })()
  }

  return cached
}

/* ------------------------------------------------------------------ */
/*  Motion preference helper                                           */
/* ------------------------------------------------------------------ */

/** Synchronous check — only valid on the client. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/* ------------------------------------------------------------------ */
/*  Svelte actions                                                     */
/* ------------------------------------------------------------------ */

/**
 * Svelte 5 action — subtle magnetic pull toward cursor on hover.
 *
 * Usage:  `<button use:magneticHover>…</button>`
 *         `<button use:magneticHover={0.5}>…</button>`
 *
 * The optional numeric parameter controls pull strength (default 0.3).
 * Respects `prefers-reduced-motion` — skips entirely when active.
 */
export const magneticHover: Action<HTMLElement, number | undefined> = (node, strength = 0.3) => {
  if (prefersReducedMotion()) return

  let gsapRef: typeof import('gsap').default | null = null
  let onMove: ((e: MouseEvent) => void) | null = null
  let onLeave: (() => void) | null = null

  loadGsap().then(({ gsap }) => {
    if (!node.isConnected) return
    gsapRef = gsap

    onMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect()
      const offsetX = e.clientX - (rect.left + rect.width / 2)
      const offsetY = e.clientY - (rect.top + rect.height / 2)

      gsap.to(node, {
        x: offsetX * strength,
        y: offsetY * strength,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    onLeave = () => {
      gsap.to(node, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      })
    }

    node.addEventListener('mousemove', onMove)
    node.addEventListener('mouseleave', onLeave)
  })

  return {
    destroy() {
      if (onMove) node.removeEventListener('mousemove', onMove)
      if (onLeave) node.removeEventListener('mouseleave', onLeave)
      // Reset transform in case component is destroyed mid-hover
      gsapRef?.set(node, { x: 0, y: 0 })
    }
  }
}

/**
 * Svelte 5 action — subtle 3D perspective tilt based on cursor position.
 *
 * Usage:  `<div use:tiltOnHover>…</div>`
 *         `<div use:tiltOnHover={3}>…</div>`
 *
 * The optional numeric parameter sets the maximum tilt angle in degrees
 * (default 2). Respects `prefers-reduced-motion` — skips entirely when active.
 */
export const tiltOnHover: Action<HTMLElement, number | undefined> = (node, maxDeg = 2) => {
  if (prefersReducedMotion()) return

  let gsapRef: typeof import('gsap').default | null = null
  let onMove: ((e: MouseEvent) => void) | null = null
  let onLeave: (() => void) | null = null

  loadGsap().then(({ gsap }) => {
    if (!node.isConnected) return
    gsapRef = gsap

    onMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect()
      // Normalise cursor position to -1..1 range relative to card centre
      const xNorm = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const yNorm = ((e.clientY - rect.top) / rect.height - 0.5) * 2

      // Clamp to maxDeg range
      const xDeg = Math.max(-maxDeg, Math.min(maxDeg, xNorm * maxDeg))
      // Invert Y so tilting "towards" cursor feels natural
      const yDeg = Math.max(-maxDeg, Math.min(maxDeg, -yNorm * maxDeg))

      gsap.to(node, {
        rotateX: yDeg,
        rotateY: xDeg,
        transformPerspective: 800,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    onLeave = () => {
      gsap.to(node, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out'
      })
    }

    node.addEventListener('mousemove', onMove)
    node.addEventListener('mouseleave', onLeave)
  })

  return {
    destroy() {
      if (onMove) node.removeEventListener('mousemove', onMove)
      if (onLeave) node.removeEventListener('mouseleave', onLeave)
      // Reset transform in case component is destroyed mid-hover
      gsapRef?.set(node, { rotateX: 0, rotateY: 0, transformPerspective: 800 })
    }
  }
}

/**
 * Svelte 5 action that splits an `<h2>` (or any element) into words
 * and reveals them with a staggered scroll-triggered animation.
 *
 * Usage:  `<h2 use:revealHeading>…</h2>`
 *
 * When `prefers-reduced-motion` is active the element stays fully
 * visible with no animation applied.
 */
export const revealHeading: Action<HTMLElement> = (node) => {
  let split: { revert: () => void } | null = null
  let trigger: { kill: () => void } | null = null

  if (prefersReducedMotion()) return

  loadGsap().then(({ gsap, SplitText, ScrollTrigger }) => {
    // Guard: component may have unmounted during the async load
    if (!node.isConnected) return

    split = SplitText.create(node, { type: 'words' })
    const words = (split as any).words as HTMLElement[]

    gsap.set(words, { autoAlpha: 0, y: 40 })

    const tween = gsap.to(words, {
      scrollTrigger: {
        trigger: node,
        start: 'top 85%',
        once: true
      },
      autoAlpha: 1,
      y: 0,
      stagger: 0.04,
      duration: 0.7,
      ease: 'expo.out'
    })

    // Capture the ScrollTrigger instance for cleanup
    trigger = tween.scrollTrigger ?? null
  })

  return {
    destroy() {
      trigger?.kill()
      split?.revert()
    }
  }
}
