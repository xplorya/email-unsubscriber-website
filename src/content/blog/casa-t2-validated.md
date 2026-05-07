---
title: "Email Unsubscriber is now CASA Tier 2 validated"
date: "2026-04-17"
excerpt: "Email Unsubscriber cleared ADA's CASA Tier 2. The validation unlocks Gmail support and confirms what we built behind the scenes."
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

Google received the Letter of Validation confirming that Email Unsubscriber<sup><small>&trade;</small></sup> passed App Defense Alliance's **CASA Tier 2**. CASA Tier 2 is the independent verification Google requires of every app that reads users' emails in Gmail.

TAC Security, Google's authorized assessment lab, ran the assessment. The audit covered 100+ automated security checks against the [Cloud Application Security Assessment (CASA)](https://appdefensealliance.dev/casa) framework, plus a thorough review of 20+ security aspects covering data handling, credentials, access, and incidents.

## Why it matters

- **Independent proof of our security claims.** A third-party lab, authorized by ADA, reviewed our code and our operating practices. Outside validation now backs the word "secure" on our site.
- **Validation of "No access to email data."** A recurring theme in the review: "Where does user data live and how do you protect it?" Our answer is short. We don't store users' email data because we never access it. The scanner runs in the user's browser. Our servers see nothing.
- **Formal sign-off on what we built.** The assessment validates the architecture we picked from day one: read-only OAuth scopes, AES-256 encryption at rest, browser-side scanning, and one-off payments that remove the incentive to hoard data for retention metrics.

## What this unlocks

**We support Gmail now.** Until today, Microsoft/Outlook was the only provider we supported. Gmail sat behind a "Coming soon" label pointing to our [security page](/security). With CASA validation in hand, Google finalized our verification, and Gmail accounts work today.

## What's next

We want Email Unsubscriber to reach more users. The roadmap covers more email providers, with custom integrations as a longer-term goal.

The validation took a few weeks of infrastructure improvements, paperwork, and back-and-forth with Google and the assessor. Outside validation backs a privacy claim better than self-reporting can, and that's why we did it.
