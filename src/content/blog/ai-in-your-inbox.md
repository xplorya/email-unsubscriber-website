---
title: "AI email summaries in Gmail and Apple Mail: what they do to your inbox"
date: "2026-06-11"
excerpt: "Gmail and Apple Mail now summarize your email with AI. Here's who processes it, where it can go wrong, and how to turn the summaries off."
author: "Email Unsubscriber Team"
categories: ["AI & I", "Privacy & Safety"]
tags: ["gemini", "apple-intelligence", "ai-summaries", "gmail", "apple-mail", "email-privacy"]
cover: "/blog/covers/ai-in-your-inbox.webp"
coverAlt: "Flat vector illustration of a cream email letter overlaid by a shorter summary card read by a small AI chip, flanked by a summarized thread stack, an inbox preview line being rewritten, and a toggle switch flipped off."
featured: false
draft: false
readiness: "Ready for review"
faq:
  - question: "What are AI email summaries in Gmail and Apple Mail?"
    answer: "They are short machine-written recaps of your email. Gmail, powered by Gemini 3, condenses a long thread into a few key points after you open it. Apple Mail rewrites the one-line preview in your inbox list with an AI summary before you open the message. Both features are on by default and both can be switched off."
  - question: "What is the difference between Gmail and Apple Mail AI summaries?"
    answer: "Timing and processing. Gmail summarizes a thread after you open it, on Google's servers, and leaves your inbox preview unchanged. Apple Mail rewrites the inbox preview line before you open the message, and runs mostly on your device. Gmail uses Gemini 3; Apple uses Apple Intelligence."
  - question: "Who reads my email to create the summary?"
    answer: "The provider's own systems do. To summarize a Gmail thread, Google's servers process the message content. To rewrite an Apple Mail preview, Apple Intelligence processes it, mostly on your device and sometimes on Apple's Private Cloud Compute. Google says personal Gmail content is not used to train its models."
  - question: "Can AI email summaries be wrong?"
    answer: "Yes. A summary is a guess about what matters, and the model can pick the wrong part. Reported failures include summaries built from legal disclaimers or unsubscribe lines, and previews that highlight a shipping policy instead of the actual announcement. Treat a summary as a hint, not a substitute for reading."
  - question: "How do I turn off AI summaries in Gmail?"
    answer: "Open Gmail settings, then clear the smart-features checkbox and the two Google Workspace smart-features toggles. There is no single Gemini off switch. Turning these off also disables long-standing conveniences like spellcheck, automatic categorization, and predictive text, which Google bundles into the same setting."
  - question: "How do I turn off AI summaries in Apple Mail?"
    answer: "On iPhone, open Settings, tap Apps, tap Mail, then turn off Summarize Message Previews. Your inbox goes back to showing the first lines of the message instead of an AI summary. To remove all Apple Intelligence features, open Settings, tap Apple Intelligence, and switch the whole feature off."
  - question: "Does Email Unsubscriber use AI to read my email?"
    answer: "No. Email Unsubscriber reads the unsubscribe headers that bulk senders attach to their mail, not the body of your messages. The scan runs in your browser, and we never read, analyze, or monetize your email content. It finds who to unsubscribe from without any AI summarizing what you wrote or received."
  - question: "Are AI email summaries on by default?"
    answer: "Yes. Google turned its Gemini features on by default when it rolled them out to Gmail in January 2026, so users who do not want them have to opt out. Apple Mail summaries appear automatically wherever Apple Intelligence is switched on. In both cases the summary happens unless you go into settings and stop it."
---

<!--
cover-generation-prompt

Paste the block below (Style then Subject) into your image generator. The style
portion is locked by website/.design/DESIGN.md section 14.10 — do NOT tweak it.
Only the Subject line is tailored per post.

Flat vector editorial illustration in one strict house style. Match the attached reference cover exactly if one is provided.

HARD RULE — obey above all else: ABSOLUTELY FLAT. No shadows of any kind — no drop shadow, no soft ambient shadow beneath objects, no inner shadow, no glow, no gradient, no soft background blobs behind the cluster. Every fill is one solid flat color; all objects float on one flat solid teal canvas.

Text: legible words are allowed where they meaningfully label an object (e.g. the word on an unsubscribe button). Keep any text short, correctly spelled, and drawn in dark teal on a cream or teal label. Where a word is not needed, default to 3–5 wavy squiggle lines or solid bars instead — do not fill every surface with text.

Technique: hand-drawn feel with a subtle organic line wobble; bold uniform outline on every shape — same chunky-marker thickness everywhere, inner details included; 2D frontal orthographic; objects float on a flat plane — no ground line, no perspective, no 3D.

Palette — only these five colors, nothing else: background solid pale mint teal #99f6e4 (full bleed, one flat fill — this lock matters most); outlines deep pine teal #115e59 (every contour and every decorative mark); primary fill bright teal #2dd4bf; secondary fill deep teal #0d9488; cream #faf6ed ONLY for paper / screen / label surfaces (the sole non-teal color). No other hues. No gradients, texture, grain, or noise.

Composition: 5–12 simplified friendly objects, rounded chunky proportions, clustered asymmetrically at varied scale — one or two hero objects plus medium and small ones. Objects overlap each other and bleed slightly off the frame edges. Keep the hero inside the middle 60% of the frame (sides get cropped by card ratios). Leave breathing room; season gaps with 5–8 small fillers — 4-point outline stars, tiny solid dots, short parallel sparkle strokes, small outline circles, small plus signs — all in the outline teal.

Objects: no human faces or people. No brand-accurate logos or devices — a laptop is three rounded rectangles, not a real MacBook. Avoid stock clip-art clichés (spy hats, incognito sunglasses, generic lightbulbs) unless the Subject names them.

Canvas: 1200×630, full bleed, no border, no framing, no logo, no watermark, no caption.

Forbidden: logos, watermark, caption, misspelled or garbled words, gradients, drop shadows, soft/ambient shadows, inner shadows, glows, soft background blobs behind the cluster, 3D, perspective, isometric, depth of field, photorealism, pixel art, low-poly, anime, watercolor, painterly, brush texture, grain, noise, emoji, stock clip-art, human faces, colors outside the teal + cream palette.

Subject: A large cream email letter as the hero, with a smaller cream summary card clipped over its middle so a long message collapses into a few short teal bars. A small friendly AI chip with a single reading-lens eye hovers just above the card, quietly condensing the letter. To the left, a stack of two or three overlapping mail rectangles stands for a conversation summarized after it is opened; to the right, a single inbox list-row whose preview line is being rewritten into shorter bars stands for a preview replaced before it is opened. Include a small toggle switch flipped to a cream OFF label as a clear secondary object, and a small cloud-server shape to hint at where the reading happens. Arrange asymmetrically with the letter-and-summary-card pairing dominant and the OFF toggle as a strong secondary; scatter a few small stars, dots, and plus signs in the negative space. Keep the hero cluster inside the middle 60% of the frame.
-->

You open a Gmail thread with thirty replies and, before you read a word, a few tidy bullet points sit at the top telling you what it all supposedly means. You glance at your iPhone and the preview line under each sender is no longer the sender's first sentence, but a machine's paraphrase of it. There is a new layer between you and your mail now, and most people were opted into it without asking.

> Gmail and Apple Mail now generate AI summaries of your email. Gmail summarizes a thread after you open it, powered by Gemini 3 and processed on Google's servers. Apple Mail rewrites the inbox preview before you open, processed mostly on your device. Both are on by default, and both can be turned off in settings.

## What are AI email summaries in Gmail and Apple Mail?

An AI email summary is a short machine-written recap of a message or thread, generated by the mail provider and shown in place of, or on top of, the original text. The model reads the content and writes a condensed version it thinks captures the point.

Two of the biggest providers now do this by default. On January 8, 2026, Google announced that Gmail was [entering what it called "the Gemini era,"](https://blog.google/products-and-platforms/products/gmail/gmail-is-entering-the-gemini-era/) powered by its Gemini 3 model. Open a long conversation and, in Google's words, "Gmail synthesizes the entire conversation into a concise summary of key points." Apple got there first. It added Mail summaries with Apple Intelligence in iOS 18.1 and macOS Sequoia in October 2024, on recent iPhones and Apple-silicon Macs and iPads.

The reason this matters is not the feature itself. It is that the summary is now the first thing you read, and a summary is always someone else's decision about what was important.

## What is the difference between Gmail's and Apple Mail's summaries?

The core difference is timing: Gmail summarizes after you open a thread, and Apple Mail summarizes before you open a message. That single split changes how much the AI shapes what you actually decide to read.

| Criterion | Gmail (Gemini 3) | Apple Mail (Apple Intelligence) |
|---|---|---|
| When you see the summary | After you open a thread (post-open) | In the inbox list, before you open (pre-open) |
| What it changes | Adds a summary at the top of the thread | Rewrites the one-line preview under the sender |
| Where it runs | Google's servers | Mostly on your device, escalating to Apple's Private Cloud Compute |
| Cost | Thread summaries free; "ask your inbox" and the AI Inbox briefing need a paid Google AI Pro or Ultra plan | Free with a supported device |
| On by default | Yes | Yes |
| How to turn it off | Clear the Gmail smart-features settings | Turn off Summarize Message Previews |

According to the email platform [Stripo (2026)](https://stripo.email/blog/ai-summaries-in-email-clients-what-gmail-and-apple-mail-changes-mean-for-marketers/), Gmail's version "does not affect what recipients see in the inbox preview," while Apple's summaries "appear directly in the inbox, replacing the preheader." The bottom line: Apple's summary decides whether you open the mail at all, so it carries more weight over your attention than Gmail's, which only kicks in once you are already reading.

## Who reads your email to make these summaries?

The provider's own systems read it. There is no way to summarize a message without processing its contents, and each company does that processing in a different place.

For Gmail, the work happens on Google's servers. Your message content is sent to Google's systems, Gemini 3 generates the summary, and the result comes back to your screen. Google states that personal Gmail content is not used to train its models, which is a real and meaningful limit. It is not the same as the content never being read; producing the summary requires reading it.

For Apple Mail, Apple designed Apple Intelligence to run on your device where it can, and to send heavier requests to its Private Cloud Compute servers, which Apple says keep the data unreadable to Apple itself. In practice that means more of the summarizing stays local than with Gmail. In both cases, the important thing to understand is simple: an automated system is now reading your mail to describe it back to you.

## Can AI email summaries get your email wrong?

Yes, and this is the part that gets least attention. A summary is a prediction about what matters in a message, and the model can pick the wrong thing.

Stripo notes that both systems can misinterpret content, with summaries "generated from legal disclaimers or unsubscribe lines" or "highlighting shipping policies instead of product announcements." A pre-open summary that leans on the wrong sentence can make an urgent email look like junk, or dress up a promo as something personal. Because Apple's version replaces the preview you use to triage, a bad summary there can cost you the mail entirely. The safe habit is to treat a summary as a hint about a message, never as a replacement for reading the one that matters.

This is also why a summary layer does nothing for the underlying problem. If forty newsletters land in your inbox every morning, AI now writes you forty little recaps of mail you never wanted. The volume is unchanged. The only thing that shrinks the pile is [removing the senders](/blog/why-we-never-store-your-emails), not paraphrasing them.

## How do I turn off AI summaries in Gmail?

You turn off Gmail's smart features, which is the setting Gemini's summaries are bundled into. Google did not ship a single "Gemini off" switch, so this is the lever you have.

1. **Open your Gmail settings.** On the web, click the gear icon, then "See all settings," and find the smart-features controls.
2. **Clear the smart-features checkbox.** This is the top-level toggle that governs Gemini-powered features in Gmail.
3. **Turn off both Google Workspace smart-features toggles.** [Proton (2026)](https://proton.me/blog/turn-off-gemini-gmail) documents two: "Smart features in Google Workspace" and "Smart features in other Google products." Clear both.

One catch worth knowing before you flip it: Google groups long-standing conveniences into the same setting. Proton notes that turning it off also disables things like spellcheck, and Google's own help text warns it affects automatic categorization and predictive text. The end state is a quieter, AI-free inbox that also loses a few features you may have relied on for years.

## How do I turn off AI summaries in Apple Mail?

You switch off one setting called Summarize Message Previews, and your inbox goes back to plain preview text.

1. **Open Settings on your iPhone.** The gray gear app.
2. **Tap Apps, then tap Mail.** This is where Apple keeps the Mail-specific Apple Intelligence controls.
3. **Turn off Summarize Message Previews.** Your inbox list will show the first lines of each message again instead of an AI-written summary.

If you would rather remove every Apple Intelligence feature at once, open Settings, tap Apple Intelligence, and switch the whole feature off. That clears summaries across Mail, Messages, and notifications in one move.

## Does Email Unsubscriber use AI to read my mail?

No. Email Unsubscriber reads the unsubscribe headers that bulk senders attach to their mail, not the words inside your messages. There is no model summarizing your inbox, because summarizing your inbox is not the job. Finding who to unsubscribe from is.

That distinction is the whole design. When you [run a scan](https://app.email-unsubscriber.com), the work happens in your browser, the app looks at the `List-Unsubscribe` header each sender includes, and it builds a list of who to opt out from. We never read, analyze, or monetize your email content. If you want the full architecture, our post on [why your email never leaves your device](/blog/why-we-never-store-your-emails) walks through it, and the [security page](/security) documents the read-only access and the open-source auth worker behind it.

The AI layer in your inbox is here to stay, and used with a light hand it is genuinely useful for skimming a busy thread. It is worth knowing what it is: an automated reader sitting between you and your mail, on by default, occasionally wrong, and easy to switch off. If you are curious about the other side of this shift, where the emails you receive are increasingly [written by AI too](/blog/is-ai-writing-your-emails), that is the companion piece to this one.
