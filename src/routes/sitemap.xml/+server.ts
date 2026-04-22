import { SITE_URL } from '$lib/utilities/constants'
import { getAllPosts } from '$lib/blog/posts'

export const prerender = true

const STATIC_PATHS = ['/', '/privacy', '/terms', '/security', '/blog']

export function GET() {
  const posts = getAllPosts()
  const today = new Date().toISOString().slice(0, 10)

  const urls = [
    ...STATIC_PATHS.map((path) => ({
      loc: `${SITE_URL}${path === '/' ? '' : path}`,
      lastmod: today
    })),
    ...posts.map((p) => ({
      loc: `${SITE_URL}/blog/${p.slug}`,
      lastmod: p.date
    }))
  ]

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`
  )
  .join('\n')}
</urlset>
`

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  })
}
