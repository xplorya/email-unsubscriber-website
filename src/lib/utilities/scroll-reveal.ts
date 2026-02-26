import type { Action } from 'svelte/action'

interface RevealOptions {
  /** IntersectionObserver threshold (0–1). Default: 0.15 */
  threshold?: number
}

/**
 * Scroll-reveal animations are temporarily disabled to ensure Google's
 * verification bot sees all content immediately. All elements are marked
 * as revealed on mount with no hiding or observers.
 *
 * TODO: Restore scroll-reveal animations after Google verification passes.
 */
export const reveal: Action<HTMLElement, RevealOptions | undefined> = (node) => {
  node.classList.add('reveal-target', 'revealed')
}

interface StaggeredOptions extends RevealOptions {
  /** Delay in milliseconds before adding the `revealed` class. Default: 0 */
  delay?: number
}

export const revealStaggered: Action<HTMLElement, StaggeredOptions | undefined> = (node) => {
  node.classList.add('reveal-target', 'revealed')
}