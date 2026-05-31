# Product Spec - maureenella.com

## Product goal

Build a premium umbrella brand website that converts bridal clients, preserves and improves legacy SEO content, creates a foundation for education/coaching revenue, and supports affiliate/product content.

## Primary users

1. Bride looking for wedding hair and makeup.
2. Destination bride planning remotely.
3. Elopement bride needing flexible premium service.
4. Bridal party or special occasion client.
5. Bridal beauty professional seeking mentorship.
6. Bride/beauty shopper looking for curated products.

## MVP scope

### Public pages

- `/` Home
- `/bridal` Bridal landing page
- `/bridal/services` Services and pricing overview
- `/bridal/portfolio` Portfolio
- `/bridal/reviews` Reviews
- `/bridal/faq` FAQ
- `/bridal/prep-guides` Prep guides index
- `/bridal/prep-guides/hair-prep`
- `/bridal/prep-guides/makeup-prep`
- `/bridal/prep-guides/trial-prep`
- `/journal` Blog/journal index
- `/journal/[slug]` Blog article / real wedding
- `/education` Education landing/waitlist
- `/favorites` Favorites landing (light MVP)
- `/about` About Maureen
- `/contact` Request Availability

### Functional requirements

- Wedding inquiry form captures bride details and sends/stores submissions.
- Newsletter/email capture for bridal prep guides and education waitlist.
- Portfolio can be filtered by service type, location, hairstyle/makeup style, and venue.
- Blog supports categories: Bridal Prep, Real Weddings, Beauty Favorites, Education, Business Mentorship.
- Every page has SEO title, description, canonical, and OG metadata.
- Structured data implemented where relevant.
- Redirects from legacy URLs defined and tested.
- Accessible form validation and success/error states.
- Mobile-first layouts.

### CMS/data requirements

Content should support either local JSON/MDX in Phase 1 or a CMS later.

Required content types:

- Page
- Service
- Package/offer
- FAQ
- Testimonial
- Portfolio item
- Blog post
- Real wedding
- Product recommendation
- Lead magnet
- Redirect
- Service area page

## Nonfunctional requirements

- Performance: image optimization, lazy loading, minimal blocking scripts.
- Accessibility: semantic HTML, keyboard navigation, labels, contrast.
- SEO: sitemap, robots, metadata, schema, redirects, internal links.
- Maintainability: data-driven content, typed schemas, reusable components.
- Security: no secrets in repo, form spam protection, input validation.
- Analytics: track inquiries, email signups, CTA clicks, affiliate clicks.

## Recommended tech stack

- Framework: Next.js App Router or equivalent modern React framework.
- Styling: Tailwind CSS or CSS modules with design tokens.
- Content: MDX + JSON seed files for MVP; CMS later if needed.
- Forms: server action/API route, Resend/Formspree/HoneyBook/Zapier integration depending on stack.
- Deployment: Vercel or similar.
- Analytics: GA4, Search Console, optional Plausible/PostHog.
- Email: Flodesk, ConvertKit, MailerLite, or similar.
- CRM: HoneyBook if Maureen already uses it; otherwise keep integration abstract.

## Information architecture

### Home

Goal: route users into Bridal, Education, Journal, Favorites while keeping Bridal primary.

Sections:

1. Hero
2. Trust/review strip
3. Bridal services overview
4. Portfolio preview
5. Process overview
6. Prep guides CTA
7. Education teaser
8. Journal preview
9. About preview
10. Final CTA

### Bridal landing

Goal: convert wedding inquiries.

Sections:

1. Bridal hero
2. Service area
3. Services
4. Reviews
5. Portfolio
6. Wedding-day process
7. FAQs
8. Inquiry CTA

### Services

Goal: clarify service options and policies without overloading.

Include pricing only if confirmed.

### Portfolio

Goal: prove aesthetic and experience.

Filters:

- Hair + makeup
- Hair only
- Bridesmaids
- Elopements
- Beach weddings
- Curly hair
- Braids/updos
- St. Augustine
- Jacksonville
- Palm Coast

### Education

Phase 1 goal: waitlist and credibility, not full program sale.

Sections:

- For bridal beauty professionals
- What Maureen can help with
- Free checklist CTA
- Coming-soon mentorship
- Business blog links

### Favorites

Phase 1 goal: curated product index.

Sections:

- Bridal prep favorites
- Hair favorites
- Makeup favorites
- Fragrance
- Business tools
- Affiliate disclosure

## Schema requirements

- Organization schema for Maureen Ella.
- LocalBusiness/BeautySalon schema for the physical service business if details confirmed.
- Service schema for bridal hair/makeup service pages.
- Article schema for blog posts.
- FAQ schema only where eligible and visible to users.
- BreadcrumbList schema on nested pages.
- Product schema only for products if accurate and compliant.

## Acceptance criteria

- A bride can understand services and submit a complete inquiry in under 3 minutes.
- A search engine can crawl and index all public content.
- No unconfirmed business facts are treated as final.
- Legacy content has a migration/redirect plan.
- The codebase is ready for future education and affiliate expansion.
