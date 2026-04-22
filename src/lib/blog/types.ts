/**
 * Blog post types — derived from mdsvex frontmatter + runtime helpers.
 *
 * Authoring schema is documented in `src/content/blog/README.md`.
 */

export interface Post {
  /** Required frontmatter: post title (used in h1 + meta). */
  title: string
  /** URL-safe slug (derived from filename). */
  slug: string
  /** ISO date string (YYYY-MM-DD). */
  date: string
  /** Short marketing excerpt shown on cards + og:description. */
  excerpt: string
  /** Author name. Defaults to "Email Unsubscriber Team". */
  author: string
  /** At least one category required. First is the "primary" category. */
  categories: string[]
  /** Optional free-form tags for similarity matching in related posts. */
  tags?: string[]
  /** Path to cover image under `/blog/covers/<slug>.<ext>` (relative to `static/`). */
  cover?: string
  /** Alt text for the cover image; falls back to the title if unset. */
  coverAlt?: string
  /** Mark a single post `true` to highlight it as the hero on `/blog`. */
  featured?: boolean
  /** If true, the post is excluded from every listing + sitemap + route. */
  draft?: boolean
  /** Human-readable reading time (written by remark-reading-time). */
  readingTime: string
  /** Compiled Svelte component exported from the .md file. */
  Component: unknown
}

export interface Heading {
  id: string
  text: string
  level: 2 | 3
}
