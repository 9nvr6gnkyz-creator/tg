# TG-K implementation status

## Foundation delivered
- iPhone-first responsive PWA shell with standalone display metadata and service worker.
- Telegram-inspired navigation, chat list, search, folders, preview conversation, and local demo composer.
- Local-only notes stored in browser localStorage.
- Privacy settings with an explicit explanation that client-side controls cannot guarantee server-side invisibility.
- Tool placeholders for filters, AI summary, translation, voice recognition, and downloads.
- No Telegram session, API credentials, AI keys, or user data are embedded in the repository.

## Important limitations
- Chat data is illustrative and local; it is not fetched from Telegram.
- Sending in the preview only appends a local demo message.
- AI features, translation, file transfer, archive/anti-edit, and synchronization are not connected.
- Browser speech recognition is optional and depends on browser support and microphone permission.
- This is a foundation, not a complete Telegram client.

## Upstream integration
The selected upstream candidate is https://github.com/TelegramOrg/Telegram-web-z (GPL-3.0-or-later). Its current package metadata requires Node.js ^24.15 or ^26 and npm ^11 or ^12. Before importing or modifying upstream source, review its current license, dependency notices, build configuration, and required environment variables. Preserve upstream license notices and publish corresponding source for distributed GPL modifications.

## Next milestone
Integrate the upstream Telegram Web Z application in a separate, reviewable step, then apply TG-K branding and iPhone-specific UI changes without breaking upstream authentication or MTProto behavior.
