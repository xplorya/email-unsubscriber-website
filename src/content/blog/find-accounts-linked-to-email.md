---
title: "How to find every account linked to your email address"
date: "2026-06-27"
excerpt: "No single button lists every account tied to your email. Four practical methods to reconstruct the full list, then close the ones you never use."
author: "Email Unsubscriber Team"
categories: ["Privacy & Safety"]
tags: ["account-hygiene", "email-privacy", "have-i-been-pwned", "sign-in-with-google", "data-breach"]
cover: "/blog/covers/find-accounts-linked-to-email.webp"
coverAlt: "Flat vector illustration of a cream envelope with teal threads fanning out to small account cards, a magnifying glass, a ticked checklist, and one crossed-out dead account."
featured: false
draft: false
readiness: "Ready for review"
faq:
  - question: "How do I find all accounts linked to my email address?"
    answer: "No single button lists them, so you reconstruct the list from four sources. Search your inbox for signup words like welcome, verify your email, and confirm your account. Check the Sign in with Google and Sign in with Apple app lists. Open your password manager's saved logins. Then run your address through Have I Been Pwned to catch accounts on services that were later breached."
  - question: "Is there a tool that shows every account tied to my email?"
    answer: "No. There is no central registry of the services your address is signed up for, because no one keeps that list on your behalf. The closest thing is your own inbox, which holds a signup or verification email from most accounts you ever created. Combining an inbox search, your single sign-on lists, and your password manager rebuilds the picture no single tool can."
  - question: "How do I see what apps use Sign in with Google?"
    answer: "Sign in to your Google Account, open Security, and find your connections to third-party apps and services, or go straight to myaccount.google.com/connections. The page lists every app you signed into with Google, plus apps you granted account access. Select any entry to see what it can reach, and remove access for anything you no longer use or recognize."
  - question: "How do I check which apps use Sign in with Apple?"
    answer: "On an iPhone or iPad, open Settings, tap your name at the top, then tap Sign in with Apple to see every app tied to your Apple Account. On the web, sign in at appleid.apple.com and open the Sign-In and Security section. Select an app to stop using Sign in with Apple for it, which signs you out of that app."
  - question: "Does Have I Been Pwned show all my accounts?"
    answer: "No. Have I Been Pwned checks breaches, not accounts. It tells you which leaked databases your address appears in, which hints at where you held accounts, but it only covers breaches that have been disclosed and indexed. An account on a service that was never breached, or whose breach is not public, will not appear. Use it alongside an inbox search, not instead of one."
  - question: "How do I find old accounts I forgot about?"
    answer: "Search your inbox for the words senders use at signup. Try welcome, verify your email, confirm your account, your receipt, and your order, and search across All Mail so archived and spam messages are included. Most services sent a confirmation email when you registered, so those messages are the closest thing to a record of accounts you no longer remember making."
  - question: "What should I do with accounts I no longer use?"
    answer: "Close the dead ones and unsubscribe from the live ones. Deleting an account removes your data from that service and shrinks your exposure in a future breach. For accounts you keep but do not want mail from, unsubscribe at the source. Going forward, hand out a masked alias or a burner instead of your real address so the next signup never touches your main inbox."
  - question: "How many online accounts does the average person have?"
    answer: "A lot more than most people expect. A NordPass study in 2024 found the average person kept close to 170 passwords for personal accounts. The 2026 update put the figure nearer 120, a drop the researchers attributed to single sign-on, where people use Sign in with Google or Apple instead of creating a new password. Either way, the count runs well into the dozens."
---

<!--
cover-generation-prompt

Paste the block below (Style, then Subject) into your image generator. The style
portion is copied verbatim from website/.design/DESIGN.md section 14.10 — do NOT tweak it.
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

Subject: A single large cream envelope as the hero object, with several teal thread-lines fanning out from it to a loose cluster of small cream account cards — one card drawn as a login box with a little key, one as a shopping bag, one as a play-button tile, one as a padlock card — mapping every service tied to one address. A cream magnifying glass hovers over one of the cards. A small cream checklist card nearby shows three ticked lines. At the edge, one faded cream card carries a small teal crossed-circle stamp to mark a dead account being closed. Keep the envelope-and-threads centered in the middle 60% of the frame, and scatter a few small teal stars, dots, and plus signs through the gaps.
-->

You are cleaning up, or a breach alert just landed, and it hits you that you have no idea how many services have your email address. Years of signups, one-time checkouts, and free trials have piled up, and there is no obvious place to go see the full list.

> No single button lists every account tied to your email. You reconstruct the list from four sources: search your inbox for "welcome" and "verify your email" messages, review the "Sign in with Google" and "Sign in with Apple" app lists, open your password manager's saved logins, and run your address through Have I Been Pwned for breach exposure.

## Can you find every account linked to your email in one place?

You cannot, because no such place exists. No company keeps a master list of every service you signed up for, and your email provider only sees the mail that arrives, not the accounts behind it. So finding your accounts is detective work, not a lookup. The good news is that four sources overlap enough to rebuild almost the whole picture.

The scale is bigger than most people guess. According to a [NordPass study (2024)](https://nordpass.com/blog/how-many-passwords-does-average-person-have/), the average person kept close to 170 passwords for personal accounts. The 2026 update put the figure nearer 120, a decline the researchers tied to single sign-on, where people tap "Sign in with Google" instead of making a new password. That shift matters here, because those single sign-on accounts never generate a password you can look up. You have to find them a different way, which is exactly what the methods below cover.

## How do you search your inbox for accounts you signed up for?

Your inbox is the closest thing to a record of every account you ever made, because almost every service sends a confirmation email at signup. Search for the words those messages use, and old accounts surface fast.

1. **Search the signup words.** In Gmail or Outlook, search your mail for `welcome`, `verify your email`, `confirm your account`, and `activate your account`, one at a time. These phrases appear in the first email nearly every service sends.
2. **Add the transactional words.** Follow up with `your receipt`, `your order`, and `your subscription`. These catch stores and paid services that skipped a formal welcome email but still emailed you a confirmation.
3. **Search all your mail, not just the inbox.** Include archived, spam, and trash. In Gmail, run the search from the All Mail view; in Outlook, choose to search all folders. Old confirmations are usually archived, not sitting in your inbox.
4. **Narrow to the subject line when results balloon.** In Gmail, `subject:"verify your email"` limits matches to messages with that exact phrase in the subject, which cuts the noise from newsletters that merely mention the words.

The outcome is a scrollable list of senders you once registered with. Some you will recognize instantly. Others will be a shop you used once in 2019 that still has your address on file.

## How do you check "Sign in with Google" and "Sign in with Apple" logins?

Check the connected-app lists that Google and Apple keep for you. When you tap "Sign in with Google" or "Sign in with Apple" instead of making a password, that provider records the link, so both keep a running list of the apps you signed into. This is the only reliable way to find accounts that never created a password for you to look up.

For Google, sign in to your Google Account, open **Security**, and find "Your connections to third-party apps and services," or go straight to `myaccount.google.com/connections`. The page groups your links: apps you signed into with Google, and apps you granted broader account access. Select any entry to see what it can reach, and remove access for anything you do not recognize.

For Apple, open **Settings** on your iPhone or iPad, tap your name at the top, then tap **Sign in with Apple** to see every app tied to your Apple Account. On the web, sign in at `appleid.apple.com` and open the **Sign-In and Security** section. Selecting an app lets you stop using Sign in with Apple for it, which signs you out of that app on your devices.

If you also use "Sign in with Facebook," Facebook keeps the same kind of list under its Settings, in the "Apps and websites" section. Between them, these three cover most of the passwordless accounts your inbox search will miss.

## What does your password manager show you?

A password manager holds one entry per site you saved a login for, so its vault is a direct index of your accounts. If you use Chrome, Safari, iCloud Keychain, 1Password, or Bitwarden, open the saved-passwords list and scroll. Every row is a service that has your email address.

Two features go further. Most managers run a checkup that flags logins whose passwords turned up in a known breach, which doubles as a hint about where your address is exposed. Google's own Password Manager and Chrome flag compromised saved passwords the same way. Reviewing that list does two jobs at once: it reminds you of accounts you forgot, and it points at the ones worth closing or securing first.

The gap to know about: a password manager only shows accounts you saved in it. Anything you typed by hand and never stored, or created before you started using the manager, will not be there. Treat the vault as one strong source, not the whole answer.

## How do you check where your email leaked in a breach?

Run your address through Have I Been Pwned, the free breach-notification service run by security researcher Troy Hunt. Go to `haveibeenpwned.com`, type your address, and it lists every disclosed breach your address appeared in, with the date of each and what was exposed. Each breached service on that list is somewhere you almost certainly had an account.

One limit matters, and it is easy to misread. Have I Been Pwned checks breaches, not accounts. It surfaces services that were breached and had their data indexed, so an account on a company that was never breached, or whose breach is not public, will not show up. It is a strong supplement to your inbox search, not a replacement for it. While you are there, turn on notifications so the service emails you when your address turns up in a future leak. For the full picture of where a leaked address travels next, and who buys it, see [where your email address goes after a data breach](/blog/who-buys-your-email-address).

## What should you do with the accounts you find?

Split the list into two piles: dead accounts to close, and live senders to quiet down. Each pile gets a different action.

Close the dead ones. For any account you will not use again, delete it rather than leaving it dormant. A deleted account removes your data from that service and takes you out of its next breach. Look for "delete account" in the service's settings; if you cannot find it, the site `justdeleteme.xyz` catalogs the deletion link for hundreds of services.

Quiet the live ones. For accounts you keep but no longer want mail from, unsubscribing at the source beats deleting the messages one by one. Doing that by hand across dozens of senders is slow, and not every unsubscribe tool deserves the inbox access it asks for. [Email Unsubscriber](https://app.email-unsubscriber.com) scans your Gmail or Outlook in your own browser, lists every subscription sender, and fires the real one-click opt-out where the sender supports it. The scan runs on your device, and we never read, analyze, or monetize your email content.

Then change how you sign up. The reason this cleanup took an afternoon is that your real address went to every one of those services. Going forward, hand out a [masked alias](/blog/email-alias-services-compared) for accounts you might keep, and a [burner address](/blog/burner-email-address) for one-time signups you will never revisit. The next breach burns the alias instead of your main inbox, and you learn exactly which service leaked it.

## The takeaway

There is no single screen that lists every account tied to your email, so you build the list yourself from four overlapping sources: an inbox search for signup words, the Sign in with Google and Apple app lists, your password manager's vault, and a breach check on Have I Been Pwned. Together they surface almost everything. Once you have the list, close what is dead, unsubscribe from what is live, and start handing out aliases so the next round of cleanup is a fraction of the size.
