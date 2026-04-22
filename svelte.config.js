import adapter from '@sveltejs/adapter-static'
import { mdsvex } from 'mdsvex'
import { createHighlighter } from 'shiki'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'
import remarkReadingTime from 'remark-reading-time'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const highlighter = await createHighlighter({
  themes: ['github-light', 'github-dark-default'],
  langs: ['js', 'ts', 'tsx', 'svelte', 'bash', 'json', 'go', 'html', 'css', 'yaml', 'md', 'text']
})

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [
    mdsvex({
      extensions: ['.md'],
      layout: { _: path.join(__dirname, 'src/lib/components/blog/PostLayout.svelte') },
      highlight: {
        highlighter: (code, lang) => {
          const html = highlighter.codeToHtml(code, {
            lang: lang || 'text',
            themes: { light: 'github-light', dark: 'github-dark-default' },
            defaultColor: false
          })
          return `{@html \`${html.replace(/`/g, '\\`').replace(/\{/g, '\\{').replace(/\}/g, '\\}')}\`}`
        }
      },
      remarkPlugins: [remarkGfm, remarkReadingTime],
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings]
    })
  ],
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      precompress: false,
      strict: false
    }),
    alias: {
      $lib: 'src/lib'
    }
  }
  // NOTE: runes are NOT enabled project-wide. mdsvex emits legacy `$$props`
  // in its generated wrapper, which is incompatible with runes mode. Our
  // .svelte components opt in to runes implicitly by using `$props()`,
  // `$state()`, etc.; mdsvex-generated .md files stay in legacy mode.
}

export default config
