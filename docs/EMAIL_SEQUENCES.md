# Email Sequences

## Bridal inquiry autoresponder

**Implemented** (D013) — `emails/InquiryAutoresponder.tsx`, sent by
`lib/email.tsx` from `app/actions/inquiry.ts`. Not a draft; edit the component.

Subject: Your bridal pricing guide — Maureen Ella
From: Maureen Ella <inquiries@maureenella.com> · Reply-to: maureen@theparlor.info

Contents: greeting by first name; confirmation of what she submitted (date,
location, services); a private pricing-guide link valid 90 days; a Calendly
booking button; a note that the inquiry does not reserve her date; portfolio and
prep-guide links; contact details; the recognition badges.

Degraded mode: when `PRICING_LINK_SECRET` is unset the pricing block is omitted
and the Calendly button still sends.

## Bridal nurture after availability confirmation

Email 1: Your date is available - next steps

- Confirm availability.
- Share estimate or next step.
- Explain signed agreement and date reservation.
- Link to FAQ.

Email 2: What to expect from your bridal preview

- Explain preview purpose.
- Link to trial prep guide.
- Ask for inspo photos and dress/neckline details.

Email 3: Wedding morning timeline tips

- Explain service timing.
- Mention ready-by time.
- Mention parking/logistics.
- Link to parking checklist.

## Education waitlist sequence

Email 1: Welcome to Maureen Ella Education

- Maureen story.
- What education will cover.
- Ask what the artist is struggling with.

Email 2: The bridal inquiry system

- Why inquiry workflows matter.
- Tease templates.

Email 3: Wedding morning organization

- Timeline and service minimums.
- Why systems create confidence.

Email 4: Pricing and boundaries

- Encourage clarity.
- Invite to workshop/waitlist.

## Post-wedding review request

Subject: Thank you for trusting Maureen Ella

Hi {{first_name}},

Thank you for allowing us to be part of your wedding morning. It was an honor to help you and your loved ones get ready for such a meaningful day.

If you loved your experience, your Google review would mean so much and help future brides feel confident choosing Maureen Ella.

Review link: {{review_link}}

Warmly,
Maureen
