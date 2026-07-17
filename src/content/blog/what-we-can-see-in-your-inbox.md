---
title: "Exactly what we can and can't see when you connect your inbox"
date: "2026-07-07"
excerpt: "A plain, itemized list of what our unsubscribe app can and can't see when you connect Gmail or Outlook: read-only headers, in your browser, nothing stored."
author: "Email Unsubscriber Team"
categories: ["Behind the Scenes"]
tags: ["oauth", "privacy", "read-only", "gmail-scopes", "microsoft-graph", "on-device"]
cover: "/blog/covers/what-we-can-see-in-your-inbox.webp"
coverAlt: "Flat vector illustration of a two-column CAN and CAN'T card, a sealed envelope showing only its address bar, a read-only eye, and a key fused to an hourglass, inside a browser frame."
featured: false
draft: false
readiness: "Ready for review"
faq:
  - question: "What can an email unsubscribe app see in my inbox?"
    answer: "It depends on the OAuth scope it requests. Email Unsubscriber uses read-only access and reads only the sender-identifying parts of your mail: message headers, sender names and addresses, and the List-Unsubscribe header that carries an opt-out link. That is enough to list who emails you. It does not need or read the body of your conversations to do its one job."
  - question: "What can't Email Unsubscriber do with my Gmail?"
    answer: "It cannot act on your mailbox at all. Read-only access means the app can view part of your mail but cannot send email as you, cannot delete or archive messages, cannot move mail between folders or labels, and cannot change any account or filter setting. It also cannot store or sell your message content, because that content never reaches our servers."
  - question: "What OAuth scope does Email Unsubscriber request?"
    answer: "One read-only scope per provider, named on the consent screen. On Gmail it is gmail.readonly. On a personal Microsoft account it is Mail.Read. Both are read-only by definition: they permit viewing mail but not sending, changing, or deleting it. We support personal Microsoft accounts only, not work or school accounts."
  - question: "Can Email Unsubscriber read the content of my emails?"
    answer: "The read-only scope technically permits reading message bodies, but our scan reads the sender-identifying headers, not your conversations, and it reads them in your browser. None of it reaches our servers, so we never store, analyze, or monetize your message content. What we read is the outside of the envelope, the part that says who sent it and how to opt out."
  - question: "Does my email leave my device when I connect it?"
    answer: "No. The scan runs inside your browser, which talks directly to Gmail or Microsoft. Our backend only hands your browser the code that reads the sender list; it never receives the messages that code reads. Sender names and List-Unsubscribe headers stay on your machine. There is no code path that uploads your email content to us."
  - question: "How long does Email Unsubscriber keep access to my inbox?"
    answer: "About an hour. Google's documentation states that user access tokens expire after one hour, and we request no refresh token, so our access ends on its own when that hour is up. Getting back in means signing in again. There is no standing, background connection to your mailbox waiting after your session closes."
  - question: "Can I revoke the app's access after I clean my inbox?"
    answer: "Yes, any time. Google lists every connected app at myaccount.google.com/connections, and Microsoft has the same in your account's privacy settings. Click the app, remove access, and confirm. Because we keep no refresh token, our access already expires on its own in about an hour, so manual revocation is the belt-and-suspenders option on top of that."
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

Subject: A hero cream disclosure card split into two labelled columns, one headed "CAN" and one headed "CAN'T". The CAN column shows a small teal checkmark beside an envelope whose top address strip is lit, plus a tiny cream ticket labelled "unsubscribe". The CAN'T column shows a crossed-out paper-plane send arrow, a crossed-out trash can, and a crossed-out gear. Beside the card sit a sealed cream envelope with only its top header bar showing while the folded letter stays shut, a simple read-only eye hovering over that header bar, and a small key fused to a tiny hourglass for a session that expires on its own. Loosely frame the whole cluster inside a cream browser window to show the reading happens in the browser. Arrange asymmetrically with the two-column card dominant; scatter small outline stars, dots, and plus signs in the gaps.
-->

You are on the Google or Microsoft consent screen, about to connect an unsubscribe app, and the line that stops your cursor reads "read your email." Fair enough. Before you click Allow, you deserve the literal list, not a soothing paragraph, but exactly what this app can and cannot touch once you approve it.

> When you connect Gmail or a personal Microsoft account to Email Unsubscriber, it gets read-only access. It reads message headers, sender names, and the List-Unsubscribe link, enough to list who emails you. It cannot send, delete, move, or change anything. The reading runs in your browser, so your message content never reaches our servers.

This post is the itemized version of that promise. Not "we respect your privacy," but a plain table of every capability, split into what the app can do and what it cannot, so you can match it against the scope on your own consent screen.

## What can Email Unsubscriber actually see in your inbox?

It sees the parts of a message that identify who sent it, not the conversation inside. To build the list of senders crowding your inbox, the scan reads three things:

- **Message headers**, the routing and metadata wrapped around each message, including who it is from.
- **The List-Unsubscribe header**, the standard field that bulk senders use to carry an opt-out link, which is how the app knows where your unsubscribe request should go.
- **Sender name and address**, the label that groups a hundred promo emails under one entry you can act on.

That is the raw material for a subscription list, and it is all the app needs. The read-only scope it holds does technically permit reading the body of a message too, the same way a read-only pass into a library lets you open any book on the shelf. The difference is what the app actually reaches for and where. Our scan reads the sender-identifying headers, it reads them inside your browser, and none of it is sent back to us. The ceiling of the scope is "read"; the practice is "read the outside of the envelope, on your device, and keep nothing."

## What can't it do with your inbox?

It cannot act on your mailbox, only look at part of it. Read-only access is a one-way door: the app can view, and viewing is the end of its power. Line by line, it cannot send email as you, cannot delete or archive a message, cannot move mail between folders or labels, and cannot change a single account or filter setting. It also cannot read, store, or monetize the content of your conversations, because that content never leaves your device for our servers in the first place.

The one action it can take on your behalf is the unsubscribe itself, and only when you choose it. When you click to leave a sender, the app fires an [RFC 8058 one-click unsubscribe](/blog/what-is-one-click-unsubscribe) from your browser to that sender's opt-out endpoint. That request goes to the sender, not through us, and nothing about it writes to your mailbox.

## The can and can't list, item by item

Here is the whole capability set in one place. Read it against the scope named on your consent screen, and the two should line up exactly.

| The app... | Can it? | Why |
|---|---|---|
| List the senders emailing you | Yes | Reads sender name and address from message headers |
| Show a sender's unsubscribe link | Yes | Reads the List-Unsubscribe header that carries it |
| Fire a one-click unsubscribe you chose | Yes | Sends the RFC 8058 opt-out from your browser to the sender |
| Send email as you | No | Read-only scope grants no send permission |
| Delete, archive, or move your mail | No | Read-only scope cannot modify the mailbox |
| Change your account or filter settings | No | Read-only scope cannot write settings |
| Read, store, or sell your message content | No | The content never reaches our servers |
| Keep access after your session ends | No | No refresh token; access expires in about an hour |

The pattern is simple. Everything in the "yes" column is a form of reading or a single opt-out you triggered. Everything a mailbox owner would call a real change to their mail sits in the "no" column, and it stays there because the scope makes it impossible, not because a policy asks us nicely.

## Which permission does it ask for on the consent screen?

It asks for one read-only scope per provider, and the consent screen names it before you approve. On Gmail the scope is `gmail.readonly`. On a personal Microsoft account it is `Mail.Read`. Both are read-only by definition, so you can check our claim against the provider's own documentation rather than ours.

| Provider | Scope we request | What it allows |
|---|---|---|
| Gmail | `gmail.readonly` | View messages, labels, and settings. No send, change, or delete. |
| Microsoft (personal) | `Mail.Read` | Read mail. No send, change, or delete. |

The `gmail.readonly` description comes from [Google's own Gmail API scope documentation](https://developers.google.com/workspace/gmail/api/auth/scopes), which lists it as read access with no ability to modify. The `Mail.Read` description comes from the [Microsoft Graph permissions reference](https://learn.microsoft.com/en-us/graph/permissions-reference), where it is defined as permission to read the user's mail and nothing more. One note on Microsoft: we support personal Microsoft accounts only, not work or school accounts, so the connection you make is to your own consumer mailbox.

## Where does the reading happen, and does your email reach our servers?

The reading happens inside your browser, and your email content never reaches our servers. When you connect an account, your browser talks straight to Gmail's or Microsoft's API and pulls the sender information the scan needs. Our backend does one thing in that moment: it hands your browser the code that does the reading. It does not receive the messages that code reads.

That single design choice is what makes the "no" rows above structural rather than promised. A company cannot store, analyze, or sell email content it never received, and ours was never wired to receive it. We laid out the full architecture, including the network trace you can run yourself to confirm nothing is uploaded, in [why we never store your emails](/blog/why-we-never-store-your-emails). To be precise about our own limits, we do run product analytics on how the app is used, with your cookie consent. What we never touch is the content of your mail.

## How long does our access last, and can you take it back?

Our access lasts about an hour, and you can revoke it sooner whenever you like. According to [Google's authentication documentation](https://docs.cloud.google.com/docs/authentication/token-types), a user access token "automatically expires after one hour." We also request no refresh token, the credential that would let an app quietly renew its own access in the background, so once that hour is up our access to your inbox ends on its own. Getting back in means you sign in again.

You never have to wait for the clock, though. Google lists every app you have connected at [myaccount.google.com/connections](https://myaccount.google.com/connections), and Microsoft keeps the same list in your account's privacy settings. Click our entry, remove access, and confirm, and the connection is cut immediately. We wrote a step-by-step walkthrough for the Google side in [how to revoke third-party app access](/blog/revoke-google-account-app-access). Because our access was already going to expire on its own, manual revocation is the extra lock on a door that was closing anyway.

## Why show you the full list instead of asking you to trust us?

Because a list is checkable and a promise is not. Every claim on this page maps to something you can verify without taking our word for it: the scope on your consent screen, the provider's public scope documentation, the network tab in your browser during a scan, and the connected-apps page where you can cut access off. Trust that rests on those is trust you can confirm. Trust that rests on a paragraph in a privacy policy is trust you have to assume.

If you want the broader version of this reasoning, the question of how to vet any unsubscribe app, ours included, gets a full checklist in [are email unsubscribe apps safe](/blog/are-email-unsubscribe-apps-safe), and the independent CASA Tier 2 review of our code sits on our [security page](/security). When you are ready to see the list in action, [connect your inbox](https://app.email-unsubscriber.com), watch the scan build your sender list in the browser, and remove access the moment you are done. That is the whole deal: read-only, on your device, gone in an hour, and [paid for once](/#pricing) so there is nothing about your mail we have any reason to keep.
