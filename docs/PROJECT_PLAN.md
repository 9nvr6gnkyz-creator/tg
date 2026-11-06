# TG-K — Project Plan

TG-K is an iPhone-first Telegram Web client prototype delivered as an installable PWA.

## Product direction
- iOS-style interface inspired by Telegram iOS.
- Honest Stealth Mode explanations: a web client cannot guarantee invisibility from Telegram servers.
- Local convenience features without bypassing Telegram server-side restrictions or impersonating Telegram Premium.
- AI multi-provider support with user-managed API credentials kept out of public client code.
- Voice transcription, automatic and manual.
- Archive only messages and edits already received by the client; no recovery of content never delivered to it.
- Auto Translate, AI Summary, Download Manager, Custom Folders, Message Filters, Universal Search, Secret Notes, AI Agents, Smart Notifications, Quick Actions, and Privacy Dashboard.

## Technical direction
- Evaluate the official Telegram Web Z codebase as the upstream foundation: https://github.com/TelegramOrg/Telegram-web-z
- Keep upstream separate; maintain TG-K changes as a documented fork.
- Verify upstream commit, Node.js/npm requirements, dependencies, and license before integrating.
- Respect GPL-3.0 obligations for any distributed modified version.

## Security
- Never commit Telegram session data, API hashes, login codes, 2FA credentials, or AI provider keys.
- Telegram API ID/API hash are application credentials, not a user's Telegram session.
- Prefer a secure backend or secret store for AI provider keys.

## Milestones
1. Verify upstream source, build requirements, and licensing.
2. Establish a reproducible build and deployable PWA shell.
3. Implement iOS-style navigation and responsive layouts.
4. Integrate Telegram authentication and core messaging.
5. Add privacy, archive, media, and search utilities within API limits.
6. Add AI providers and voice transcription with secure key handling.
7. Test on iPhone Safari, standalone PWA mode, and supported iOS versions.

## Current status
PWA foundation created on branch codex/tg-k-pwa-foundation. Telegram account integration is the next milestone.
