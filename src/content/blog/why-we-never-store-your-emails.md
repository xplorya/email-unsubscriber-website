---
title: "Why we never store your emails: an architecture walkthrough"
date: "2026-06-15"
excerpt: "A plain-language walkthrough of how our privacy-first unsubscribe tool scans your inbox in the browser, keeps no refresh token, and never sees your email."
author: "Email Unsubscriber Team"
categories: ["Behind the Scenes"]
tags: ["oauth", "privacy", "on-device", "architecture", "casa", "refresh-tokens"]
cover: "/blog/covers/why-we-never-store-your-emails.webp"
coverAlt: "Flat vector illustration of a browser window keeping a stack of letters inside while a small unsubscribe ticket slips out, beside a distant server rack with a severed cable and a key fused to an hourglass."
featured: false
draft: false
readiness: "Ready for review"
faq:
  - question: "Does Email Unsubscriber store my emails?"
    answer: "No. There is nothing to store because our servers never receive your email. The scan runs inside your browser, which talks directly to Gmail or Microsoft. Our backend only hands your browser the scanning code; it never gets the messages that code reads. No message content is uploaded, logged, or kept on our side at any point."
  - question: "Where does the inbox scan run?"
    answer: "The scan runs in your browser, on your device. When you connect Gmail or a personal Microsoft account, your browser pulls the sender list it needs straight from Google's or Microsoft's API and analyzes it locally. Sender names and List-Unsubscribe headers stay on your machine. Our servers never touch the content of your mail, because no code path sends it to them."
  - question: "How long does the app keep access to my inbox?"
    answer: "About an hour. Google's documentation states that user access tokens automatically expire after one hour. We request no refresh token, so once that hour is up, our access ends on its own. Getting back in means signing in again. There is no persistent, background access to your mailbox by design."
  - question: "Does Email Unsubscriber use refresh tokens?"
    answer: "No. A refresh token lets an app quietly renew its access and reach your inbox for days or weeks. Google only issues one if the app requests offline access during sign-in, and we never request it. Without a refresh token, our access dies with the roughly one-hour session and cannot be silently extended."
  - question: "What makes an unsubscribe tool privacy-first?"
    answer: "A privacy-first tool never copies your mailbox to its own servers. It reads your inbox where the mail already lives, on your device, and asks for the narrowest access that does the job. The real test is the architecture, not the privacy policy: what the app can technically see, where it processes your mail, and how long its access lasts."
  - question: "Is Email Unsubscriber's sign-in code open source?"
    answer: "Yes. The OAuth token exchange runs through a small Cloudflare Worker whose full source is public on GitHub, so you can read every line. The email access token your browser uses to read mail is used against Gmail or Microsoft directly and never passes through our own application servers."
  - question: "How can I verify these privacy claims myself?"
    answer: "Four ways. Read the open-source auth code on GitHub. Open your browser's developer tools, watch the Network tab during a scan, and confirm no message content is posted to our domain. Check the independent CASA Tier 2 audit on our security page. And read the scopes on the consent screen before you approve access."
---

<!--
cover-generation-prompt

Paste the block below into your image generator. The style portion is copied
verbatim from website/.design/DESIGN.md §14.10 (the single source of truth) —
do NOT tweak it. Only the Subject line is tailored to this post.

Flat vector editorial illustration in one strict house style. Match the attached reference cover exactly if one is provided.

HARD RULE — obey above all else: ABSOLUTELY FLAT. No shadows of any kind — no drop shadow, no soft ambient shadow beneath objects, no inner shadow, no glow, no gradient, no soft background blobs behind the cluster. Every fill is one solid flat color; all objects float on one flat solid teal canvas.

Text: legible words are allowed where they meaningfully label an object (e.g. the word on an unsubscribe button). Keep any text short, correctly spelled, and drawn in dark teal on a cream or teal label. Where a word is not needed, default to 3–5 wavy squiggle lines or solid bars instead — do not fill every surface with text.

Technique: hand-drawn feel with a subtle organic line wobble; bold uniform outline on every shape — same chunky-marker thickness everywhere, inner details included; 2D frontal orthographic; objects float on a flat plane — no ground line, no perspective, no 3D.

Palette — only these five colors, nothing else: background solid pale mint teal #99f6e4 (full bleed, one flat fill — this lock matters most); outlines deep pine teal #115e59 (every contour and every decorative mark); primary fill bright teal #2dd4bf; secondary fill deep teal #0d9488; cream #faf6ed ONLY for paper / screen / label surfaces (the sole non-teal color). No other hues. No gradients, texture, grain, or noise.

Composition: 5–12 simplified friendly objects, rounded chunky proportions, clustered asymmetrically at varied scale — one or two hero objects plus medium and small ones. Objects overlap each other and bleed slightly off the frame edges. Keep the hero inside the middle 60% of the frame (sides get cropped by card ratios). Leave breathing room; season gaps with 5–8 small fillers — 4-point outline stars, tiny solid dots, short parallel sparkle strokes, small outline circles, small plus signs — all in the outline teal.

Objects: no human faces or people. No brand-accurate logos or devices — a laptop is three rounded rectangles, not a real MacBook. Avoid stock clip-art clichés (spy hats, incognito sunglasses, generic lightbulbs) unless the Subject names them.

Canvas: 1200×630, full bleed, no border, no framing, no logo, no watermark, no caption.

Forbidden: logos, watermark, caption, misspelled or garbled words, gradients, drop shadows, soft/ambient shadows, inner shadows, glows, soft background blobs behind the cluster, 3D, perspective, isometric, depth of field, photorealism, pixel art, low-poly, anime, watercolor, painterly, brush texture, grain, noise, emoji, stock clip-art, human faces, colors outside the teal + cream palette.

Subject: A hero cream browser window holding a neat stack of letters safe inside its rounded frame, with a small one-way gate at its right edge letting only a tiny cream ticket labelled "unsubscribe" slip out while the letters stay put. Around it: a distant boxy server rack with a cleanly severed cable that never reaches the window, a key fused to a tiny hourglass to show a session that expires, an open padlock drawn from angle-bracket code marks for open-source sign-in, and a small round badge with a checkmark. Arrange asymmetrically with the browser window dominant; scatter small outline stars, dots, and plus signs in the gaps.
-->

You found an unsubscribe app, and the sign-in screen wants access to your inbox. Before you click Allow, you want the honest answer to one question: where does your email actually go? This is a walk through exactly how our tool answers that, and how you can check the answer yourself without taking our word for anything.

> A privacy-first unsubscribe tool reads your inbox on your device, not on a server. Ours scans your mail inside your browser, requests read-only access, keeps no refresh token, and lets the session expire in about an hour. Your email content never reaches our servers, and the code that signs you in is open source, so every claim here is one you can verify.

## What makes an unsubscribe tool privacy-first?

A privacy-first unsubscribe tool is one that never copies your mailbox to its own servers. It reads your inbox where the mail already lives, on your device, and it asks for the narrowest access that gets the job done. The real test is not the privacy policy. The test is the architecture: what the app can technically see, where it processes your mail, and how long its access lasts. A policy is a promise a company can rewrite. An architecture is a constraint that has to be re-engineered before anyone can break it. We built ours so that the honest answer to "can you read my email on your servers?" stays no, because those servers were never wired to receive it.

## Where does the scan actually run?

The scan runs inside your browser. When you connect Gmail or a personal Microsoft account, your browser talks straight to Google's or Microsoft's API and pulls the list of senders it needs to analyze. Our backend has one job in that moment: hand your browser the scanning code. It never receives the messages that code reads. The sender names and the List-Unsubscribe headers the scan looks at stay on your machine the whole time. Nothing about the content of your mail is uploaded, logged, or stored on our side, because there is no code path that would send it anywhere. The mail you are cleaning up never leaves the room it started in.

## What can the app see, and for how long?

It can read, and only read, for about an hour. We request read-only OAuth scopes, so the app can view your messages but cannot send, delete, or change anything in your mailbox. Google's consent screen names that scope before you approve it, so you can check it against what we say here.

The access is short by design. According to [Google's authentication documentation](https://docs.cloud.google.com/docs/authentication/token-types), user access tokens "automatically expire after one hour." We also skip the one thing that would extend them: a refresh token. Per [Google's OAuth 2.0 documentation](https://developers.google.com/identity/protocols/oauth2), an app only receives a refresh token if it explicitly requests offline access during sign-in. We do not. So when that hour is up, our access to your inbox ends on its own, and getting back in means you sign in again. There is no quiet, standing connection to your mail waiting in the background.

## How do you sign me in without your servers seeing my token?

The token your browser uses to read mail never passes through our own application servers. Signing in with OAuth involves a step where a temporary code is exchanged for an access token. We run that exchange through a small Cloudflare Worker whose source code is public, at [github.com/micro-solutions-llc/email-unsubscriber-open-oauth](https://github.com/micro-solutions-llc/email-unsubscriber-open-oauth). You can read every line of it. The email access token that comes out the other side is used by your browser to talk to Gmail or Microsoft directly, and our backend never receives it. This is usually the part you cannot check with a cloud tool, so it is the part we made auditable on purpose.

## How is this different from cloud unsubscribe tools?

Cloud unsubscribe tools copy your mailbox to their servers and keep working after you close the tab. That design buys them features we cannot match. It also means your mail sits on someone else's computer, under whatever access their token holds and whatever their policy says this year.

| Criteria | Email Unsubscriber | Typical cloud unsubscribe tool |
|---|---|---|
| Where scanning happens | In your browser, on your device | On the company's servers |
| Access requested | Read-only scopes | Often read and write |
| Persistent access | None; no refresh token | Refresh token, access outlives your session |
| What lives on their servers | No email content | A copy of your mailbox or its metadata |
| Sign-in code | Open source, auditable | Usually closed |
| Payment | One-off, see pricing | Recurring subscription |
| Breadth of features | Focused: find senders, unsubscribe, catch violators | Broader: rules, digests, auto-delete, multi-account |

Concede the trade honestly. A server-side tool can run rules while you sleep, mail you a weekly digest, auto-delete by size, and manage several mailboxes at once. Those features need read-and-write access and a token that outlives your session, which is exactly the access we refuse to hold. If you want a full mailbox-management suite, a cloud tool is the better fit, and we will say so.

The free end of that market is where the caution comes in. In 2019 the [FTC settled with Unrollme](https://www.ftc.gov/news-events/news/press-releases/2019/08/operator-email-management-service-settles-ftc-allegations-it-deceived-consumers-about-how-it), which the agency said "falsely told consumers that it would not 'touch' their personal emails" while sharing their e-receipts with its parent company for market research. Cloud tools are not dishonest by definition. But once your mail sits on a server, the only thing standing between it and a new business model is a policy someone can change.

## Why does this matter more now that AI reads your inbox?

AI now reads the inside of your mailbox, and where that reading happens is the whole question. Gemini in Gmail and Apple Intelligence summarize threads, sort messages, and draft replies by processing the content of your mail. Some of that runs on your device and some on the provider's servers, on their terms, and it is a genuinely useful shift. We wrote a full breakdown in [what AI in your inbox actually does](/blog/ai-in-your-inbox).

Our position is narrow and a little old-fashioned. The fewer copies of your mail that exist off your device, the fewer places it can leak, get repurposed, or be fed into a model you never agreed to. Our scanner reads the headers that identify a sender and its unsubscribe link, not the contents of your conversations, and it reads them where they already sit. We are not adding another server that holds a copy of your inbox at a moment when the inbox is already being read from more directions than ever.

## How do I verify any of this myself?

You do not have to trust us. Four checks, in rising order of effort:

1. **Read the scopes.** On the Google or Microsoft consent screen, read what the app is asking for before you click Allow. Read-only means it cannot send or delete.
2. **Read the auth code.** The [open-source OAuth worker](https://github.com/micro-solutions-llc/email-unsubscriber-open-oauth) is public. Anyone can audit how sign-in works.
3. **Watch the network.** Open your browser's developer tools, switch to the Network tab, run a scan, and confirm your message content is not being posted to our domain.
4. **Check the independent audit.** We passed CASA Tier 2, the security assessment Google requires of apps that read Gmail. An authorized lab ran the review, not us. The details sit on our [security page](/security), and we wrote up [what CASA Tier 2 validation means](/blog/casa-t2-validated) separately.

Run any one of these and you will see the same thing: the mail stays with you. That is the outcome the whole design exists to produce.

## So you really keep nothing?

We keep nothing from your email. We are not a zero-analytics company, though, and pretending otherwise would undercut the point of this post. We run product analytics with PostHog to see how the app itself is used, and only after you accept cookies. What we never do is read, analyze, or monetize the content of your email, because our servers never receive it in the first place. The [one-off payment](/#pricing) is part of the same logic: you pay once, so we have no retention target to chase and no reason to hoard data you never handed us.

If the architecture is the proof, the last step is to watch it work. Connect Gmail or a personal Microsoft account at [app.email-unsubscriber.com](https://app.email-unsubscriber.com), run a scan, and see your inbox stay exactly where it is. And if you are still weighing the whole category, [are email unsubscribe apps safe?](/blog/are-email-unsubscribe-apps-safe) lays out the questions worth asking before you connect any of them.
