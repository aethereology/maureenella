# Journal Autopilot runbook

A scheduled cloud routine runs this every **Monday, Wednesday, and Friday at
9:00 AM ET**. Each run writes **one** Journal post that answers a real question
brides search for, validates it, and pushes it to `main`. Vercel then deploys it
to maureenella.com automatically. No human reviews it before it goes live, so
every rule below is a hard rule.

If any step says **STOP**, end the run without pushing to `main` and explain why
in your final message.

## 0. Context (read first, every run)

- `CLAUDE.md`: what the business is, plus the gating rule (never publish
  unconfirmed business facts).
- `.claude/rules/seo.md` and `.claude/rules/content-strategy.md`.
- `docs/DECISIONS.md`: D004, D013, D014, and D015 (pricing stays private;
  third-party cost data may be cited with a named source).
- Two style models in `content/journalBrideQuestions.ts`:
  `"wedding-hair-and-makeup-order"` for structure and voice, and
  `"average-cost-of-wedding-hair-and-makeup"` for cited figures and the Sources
  list.
- `content/journalAutopilot.ts`: earlier autopilot posts. Match their quality,
  but don't repeat them.

Maureen Ella is a bridal hair and makeup artist serving St. Augustine,
Jacksonville, Palm Coast, and Northeast Florida, plus destination weddings.
Readers are brides planning a wedding.

## 1. Set up and check whether today is already done

```bash
git checkout main && git pull --ff-only origin main
TODAY=$(TZ=America/New_York date +%F)
[ -d node_modules ] || npm ci
```

If any post in `content/journalAutopilot.ts` already has
`datePublished: "$TODAY"`, **STOP** ("already published today").

## 2. Pick the topic

1. Open `journal-autopilot/topics.json`. Take the **first** entry with
   `"status": "queued"`.
2. If its `slug` already exists in `seed/blog_posts.json`, mark the entry
   `"skipped"` and take the next one.
3. Read every post listed in its `avoidOverlapWith`. Your post must answer a
   *different* question from theirs (no keyword cannibalization) and should link
   to the closest one.
4. **Refill the queue when it's low.** If fewer than 6 entries are still queued
   after this pick:
   - Use WebSearch to find real questions brides ask Google ("People also ask",
     related searches) about bridal hair, makeup, beauty prep, and wedding-day
     etiquette.
   - Append 8 new entries in the same JSON shape. Every new entry must:
     - Not overlap any existing post or queued topic.
     - Not be about Maureen's own prices.
     - Fit one of the categories `bridal-prep`, `beauty-favorites`, or
       `planning-etiquette`.

## 3. Pick a unique hero photo

1. Open `journal-autopilot/photos.json`. Unused photos are those with
   `"usedBy": null`.
2. If there are no unused photos, **STOP** ("photo pool empty, stage more
   photos"). Never reuse a photo that's already on the site, and never publish a
   post without a hero.
3. Shortlist the 2 or 3 photos whose `description` best fits the topic. **Look
   at each one** with the Read tool (at least 2, even if the first seems right),
   then choose the best fit. Prefer photos of brides or wedding-morning work
   over portraits of Maureen when both fit equally well.
4. Move the chosen photo into place and record it:

   ```bash
   git mv journal-autopilot/photos/<id>.jpg public/images/journal/<slug>.jpg
   ```

   In `photos.json`, set `"usedBy": "<slug>"` and `"usedOn": "<TODAY>"`.
5. Write `imageAlt` (20 to 160 characters) from what is actually in the photo.
   - Name Maureen only when the description says the person is Maureen.
   - Never name brides or clients.
6. Set `imagePosition`. The hero is a 3:2 `object-fit: cover` crop.
   - Portrait photos usually need `"center 40%"` or `"center 30%"` so faces
     stay in frame.
   - Landscape photos usually need `"center"`.

## 4. Research

- **Research is required every run, even when the post will have no numbers.**
  Run at least 3 WebSearch queries, including the exact bride question, and read
  at least 2 relevant pages with WebFetch. Use them to check facts, current
  norms, and timelines, and to see what top results cover so the post answers
  the question better and more completely. Never copy their wording.
- Note the queries you ran in the commit message (`Research:` line).
- **Include a number, statistic, price range, or percentage only if you fetched
  its source page in this run and the figure appears there.**
  - Name the source and year in the sentence, for example: "Zola's 2026 data
    puts...".
  - Then list every source under a final `Sources` h2 as a `ul`, each formatted
    as `"Publisher, Title (Month D, YYYY)."` or
    `"Publisher, Title (accessed Month YYYY)."`.
  - Never put URLs in the copy.
- If you can't verify a figure, write the section without numbers.
- Skin, hair-health, or diet topics: give general guidance only. No medical
  claims. Refer readers to a dermatologist, a licensed esthetician, or their
  doctor where appropriate.

## 5. Write the post

Add it as the **last** entry of `AUTOPILOT_BODIES` in
`content/journalAutopilot.ts`, in the same shape as the style models.

| Field | Rule |
| --- | --- |
| slug | The topic's `slug`, lowercase and hyphenated. |
| seed `title` (the H1) | The bride's question, or a natural headline built on it. 20 to 90 characters. |
| `metaTitle` | **47 characters or fewer.** The site appends " \| Maureen Ella". Lead with the main keyword. |
| `excerpt` | 120 to 170 characters. Doubles as the meta description. It should answer the question, not tease it. |
| `image` | `/images/journal/<slug>.jpg` |
| `datePublished` | `TODAY`. No `dateModified`. |
| `body[0]` | A `p` block that answers the question directly in 2 to 4 sentences. |
| body | 4 to 7 `h2` sections, mostly phrased as questions brides ask. Use `ul` lists where they help scanning. **900 to 1,400 words.** Block types are only `p`, `h2`, and `ul`. No markdown and no inline links. |
| Local relevance | Mention Northeast Florida (St. Augustine, Jacksonville, Palm Coast, Ponte Vedra, Amelia Island, beach and humidity realities) where it is genuinely useful. Never keyword-stuff. |
| Final `p` (before Sources) | A short, calm invitation in the style of the models. Mention Maureen Ella's service area and invite the reader to share their date and details when they **request availability**. No pressure and no hype. |
| `faqs` | 4 entries. Each question ends in "?" and each answer is 40 or more characters. They render visibly on the page and feed FAQ schema, so each must add something beyond the body. |
| `relatedLinks` | 3 entries. At least one goes to `/bridal/services` or `/contact`. The others go to the most relevant **published** Journal posts or prep guides (`/bridal/prep-guides/hair-prep`, `makeup-prep`, `trial-prep`). |

Append the seed entry to the end of `seed/blog_posts.json`:
`{ "slug", "title", "category": <topic category>, "priority": "high" }`.

In `topics.json`, set the topic's `"status": "published"`,
`"publishedSlug": "<slug>"`, and `"publishedOn": "<TODAY>"`.

### Voice

The voice is warm, practical, expert, and plain-spoken, like an experienced
artist talking a bride through it.

- Keep sentences short.
- Avoid em dashes; use commas or periods instead.
- No buzzwords ("elevate", "stunning transformation", "unlock").

### Never

- Maureen Ella's prices, collection names, deposits, retainers, minimums, or
  travel or touch-up fees. Pricing is shared privately after an inquiry; say so
  if the topic touches cost.
- Invented reviews, testimonials, client stories, client counts, years of
  experience, awards, certifications, or guarantees.
- Phone numbers, emails, addresses, hours, or policies.
- Product affiliate links, or Education and mentorship CTAs inside the post.
- Edits to any other post, component, `lib/site.ts`, `lib/permissions.ts`,
  `content/pricing.ts`, `scripts/validate-journal.ts`, or this runbook.

## 6. Verify (all must pass)

```bash
npm run typecheck
npm run validate:journal
npm run build
```

1. Fix *the post* and re-run until all three pass. Allow up to 3 rounds.
2. Never weaken the validator.
3. Then re-read the whole post once as an editor:
   - Every figure matches a source you fetched.
   - It answers the question in the first paragraph.
   - None of the "Never" rules is broken.

If the checks still fail after 3 rounds, go to 7b.

## 7. Publish

**7a. All checks pass.** Stage only the files this run touched:

```bash
git add content/journalAutopilot.ts seed/blog_posts.json journal-autopilot/topics.json journal-autopilot/photos.json public/images/journal/<slug>.jpg journal-autopilot/photos/<id>.jpg
git commit -m "content(journal): <title> (autopilot)" -m "Topic: <question>
Photo: <id>
Sources: <publishers, or 'none'>
Research: <the search queries you ran>"
git push origin HEAD:main
```

- If the push is rejected because `main` moved, run
  `git pull --rebase origin main`, then re-run `npm run validate:journal` and
  `npm run build`, then push again.
- Never force-push.

**7b. Checks fail, or the push is still rejected.** Push the work to a branch
instead and **do not touch `main`**:

```bash
git push origin HEAD:claude/journal-autopilot-$TODAY
```

## 8. Final message

Report:

- Published or not.
- Title and URL (`https://maureenella.com/journal/<slug>`).
- Photo used.
- Sources cited.
- Photos left in the pool and topics left in the queue.
- Any warning. Always warn when fewer than 6 photos remain.

## Maintenance (humans)

- **Restock photos:** export more unique, web-sized photos into
  `journal-autopilot/photos/` (2000px long edge, mozjpeg q82) and add entries to
  `photos.json`.
  - Check them against every image already on the site with a perceptual hash
    before adding.
  - Never re-add a photo that's already on the site.
- **Steer topics:** edit `topics.json`. The order is the publishing order.
- **Pause:** disable the routine at https://claude.ai/code/routines.
