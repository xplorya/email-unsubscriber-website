import { SITE_URL } from '$lib/utilities/constants'
import { getAllPosts } from '$lib/blog/posts'

export const prerender = true

const STATIC_LASTMOD: Record<string, string> = {
  '/': '2026-05-02',
  '/privacy': '2026-05-01',
  '/terms': '2026-05-01',
  '/security': '2026-05-01',
  '/blog': '2026-05-07'
}

const FALLBACK_LASTMOD = '2026-05-07'

const pageModules = import.meta.glob('/src/routes/**/+page.svelte')

function discoverStaticPaths(): string[] {
  const paths = Object.keys(pageModules)
    .map((file) => file.replace(/^\/src\/routes/, '').replace(/\/\+page\.svelte$/, ''))
    .map((path) => (path === '' ? '/' : path))
    .filter((path) => !path.includes('['))
  return Array.from(new Set(paths)).sort()
}

export function GET() {
  const posts = getAllPosts()
  const staticPaths = discoverStaticPaths()

  const urls = [
    ...staticPaths.map((path) => ({
      loc: `${SITE_URL}${path === '/' ? '' : path}`,
      lastmod: STATIC_LASTMOD[path] ?? FALLBACK_LASTMOD
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
