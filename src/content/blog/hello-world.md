---
title: "Notes on inbox hygiene, one year in"
date: "2026-04-16"
excerpt: "What we've learned after a year of helping people tame their inbox — and why we still think one-time payments beat subscriptions for tools you use once a quarter."
author: "Email Unsubscriber Team"
categories: ["Privacy", "Product"]
tags: ["gdpr", "oauth", "retention"]
cover: "/blog/covers/hello-world.png"
coverAlt: "Flat vector illustration of an inbox tray with stacked envelopes under a magnifying glass, surrounded by a padlock, a clipboard with checkmarks, an empty folder, a wall clock, and a small gear."
featured: true
draft: true
readiness: "WIP"
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

Subject: [SUBJECT PLACEHOLDER]
-->

Most inbox-cleanup tools treat your email like a marketing funnel: sign up, upload everything, receive a dashboard. We went the other way. Read-only OAuth scopes, zero server storage, and a one-time price.

A year in, here's what we've learned.

## The three scopes that matter

When a user connects their Google or Microsoft account, three OAuth scopes do almost all the work:

1. `gmail.readonly` — list message threads so we can find subscriptions.
2. `gmail.modify` — move messages to trash when the user clicks "Unsubscribe".
3. `openid` / `profile` — identify the user without handing us a long-lived session.

Scope creep is where most tools go wrong. It's tempting to ask for `gmail.labels` or `calendar.readonly` "just in case" — but every scope is a trust tax. We asked, we measured, and we cut three scopes in the first six months.

### Why we refused `gmail.send`

Three customers asked for an auto-reply feature ("unsubscribed — please stop emailing me"). The feature looks great on paper:

> "One click, and the subscription dies the proper way — via the sender's stated unsubscribe procedure — *and* you get a paper trail."

It would also require `gmail.send`, which reads as *"this app can now send mail as you"* on the consent screen. That's a 20% drop-off we weren't willing to take for a feature 3 users asked for.

## Numbers from the first year

Totals across the beta period:

| Metric | Value |
|---|---|
| Paying customers | 1,942 |
| Emails classified as subscription | 11.3M |
| Unsubscribe clicks | 2.1M |
| Server-side inbox data stored | 0 bytes |
| GDPR data-subject requests | 47 (100% fulfilled within 72h) |

The "zero bytes stored" line is the one we're proudest of. The scanner runs client-side in a Web Worker; only the unsubscribe URL is sent to our backend, and only as part of the "please click this URL" action the user just triggered.

### A small piece of TypeScript

Here's roughly how the Gmail scanner detects a subscription header:

```ts
// src/scanners/gmail.ts
export function classifyMessage(msg: GmailMessage): Classification {
  const listUnsub = msg.headers['list-unsubscribe']
  if (!listUnsub) return { kind: 'personal' }

  // RFC 2369: either <mailto:...> or <https:...>, possibly both.
  const urls = listUnsub
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.startsWith('<http'))
    .map((s) => s.slice(1, -1))

  if (urls.length === 0) return { kind: 'mailto-only' }
  return { kind: 'subscription', unsubscribeUrl: urls[0] }
}
```

Simple. Deterministic. The entire classifier runs in the browser — we never see the message body.

### The backend pairs it with a small Go handler

```go
// services/unsubscribe_service.go
func (s *Service) LogUnsubscribe(ctx context.Context, userID string, url string) error {
    rec := &UnsubscribeRecord{
        UserID:    userID,
        URL:       url,
        Timestamp: time.Now().UTC(),
    }
    return s.db.Insert(ctx, rec)
}
```

We log the URL, not the message. The URL is semi-public anyway — it's in the sender's own footer. If a user erases their account, this record is anonymized in the same transaction as their user row.

## The bash script we ran every Monday

During the first six months we ran this every Monday morning to spot-check our "zero data storage" promise:

```bash
# scripts/audit-retention.sh
mongo --eval 'db.getCollectionInfos().forEach(
  c => print(c.name, db.getCollection(c.name).estimatedDocumentCount())
)' email-unsubscriber
```

If the `unsubscribe_records` count ever grew faster than 10x the unsubscribe-clicks metric, we knew somewhere in the pipeline was logging message-body fragments. It never did. The discipline of writing the audit before the feature kept the stack honest.

## Things we got wrong

- **We over-indexed on the scan step.** The first six weeks of product shipping were spent making the scanner 40% faster. Turned out users didn't notice — a 30-second scan feels the same as an 18-second scan when you're staring at 50,000 emails. We should have worked on the unsubscribe-flow UX first.
- **Our unsubscribe-success signal was naive.** We marked an unsubscribe as "successful" if the HTTP fetch returned 2xx. Plenty of senders return 200 OK while still needing a confirmation click. We now mark the state as *submitted*, not *confirmed*, and surface that nuance in the UI.
- **We ignored changelog posts for too long.** This blog is a correction.

## What's next

- A client-side ML classifier for "subscription-y but not in the List-Unsubscribe header". Early tests show it catches about 4% more subscriptions, which across 11M messages adds up.
- Microsoft Graph parity with the Gmail scanner. Currently we're at 80% feature parity; the last 20% is shared-mailbox edge cases and we want them solved before we market it.
- A CSV export so people who pay for the service can walk away with their list.

We'll write up each of those separately. Thanks for reading.
