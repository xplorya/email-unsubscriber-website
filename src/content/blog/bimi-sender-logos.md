---
title: "BIMI: why some senders show a logo or blue check in Gmail"
date: "2026-06-24"
excerpt: "Some Gmail senders show a round logo and a blue checkmark. Here's what BIMI and a Verified Mark Certificate actually prove, and what they don't."
author: "Email Unsubscriber Team"
categories: ["Your Inbox"]
tags: ["bimi", "verified-checkmark", "vmc", "email-authentication", "gmail", "phishing"]
cover: "/blog/covers/bimi-sender-logos.webp"
coverAlt: "Flat vector illustration of a round brand badge with a verified check-tick pinned to a cream email card, propped up by a certificate seal labeled VMC and a padlock shield, beside a plain badgeless envelope with a question-mark tag."
featured: false
draft: false
readiness: "Ready for review"
faq:
  - question: "What is BIMI?"
    answer: "BIMI, short for Brand Indicators for Message Identification, is an email standard that shows a brand's verified logo next to its messages. It is maintained by the AuthIndicators Working Group, whose members include Google and Yahoo. BIMI only works on mail that already passes SPF, DKIM, and DMARC authentication, so the logo doubles as a signal that the message genuinely came from that domain."
  - question: "Why do some emails have a logo and blue checkmark in Gmail?"
    answer: "Those senders set up BIMI and bought a certificate for their logo. BIMI displays the brand's own logo as the round avatar instead of a generic initial. When the certificate is a Verified Mark Certificate, Gmail adds a blue checkmark next to the sender's name. Google began rolling out that checkmark in May 2023. Most senders skip BIMI because it costs money and effort."
  - question: "What does the Gmail blue checkmark mean?"
    answer: "The blue checkmark means a certificate authority verified that the logo belongs to the domain that sent the message, and that the message passed authentication. In Google's words, logos used with BIMI are verified by a third party so recipients can be sure the logos are legitimate. It confirms the mail is genuinely from that brand's domain. It says nothing about the content."
  - question: "Does the blue checkmark mean an email is safe?"
    answer: "No. The checkmark verifies identity, not intent. It proves the message really came from the brand's domain and that the logo is genuine. It does not promise the offer inside is honest or that the message is safe to act on. A verified brand can still send you misleading promotions or mail you never asked for. Read the sender address and the links before you trust anything."
  - question: "What is the difference between a VMC and a CMC?"
    answer: "A Verified Mark Certificate requires the logo to be a registered trademark, and it unlocks the blue checkmark in Gmail. A Common Mark Certificate, which Gmail began supporting in September 2024, only requires the logo to have been in public use for at least twelve months, and it shows the logo without the checkmark. VMCs work across more mail apps; CMCs are Gmail-only for now."
  - question: "Does a missing logo or checkmark mean an email is fake?"
    answer: "No. Most legitimate senders never set up BIMI, because it costs money and takes a registered trademark or a year of public logo use. Small newsletters, some banks, and personal contacts all show plain colored avatars. A missing badge is normal. The reverse is the useful rule: a badge is a real signal, but its absence tells you almost nothing."
  - question: "Can scammers fake the Gmail verified checkmark?"
    answer: "Not on the real brand's domain. The checkmark rides on DMARC enforcement, so a message that forges a trusted domain fails authentication and never earns the logo or the check. What a scammer can do is use a look-alike domain that has no badge and hope you read the avatar instead of the address. The check is a real signal, not a substitute for reading the sender."
  - question: "Does the logo appear on iPhone and Yahoo too?"
    answer: "Yes, with differences. Apple Mail supports BIMI on iOS 16, iPadOS 16, macOS Ventura 13 and later, and it shows the logo in the message header after you open the email, using a Verified Mark Certificate. Yahoo shows logos in the inbox for high-reputation bulk senders. The same brand can show a logo in one app and a plain avatar in another."
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

Subject: A hero cream circular brand badge is pinned to the top of a cream email card, stamped with a simple abstract mark and wearing a small teal verified check-tick in one rounded corner. A cream certificate seal with a short ribbon and a short dark-teal "VMC" label props the badge up from below like a foundation stone, and a small padlock shield covered in squiggle-text sits at the base as the authentication footing it all stands on. A magnifying glass hovers over the check-tick, reading it. Off to one side, a plainer cream envelope wears no badge at all, a tiny question-mark tag hanging from its corner. Season the gaps with a few 4-point outline stars, small plus signs, and dot clusters. Keep the badge-and-email pairing centered in the middle 60% of the frame.
-->

Open Gmail and a handful of senders stand out. Your bank, a big retailer, a newsletter you actually read: each one shows a small round logo where everyone else gets a plain colored circle, and one or two carry a blue checkmark next to the name. It reads like a trust badge. The fair question is whether you should believe it.

> Some senders show a round logo and a blue checkmark in Gmail because they use BIMI, a standard that displays a brand's verified logo on authenticated mail. The checkmark means a certificate authority confirmed the logo belongs to that domain. It proves the message genuinely came from that brand, not that the message is safe to act on.

## Why do some senders show a logo or blue checkmark in Gmail?

Those senders turned on a standard called BIMI and paid a certificate authority to vouch for their logo. BIMI lets a company display its own brand logo as the round avatar next to its emails, in place of the generic initial Gmail draws for everyone else. When the certificate behind that logo is a Verified Mark Certificate, Gmail adds the blue checkmark on top. Google began rolling that checkmark out in May 2023, according to [Validity](https://www.validity.com/blog/gmail-introduces-new-blue-verified-checkmarks-for-bimi-senders/).

The logo and the check are earned, not bought off a shelf. A sender has to authenticate its mail and prove it owns the logo before either one appears. That is the whole point of the badge: it costs enough effort that a random spammer cannot casually fake it.

## What is BIMI?

BIMI, short for Brand Indicators for Message Identification, is an email standard that shows a brand's verified logo next to the messages it sends. Your mail app reads a small record the sender publishes, fetches the logo, and draws it as the avatar.

The standard is maintained by the AuthIndicators Working Group, also called the [BIMI Group](https://bimigroup.org/verified-mark-certificates-vmc-and-bimi/), an industry body whose members include Google and Yahoo. The working group formed in 2019 and published its first technical drafts in 2021. It matters because BIMI only rides on mail that already passes authentication. The logo is not decoration bolted onto any message. It is a marker that sits on top of the SPF, DKIM, and DMARC checks that prove a message came from the domain it claims.

## What does the blue checkmark actually prove?

The checkmark proves two narrow things: the message passed authentication, and a third party confirmed the logo belongs to that domain. In its own [BIMI setup documentation](https://knowledge.workspace.google.com/admin/security/set-up-bimi), Google puts it plainly: logos used with BIMI "are verified by a third party, so recipients can be sure logos in their inbox are legitimate."

Hover or tap the check and Gmail names the domain it verified. That is the ceiling of what the badge asserts. It confirms the mail is genuinely from that brand's own domain, and that the logo you see is the brand's real, certificate-backed logo rather than a forgery. It makes no claim about the words inside the message, the offer being pitched, or whether you should do what the email asks. The check is a statement about identity. It is silent about intent.

## What does the logo not prove about a sender you can trust?

The badge answers "who sent this," not "should I trust this." Three gaps are worth holding in mind, because the round logo is designed to feel more reassuring than it earns.

First, a verified brand can still send you junk. A real retailer with a checkmark can mail you a misleading countdown, a renewal you forgot you agreed to, or a promo you never wanted. Authentication and a trademark do not make an offer honest. The check proves the sender is who it says, and that is all.

Second, a missing logo does not mean a sender is fake. Most legitimate senders never set up BIMI, because it takes money, a registered trademark or a year of public logo use, and technical work. Your dentist, a small newsletter, and a friend all show plain avatars. Absence of a badge is the normal case, not a warning sign.

Third, the badge does nothing about a look-alike domain. A scammer who registers a domain that reads almost like a real brand will not earn that brand's checkmark, but the whole plan relies on you glancing at the avatar and skipping the address. Reading the sender's actual email address still catches more than the logo ever will. Our guide to [spotting AI phishing emails](/blog/ai-phishing-emails) walks through checking the mechanics under a polished message, and phishing that [hides behind a fake unsubscribe link](/blog/fake-unsubscribe-link-phishing) is the same trick aimed at a different button.

## How does a sender earn the logo and checkmark?

Getting a logo into Gmail takes three steps, in order.

1. **Authenticate the mail.** The domain has to pass [SPF, DKIM, and DMARC](/blog/spf-dkim-dmarc-explained), and its DMARC policy must be set to quarantine or reject rather than the passive monitoring mode. This is the same authentication regime Gmail, Yahoo, and now Outlook demand of [bulk senders across the board](/blog/microsoft-outlook-bulk-sender-rules).
2. **Get a certificate for the logo.** The sender buys either a Verified Mark Certificate or a Common Mark Certificate from an authorized certificate authority such as DigiCert. Per [DigiCert](https://www.digicert.com/tls-ssl/verified-mark-certificates), a VMC binds a legally trademarked logo to the domain after the authority verifies ownership.
3. **Publish the BIMI record.** The sender adds a small DNS record pointing to its logo file and its certificate. Once that is live, mail apps can start drawing the logo.

The certificate choice decides whether the sender gets the blue check or just the logo.

| | Verified Mark Certificate | Common Mark Certificate |
|---|---|---|
| Logo must be | A registered trademark | In public use for 12+ months |
| Blue checkmark in Gmail | Yes | No, logo only |
| Gmail support since | 2021 | September 2024 |
| Works in | Gmail, Apple Mail, Yahoo | Gmail only, for now |

Gmail began supporting the Common Mark Certificate on September 24, 2024, according to [Google Workspace Updates](https://workspaceupdates.googleblog.com/2024/09/gmail-additional-bimi-protections.html). A CMC lets a company without a registered trademark show its logo, provided the logo appears on an archived version of its website from at least a year earlier. The tradeoff: a CMC displays the logo but not the checkmark, which stays reserved for trademarked brands with a VMC.

## Does the logo appear on iPhone, Yahoo, and other apps?

Yes, but the same brand can look different from one app to the next. Apple Mail supports BIMI on iOS 16, iPadOS 16, macOS Ventura 13 and later, and on iCloud.com, using a Verified Mark Certificate. According to [Apple's support documentation](https://support.apple.com/en-us/108340), the logo shows in the message header only after you open the email, not in the inbox list. Apple also stopped accepting VMCs issued by the certificate authority Entrust after November 15, 2024, so some logos published through that authority no longer display.

Yahoo shows brand logos too, in the inbox itself, for high-reputation bulk senders, and it does not strictly require a VMC. The result is that a single sender might show a full logo in Gmail, a header logo in Apple Mail after you open the message, and a plain colored avatar somewhere else. The badge you see depends as much on your mail app as on the sender.

## Can a scammer fake the verified checkmark?

Not on the real brand's domain. The checkmark rides on DMARC enforcement, so a message that forges a trusted domain fails authentication and never earns the logo or the check. That is the defense working as designed: the impersonation that fools people, mail that looks like it came from a company you trust, is exactly what these checks stop before you see it.

What a scammer can still do is send from a different domain, one that reads almost like the real one, which carries no badge at all. They are betting you will read the friendly display name and the avatar instead of the address behind it. So the check is a real signal that a message came from the domain it claims. It is not a promise that the domain deserves your trust, and it is no substitute for reading the sender address one character at a time.

## What the logo means for cleaning up your inbox

Here is the quiet irony of the badge. The senders most likely to have a verified logo are the big retailers, platforms, and marketing operations that mail you constantly, because they are the ones with the trademark and the budget to set BIMI up. A checkmark confirms the newsletter genuinely came from them, which often makes it exactly the sender you want to leave.

Authentication is not consent. A verified sender still lands in your inbox because you are on its list, not because you asked to hear from it this week. The way out is the unsubscribe, and the logo has nothing to do with it. [Email Unsubscriber](https://app.email-unsubscriber.com) scans your Gmail or Outlook inside your own browser, lists every subscription sender, verified logo or not, and fires the genuine one-click unsubscribe wherever a sender supports it. The scan runs on your device, the access stays read-only, and we never read, analyze, or monetize your email content.

## The takeaway

The round logo and the blue check are real signals, and they are narrower than they look. BIMI shows a brand's verified logo, and a Verified Mark Certificate adds the checkmark that a certificate authority confirmed the logo belongs to that domain. Both prove the message genuinely came from the brand it claims. Neither proves the message is safe, the offer is honest, or the sender is one you should keep.

So use the badge for what it is. Treat a checkmark as confirmation of identity, not a green light. And when a verified brand turns out to be a sender you never read, the badge is just a well-authenticated reminder to unsubscribe.
