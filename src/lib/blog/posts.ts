import type { Post } from './types'

/**
 * Eagerly import every markdown file under `src/content/blog/`.
 * mdsvex compiles them to Svelte components; the frontmatter lives on
 * `metadata`, the compiled component on `default`.
 */
type MdsvexModule = {
  metadata: Record<string, unknown> & {
    title: string
    date: string
    excerpt: string
    author?: string
    categories: string[]
    tags?: string[]
    cover?: string
    coverAlt?: string
    featured?: boolean
    draft?: boolean
    /** Written by remark-reading-time plugin. Shape: { text, minutes, time, words } */
    readingTime?: { text: string; minutes: number; time: number; words: number }
  }
  default: unknown
}

const modules = import.meta.glob<MdsvexModule>('/src/content/blog/*.md', { eager: true })

/** Extract slug from file path: `/src/content/blog/hello-world.md` → `hello-world`. */
function pathToSlug(path: string): string {
  return path.split('/').pop()!.replace(/\.md$/, '')
}

function toPost(path: string, mod: MdsvexModule): Post {
  const md = mod.metadata
  const readingTimeText = md.readingTime?.text ?? '1 min read'
  return {
    title: md.title,
    slug: pathToSlug(path),
    date: md.date,
    excerpt: md.excerpt,
    author: md.author ?? 'Email Unsubscriber Team',
    categories: md.categories ?? [],
    tags: md.tags,
    cover: md.cover,
    coverAlt: md.coverAlt,
    featured: md.featured,
    draft: md.draft,
    readingTime: readingTimeText,
    Component: mod.default
  }
}

/**
 * All non-draft posts, sorted newest-first.
 * README.md is excluded by filename filter (eager glob only picks `.md`
 * files in the blog dir; README.md is one of them, so we exclude it by slug).
 */
export function getAllPosts(): Post[] {
  return Object.entries(modules)
    .filter(([path]) => pathToSlug(path) !== 'README')
    .filter(([, mod]) => mod.metadata && typeof mod.metadata.title === 'string')
    .map(([path, mod]) => toPost(path, mod))
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

/**
 * Featured post: most recent post flagged `featured: true`.
 * Falls back to the newest non-draft post if none flagged.
 * Returns `null` only when no posts exist at all.
 */
export function getFeaturedPost(): Post | null {
  const posts = getAllPosts()
  if (posts.length === 0) return null
  const flagged = posts.filter((p) => p.featured)
  if (flagged.length > 1 && import.meta.env.DEV) {
    console.warn(
      `[blog] Multiple posts flagged featured=true; using newest: "${flagged[0].title}".`
    )
  }
  return flagged[0] ?? posts[0]
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug)
}

/**
 * Related posts for a given post.
 * Priority: same-category (first category) → tag overlap → recency.
 * Excludes the current post + drafts.
 */
export function getRelatedPosts(post: Post, n = 3): Post[] {
  const all = getAllPosts().filter((p) => p.slug !== post.slug)
  const primaryCategory = post.categories[0]

  const sameCategory = all.filter((p) => p.categories.includes(primaryCategory))
  if (sameCategory.length >= n) return sameCategory.slice(0, n)

  const remaining = all.filter((p) => !sameCategory.includes(p))
  const currentTags = new Set(post.tags ?? [])

  const byTagOverlap = remaining
    .map((p) => ({
      post: p,
      overlap: (p.tags ?? []).filter((t) => currentTags.has(t)).length
    }))
    .sort((a, b) => (a.overlap === b.overlap ? 0 : b.overlap - a.overlap))
    .map((x) => x.post)

  return [...sameCategory, ...byTagOverlap].slice(0, n)
}

/** Unique category labels across all non-draft posts. */
export function getAllCategories(): string[] {
  const set = new Set<string>()
  for (const p of getAllPosts()) {
    for (const c of p.categories) set.add(c)
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b))
}

/** Count of posts per category (used for chip count badges). */
export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const p of getAllPosts()) {
    for (const c of p.categories) counts[c] = (counts[c] ?? 0) + 1
  }
  return counts
}
