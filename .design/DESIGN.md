# Email Unsubscriber — Marketing Website Design System

> **Extends `../../.design/DESIGN.md`.** This document describes patterns, components, and constraints **specific to the marketing website** (`website/`). Anything not mentioned here defers to the root product-level design system.
>
> Surface: `email-unsubscriber.com` — a SvelteKit static site (`adapter-static`) deployed to Cloudflare Pages. Its job is to convert visitors and explain the product's privacy-first, anti-subscription, one-time-payment positioning.
>
> **Note on ownership:** `website/` is a git submodule pointing at `xplorya/email-unsubscriber-website`. This DESIGN.md lives **inside the submodule's working tree** and is committed in the submodule repo, not the parent. Keep that in mind when changing it — parent PRs must bump the submodule pointer after a submodule commit.

---

## 1. Surface Identity

The marketing site is a **brand surface**. Every visual choice exists to communicate calm confidence, technical credibility, and pro-consumer values.

| Choice | Rationale |
|---|---|
| **DM Sans** as primary typeface | Geometric, modern, slightly warm — evokes a current-era SaaS without the Inter clichés. The webapp uses system fonts; the website's distinct typography is part of the brand. DM Sans is the codified brand typeface — do not swap it without a brand-level review. |
| **Teal accent throughout** (`--color-accent`) | Single brand color carries the entire site. Used for primary CTAs, links, progress, gradient halos, and architecture-diagram animations. |
| **Generous spacing** (`px-4 sm:px-6 lg:px-8`, `gap-12 lg:gap-16` between sections) | Marketing pages need air. Hero is `min-h-screen`. |
| **Atmospheric backgrounds** | Fixed dot grid + radial teal halo + dark-mode noise texture combine to produce a non-flat surface without visual noise. |
| **Choreographed entrance animations** | GSAP-driven hero timeline, scroll-triggered reveals, bento-cell stagger. Every animation respects reduced-motion. |

---

## 2. Brand & Voice (Website-Specific)

The website inherits the product-level brand from the root DESIGN.md but carries a distinct **voice posture** because it is speaking to a **first-time, unauthenticated visitor** who hasn't yet decided whether to trust the product with their inbox. The website is the brand's **spokesperson**.

### Posture

The website's voice is that of a **confident, technically literate advocate** — someone explaining a principled product to a thoughtful person. It respects the reader's intelligence and assumes they can handle nuance.

| Trait | Means | Does NOT Mean |
|---|---|---|
| Declarative | "Clean your inbox. For good." "Pay once. No subscription." | "Join thousands of happy users!" |
| Principled | Values-forward copy (privacy, pro-consumer, open-source) | Preachy, finger-wagging |
| Confident | "We don't keep your data." (full stop) | "We promise to do our best to protect your data." |
| Technically transparent | Links to architecture diagrams, security reports, open-source repos | Bragging about tech, acronym soup |
| Anti-hype | "One-time payment" not "Amazing lifetime deal"; "Your data stays yours" not "Revolutionary privacy" | Bland, beige corporate-speak |

### Microcopy Rules

- **Declarative headings, short sentences.** "Clean your inbox. For good." The period is the brand.
- **No exclamation marks.** None. Not in headings, not in CTAs.
- **No emoji as decoration.** Emoji appear nowhere in the copy (see root §7 — SVG icons only).
- **CTAs are specific verbs**: "Get Started", "Go to App", "See the architecture". Not "Learn More" (unless truly generic).
- **Footnote triggers are italic questions** — "How do we know?" / "See the referral breakdown." — the only italic use in the product.
- **Numbers are exact.** "0 emails kept." beats "Minimal data retention." Concrete > hedged.
- **Privacy claims state the mechanism**, not just the promise. "Emails are scanned in your browser. Nothing leaves your device." beats "We respect your privacy."

### Voice Test

If copy could plausibly live inside the webapp's utility chrome without changing register, it's probably too flat for the website. The website is allowed — required, even — to sound like it has a point of view.

---

## 3. Typography (Website-Specific)

### Font Loading

DM Sans is loaded from Google Fonts in `website/src/app.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet" />
```

Weights loaded: 400, 500, 600, 700 (regular + italic 400, 500). `display=swap` so the system fallback is shown until DM Sans arrives — never invisible text. Body declares the stack with system fallback:

```css
body { font-family: 'DM Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
```

### Display Headings

Marketing-only display sizes appear in the Hero and section openers:

- Hero `h1`: `text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight`
- Hero subtitle: `text-xl sm:text-2xl md:text-3xl font-medium`
- Hero description: `text-base sm:text-lg md:text-xl text-(--color-text-secondary) leading-relaxed`
- Section `h2` openers: typically `text-3xl sm:text-4xl lg:text-5xl font-bold`

`tracking-tight` is applied to display headings; default tracking on body and subheads.

### Italic Footnote Triggers

`FootnoteExpander` triggers are italic — the only italic use in the product. Style: `italic text-(--color-text-secondary)` with a chevron icon that rotates 180° on expand.

---

## 4. Layout System

### Container

`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` is the canonical content shell. Apply at the **section level**, not at a global wrapper. Hero and Mission may break out for full-bleed atmospheric effects, but inner content respects the 7xl ceiling.

### Section Rhythm

Each marketing section is `<section id="…" class="…">` with:
- A consistent vertical breathing room (`py-16 lg:py-24` is typical)
- An optional `section-fade-top` utility class for soft top fade into bg-secondary surfaces
- A scroll-anchor `id` matching the header nav (`home`, `why`, `how-it-works`, `pricing`, `comparison`, `trust`, `about`, `legal`)

Hero (`#home`) is `min-h-screen flex items-center` to dominate the viewport on first load.

### Mission Bento + GSAP Flip — One-Off, Not a Reusable Pattern

The Mission section uses a 6-cell bento grid that **expands a cell on click** via the GSAP Flip plugin (smooth height transition between collapsed and expanded states).

**This is a one-off.** It exists specifically to make the Mission section stand out — it is the visual moment where the site stops being a standard marketing layout and lets the product's principles breathe. It is **not** a reusable pattern, and future bento needs should be evaluated independently rather than assuming the Mission bento is the template.

If a future section is proposed as a bento, do not reach for `Mission.svelte` as the reference. Re-open the design question: does the content actually benefit from a bento? Is a Flip-driven expansion the right interaction, or is the use case better served by a standard grid of cards? Make the call based on the new section's needs, not on what the Mission section happens to do.

When the Mission bento needs to change, edit `Mission.svelte` directly — treat the Flip implementation as section-local code, not as a component library entry.

### Side-by-Side Hero Layout

`flex flex-col lg:flex-row items-center gap-12 lg:gap-16`:
- Left column (`flex-1`) — text content, left-aligned on `lg:`
- Right column (`flex-1`) — `DeviceScreenshot`

This pattern **is** reusable for any future "feature spotlight" section.

---

## 5. Component Catalog

### Header (`Header.svelte`)

Sticky transparent header that **becomes blurred on scroll**:
- `header-base` — `background: transparent` with transitions
- `header-scrolled` (after `scrollY > 80`) — `background: color-mix(in srgb, var(--color-bg) 30%, transparent)` + `backdrop-filter: blur(12px)` + `border-bottom: 1px solid var(--color-border)`

Three-column desktop layout (`md:grid md:grid-cols-[1fr_auto_1fr]`):
- Left: Logo (brand link → `/`)
- Center: Nav links (with active-state highlighting, slight font-size grow on active — see "Active nav link" below)
- Right: CTA ("Go to App" — only visible after the hero CTA scrolls out of view) + ThemeToggle

Mobile: collapses to logo + CTA + ThemeToggle + animated hamburger that morphs into an X. Mobile menu is a full-screen overlay with `bg-(--color-bg)/95 backdrop-blur-md`.

#### Active nav link
Uses `--color-accent-text` color, `font-weight: 600`, slightly larger `font-size: 0.935rem` (vs base `0.875rem`). Transition is a custom cubic-bezier `(0.25, 0.46, 0.45, 0.94)` over 300ms — interpolating font-size and font-weight together for a smooth "settle into active" feel.

#### Hero CTA mirror
`#hero-cta` element in the Hero component is observed on scroll. When its `bottom <= 0` (out of viewport), the header CTA fades + slides in via Svelte transitions (`opacity` + `translateY(-8px)` + `scale(0.95→1)`, 300ms). When the user scrolls back up, header CTA fades out.

#### Active section tracking
On scroll, the header computes which section is closest to the 30% viewport line and updates the `activeSection` state. Also calls `replaceState()` to update the URL hash without scroll (so deep-linking shares work without re-triggering scroll).

#### `hideNav` Prop Variant (for Blog Routes)

`Header.svelte` exposes a single boolean prop: `hideNav: boolean = false`. When `true` (used exclusively by blog routes today), one prop collapses **all landing-page-specific chrome** without requiring a separate component:

```ts
// Header.svelte
let { hideNav = false }: { hideNav?: boolean } = $props()
```

Prop behavior matrix:

| Feature | `hideNav=false` (default, homepage) | `hideNav=true` (blog routes) |
|---|---|---|
| Center `NAV_ITEMS` block | Rendered (7 links with active-state tracking) | **Not rendered.** `1fr` center grid track stays reserved (empty spacer — intentional future slot for blog chrome: search, category nav, newsletter). |
| Mobile hamburger button | Rendered (opens full-screen overlay menu) | **Not rendered.** Rationale: no nav → no menu → no button. A hamburger with nothing to toggle is a dead affordance. |
| Mobile menu overlay | Rendered (when `mobileMenuOpen`) | **Not rendered.** |
| Scroll-spy active-section tracking | Runs (finds section closest to 30% viewport line, calls `replaceState()`) | **Skipped.** No anchors to spy on. The `onMount` scroll listener should `return` early after setting `scrolled` if `hideNav` is true — or just wrap the section-tracking block in `if (!hideNav)`. |
| Hero CTA mirror (`#hero-cta` observer) | Runs (fades header CTA in after hero CTA scrolls out) | **Skipped. CTA always visible.** On blog routes there's no `#hero-cta` to observe; `heroCTAVisible` is initialized to `false` so the CTA renders unconditionally. |
| Brand link `href` | `/` (already — no change) | `/` (unchanged) |
| Backdrop-blur on scroll (`scrolled` toggle) | Runs | Runs (scroll background-weight transition stays identical — this is the shared visual language with the homepage). |
| ThemeToggle | Rendered | Rendered (unchanged) |
| "Go to App" CTA | Rendered (after hero-CTA scroll trigger) | Rendered (unconditionally) |

**One-prop rule.** No additional props. If a future blog feature needs custom chrome in the center slot, add it *inside* `Header.svelte` gated on `hideNav`, or introduce a named slot (`center?: Snippet`) — but do not add more opt-out booleans. The `hideNav` prop is the single switch between "homepage mode" and "blog mode".

**Brand `href`.** The existing `href="/"` on the brand anchor already works for blog routes (navigates to homepage root), so no conditional href or extra prop is needed. Homepage route `/` also uses `href="/"`, which is a no-op self-link there — acceptable.

**Why a prop, not a separate component.** Reuses 100% of the existing Header's visual language (backdrop-blur scroll transition, brand styling, ThemeToggle reuse, CTA styling, sticky positioning, reduced-motion handling, focus-rings) without duplication. Future visual improvements to the Header (hover polish, CTA redesigns, accessibility fixes) propagate to blog routes for free.

### ThemeToggle (`ThemeToggle.svelte`)
Same pendulum-arc transition as the webapp — sun/moon SVG rotated around a pivot below center. Reads/writes the cross-subdomain `theme` cookie.

### Footer (`Footer.svelte`)
4-column grid (Product / Company / Legal / Support) on `md:grid-cols-4`, collapsing to `grid-cols-2` on mobile. Section headers: `text-sm font-semibold uppercase tracking-wider text-(--color-text)`. Links: `text-sm text-(--color-text-secondary) hover:text-(--color-text)`. Bottom row: copyright + social icons (Twitter, LinkedIn, GitHub).

### CookieConsent (`CookieConsent.svelte`)
Bottom-anchored banner with **per-category toggles** (essential always-on; analytics user-controlled). Migrates legacy localStorage `cookie-consent` to the new cookie format on mount. Accept and Reject save preferences via `saveConsent()` from `consent.ts`.

### FootnoteExpander (`FootnoteExpander.svelte`)
Reusable italic-trigger expander used inline in section bodies for "tell me more" content (referral details, tech stack, methodology). Pattern:
- `border-t border-(--color-border) pt-6` separator above the trigger
- Italic trigger row with chevron-down icon that rotates 180° on expand
- Body uses CSS Grid `grid-template-rows: 0fr → 1fr` transition (300ms ease-in-out) — clean height animation without measuring child height
- Optional `id` prop syncs URL hash so footnotes are deep-linkable

### FeatureCarousel (`FeatureCarousel.svelte`)
Horizontal sliding carousel for showing app screenshots across multiple steps. Features:
- Page dots at the bottom
- Desktop arrows (left/right)
- Touch swipe support
- Auto-advance disabled on user interaction (resumes after 10s of inactivity)
- IntersectionObserver-based pause when out of view
- Respects `prefers-reduced-motion`
- Composes `DeviceScreenshot` for the visual

This is a different component from the webapp's `CarouselPlayer` — keep them separate. The website carousel is for content showcases; the webapp carousel is for full-screen onboarding.

### DeviceScreenshot (`DeviceScreenshot.svelte`)
Theme + device aware screenshot loader. Convention: `/screenshots/{feature}/{device}-{theme}.png` (e.g. `/screenshots/hero/desktop-dark.png`). Detects device via `matchMedia('(max-width: 767px)')` and theme via MutationObserver on `<html>` class. Falls back to a dashed-border "Screenshot coming soon" placeholder if the image fails to load.

When adding a new feature spotlight:
1. Add the screenshot files at `website/static/screenshots/{feature}/`
2. Provide all four variants: `mobile-light.png`, `mobile-dark.png`, `desktop-light.png`, `desktop-dark.png`
3. Use `<DeviceScreenshot feature="my-feature" alt="…" />`

### ParticleField (`ParticleField.svelte`)
Self-contained canvas particle animation used in the Mission section background. Theme-aware (re-paints on theme change). IntersectionObserver pauses when out of view. ResizeObserver handles viewport changes. Falls back to a static rendering when `prefers-reduced-motion` is active.

### ArchitectureDiagram (in Mission section)
Animated SVG diagram showing the email-scanning architecture. Drives a teal "scanning beam" across icons with synchronized progress, code-snippet streams, and LED indicators. Colors come from `--arch-*` CSS variables (defined as hex literals so GSAP can interpolate them — see root DESIGN.md §10 on the Tailwind v4 + GSAP gotcha).

### Section Components

Each major page section is its own Svelte component under `website/src/lib/components/sections/`. They are composed in `website/src/routes/+page.svelte` in nav order:

| Component | Anchor | Purpose |
|---|---|---|
| `Hero.svelte` | `#home` | Split text + DeviceScreenshot, GSAP-choreographed entrance, gradient blob, CTA glow pulse |
| `Mission.svelte` | `#why` | 6-cell bento (privacy + zero-data + open-source), ParticleField bg, expandable tech footnote. **Bento + Flip is a section-local one-off — see §4.** |
| `HowItWorks.svelte` | `#how-it-works` | 3-step flow (Connect → Scan → Unsubscribe), expandable feature carousel footnote |
| `Pricing.svelte` | `#pricing` | One-time payment card, anti-subscription messaging, expandable referral footnote |
| `Comparison.svelte` | `#comparison` | Comparison table vs. Unroll.me / Clean Email / Leave Me Alone / Cleanfox |
| `SocialProof.svelte` | `#trust` | Animated counter with accent bar, trust badges (testimonials/logos placeholder until real content) |
| `AboutUs.svelte` | `#about` | Company info, values, contact |
| `Legal.svelte` | `#legal` | Links to Privacy Policy and ToS |

When introducing a new section, create a sibling component with an `id`, register it in the Header `NAV_ITEMS`, and place it in `+page.svelte` in the chosen position.

### Blog Components (`website/src/lib/components/blog/`)

Components backing `/blog` (listing) and `/blog/<slug>` (post). Full visual + behavior specs in `website/.design/mockups/blog-listing/explanation.md` and `website/.design/mockups/blog-post/explanation.md`.

| Component | Props | Purpose |
|---|---|---|
| `ReadingProgressBar.svelte` | — (no props; consumes article element via `use:readingProgress` action) | **Post-page only.** 3px-tall fixed bar under the `<Header hideNav />`'s bottom edge; fills left-to-right as reader scrolls through the `<article>` body. Teal accent gradient (`--color-accent` → `--color-accent-hover`) with `--color-accent-glow` halo. `z-19` (Header is `z-50`). `top` set by JS to track the Header's `getBoundingClientRect().bottom`. Progress formula: clamps `(scrollY + viewportH - articleTop) / articleHeight` to `[0, 1]`. `role="progressbar"` + `aria-valuenow` updates via `requestAnimationFrame`-throttled scroll listener. Under `prefers-reduced-motion`, width transition disabled (bar still updates — it's informational — but jumps instantly). NOT rendered on `/blog` (listing). See `website/.design/mockups/blog-post/explanation.md` §2b for full spec + Svelte action implementation hint. |
| `BlogHero.svelte` | `title`, `subtitle`, `eyebrow?` | Listing-page hero band (eyebrow pill, title, subtitle). Reusable for future category archives. |
| `FeaturedPostCard.svelte` | `post` | Asymmetric featured card used on listing top. Teal accent spine (`::before` 4–6px left bar). Single `<a>` wraps the whole card. |
| `PostCard.svelte` | `post`, `variant?` | Standard card in listing grid and Related Posts. 16:9 cover, overlay category badge, title (`line-clamp-3`), excerpt (`line-clamp-3`), meta row. Hover: elevation + `-translate-y-0.5` + accent border. |
| `CategoryChip.svelte` | `label`, `count?`, `active?`, `onClick` | Pill toggle. Default: border + ghost. Active: teal fill, white text, `aria-pressed="true"`. Count pill inside uses `color-mix(currentColor 12%, transparent)` so it follows state. |
| `CategoryBadge.svelte` | `label`, `variant?` ('overlay' \| 'inline') | Static category pill. `overlay` = on cover image (white bg, accent text, accent border). `inline` = inside body meta rows. |
| `SearchInput.svelte` | `value` (`$bindable`), `placeholder?` | Search field with inline search icon, teal focus ring via `--color-accent-glow` box-shadow, `type="search"`. No visible label — `aria-label="Search posts"`. |
| `PostMeta.svelte` | `post`, `show?` | Dot-separated meta row. Items: author (`userCircle`), date (`calendar`), reading time (`clock`). Each item `inline-flex items-center gap-1.5` with 14–15px icon. |
| `EmptyState.svelte` | `title`, `message`, `action?` | Dashed-border recovery block. Translucent `--color-bg-secondary` bg so atmosphere shows through. Icon bubble (`--color-accent-light` fill, `--color-accent-text`). `role="status" aria-live="polite"`. |
| `PostHero.svelte` | `post` | Post-page hero: breadcrumb, category badge, `h1` title, meta row, 21:9 cover image. |
| `TableOfContents.svelte` | `headings`, `variant` ('desktop' \| 'mobile') | Desktop: sticky right rail with scroll-spy, accent left border on active. Mobile: collapsed `<details>` at top of article. Generated from `<h2>`/`<h3>` in `.prose`. |
| `ShareCluster.svelte` | `title`, `url` | End-of-post share row (X, LinkedIn, copy-link). Copy-link shows "Copied" `aria-live="polite"` feedback for 2s. |
| `RelatedPosts.svelte` | `posts` (length ≤3) | Grid of 3 `PostCard`s. Top border separator; `h2 "Related reading"`. |

**Single reusable asset:** `PostCard` is deliberately the same component on the listing grid, related posts, and any future index/archive. Do not fork it per surface.

**Icons needed (add to `website/src/lib/icons.ts`):** `calendar`, `tag`, `arrowRight`, `copy`. Reuses existing `search`, `userCircle`, `clock`, `chevronDown`, `twitter`, `linkedin`.

### Blog Page Composition

Both blog surfaces render the **same `Header.svelte`** with the `hideNav` prop set to `true` — `<Header hideNav />`. There is no separate blog header component. Gating sits in a nested blog layout (`src/routes/blog/+layout.svelte`) — the **mandated choice** over a root `isBlogPage` derived flag. Rationale (prerendered output is identical either way; picked for cleaner DOM + GEO/LLM-crawler locality + future-extensibility):

- **Cleaner DOM at root.** The root `+layout.svelte` keeps a single responsibility (atmosphere layers + main `<Header />`). No conditional ternary at root.
- **Better crawler locality for GEO.** Nested layout keeps blog-specific chrome, future RSS `<link rel="alternate">`, blog-specific JSON-LD, and future category/author pages co-located under the same layout subtree — LLM crawlers (GPTBot, ClaudeBot, PerplexityBot) use DOM locality heuristics for content-boundary detection.
- **Extensibility.** Future blog-only additions (search in the center slot, RSS, author pages) live inside the blog layout without polluting the root.
- **No SPA confusion.** SvelteKit nested layouts hydrate cleanly; no flash-of-wrong-header.

Legal-page gating (`isLegalPage` check in root layout) stays **unchanged**: legal routes still render no header.

Blog layout file: `src/routes/blog/+layout.svelte` renders `<Header hideNav /> { @render children() }`. Root `+layout.svelte` renders the plain `<Header />` (no prop) when not on legal routes, and the blog layout's `hideNav` variant shadows it on any `/blog*` route.

- **Listing** (`src/routes/blog/+page.svelte`): provided by nested layout (`<Header hideNav />`) + `<main>` containing `<BlogHero> + <FeaturedPostCard> + [SearchInput + CategoryChip row] + (post grid | <EmptyState>)` + `<Footer>`.
- **Post** (`src/routes/blog/[slug]/+page.svelte`): provided by nested layout (`<Header hideNav />`) + `<ReadingProgressBar>` (fixed under the header) + `<main>` containing `<PostHero> + grid[article.prose (+ <ShareCluster> at end), <TableOfContents variant="desktop">] + <RelatedPosts>` + `<Footer>`. Mobile: `<TableOfContents variant="mobile">` is rendered as first child inside `<article>` above the prose.

The listing's canonical layout width is the 7xl container; the post page's article measure is `max-width: 48rem`. Both pages respect the site-wide atmospheric layers (`#site-dots`, `#site-halo`, dark noise) unchanged. The ReadingProgressBar sits at `z-19`, below the Header's `z-50`, above everything else — never collides with the sticky TOC (right rail, inside the article flow) or the hero cover.

---

## 6. Atmospheric Background System

The website wears a multi-layer atmosphere on **every page**:

### Dot Grid (`#site-dots`)
Fixed-position radial-gradient pattern, 32px tile, `--color-dot-grid` color. Subtle parallax via `translateY` driven by an inline style updated from the layout component (1/10th scroll speed). Disabled when reduced-motion is set.

### Teal Halo (`#site-halo`)
Fixed-position 900×900 radial gradient centered on the viewport, blurred 80px, opacity `--color-halo-opacity` (light: 0.09, dark: 0.10). Provides a soft brand-color ambient glow behind all content.

### Dark-Mode Noise Texture
SVG `feTurbulence` filter inlined as a fixed full-screen overlay at `opacity: 0.015`. Only visible in dark mode. Adds barely-perceptible film grain that gives dark surfaces tactile depth.

These three layers are part of `app.css` and the layout — they're "always on" and can't be opted out of per page. They are the brand atmosphere; new sections should not introduce competing background effects.

---

## 7. Motion System

### GSAP

The website uses **GSAP** (with ScrollTrigger, Flip, SplitText, ScrambleText, DrawSVG plugins). All loading is centralized in `website/src/lib/utilities/gsap-utils.ts`:

- `loadGsap()` — singleton lazy-load. First call dynamically imports gsap + plugins, registers them, sets `gsap.defaults({ ease: 'expo.out', duration: 0.8 })`. Subsequent calls return the cached promise.
- Always check `prefersReducedMotion()` before instantiating timelines or scroll triggers; bail early when reduced.
- Always clean up in `onDestroy`: kill timelines, kill ScrollTriggers, revert SplitText splits.

**Default global easing: `expo.out`. Default duration: 0.8s.**

### Reusable Svelte Actions

`gsap-utils.ts` exports:

- `magneticHover` — subtle cursor-pull on hover (`use:magneticHover={0.3}`)
- `tiltOnHover` — 3D perspective tilt (`use:tiltOnHover={2}`, max 2deg)
- `revealHeading` — splits an `h2` into words and staggers their fade-up on scroll (one-shot, `top 85%`)

### Scroll-Reveal (Lighter alternative)

For non-heading reveals, use `website/src/lib/utilities/scroll-reveal.ts`:

- `reveal` — IntersectionObserver fade-up (default `translateY(1.5rem) → 0`, opacity 0→1, 600ms ease-out)
- `revealStaggered` — same with `delay` (ms) for staggered cascades; supports `variant: 'scale'` for a scale-up entrance instead of translate

These actions hide elements via **inline JS styles** (not CSS classes) so that pre-rendered HTML stays visible to crawlers. The `.revealed` class uses `!important` to override.

**Use the lighter scroll-reveal for most content reveals. Reach for GSAP only when you need timeline orchestration, scroll-scrub, or complex stagger.**

### Hero Choreography (Reference)

The Hero entrance timeline (`Hero.svelte`) is the reference for ambitious GSAP work:
- **0.0s** — h1 word reveal (SplitText, `y: 80→0`, `autoAlpha 0→1`, stagger 0.12)
- **0.6s** — subtitle word reveal (stagger 0.05)
- **1.0s** — description fade-up
- **1.3s** — CTA scale spring (`back.out(1.7)`)
- **1.5s** — pricing note fade-up
- **Infinite loop** — CTA glow pulse (boxShadow yoyo, 2s sine.inOut)
- **Infinite loop** — gradient blob oscillation (opacity + scale, 12s yoyo)
- **Scroll-scrub (desktop only)** — DeviceScreenshot parallax (`y: -60 → 60` over hero scroll range)

Note the CTA glow uses **hex literals** for box-shadow (not `--color-accent` / `--color-accent-glow`) because GSAP cannot parse `oklch()` or `color-mix()`. This is the gotcha called out in root DESIGN.md §10.

---

## 8. Color System (Website Extensions)

In addition to the root tokens, the website's `app.css` defines:

### Accent

| Token | Light | Dark |
|---|---|---|
| `--color-accent` | `teal.500` | `teal.500` |
| `--color-accent-hover` | `teal.600` | `teal.400` |
| `--color-accent-light` | `teal.50` | `teal.950` |
| `--color-accent-border` | `teal.200` | `teal.800` |
| `--color-accent-text` | `teal.700` | `teal.400` |
| `--color-accent-glow` | `color-mix(accent 15%, transparent)` | `color-mix(accent 8%, transparent)` |
| `--color-accent-gradient-from` | `#f0fdfa` | `#042f2e` |
| `--color-accent-gradient-to` | `rgba(153,246,228,0.3)` | `rgba(15,118,110,0.3)` |

The full `--color-accent` token family is website-only by design — the webapp deliberately does not reach for it (see root DESIGN.md §2). Don't propagate these tokens to the webapp's `app.css`.

### Card / Atmosphere

| Token | Purpose |
|---|---|
| `--color-card-shadow`, `--color-card-shadow-hover` | `card-elevated` utility transitions |
| `--color-connector`, `--color-connector-accent` | Lines/arrows in HowItWorks step diagram |
| `--color-dot-grid` | Site-wide dot-grid background |
| `--color-halo-opacity` | Teal halo gradient opacity |
| `--color-bg-secondary-solid` | Solid fallback for translucent `--color-bg-secondary`, used by `section-fade-top` |

### Architecture Diagram (`--arch-*`)

A full set of hex-literal tokens for the Mission section's animated architecture diagram (`--arch-icon`, `--arch-beam`, `--arch-progress`, etc.). These are deliberately hex (not `theme()`) so GSAP can animate them. See `app.css` for the full list.

### Prose (long-form content)

These tokens govern the site's long-form reading surface — the blog post page (`/blog/<slug>`) and, going forward, any page that opts into a `.prose` class. Legal pages (`/privacy`, `/terms`, `/security`) predate this system and intentionally keep their hand-rolled Tailwind utilities; they are not required to migrate.

**None of these are GSAP-read**, so defining them via `theme()` / `color-mix()` is safe — no hex-literal parallel needed.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--prose-heading` | `var(--color-text)` | `var(--color-text)` | `h2`, `h3`, `h4` in prose |
| `--prose-body` | `slate.700` | `slate.300` | Paragraphs, list items |
| `--prose-link` | `var(--color-accent-text)` | `var(--color-accent-text)` | In-prose links |
| `--prose-link-hover` | `var(--color-accent-hover)` | `var(--color-accent-hover)` | Hover state |
| `--prose-code-bg` | `slate.100` | `#0b1120` | Fenced code block surface |
| `--prose-code-text` | `slate.900` | `slate.200` | Fenced code block text (pre-highlight) |
| `--prose-inline-code-bg` | `slate.100` | `slate.800` | Inline `<code>` bg |
| `--prose-inline-code-text` | `slate.900` | `slate.100` | Inline `<code>` text |
| `--prose-blockquote-border` | `var(--color-accent)` | `var(--color-accent)` | 3px left border on blockquote |
| `--prose-blockquote-bg` | `color-mix(accent 4%, transparent)` | `color-mix(accent 6%, transparent)` | Blockquote tinted fill |
| `--prose-blockquote-text` | `slate.700` | `slate.300` | Blockquote body text |
| `--prose-hr` | `var(--color-border)` | `var(--color-border)` | `<hr>` rule |
| `--prose-table-border` | `var(--color-border)` | `var(--color-border)` | Table row dividers |

### Prose Typography Spec

Documented in `website/.design/mockups/blog-post/explanation.md` §5 as the first long-form content surface on the site — treat that section as the canonical prose spec. The `.prose` class is defined in `website/src/app.css` and composes these tokens plus the rules below:

- Base: 17px body mobile, 18px `sm:`; `line-height: 1.75`; `DM Sans` (inherited).
- Article measure cap: `max-width: 48rem` (≈70–75ch) — applied at the `<article>` wrapper, not via `max-width` on individual elements.
- Heading scale within prose: h2 `text-[1.75rem] sm:text-[2rem]` / h3 `text-[1.375rem] sm:text-[1.5rem]` / h4 `text-lg`. All `font-weight: 600–700`, `tracking-tight`, `line-height: 1.25`, `scroll-margin-top: 6rem` (for anchor-scroll with sticky header).
- Lists: `<ul>` uses custom teal bullet via `::before` (6px dot at `--color-accent`). `<ol>` uses native decimal with accent-colored `::marker`.
- Blockquote: non-italic (italic is reserved for footnote triggers — see §3); teal left border; tinted bg.
- Inline code: bordered pill; JetBrains Mono.
- Fenced code: Shiki-at-build-time syntax highlighting (`github-light` / `github-dark`); horizontal scroll on overflow; optional language chip top-right.
- Links: thin, tinted underline that solidifies on hover.

### Syntax Highlighting (Shiki)

Code blocks are syntax-highlighted at build time via **Shiki** in the mdsvex/remark pipeline (see blog-post `explanation.md` §14). Shiki emits inline `style` attributes per token, so no additional runtime CSS is required for token colors. Themes: `github-light` + `github-dark`, mapped to the active theme via a dual-theme variable strategy.

JetBrains Mono is the product's **code font** — load it from Google Fonts alongside DM Sans (via `website/src/app.html`) with `display=swap`.

---

## 9. Utility Classes (Website-Specific)

| Class | Purpose |
|---|---|
| `.card-elevated` | Resting + hover shadow elevation; 250ms ease transition |
| `.icon-hover-scale` | Scale 1.1 on parent `.group:hover` (250ms ease) |
| `.icon-glow` | Box-shadow `--color-accent-glow` on parent `.group:hover` |
| `.section-fade-top` | 64px-tall linear fade from `--color-bg-secondary-solid` to transparent at section top |
| `.reveal-target`, `.revealed`, `.reveal-scale` | Scroll-reveal action targets (see §7) |

All utilities respect `prefers-reduced-motion: reduce` (transitions disabled, transforms reset).

---

## 10. SEO & Meta

`<head>` includes:
- `<title>Email Unsubscriber — Clean Your Inbox for Good</title>`
- `<meta name="description" content="Unsubscribe from unwanted emails in one click. No subscription. Pay once. Privacy-first." />`
- `viewport` with `width=device-width initial-scale=1.0` (no zoom-disable)
- DM Sans preconnect + stylesheet
- Inline FOUC-prevention script (synchronous, must stay inline)
- `data-sveltekit-preload-data="hover"` on `<body>` for snappy navigation

When introducing a new route, give it a unique `<svelte:head>` `<title>` and `<meta name="description">`. The Privacy, Terms, and Security pages already follow this.

---

## 11. SPA Fallback (Cloudflare Pages)

`website/static/_redirects` provides SPA routing fallback so deep links work on Cloudflare Pages. Don't remove it. SvelteKit `adapter-static` is configured with `fallback: 'index.html'` for the same reason.

---

## 12. Mockups & Handoff (Website-Specific)

Website feature mockups live under `website/.design/mockups/<feature-name>/` as a `mockup.html` + `explanation.md` pair. The HTML is the visual sanity check; the markdown is the exhaustive spec. See root DESIGN.md §13 for the shared convention.

Because `website/` is a git submodule, creating or editing a mockup under `website/.design/mockups/` requires committing inside the submodule repo first, then bumping the parent's submodule pointer in a follow-up commit. Cross-cutting mockups (rare, spanning both frontends) live at the project-root `.design/mockups/` directory.

---

## 13. Source-of-Truth Files (Website)

| File | Purpose |
|---|---|
| `website/src/app.css` | All website tokens (including accent, card-shadow, arch, halo, dot grid, noise) |
| `website/src/app.html` | FOUC script + DM Sans preconnect/stylesheet + meta |
| `website/svelte.config.js` | `adapter-static` with `fallback: 'index.html'` |
| `website/src/routes/+layout.svelte` | Root layout (Header, Footer, CookieConsent, theme init, dot grid + halo elements) |
| `website/src/routes/+page.svelte` | Main page composing all sections |
| `website/src/lib/utilities/theme.ts` | Theme writer |
| `website/src/lib/utilities/cookies.ts` | Cross-subdomain cookie helpers |
| `website/src/lib/utilities/consent.ts` | Cookie consent with per-category preferences |
| `website/src/lib/utilities/gsap-utils.ts` | GSAP loader + reusable actions |
| `website/src/lib/utilities/scroll-reveal.ts` | IntersectionObserver `reveal` / `revealStaggered` actions |
| `website/src/lib/utilities/constants.ts` | `APP_URL`, `CONTACT_EMAIL`, `COMPANY_NAME`, `SITE_URL` |
| `website/src/lib/components/*` | All website components |
| `website/src/lib/components/sections/*` | One file per nav section |
| `website/src/lib/icons.ts` | Icon registry (Lucide-style stroke icons + brand logos) |
| `website/static/screenshots/{feature}/{device}-{theme}.png` | DeviceScreenshot assets |

---

## 14. Creative Image Generation Guidelines

This section governs any generated artwork used as **blog cover images, section illustrations, social-share cards, and other editorial visuals** on the marketing website. It is written as a **copy-paste style block** — paste the whole block below (§14.10) into an image-generation prompt, then append the concrete subject description. The goal is visual consistency across every piece of creative artwork on the site, regardless of subject matter.

Reference anchor: `website/static/blog/covers/casa-t2-validated.png` is the first asset produced under this spec. Treat it as the visual north star when grading new generations.

### 14.1 Medium & Technique

- **Flat vector illustration**, editorial style. Think modern tech-blog cover, not photorealism, not 3D, not pixel art, not painterly, not isometric.
- **Hand-drawn feel**: lines should have a subtle organic wobble, as if inked by a human with a steady but imperfect hand. Not ruler-straight, not jittery — just alive.
- **Bold, uniform stroke weight** on all outlines. The stroke thickness is a character of the brand; do not let some shapes have thin strokes and others thick.
- **2D, frontal, orthographic** compositions. No perspective, no vanishing points, no depth-of-field. Elements float on a flat plane.

### 14.2 Color System (Strict)

Every illustration uses the product's teal family plus warm cream accents. **No other hues are permitted** unless the subject *absolutely* demands a signal color (e.g. a red alert dot) — in which case it is a single small accent, never a dominant surface.

| Role | Token | Hex | Use |
|---|---|---|---|
| Background | `teal.200` | `#99f6e4` | Canvas fill (full-bleed, solid, no gradient) |
| Outline / stroke | `teal.800` | `#115e59` | Every outline, every contour line, every decorative detail |
| Primary fill | `teal.400` | `#2dd4bf` | Dominant interior fills on objects |
| Secondary fill | `teal.600` | `#0d9488` | Supporting interior fills, darker areas for contrast |
| Cream accent | `#faf6ed` (warm off-white) | — | Paper, screens, highlights; provides warmth against all-teal |
| Optional signal (rare) | — | `#ef4444` (red) or `#f59e0b` (amber) | Single tiny accent only when subject requires it |

**Rules:**
- Background is always **solid teal**, never a gradient, never white.
- Fills are **flat** — no gradients inside shapes, no soft shading, no airbrush.
- Cream is the only non-teal color used at surface-scale; reserve it for "paper-like" elements (screens, pages, labels, speech bubbles).
- Dark teal is outline-only; do not fill large areas in the darkest shade.

### 14.3 Line Work

- Outlines are **closed, confident, slightly wobbly**. Not hand-shaky, not calligraphic — more like a practiced marker stroke.
- **Uniform line weight** across the whole composition (approx 3–4 px at 1200×630 output). Do not taper, do not vary thickness for emphasis.
- Small internal details (buttons, windows, stitching, motion lines) use the **same stroke weight** as outer contours.
- Corners are **soft / rounded**, not geometrically sharp.

### 14.4 Fill Rules

- Inside each shape: one flat color. No gradients, no inner shadows, no highlights.
- Where depth is implied (a folded page, a button press), use a **second flat color** — not a gradient or a shadow.
- **Cream "paper" surfaces** (phone screens, book pages, sticky notes) are allowed a single thin outline and a simple flat fill. Content drawn on them reuses the teal stroke + teal fill palette.
- No drop shadows anywhere. No cast shadows. No ambient occlusion.

### 14.5 Composition

- **Clustered, mid-density arrangement** of objects on a solid teal field. Aim for 5–12 distinct elements per cover, varying in scale.
- Objects **float** — they do not sit on a ground plane. No horizon, no surface, no baseline.
- Allow objects to **overlap edges** of the frame slightly (bleed), and to **overlap each other** for tight clustering. Do not pad with uniform margins.
- Negative space is part of the design — do not fill every corner. Leave breathing room, then **fill small gaps with decorative fillers** (see §14.6).
- Scale hierarchy: one or two **hero objects** (larger), surrounded by **secondary objects** (medium), with small decorative marks sprinkled in.
- Avoid symmetry. Prefer asymmetric, editorial layouts that feel hand-arranged.

### 14.6 Decorative Fillers

Small motifs used to fill dead space and tie the composition together. Draw from a fixed vocabulary:

- **4-point stars** (small, outline-only, teal.800)
- **Tiny solid dots** or clusters of three dots
- **Short motion/sparkle lines** (2–4 parallel short strokes)
- **Small circles** (outline-only, sometimes with an inner dot)
- **Plus signs / crosses**, small, sparse

Use these sparingly — they are seasoning, not the dish. Maximum 5–8 fillers per cover.

### 14.7 Object Style (Subject-Agnostic)

Whatever the subject is:
- Render it as a **simplified, stylized, friendly** version of itself. Rounded proportions, slightly chunky, approachable.
- **No photorealistic details.** A computer is three rectangles and a stand — not a brand-accurate MacBook.
- **No faces** unless explicitly required by subject. When hands appear, draw them as simple outlined shapes — no fingernails, no wrinkles, no skin tone.
- Text inside the illustration (labels on books, words on screens) is **abstracted into squiggles or short bars**, never real readable text. Cover images are wordless.

### 14.8 What NEVER to Produce

- ❌ Gradients (background or fills)
- ❌ Drop shadows, inner shadows, glows
- ❌ 3D perspective, isometric views, vanishing points
- ❌ Photorealism, mixed media, collage of photos
- ❌ Pixel art, low-poly, voxel, cel-shaded anime
- ❌ Gritty textures, grain, noise, brush strokes (the illustration itself is clean; site-level noise comes from CSS)
- ❌ Watercolor, painterly, or oil-paint styles
- ❌ Emoji, stock-photo clip-art, 3D rendered icons
- ❌ Colors outside the teal + cream palette (except the rare single-signal accent noted in §14.2)
- ❌ Readable text or logos baked into the image
- ❌ Human faces or identifiable people
- ❌ Heavy symmetry or centered "hero-product" compositions

### 14.9 Output Specs

- **Aspect ratio**: 1200×630 (OG-safe). Featured card crops to `21:10`, grid cards to `16:9`, post hero to `21:9` — so keep the hero subject inside the middle ~60% of the frame and let edges bleed with lower-priority elements.
- **Format**: WebP (preferred) or PNG. Transparent background **not** used — canvas is solid teal.
- **Min resolution**: 2400×1260 (2× retina), downscale to 1200×630 for shipping.
- **Filename**: `<post-slug>.webp` (matches the markdown filename).

### 14.10 Copy-Paste Prompt Block

Paste this verbatim at the top of any image-generation prompt, then add one or two sentences describing the **subject matter** of the cover. Do not describe style in your subject sentence — the block below already locks style.

```
Style: flat vector editorial illustration, hand-drawn feel with subtle organic line wobble, bold uniform stroke weight (like a confident marker), 2D frontal orthographic composition, no perspective or 3D.

Color palette (strict): solid pale teal background (#99f6e4). All outlines in dark teal (#115e59). Interior fills use mid teal (#2dd4bf) and darker teal (#0d9488). Warm cream (#faf6ed) is the only non-teal surface color, reserved for paper / screen / label elements. No other colors. No gradients. No shadows. No glows. No textures. No 3D.

Composition: clustered arrangement of 5–12 stylized objects floating on the teal canvas, asymmetric editorial layout, varied scale (one or two hero objects, several secondary, small decorative fillers). Objects may overlap each other and bleed slightly past the frame edges. Keep the hero subject inside the middle 60% of the frame (sides may be cropped by card aspect ratios).

Objects: simplified friendly shapes with rounded proportions, not photorealistic, not brand-accurate. No human faces. Any text on objects is abstracted into squiggles or short bars, never real words. All internal details (buttons, windows, lines) share the same stroke weight as outer contours.

Decorative fillers (sparingly, 5–8 total): small 4-point outline stars, tiny solid dots, short parallel sparkle lines, small outline circles, small plus signs — all in the dark teal outline color.

Canvas: 1200×630 solid teal background, full bleed, no border, no framing, no logo, no watermark, no caption.

Forbidden: gradients, drop shadows, inner shadows, glows, 3D, perspective, isometric, photorealism, pixel art, low-poly, anime, watercolor, painterly, brush texture, grain, noise, emoji, stock clip-art, readable text, human faces, colors outside the teal + cream palette.

Subject: [DESCRIBE THE CONCEPT / OBJECTS HERE IN ONE OR TWO PLAIN SENTENCES]
```

### 14.11 Review Checklist (Before Shipping a Generated Cover)

- [ ] Background is solid pale teal — no gradient, no white, no other color.
- [ ] All outlines are the same dark teal and the same stroke weight.
- [ ] Fills are flat — no gradients, no shading, no shadows.
- [ ] Palette contains only the approved teal shades + cream (plus at most one small signal accent).
- [ ] Composition is clustered and asymmetric, with visible breathing room.
- [ ] No readable text, no logos, no faces.
- [ ] Objects are stylized, not photorealistic.
- [ ] Hero subject is safe inside the middle 60% of the frame (survives 16:9 / 21:9 / 21:10 crops).
- [ ] Looks consistent next to `casa-t2-validated.png` in the blog listing grid — if it visually clashes, it fails.

### 14.12 Iterating on These Guidelines

This is a living spec. When a new cover reveals a gap (ambiguity, a style we want to forbid, a motif we want to canonize), update this section — **do not start a parallel style guide**. The copy-paste block in §14.10 is the single source; every other subsection in §14 explains the *why* behind a rule in the block.
