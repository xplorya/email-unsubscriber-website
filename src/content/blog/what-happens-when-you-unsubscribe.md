---
title: "What actually happens when you click unsubscribe"
date: "2026-06-27"
excerpt: "Click unsubscribe and your request travels to the sender's server, lands your address on a suppression list, and future campaigns skip you. Here's the journey."
author: "Email Unsubscriber Team"
categories: ["Guides"]
tags: ["unsubscribe", "suppression-list", "one-click-unsubscribe", "list-unsubscribe-header", "how-email-works"]
cover: "/blog/covers/what-happens-when-you-unsubscribe.webp"
coverAlt: "Flat vector illustration of a request slip traveling from an unsubscribe button to a server and a ledger where a name is crossed off, with envelopes held back behind a barrier."
featured: false
draft: false
readiness: "Ready for review"
faq:
  - question: "What actually happens when you click unsubscribe?"
    answer: "Your mail app packages a request and sends it by one of three routes: a silent one-click request straight to the sender, a web page that records your opt-out, or a plain email to the sender's unsubscribe address. The sender's server reads a token that identifies you, adds your address to a suppression list, and skips you on future campaigns."
  - question: "Does unsubscribing from emails actually work?"
    answer: "For a legitimate sender, yes. The request reaches the server, your address goes on a suppression list, and future campaigns skip you. The result is invisible, so a missing confirmation and a few stray emails during the processing window are normal. For senders you do not recognize, marking as spam works better than clicking anything inside the message."
  - question: "Where does an unsubscribe request go?"
    answer: "It goes to an endpoint the sender chose in advance, usually run by their email platform such as Mailchimp, Twilio SendGrid, or Klaviyo rather than the sender directly. The endpoint address sits inside the message's List-Unsubscribe header, along with a token that tells the server which subscriber and which list the request is for."
  - question: "What is an email suppression list?"
    answer: "A suppression list is the file of addresses a sender is not allowed to mail. When you unsubscribe, your address is added to it, and every future campaign is checked against the list before it goes out. Your address matches, so the campaign skips you. Email platforms build this in under names like global unsubscribe group."
  - question: "Do senders delete you when you unsubscribe, or just stop mailing you?"
    answer: "They stop mailing you without deleting you. Instead of erasing your address, the sender moves it onto a suppression list that blocks future sends. Keeping the record is deliberate: it stops a later import of an old contact file from adding you back, and it serves as the sender's proof that it honored your request, which the law expects."
  - question: "Do you get a confirmation after you unsubscribe?"
    answer: "Not always, and a missing one does not mean it failed. A landing page usually shows an unsubscribed message. The one-click route is silent by design, so a success looks exactly like nothing happening. The mailto route sends an email you never see answered. The real test is whether the mail stops within the sender's allowed window."
  - question: "Why do I still get emails for a few days after unsubscribing?"
    answer: "The sender is allowed a processing window, and campaigns queued before your request still go out. CAN-SPAM gives U.S. senders up to 10 business days, while Gmail and Yahoo require bulk senders to honor a one-click unsubscribe within two days. Big brands also run several lists, so leaving one does not stop the others."
  - question: "Can the sender see when I unsubscribe?"
    answer: "Yes. The sender logs an opt-out event tied to your address, the specific list, and a timestamp, which it needs to suppress you. The one-click route reveals little beyond that request. A landing page reveals more, because when their site opens in your browser it can log your IP, drop a cookie, and note your device."
---

<!--
cover-generation-prompt

Paste the block below (Style then Subject) into your image generator. The style
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

Subject: A hero cream-paper request slip stamped with a small crossed-out name travels along a dotted dashed route from a tapped cream unsubscribe button on the left toward a chunky cream server tower on the right. The route ends at an open cream ledger where an outlined hand crosses one name off a short column of squiggle rows, a small dark-teal label reading "suppressed" clipped to the ledger's top edge. Behind a short teal barrier bar, three cream envelopes wait held back, unable to pass through to you. Tuck a tiny checkmark badge and a small tear-off calendar near the server tower. The slip-route-ledger trio sits centered in the middle 60% of the frame; season the gaps with a few 4-point outline stars, small plus signs, and dot clusters.
-->

You clicked the unsubscribe link, the tab closed or nothing visibly happened, and now you are wondering where that click actually went. Nothing on your screen tells you. Behind that one tap, a small request leaves your inbox, crosses the network, and ends up in a file on the sender's server.

> When you click unsubscribe, your mail app either fires a silent request straight to the sender, opens a web page that records your opt-out, or emails the sender's unsubscribe address. The sender's server reads a token that identifies you, adds your address to a suppression list, and skips you on future campaigns. Mail can still arrive for a few days.

## What actually happens the moment you click unsubscribe?

One request leaves your device, and everything else happens on the sender's side. The click does not stop any email directly. It sends a message that says, in effect, take this address off this list, and the sender's system is what acts on it.

Picture a short trip with three legs. Your mail app or browser packages the request. The request travels to whatever endpoint the sender named in the message. The server records it and changes what it plans to send you next. You see none of the middle, which is why a working unsubscribe and a broken one can look identical from where you sit.

The rest of this piece walks each leg in order: which route your click takes, where it lands, what a suppression list is, and why the mail sometimes keeps coming after all of it worked.

## Which of the three paths does your click take?

Your click takes one of three routes, and the route decides how much travels and how quiet it stays.

The **one-click route** is the silent one. When you tap the Unsubscribe button your email app shows at the top of a message, the app sends a structured request straight to the sender's server and no web page opens. This is the RFC 8058 standard, and [one-click unsubscribe explained](/blog/what-is-one-click-unsubscribe) covers exactly what that request carries.

The **landing-page route** is the visible one. When you click a link buried in the footer, your browser opens the sender's website, which loads a page that reads your opt-out and often shows a confirmation. A page loading means the sender can see more than a bare request would reveal, a point covered further down.

The **mailto route** is the oldest. Some senders list an email address instead of a web address, so your app quietly sends a plain unsubscribe email on your behalf. Apple Mail leans on this one.

| Path | What your app does | Does a page open? |
|---|---|---|
| One-click POST | Sends a structured request straight to the server | No |
| Landing page | Opens the sender's site in your browser | Yes |
| mailto | Sends a plain unsubscribe email from your address | No |

All three start from the same hidden line in the message, the List-Unsubscribe header, taken apart in [the header, explained](/blog/list-unsubscribe-header-explained).

## Where does your unsubscribe request actually go?

Your request goes to an endpoint the sender chose in advance, and that endpoint usually belongs to their email platform rather than the sender itself. Most companies do not run their own mail servers. They hire a service like Mailchimp, Twilio SendGrid, or Klaviyo, and that service handles the unsubscribe endpoint too.

The address of the endpoint sits inside the List-Unsubscribe header, next to a long token that looks like random characters. That token is doing the real work. It identifies which subscriber and which list the request belongs to, because the standard leaves no other channel to carry that detail. When the request arrives, the server reads the token, finds your record, and marks it.

Twilio SendGrid's own [documentation](https://www.twilio.com/docs/sendgrid/ui/sending-email/list-unsubscribe) describes the mechanic plainly: a POST request to the unsubscribe link "should result in an unsubscribe," and the platform leaves the sender responsible for receiving and processing it. The standard defines how the request travels; the sender's platform defines what happens when it lands.

## What is a suppression list, and why does your address land on one?

A suppression list is the file of addresses a sender is not allowed to mail. When you unsubscribe, the sender does not usually delete you. It moves your address onto this do-not-send list, and every future campaign is checked against the list before it goes out. Your address matches, so the campaign skips you.

Email platforms build this in. Twilio SendGrid calls it a global unsubscribe group. Mailchimp, per its [guide to unsubscribes](https://mailchimp.com/help/about-unsubscribes/), keeps an unsubscribed contact in your audience under an unsubscribed status rather than erasing it. The name changes from tool to tool; the job does not. It is a standing list of people the system must not email.

Keeping you instead of deleting you is deliberate. If the sender simply wiped your address, a later import of an old contact file could add you straight back, and the mail would start again with no memory of your having left. The suppression list is also the sender's proof that it honored the request, which matters when the law expects a record. So unsubscribing rarely removes you from a database. It adds you to the one list that keeps the rest of them quiet.

## What does the sender see when you unsubscribe?

The sender sees an opt-out event tied to your address, the specific list, and a timestamp. That is the baseline for every route. Their system logs that this address asked to leave this list at this moment, which is what it needs to suppress you and to prove it did.

How much more they see depends on the path. The one-click route reveals almost nothing beyond the request itself, because no page loads to run scripts or read your browser. The landing-page route reveals more. When their website opens in your browser, it can log your IP address, drop a cookie, and note your device, the same way any web page can. None of that is required to unsubscribe you, but a page in front of you is in a position to collect it. That gap in exposure is one reason the native button is the safer click, walked through in [is it safe to click unsubscribe?](/blog/is-it-safe-to-click-unsubscribe).

## Do you get a confirmation that it worked?

Sometimes, and the absence of one does not mean it failed. The three routes confirm differently, and only one of them shows you anything by design.

The landing-page route usually loads a page that says you are unsubscribed, occasionally asking you to click one more button to confirm. The one-click route stays silent on purpose. Your app sends the request, the server acts, and nothing opens to report back, so a successful one-click unsubscribe looks exactly like nothing happening. The mailto route sends an email you never see answered.

A quiet result is normal, then. The real test is not a confirmation screen. It is whether the mail stops within the window the sender is allowed, which is the next question.

## Why do emails keep coming for a few days?

Mail keeps arriving because the sender is allowed a processing window, and campaigns already in flight were queued before your request landed. Neither means the unsubscribe failed.

The U.S. [CAN-SPAM Act](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business) gives a commercial sender up to 10 business days to honor an opt-out, close to two calendar weeks once weekends count. Large senders have to move faster. Since February 2024, [Google's sender guidelines](https://support.google.com/a/answer/81126) and Yahoo's matching rules require any bulk sender, meaning more than 5,000 messages a day to their domains, to process a one-click unsubscribe within two days.

There are ordinary reasons too. A big brand often runs several lists, and leaving one does not touch the others. A newsletter that was scheduled an hour ago still goes out to the list it was built from. Past the window, though, continued mail stops being normal and becomes a violation, and [unsubscribed but still getting emails](/blog/unsubscribed-but-still-getting-emails) sorts the honest delays from the senders who are ignoring you.

## So does unsubscribing actually work?

For a legitimate sender, yes, and now you can see why the result is invisible. The request reaches the server, your address goes on the suppression list, and future campaigns skip you. The missing confirmation screen and the few stray emails during the processing window are features of how the plumbing runs, not signs of a failure.

The exception is a sender who was never going to honor the request. Real spammers treat an unsubscribe click as proof that a human reads the address, so they mail you more rather than less. For anything you do not recognize, marking it as spam is the move, because it sends no signal back and trains your filter instead.

Doing this across a full inbox is the slow part, since every sender hides its control somewhere different and only the ones you already trust show a button. A tool can read the List-Unsubscribe header for every sender in one pass and fire the genuine one-click request wherever a sender supports it. Our [Email Unsubscriber app](https://app.email-unsubscriber.com) does that from inside your browser, so your email content never reaches our servers, the access stays read-only, and the session expires in about an hour.

## The takeaway

One click sets off a short, invisible chain. Your app packages the request, sends it by one of three routes, and the sender's server adds your address to a suppression list that every future campaign checks. You rarely see a confirmation, and a few emails during the legal processing window are normal.

The plumbing works when the sender is honest. When it is not, no amount of clicking will help, and marking as spam is the better tool. Either way, the button stops being a mystery. It is a request with a destination, and now you know where it lands.
