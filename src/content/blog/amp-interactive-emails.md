---
title: "AMP and interactive emails: why some messages have working buttons"
date: "2026-07-04"
excerpt: "Some emails now let you RSVP, fill a form, or browse a carousel without leaving your inbox. Here's how AMP for Email works and who supports it."
author: "Email Unsubscriber Team"
categories: ["Your Inbox"]
tags: ["amp-for-email", "dynamic-email", "interactive-email", "gmail", "email-privacy"]
cover: "/blog/covers/amp-interactive-emails.webp"
coverAlt: "Flat vector illustration of a cream email card with a pressed teal button and a small carousel, beside an RSVP toggle, a lightning bolt, and a refresh arrow."
featured: false
draft: false
readiness: "Ready for review"
faq:
  - question: "What is AMP for email?"
    answer: "AMP for Email is an open format that lets senders embed a limited set of interactive components inside a message, so you can RSVP, fill in a form, or browse a carousel without leaving your inbox. Technically the sender adds a text/x-amp-html part to the email alongside the plain-text and HTML versions. Gmail calls the feature dynamic email."
  - question: "Why do some emails have buttons I can click?"
    answer: "Those messages were built with AMP for Email. Unlike a static email, which is frozen once it is sent, an AMP email keeps a live link to the sender's server, so a button can submit a form or an RSVP and a carousel can load fresh content the moment you open it. Gmail, Yahoo Mail, Mail.ru, and AOL render these interactive messages."
  - question: "Which email providers support AMP emails?"
    answer: "Four mail services render AMP emails: Gmail, Yahoo Mail, Mail.ru, and AOL, plus the Android client FairEmail, per the AMP project's support page. Gmail was first, making dynamic email generally available on July 2, 2019. Apple Mail and Microsoft Outlook do not support AMP; they show the plain HTML fallback the sender includes instead."
  - question: "Is AMP email safe?"
    answer: "AMP email runs in a stricter sandbox than ordinary HTML email. Google requires SPF and DKIM authentication, TLS, and sender registration, forbids arbitrary JavaScript, and proxies every network request without cookies. The format is not a common malware vector. The real risk is social: a live, official-looking message can make a sender feel more trustworthy than it is."
  - question: "Can AMP emails track me?"
    answer: "An AMP email can tell the sender what you did inside it, such as which option you picked or whether you submitted a form, in real time. That is more detail than a tracking pixel, which only reports that you opened. But Google proxies the requests and strips cookies, so the sender does not see your IP address or Google cookies from those calls."
  - question: "How do I turn off dynamic email in Gmail?"
    answer: "In Gmail on the web, open Settings, go to the General tab, find Dynamic email, uncheck Enable dynamic email, and save. Setting Gmail's images option to Ask before displaying external images also disables dynamic email as a side effect. With it off, every message renders as plain, static HTML. Yahoo Mail and Mail.ru have equivalent settings."
  - question: "Does Outlook or Apple Mail support AMP email?"
    answer: "No. Neither Microsoft Outlook nor Apple Mail renders AMP for Email. When a dynamic message arrives, these clients display the plain HTML version the sender is required to include as a fallback, so the email still works, just without the interactive buttons, forms, or carousels. Only Gmail, Yahoo Mail, Mail.ru, and AOL show the AMP version."
  - question: "What is the difference between AMP email and regular HTML email?"
    answer: "A regular HTML email is a snapshot, fixed the moment it is sent. An AMP email carries an extra interactive layer that fetches live content from the sender when you open it, so buttons, forms, and carousels work in place. Regular HTML renders everywhere; AMP renders only in Gmail, Yahoo, Mail.ru, and AOL, and falls back to HTML elsewhere."
---

<!--
cover-generation-prompt

Paste the block below (Style then Subject) into your image generator. The style
portion is locked by website/.design/DESIGN.md section 14.10 — do NOT tweak it.
Only the Subject line is tailored per post. If you edit the Subject, keep it
to 1 to 3 sentences and do not re-describe the style.

Flat vector editorial illustration in one strict house style. Match the attached reference cover exactly if one is provided.

HARD RULE — obey above all else: ABSOLUTELY FLAT. No shadows of any kind — no drop shadow, no soft ambient shadow beneath objects, no inner shadow, no glow, no gradient, no soft background blobs behind the cluster. Every fill is one solid flat color; all objects float on one flat solid teal canvas.

Text: legible words are allowed where they meaningfully label an object (e.g. the word on an unsubscribe button). Keep any text short, correctly spelled, and drawn in dark teal on a cream or teal label. Where a word is not needed, default to 3–5 wavy squiggle lines or solid bars instead — do not fill every surface with text.

Technique: hand-drawn feel with a subtle organic line wobble; bold uniform outline on every shape — same chunky-marker thickness everywhere, inner details included; 2D frontal orthographic; objects float on a flat plane — no ground line, no perspective, no 3D.

Palette — only these five colors, nothing else: background solid pale mint teal #99f6e4 (full bleed, one flat fill — this lock matters most); outlines deep pine teal #115e59 (every contour and every decorative mark); primary fill bright teal #2dd4bf; secondary fill deep teal #0d9488; cream #faf6ed ONLY for paper / screen / label surfaces (the sole non-teal color). No other hues. No gradients, texture, grain, or noise.

Composition: 5–12 simplified friendly objects, rounded chunky proportions, clustered asymmetrically at varied scale — one or two hero objects plus medium and small ones. Objects overlap each other and bleed slightly off the frame edges. Keep the hero inside the middle 60% of the frame (sides get cropped by card ratios). Leave breathing room; season gaps with 5–8 small fillers — 4-point outline stars, tiny solid dots, short parallel sparkle strokes, small outline circles, small plus signs — all in the outline teal.

Objects: no human faces or people. No brand-accurate logos or devices — a laptop is three rounded rectangles, not a real MacBook. Avoid stock clip-art clichés (spy hats, incognito sunglasses, generic lightbulbs) unless the Subject names them.

Canvas: 1200×630, full bleed, no border, no framing, no logo, no watermark, no caption.

Forbidden: logos, watermark, caption, misspelled or garbled words, gradients, drop shadows, soft/ambient shadows, inner shadows, glows, soft background blobs behind the cluster, 3D, perspective, isometric, depth of field, photorealism, pixel art, low-poly, anime, watercolor, painterly, brush texture, grain, noise, emoji, stock clip-art, human faces, colors outside the teal + cream palette.

Subject: A hero cream email card that has come to life, its surface holding a pressed bright-teal button labeled RSVP, a small in-card image carousel flanked by left and right chevrons, and a tiny two-bar poll. A short circular refresh arrow loops around the card's corner to show it pulls live content. Beside it, a plainer cream envelope sits perfectly still as the frozen fallback version. Around the cluster: a small lightning bolt for the live format, a short broadcast antenna sending two signal arcs toward the sender, and a small cream padlock for the sandboxed, proxied requests. Season the gaps with a few 4-point outline stars, small plus signs, and dot clusters. Keep the living email card centered in the middle 60% of the frame.
-->

You open an email and something is off. There is a working RSVP button, or a short form you can fill in without leaving the message, or a product carousel you can swipe through right there in your inbox. It behaves like a small web page instead of a letter.

> Some emails are interactive because the sender built them with AMP for Email, which Gmail calls dynamic email. The format runs a safe subset of live content inside the message, so you can RSVP, submit a form, or browse a carousel without leaving your inbox. Gmail, Yahoo Mail, Mail.ru, and AOL support it.

## Why do some emails have working buttons?

Those emails were built with AMP for Email, a format that lets a message run live, interactive content instead of sitting still. A normal email is a snapshot. The sender wrote it, sent it, and whatever it said is frozen in place. An AMP email keeps a line open to the sender's server, so a button can actually submit something and a carousel can pull fresh images at the moment you open it.

Gmail brands the feature "dynamic email." When you open a dynamic message, Gmail renders the AMP version and requests any updates from the sender right then, so the content reflects the moment you opened it rather than the moment it was sent. That is why a countdown can be current, a seat map can show what is still free, and an RSVP can register without opening a browser tab.

## What is AMP for Email?

AMP for Email is an open email format that lets senders embed a restricted set of interactive components inside a message. It grew out of AMP, the Google-backed framework that started on the web, and was adapted into a separate email specification with its own component list.

The mechanics are simpler than they sound. The sender adds a third MIME part to the email, labeled `text/x-amp-html`, alongside the usual plain-text and HTML versions. Your mail app picks the AMP part if it supports the format and falls back to the ordinary HTML if it does not. An AMP email is not a separate species of message. It is a normal email carrying an extra interactive layer that only some clients unwrap.

The point, from the sender's side, is engagement. You act on the message in place instead of clicking out to a website, which removes a step and keeps you on the offer. From your side, it means part of what used to be a static newsletter now behaves like a small app.

## Which email providers support interactive AMP emails?

Four mail services render AMP emails today: Gmail, Yahoo Mail, Mail.ru, and AOL, plus the third-party Android client FairEmail. That roster comes straight from the [AMP project's own support page](https://amp.dev/support/faq/email-support).

Gmail went first. Google made dynamic email generally available on July 2, 2019, according to a [Google Workspace Updates post](https://workspaceupdates.googleblog.com/2019/06/dynamic-email-in-gmail-becoming-GA.html) from that June, and turned it on by default for all domains. Yahoo Mail, Mail.ru, and AOL added rendering afterward.

Two big names sit it out. Apple Mail and Microsoft Outlook do not render AMP. When a dynamic email reaches them, they show the plain HTML fallback the sender is required to include, so nothing breaks. You simply get the static version, the same as you would in any client the sender never built an AMP part for.

There is a gate on the sending side too. A company cannot just flip AMP on. Google, Yahoo, and Mail.ru each require a sender to register and to pass email authentication before a single dynamic message will render, which is where the safety story starts.

## What can you actually do inside a dynamic email?

Dynamic emails let you finish small tasks in place, without opening a browser. The common ones:

- RSVP to an event or confirm a booking.
- Submit a form, answer a survey, or vote in a poll.
- Browse a product carousel or an image gallery.
- Adjust a setting, such as a subscription preference, from inside the message.

Google's launch examples in 2019 included RSVPing to an event, filling out a questionnaire, and browsing content in a carousel. Booking and travel companies were early adopters, because confirming a reservation in the inbox saves the round trip to a website.

The appeal to you is fewer clicks. The appeal to the sender is that you stay with the message longer and act on it sooner. Both of those are real, and both are the reason the format exists.

## Is AMP email safe?

AMP email runs in a tighter sandbox than ordinary HTML email, and the format itself is not a common malware vector. It is not a free pass either, because the trust cues that make a dynamic message feel official can be turned against you.

Google enforces a real set of rules before it will render a dynamic email, laid out in its [security requirements](https://developers.google.com/workspace/gmail/ampemail/security-requirements):

- The message must pass SPF and DKIM authentication, with the signing domain aligned to the `From` address, and Google recommends a DMARC policy set to quarantine or reject. That is the same authentication regime behind the [verified logos in BIMI](/blog/bimi-sender-logos).
- The email must be sent over TLS.
- Every network request an AMP email makes is proxied through Google and stripped of cookies. The sender's server does not see your raw IP address or your Google cookies on those calls.
- AMP forbids arbitrary JavaScript. Senders assemble a fixed set of vetted components, not free-form scripts, so a dynamic email cannot run the kind of code an open web page can.
- The sender has to register with each provider before any of this switches on.

Put together, that is a stricter cage than the open HTML most marketing email still ships in.

The catch is social rather than technical. A message that updates itself and shows working buttons feels more official, and a sender you would ignore as a plain newsletter can feel more legitimate dressed up as an app. Authentication proves the mail genuinely came from the domain it claims. As with a verified brand logo, that confirms identity, not good intent.

## What does interactive email mean for your privacy?

The privacy tradeoff with AMP email is about engagement, not identity. A static email can tell a sender you opened it, usually through a hidden tracking pixel. A dynamic email can tell the sender what you did inside it: which carousel item you viewed, whether you submitted the form, which option you picked, and when. The interaction runs against the sender's server in real time.

Google files down the sharpest edge. Because every request is proxied and cookieless, the sender does not learn your IP address or read your Google cookies from those calls, which is more than you can say for the remote images in a normal email. On the network layer, AMP is arguably tidier than the methods in [how marketers track you beyond the pixel](/blog/email-tracking-beyond-the-pixel).

What AMP adds is a richer behavioral signal. A [tracking pixel](/blog/tracking-pixels) reports one bit: opened or not. An interactive component can report a sequence of choices. If you never touch the buttons, a dynamic email is not meaningfully more revealing than a static one. If you do, you hand the sender more detail than an open alone ever carried.

## How do you turn off dynamic email?

You can switch dynamic email off and read every message as plain HTML. In Gmail on the web, open Settings, go to the General tab, find Dynamic email, and uncheck Enable dynamic email. Save at the bottom of the page. Google also lets administrators [turn dynamic email off account-wide](https://knowledge.workspace.google.com/admin/gmail/turn-dynamic-email-on-or-off-for-users).

There is a quieter lever too. If you set Gmail's images option to "Ask before displaying external images," dynamic email turns off along with it. Blocking remote images already limits tracking pixels; disabling AMP is a bonus of the same switch.

Yahoo Mail and Mail.ru carry their own settings for the same thing. Turning the feature off costs you the convenience of in-message buttons and hands back a predictable, static inbox where nothing changes after the message lands.

## The takeaway

Interactive email is a genuine shift, and a modest one for most inboxes. AMP for Email lets Gmail, Yahoo, Mail.ru, and AOL run live buttons, forms, and carousels inside a message, behind a stricter sandbox than ordinary HTML. The upside is fewer clicks. The tradeoff is that acting inside the message tells the sender more about what you did than an open ever could.

None of it changes the exit. A dynamic email that lets you "manage preferences" in place still has to carry the same List-Unsubscribe header every bulk sender does, and that one-click unsubscribe is the reliable way out, interactive or not. [Email Unsubscriber](https://app.email-unsubscriber.com) scans your Gmail or Outlook in your own browser, lists every subscription sender, dynamic or plain, and fires the real one-click unsubscribe wherever a sender supports it. The scan runs on your device, and we never read, analyze, or monetize your email content. The fewer senders left on your list, the fewer of them get to run anything at all, live or otherwise.
