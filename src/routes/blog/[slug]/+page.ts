import { error } from '@sveltejs/kit'
import { getAllPosts, getPostBySlug, getRelatedPosts } from '$lib/blog/posts'
import type { Post } from '$lib/blog/types'

export const prerender = true

export function entries() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export function load({ params }: { params: { slug: string } }): { post: Post; related: Post[] } {
  const post = getPostBySlug(params.slug)
  if (!post) {
    throw error(404, `Post "${params.slug}" not found.`)
  }
  return {
    post,
    related: getRelatedPosts(post, 3)
  }
}
