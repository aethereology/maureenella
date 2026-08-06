# Environment Variables

Use `.env.local` for local development secrets. It is ignored by git. Keep `.env.example` updated as the shareable checklist of variables the project may need.

## Currently Read By The App

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - enables GA4 when set.
- `RESEND_API_KEY` - sends inquiry and waitlist emails through Resend.
- `FORM_TO_EMAIL` - recipient for inquiry and waitlist notifications.
- `CRM_WEBHOOK_URL` - optional lead webhook for a CRM or automation tool.
- `PRICING_LINK_SECRET` - signs private pricing links (D013), 32 random bytes.
  Rotating it invalidates every link already sent to a bride. Falls back to a
  dev-only constant whenever `NODE_ENV !== "production"`; unset in production
  means the auto-responder still sends, just without the pricing link (an
  error is logged so the gap doesn't go unnoticed).
- `PRICING_OWNER_KEY` - guards `/pricing/new` (D013), 32 random bytes. Treat
  the bookmarked URL as a password. Unset (or a wrong key) means the page
  404s — it never falls back to a dev default.
- `EMAIL_ASSET_BASE_URL` - absolute base for email images. Defaults to
  `site.baseUrl` (the production site); set to `http://localhost:3000` when
  previewing emails locally with `npm run email`.

Generate both `PRICING_LINK_SECRET` and `PRICING_OWNER_KEY` with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

## Planned / Reserved

- `NEXT_PUBLIC_SITE_URL` is ready for deployment-aware site URLs if we choose to wire it into the site config.
- `RESEND_FROM_EMAIL` is ready for a custom verified sending address.
- `AFFILIATE_DISCLOSURE_ENABLED` is ready for future affiliate/favorites behavior.
- Supabase variables are for future portfolio storage, admin content, or metadata.
- Cloudflare variables are for DNS, Turnstile spam protection, and optional R2 media storage.
- Vercel variables are for deployment automation, not normal local development.
- HoneyBook, Zapier, Make, affiliate, and social API variables are placeholders for likely integrations.

## Security Notes

- Only variables prefixed with `NEXT_PUBLIC_` are safe to expose in browser code.
- Keep `SUPABASE_SERVICE_ROLE_KEY`, API tokens, and webhook URLs server-side only.
- Add production values in Vercel Project Settings, not only in local files.
