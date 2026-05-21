---
title: "Spy pixels: the invisible trackers in more than half of your emails"
date: "2026-05-20"
excerpt: "Open a marketing email and a hidden 1×1 pixel often reports your open time, location, and device back to the sender. Here's how to block it."
author: "Email Unsubscriber Team"
categories: ["Privacy", "How-to"]
tags: ["tracking-pixels", "email-tracking", "mail-privacy-protection", "cnil", "email-security"]
cover: "/blog/covers/tracking-pixels.webp"
coverAlt: "Flat vector illustration of an open envelope under a magnifying glass revealing a tiny 1×1 square, ringed by a peeping eye, a location pin, a clock, a smartphone, and a cracked shield."
featured: false
draft: false
readiness: "Awaiting cover image"
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

Subject: A large editorial cream-paper email letter as the hero object in the center, with a magnifying glass passing over its bottom corner and enlarging a single tiny solid square that would otherwise be invisible (the tracking pixel), with a small simplified open eye set inside that enlarged square so the pixel reads as quietly watching. Surround them with smaller floating objects that telegraph what the pixel reports back the moment the letter is opened: a tiny location-pin, a small clock face, and a smartphone outline, plus a cream shield with a single crack across it standing in for protection that only half-holds. A couple of small cream tags carry short abstract squiggle lines instead of words. Arrange asymmetrically with the letter-and-magnifier pairing dominant and the cracked shield as a clear secondary element; scatter small decorative stars and dots in the negative space. Keep the hero cluster centered in the middle 60% of the frame.
-->

Most marketing emails report back the moment you open them. The mechanism is a single transparent pixel, and it has been hiding in plain sight for two decades.

## What a tracking pixel is, and what it sees

A 1×1 transparent image embedded in the HTML of an email that is meant to be invisible for you. When you open the email and your mail client renders the message, it fetches that image from the sender's servers, and the fetch itself is the tracking event. Your mail client thinks it's fetching an image to show as part of the email content, but in fact it is unknowingly sending a bunch of your metadata to the email sender:
- a timestamp, set when you open it and reset every time you reopen it;
- your IP address, which resolves to city-level location;
- your user-agent: device, operating system, and mail client;
- a token unique to you, baked into the pixel's URL, so the sender knows *which* recipient opened.

That last part is what turns an anonymous image into surveillance.

<details class="curious-fact">
<summary>Nerdy details: How to spot a tracking pixel?</summary>

You can see the original, raw HTML of a message in most mail clients. Look for <img> tags that are styled to be invisible – no borders, no decorations, zero width or height, etc. Here's an example of a real tracking pixel extracted from a real message (domain and keys obfuscated):

```html
<img src="https://link.news.example.com/wf/open?upn=3Du001.Mpz....kfW2" alt=""
     width="1" height="1" border="0"
     style="height:1px !important;width:1px !important; border-width:0 !important;margin: 0 !important;padding: 0 !important;"/>
```

Notice the `width` and `height` part - these mean that the size is 1x1 - a single pixel, hence the name.
The `upn=` value is the unique token that enables the sender to associate your mailbox address to the data that the pixel sends.

</details>


 Every major email platform uses tracking pixels: Mailchimp, Klaviyo, HubSpot, sales-outreach tools like Mailtrack and Yesware, most newsletters, and most news organizations. In 2021 the email service Hey reviewed inbound mail to its users' personal accounts for the BBC and found spy pixels in two-thirds of it, after setting spam aside ([BBC, February 2021](https://www.bbc.com/news/technology-56071437)). Pixels are the rule, not the exception.

## Why "Apple fixed it" is only half true

Apple announced Mail Privacy Protection at WWDC in June 2021 and shipped it that September with iOS 15 and macOS Monterey. When it is on, Apple Mail pre-fetches every remote image through Apple's proxy servers before you open the message, [masking your IP address and the open timestamp](https://support.apple.com/guide/iphone/use-mail-privacy-protection-iphf084865c7/ios). The pixel still fires, but the data it returns is noise. That is real protection.

The catch is in the scope. Mail Privacy Protection is a feature of the Apple Mail app, not of your iPhone. Read the same message in the Gmail app, Outlook, Spark, or Edison on the same device and you are tracked normally, because each app handles images its own way.

Gmail has its own twist. It has routed remote images through Google's proxy servers since 2013, which hides your IP from the sender. But the open event still fires the first time the proxy fetches the pixel, and the timing is close enough for marketers to act on.

No mainstream client gives you total pixel privacy out of the box; you have to turn it on yourself.

## How to actually block them

Ranked, most reliable first.

1. **Block remote images in your mail client.** The most dependable fix, and the bluntest: it breaks legitimate images too. Gmail (web): Settings → General → Images → *Ask before displaying external images*. Apple Mail (iOS): Settings → Apps → Mail → turn off *Load Remote Images*. Outlook (desktop): Trust Center → Automatic Download → keep *Don't download pictures automatically* checked. [Thunderbird](https://support.mozilla.org/en-US/kb/remote-content-in-messages) blocks remote content by default; leave that setting alone.
2. **Move to a privacy-first email service.** [Proton Mail](https://proton.me/support/email-tracker-protection) and [Tuta](https://tuta.com/security) strip trackers and hold back remote images by default, with no setup.
3. **Use a client that filters pixels.** [Hey](https://www.hey.com/features/spy-pixel-blocker/) strips spy pixels from every message and names the sender that planted one.
4. **Add a webmail extension.** [Trocker](https://chromewebstore.google.com/detail/trocker/bjojfeillmmoeadgobbcknkgdkngbcdb) flags and blocks pixels inside Gmail, Outlook, and Yahoo. Extensions in this category come and go and break with browser updates, so confirm one is still maintained before you depend on it.
5. **Read in plain text.** Plain text strips every image and style. The formatting suffers, and nothing slips through.

Regulators are starting to treat pixels like cookies. France's data authority, the CNIL, adopted a recommendation (*Délibération n° 2026-042* of 12 March 2026, [published 14 April 2026](https://www.cnil.fr/fr/recommandation-pixel-suivi-courriels)) that makes prior consent the general rule for tracking pixels, with narrow exceptions for transactional and deliverability purposes. A separate post will cover what that means in practice.

## The takeaway

Every marketing email you open is a small data leak unless you closed it yourself. The pixel never asks for permission. Rendering the message is consent enough, as far as the sender is concerned.

Blocking pixels in one client only protects you in that client. Open the same inbox on your phone, or in another app, and the pings resume. The one fix that follows you everywhere is removing the sender. Unsubscribing stops the pixels at the source, on every device, for good. That is the same reasoning behind [the rules for safely unsubscribing](/blog/is-it-safe-to-click-unsubscribe), and it is why we built our tool to opt you out for real instead of hiding the mail behind a filter. Fewer senders mean fewer tracking pixels on every device you own.
