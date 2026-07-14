---
title: "Is your email account hacked? Signs and what to do"
date: "2026-06-28"
excerpt: "The warning signs your email is compromised, from sent mail you never wrote to hidden forwarding rules, plus the recovery steps to take in order."
author: "Email Unsubscriber Team"
categories: ["Privacy & Safety"]
tags: ["email-security", "account-recovery", "hacked-email", "two-factor-authentication", "email-privacy"]
cover: "/blog/covers/is-my-email-hacked.webp"
coverAlt: "Flat vector illustration of a cracked-seal cream envelope with a pried-open padlock, a bent arrow copying it off-frame, and a key turning in a fresh lock."
featured: false
draft: false
readiness: "Ready for review"
faq:
  - question: "How do I know if my email has been hacked?"
    answer: "Watch for sign-in alerts from devices or places you do not recognize, messages in your Sent folder you never wrote, friends reporting spam from your address, and password-reset emails for accounts you did not touch. Changed settings are another clue: a new recovery phone, a signature link you did not add, or a forwarding rule sending your mail somewhere else."
  - question: "What is the first thing to do if my email is hacked?"
    answer: "Change your password, but do it from a device you trust and have scanned for malware first. Google, Microsoft, and the FTC all warn that if a keylogger is on your computer, a new password gets stolen the moment you type it. Once the device is clean, change the password, then turn on two-factor authentication so a stolen password alone stops working."
  - question: "Does changing my password remove a hacker from my email?"
    answer: "Not by itself. A new password signs out most active sessions, but it does not delete a forwarding rule, an inbox filter, or a connected third-party app the attacker added while they had access. Those survive the password change and keep leaking your mail. After you reset the password, you have to find and remove that hidden access by hand."
  - question: "Why am I still getting hacked after changing my password?"
    answer: "The attacker left a back door. The most common ones are an auto-forwarding rule that copies your mail to their address, a filter that hides or deletes security alerts, and a connected app with a token that survives password changes. Attackers use these to keep reading your mail quietly. Check forwarding, filters, and connected apps, then sign out every session."
  - question: "Can someone read my email without me knowing?"
    answer: "Yes. A common tactic is a silent forwarding rule or filter that copies incoming mail to the attacker and marks the original as read, so your inbox looks normal. Barracuda reported in September 2023 that attackers set these inbox rules specifically to evade detection after a compromise. Check your forwarding and filter settings even when nothing else looks wrong."
  - question: "How do I check if my email was in a data breach?"
    answer: "Enter your address at Have I Been Pwned, a free service run by security researcher Troy Hunt since 2013 that indexes billions of accounts exposed in known breaches. If your address appears, change the password on every site where you reused it. The tool tells you which breaches exposed you, so you know which passwords are no longer safe."
  - question: "How do I stop my email from being hacked again?"
    answer: "Turn on two-factor authentication, use a unique password no other site shares, and stay alert to phishing, which is how most accounts fall in the first place. Shrinking your inbox helps too: fewer senders means fewer risky footer links and fewer messages to misjudge. Review connected apps now and then, and remove any you no longer use."
---

<!--
cover-generation-prompt

Paste the block below (Style then Subject) into your image generator. The style
portion is copied verbatim from website/.design/DESIGN.md section 14.10 — do NOT
tweak it. Only the Subject line is tailored per post. Keep the Subject to a few
sentences and do not re-describe the style.

Flat vector editorial illustration in one strict house style. Match the attached reference cover exactly if one is provided.

HARD RULE — obey above all else: ABSOLUTELY FLAT. No shadows of any kind — no drop shadow, no soft ambient shadow beneath objects, no inner shadow, no glow, no gradient, no soft background blobs behind the cluster. Every fill is one solid flat color; all objects float on one flat solid teal canvas.

Text: legible words are allowed where they meaningfully label an object (e.g. the word on an unsubscribe button). Keep any text short, correctly spelled, and drawn in dark teal on a cream or teal label. Where a word is not needed, default to 3–5 wavy squiggle lines or solid bars instead — do not fill every surface with text.

Technique: hand-drawn feel with a subtle organic line wobble; bold uniform outline on every shape — same chunky-marker thickness everywhere, inner details included; 2D frontal orthographic; objects float on a flat plane — no ground line, no perspective, no 3D.

Palette — only these five colors, nothing else: background solid pale mint teal #99f6e4 (full bleed, one flat fill — this lock matters most); outlines deep pine teal #115e59 (every contour and every decorative mark); primary fill bright teal #2dd4bf; secondary fill deep teal #0d9488; cream #faf6ed ONLY for paper / screen / label surfaces (the sole non-teal color). No other hues. No gradients, texture, grain, or noise.

Composition: 5–12 simplified friendly objects, rounded chunky proportions, clustered asymmetrically at varied scale — one or two hero objects plus medium and small ones. Objects overlap each other and bleed slightly off the frame edges. Keep the hero inside the middle 60% of the frame (sides get cropped by card ratios). Leave breathing room; season gaps with 5–8 small fillers — 4-point outline stars, tiny solid dots, short parallel sparkle strokes, small outline circles, small plus signs — all in the outline teal.

Objects: no human faces or people. No brand-accurate logos or devices — a laptop is three rounded rectangles, not a real MacBook. Avoid stock clip-art clichés (spy hats, incognito sunglasses, generic lightbulbs) unless the Subject names them.

Canvas: 1200×630, full bleed, no border, no framing, no logo, no watermark, no caption.

Forbidden: logos, watermark, caption, misspelled or garbled words, gradients, drop shadows, soft/ambient shadows, inner shadows, glows, soft background blobs behind the cluster, 3D, perspective, isometric, depth of field, photorealism, pixel art, low-poly, anime, watercolor, painterly, brush texture, grain, noise, emoji, stock clip-art, human faces, colors outside the teal + cream palette.

Subject: A hero cream email envelope at center with its wax seal cracked open and a small pried-open padlock dangling from one corner, breached. From behind the envelope a bent teal arrow siphons a duplicate cream envelope off toward the frame edge, drawn as a hidden forwarding rule carrying a copy away. To one side a cream key turns in a fresh round padlock for the new password, a cream shield stamped 2FA with a small check stands guard, and a cream magnifying glass hovers over a small settings gear that carries a tiny suspicious rule label reading "...". Season the gaps with sparse star, dot, and plus-sign fillers.
-->

A friend texts to ask why you sent them a link to a crypto site. You did not. Or you open your laptop to a Google alert about a sign-in from a city you have never visited, and a password-reset email for an account you never touched. Something is off, and the question in your head is simple: has someone gotten into my email?

> Your email is likely hacked if you see sign-in alerts from unknown devices, sent mail you never wrote, contacts reporting spam from you, or password-reset emails you did not request. Act fast: change your password from a device you trust, turn on two-factor authentication, then hunt for forwarding rules and connected apps the attacker left behind.

## How can I tell if my email account has been hacked?

The clearest signs are things happening that you did not do. Your account is the tool an attacker uses, so the evidence shows up as activity you cannot account for. Look for these:

- **Sign-in alerts from unfamiliar devices or locations.** Google and Microsoft email you when a new device logs in. An alert naming a browser, phone, or country you do not recognize is the loudest warning there is.
- **Sent mail you never wrote.** Check your Sent folder. Spam or phishing sitting there means someone used your account to mail other people.
- **Contacts getting spam from you.** Friends asking about a strange link or a plea for money often notice before you do, because the attacker may have deleted the copies from your side.
- **Password-reset emails you did not request.** A reset code for your bank or another account can mean someone is working through your logins, using your inbox as the master key.
- **You cannot log in.** A password that suddenly stops working, when you know it, often means the attacker already changed it to lock you out.
- **Settings you did not change.** A new recovery phone number, a signature with a link you never added, or an auto-reply you did not write are all footprints.

One of these can be a glitch. Two or three together is a compromised account, and the next step is to move quickly.

## Why do I see emails in my Sent folder I didn't send?

Because the attacker is using your account to mail other people, usually spam or phishing aimed at your contacts. Your address is trusted by the people who know you, which makes it a good launchpad. Their filters are more likely to let a message through when it comes from a real friend.

Watch for the reverse clue too. Some attackers delete the messages they send from your Sent folder to stay hidden, so an empty Sent folder is not proof you are safe. If contacts report mail from you that you cannot find, treat that report as the real signal. The FTC's guidance on a [hacked email account](https://consumer.ftc.gov/articles/how-recover-your-hacked-email-or-social-media-account) recommends telling your contacts directly: warn them not to click links in messages from you and to ignore any request for money.

## What are the hidden signs, like forwarding rules and filters?

The dangerous signs are the quiet ones, because an attacker who plans to stay wants your inbox to look normal. Two settings do most of the hiding.

The first is an auto-forwarding rule. The attacker points a rule at their own address so every new message you receive is copied to them silently, while your inbox still shows the original. They can keep reading your mail for months after you change your password, since a forwarding rule does not care what your password is.

The second is a filter. A filter can automatically mark certain messages as read, move them to Trash, or archive them, which lets an attacker suppress the exact security alerts and reset emails that would otherwise tip you off. Barracuda reported in [September 2023](https://blog.barracuda.com/2023/09/20/threat-spotlight-attackers-inbox-rules-evade-detection) that attackers create these inbox rules specifically to evade detection after they break in. Security teams have noted the odd names attackers give them, sometimes just a single period, a semicolon, or a couple of letters, so a strange rule you do not remember making is worth deleting.

## What should I do first if my email is hacked?

Work through these steps in order. Each one closes a door, and the order matters, because a step done out of sequence can be undone by the attacker.

1. **Change your password from a device you trust.** Do this from a computer or phone you have scanned for malware. Google, Microsoft, and the FTC all warn that if a keylogger is running on your device, your new password is stolen the instant you type it. Clean the device first, then set a long, unique password.
2. **Turn on two-factor authentication.** With a second factor, your password alone stops being enough to log in. Google calls this [2-Step Verification](https://support.google.com/accounts/answer/6294825); Microsoft calls it two-step verification. Use an authenticator app or a security key rather than SMS where you can.
3. **Sign out every other session.** In your account's security settings, review the list of signed-in devices and sign out everything you do not recognize. On Google this lives under Security and Your devices; on Microsoft, under your account's sign-in activity. A password change signs out most sessions, but confirm it by hand.
4. **Hunt for forwarding rules and filters.** Open your mail settings and remove any auto-forwarding address and any filter you did not create. This is the step people skip, and it is the one that lets an attacker keep reading your mail after everything else looks fixed.
5. **Review connected apps.** [Revoke any third-party app](/blog/revoke-google-account-app-access) or service you do not recognize or no longer use. App access tokens survive a password change, so a connected app is a back door that a new password does not close.
6. **Check whether your address is in a breach.** Run your address through Have I Been Pwned to see which breaches exposed it, then change the password anywhere you reused the old one.

Then warn your contacts, and check your recovery email and phone number to make sure the attacker did not swap them for their own.

## How do I check for forwarding rules and filters an attacker added?

Go straight to the mail settings, not the account settings, because forwarding and filters live inside your inbox. This is the highest-value check on the list, so do it carefully.

In **Gmail**, open Settings, then See all settings. Under Forwarding and POP/IMAP, remove any forwarding address you did not add. Under Filters and Blocked Addresses, delete any filter that forwards, deletes, or marks messages as read that you do not remember creating. Google's own guide to a [compromised account](https://support.google.com/accounts/answer/6294825) also flags mail delegation, labels, and IMAP or POP access as places an attacker can hide.

In **Outlook.com**, open Settings, then Mail. Check Forwarding for an address you did not set, and Rules for anything suspicious. Microsoft's [recovery guide](https://support.microsoft.com/en-us/accounts-billing/manage/how-to-recover-a-hacked-or-compromised-microsoft-account) notes that it resets some settings automatically when it detects a hack, but you should still confirm forwarding, rules, and your automatic reply by hand. If a rule reappears after you delete it, the attacker still has access, so return to the sign-out and connected-apps steps.

## How do I recover a Google or Microsoft account I'm locked out of?

Use the provider's account recovery flow, from a device and location you have used before. When an attacker changes your password to lock you out, the recovery page is the way back in, and familiar signals help you pass the identity check.

For a **Google Account**, go to the account recovery page and answer the verification prompts. Google advises using a device, browser, and location you have signed in from before, since that history raises your odds of getting back in. For a **Microsoft account**, use the sign-in helper at account.microsoft.com and, if the automated checks fail, complete the recovery form with as much accurate detail as you can: old passwords, the account's approximate creation date, and subject lines of recent messages. Microsoft account recovery is automated, so even its support agents point you to the same form.

## How do I check if my email was in a data breach?

Enter your address at [Have I Been Pwned](https://haveibeenpwned.com/). It is a free service, run by security researcher Troy Hunt since 2013, that indexes billions of accounts exposed in known data breaches and tells you which ones included your address. A breach is often how the attacker got your password in the first place, especially if you reused it.

If your address shows up, treat every password you reused across sites as compromised and change each one. Knowing [every account tied to your address](/blog/find-accounts-linked-to-email) tells you where to start. This is the moment a password manager earns its keep: a unique password per site means a single breach cannot unlock the rest of your accounts. Reused passwords are the thread that turns one leaked login into ten hacked ones.

## How do I keep my email from getting hacked again?

Close the door the attacker used, then make the account harder to open next time. Most email accounts fall to one of two things: a password exposed in a breach, or a phishing message that tricked you into typing your login on a fake page. Two-factor authentication defends against both, because a stolen password alone no longer gets anyone in.

Phishing is the harder problem, because a convincing fake is designed to bypass your judgment. Modern lures read clean, with correct spelling and your real name, so the old tells no longer help. Our guide to [spotting AI phishing emails](/blog/ai-phishing-emails) covers what to check instead, starting with the sender's real address and where a link actually points. A visit to our [security overview](/security) explains how read-only, in-browser design limits what any single tool can expose.

Shrinking your inbox lowers the risk too. Fewer senders means fewer footer links to misjudge and fewer messages to sort real from fake each morning. [Email Unsubscriber](https://app.email-unsubscriber.com) scans your Gmail or Outlook inside your own browser, lists every subscription sender, and fires the real one-click unsubscribe where a sender supports it, which keeps you off sketchy landing pages. The scan runs on your device, and we never read, analyze, or monetize your email content. It is not a spam filter and it will not undo a hack, but a smaller inbox is a smaller target. Our full routine for [stopping spam for good](/blog/how-to-stop-spam-emails) covers the rest.

## The takeaway

A hacked email account announces itself through activity you did not create: strange sign-ins, sent mail you never wrote, contacts getting spam, resets you did not ask for. When you see it, move in order. Change your password from a clean device, turn on two-factor authentication, sign out every session, and then do the step most people miss: remove the forwarding rules, filters, and connected apps the attacker left behind, because those keep working long after the password is fixed. Check Have I Been Pwned to learn how they got in, warn your contacts, and lock the account down so the next attempt goes nowhere.
