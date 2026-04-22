---
title: "Email Unsubscriber is now CASA Tier 2 validated"
date: "2026-04-17"
excerpt: "Our app just cleared ADA's CASA Tier 2 and we're really hyped about it! Here's what it unlocks and what that means for users."
author: "Email Unsubscriber Team"
categories: ["News"]
tags: ["casa", "compliance", "security", "gmail"]
cover: "/blog/covers/casa-t2-validated.webp"
coverAlt: "CASA Tier 2 validation badge"
featured: true
draft: false
readiness: "Ready to publish"
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

Subject: A large editorial shield with a simple checkmark at its center as the hero object, paired with a cream certificate scroll carrying abstract squiggle lines that stand in for text. Surround them with smaller floating objects that telegraph email-security validation: a stylized envelope with a tiny padlock badge attached, a magnifying glass passing over a small code-window rectangle, a rubber stamp with an abstract mark, and a simple key. Arrange asymmetrically with the shield dominant and the certificate scroll as the second-largest element; scatter small decorative stars and dots in the negative space.
-->

Google has just received the Letter of Validation confirming that Email Unsubscriber<sup><small>&trade;</small></sup> passed App Defense Alliance's **CASA Tier 2** - the independent verification required by Google for every app requesting to read users' emails in Gmail.

The assessment was carried out by TAC Security -- Google's preferred authorized assessment lab -- and covered 100+ automated security checks against the [Cloud Application Security Assessment (CASA)](https://appdefensealliance.dev/casa) framework, plus a thorough review covering 20+ security aspects on how we handle data, credentials, access, and incidents.

## Why it matters

- **Independent proof, not a marketing claim.** A third-party lab, authorized by ADA, reviewed our code and our operating practices. The word "secure" on our site is no longer a self-report.
- **Reassurance that "No access to email data" was the right approach.** A recurring theme in the review: "Where does user data live and how do you protect it?" Our answer stayed simple — we don't store any of the users' email data anywhere because we never access it. Only the user's browser does - the scanner runs there directly.
- **Formal confirmation of what we already built.** The assessment validates the things we architected from day one: read-only OAuth scopes, AES-256 encryption at rest, browser-side scanning, and one-off payments that remove the incentive to [hoard data for retention metrics](/blog/one-off-payments-as-a-business-model).

## What this unlocks

**Gmail is now supported.** Until today, Microsoft/Outlook was the only provider we supported, and Gmail sat behind a "Coming soon" label pointing to our [security page](/security). With the CASA validation in hand, Google has finalized our verification and we officially support Gmail accounts.

## What's next

We're committed to making Email Unsubscriber available to as many users as possibl, so expanding the support to other well-known email providers -- and maybe even custom integrations, who knows? -- is on the roadmap. Stay tuned!

Thanks for being patient while we worked through it. It took us a few weeks of infrastructure improvements, paperwork, and back-and-forth with Google and our chosen assessor, but it was worth it: outside validation is the only way a privacy claim means anything.

**Read next: [Passing CASA Tier 2 as a small team — what the process actually looks like](/blog/passing-casa-t2-small-team-field-guide).**
