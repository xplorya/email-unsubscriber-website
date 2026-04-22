---
title: "One-off payments as a business model"
date: "2026-04-17"
excerpt: "Are one-off payments really a subscription in disguise? Here's why we beg to differ — and why pricing structure ends up shaping how much user data a product hoards."
author: "Email Unsubscriber Team"
categories: ["Product"]
tags: ["pricing", "business-model", "anti-subscription", "saas", "privacy"]
cover: "/blog/covers/one-off-payments-as-a-business-model.webp"
coverAlt: "Flat vector illustration of a price tag paired with a single coin, surrounded by a cut subscription-loop arrow, a broken chain, a padlock, an empty folder, a wallet, and a calendar."
featured: false
draft: true
readiness: "WIP - Unredacted, Unproofread"
---

<!--
cover-generation-prompt

Paste the block below (Style → Subject) into your image generator. The style
portion is locked by `website/.design/DESIGN.md` §14.10 — do NOT tweak it.
Only the Subject line is tailored per post. If you edit the Subject, keep it
to 1–3 sentences and do not re-describe the style.

Style: flat vector editorial illustration, hand-drawn feel with subtle organic line wobble, bold uniform stroke weight (like a confident marker), 2D frontal orthographic composition, no perspective or 3D.

Color palette (strict): solid pale teal background (#99f6e4). All outlines in dark teal (#115e59). Interior fills use mid teal (#2dd4bf) and darker teal (#0d9488). Warm cream (#faf6ed) is the only non-teal surface color, reserved for paper / screen / label elements. No other colors. No gradients. No shadows. No glows. No textures. No 3D.

Composition: clustered arrangement of 5–12 stylized objects floating on the teal canvas, asymmetric editorial layout, varied scale (one or two hero objects, several secondary, small decorative fillers). Objects may overlap each other and bleed slightly past the frame edges. Keep the hero subject inside the middle 60% of the frame (sides may be cropped by card aspect ratios).

Objects: simplified friendly shapes with rounded proportions, not photorealistic, not brand-accurate. No human faces. Any text on objects is abstracted into squiggles or short bars, never real words. All internal details (buttons, windows, lines) share the same stroke weight as outer contours.

Decorative fillers (sparingly, 5–8 total): small 4-point outline stars, tiny solid dots, short parallel sparkle lines, small outline circles, small plus signs — all in the dark teal outline color.

Canvas: 1200×630 solid teal background, full bleed, no border, no framing, no logo, no watermark, no caption.

Forbidden: gradients, drop shadows, inner shadows, glows, 3D, perspective, isometric, photorealism, pixel art, low-poly, anime, watercolor, painterly, brush texture, grain, noise, emoji, stock clip-art, readable text, human faces, colors outside the teal + cream palette.

Subject: A large editorial price tag as the hero object in the center-left, with a hand offering a single coin toward it. Surround them with smaller floating objects that telegraph "no recurring billing, no data retention": a circular subscription-loop arrow with a clean diagonal slash cutting through it, a broken chain link, a small closed padlock, an empty folder, a calendar with no dates marked, a simple wallet, and a single checkmark. Arrange asymmetrically with the price tag dominant and the cut subscription-loop as the second-largest element; scatter small decorative stars and dots in the negative space between objects.
-->

Every few months, someone on a startup forum posts the same argument: "one-time payments are just subscriptions in disguise. You still need updates. You still need support. You still need servers. Call it whatever you want — the customer still ends up paying over time."

It is a reasonable-sounding take. It is also wrong in the specific way that matters most: **subscription pricing and one-off pricing produce different incentives, and incentives quietly shape which features get built, which metrics get tracked, and which user data gets retained.**

This is the post we wish existed when we were making the call for Email Unsubscriber. The decision looks superficial ("charge once or monthly?") but it cascades into architecture, privacy posture, and how the team spends its Mondays.

## The "subscription in disguise" argument, steel-manned

Start with the strongest version of the skeptic's case:

1. Software needs ongoing maintenance — dependency updates, security patches, OS changes, API drift, customer support.
2. That work has to be paid for somehow.
3. If a one-time purchase price covers *N years* of future maintenance, then that price is really a *prepaid* subscription — you just hid the recurrence.
4. Therefore: one-time = subscription minus transparency.

Every one of those bullets is true in isolation. The conclusion is wrong because it ignores **what the two pricing models measure and reward**.

## What subscriptions quietly optimize for

A SaaS business with monthly recurring revenue (MRR) lives and dies by a specific set of metrics:

- **Churn** — how many users cancel this month?
- **Retention cohorts** — which signup cohorts are still paying at month 6, 12, 24?
- **Lifetime value (LTV)** — projected revenue per user across their subscription arc.
- **Engagement / DAU / MAU** — proxies for future retention.
- **Re-engagement success** — win-back rates on inactive users.

None of those metrics are wrong. The trouble is what each of them **requires you to collect and retain about every user**:

- Churn → user-level last-active timestamps + cancel reasons + reactivation attempts.
- Retention cohorts → signup date + activity signal over time, per user, indefinitely.
- LTV → full per-user revenue history.
- Engagement → session logs, feature-usage events, click-streams.
- Re-engagement → email addresses (persisted), behavioral patterns (persisted), "last seen" (persisted).

**These metrics are what make a subscription business work.** You cannot operate a subscription SaaS without them. That's the incentive, and it runs downhill to your architecture: every metric needs a table, every table needs a retention policy, and "retention policy" in practice usually means "we'll keep it until someone asks us to stop."

## What one-off payments actually change

A one-off purchase flips the revenue curve. Revenue is booked at the moment of sale. After that transaction, **the user's future activity does not move the revenue needle.**

Which means the metrics above become uninteresting:

- Churn — there is no "churn" event. Users don't cancel what they bought.
- Retention cohorts — retention doesn't compound into revenue. Cohort curves stop being a leading indicator.
- LTV — equals the one-time price. Nothing to model.
- Engagement — still useful for *product quality* but not for *forecasting revenue*.
- Re-engagement — there is no one to re-engage, because there is no renewal to fight for.

The primary KPI for a one-off business sits **before** the purchase, not after:

- Visit → trial / demo → purchase conversion rate.
- Word-of-mouth / referral rate (drives future purchases).
- Review sentiment and media mentions (top-of-funnel signal).

Notice the data requirement. Those metrics are measured at the top of the funnel, from analytics events that can be fully anonymous or aggregate. They do not require you to keep a per-user history after purchase.

**The outcome: a one-off business has no business reason to retain behavioral data about individual users past checkout.** Subscription businesses do. The difference is not cosmetic.

## Where the claim is weakest (the honest part)

"No incentive to hoard" does not mean "impossible to hoard." Any team with any pricing model can choose to collect more data than their business needs. A one-off team can still:

- Track usage for product-analytics telemetry.
- Stash email addresses for upsell to "premium" versions.
- Retain logs "in case we need them" with no retention policy.

Pricing is a necessary condition, not a sufficient one. The architecture has to back it up. In our case:

- The scanner runs inside the user's browser; the backend never sees message contents, headers, or metadata.
- The database stores a thin unsubscribe record (sender domain, timestamp, provider), not user-behavior logs.
- Analytics are opt-in, anonymized, and routed through PostHog with cookie consent.
- Account deletion anonymizes every record tied to the user, including Stripe receipts.

None of that is forced by our pricing. But the pricing **removed the business case for doing the opposite**, which is the quieter reason small teams end up building bloated data pipelines: because their metrics demand it, and the metrics come from the revenue model.

## What one-off *isn't*

This is where the skeptic's argument deserves a partial win. "One-off payment" does not mean any of the following:

- **"Ship it and walk away."** We still patch, update, and support. The price has to account for some reasonable window of maintenance; ours is priced to cover ≥3 years.
- **"Free updates forever."** If we ship a major new version with significant scope expansion — say, a team plan — that's a separate product. Existing customers keep what they paid for; they don't inherit the new thing at no cost.
- **"No server costs."** We still run infrastructure. The Firestore cluster doesn't subsidize itself. The price is set to absorb operating cost amortized over the projected customer lifetime.
- **"Anti-SaaS."** We use plenty of SaaS tools internally. This is about what our users pay, not a philosophical war.

Getting those details wrong is how one-off pricing becomes performative. "Pay once" becomes a marketing tagline that collapses when the first maintenance invoice lands.

## When one-off makes sense

Use case fit matters. One-off tends to work when:

- **The tool solves a discrete problem**, not an ongoing workflow. Unsubscribing from marketing lists is discrete — you do it when your inbox gets out of hand, not every morning.
- **Usage is bursty**, not daily. A user who touches the tool once a quarter resents paying monthly for it.
- **Value per use is high and measurable**. People will pay $20 once to reclaim hours; they won't pay $3/month indefinitely for the same outcome.
- **The product scope is bounded**. Feature sprawl that might justify "premium tiers" doesn't exist — you ship the product, not a platform.

And when it doesn't:

- **The product is fundamentally a service.** Hosted email, hosted databases, real-time infrastructure — these genuinely have per-user operating costs that scale with active usage.
- **The product needs continuous content.** News aggregators, always-on video libraries, live data feeds.
- **The product depends on a network effect requiring active users.** Social tools, marketplaces, collaborative editors.

Email Unsubscriber sits firmly in the first set. Most "tool-shaped" indie SaaS does too.

## The under-appreciated angle: incentive alignment

Most write-ups of pricing models frame it as a revenue question — "which gets you more ARR, which is easier to raise on, which has better margins." Those matter.

The angle we think gets under-discussed: **pricing model is an incentive alignment mechanism between the company and the user.**

- Subscription → company's revenue grows when users stay logged in. Architectural incentive: retention features, notification loops, engagement hooks, behavioral data to personalize all of the above.
- One-off → company's revenue grows when new users buy. Architectural incentive: ship a product that creates enough word-of-mouth to drive the next purchase. Post-purchase user activity is orthogonal to revenue.

The subscription incentive isn't evil. It builds great products (Notion, Figma, Linear). But it creates a slow gravitational pull toward hoarding user data, because the metrics that pay the bills need it.

A one-off model simply removes that pull. What replaces it — whether the product stays trustworthy, honest, and well-maintained — is entirely up to the team. Pricing doesn't guarantee any of that.

But it does quietly change what the team's Monday looks like.

## Our position

Email Unsubscriber is $20. Once. It includes:

- Lifetime access to the current major version.
- Security patches and dependency updates for the life of the app.
- Bug fixes and feature refinements within the current major version.
- Support via email.

It does not include:

- A login screen that phones home to check your subscription status.
- Behavioral logs for "improving personalization."
- Cohort-level tracking for churn prevention (there is no churn).
- A roadmap designed to create reasons for you to keep paying.

We think that trade is worth it for a tool shaped like this. It is not the right trade for every product, and we're not claiming it is. But when people ask whether our one-time payment is "really a subscription in disguise" — no. It isn't. The incentives really are different. The architecture really is different because of it. And the data we never collect really doesn't exist on our servers, because we never built the table it would have lived in.

That is the short answer. The longer one is: look at what a business has to measure to stay alive, and you'll usually find the data it collects follows from there.

## Further reading

- [Our /security page](/security) — what we actually store vs. what we don't.
- [Passing CASA Tier 2 as a small team](/blog/passing-casa-t2-small-team-field-guide) — the third-party review that validated the above.
- [Email Unsubscriber is now CASA Tier 2 validated](/blog/casa-t2-validated) — the short-form announcement.
