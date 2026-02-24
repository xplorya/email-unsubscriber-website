import type { Action } from 'svelte/action'

interface RevealOptions {
  /** IntersectionObserver threshold (0–1). Default: 0.15 */
  threshold?: number
}

/**
 * Svelte action that adds a scroll-triggered fade-in reveal.
 *
 * Adds the `reveal-target` class immediately and the `revealed` class
 * once the element enters the viewport. Fires once only.
 *
 * Respects `prefers-reduced-motion: reduce` — skips the animation
 * and adds the `revealed` class immediately.
 *
 * Usage:
 *   <div use:reveal>...</div>
 *   <div use:reveal={{ threshold: 0.3 }}>...</div>
 */
export const reveal: Action<HTMLElement, RevealOptions | undefined> = (node, options) => {
  const threshold = options?.threshold ?? 0.15

  node.classList.add('reveal-target')

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) {
    node.classList.add('revealed')
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.unobserve(entry.target)
        }
      }
    },
    { threshold }
  )

  observer.observe(node)

  return {
    destroy() {
      observer.disconnect()
    }
  }
}

/**
 * Svelte action for staggered reveal on individual items.
 *
 * Same as `reveal` but accepts a delay (in ms) to stagger
 * animations on sibling elements.
 *
 * Usage:
 *   <div use:revealStaggered={{ delay: 100 }}>...</div>
 *   <div use:revealStaggered={{ delay: 200, threshold: 0.2 }}>...</div>
 */
interface StaggeredOptions extends RevealOptions {
  /** Delay in milliseconds before adding the `revealed` class. Default: 0 */
  delay?: number
}

export const revealStaggered: Action<HTMLElement, StaggeredOptions | undefined> = (
  node,
  options
) => {
  const threshold = options?.threshold ?? 0.15
  const delay = options?.delay ?? 0

  node.classList.add('reveal-target')

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) {
    node.classList.add('revealed')
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => {
              entry.target.classList.add('revealed')
            }, delay)
          } else {
            entry.target.classList.add('revealed')
          }
          observer.unobserve(entry.target)
        }
      }
    },
    { threshold }
  )

  observer.observe(node)

  return {
    destroy() {
      observer.disconnect()
    }
  }
}
