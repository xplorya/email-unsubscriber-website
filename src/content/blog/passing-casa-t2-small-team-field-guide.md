---
title: "Passing CASA Tier 2 as a small team: what the process actually looks like"
date: "2026-04-17"
excerpt: "A first-hand account of Google's CASA Tier 2 assessment — the timeline, the $540 price tag, the SAST findings, and the five follow-up questions we didn't see coming."
author: "Email Unsubscriber Team"
categories: ["Engineering"]
tags: ["casa", "compliance", "security", "oauth", "sast", "fluidattacks"]
cover: "/blog/covers/passing-casa-t2-small-team-field-guide.png"
coverAlt: "Flat vector illustration of a clipboard checklist with a pencil, alongside a checkmark shield, a magnifying glass over a code window, a rubber stamp, a calendar, and a stack of documents."
featured: false
draft: true
readiness: "WIP. Unredacted, Unproofread"
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

Subject: A large editorial clipboard carrying a checklist of abstract squiggle line-items with a few checkmarks as the hero object, with a pencil resting diagonally across it. Surround it with smaller floating objects that telegraph a security-review process: a shield with a simple checkmark, a magnifying glass passing over a small code-window rectangle filled with squiggle lines, a rubber stamp with an abstract mark, a small calendar, a stack of documents, and a tiny stopwatch. Arrange asymmetrically with the clipboard dominant and the shield as the second-largest element; scatter small decorative stars and dots in the negative space.
-->

If your app asks for a restricted Gmail scope — `gmail.readonly`, `gmail.modify`, anything beyond sign-in — Google requires a CASA (Cloud Application Security Assessment) Tier 2 review before granting production access. For a small team, the process is more paperwork than engineering, but the parts that are engineering are the parts nobody explains up front.

This is the write-up we wish we'd had when we started. Our goal is not to teach the framework — the [official CASA documentation](https://appdefensealliance.dev/casa) does that — but to show what the process is actually like for a founder-sized team, with the timeline and the dollar amount attached.

## Why CASA exists

Google's App Defense Alliance contracts a set of authorized labs to independently assess any app that wants deep access to user data in Google services. CASA Tier 2 is the default tier for most production SaaS: an automated SAST (Static Application Security Testing) scan plus a self-assessment questionnaire, both reviewed by a human assessor.

It is not optional. If your OAuth consent screen requests a restricted scope and you go to production without CASA, Google will eventually suspend the project.

## Picking an assessor

There are a handful of ADA-authorized labs. We went with **TAC Security**. Their pricing as of our engagement in April 2026 was:

| Plan | Price | Revalidation | Target |
|---|---|---|---|
| Basic | $540 | 2 cycles | Most SMBs |
| Premium | $720 | Unlimited | Active development |
| Enterprise T2 | $1,800/yr | Unlimited reverification | Enterprise |
| Enterprise T3 | $4,500/yr | Tier 3 scope | Enterprise |

We picked **Basic** at $540 one-time. Two revalidation cycles is enough room for a small team to handle a follow-up if the first submission is rejected, and we were confident the initial SAST would come back clean.

Other labs exist — Bishop Fox and Leviathan among them — and quotes vary by a factor of two or three. For a small app, TAC Security's Basic plan is the realistic baseline.

## The timeline, step by step

We kept a log of every email, every submission, and every waiting day. Here it is.

### Day 0 — Outreach

Send the assessor a short email describing the app, the Google scopes requested, and the architecture at a high level. The assessor replies with pricing and the onboarding packet.

Initial exchange had one hiccup: TAC first suggested DAST (dynamic scanning, typically OWASP ZAP) because our app is a web app. We followed up to clarify that the scope access happens in the browser via a first-party extension-like flow, not a server-side intake. They agreed that **SAST is sufficient** and went forward on that basis. Worth confirming up front — DAST adds hours.

### Day 3 — Payment + SAST scan

Paid the invoice, received credentials for the assessor dashboard, and kicked off the SAST scan. We ran [FluidAttacks](https://fluidattacks.com) with the CASA T2 configuration, which includes 105 checks covering the full SAST portion of the CASA requirements.

```bash
# FluidAttacks CASA T2 scan (105 checks)
fluid-attacks scan \
  --config config-casa-t2.yaml \
  --output SAST-Results.csv
```

Results: **5 findings, all rated Low, all false positives.** Two patterns:

**Pattern 1: CWE-749 — missing Docker image digest (3 findings).**

The scanner flagged three `Dockerfile` / `docker-stack.yml` entries that use `:latest`, `:canary`, and `:dev` tags on our own images. The check wants image digests (SHA256 pinning) on every reference:

```yaml
# Flagged as CWE-749
services:
  backend:
    image: registry.example.com/backend:canary
```

This is a legitimate defense against image-registry supply-chain attacks. In our case it is a false positive because these are **first-party images we publish from our own CI/CD pipeline** — using `:canary` and `:latest` is the intended mechanism for rolling deploys, and pinning to a digest would defeat the purpose. Third-party images in the same stack (Traefik, MongoDB) are pinned to digests.

We documented this explicitly in the false-positive response: "These refer to first-party images controlled by our CI/CD rolling-deploy mechanism. All third-party images in this stack are pinned."

**Pattern 2: CWE-798 — hard-coded credentials (2 findings).**

The scanner flagged two `_FILE` environment variables in `docker-stack.yml`:

```yaml
environment:
  - MONGO_INITDB_ROOT_PASSWORD_FILE=/run/secrets/mongo_password
  - MONGO_INITDB_ROOT_USERNAME_FILE=/run/secrets/mongo_user
```

The `_FILE` suffix is Docker's idiomatic way to inject secrets: the environment variable points to a file path, and the secret contents live in a file mounted via `docker secret create`. The value you see in `docker-stack.yml` is not a credential — it is a path to a credential. Additionally, the MongoDB service here is a local dev fallback; our production data layer is Firestore.

Both false positives are common enough that the assessor has seen them before. A well-written justification with the exact CWE reference + what the code actually does gets accepted on the first pass.

### Day 3 — SAST CSV submission

Submitted `SAST-Results.csv` plus a one-page PDF documenting each finding and why it is a false positive. Template pattern:

> **Finding:** F380 / CWE-749, missing Docker image digest on `backend:canary`.
> **Why flagged:** Dockerfile/Compose reference uses mutable tag.
> **Why false positive:** First-party image under our CI/CD rolling-deploy mechanism. Digest pinning would break the intended rollout strategy. Third-party images in the same stack are digest-pinned.

### Day 4 — LoV form

The assessor asked us to populate the Letter of Validation fields on their dashboard: "Title", "Asset Type", "Organization", "Primary contact". Five minutes.

### Day 8 — SAQ submission

The **Self-Assessment Questionnaire** is the bigger chunk of the process. 23 questions covering:

- **Data inventory.** What categories of Google user data do you access? Where is each stored? Retention period?
- **Encryption.** At-rest encryption? Key management? In-transit TLS version?
- **Access control.** Who at your company can access production data? How is access granted and revoked?
- **Logging and monitoring.** What events are logged? How long are logs retained? Who reviews them?
- **Incident response.** Do you have a documented IR plan? Who is on call?
- **Vulnerability management.** How are CVEs tracked? What's the patch SLA?
- **Third parties.** Which sub-processors handle Google user data?

Most of these are one-sentence answers if your stack is clean. The two that earned follow-ups for us were:

- **"Where is Google user data stored?"** Our answer: we don't store Google user data. The scanner runs in the browser; we only persist an anonymized unsubscribe record with the sender domain and a timestamp. The assessor asked us to spell this out more precisely — which collections exist, what each field contains, whether any headers are retained. A short data-dictionary answer was enough.
- **"What encryption algorithm is used at rest?"** AES-256, managed by the database provider (Firestore in our case). The assessor wanted the specific algorithm and the key-management model (envelope encryption with Google-managed keys, via Firestore's default configuration).

### Days 8–17 — Revalidation window

The assessor review takes 1–3 weeks. Ours came back with the Letter of Assessment at the 9-business-day mark.

## What we'd do differently

- **Confirm SAST-only scope on day one.** The initial reply suggested DAST; we had to push back. Be explicit in the outreach email about how your app handles the restricted scope — browser-side vs server-side — so the assessor routes you correctly.
- **Run the SAST scan before outreach.** Knowing your findings in advance lets you draft false-positive justifications during the waiting period, not after. You are billed by the cycle; going in clean saves revalidation costs.
- **Keep a security.md-style inventory.** The SAQ is largely "copy from your own documentation." If you already have a sub-processor list, a data-flow diagram, and an encryption-at-rest confirmation, answering 23 questions is a half-day job. If you don't, it's a week.
- **Answer "we don't store X" precisely.** The obvious-seeming answer — "we don't store user data" — reads as hand-waving. Reviewers want: which tables exist, what fields each contains, why none of them hold Google-user content.

## Costs summary

| Line item | Amount |
|---|---|
| TAC Security Basic plan | $540 |
| FluidAttacks CASA T2 self-scan (free tier) | $0 |
| Internal time — outreach + SAQ + follow-ups | ~8 hours |
| Total | **$540 + one person-day** |

For the class of app we are, that's cheap. For context, Enterprise Tier 3 — required for apps with very broad scopes or consumer-scale reach — is $4,500/year.

## Is CASA worth it beyond the Google checkbox?

A validation letter is not why we went through this. It's because the review forced us to write down and defend every single piece of our security posture. A CASA-signed submission is a security.md that an independent lab has stress-tested; a security.md you wrote alone is a draft.

If your app touches restricted Gmail scopes, CASA is not optional anyway. If it doesn't — we'd still recommend running the SAQ internally as a forcing function. The questions are the same ones an enterprise prospect will ask you six months from now.

## Further reading

- [CASA framework](https://appdefensealliance.dev/casa) — official scope
- [ASVS](https://owasp.org/www-project-application-security-verification-standard/) — OWASP's framework that CASA leans on
- [Our /security page](/security) — the user-facing summary of how we handle data
