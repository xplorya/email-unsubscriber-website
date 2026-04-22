# Blog authoring guide

## How the system works (short version)

- **Where posts live**: `src/content/blog/*.md`. Filename (without `.md`) = URL slug. `hello-world.md` → `/blog/hello-world`.
- **mdsvex**: the build-time preprocessor that turns `.md` files into Svelte components. It parses the YAML frontmatter at the top of each file, compiles the markdown body to HTML, runs it through remark/rehype plugins (GFM tables, reading-time, heading slugs, Shiki syntax highlighting), then wraps the output in `PostLayout.svelte`. Result: every `.md` in this dir becomes a static HTML page generated at build time. Zero runtime server.
- **Listing + sitemap + related-posts** are built from `src/lib/blog/posts.ts`, which uses `import.meta.glob('/src/content/blog/*.md', { eager: true })` to enumerate every post's frontmatter at build.
- **Drafts** (`draft: true`) are excluded from the build — no listing entry, no route, no sitemap mention.
- **Deployment**: Cloudflare Pages builds from the submodule repo's `main` branch and serves the prerendered HTML. No backend involvement.

## Creating a new post — workflow

1. `cd website/src/content/blog/`
2. `cp hello-world.md my-new-slug.md` (easier than starting blank).
3. Update frontmatter (see schema below). `title`, `date`, `excerpt`, `categories` are required.
4. Write body in standard markdown.
5. **Update the `cover-generation-prompt` HTML comment block** at the top of the post (sits between the frontmatter and the body — see "Cover generation prompt block" below). Only the `Subject:` line changes per post; the rest is the locked style block from `website/.design/DESIGN.md` §14.10. Copy the whole block into your image generator, save the output as `website/static/blog/covers/my-new-slug.webp` (WebP preferred; PNG OK), and reference it in frontmatter as `cover: "/blog/covers/my-new-slug.webp"`. **Also write a `coverAlt:`** — one sentence describing what's actually drawn in the image, not the post topic. It drives `<img alt>`, `og:image:alt`, `twitter:image:alt`, and the JSON-LD `image.description` for SEO / GEO / accessibility. See the "coverAlt" section below.
6. From `website/`: `npm run dev` → visit `http://localhost:5173/blog/my-new-slug` → verify.
7. Commit in the `website/` submodule → push to the submodule's `main` → CF Pages auto-deploys → bump parent-repo pointer + commit in parent.

## Frontmatter schema

```yaml
---
title: "My post title"                  # REQUIRED. Shown as <h1> and in og:title.
date: "2026-04-20"                      # REQUIRED. ISO YYYY-MM-DD. Drives sort order.
excerpt: "One-sentence summary."        # REQUIRED. Shown on cards + og:description.
author: "Email Unsubscriber Team"       # Optional. Defaults to team name.
categories: ["Privacy"]                 # REQUIRED. ≥1. First is the primary.
tags: ["gdpr", "oauth"]                 # Optional. Used by related-post matching.
cover: "/blog/covers/my-post.webp"      # Optional. Path under static/.
coverAlt: "Flat vector illustration of …"  # Optional but STRONGLY recommended. See §coverAlt below.
featured: false                         # Optional. Marks as the listing hero.
draft: false                            # Optional. true = excluded from build.
---

Body content goes here as standard markdown.
```

`readingTime` is computed automatically from word count (≈200 wpm) — do NOT set it manually.

Only ONE post should be `featured: true` at a time. If multiple are flagged, the newest wins and a dev-mode warning is logged.

## Supported body elements

- Headings `##` (h2) and `###` (h3) appear in the table of contents. `####`+ do not.
- Paragraphs, ordered/unordered lists, blockquotes, tables, horizontal rules (GFM-flavored).
- Inline code with backticks.
- Fenced code blocks with a language hint → Shiki syntax highlighting at build time. Supported langs: `ts`, `js`, `go`, `bash`, `json`, `svelte`, `html`, `css`, `yaml`, `md`. Add more in `website/svelte.config.js` `createHighlighter({ langs: [...] })` if needed.
- Images: `![alt](/blog/covers/my-image.webp)` — wrapped in a bordered figure by prose styles.

## Cover images

Drop WebP (preferred) or PNG at `website/static/blog/covers/<slug>.webp`. Same basename as the markdown file.

If missing, the site renders a teal-tinted gradient placeholder with diagonal stripes. Useful while a design asset is pending; not shippable long-term.

Dimensions: 1200×630 renders cleanly on all cards + hero + OG. Featured-card hero crops to `21:10`; grid cards crop to `16:9`; post hero crops to `21:9`.

## coverAlt

`coverAlt` is the single string that feeds every consumer of the cover image:

- `<img alt>` on `PostCard`, `FeaturedPostCard`, `PostHero` (visible to screen readers, Google Images, Lighthouse a11y).
- `<meta property="og:image:alt">` and `<meta name="twitter:image:alt">` (shown as captions on X / LinkedIn / Slack share-preview cards; screen readers on social platforms).
- JSON-LD `Article.image.description` (structured data for Google + LLM crawlers).

If `coverAlt` is missing, these consumers fall back to the post **title** — which describes the post, not the image. That fallback is safe but wastes a signal.

### How it ranks across surfaces

| Surface | Weight |
|---|---|
| Accessibility / screen readers | **High** — the alt is the only description blind users get. |
| Google Images | **Medium-high** — primary ranking signal for image-search results. |
| GEO / LLM crawlers (GPTBot, ClaudeBot, PerplexityBot) | **Medium** — LLMs use alt as semantic anchor when citing or summarizing a post's image. |
| Social share previews (OG / Twitter) | **Medium** — platforms show alt as a caption fallback when users hover. |
| Google web-search ranking for the post page | **Low** — title + excerpt + JSON-LD do the heavy lifting here. |

### Writing rules

- **Describe the image, not the post topic.** "Flat vector illustration of a price tag paired with a single coin…" — not "How we chose one-time pricing".
- **Lead with the medium** (`Flat vector illustration of …`) so screen-reader users immediately know they're hearing an illustration, not a photo / chart / screenshot.
- **Name the hero object first**, then the supporting objects, in the order they catch the eye.
- **One sentence, ≤160 characters** if possible. Share-preview cards truncate aggressively.
- **No decorative fluff.** Don't describe palette, stroke weight, decorative stars — those are locked by §14 and add no value at this layer.
- **No trailing punctuation-heavy filler** like "beautiful, engaging illustration of…" — screen readers read it verbatim.

### Example

For a cover showing a price tag, a single coin, a cut subscription-loop arrow, a broken chain, a padlock, an empty folder, a wallet, and a calendar:

```yaml
coverAlt: "Flat vector illustration of a price tag paired with a single coin, surrounded by a cut subscription-loop arrow, a broken chain, a padlock, an empty folder, a wallet, and a calendar."
```

## Cover generation prompt block

Every post embeds a `cover-generation-prompt` HTML comment block between the frontmatter and the body. It's **invisible to readers** (HTML comments don't render, mdsvex passes them through untouched) and exists solely to give the author a ready-to-paste prompt for AI image generation. The block has two parts:

1. **Locked style block** — verbatim copy of the `§14.10` prompt in `website/.design/DESIGN.md`. Locks palette, stroke, composition, forbidden list. **Do not tweak this per post** — if the style needs to change, change it in `DESIGN.md` §14 and then repropagate to every post.
2. **`Subject:` line** — the only part that changes per post. 1–3 sentences describing the concrete objects/metaphor for this post's cover. Keep it subject-only; don't re-describe style.

### Authoring flow

1. Copy the full `cover-generation-prompt` block from a sibling post into your new post.
2. Rewrite **only** the `Subject:` line to match this post's topic. Think hero object + 3–6 supporting objects + decorative fillers, all subject-agnostic to palette/style.
3. Copy the whole block (style + tailored Subject) into your image-generation tool (Nano Banana, Midjourney, DALL·E, etc.).
4. Save the output to `website/static/blog/covers/<slug>.webp` and reference it in frontmatter.
5. If the style block ever updates in `DESIGN.md` §14.10, **repropagate** the new block to every existing post. The Subject line stays; only the style portion above it gets replaced.

### Why it lives in the `.md` file (not a skill / not a separate file)

- **One place to look** — when the author opens the post, the prompt is right there.
- **No context switching** — copy-paste is two keystrokes away.
- **Survives in git alongside the post** — prompt, subject, and body stay versioned together.
- **Invisible at runtime** — HTML comments don't render, don't get indexed, don't affect SEO.

## Style + quality checklist (before publishing)

- [ ] **Voice** matches the site: calm, declarative, technical. No marketing fluff.
- [ ] **Title** is short + literal. No clickbait, no capitalized "Our", "The Ultimate", etc.
- [ ] **Excerpt** is one sentence, ≤160 chars — shows on cards + used verbatim as `og:description`.
- [ ] **Categories** chosen from existing set (`Privacy`, `Product`, `Engineering`, `How-to`, `Changelog`, `News`). Add a new one only if posts across ≥2 future pieces would share it.
    - `News` = milestones, compliance wins, PR-worthy announcements (keep these short; link to deep-dive blog post when the topic has substance).
- [ ] **Tags** are lowercase, hyphenated, specific (`oauth`, `gdpr`, `session-storage`).
- [ ] **Body** opens with a punchy 1–2 sentence lede. Don't bury the lede in setup.
- [ ] **h2** sections every 200–400 words. Long unbroken text tires readers.
- [ ] **Code blocks** use realistic snippets, not pseudocode. Always tag the language.
- [ ] **Links** open in-context (no `target="_blank"` needed for internal; external gets auto-flagged).
- [ ] **Cover image** is intentional — no stock photos. Use teal-accent + editorial feel.
- [ ] **`coverAlt`** describes the image (hero object + secondaries), not the post topic. Starts with `Flat vector illustration of …`. See §coverAlt.
- [ ] **Preview locally** (`npm run dev`) → check light + dark theme + mobile viewport.
- [ ] **Lighthouse** on the new post: SEO should hit 100, a11y ≥95.

## Removing the placeholder post

The `hello-world.md` file is a visual-spec smoke test. Delete it before shipping the first real post (and remove the corresponding entry from `user-todo.md` at the repo root).

## Common gotchas

- **Forgot `featured: false`** on a non-featured post → may steal the hero slot. Only ONE post should be featured.
- **Missing `categories`** → build fails silently / post excluded. Always set ≥1.
- **Forgot the cover file** but set `cover:` in frontmatter → gradient fallback renders (no 404 crash). Fix before shipping.
- **Markdown inside HTML** — mdsvex allows raw HTML but `{` braces are interpreted as Svelte expressions. If embedding raw HTML with `{`, escape as `\{`.
- **Wide tables** scroll horizontally inside a `.overflow-x-auto` wrapper; don't try to cram too many columns.
- **Setext headings inside HTML comments** — do NOT use `===` or `---` underline rules inside the `<!-- cover-generation-prompt -->` block (or anywhere else in the `.md`). A text line followed by `===` is parsed as an alt-syntax `<h1>`, and `---` is parsed as `<h2>`/horizontal rule. remark processes these **before** mdsvex treats the block as raw HTML comment, so your comment opener `<!--` gets wrapped into `<h1 id><!--</h1>` and Svelte then fails with `Expected a valid element or component name`. Symptom: `/blog` returns 500, build error cites `tag_invalid_name`. Use blank lines or plain text descriptors to separate sections inside comments.
