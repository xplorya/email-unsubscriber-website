---
title: "How to block an email sender in Gmail, Outlook, and Apple Mail"
date: "2026-06-18"
excerpt: "Block a sender in Gmail, Outlook, or Apple Mail in a few taps — and see how blocking differs from unsubscribing and marking as spam, plus what it can't do."
author: "Email Unsubscriber Team"
categories: ["Guides"]
tags: ["block-sender", "gmail", "outlook", "apple-mail", "spam", "inbox-cleanup"]
cover: "/blog/covers/how-to-block-email-sender.webp"
coverAlt: "Flat vector illustration of a cream mailbox behind a lowered Block barrier arm that reroutes envelopes into Spam, Junk, and Trash bins while one slips past through a gap."
featured: false
draft: false
readiness: "Ready for review"
faq:
  - question: "How do I block an email address?"
    answer: "Open a message from the sender and choose Block. In Gmail, click the three-dot More menu at the top right and pick Block sender; future mail goes to Spam. In Outlook, use More options then Block, and it lands in Junk. In Apple Mail on iPhone, tap the sender's name and choose Block this Contact. Each one sets a rule on your own account."
  - question: "What happens when you block a sender in Gmail?"
    answer: "Their future messages skip your inbox and go straight to Spam. Google's Gmail Help states that after you block a sender, all future emails from them go to Spam, where Gmail deletes them after 30 days. The sender is not told. To remove their mail entirely instead of routing it to Spam, create a filter set to Delete it."
  - question: "Does blocking an email address unsubscribe you?"
    answer: "No. Blocking is a rule on your own account that reroutes a sender's mail to Spam, Junk, or Trash. It never tells the sender anything and never removes you from their list, so you stay subscribed and they keep sending. To actually leave a legitimate list, use unsubscribe. Blocking only changes where the mail lands on your side."
  - question: "What is the difference between blocking and unsubscribing?"
    answer: "Unsubscribing is a request you send to the sender asking to be removed from their list, and a legitimate company must honor it within 10 business days under CAN-SPAM. Blocking is a rule you set on your own account that filters that sender's mail regardless of whether they cooperate. Unsubscribe leaves the list; block just hides what still arrives."
  - question: "Can a blocked sender still email you?"
    answer: "Yes. A block usually targets one exact address, so the same sender can reach you again from a new address or a different domain. Blocking also does not stop them collecting, selling, or reselling your address. It changes where mail from the blocked address lands, not whether the sender can find another way in."
  - question: "Does a sender know when you block them?"
    answer: "No. Gmail, Outlook, and Apple Mail all block silently. The sender is not notified and their mail is not bounced back; it simply gets rerouted to Spam, Junk, or Trash on your side. Their server still accepts the message as delivered. Blocking protects your inbox without alerting the person or company you blocked."
  - question: "Why do blocked emails still show up in my iPhone inbox?"
    answer: "Because Apple Mail's default blocked-sender setting is Mark as Blocked, Leave in Inbox, which keeps the message in your inbox with a banner and just mutes its notification. To get blocked mail out of sight, open Settings, tap Mail, then Blocked Sender Options, and switch it to Move to Trash. The change applies to every sender you block."
  - question: "Should I block a sender or mark them as spam?"
    answer: "Mark as spam when the sender is unknown or suspicious, since it trains your filter to catch similar mail. Block when you know exactly which address you never want to hear from again, especially one that ignores your unsubscribe. Blocking targets one sender; marking as spam teaches your provider a broader pattern. They solve different problems."
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

Subject: A chunky cream mailbox stands at center behind a lowered teal barrier arm carrying a bold cream "BLOCK" label, turning one incoming envelope away and rerouting it down a short pipe into a small bin. Three little cream envelopes queue at the barrier, each stamped with a different destination tag — "Spam", "Junk", "Trash". Off to one side a second cream envelope, carrying a different little return-address card, slips past the barrier through a narrow gap, standing for a sender switching to a new address. Add a small key-shaped rule tag near the barrier hinge, and season the gaps with a few 4-point outline stars, tiny dots, and small plus signs.

-->


A sender keeps landing in your inbox. Maybe there was never an unsubscribe link, maybe you clicked one and nothing changed, or maybe you just want this one address gone for good. Blocking is the tool for that, and it works a little differently in every email app.

> Open a message from the sender and choose Block. In Gmail, use the three-dot More menu; blocked mail goes to Spam. In Outlook, pick More options then Block, and it lands in Junk. In Apple Mail, tap the sender and choose Block this Contact. Blocking is a rule on your own account, not a request to the sender.

## How is blocking different from unsubscribing and marking as spam?

Blocking is a rule you set on your own account, unsubscribing is a request you send to the sender, and marking as spam trains your provider's filter. All three make an unwanted email go away, but they point in different directions and produce different results.

Blocking never leaves your side. Your email provider watches for that address and reroutes its future mail to Spam, Junk, or Trash, whether or not the sender ever agrees to anything. Unsubscribing does the opposite: it reaches out to the sender and asks to be removed from a list, which works only if the sender is legitimate and honors it. Marking as spam sits between the two, feeding your provider's filter so it learns to catch similar mail on its own.

| Criterion | Unsubscribe | Mark as spam | Block |
|---|---|---|---|
| Who gets the signal | The sender | Your provider's filter | Your account, as a rule |
| Removes you from the list | Yes, if the sender is legitimate | No | No |
| Needs the sender to cooperate | Yes | No | No |
| Where future mail goes | Nowhere, you left the list | Spam, for similar mail | Spam, Junk, or Trash |
| Stops a sender who ignores you | No | Partly | Yes, on your side |
| Best used for | Real senders you recognize | Unknown or suspicious mail | One address you never want again |

The short version: unsubscribe asks a company to stop, marking as spam teaches your filter a pattern, and blocking slams the door on one specific address. For a full walkthrough of which button to reach for on any given email, see our guide to [unsubscribe versus mark as spam](/blog/unsubscribe-vs-mark-as-spam).

## How do I block a sender in Gmail?

Gmail blocks a sender from inside any of their messages, and their future mail goes to Spam.

1. **Open a message** from the sender you want to block.
2. **Click the three-dot More menu** at the top right of the message, next to the reply arrow.
3. **Select Block "[sender]".** Gmail confirms, and the block takes effect immediately.

On the Gmail app for iPhone or Android, open the message, tap the three-dot menu in the top-right corner, and choose the same Block option. According to [Google's Gmail Help](https://support.google.com/mail/answer/8151), after you block a sender all future emails from them go to Spam, where Gmail deletes them automatically after 30 days. The sender is never told.

Blocking still lets the mail into your Spam folder rather than deleting it on arrival. If you want a sender's messages gone entirely, build a filter instead: click the sliders icon in the search bar, enter the address in the From field, click Create filter, tick **Delete it**, and confirm. Future mail from that address then skips both your inbox and Spam. If your real goal is to clear years of newsletters rather than block one address, our guide to [mass unsubscribing in Gmail](/blog/mass-unsubscribe-gmail) covers the faster routes.

## How do I block a sender in Outlook?

Outlook blocks a sender in two clicks from the message, and blocked mail moves to the Junk Email folder.

1. **Select the message** from the sender in new Outlook or Outlook.com.
2. **Open More options** (the three dots in the toolbar), then choose **Block** under Move & delete.
3. **Confirm with OK.** Outlook deletes the current message and sends the sender's future mail to Junk.

You can also manage the list directly. Open **Settings**, go to **Mail**, then **Junk email**, and under **Blocked senders and domains** add an address or a whole domain, then Save. [Microsoft's support documentation](https://support.microsoft.com/en-us/office/block-or-unblock-senders-in-outlook-9bf812d4-6995-4d19-901a-76d6e26939b0) confirms that Outlook automatically moves messages from a blocked sender to the Junk Email folder. Blocking a domain is useful when a company mails you from a rotating set of addresses that all share the same tail end. To leave a legitimate Outlook newsletter cleanly rather than block it, our guide to [unsubscribing in Outlook](/blog/unsubscribe-emails-outlook) walks through the Subscriptions panel.

## How do I block a sender in Apple Mail on iPhone?

Apple Mail blocks a sender from the message header, and the block syncs to every device signed into your iCloud account.

1. **Open a message** from the sender in Mail.
2. **Tap the sender's name** at the top of the message to open their contact card.
3. **Tap Block this Contact,** then confirm.

Here is the part that surprises people. Apple Mail's default setting for blocked senders is **Mark as Blocked, Leave in Inbox**, which keeps the message right where it is and only mutes its notification. Blocking on iPhone does not remove the mail from your inbox until you change that setting. Open **Settings**, tap **Mail**, then **Blocked Sender Options**, and switch it to **Move to Trash** so blocked mail is routed out of sight. On newer iOS versions, Mail sits under the Apps list in Settings first. Your full blocked list lives at Settings, Privacy & Security, Blocked Contacts, and it applies across your Apple devices.

## When should you block a sender instead of unsubscribing?

Block a sender when you know the exact address and never want to hear from it again, especially one that has no working unsubscribe or ignores the requests you send. Unsubscribing is the cleaner exit for a legitimate company, but it depends on that company playing fair. Blocking does not.

Reserve blocking for three cases. A sender with no unsubscribe link and no top-bar unsubscribe button. A sender that keeps mailing after you unsubscribed and the legal window has passed. And any address you simply want silenced without waiting on the sender to act. For obvious junk from a stranger, marking as spam is usually the better move, because clicking unsubscribe inside real spam can confirm your address is live. According to DNSFilter's chief technology officer, cited by [Popular Science](https://www.popsci.com/technology/email-unsubscribe-scam/) in June 2025, roughly 1 in 644 unsubscribe links leads to a possibly malicious site, and our guide to [why unsubscribing can bring more spam](/blog/more-spam-after-unsubscribing) explains when to block instead of click.

If you first unsubscribe and then want to know which senders ignored you, [Email Unsubscriber](/) flags them for you. It scans your Gmail or personal Outlook in your own browser, sends real unsubscribe requests where senders support the one-click standard, and its "still emailing" filter surfaces the senders who keep mailing after you left, so you know exactly which addresses to block in your client. Your email content never reaches our servers, and you can [run it on your own inbox](https://app.email-unsubscriber.com) and review the full list before you touch a thing.

## What blocking can't do

Blocking changes where a sender's mail lands, and nothing else. It is a filter on your account, not a message to the outside world, so it comes with real limits worth knowing before you rely on it.

Blocking does not remove you from any list, because the sender is never told. It does not stop them collecting, selling, or reselling your address, since your click history and their database live on their side. It does not clean up mail already sitting in your inbox; a block only affects what arrives next. And it does not reach a sender who switches addresses, because most blocks target one exact address. A domain block in Outlook or a Gmail filter that matches a pattern casts a wider net, but a determined sender on a fresh domain still slips through.

## Can a blocked sender still email you?

Yes. A block usually pins one exact address, so the same sender can reach you again from a new address or a different domain the moment they choose to. This is why blocking works best as a targeted tool against a known nuisance, not as a wall against a company running many sending domains.

For a persistent sender, combine the tools. Unsubscribe first to leave the list at the source, block the address that keeps mailing, and mark anything new as spam so your filter learns the pattern. No single action covers every angle, but together they close most of the gaps a lone block leaves open.

## The takeaway

Blocking is the bluntest of the three inbox tools, and the most reliable on your own side. It does not negotiate with the sender or wait for a list to update; it simply reroutes one address to Spam, Junk, or Trash. In Gmail you block from the three-dot menu, in Outlook from More options, and in Apple Mail by tapping the sender, though on iPhone you should switch Blocked Sender Options to Move to Trash so the mail actually disappears. Just remember what a block cannot do: it will not unsubscribe you, will not stop a sender from finding your address, and will not reach them once they move to a new one. For legitimate senders, unsubscribing is still the cleaner exit. Save the block for the ones who will not take the hint.
