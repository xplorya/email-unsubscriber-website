---
title: "Global Privacy Control: the browser setting that opts you out automatically"
date: "2026-06-22"
excerpt: "Global Privacy Control is a browser signal that tells every site not to sell your data. Here's what it does, which browsers send it, and how to switch it on."
author: "Email Unsubscriber Team"
categories: ["Your Rights"]
tags: ["global-privacy-control", "gpc", "ccpa", "universal-opt-out", "data-privacy"]
cover: "/blog/covers/global-privacy-control.webp"
coverAlt: "Flat vector illustration of a browser window with a flipped toggle broadcasting an opt-out signal to several website cards, beside a check shield, a folded state map, and a GPC tag."
featured: false
draft: false
readiness: "Ready for review"
faq:
  - question: "What is Global Privacy Control?"
    answer: "Global Privacy Control (GPC) is a browser setting that automatically tells every website you visit not to sell or share your personal data. You switch it on once, and the browser repeats the request on every site, with no pop-up and no per-site toggle. Brave, DuckDuckGo, and Firefox can send it built in, and California law recognizes it as a valid opt-out."
  - question: "Which browsers support Global Privacy Control?"
    answer: "Brave and the DuckDuckGo browser send GPC by default. Firefox includes it but leaves it off until you flip one toggle in settings. Chrome, Microsoft Edge, and Safari have no native GPC as of 2026, so they need an extension such as Privacy Badger or OptMeowt. A California law will require every browser to include the signal from January 1, 2027."
  - question: "How do I turn on Global Privacy Control?"
    answer: "In Brave and DuckDuckGo it is already on. In Firefox, open Settings, go to Privacy and Security, find Website Privacy Preferences, and tick Tell websites not to sell or share my data. In Chrome, Edge, or Safari, install a GPC extension like the EFF's Privacy Badger. Once on, your browser attaches the signal to every request."
  - question: "Is Global Privacy Control legally binding?"
    answer: "In part. As of January 1, 2026, twelve US states require businesses to honor universal opt-out signals, and California, Colorado, and Connecticut have confirmed GPC counts as one. In those states, ignoring your GPC signal breaks the law. Outside them, honoring GPC is voluntary. California fined Sephora $1.2 million in 2022 partly for not processing GPC opt-outs."
  - question: "Does Global Privacy Control unsubscribe me from emails?"
    answer: "No. GPC is a web signal that tells websites not to sell or share your data. It does nothing to your inbox. It cannot remove you from a mailing list, stop a newsletter, or cancel a subscription. To end unwanted email you still have to unsubscribe from each sender. GPC and email unsubscribing solve two different problems."
  - question: "Does Chrome support Global Privacy Control?"
    answer: "Not natively, as of 2026. Google Chrome has no built-in GPC toggle, so you enable the signal with an extension such as the EFF's Privacy Badger, OptMeowt, or DuckDuckGo's add-on. That changes on January 1, 2027, when California's Opt Me Out Act requires every browser offered to state residents, including Chrome, to include the opt-out signal."
  - question: "What is the difference between Global Privacy Control and Do Not Track?"
    answer: "Do Not Track, launched around 2009, was a voluntary request that most sites ignored, and the W3C eventually stopped work on it. GPC carries the same idea but with legal backing: several state privacy laws treat a GPC signal as a binding opt-out request. Do Not Track was a polite ask. GPC is an enforceable one in the states that recognize it."
  - question: "What does the Sec-GPC header do?"
    answer: "When Global Privacy Control is on, your browser adds the header Sec-GPC with a value of 1 to every request it sends. The 1 means the person opts out of the sale or sharing of their personal data. Sites can also read the same preference in JavaScript through the navigator.globalPrivacyControl property, which returns true when the signal is active."
---

<!--
cover-generation-prompt

Paste the block below (Style, then Subject) into your image generator. The style
portion is copied verbatim from website/.design/DESIGN.md §14.10 — do NOT tweak it.
Only the Subject line is tailored per post. Keep the Subject to a few sentences and
do not re-describe the style.

Flat vector editorial illustration in one strict house style. Match the attached reference cover exactly if one is provided.

HARD RULE — obey above all else: ABSOLUTELY FLAT. No shadows of any kind — no drop shadow, no soft ambient shadow beneath objects, no inner shadow, no glow, no gradient, no soft background blobs behind the cluster. Every fill is one solid flat color; all objects float on one flat solid teal canvas.

Text: legible words are allowed where they meaningfully label an object (e.g. the word on an unsubscribe button). Keep any text short, correctly spelled, and drawn in dark teal on a cream or teal label. Where a word is not needed, default to 3–5 wavy squiggle lines or solid bars instead — do not fill every surface with text.

Technique: hand-drawn feel with a subtle organic line wobble; bold uniform outline on every shape — same chunky-marker thickness everywhere, inner details included; 2D frontal orthographic; objects float on a flat plane — no ground line, no perspective, no 3D.

Palette — only these five colors, nothing else: background solid pale mint teal #99f6e4 (full bleed, one flat fill — this lock matters most); outlines deep pine teal #115e59 (every contour and every decorative mark); primary fill bright teal #2dd4bf; secondary fill deep teal #0d9488; cream #faf6ed ONLY for paper / screen / label surfaces (the sole non-teal color). No other hues. No gradients, texture, grain, or noise.

Composition: 5–12 simplified friendly objects, rounded chunky proportions, clustered asymmetrically at varied scale — one or two hero objects plus medium and small ones. Objects overlap each other and bleed slightly off the frame edges. Keep the hero inside the middle 60% of the frame (sides get cropped by card ratios). Leave breathing room; season gaps with 5–8 small fillers — 4-point outline stars, tiny solid dots, short parallel sparkle strokes, small outline circles, small plus signs — all in the outline teal.

Objects: no human faces or people. No brand-accurate logos or devices — a laptop is three rounded rectangles, not a real MacBook. Avoid stock clip-art clichés (spy hats, incognito sunglasses, generic lightbulbs) unless the Subject names them.

Canvas: 1200×630, full bleed, no border, no framing, no logo, no watermark, no caption.

Forbidden: logos, watermark, caption, misspelled or garbled words, gradients, drop shadows, soft/ambient shadows, inner shadows, glows, soft background blobs behind the cluster, 3D, perspective, isometric, depth of field, photorealism, pixel art, low-poly, anime, watercolor, painterly, brush texture, grain, noise, emoji, stock clip-art, human faces, colors outside the teal + cream palette.

Subject: A large cream browser window as the hero object with a chunky teal toggle switch flipped ON inside its address bar, broadcasting a signal shown as three concentric outline arcs. The arcs fan out toward three small cream website cards, one of them stamped with a short dark-teal OPT-OUT label and a tiny check. A small cream shield bearing a check sits beside the browser, a folded cream state-map card with a simple legal seal anchors one lower corner, and a small cream tag reads GPC. Arrange asymmetrically with the browser and its broadcast arcs dominant in the middle 60% of the frame; scatter small teal stars, dots, and plus signs through the negative space. Only real words in the image: OPT-OUT on one website card and GPC on the tag; every other surface is squiggles or bars.
-->

You reject the cookie banner on one site, tick "Do Not Sell My Personal Information" on the next, then run the same routine on the one after that. Global Privacy Control folds that whole chore into one browser setting you switch on a single time.

> Global Privacy Control (GPC) is a browser setting that automatically tells every website you visit not to sell or share your personal data. Brave and DuckDuckGo send it by default; Firefox has a toggle; Chrome needs an extension. As of 2026, twelve US states legally require businesses to honor it.

## What is Global Privacy Control?

Global Privacy Control is a signal your browser sends to tell every website you load not to sell or share your personal data. You set it once, and the browser repeats the request on every site you visit after that, with no pop-up and no per-site toggle to hunt for.

A coalition of privacy companies and groups, including Brave, DuckDuckGo, Mozilla, Abine, and the Electronic Frontier Foundation, published the first version in 2020. The specification advanced to [W3C standardization in November 2024](https://globalprivacycontrol.org/), and California's privacy law now names GPC as a valid way to exercise your opt-out rights.

The value is leverage. One setting stands in for the thousands of individual opt-out clicks you would start and never finish. Instead of arguing with each cookie wall, you state your preference at the browser and let the browser make the case on every page.

## How does the Global Privacy Control signal work?

Your browser attaches a short header to every request it sends. When GPC is on, each page load carries the HTTP header `Sec-GPC: 1`. The `1` means one thing: this person opts out of the sale or sharing of their data.

A site can read the same preference from JavaScript through the `navigator.globalPrivacyControl` property, which returns `true` when the signal is active, [as Mozilla's developer docs describe](https://developer.mozilla.org/en-US/blog/global-privacy-control/). Sites that honor the signal often publish a small file at `/.well-known/gpc.json` declaring that they respect it.

You never see any of this. The header rides along on the first byte of every request, before a cookie banner even finishes rendering. The website receives your opt-out at the same moment it receives your visit.

## Which browsers support Global Privacy Control?

Three browsers send GPC without an add-on; the rest need an extension until 2027. Here is where each one stands as of 2026.

| Browser | GPC support | What you do |
|---|---|---|
| Brave | Built in, on by default | Nothing; confirm it in Settings |
| DuckDuckGo (browser + extensions) | Built in, on by default | Nothing |
| Firefox | Built in, off by default | Flip one toggle in Settings |
| Google Chrome | None natively | Install an extension |
| Microsoft Edge | None natively | Install an extension |
| Safari | None natively | Install an extension |

Bottom line: if you already run Brave or DuckDuckGo, you are covered without lifting a finger. Firefox users need one click. Chrome, Edge, and Safari users need an extension for now, though that gap closes in 2027 when a new California law forces every browser to include the signal.

## How do I turn on Global Privacy Control?

Switching GPC on takes seconds, and the steps depend only on which browser you use.

1. **Brave.** It is already on. To confirm, open Settings, go to Privacy and security, and check that Global Privacy Control is enabled.
2. **DuckDuckGo.** It is on by default in the DuckDuckGo browser and its extensions. There is nothing to change.
3. **Firefox.** Open Settings, choose Privacy and Security, scroll to the Website Privacy Preferences section, and tick "Tell websites not to sell or share my data."
4. **Chrome, Edge, or Safari.** Install a GPC extension. The EFF's Privacy Badger, OptMeowt, and DuckDuckGo's add-on all send the signal. Add one, and your browser starts opting you out.

Once GPC is active, your browser attaches `Sec-GPC: 1` to every request without another prompt. In the states that recognize it, that single flag now carries the weight of a formal opt-out request.

## Is Global Privacy Control legally binding?

In a dozen US states, yes. A business that ignores your GPC signal in those states breaks the law. As of January 1, 2026, [twelve states require businesses to honor universal opt-out signals](https://www.didomi.io/blog/global-privacy-control-gpc-2026): California, Colorado, Connecticut, Delaware, Maryland, Minnesota, Montana, Nebraska, New Hampshire, New Jersey, Oregon, and Texas. California, Colorado, and Connecticut have explicitly confirmed that GPC qualifies.

Enforcement is not theoretical. In 2022, California's Attorney General reached a [$1.2 million settlement with Sephora](https://oag.ca.gov/news/press-releases/attorney-general-bonta-announces-settlement-sephora-part-ongoing-enforcement), the state's first public CCPA enforcement, partly because the retailer failed to process opt-outs sent through user-enabled global privacy controls. The settlement forced Sephora to start honoring GPC going forward.

The signal is about to get harder to ignore. California's Opt Me Out Act, signed in October 2025, [requires every browser offered to state residents to include the opt-out signal from January 1, 2027](https://www.mcdonaldhopkins.com/insights/news/California-enacts-first-in-the-nation-browser-opt-out-requirements), the first browser mandate of its kind. For the wider wave of 2026 privacy rules, see [the new privacy laws taking effect this year](/blog/new-privacy-laws-2026).

*This is a plain-language explainer, not legal advice. If a business ignores your opt-out and you want to act on it, check your state regulator or a lawyer in your jurisdiction.*

## How is GPC different from Do Not Track?

GPC is enforceable; Do Not Track never was. Do Not Track, which browsers rolled out around 2009, was a voluntary request that a site could read and then ignore with no consequence. Most sites ignored it, the industry never agreed on what honoring it meant, and the W3C eventually stopped work on the standard.

GPC carries the same idea with a spine. Several state privacy laws treat a GPC signal as a binding opt-out request, so a business subject to those laws cannot legally shrug it off. The difference is not the technology, which is nearly as simple as Do Not Track was. The difference is that a regulator can now fine a company for disregarding it.

## Does Global Privacy Control unsubscribe me from emails?

No. GPC governs what websites do with your data, not what lands in your inbox. It cannot remove you from a mailing list, silence a newsletter, or cancel a subscription. It tells sites not to sell or share your personal information, which targets the data-broker economy this blog mapped in [how marketers track you beyond the pixel](/blog/email-tracking-beyond-the-pixel), not the senders crowding your mail.

Email opt-out runs on a separate track with its own rules, which vary by where you live. Those are the CAN-SPAM and GDPR-style regimes covered in [unsubscribe laws by country](/blog/unsubscribe-laws-by-country). GPC and email unsubscribing solve two different problems, and turning one on does nothing for the other.

To clear the email flood you still have to leave each list. [Email Unsubscriber](https://app.email-unsubscriber.com) scans your Gmail or Outlook in your own browser, lists every sender still mailing you, and fires the real one-click opt-out where the sender supports it. The scan runs on your device, and we never read, analyze, or monetize your email content. It is a [one-off payment](/#pricing), with nothing to cancel. Switch on GPC for the web, and clear your inbox separately. Together they cover both halves of the same instinct: keep your data yours.
