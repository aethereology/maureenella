# Tech Stack and Architecture

## Recommended stack

- Next.js App Router or equivalent modern React stack.
- TypeScript.
- Tailwind CSS or CSS modules with design tokens.
- MDX/JSON local content for MVP, CMS-ready data models.
- Vercel deployment.
- GA4 and Google Search Console.
- Email/CRM integration with HoneyBook, Resend, Zapier, ConvertKit, Flodesk, or MailerLite depending on final tool choices.

## Why this architecture

The site needs strong SEO, structured content, static/fast pages, and future dynamic expansion. A content-driven App Router build supports this well.

## Directory suggestion

```text
app/
  (site)/
    page.tsx
    bridal/
    journal/
    education/
    favorites/
    about/
    contact/
components/
  ui/
  layout/
  sections/
  forms/
  seo/
content/
  pages/
  posts/
  portfolio/
  faqs/
data/
  services.ts
  testimonials.ts
  navigation.ts
lib/
  seo/
  schema/
  content/
  analytics/
  forms/
public/
  images/
```

## Data strategy

Phase 1 can use seed JSON/MDX. Build a content access layer so a CMS can replace local files later.

Potential CMS options later:

- Sanity
- Contentful
- Storyblok
- Decap CMS
- Payload

## Forms

Wedding inquiry form must validate server-side and prevent spam.

Possible implementation options:

- Next server action -> email + CRM webhook.
- Formspree/Tally/HoneyBook embed for MVP.
- Custom API route + Resend + Zapier/HoneyBook.

## Analytics events

Track:

- `cta_click_request_availability`
- `inquiry_form_start`
- `inquiry_form_submit`
- `prep_guide_download`
- `education_waitlist_submit`
- `affiliate_click`
- `portfolio_filter_use`
- `phone_click`
- `email_click`

## SEO implementation

- Metadata helper per route.
- JSON-LD components.
- Dynamic sitemap.
- Robots file.
- Redirects file.
- OG image generation or static OG template.

## Security

- Never commit `.env`.
- Add spam protection to forms.
- Sanitize form inputs.
- Avoid exposing admin emails in client JS where possible.
- Use server-side secrets only.

## Performance

- Optimize images.
- Lazy load below-fold galleries.
- Use responsive image sizes.
- Minimize third-party scripts.
- Defer analytics.
- Avoid large carousel libraries.
