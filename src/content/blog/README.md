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

## Frontmatter schema

```yaml
---
title: "My post title"                  # REQUIRED. Shown as <h1> and in og:title.
date: "2026-04-20"                      # REQUIRED. ISO YYYY-MM-DD. Drives sort order.
excerpt: "One-sentence summary."        # REQUIRED. Shown on cards + og:description.
author: "Email Unsubscriber Team"       # Optional. Defaults to team name.
categories: ["Privacy"]                 # REQUIRED. ≥1. First is the primary.
tags: ["gdpr", "oauth"]                 # Optional. Used by related-post matching.
cover: "/blog/covers/my-new-slug.webp"  # REQUIRED. Path under static/. Filename matches the slug
coverAlt: "Flat vector illustration of …"  # Optional but STRONGLY recommended. See §coverAlt below.
featured: false                         # Optional. Marks as the listing hero.
draft: false                            # Optional. true = excluded from build.
readiness: "Ready for review"           # Optional but recommended.
faq:                                    # Optional. Renders a visible FAQ section + FAQPage JSON-LD. See §FAQ schema.
  - question: "A real question a reader would type?"
    answer: "Plain-text answer, 40-80 words, derived from the post body."
---

Body content goes here as standard markdown.
```

`readingTime` is computed automatically from word count (≈200 wpm) — do NOT set it manually.

Only ONE post should be `featured: true` at a time. If multiple are flagged, the newest wins and a dev-mode warning is logged.

## Article structure (SEO / AEO playbook)

Posts are written to rank in Google **and** to get quoted by answer engines (AI Overviews, ChatGPT, Perplexity, Claude). Both reward the same shape: answer the query fast, in plain language, with the answer sitting near the top and repeated in structured data. Follow this skeleton for every new post.

1. **Opening paragraph — real context, no fluff.** 1-3 sentences that state the concrete situation the reader is in. No "In today's fast-paced world" throat-clearing. Name the problem in the reader's own words. Do not bury the lede.
2. **Quick Answer blockquote — immediately after the opener.** A single `>` blockquote of **40-60 words** that directly answers the main query the post targets. Self-contained: a reader (or an LLM) should be able to lift just this block and have a correct, useful answer. This is the block most likely to be quoted verbatim by an answer engine, and it gets a distinct teal treatment automatically (it's the first blockquote in the post — see §Quick Answer styling). Example:
   ```markdown
   Some real opening context about the reader's situation.

   > Yes — under CAN-SPAM a sender must honor your unsubscribe within 10
   > business days, and under GDPR consent must be as easy to withdraw as it
   > was to give. If emails keep coming after that window, the sender is in
   > violation and you can report them.
   ```
3. **Question-based H2 headings.** Structure the body as `##` headings phrased the way a reader would ask them ("What CAN-SPAM requires", "Why you still get spam after unsubscribing"). Question-shaped headings match voice search and AI-answer prompts. One `##` every 200-400 words.
4. **Internal links to relevant pages.** Link out to related marketing-site sections and other posts (`/`, `/#pricing`, `/blog/<other-slug>`) and, where it fits the flow, to the app at `https://app.email-unsubscriber.com`. Internal links spread ranking signal and give crawlers the site graph. Aim for 2-4 internal links per post, in-context (never a naked "click here").
5. **6+ FAQs via frontmatter.** Close every post with a `faq:` block of **at least 6** question/answer pairs (see §FAQ schema). Each answer must be derivable from the post body — the FAQ is a recap, not new claims.

## FAQ schema (`faq:` frontmatter)

Optional. When present, the post renders a visible "Frequently asked questions" accordion at the bottom **and** emits `FAQPage` JSON-LD alongside the `Article` JSON-LD. Both are built from the same `faq:` array, so the visible text and the structured-data text always match (Google rejects FAQ structured data whose `text` doesn't match on-page content).

```yaml
faq:
  - question: "Is it illegal to ignore an unsubscribe request?"
    answer: "In the U.S., yes. CAN-SPAM requires senders to honor opt-outs within 10 business days; the FTC sets a per-email civil-penalty ceiling and has settled cases for hundreds of thousands to millions of dollars."
  - question: "How long does a sender have to stop emailing me?"
    answer: "Ten business days under CAN-SPAM — up to about two weeks of legitimate continued sending after a clean unsubscribe. Past that window, continued email is a violation."
  # ...at least 6 total
```

Rules:

- **6+ entries recommended per post.** Fewer than 3 rarely earns any AEO benefit; 6-10 is the sweet spot.
- **`question`** — phrase it exactly as a reader would type or speak it. These double as the accordion triggers and JSON-LD `Question.name`.
- **`answer`** — **plain text only** (no markdown, no links, no HTML). It's rendered verbatim in the page and in JSON-LD; markdown would show as literal characters and break the JSON-LD text match. **40-80 words.** Long enough to stand alone, short enough to quote.
- **Derive answers strictly from the post body.** The FAQ is a recap. Never introduce a claim, statistic, or citation that isn't already supported in the article.
- **No duplicate questions** — the accordion keys on the question string.

## Quick Answer styling

The **first** blockquote in a post's body gets a stronger teal accent than a regular pull-quote (thicker left border, slightly larger text, a touch more teal tint) via `.prose > blockquote:first-of-type` in `src/app.css`. This is automatic — there's no class to add. Put your 40-60 word Quick Answer as the first `>` block right after the opening paragraph and it picks up the treatment. Any later blockquotes render as normal pull-quotes.

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

### Why it lives in the `.md` file (not a skill / not a separate file)

- **One place to look** — when the author opens the post, the prompt is right there.
- **No context switching** — copy-paste is two keystrokes away.
- **Survives in git alongside the post** — prompt, subject, and body stay versioned together.
- **Invisible at runtime** — HTML comments don't render, don't get indexed, don't affect SEO.

## Style + quality checklist (before publishing)

- [ ] **Voice** matches the site: calm, declarative, friendly, slightly technical. No marketing fluff.
- [ ] **Title** is short + literal. No clickbait, no capitalized "Our", "The Ultimate", etc.
- [ ] **Excerpt** is one sentence, ≤160 chars — shows on cards + used verbatim as `og:description`.
- [ ] **Categories** chosen from existing set (`Privacy & Safety`, `Your Rights`, `Guides`, `Tools`, `Your Inbox`, `Behind the Scenes`, `AI & I`, `Product`, `Changelog`, `News`). Add a new one only if posts across ≥2 future pieces would share it. First entry = primary (drives the card badge + related-post matching), so pick it deliberately.
    - Categories mirror the content-strategy clusters (`docs/content-strategy/topic-backlog.md`): A→`Privacy & Safety`, B→`Your Rights`, C+D→`Guides`, E→`Tools`, F→`Your Inbox`, G→`Behind the Scenes`, H→`AI & I` (H3, a deliverability-news item, is `News`), I→`Privacy & Safety`/`Your Inbox`, J→`Privacy & Safety`, K→`Your Inbox`.
    - `AI & I` = how AI (Gemini in Gmail, Apple Intelligence, generative marketing AI) changes the reader's own inbox experience. Reader-first "what this means for me" framing, never marketer-advice.
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


## Common gotchas

- **Forgot `featured: false`** on a non-featured post → may steal the hero slot. Only ONE post should be featured.
- **Missing `categories`** → build fails silently / post excluded. Always set ≥1.
- **Forgot the cover file** but set `cover:` in frontmatter → gradient fallback renders (no 404 crash). Fix before shipping.
- **Markdown inside HTML** — mdsvex allows raw HTML but `{` braces are interpreted as Svelte expressions. If embedding raw HTML with `{`, escape as `\{`.
- **Wide tables** scroll horizontally inside a `.overflow-x-auto` wrapper; don't try to cram too many columns.
- **Setext headings inside HTML comments** — do NOT use `===` or `---` underline rules inside the `<!-- cover-generation-prompt -->` block (or anywhere else in the `.md`). A text line followed by `===` is parsed as an alt-syntax `<h1>`, and `---` is parsed as `<h2>`/horizontal rule. remark processes these **before** mdsvex treats the block as raw HTML comment, so your comment opener `<!--` gets wrapped into `<h1 id><!--</h1>` and Svelte then fails with `Expected a valid element or component name`. Symptom: `/blog` returns 500, build error cites `tag_invalid_name`. Use blank lines or plain text descriptors to separate sections inside comments.
