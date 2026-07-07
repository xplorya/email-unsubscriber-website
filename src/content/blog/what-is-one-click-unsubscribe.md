---
title: "One-click unsubscribe, explained: what RFC 8058 does for your inbox"
date: "2026-05-26"
excerpt: "One-click unsubscribe is the RFC 8058 standard behind the Unsubscribe button at the top of some emails. Here's what it does and why it's safer."
author: "Email Unsubscriber Team"
categories: ["Guides"]
tags: ["one-click-unsubscribe", "rfc-8058", "list-unsubscribe-header", "gmail", "email-security"]
cover: "/blog/covers/what-is-one-click-unsubscribe.webp"
coverAlt: "Flat vector illustration of a finger tapping an unsubscribe button on a cream email card, an arrow flying past a crossed-out browser window to a mailbox, with a small shield nearby."
featured: false
draft: false
readiness: "Done and published. Frozen"
faq:
  - question: "What is one-click unsubscribe?"
    answer: "One-click unsubscribe is an email standard called RFC 8058, published by the IETF in January 2017. It lets your email app remove you from a mailing list with a single tap. Your client sends a quiet POST request straight to the sender's server, and no website opens in your browser. Gmail and Yahoo have required it from bulk senders since February 2024."
  - question: "Is one-click unsubscribe safe?"
    answer: "Yes, it is the safest way to opt out. Tapping the button sends a structured request straight from your email app to the sender, so no web page loads. Nothing can drop a cookie, log your IP on a landing page, or show you a fake login form. RFC 8058 also requires the message to carry a valid DKIM signature, which proves the sender is who they claim to be."
  - question: "Why do some emails have an unsubscribe button at the top and others don't?"
    answer: "The top-bar button appears only when the email carries the List-Unsubscribe and List-Unsubscribe-Post headers and passes authentication checks. Bulk senders who mail more than 5,000 messages a day to Gmail or Yahoo must include them. Smaller senders and transactional emails often don't, so their messages show only a footer link, if anything at all."
  - question: "What is the difference between List-Unsubscribe and List-Unsubscribe-Post?"
    answer: "List-Unsubscribe (RFC 2369, from 1998) carries the sender's unsubscribe endpoint, either a URL or a mailto address. List-Unsubscribe-Post (RFC 8058, from 2017) adds one line, List-Unsubscribe=One-Click, that tells your email app it may fire a POST request to that endpoint without opening a page. The second header is what turns a plain link into a true one-click button."
  - question: "Do all emails support one-click unsubscribe?"
    answer: "No. One-click unsubscribe covers marketing and promotional mail from high-volume senders. Transactional messages like receipts and password resets are excluded, and small senders often skip the headers entirely. When the button is missing, the sender either doesn't send enough volume to qualify or hasn't adopted the modern bulk-sender standard."
  - question: "Does one-click unsubscribe work for spam and scam emails?"
    answer: "You should not rely on it for spam. RFC 8058 requires a valid DKIM signature, which real bulk senders have and most spammers avoid, so genuine scam mail rarely shows a legitimate button. For anything you don't recognize, mark it as spam instead of unsubscribing. That trains your provider's filter and sends no signal back to the sender."
  - question: "How long does a sender have to honor a one-click unsubscribe?"
    answer: "Under Gmail and Yahoo's bulk-sender guidelines, senders must process a one-click unsubscribe within two days. That is stricter than the law: the U.S. CAN-SPAM Act gives senders up to 10 business days. If a bulk sender keeps emailing you well past the two-day window, they are breaking the mailbox providers' rules and possibly the law."
---

<!--
cover-generation-prompt

Paste the block below (Style → Subject) into your image generator. The style
portion is locked by `website/.design/DESIGN.md` §14.10 — do NOT tweak it.
Only the Subject line is tailored per post. If you edit the Subject, keep it
to 1–3 sentences and do not re-describe the style.

Flat vector editorial illustration in one strict house style. Match the attached reference cover exactly if one is provided.

HARD RULE — obey above all else: ABSOLUTELY FLAT. No shadows of any kind — no drop shadow, no soft ambient shadow beneath objects, no inner shadow, no glow, no gradient, no soft background blobs behind the cluster. Every fill is one solid flat color; all objects float on one flat solid teal canvas.

Text: legible words are allowed where they meaningfully label an object (e.g. the word on an unsubscribe button). Keep any text short, correctly spelled, and drawn in dark teal on a cream or teal label. Where a word is not needed, default to 3–5 wavy squiggle lines or solid bars instead — do not fill every surface with text.

Technique: hand-drawn feel with a subtle organic line wobble; bold uniform outline on every shape — same chunky-marker thickness everywhere, inner details included; 2D frontal orthographic; objects float on a flat plane — no ground line, no perspective, no 3D.

Palette — only these five colors, nothing else: background solid pale mint teal #99f6e4 (full bleed, one flat fill — this lock matters most); outlines deep pine teal #115e59 (every contour and every decorative mark); primary fill bright teal #2dd4bf; secondary fill deep teal #0d9488; cream #faf6ed ONLY for paper / screen / label surfaces (the sole non-teal color). No other hues. No gradients, texture, grain, or noise.

Composition: 5–12 simplified friendly objects, rounded chunky proportions, clustered asymmetrically at varied scale — one or two hero objects plus medium and small ones. Objects overlap each other and bleed slightly off the frame edges. Keep the hero inside the middle 60% of the frame (sides get cropped by card ratios). Leave breathing room; season gaps with 5–8 small fillers — 4-point outline stars, tiny solid dots, short parallel sparkle strokes, small outline circles, small plus signs — all in the outline teal.

Objects: no human faces or people. No brand-accurate logos or devices — a laptop is three rounded rectangles, not a real MacBook. Avoid stock clip-art clichés (spy hats, incognito sunglasses, generic lightbulbs) unless the Subject names them.

Canvas: 1200×630, full bleed, no border, no framing, no logo, no watermark, no caption.

Forbidden: logos, watermark, caption, misspelled or garbled words, gradients, drop shadows, soft/ambient shadows, inner shadows, glows, soft background blobs behind the cluster, 3D, perspective, isometric, depth of field, photorealism, pixel art, low-poly, anime, watercolor, painterly, brush texture, grain, noise, emoji, stock clip-art, human faces, colors outside the teal + cream palette.

Subject: A hero cream-paper email card with a single unsubscribe button set at its top edge and a pointer finger tapping it as the dominant element. A short straight arrow shoots from the button to a small cream mailbox on the opposite side, passing over a crossed-out browser window that sits below the arrow's path (signalling that no website opens). Around the cluster: an open envelope showing a thin horizontal header strip of abstracted squiggle-text (the hidden List-Unsubscribe header), a small outline shield resting near the envelope (authentication), and a single tally bar abstracted as one short stroke. Hero card-and-finger pairing sits centered in the middle 60% of the frame.
-->

Open a promotional email in Gmail and look at the very top, right next to the sender's name. Some emails show a small **Unsubscribe** link there. Others bury a gray, six-point link in the footer and dare you to find it. The one at the top is one-click unsubscribe, and it works differently under the hood.

> One-click unsubscribe is an email standard (RFC 8058, January 2017) that lets your email app remove you from a mailing list with a single tap. Your client sends a quiet POST request straight to the sender, and no website opens. Gmail and Yahoo have required it from bulk senders since February 2024.

## What is one-click unsubscribe?

One-click unsubscribe is a published internet standard, [RFC 8058](https://www.rfc-editor.org/rfc/rfc8058.html), that lets you leave a mailing list with one tap and no detour through a web page. Your email app talks to the sender's server on your behalf and confirms you want out.

The standard was written by the [Internet Engineering Task Force](https://www.rfc-editor.org/info/rfc8058/) and published in January 2017. Gmail, Yahoo, Apple Mail, and Outlook all read it. When they see the right signals in an email, they draw their own Unsubscribe button at the top of the message, above whatever the sender put in the footer.

The button you tap belongs to your email provider, not the marketer. You never leave the safety of your inbox, and a legitimate sender has to honor the request.

## How does one-click unsubscribe actually work?

Two hidden headers make the button appear. You never see them, but your email app does.

The first is `List-Unsubscribe`, defined back in [RFC 2369](https://datatracker.ietf.org/doc/html/rfc2369) in July 1998. It carries the sender's unsubscribe endpoint, either a web address or a `mailto:` address. On its own it is old and passive: it just tells a client where the opt-out lives.

The second header is what RFC 8058 added. It looks like this:

```text
List-Unsubscribe: <https://sender.example/opt-out/abc123>
List-Unsubscribe-Post: List-Unsubscribe=One-Click
```

That `List-Unsubscribe-Post` line is the switch. It tells your email app one thing: you may fire a POST request to the endpoint above without asking the sender's website for permission first. When you tap the button, your client sends an HTTPS POST to that URL with the body `List-Unsubscribe=One-Click`. The sender's server reads it, finds your address, and removes you. No tab opens. No form loads.

## Why does one-click unsubscribe use a POST request instead of a link?

Because plain links get clicked by machines, not just people. This is the core problem RFC 8058 was written to solve.

Email passes through security software before it reaches you. That software often opens the links inside a message to check whether they lead somewhere dangerous. The RFC names the issue directly: "anti-spam software often fetches all resources in mail header fields automatically, without any action by the user." A scanner that follows an old-style unsubscribe URL can opt you out of a list you wanted, or flood a sender with fake opt-outs from addresses that never asked to leave.

A POST request fixes both. Scanners and link-preview bots fetch URLs with GET, the read-only method. They do not send POST requests carrying an action body. So the unsubscribe fires only when a human deliberately taps the button, and the sender can trust that every opt-out is real.

## Why did Gmail and Yahoo make one-click unsubscribe mandatory?

They tied it to volume. In February 2024, Google and Yahoo rolled out shared rules for bulk senders, defined as anyone sending more than 5,000 messages a day to their domains.

According to [Google's sender guidelines](https://support.google.com/a/answer/81126), bulk senders of marketing mail must include a one-click unsubscribe in every promotional message and process the request within two days (how that 48-hour clock compares to the law's own deadline is covered in [how long a company can email you after you unsubscribe](/blog/how-long-after-unsubscribe-can-they-email-you)). Google paired that with authentication: senders have to sign their mail with SPF, DKIM, and DMARC, and keep spam complaints low. Yahoo published matching rules. The two providers handle most consumer inboxes between them, so the standard spread across the industry inside a year.

The result shows up in your inbox as a button. Every time you see Gmail's own Unsubscribe next to a big brand's name, you are looking at a sender who had to comply.

## Is one-click unsubscribe safer than a footer unsubscribe link?

Yes. The footer link takes you to the sender's website; the one-click button never leaves your email app. That single difference removes most of the risk.

| | Footer unsubscribe link | One-click unsubscribe button |
|---|---|---|
| Where you end up | The sender's web page, in your browser | Nowhere, the request goes app-to-server |
| Can it drop a tracking cookie? | Yes, the landing page can | No page loads, so no |
| Can it log your IP on a page? | Yes | No |
| Phishing surface | A fake page can imitate a login | None, there is no page to fake |
| Sender identity check | None guaranteed | DKIM signature required by RFC 8058 |

RFC 8058 requires the message to carry a valid DKIM signature that covers the unsubscribe headers. DKIM is a cryptographic signature that proves the email really came from the domain it claims. A scammer cannot forge it, which is why genuine one-click buttons rarely show up on spam. For a fuller walk through the risks of clicking, see [is it safe to click unsubscribe?](/blog/is-it-safe-to-click-unsubscribe).

## What are the limits of one-click unsubscribe?

It covers less than you might hope. Three gaps are worth knowing.

**It only reaches high-volume commercial senders.** The standard exists for marketing mail from bulk senders. A small newsletter run by one person, or a local shop mailing a few hundred people, has no obligation to add the headers, and many don't. Those messages show a footer link or nothing.

**Transactional email is excluded.** Receipts, shipping notices, password resets, and security alerts are not marketing, so the rules don't apply. You will not find a one-click button on your bank's fraud alert, and you would not want to unsubscribe from it anyway.

**It depends on the sender playing fair.** One-click unsubscribe tells a compliant sender to stop. It cannot force a sender who ignores the request. If mail keeps arriving well past the two-day window, the sender is breaking the mailbox providers' rules, and possibly the law. [Your rights when unsubscribe doesn't stop the emails](/blog/your-rights-when-unsubscribe-fails) covers what to do next.

## How do you use one-click unsubscribe across a whole inbox?

Tap the button when you see it. In Gmail, Yahoo, Apple Mail, and Outlook, it sits at the top of the message near the sender's name, and it appears only when the email carries valid one-click headers. Prefer it over the footer link every time it shows.

Doing that one message at a time is slow when years of subscriptions have piled up (for the Gmail-specific routes, see [how to mass unsubscribe in Gmail](/blog/mass-unsubscribe-gmail)). A tool can read the headers for you and fire the same RFC 8058 POST request for every sender that supports it, all in one pass. Our [Email Unsubscriber app](https://app.email-unsubscriber.com/) does exactly this from inside your browser, dispatching genuine one-click unsubscribes where senders support them and flagging the ones that only offer an old-style link. The scanning happens on your device, so your email content never reaches our servers.

## The takeaway

One-click unsubscribe is the quiet plumbing behind the safest button in your inbox. It is a real standard, RFC 8058, backed by a hidden pair of headers, a POST request instead of a link, and a DKIM signature that proves the sender is real. Gmail and Yahoo made it mandatory for bulk senders in 2024, which is why it now sits at the top of most marketing mail.

When the button is there, use it. When it isn't, the sender either hasn't earned the safer path or doesn't send enough to qualify, and you fall back to marking as spam or opting out by hand.
