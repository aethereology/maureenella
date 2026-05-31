/**
 * Journal article bodies. Advice/prep posts are authored in full (generic,
 * honest guidance). Real-wedding posts reference real couples, so their detailed
 * stories are left unpublished until Maureen provides/approves them — they show
 * as "coming soon" in the index rather than fabricating private details.
 */
import { blogPosts, type BlogPostMeta } from "@/lib/content";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Article = BlogPostMeta & {
  excerpt: string;
  /** Hero image under /public/images/journal; optional. */
  image?: string;
  /** Authored body. Empty array → treated as "coming soon". */
  body: Block[];
  /** ISO date if known. */
  datePublished?: string;
};

const BODIES: Record<string, { excerpt: string; image?: string; body: Block[] }> = {
  "curly-bridal-hair-prep": {
    excerpt:
      "Curly hair can hold beautiful, romantic bridal styles — the secret is preparation, not fighting your texture.",
    image: "/images/journal/curly-bridal-hair-prep.jpg",
    body: [
      {
        type: "p",
        text: "If you have curly or textured hair, your wedding-day style will look its best when your curls arrive healthy, hydrated, and prepped the way your stylist needs them. The goal is never to flatten who you are — it is to give your natural texture the foundation to be soft, defined, and long-lasting.",
      },
      { type: "h2", text: "In the weeks before" },
      {
        type: "ul",
        items: [
          "Keep your curls hydrated with regular conditioning and a weekly mask.",
          "Avoid any new chemical treatments or color services close to the wedding.",
          "Bring your curl routine to your bridal preview so we can plan around your real texture.",
        ],
      },
      { type: "h2", text: "The night before and morning of" },
      {
        type: "ul",
        items: [
          "Arrive with clean, fully dry hair unless your stylist tells you otherwise.",
          "Skip heavy oils or leave-in products on the day of styling.",
          "Bring any clip-ins, accessories, or your veil so we can style with them in mind.",
        ],
      },
      {
        type: "p",
        text: "Curly bridal hair photographs beautifully when it is prepped with intention. At your preview we will test the exact approach for your texture so your wedding morning feels calm and predictable.",
      },
    ],
  },
  "wedding-hair-extensions": {
    excerpt:
      "Extensions are a tool, not a requirement. Here is how to tell whether they will help your wedding hairstyle.",
    image: "/images/journal/wedding-hair-extensions.jpg",
    body: [
      {
        type: "p",
        text: "Hair extensions can add length, volume, and staying power to a bridal style — but they are not the right call for every bride. Whether you need them depends on your hair, your chosen style, and the look you are after.",
      },
      { type: "h2", text: "Extensions can help when" },
      {
        type: "ul",
        items: [
          "You want a fuller updo, braid, or half-up style than your natural density allows.",
          "Your hair is fine and you want a romantic, voluminous finish that holds all day.",
          "You are growing out a cut and want temporary length for the wedding.",
        ],
      },
      { type: "h2", text: "You may not need them when" },
      {
        type: "ul",
        items: [
          "Your hair already has the length and density your style requires.",
          "You are choosing a sleek or polished look that does not rely on added volume.",
        ],
      },
      {
        type: "p",
        text: "Clip-in extensions are the most flexible option for wedding day. If you plan to use them, bring them to your preview clean and ready so we can blend and secure them properly.",
      },
    ],
  },
  "lash-extensions-vs-false-lashes-wedding": {
    excerpt:
      "Lash extensions or strip lashes for your wedding day? Each has trade-offs around timing, comfort, and photos.",
    image: "/images/journal/lash-extensions-vs-false-lashes.jpg",
    body: [
      {
        type: "p",
        text: "Lashes frame your eyes in every close-up photo, so it is worth deciding early how you want to handle them. The two common paths are professional lash extensions applied before the wedding, or strip/individual lashes applied as part of your wedding-day makeup.",
      },
      { type: "h2", text: "Lash extensions" },
      {
        type: "ul",
        items: [
          "Applied by a lash artist days before the wedding — one less thing on the morning of.",
          "Require a fill schedule and gentle aftercare leading up to the day.",
          "Best booked well in advance and tested before you commit for the wedding.",
        ],
      },
      { type: "h2", text: "False (strip or individual) lashes" },
      {
        type: "ul",
        items: [
          "Applied during your makeup service, customized to your eye shape and look.",
          "No commitment in the weeks before — nothing to maintain.",
          "Removed easily at the end of the night.",
        ],
      },
      {
        type: "p",
        text: "There is no single right answer. If you love a low-maintenance morning and want a soft, photo-ready frame, day-of lashes are a reliable choice. If you want lashes handled before the wedding entirely, plan your extension appointments early. We will talk through it at your preview.",
      },
    ],
  },
  "wedding-morning-parking-hair-makeup-vendor": {
    excerpt:
      "Parking sounds like a small detail. On a wedding morning, it can quietly make or break your timeline.",
    image: "/images/journal/wedding-morning-parking.jpg",
    body: [
      {
        type: "p",
        text: "Your beauty team arrives with kits, chairs, lighting, and supplies — and a tight schedule. Where they can park and how far they have to carry everything directly affects how calmly your morning starts.",
      },
      { type: "h2", text: "What helps your team start on time" },
      {
        type: "ul",
        items: [
          "Confirm where vendors can park at your getting-ready location ahead of time.",
          "Note any gate codes, loading zones, parking passes, or resort vendor rules.",
          "Choose a getting-ready space with good natural light and an outlet nearby.",
          "Share the building, suite, or room number in advance.",
        ],
      },
      {
        type: "p",
        text: "These small logistics are part of how we plan a smooth beauty timeline. When you submit your inquiry, share what you know about your getting-ready location — we will help you sort out the rest.",
      },
    ],
  },
  "wedding-day-fragrance": {
    excerpt:
      "Scent is memory. Choosing a wedding-day fragrance is a quiet, lovely detail worth a little thought.",
    image: "/images/journal/wedding-day-fragrance.jpg",
    body: [
      {
        type: "p",
        text: "Years from now, a single note can take you straight back to your wedding morning. Choosing a fragrance for the day is a small ritual that many brides treasure.",
      },
      { type: "h2", text: "A few gentle tips" },
      {
        type: "ul",
        items: [
          "Test fragrances a few weeks ahead — never for the first time on the wedding day.",
          "Consider a scent that feels like a slightly elevated version of your everyday.",
          "Apply lightly so it does not overwhelm close moments or your partner.",
          "Some couples choose a shared or matching note as a private detail.",
        ],
      },
      {
        type: "p",
        text: "Whatever you choose, let it feel like you. The most memorable wedding-day scent is the one that already feels like home.",
      },
    ],
  },
  "wedding-day-lip-colors": {
    excerpt:
      "Your lip color shows up in nearly every photo. Here is how to choose one that lasts and looks like you.",
    image: "/images/journal/wedding-day-lip-colors.jpg",
    body: [
      {
        type: "p",
        text: "Lip color is one of the most photographed details of your bridal look, and it is also the one most likely to need a refresh through the day. Choosing the right shade and finish makes both look and longevity easier.",
      },
      { type: "h2", text: "Choosing your shade" },
      {
        type: "ul",
        items: [
          "A soft, elevated version of your natural lip reads timeless in photos.",
          "Consider your dress tone, bouquet, and overall palette.",
          "Test your shade at your preview so there are no surprises.",
        ],
      },
      { type: "h2", text: "Making it last" },
      {
        type: "ul",
        items: [
          "Long-wear formulas hold through the ceremony, toasts, and dinner.",
          "Keep your exact shade with you for quick touch-ups.",
          "Blot, do not wipe, after eating.",
        ],
      },
      {
        type: "p",
        text: "We will lock in your lip plan at your preview, including a touch-up shade you can carry for the reception.",
      },
    ],
  },
};

export function getArticles(): Article[] {
  return blogPosts.map((post) => {
    const authored = BODIES[post.slug];
    return {
      ...post,
      excerpt:
        authored?.excerpt ??
        "This story is being written. Check back soon for the full post.",
      image: authored?.image,
      body: authored?.body ?? [],
    };
  });
}

export function getArticle(slug: string): Article | undefined {
  return getArticles().find((a) => a.slug === slug);
}

/** Slugs with authored bodies — used to gate which posts are clickable. */
export function isPublished(article: Article): boolean {
  return article.body.length > 0;
}
