/**
 * Journal Autopilot gate. Run with `npm run validate:journal`.
 *
 * Checks every post in content/journalAutopilot.ts (plus a few site-wide
 * invariants) and exits non-zero on any problem. The scheduled routine must not
 * push to main unless this passes. See journal-autopilot/RUNBOOK.md.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { AUTOPILOT_BODIES } from "../content/journalAutopilot.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p: string) => fs.readFileSync(path.join(ROOT, p), "utf8");
const exists = (p: string) => fs.existsSync(path.join(ROOT, p));

type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };
type Seed = { slug: string; title: string; category: string; priority: string };
type Photo = { id: string; file: string; usedBy: string | null; usedOn: string | null };
type Topic = { slug: string; status: string; publishedSlug: string | null };

const problems: string[] = [];
const fail = (msg: string) => problems.push(msg);

const seed: Seed[] = JSON.parse(read("seed/blog_posts.json"));
const photos: Photo[] = JSON.parse(read("journal-autopilot/photos.json"));
const topics: Topic[] = JSON.parse(read("journal-autopilot/topics.json"));
const BRAND = " | Maureen Ella";
const CATEGORIES = new Set(["bridal-prep", "beauty-favorites", "planning-etiquette", "real-weddings"]);

// Today in the business's timezone (YYYY-MM-DD).
const today = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/New_York",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());

// ---- Site-wide invariants -------------------------------------------------
const seedSlugs = seed.map((s) => s.slug);
for (const s of seedSlugs.filter((s, i) => seedSlugs.indexOf(s) !== i)) fail(`seed: duplicate slug ${s}`);

const contentFiles = fs.readdirSync(path.join(ROOT, "content")).filter((f) => f.startsWith("journal") && f.endsWith(".ts"));
const heroImages = contentFiles.flatMap((f) => [...read(`content/${f}`).matchAll(/\bimage: "([^"]+)"/g)].map((m) => m[1]));
for (const img of heroImages.filter((x, i) => heroImages.indexOf(x) !== i)) fail(`duplicate hero image across Journal: ${img}`);

const usedBy = photos.map((p) => p.usedBy).filter(Boolean) as string[];
for (const u of usedBy.filter((x, i) => usedBy.indexOf(x) !== i)) fail(`photos.json: two photos marked usedBy ${u}`);
for (const p of photos) {
  if (p.usedBy) {
    if (exists(p.file)) fail(`photos.json: ${p.id} is marked used but still sits in the pool (move it with git mv)`);
    if (!exists(`public/images/journal/${p.usedBy}.jpg`)) fail(`photos.json: ${p.id} usedBy ${p.usedBy} but public/images/journal/${p.usedBy}.jpg is missing`);
  } else if (!exists(p.file)) {
    fail(`photos.json: ${p.id} is unused but ${p.file} is missing`);
  }
}
for (const t of topics) {
  if (!["queued", "published", "skipped"].includes(t.status)) fail(`topics.json: ${t.slug} has bad status ${t.status}`);
  if (t.status === "published" && !(t.publishedSlug && seedSlugs.includes(t.publishedSlug)))
    fail(`topics.json: ${t.slug} is published but publishedSlug is not in seed`);
}

// Internal link targets.
const staticRoutes = new Set<string>();
(function walk(dir: string, route: string) {
  for (const e of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (e.name.startsWith("[") || e.name.startsWith("_")) continue;
      const seg = e.name.startsWith("(") ? "" : `/${e.name}`;
      walk(`${dir}/${e.name}`, route + seg);
    } else if (e.name === "page.tsx") {
      staticRoutes.add(route || "/");
    }
  }
})("app", "");
for (const a of JSON.parse(read("seed/service_areas.json")) as { plannedPage: string }[]) staticRoutes.add(a.plannedPage);
for (const m of read("content/prepGuides.ts").matchAll(/^\s+slug: "([a-z-]+)",/gm)) staticRoutes.add(`/bridal/prep-guides/${m[1]}`);
staticRoutes.delete("/pricing/new");
staticRoutes.delete("/thank-you");
const publishedJournal = new Set(
  contentFiles.flatMap((f) => [...read(`content/${f}`).matchAll(/^ {2}"([a-z0-9-]+)": \{/gm)].map((m) => m[1])),
);

// Private pricing (D013/D014): exact amounts and collection names from content/pricing.ts.
const pricingSrc = read("content/pricing.ts");
const privateAmounts = [...new Set([...pricingSrc.matchAll(/price: "[^"]*?(\$[\d,]+)/g)].map((m) => m[1]))];
const collectionNames = [...pricingSrc.matchAll(/name: "([^"]+)"/g)].map((m) => m[1]);

const BANNED: [RegExp, string][] = [
  [/\bguarantee(d|s)?\b/i, "guarantee language"],
  [/\bcertifi(ed|cation)\b/i, "certification language"],
  [/\baward[- ]winning\b/i, "award claim"],
  [/\b\d+\+? years of experience\b/i, "experience-years claim"],
  [/\b\d[\d,]*\+? (happy )?(brides|clients|weddings|couples) (served|styled|booked)\b/i, "client-count claim"],
  [/\b(5|five)[- ]star\b/i, "star-rating claim"],
  [/\b(best|top|#1|number one) (bridal|wedding) (makeup artist|hair ?stylist|artist|team)\b/i, "superlative claim"],
  [/https?:\/\//i, "raw URL in copy"],
];

// ---- Per-post checks ------------------------------------------------------
const report: string[] = [];
for (const [slug, post] of Object.entries(AUTOPILOT_BODIES)) {
  const p = (m: string) => fail(`${slug}: ${m}`);
  const meta = seed.find((s) => s.slug === slug);
  if (!meta) p("missing from seed/blog_posts.json");
  else {
    if (!CATEGORIES.has(meta.category)) p(`category "${meta.category}" not allowed for autopilot`);
    if (meta.title.length < 20 || meta.title.length > 90) p(`seed title is ${meta.title.length} chars (20-90)`);
  }
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) p("slug must be lowercase-hyphenated");

  const title = (post.metaTitle ?? meta?.title ?? "") + BRAND;
  if (title.length > 62) p(`<title> is ${title.length} chars incl. brand (max 62)`);
  if (post.excerpt.length < 120 || post.excerpt.length > 170) p(`excerpt is ${post.excerpt.length} chars (120-170)`);

  if (post.image !== `/images/journal/${slug}.jpg`) p(`image must be /images/journal/${slug}.jpg`);
  else if (!exists(`public${post.image}`)) p("hero image file missing");
  if (!photos.some((ph) => ph.usedBy === slug)) p("no photos.json entry marked usedBy this slug");
  if (!post.imageAlt || post.imageAlt.length < 20) p("imageAlt missing or too short");
  if (!post.imagePosition) p("imagePosition missing");

  if (!post.datePublished || !/^\d{4}-\d{2}-\d{2}$/.test(post.datePublished)) p("datePublished must be YYYY-MM-DD");
  else if (post.datePublished > today) p(`datePublished ${post.datePublished} is in the future (today ${today})`);

  const body = post.body as Block[];
  if (body[0]?.type !== "p") p("body must open with a direct-answer paragraph");
  const h2s = body.filter((b) => b.type === "h2").map((b) => (b as { text: string }).text);
  if (h2s.length < 3) p(`only ${h2s.length} h2 sections (min 3)`);
  for (const b of body) {
    if (b.type === "ul" ? !b.items.length || b.items.some((i) => !i.trim()) : !b.text?.trim()) p(`empty ${b.type} block`);
  }
  const text = [
    ...body.map((b) => (b.type === "ul" ? b.items.join(" ") : b.text)),
    ...(post.faqs ?? []).flatMap((f) => [f.question, f.answer]),
    post.excerpt,
  ].join("\n");
  const words = body.map((b) => (b.type === "ul" ? b.items.join(" ") : b.text)).join(" ").split(/\s+/).length;
  if (words < 700) p(`only ${words} words (min 700)`);

  const faqs = post.faqs ?? [];
  if (faqs.length < 3 || faqs.length > 6) p(`${faqs.length} FAQs (3-6)`);
  for (const f of faqs) {
    if (!f.question.trim().endsWith("?")) p(`FAQ question should end with "?": ${f.question}`);
    if (f.answer.length < 40) p(`FAQ answer too short: ${f.question}`);
  }

  const links = post.relatedLinks ?? [];
  if (links.length < 2 || links.length > 4) p(`${links.length} relatedLinks (2-4)`);
  for (const l of links) {
    const ok = l.href.startsWith("/journal/") ? publishedJournal.has(l.href.slice(9)) : staticRoutes.has(l.href);
    if (!ok) p(`relatedLink does not resolve to a live page: ${l.href}`);
    if (l.href === `/journal/${slug}`) p("relatedLink points to itself");
  }

  // Money guard.
  if (/\$\s?\d/.test(text)) {
    const si = h2s.indexOf("Sources");
    const after = si >= 0 ? body[body.findIndex((b) => b.type === "h2" && b.text === "Sources") + 1] : undefined;
    if (!after || after.type !== "ul") p('mentions dollar amounts but has no "Sources" h2 followed by a list (D015)');
  }
  for (const sentence of text.split(/(?<=[.!?])\s+|\n/)) {
    if (!/\$\s?\d/.test(sentence)) continue;
    if (/\b(Maureen|our|we|us|my|I)\b/.test(sentence)) p(`dollar figure in a first-party sentence (looks like our own pricing): "${sentence.slice(0, 120)}"`);
    for (const amt of privateAmounts) if (new RegExp(`\\${amt}(?![\\d,])`).test(sentence) && /starting at/i.test(sentence)) p(`private price pattern: "${sentence.slice(0, 120)}"`);
  }
  for (const name of collectionNames) if (text.includes(name)) p(`names a private collection: ${name}`);
  for (const [re, label] of BANNED) if (re.test(text)) p(`${label}: ${text.match(re)?.[0]}`);

  report.push(`${slug.padEnd(50)} title ${String(title.length).padStart(2)}  desc ${String(post.excerpt.length).padStart(3)}  words ${String(words).padStart(4)}  faqs ${faqs.length}  ${post.datePublished}`);
}

const unused = photos.filter((p) => !p.usedBy).length;
const queued = topics.filter((t) => t.status === "queued").length;
console.log(report.length ? report.join("\n") : "(no autopilot posts yet)");
console.log(`\nPhoto pool: ${unused} unused of ${photos.length}.  Topic queue: ${queued} queued.`);
if (unused < 6) console.log("WARNING: photo pool is running low — stage more photos (see journal-autopilot/RUNBOOK.md).");

if (problems.length) {
  console.error(`\nFAILED (${problems.length}):\n- ` + problems.join("\n- "));
  process.exit(1);
}
console.log("\nAll Journal checks passed.");
