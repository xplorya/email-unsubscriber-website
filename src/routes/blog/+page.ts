import { getAllPosts, getFeaturedPost, getAllCategories, getCategoryCounts } from '$lib/blog/posts'
import type { Post } from '$lib/blog/types'

export const prerender = true

export function load(): {
  /** ALL posts (including the featured one). Grid filters apply to this set. */
  posts: Post[]
  /** Featured post (if any). Always rendered as a permanent marquee slot; also appears in the filtered grid when it matches. */
  featured: Post | null
  categories: string[]
  categoryCounts: Record<string, number>
} {
  return {
    posts: getAllPosts(),
    featured: getFeaturedPost(),
    categories: getAllCategories(),
    categoryCounts: getCategoryCounts()
  }
}
