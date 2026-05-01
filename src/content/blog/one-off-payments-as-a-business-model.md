---
title: "One-off payments as a business model"
date: "2026-04-17"
excerpt: "Are one-off payments just a subscription in disguise? No — and the difference is what each model forces you to measure, and therefore what user data you end up keeping."
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

A common pushback on one-off pricing goes like this: software needs ongoing maintenance, maintenance costs money, so a one-time price is just a prepaid subscription with the recurrence hidden. Therefore one-off = subscription minus transparency.

The argument sounds tidy. It misses the part that actually matters: **subscription pricing and one-off pricing force a business to measure different things, and what a business measures determines what user data it has to keep.**

## What subscriptions have to measure

A business living on monthly recurring revenue is anchored to a specific set of metrics — churn, retention cohorts, lifetime value, engagement, win-back rates. None of those are wrong on their own. The catch is what each one requires you to collect about every user, indefinitely:

- Churn → per-user last-active timestamps, cancel reasons, reactivation attempts.
- Retention cohorts → signup date plus an activity signal over time, per user.
- LTV → full per-user revenue history.
- Engagement → session logs, feature-usage events, click-streams.
- Win-back → persistent email addresses, behavioural patterns, "last seen".

You can't run a subscription business without those tables. The metrics are what pay the bills, and the metrics need the data. "Retention policy" then quietly becomes "we'll keep it until someone forces us to stop."

## What one-off changes

A one-off purchase books revenue at the moment of sale. After that, the user's future behaviour stops moving the revenue needle, so the metrics above stop being load-bearing:

- Churn — there is no cancel event.
- Retention cohorts — no longer a leading indicator of revenue.
- LTV — equals the price. Nothing to model.
- Engagement — still a product-quality signal, no longer a revenue forecast.
- Win-back — there's no renewal to fight for.

The KPIs that matter sit *before* the purchase: visit-to-purchase conversion, word-of-mouth, review sentiment. Those can be measured from anonymous or aggregate signals at the top of the funnel. None of them require keeping a per-user history after checkout.

The result is structural: a one-off business has no business reason to retain behavioural data about individual users post-purchase. A subscription business has many.

## Where the argument is weakest

"No incentive to hoard" is not the same as "impossible to hoard." Any team can choose to collect more than its model requires. Pricing is a necessary condition, not a sufficient one — the architecture has to back it up.

In our case it does:

- The scanner runs in the user's browser. The backend serves the algorithm and never sees email content, headers, or metadata.
- Our database stores a thin unsubscribe record (sender domain, timestamp, provider) — not behavioural logs.
- Analytics are opt-in, anonymised, and gated behind a cookie-consent banner.
- Account deletion anonymises every record tied to the user across our collections.

None of that is *forced* by the pricing model. But the pricing removed the business case for doing the opposite, which is the quiet reason small teams end up with bloated data pipelines: their metrics demand it, and the metrics come from the revenue model.

## What one-off isn't

The argument is also not a free pass. "One-off payment" does not mean any of these:

- **"Ship it and walk away."** We still patch, update, and support. The price has to account for a reasonable window of maintenance.
- **"Free updates forever."** A meaningfully larger product — say, a team plan — is a separate product. Existing customers keep what they paid for.
- **"No infrastructure cost."** We still pay for servers. The price absorbs operating cost over the projected customer lifetime.
- **"Anti-SaaS."** We use plenty of SaaS tools internally. This is about what our users pay, not a worldview.

Get any of these wrong and "pay once" turns into a tagline that collapses the first time a maintenance invoice lands.

## When one-off fits

It tends to work when:

- The tool solves a discrete problem rather than running an ongoing workflow.
- Usage is bursty — users return when they need it, not every morning.
- Value per use is high and measurable — people will pay once to reclaim hours of their time, but resent paying monthly for the same outcome.
- Product scope is bounded. There's a product, not a platform.

It tends not to work when the product is fundamentally a service (hosted infrastructure, real-time data feeds), needs continuous content (news, video, live data), or depends on an active-user network effect (social, marketplaces, collaborative editors).

Email Unsubscriber sits in the first set. Most tool-shaped indie SaaS does too.

## The under-discussed angle: incentive alignment

Most pricing write-ups frame the choice as a revenue question — which gets you more ARR, which raises better, which has stronger margins. Those matter.

The angle that gets less airtime: **pricing is an alignment mechanism between the company and the user.**

- Subscription → revenue grows when users stay logged in. Architectural pull: retention features, notification loops, engagement hooks, behavioural data to feed all three.
- One-off → revenue grows when new users buy. Architectural pull: ship a product good enough that the next purchase comes from word-of-mouth. Post-purchase activity is orthogonal to revenue.

The subscription incentive isn't evil. It builds great products (Notion, Figma, Linear). But it produces a slow gravitational pull toward hoarding user data, because the metrics that pay the bills need it.

A one-off model removes that pull. Whether the product stays well-maintained and trustworthy after that is up to the team, not the pricing model. Pricing doesn't guarantee anything — it only changes what the team's Monday looks like.

## Our position

Email Unsubscriber is a one-off purchase: **€2.99 / $3.49**. One transaction, no auto-renew, no card on file pulling money next month.

What that buys you:

- Full, unlimited use of the product for a 30-day window.
- Support via email during that window.
- A product that runs the scan in your browser and never sends your email content to our servers.

What it doesn't include — and never will:

- A login screen that phones home to check your subscription status.
- Behavioural logs collected for "improving personalisation."
- Cohort tracking for churn prevention. There is no churn.
- A roadmap engineered to manufacture reasons for you to keep paying.

The honest framing: this isn't a "lifetime licence" and we're not pretending it is. It's a one-shot purchase for the bursty kind of work — clear out your inbox, get on with your life. When the inbox fills up again in six months, you can buy another one. Or not. Either way, no recurring charge runs in the background, and no behavioural file on you sits in a database somewhere waiting to be useful.

That is the trade we think is right for a tool shaped like this. It isn't right for every product. But when people ask whether a one-time payment is "really a subscription in disguise" — no. The incentives are different, the architecture is different because of it, and the data we never collect doesn't exist on our servers, because we never built the table it would have lived in.

## Further reading

- [Our /security page](/security) — what we actually store, what we don't, and how to verify it.
- [Passing CASA Tier 2 as a small team](/blog/passing-casa-t2-small-team-field-guide) — the third-party security review behind the claims above.
- [Email Unsubscriber is now CASA Tier 2 validated](/blog/casa-t2-validated) — the short-form announcement.
