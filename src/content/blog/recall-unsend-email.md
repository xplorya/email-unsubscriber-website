---
title: "How to recall or unsend an email"
date: "2026-07-02"
excerpt: "Gmail's Undo Send cancels a message before it leaves. Outlook's recall only works inside one organization and often fails. Here is what actually works."
author: "Email Unsubscriber Team"
categories: ["Guides"]
tags: ["gmail", "outlook", "undo-send", "recall-email", "unsend"]
cover: "/blog/covers/recall-unsend-email.webp"
coverAlt: "Flat vector illustration of a cream envelope reeled back mid-flight by a looping undo arrow beside a countdown timer, a message card with an Undo button, a second envelope escaping off the frame, and a crossed-out Recall tag."
featured: false
draft: false
readiness: "Ready for review"
faq:
  - question: "Can you unsend an email after it has been sent?"
    answer: "Only within a short window, and only in some cases. Gmail and Outlook.com hold a message for a few seconds after you press Send, so an Undo button can cancel it before it leaves. Outlook's recall tries to delete a message that already arrived, but it works only inside one Microsoft 365 organization. Once a message reaches an outside provider, nothing pulls it back."
  - question: "How do I unsend an email in Gmail?"
    answer: "Right after you send, Gmail shows a Message sent bar in the bottom-left corner with an Undo link. Click Undo before the timer runs out and Gmail cancels delivery and reopens the draft. The default window is five seconds. You can extend it to thirty seconds under Settings, See all settings, General, Undo Send."
  - question: "How long do I have to unsend an email in Gmail?"
    answer: "As long as your send cancellation period, which is five seconds by default. In Gmail settings you can set it to 5, 10, 20, or 30 seconds. The window only exists because Gmail delays the actual send by that amount. Once the timer ends, the message leaves Google's servers and can no longer be recalled."
  - question: "How do I recall an email in Outlook?"
    answer: "In new or classic Outlook for Windows or Outlook on the web, open the message in Sent Items, then select Recall Message from the ribbon and confirm. It works only if both you and the recipient have a Microsoft 365 work or school account in the same organization and the recipient has not opened the message yet. A recall report tells you whether it worked."
  - question: "Why does Outlook message recall fail?"
    answer: "Because every condition has to line up. Recall works only when the recipient is in your own Microsoft 365 organization, has not opened the message, and uses a supported Outlook client. If they already read it, sit in another organization, or use a personal account, the recall fails. Failed recalls keep retrying for up to 24 hours before Outlook gives up."
  - question: "Can you recall an email sent to a Gmail or external address?"
    answer: "No. Outlook recall cannot reach personal accounts like Gmail, Hotmail, or Outlook.com, or anyone outside your organization. Microsoft is rolling out cross-tenant recall in 2026, but it stays off unless the receiving company's admin allow-lists your organization, so it never helps with a personal inbox. A message sent to an outside provider is gone."
  - question: "Can you unsend an email in Outlook.com?"
    answer: "Yes, but through Undo send, not recall. Recall is a work and school feature. On a personal Outlook.com account, open Settings, Mail, Compose and reply, and set an Undo send window of up to ten seconds. After that, a toast with an Undo button appears when you send, and clicking it cancels delivery before the message actually leaves."
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

Subject: A hero cream email envelope caught mid-flight and being reeled back by a big looping "undo" arrow that curls around it, with a small round countdown-timer ring beside it showing a few ticks left. Below the hero, a cream message card carries a single clearly-labeled "Undo" button in dark teal. Off to one side, a second envelope has already flown past the frame edge trailing a short dashed line it cannot be pulled back from, and a small cream tag reads "Recall" with a tiny outline cross over it for the failed attempt. Tuck in a little paper plane. Season the gaps with a few 4-point outline stars and small dot clusters.
-->

You hit Send, and your stomach drops. Wrong recipient, a typo in the opening line, the attachment you forgot, or a reply-all you meant to keep to one person. The next thought is always the same. Can you pull it back?

> Two different tools. Gmail and Outlook.com hold a message for a few seconds after you press Send, so clicking Undo cancels it before it leaves. Outlook's Recall This Message tries to delete an email already delivered, but only inside the same Microsoft 365 organization, and it often fails. Nothing recalls a message already delivered to an outside address.

## Can you unsend an email after you send it?

Sometimes, and it comes down entirely to timing. Two mechanisms get called "unsend," and they work nothing alike.

The first is a cancel window. Gmail and Outlook.com wait a few seconds before they actually hand your message to the mail server, so an Undo button can stop it while it is still on your side. Nothing was ever delivered, which is why this one is reliable.

The second is recall. Outlook asks the recipient's mail server to reach into their mailbox and delete a message that already arrived. That depends on the other side cooperating, which is why it is a long shot. The moment a message reaches an outside provider such as Gmail or a stranger's company server, neither tool can touch it.

## How do I unsend an email in Gmail?

Click **Undo** in the "Message sent" popup before the timer runs out. Gmail delays every send by a few seconds specifically so this is possible.

1. **Watch the bottom-left corner.** Right after you send, Gmail shows a **Message sent** bar with **Undo** and **View message**.
2. **Click Undo.** Gmail cancels the send and reopens the message as a draft so you can fix or delete it.
3. **Resend or discard.** Correct the typo, add the attachment, change the recipient, then send again, or throw the draft away.

The recipient never sees anything, because the message was never delivered. The catch is speed: [Gmail Help](https://support.google.com/mail/answer/2819488) sets the default window to just five seconds, so you have to catch the mistake fast. If you routinely need more time, widen the window before you ever need it.

## How do I make the Gmail Undo Send window longer?

Change the send cancellation period to 30 seconds in settings. It is the single most useful change most people never make.

1. **Open Settings.** Click the gear icon in the top-right, then **See all settings**.
2. **Stay on the General tab.** It is the tab that opens first.
3. **Find Undo Send.** Next to it, choose a **Send cancellation period** of 5, 10, 20, or **30 seconds**.
4. **Save Changes.** Scroll to the bottom of the page and click **Save Changes**, or the setting will not stick.

From then on, every send gives you up to half a minute to catch it. While you are in this menu, it is worth a glance at the other housekeeping controls; if Gmail is also warning you about a full quota, [Gmail storage full](/blog/gmail-storage-full) walks through clearing it. The window costs you nothing except a short delay on messages you meant to send anyway.

## How do I recall an email in Outlook?

Open the sent message and use **Recall Message**, but only if you are on a work or school account. Recall is an Exchange feature, and it comes with strict conditions covered in the next section.

1. **Go to Sent Items.** Open the folder and find the message.
2. **Open it in its own window.** In classic Outlook, double-click the message; in new Outlook or Outlook on the web, open it fully.
3. **Select Recall Message.** Find the option on the ribbon or in the message menu and confirm the dialog.
4. **Read the recall report.** Usually within 30 seconds, Outlook emails you a **Message Recall Report** telling you whether the recall worked for each recipient.

According to [Microsoft's recall documentation](https://support.microsoft.com/en-us/outlook/mail/how-to-recall-an-email-in-outlook-requirements-limitations-steps), recall runs on new and classic Outlook for Windows and Outlook on the web. It does not work from Outlook.com or any personal account, which is a large asterisk we come back to below.

## Why do Outlook recalls usually fail?

Because every condition has to line up at once, and usually one does not. Microsoft is blunt about the requirements: recall works only when **both you and the recipient have a Microsoft 365 work or school account in the same organization**, and **the recipient has not opened the message yet**.

That leaves a long list of ways it breaks:

- **The recipient already read it.** Recall cannot delete a message someone has opened.
- **The recipient is outside your organization.** Personal accounts like Gmail, Hotmail, and Outlook.com cannot be recalled at all, and neither can anyone at another company.
- **The account or client is not supported.** POP and MAPI accounts, Outlook for Mac, and some organizations do not support recall.
- **The message is protected.** Emails secured with Azure Information Protection cannot be recalled.

When a recall does fail, Outlook keeps retrying for up to 24 hours before it gives up. As of 2026, Microsoft is rolling out [cross-tenant message recall](https://techcommunity.microsoft.com/blog/exchange/cross-tenant-message-recall-in-exchange-online/4535800), which lets a recall reach across two organizations. It stays off by default, and it only works when the receiving company's admin has explicitly allow-listed your organization. It will not help you unsend a message to a personal Gmail or a stranger's inbox.

## Can you unsend an email in Outlook.com or a personal account?

Yes, but through **Undo send**, not recall. Recall is the work and school feature. Personal Outlook.com accounts get the same kind of cancel window Gmail has, and it is the tool that actually matters for a personal Microsoft inbox.

1. **Open Settings.** Click the gear icon, then go to **Mail**.
2. **Open Compose and reply.** Scroll to the **Undo send** section.
3. **Set the window.** Drag the slider to a cancellation period of up to ten seconds and save.

After that, sending shows a short toast with an **Undo** button, and clicking it cancels delivery before the message leaves. Like Gmail's Undo Send, it works because the message is briefly held rather than reached back from a recipient's mailbox. That is why it is dependable and recall is not.

## Gmail Undo Send vs Outlook recall: what is the difference?

One cancels a message before it leaves; the other tries to claw one back after it arrives. That single difference explains why one is reliable and the other is a gamble.

| | Gmail / Outlook.com Undo Send | Outlook Recall This Message |
|---|---|---|
| What it actually does | Cancels the message before it is sent | Deletes a message already delivered |
| Time you have | 5 to 30 seconds (a set window) | Until the recipient opens it |
| Works with outside recipients? | Not needed, nothing was sent yet | No, same organization only |
| Account type | Any Gmail or Outlook.com account | Microsoft 365 work or school only |
| Reliability | High, the message never left | Low, most conditions rarely hold |
| Where to set it up | Settings, before you need it | Sent Items, after you send |

Bottom line: for everyday personal email, the cancel window is the only one you can count on, so set it to its maximum today. Recall is a bonus that occasionally saves a work email sent to a colleague down the hall, and almost nothing else.

## What can you never unsend?

Anything already delivered to an outside provider. Once your message lands on Gmail's servers, a recipient's company Exchange, or any mailbox outside your own organization, no button removes it. A copy now sits on hardware you do not control.

This is the honest limit that no tool and no trick gets around. Screenshots, forwards, and downloads make it permanent the moment someone acts on the message. Treat the cancel window as your real safety net, and treat everything past it as sent for good.

## What to do when you cannot take it back

Send a short correction rather than a recall. For an external recipient a recall does nothing anyway, and inside an organization a failed recall can draw more attention to the original by flagging it. A plain follow-up ("Please ignore my last message, the correct figure is below") is faster and calmer than any recall attempt.

Recall and Undo Send both fix a message you sent by mistake. The other kind of email you never wanted, the newsletters and promos flooding in, is a different problem with a different fix. You do not undo those one at a time; you unsubscribe at the source, ideally [without even opening them](/blog/unsubscribe-without-opening-email) so nothing renders while you clean up. It helps to know [what actually happens when you unsubscribe](/blog/what-happens-when-you-unsubscribe), since some senders keep mailing during a legal grace period. For years of buildup across dozens of senders, [Email Unsubscriber](https://app.email-unsubscriber.com) reviews every subscription in one pass, with the scan running in your browser and read-only access that expires in about an hour.

## The takeaway

You can unsend an email, but only in the seconds before it leaves. Set Gmail's Undo Send to 30 seconds and Outlook.com's Undo send to its maximum today, while you are thinking about it, because the window has to exist before you make the mistake. Outlook's Recall This Message is a work-account feature that needs the recipient in your own organization and the message still unopened, so treat it as a rare bonus rather than a reliable safety net. Once a message reaches an outside inbox, it is delivered for good.
