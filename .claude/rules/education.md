# Education Rules (Phase 3)

Maureen Ella Education is mentorship/resources for bridal beauty professionals.
It launched (D005) as a full landing page + a free lead magnet + a waitlist.

- Keep Education self-contained under `/education`. It must never interrupt the
  bride inquiry funnel (D003) — no education CTAs inside bridal booking flows.
- **No prices, guarantees, or certification language** for any paid product,
  workshop, or program until Maureen confirms the offers and pricing (D005).
  Until then, products render as "in development" / "join waitlist" only
  (`upcomingProducts` in `content/education.ts`, shaped from
  `seed/education_offers.json`).
- Mentor positioning must stay honest — no invented years, client counts, awards,
  or credentials. Keep claims true to the brand as represented site-wide.
- Education content (copy, framework, checklist, products) lives in
  `content/education.ts`; the free lead magnet is the email-gated
  `/education/starter-checklist` (`components/forms/ChecklistGate.tsx`).
- Email capture uses the shared `joinWaitlist` action with `education*` list
  tags. Email 1 (welcome) is wired as a best-effort auto-responder; Emails 2–4
  need a chosen ESP drip — do not fake an automated sequence.
- Analytics: `lead_magnet_download` (checklist unlock), `education_cta_click`
  (checklist click-through), `education_waitlist_submit` (waitlist).
