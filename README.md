# TG-K

TG-K is an iPhone-first experimental Telegram Web client project.

## Current status

The current branch contains the first PWA interface foundation:
- Telegram-inspired mobile navigation and chat list
- Search and demo folders
- Local preview conversations
- Local-only secret notes
- Privacy settings with clear limitations
- Placeholder entry points for AI, translation, voice transcription, filters, and downloads
- PWA manifest and offline shell cache

**This is not yet connected to Telegram.** Chat entries and messages are demonstration data. The preview composer only changes local page state; it does not send Telegram messages.

## Run locally

Serve the repository root over HTTPS or localhost, then open it in Safari. For local development, any static HTTP server is sufficient. Install the PWA using Safari's Share → Add to Home Screen.

## Telegram integration plan

The upstream candidate is [Telegram Web Z](https://github.com/TelegramOrg/Telegram-web-z), licensed under GPL-3.0-or-later. Its current package metadata specifies Node.js `^24.15 || ^26` and npm `^11 || ^12`. The upstream README describes copying `.env.example` to `.env`, installing dependencies, and configuring Telegram API ID/hash obtained from Telegram.

Do not commit `.env`, Telegram session data, login codes, 2FA credentials, or AI provider keys. API ID/hash are application credentials, not a user session. Review GPL obligations and all upstream notices before distributing a modified build.

See [project plan](docs/PROJECT_PLAN.md) and [implementation status](docs/IMPLEMENTATION_STATUS.md).

## Publish with GitHub Pages

A workflow in `.github/workflows/deploy.yml` deploys the site when changes reach `main`. In the repository settings, open **Pages** and set the build and deployment source to **GitHub Actions**. After the first successful workflow run, open the Pages URL on iPhone Safari and use Share → Add to Home Screen.
