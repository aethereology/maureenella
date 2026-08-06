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
  /** Optional shorter search/social title; the on-page H1 remains `title`. */
  metaTitle?: string;
  /** Hero image under /public/images/journal; optional. */
  image?: string;
  /** Descriptive alt text for the editorial image. */
  imageAlt?: string;
  /** CSS object-position for the hero image crop; defaults to center. */
  imagePosition?: string;
  /** Authored body. Empty array → treated as "coming soon". */
  body: Block[];
  /** ISO date if known. */
  datePublished?: string;
  /** ISO date for a substantive revision. */
  dateModified?: string;
  /** Visible FAQ content that may also be used for structured data. */
  faqs?: { question: string; answer: string }[];
  /** Curated internal links that help readers continue their planning. */
  relatedLinks?: { href: string; title: string; description: string }[];
};

const BODIES: Record<
  string,
  {
    excerpt: string;
    metaTitle?: string;
    image?: string;
    imageAlt?: string;
    imagePosition?: string;
    body: Block[];
    datePublished?: string;
    dateModified?: string;
    faqs?: { question: string; answer: string }[];
    relatedLinks?: { href: string; title: string; description: string }[];
  }
> = {
  "curly-bridal-hair-prep": {
    excerpt:
      "Curly hair can hold beautiful, romantic bridal styles — the secret is preparation, not fighting your texture.",
    image: "/images/journal/curly-bridal-hair-prep.jpg",
    imagePosition: "top",
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
    imagePosition: "top",
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

  // --- D011 migration: bridal prep + beauty favorites (Batch B) ---
  "bridal-hair-prep-guide": {
  image: "/images/journal/bridal-hair-prep-guide.jpg",
  excerpt:
    "Your wedding hairstyle starts long before the first pin goes in. Here is how I think about hair prep — and why arriving prepared changes everything.",
  datePublished: "2023-08-14",
  body: [
    {
      type: "p",
      text: "One of the first questions brides ask me is some version of: what should I do to my hair before the wedding? It is a good question, because the style you see in photos — the soft updo, the cascading curls, the sleek low bun — is only half technique. The other half is the canvas. Hair that arrives healthy, clean, and prepped the right way holds a style through a first look, a ceremony, a dance floor, and a hundred hugs. Hair that arrives coated in product or freshly conditioned fights me all morning.",
    },
    {
      type: "p",
      text: "Prep is not about perfection. It is about giving your stylist a predictable starting point, so the time we have on your wedding morning goes into artistry instead of correction.",
    },
    { type: "h2", text: "It starts at your preview" },
    {
      type: "p",
      text: "Your bridal preview is where the real planning happens. I assess your hair's type, texture, length, and density, and we talk honestly about what your dream style needs from your hair — and what your hair needs from you in the weeks ahead. Sometimes that means deep conditioning and a trim. Sometimes it means planning around humidity, a veil, or an heirloom comb. Every recommendation I make afterward is specific to you, which is why I never hand every bride the same list.",
    },
    { type: "h2", text: "The habits that matter most" },
    {
      type: "ul",
      items: [
        "Keep your hair healthy in the months before — regular trims and conditioning treatments do more for your wedding style than any single product.",
        "Wash the night before or the morning of, with shampoo only. Skipping conditioner sounds counterintuitive, but squeaky-clean hair grips pins and holds curl far better.",
        "Blow-dry upside down, ideally with a root-lifting product, so your hair arrives with natural body at the roots instead of lying flat.",
        "Bring your veil and any accessories to both your preview and your wedding morning so we can build the style around them.",
        "Tell me about anything that changed — new color, a cut, a treatment — before the wedding, not in the chair.",
      ],
    },
    { type: "h2", text: "Why 'shampoo only' is my most repeated tip" },
    {
      type: "p",
      text: "Conditioner leaves a soft, slippery finish that is lovely for everyday hair and terrible for bridal styling. Curls slide out, pins migrate, and volume collapses by the ceremony. Clean, conditioner-free hair with a little natural texture is the foundation every long-lasting bridal style is built on. If your hair genuinely needs conditioner to be manageable, we will talk about it at your preview — that is exactly what the preview is for.",
    },
    {
      type: "p",
      text: "If you like having a checklist to follow, there is a step-by-step wedding morning hair prep guide on the site that walks through the weeks before, the day before, and the morning of. But the short version is simple: healthy hair, clean hair, honest communication, and accessories in hand. Do those four things, and your hairstyle will still look like the photos when the last song plays.",
    },
  ],
},

"bridal-makeup-prep-guide": {
  image: "/images/journal/bridal-makeup-prep-guide.jpg",
  excerpt:
    "Flawless wedding makeup begins with calm skin and a calm morning. My advice on skincare, hydration, and setting up a wedding morning that works in your favor.",
  datePublished: "2023-08-01",
  body: [
    {
      type: "p",
      text: "Wedding makeup that photographs beautifully at eight in the morning and still looks fresh at midnight is not a trick of the products alone. It starts with your skin — and with a wedding morning that is set up so you can actually sit still, breathe, and enjoy being made up. As a bridal makeup artist, I can adapt to almost anything, but the brides whose makeup looks effortless are almost always the ones whose skin arrived calm and whose morning arrived organized.",
    },
    { type: "h2", text: "Skin first, always" },
    {
      type: "p",
      text: "In the weeks before your wedding, consistency beats intensity. A gentle cleanser, a toner if you use one, and a moisturizer you already trust, morning and night — that steady routine does more than any last-minute facial. Hydration matters too, and not just topically: drinking water and eating water-rich foods shows up in your skin, while too much caffeine and alcohol in the final days tends to show up as dullness and dehydration. And please exfoliate your lips gently and keep balm on them; lipstick can only be as smooth as the lips underneath.",
    },
    { type: "h2", text: "What to avoid before the big day" },
    {
      type: "ul",
      items: [
        "No new skincare or makeup products in the final weeks — your wedding morning is not the time to discover a sensitivity.",
        "Patch test anything unfamiliar well in advance, especially if your skin is reactive.",
        "Skip aggressive treatments, peels, or first-time facials close to the wedding.",
        "Arrive with a completely clean, moisturized face — no leftover mascara, no SPF with heavy silicones unless we have discussed it.",
      ],
    },
    { type: "h2", text: "Set the room up to work for you" },
    {
      type: "ul",
      items: [
        "Choose a spot with good natural light and a comfortable chair — it genuinely affects the final result.",
        "Wear a robe or a button-down so nothing gets pulled over your finished face and hair.",
        "Have your inspiration photos saved and ready, even if we already covered them at your preview.",
        "Keep your accessories, earrings, and anything else for photos in one place so no one is hunting for them mid-morning.",
      ],
    },
    {
      type: "p",
      text: "The step-by-step version of all of this lives in the makeup prep guide on the site, broken down by weeks before, the day before, and the morning of. But the heart of it is this: take care of your skin, change nothing at the last minute, and give yourself a calm, well-lit corner of the morning. Then your only job in my chair is to relax — the rest is mine.",
    },
  ],
},

"bridal-hair-accessories-veil-heirlooms": {
  image: "/images/journal/bridal-hair-accessories-veil-heirlooms.jpg",
  excerpt:
    "From cathedral veils to a grandmother's comb, the right accessory finishes a bridal look. How to choose pieces that feel like you — and carry meaning.",
  datePublished: "2023-09-01",
  body: [
    {
      type: "p",
      text: "Some of my favorite moments in the chair have nothing to do with hair. They happen when a bride unwraps her grandmother's comb, or lifts a cathedral veil out of its box for the first time, and the whole room goes quiet. Accessories are small things, but they carry the most weight — tradition, family, personality — and they deserve as much thought as the hairstyle itself.",
    },
    { type: "h2", text: "The veil: an old tradition, worn your way" },
    {
      type: "p",
      text: "Veils are one of the oldest pieces of wedding attire we still wear. In ancient traditions they symbolized protection and modesty, concealing the bride until the moment of marriage. Today the meaning has softened into something more personal: a veil is romance, drama, movement in photographs. A cathedral-length veil turns a simple gown into something cinematic. A birdcage veil brings a chic, vintage sensibility. Lace edges, beading, and floral appliqués can echo details from your dress. And choosing no veil at all is just as valid — plenty of modern brides let the hair and the gown speak for themselves, and it reads as confident, not incomplete.",
    },
    { type: "h2", text: "Accessories beyond the veil" },
    {
      type: "ul",
      items: [
        "Hairpins and jeweled combs — the easiest way to add sparkle to an updo without overwhelming it.",
        "Hair vines — flexible, delicate, and beautiful woven through braids and half-up styles.",
        "Headbands and tiaras — a statement choice that works best when the rest of the look stays soft.",
        "Fresh or silk florals — romantic for garden and coastal weddings, and easy to personalize with your bouquet.",
      ],
    },
    { type: "h2", text: "The heirloom touch" },
    {
      type: "p",
      text: "If your family has a piece — a comb, a pin, a veil worn by your mother — consider building it into your look, even in a small way. Heirloom accessories add something no boutique can sell: a thread of family history woven literally into your hair. I have tucked heirloom combs into modern low buns and re-wired vintage pins to sit securely in soft waves. Almost anything can be made to work if I see it in advance.",
    },
    {
      type: "p",
      text: "Whatever you choose, bring it to your bridal preview. The style, the veil placement, and the accessories should be designed together, not assembled on the morning of. When the pieces are chosen with intention, the finished look feels less like decoration and more like you — with a little history pinned in.",
    },
  ],
},

"sunless-tanning-before-wedding": {
  image: "/images/journal/sunless-tanning-before-wedding.jpg",
  excerpt:
    "A sunless tan can give you a warm, even glow without the sun damage — but timing and testing are everything. Here is how to do it safely before your wedding.",
  datePublished: "2023-08-14",
  body: [
    {
      type: "p",
      text: "Plenty of brides want a sun-kissed glow for the wedding, especially for a beach or outdoor ceremony here in Florida. My honest advice: skip the sun and the tanning bed entirely, and if you want color, get it from a bottle. Modern sunless tanning lotions can give a warm, even, believable tan — but only if you treat them like part of your beauty plan, not a last-minute impulse.",
    },
    { type: "h2", text: "Why sunless wins for brides" },
    {
      type: "ul",
      items: [
        "You control the depth — gradual formulas build color slowly, so you can stop exactly where you like it.",
        "No sun damage, no burn risk, and no tan lines that fight your neckline.",
        "It works on your schedule, applied at home in the evenings rather than around the weather.",
        "The active ingredient in most formulas, DHA, tints only the surface of the skin — which is exactly why testing and timing matter.",
      ],
    },
    { type: "h2", text: "The rules I ask every bride to follow" },
    {
      type: "ul",
      items: [
        "Do a full trial run weeks before the wedding — same product, same routine, same amount — so there are no surprises.",
        "Never try a new tanning product for the first time in wedding week.",
        "Exfoliate before applying and moisturize daily after, so the color fades evenly instead of patching.",
        "Go lighter than you think — cameras exaggerate warmth, and your makeup will add glow too.",
        "Tell your makeup artist. I match foundation and body makeup to your actual skin tone on the day, so I need to know a tan is part of the plan.",
      ],
    },
    { type: "h2", text: "Timing it with your beauty schedule" },
    {
      type: "p",
      text: "If you are doing a bridal preview, wear your test tan to it — that way your trial makeup is matched to wedding-day you, not everyday you. For the wedding itself, apply your final coat a couple of days out, not the night before, so the color settles and any excess washes off before you put on white.",
    },
    {
      type: "p",
      text: "A sunless tan done thoughtfully looks like you came back from a lovely vacation. Done in a panic on Thursday night, it looks like a Thursday-night decision. Give it the same rehearsal you give everything else about the day, and it will be one more thing you do not have to think about on the morning.",
    },
  ],
},

"bridal-makeup-sensitive-skin": {
  image: "/images/journal/bridal-makeup-sensitive-skin.jpg",
  excerpt:
    "Sensitive skin does not have to limit your bridal look. Gentle formulas — like Honest Beauty's — plus patch testing and smart timing keep reactive skin calm and camera-ready.",
  datePublished: "2023-09-11",
  body: [
    {
      type: "p",
      text: "If your skin flushes, stings, or breaks out at the first sign of a new product, wedding makeup can feel like a minefield. It does not have to be. Sensitive skin simply asks for two things: gentler formulas and zero surprises. Get those right and you can wear a full, long-wearing bridal face without a single angry patch.",
    },
    { type: "h2", text: "Why I like Honest Beauty for reactive skin" },
    {
      type: "p",
      text: "One line I have genuinely reached for with sensitive-skinned brides is Honest Beauty. Their formulas lean on soothing, skin-friendly ingredients — chamomile, jojoba oil, aloe vera, shea butter — and skip a lot of the common irritants that make reactive skin unhappy. The finish is soft and natural, which happens to be exactly what most brides want anyway.",
    },
    { type: "h2", text: "Pieces worth trying" },
    {
      type: "ul",
      items: [
        "A hydrating primer to create a calm, smooth base before anything else touches your skin.",
        "Their CC cream for light, breathable coverage that evens tone without feeling like a mask.",
        "A neutral eyeshadow palette in soft, wearable tones that flatter without heavy pigments.",
        "Mascara with a lash primer built in, for definition that does not flake into sensitive eyes.",
        "A comfortable liquid lipstick that wears for hours without drying or cracking.",
        "A light setting spray to lock everything in place without tightness.",
      ],
    },
    { type: "h2", text: "The non-negotiables for sensitive skin" },
    {
      type: "ul",
      items: [
        "Patch test everything — even 'clean' and 'gentle' products — at least a few weeks before the wedding.",
        "Introduce nothing new in wedding week. Your preview is the deadline for experiments.",
        "If your skin has a history of significant reactions, loop in a dermatologist before changing your routine.",
        "Tell your makeup artist exactly what your skin reacts to. I keep sensitive-skin options in my kit, but I can only plan around what I know.",
      ],
    },
    {
      type: "p",
      text: "Gentle does not mean less beautiful. Some of the most luminous bridal skin I have ever painted belonged to brides with the most reactive complexions — because we planned early, tested everything, and let calm skin do half the work.",
    },
  ],
},

"personalized-bridal-beauty-gifts": {
  image: "/images/journal/personalized-bridal-beauty-gifts.jpg",
  excerpt:
    "An engraved lipstick or fragrance turns a beauty product into a keepsake. Why personalized pieces — like YSL Beauty's engravings — make my favorite bridal gifts.",
  datePublished: "2023-08-31",
  body: [
    {
      type: "p",
      text: "The best bridal party gifts are the ones that get used and kept. A monogrammed tote is sweet; a beautiful lipstick with your bridesmaid's initials engraved on the case is something she will carry in her bag for years and think of your wedding every time she pulls it out. Personalized beauty is one of my favorite gifting ideas for brides, and it is easier to do than most people expect.",
    },
    { type: "h2", text: "Why engraving changes the gift" },
    {
      type: "p",
      text: "YSL Beauty is the house I think of first here — their gold lipstick cases and fragrance bottles were practically made to be engraved. A set of initials, your wedding date, a short phrase that means something to your group: suddenly a luxury product becomes a keepsake from a specific day in a specific life. It is the difference between giving someone makeup and giving someone a memory that happens to be makeup.",
    },
    { type: "h2", text: "Ways brides use personalized beauty" },
    {
      type: "ul",
      items: [
        "Bridesmaid gifts — matching lipsticks engraved with each woman's initials, handed out on the wedding morning.",
        "A gift to yourself — the lipstick or fragrance you wear on the day, engraved with your new initials or the date.",
        "Mother-of-the-bride and mother-of-the-groom gifts — a fragrance with a short engraved message reads far more personal than flowers.",
        "A keepsake from the getting-ready morning — the products from your bridal look, marked with the date, kept long after the makeup itself is gone.",
      ],
    },
    { type: "h2", text: "A few practical notes" },
    {
      type: "ul",
      items: [
        "Order early — engraving adds processing time, and wedding season is not when you want to test shipping luck.",
        "Choose shades your bridesmaids will actually wear; a universally flattering neutral beats a bold color that suits only one of them.",
        "Keep engravings short. Initials and a date age more gracefully than an inside joke.",
      ],
    },
    {
      type: "p",
      text: "Photographs fade into archives and flowers last a week. A beautiful object your people touch every day, marked with your date — that keeps the wedding quietly alive in a dozen handbags. That is my kind of gift.",
    },
  ],
},

"best-blow-dryers-bridal-hair-prep": {
  image: "/images/journal/best-blow-dryers-bridal-hair-prep.jpg",
  excerpt:
    "The right blow dryer makes wedding hair prep faster, smoother, and kinder to your hair. The dryers I recommend to brides, from professional workhorses to smart budget picks.",
  datePublished: "2023-08-14",
  body: [
    {
      type: "p",
      text: "When brides ask what one tool is worth investing in before the wedding, my answer is usually not a curling iron — it is a good blow dryer. Your wedding hairstyle is built on the blow-dry underneath it, and in the months of hair prep before the day, a quality dryer protects your hair from the daily heat damage a cheap one quietly inflicts. Here are the dryers I genuinely rate, from professional favorites to smart everyday picks.",
    },
    { type: "h2", text: "The professional favorites" },
    {
      type: "ul",
      items: [
        "Dyson Supersonic — intelligent heat control that protects hair from extreme temperatures, fast drying, and beautifully engineered. The splurge that earns its reputation.",
        "ghd Air — a salon-grade workhorse with serious power and a smooth, frizz-reducing finish.",
        "BaBylissPRO Nano Titanium — lightweight, powerful, and a longtime stylist staple for a reason.",
        "Elchim Classic 2001 — an Italian salon classic; sturdy, fast, and built to last for years of daily use.",
      ],
    },
    { type: "h2", text: "Great choices at friendlier prices" },
    {
      type: "ul",
      items: [
        "T3 Compact Luxe — small, light, and travel-friendly without sacrificing performance; lovely for destination weddings.",
        "RUSK W8less — the name is honest: featherweight, which your arm appreciates during a long blow-dry.",
        "Remington Pro Pearl Ceramic — gentle, even heat from ceramic technology at an accessible price.",
        "Conair Infiniti Pro — a dependable everyday dryer with ionic technology to tame frizz.",
        "Revlon One-Step — the dryer-brush hybrid that gives a smooth, voluminous at-home blowout with one tool; great for brides who are not confident with a round brush.",
      ],
    },
    { type: "h2", text: "What actually matters when you choose" },
    {
      type: "p",
      text: "Ignore the marketing and look for three things: enough power to dry your hair quickly (slow drying at high heat is what causes damage), ionic or ceramic technology for smoothness, and a weight you can comfortably hold with your arms up. A concentrator nozzle is non-negotiable for a smooth bridal-worthy finish, and a diffuser matters if you have curls.",
    },
    {
      type: "p",
      text: "You do not need the most expensive dryer on this list — you need the best one you will actually use consistently. Months of gentle, efficient blow-drying is one of the quietest forms of wedding hair prep there is, and your stylist will feel the difference the moment your hair is in their hands.",
    },
  ],
},

"color-wow-bridal-hair-prep": {
  image: "/images/journal/color-wow-bridal-hair-prep.jpg",
  excerpt:
    "Humidity is the great enemy of Florida wedding hair. The Color Wow blow-dry products I trust to keep bridal styles smooth, glossy, and weatherproof.",
  datePublished: "2023-10-29",
  body: [
    {
      type: "p",
      text: "Styling bridal hair in Northeast Florida means styling against humidity — beach ceremonies, garden venues, August afternoons. Over the years, one product line has earned a permanent place in my conversation with brides about at-home prep: Color Wow. Their blow-dry range is built around exactly the problems wedding hair faces, and these are the pieces I genuinely recommend.",
    },
    { type: "h2", text: "The heroes of the line" },
    {
      type: "ul",
      items: [
        "Dream Coat Supernatural Spray — the famous one, and it deserves the reputation. Sprayed on damp hair and blow-dried in, it creates a humidity-resistant, glassy finish that keeps hair smooth even in coastal air.",
        "Speed Dry Blow-Dry Spray — cuts drying time and reduces heat exposure, which matters a lot during months of pre-wedding hair care.",
        "Raise the Root Thicken & Lift Spray — root lift that lasts, ideal for fine hair that needs body under an updo or soft waves.",
      ],
    },
    { type: "h2", text: "The supporting cast" },
    {
      type: "ul",
      items: [
        "One Minute Transformation Styling Cream — smooths flyaways and rough patches instantly; useful on day two or three hair.",
        "Pop & Lock High Gloss Finish — a glossing serum for the ends that photographs beautifully.",
        "Extra Large Bombshell Volumizer — for brides who want serious, lasting fullness without stickiness or crunch.",
      ],
    },
    { type: "h2", text: "How this fits your wedding hair prep" },
    {
      type: "p",
      text: "These are at-home products, and that is the point. In the weeks before your wedding, a smoother, faster, more protective blow-dry routine keeps your hair in the healthy condition your wedding style depends on. Dream Coat in particular is worth trialing early — it works best when used consistently, and you want to know how your hair responds to it well before wedding week, never for the first time on the day.",
    },
    {
      type: "p",
      text: "One honest note: on your actual wedding morning, follow your stylist's prep instructions over any product habit — for my brides that usually means clean, shampoo-only hair with nothing heavy in it. The place for these products is the months of prep leading up to the day, where they quietly do some of the hardest work: getting your hair to the wedding healthy, smooth, and ready to hold a style.",
    },
  ],
},

  // --- D011 migration: business mentorship (Batch C) ---
  "where-it-all-began-lola-nails-to-the-parlor": {
  image: "/images/journal/where-it-all-began-lola-nails-to-the-parlor.jpg",
  excerpt:
    "The story behind the business: painting my Lola's nails as a little girl in the Philippines, the long road through beauty school and a nursing detour, and what the journey taught me.",
  datePublished: "2023-09-06",
  body: [
    {
      type: "p",
      text: "Artists ask me all the time how I ended up running my own bridal beauty business, and the honest answer starts long before any license or salon suite. It starts with an eight-year-old girl in the Philippines, a bottle of polish, and her grandmother's hands.",
    },
    { type: "h2", text: "A little girl and a bottle of polish" },
    {
      type: "p",
      text: "I used to paint my Lola's nails when I was eight years old. When I finished, she would admire her hands and tell me it was as if she'd had her manicure done at the parlor. She probably had no idea what she was planting in me. That word — parlor — stayed with me so deeply that when I finally opened my own business, it went right into the name. If you're wondering where your own brand story lives, it's often hiding in a memory like that.",
    },
    { type: "h2", text: "The long way around" },
    {
      type: "ul",
      items: [
        "At twelve, I immigrated to the United States, chasing the American Dream alongside all the usual adolescent doubts about where I fit.",
        "At seventeen, I enrolled in esthetics night school — my first real step toward the industry, taken while life was still very much in motion.",
        "I worked behind a salon chair through big personal seasons, including marriage and motherhood.",
        "I even pursued nursing for a while before admitting to myself that beauty was the work I was actually meant to do.",
      ],
    },
    { type: "h2", text: "Turning a passion into a business" },
    {
      type: "ul",
      items: [
        "Specializing changed everything for me — I focused on bridal hair and makeup, and my clientele grew through word-of-mouth referrals rather than chasing every kind of client.",
        "My cosmetology license became a foundation, not a ceiling. It opened the door to multiple income streams within the beauty industry, and I'd encourage any artist to think about their license the same way.",
        "Owning my schedule gave me room to be present as a wife and mom — the flexibility of entrepreneurship is a real benefit, not just a slogan.",
        "Community carried me. Connecting and collaborating with other beauty and wedding professionals has been one of the most rewarding parts of this career.",
      ],
    },
    {
      type: "p",
      text: "There's a thought I come back to often: if the younger version of me could see herself now, she'd be proud. Not because of any single milestone, but because the journey itself did the work. If you're an artist in the messy middle of building something, that's my encouragement to you — this career is less about arriving somewhere and more about who you become on the way. Confident looks good on you, too.",
    },
  ],
},

"from-salon-chair-to-salon-suite": {
  image: "/images/journal/from-salon-chair-to-salon-suite.jpg",
  excerpt:
    "From salon employee to independent contractor to booth renter to private salon suite owner — the stages of my journey and what each one taught me about running a bridal beauty business.",
  datePublished: "2023-08-14",
  body: [
    {
      type: "p",
      text: "Almost every independent bridal artist I know took a version of the same road: employee, then contractor, then renter, then owner. I want to walk you through how those stages looked for me — not because my path is the blueprint, but because knowing the stages exist makes each leap feel a lot less scary.",
    },
    { type: "h2", text: "Starting in someone else's salon" },
    {
      type: "p",
      text: "I began as a cosmetologist working in a salon, and I don't regret a minute of it. That season was where I developed my craft — repetition, feedback, difficult days, and all. If you're behind someone else's chair right now, you are not behind in your career. You're building the skill that everything else will stand on.",
    },
    { type: "h2", text: "Independent contracting and booth renting" },
    {
      type: "ul",
      items: [
        "Moving to independent contracting gave me creative ownership — I could design bespoke looks around each bride's personality and style instead of a salon's menu.",
        "Booth renting was the next step toward freedom: my own schedule, my own clientele, my own way of doing things.",
        "This is also where the business education happens. Pricing, booking, client communication, taxes — booth renting quietly turns you from an artist into an artist who runs a business.",
      ],
    },
    { type: "h2", text: "Opening my own private salon suite" },
    {
      type: "p",
      text: "In 2021 I opened my own private salon suite. On paper it's just a room with my name on it; in reality it was the culmination of years of work and the unwavering support of clients, friends, and family. A private suite gave my brides a calm, personal experience — and gave me a home base that finally matched the brand I'd been building.",
    },
    { type: "h2", text: "What kept me growing" },
    {
      type: "ul",
      items: [
        "Friendors — my word for vendors who become friends. Collaborating with photographers, planners, and fellow wedding pros has elevated my work and made the industry feel like a community.",
        "Continuing education. I keep taking classes and workshops because brides deserve current techniques, and because staying a student keeps the work exciting.",
        "Gratitude. Every stage was made possible by the people who trusted me — remembering that keeps the business human.",
      ],
    },
    {
      type: "p",
      text: "If you're sitting in someone else's salon wondering whether you could ever do this on your own: you don't have to leap the whole distance at once. Take the next stage, learn what it has to teach you, and let the one after that come into focus when you're ready.",
    },
  ],
},

"pinterest-for-bridal-beauty-artists": {
  image: "/images/journal/pinterest-for-bridal-beauty-artists.jpg",
  imagePosition: "top",
  excerpt:
    "Brides plan their wedding look on Pinterest long before they inquire. Here's how to set up your profile, boards, and pin descriptions so your work is what they find.",
  datePublished: "2023-10-29",
  body: [
    {
      type: "p",
      text: "By the time a bride fills out your inquiry form, she has usually spent months saving hair and makeup inspiration on Pinterest. That's exactly why the platform matters for us as bridal artists: it's not just a mood board, it's where your future clients are already searching. A little intentional setup can put your work in front of them.",
    },
    { type: "h2", text: "Set up your profile like a storefront" },
    {
      type: "ul",
      items: [
        "Switch to a business account so you get analytics and can see what's actually resonating.",
        "Use a professional headshot and write a bio that says plainly what you do and who you serve — bridal hair and makeup, and your market.",
        "Work natural keywords into your profile description; think about the phrases a newly engaged bride would type, not industry jargon.",
      ],
    },
    { type: "h2", text: "Build boards that show your range" },
    {
      type: "ul",
      items: [
        "Create focused boards — bridal hairstyles, bridal makeup looks, makeup for different skin tones, wedding beauty tips — rather than one catch-all board.",
        "Pin your own high-quality work, including before-and-after transformations, alongside curated inspiration.",
        "Add video pins when you can: a style coming together or a finished look in motion stops the scroll in a way a photo alone doesn't.",
      ],
    },
    { type: "h2", text: "Write descriptions brides actually search" },
    {
      type: "p",
      text: "Every pin gets a title and description, and this is where most artists leave visibility on the table. Describe each look with the real words brides use — the style, the vibe, the setting — and include relevant wedding terms naturally. Pinterest works like a search engine, so a thoughtful description keeps a pin surfacing for years.",
    },
    { type: "h2", text: "Engage beyond your own pins" },
    {
      type: "ul",
      items: [
        "Collaborate with photographers, planners, and other wedding vendors — shared boards and cross-pinning put you in front of each other's audiences.",
        "Answer comments and questions on your pins; a responsive artist is a bookable artist.",
        "Use questions and polls where the platform allows to invite interaction instead of just broadcasting.",
      ],
    },
    {
      type: "p",
      text: "Pinterest rewards consistency more than volume. A profile that's set up with intention, a handful of well-organized boards, and pins described in your brides' own language will keep working for you quietly in the background — often long after you posted them.",
    },
  ],
},

"instagram-for-bridal-beauty-artists": {
  image: "/images/journal/instagram-for-bridal-beauty-artists.jpg",
  excerpt:
    "Instagram is more than an online portfolio — it's where brides decide whether they trust you with their wedding morning. A practical guide for bridal hair and makeup artists.",
  datePublished: "2023-10-29",
  body: [
    {
      type: "p",
      text: "For bridal artists, Instagram is more than a portfolio — it's a canvas where your artistry gets to shine, and it's often the first place a bride decides whether she can picture you in her getting-ready room. Used with intention, it attracts the right brides, showcases your skill, and builds a community around your work.",
    },
    { type: "h2", text: "Your profile is the first impression" },
    {
      type: "ul",
      items: [
        "Use a professional, recognizable profile photo — brides want to see the person behind the brush.",
        "Write a bio that states exactly what you do, where you work, and how to reach you. Clarity beats cleverness.",
        "Include the keywords brides search for and make your contact path obvious.",
      ],
    },
    { type: "h2", text: "Content that shows your artistry" },
    {
      type: "ul",
      items: [
        "Keep a consistent visual feel — a cohesive feed reads as a professional brand, not a camera roll.",
        "Mix it up: before-and-after transformations, close-ups of intricate detail work, behind-the-scenes moments, and short tutorial-style Reels.",
        "Prioritize video. A style being built or a bride's first look at herself communicates more than any static photo.",
      ],
    },
    { type: "h2", text: "Engagement is where trust is built" },
    {
      type: "ul",
      items: [
        "Reply promptly to comments and DMs — inquiries often start as a casual question on a post.",
        "Ask questions and invite feedback so your audience becomes a conversation, not just viewers.",
        "Share real client words and stories with permission; authentic voices build trust faster than your own captions can.",
      ],
    },
    { type: "h2", text: "Consistency and paying attention" },
    {
      type: "p",
      text: "A steady posting rhythm matters more than a perfect one. Then let your analytics teach you: Instagram's insights show which posts brides respond to, and that feedback should shape what you make next. Use hashtags and Stories strategically — discoverability features exist, so use them — but never at the expense of quality.",
    },
    {
      type: "p",
      text: "The through-line in all of it: stay true to your brand, engage like a real person, and keep giving value. Instagram trends will change; an artist who is consistently, recognizably herself doesn't have to chase them.",
    },
  ],
},

"honeybook-for-bridal-beauty-business": {
  image: "/images/journal/honeybook-for-bridal-beauty-business.jpg",
  excerpt:
    "The admin side of a bridal beauty business can swallow your week. Here's my honest experience with HoneyBook — what it handles for me and how to think about whether a CRM fits your business.",
  datePublished: "2023-08-02",
  body: [
    {
      type: "p",
      text: "Nobody becomes a bridal artist because they love contracts, invoices, and scheduling emails — but every wedding you book comes with all three. For years I've used HoneyBook to run that side of my business, and it has genuinely changed how my weeks feel. This is my honest experience, from one working artist to another.",
    },
    { type: "h2", text: "What it actually handles for me" },
    {
      type: "ul",
      items: [
        "Booking without the back-and-forth: clients can see availability, choose a time, and pay through the same platform, which saves me a surprising amount of admin time.",
        "Professional proposals and contracts that I've customized to match my brand — a bride's first paperwork experience with me looks as considered as my portfolio.",
        "Automated reminders and follow-ups, so clients stay informed at every step without me manually chasing threads.",
        "Deposits, invoices, and payments all processed in one secure place instead of scattered across apps.",
      ],
    },
    { type: "h2", text: "The less obvious benefits" },
    {
      type: "ul",
      items: [
        "Everything about a client — messages, contract, project details — lives in one record, so nothing gets lost between an inquiry in March and a wedding in November.",
        "The reporting tools show me where revenue comes from and which efforts pay off, which makes business decisions feel less like guessing.",
        "When I work with a team, assigning tasks and sharing wedding-day details happens inside the same system.",
      ],
    },
    { type: "h2", text: "Do you need a system like this?" },
    {
      type: "p",
      text: "Here's my honest take: the specific tool matters less than having a system at all. If your bookings currently live across DMs, texts, and a notes app, any real client-management platform will feel like a revelation. HoneyBook is the one I chose and have stayed with — but evaluate what fits your volume, your budget, and how you like to work.",
    },
    {
      type: "p",
      text: "The best thing a tool like this ever gave me wasn't a feature. It was hours back — hours I now spend on brides, on education, and on my family instead of on paperwork. Whatever system you choose, that's the return to look for.",
    },
  ],
},

"website-basics-for-bridal-beauty-artists": {
  image: "/images/journal/website-basics-for-bridal-beauty-artists.jpg",
  excerpt:
    "Whatever platform you build on, the fundamentals are the same: a clear services page, a gallery that sells, an easy inquiry form, and a site that works on the phone in a bride's hand.",
  datePublished: "2023-10-28",
  body: [
    {
      type: "p",
      text: "Social media is where brides discover you, but your website is where they decide. It's the one online space you fully control — no algorithm, no feed. And here's the good news: which platform you build it on matters far less than getting a handful of fundamentals right. These are the ones that actually move inquiries.",
    },
    { type: "h2", text: "Lead with your portfolio" },
    {
      type: "ul",
      items: [
        "Your gallery is your sales team. Feature your strongest, most current bridal work — before-and-after transformations and detail shots do more convincing than any paragraph.",
        "Curate ruthlessly. Twelve excellent images beat sixty mixed ones.",
        "Credit your photographers and keep image files sized for the web so pages load fast.",
      ],
    },
    { type: "h2", text: "Make it effortless to inquire" },
    {
      type: "ul",
      items: [
        "Have a clear services page: what you offer, who it's for, and how booking works. Confused brides don't inquire.",
        "Put a simple contact or inquiry form on the site — asking a bride to compose a cold email is friction you don't need.",
        "Repeat your call to action on every key page. A bride should never have to hunt for how to reach you.",
      ],
    },
    { type: "h2", text: "The technical basics that matter" },
    {
      type: "ul",
      items: [
        "Mobile first: most brides will meet your site on a phone, so check every page on yours.",
        "Basic SEO: descriptive page titles, natural local phrases like your city plus 'bridal hair and makeup,' and alt text on your images.",
        "Analytics: even the simplest visitor tracking tells you which pages work and where brides come from.",
      ],
    },
    { type: "h2", text: "Keep it alive" },
    {
      type: "p",
      text: "A website isn't a one-time project. Refresh your gallery as your work evolves, update your services as your business grows, and if you enjoy writing, a simple blog of wedding beauty tips builds both search visibility and trust. A site that's clearly current tells a bride you're active, booked, and worth reaching out to.",
    },
    {
      type: "p",
      text: "Don't let platform choice paralyze you — every major website builder can do everything above. Pick one you'll actually maintain, get these fundamentals in place, and let your work do the talking.",
    },
  ],
},

  // --- D011 migration: real weddings (Batch A) ---
  "st-augustine-beach-elopement-hair-makeup": {
  image: "/images/portfolio/pf-florida-saintaugustine-kckelveyryan.jpg",
  imagePosition: "top",
  excerpt:
    "A 5 a.m. start, a bronzed no-makeup look, and vows at low tide — Mcklevey and Ryan's intimate elopement at Ocean Hammock Park in St. Augustine Beach.",
  datePublished: "2023-10-09",
  body: [
    {
      type: "p",
      text: "On the morning of August 26, 2023, Mcklevey and Ryan were married on St. Augustine Beach — and I had the honor of starting their day with them. I arrived at 5 a.m. to style Mcklevey for her elopement, with her mom, her sister, and the rest of her family gathered close. Getting-ready mornings like this one are quiet in the best way: coffee, soft light, and a bride surrounded by the people who love her most.",
    },
    {
      type: "p",
      text: "Their story took an unexpected turn to get here. Mcklevey and Ryan had originally planned to exchange vows in Maui that September, but when circumstances on the island changed their plans, they pivoted quickly and put together a beach elopement here in St. Augustine instead. What could have felt like a compromise became a day that suited them completely.",
    },
    { type: "h2", text: "The look: bronzed, minimal, and true to her" },
    {
      type: "p",
      text: "Mcklevey came to her wedding morning with beautifully cared-for skin — she is faithful to her regular facials — and she wanted her makeup to honor that. We went with a bronzed, minimal, no-makeup makeup: warm skin, softly defined features, and nothing that would read heavy in early beach light. It is one of my favorite briefs, because it only works when the bride's own skin is the star.",
    },
    {
      type: "p",
      text: "For her hair, we chose a low, softly undone bun with delicate face-framing strands — relaxed enough for a breezy shoreline, polished enough for portraits. She wore pearl drop earrings touched with something blue alongside her simple solitaire engagement ring, and her gown was a clean A-line silk silhouette with a beautiful open back. Every choice was quiet, intentional, and completely her.",
    },
    { type: "h2", text: "Vows at low tide at Ocean Hammock Park" },
    {
      type: "p",
      text: "The ceremony took place at Ocean Hammock Park, where a boardwalk winds through the dunes and trees before opening onto wide, white sand. They timed it for low tide, so the beach stretched out around them as they exchanged vows with family and close friends gathered near, the waves keeping time in the background.",
    },
    {
      type: "p",
      text: "Afterward, the couple wandered into historic St. Augustine for portraits — under the oaks along Magnolia Avenue and through the brick-laid back alleys filled with greenery and florals. It is one of the reasons I love styling elopements here: within a few miles you get shoreline, old-city texture, and canopy oaks, all in one wedding day.",
    },
    { type: "h2", text: "Vendor credits" },
    {
      type: "ul",
      items: [
        "Photography: My Nguyen Photography",
        "Ceremony location: Ocean Hammock Park, St. Augustine Beach, Florida",
        "Bridal hair and makeup: Maureen Ella",
      ],
    },
    {
      type: "p",
      text: "Mcklevey and Ryan's morning is a reminder that an elopement doesn't ask you to give anything up. With a look that feels like you and a place that means something, a quiet beach at sunrise can hold everything a wedding needs.",
    },
  ],
},
"bowing-oaks-wedding-hair-makeup": {
  image: "/images/journal/bowing-oaks-wedding-hair-makeup.jpg",
  excerpt:
    "Inside Keely's wedding morning at Bowing Oaks — a preview that set the tone, a joyful getting-ready with her bridesmaids, and vows beneath the oaks.",
  datePublished: "2023-08-21",
  body: [
    {
      type: "p",
      text: "On February 12, 2023, Keely married Adam at Bowing Oaks, a rustic-elegant venue here in Northeast Florida — and her wedding morning is one I still think about. I was Keely's hairstylist, working alongside makeup artist Ashley of Beauty by Ashley Taylor, and together we had the joy of getting Keely and her bridesmaids ready for the day.",
    },
    { type: "h2", text: "A preview that set the tone" },
    {
      type: "p",
      text: "Keely's preview session in January is where her wedding look really took shape. We took her inspiration photos and translated them into something that fit her hair, her features, and her venue — so that on the actual morning there was nothing to figure out, only a plan to enjoy. This is exactly what a preview is for: the decisions happen weeks early, and the wedding day gets to be calm.",
    },
    { type: "h2", text: "The wedding morning" },
    {
      type: "p",
      text: "Getting-ready hours at Bowing Oaks were full of the things I love most about this work — laughter, stories, and a bridal party genuinely excited for their friend. While Ashley perfected makeup and I moved through hair for Keely and her bridesmaids, the room settled into that easy rhythm where the styling becomes part of the celebration rather than a task before it.",
    },
    {
      type: "p",
      text: "Keely also did something I'll never forget: she thanked us with a personalized recipe book, a small handmade gesture that said more than any review could. It is the kind of thoughtfulness that tells you exactly what sort of bride — and person — you are working with.",
    },
    { type: "h2", text: "Vows beneath the oaks" },
    {
      type: "p",
      text: "Keely and Adam exchanged vows surrounded by loved ones under the property's sprawling oak trees, and as evening fell they shared their first dance as husband and wife. Her finished look — styled to last from an early call time through photos, ceremony, and a full night of dancing — carried her through every moment of it.",
    },
    { type: "h2", text: "Vendor credits" },
    {
      type: "ul",
      items: [
        "Venue: Bowing Oaks",
        "Planning: Francesca Cooper, The Eventful Gals",
        "Photography: Southern Palms Studio",
        "Florals: Seawalk Custom Florals",
        "Catering: Chef's Garden",
        "DJ: ProShow Disc Jockey",
        "Wedding dress: Love a Bridal Boutique",
        "Live painting: Melissa Munger",
        "Makeup: Ashley, Beauty by Ashley Taylor",
        "Bridal hair: Maureen Ella",
      ],
    },
  ],
},
"yulee-florida-elopement-angeline-shane": {
  image: "/images/portfolio/angeline.jpg",
  excerpt:
    "Angeline and Shane eloped at the Nassau County Courthouse in Yulee with a soft, classic bridal look — then celebrated with an intimate lunch at Josephine in Avondale.",
  datePublished: "2023-10-29",
  body: [
    {
      type: "p",
      text: "Some weddings are personal for me in more ways than one. When my sister Angeline married Shane, I wasn't just her hairstylist and makeup artist — I helped plan the day, too. They chose a simple courthouse elopement on a bright, sunny morning, surrounded by their closest family and friends, and it remains one of the purest wedding days I have ever been part of.",
    },
    {
      type: "p",
      text: "The ceremony took place at the Nassau County Courthouse in Yulee, Florida. With its white columns and clean, classic architecture, the courthouse gave them an elegant backdrop without a single piece of added decor — exactly the understated feel they wanted.",
    },
    { type: "h2", text: "Her bridal look" },
    {
      type: "p",
      text: "Angeline wanted simple and subtle, so we kept everything soft. Her makeup focused on a radiant, natural glow that highlighted her features rather than covering them. Her long hair went into a low, classic, softly undone bun with gentle face-framing pieces — a style chosen deliberately to showcase her beaded pearl veil, dainty necklace, and pearl drop earrings as one cohesive look.",
    },
    {
      type: "p",
      text: "Her outfit carried the same quiet confidence: a white strapless short dress that suited her golden, olive-toned skin beautifully, satin pointed-toe pumps with embellished ankles, and short white mesh gloves for a touch of vintage charm. Even her engagement ring told a story — Shane worked with Laurel at Anchor Boutique in St. Augustine to recreate his mother's heirloom ring as a design made just for Angeline.",
    },
    { type: "h2", text: "An intimate lunch at Josephine in Avondale" },
    {
      type: "p",
      text: "After the ceremony, everyone made their way to Josephine, a charming restaurant in Avondale, for a private lunch celebration. The room was beautiful — a handmade Murano glass chandelier overhead, a dried floral installation along the main wall — and a solo violinist played the couple's favorite love songs, including the music for their first dance as husband and wife.",
    },
    {
      type: "p",
      text: "The personal touches made it theirs: a custom neon sign hung on a circular arch softened with pampas grass, personalized champagne with their names on it, and a custom cake by Creme de la Cocoa — the salted caramel crunch was the table's unanimous favorite. None of it was elaborate; all of it was intentional.",
    },
    { type: "h2", text: "Vendor credits" },
    {
      type: "ul",
      items: [
        "Ceremony: Nassau County Courthouse, Yulee, Florida",
        "Reception: Josephine, Avondale",
        "Photography: Dawn, Daybreak Photo Co.",
        "Engagement ring: Laurel, Anchor Boutique, St. Augustine",
        "Florals: Jessi, Shady Spring Garden",
        "Cake: Creme de la Cocoa",
        "Bridal hair, makeup, and planning: Maureen Ella",
      ],
    },
    {
      type: "p",
      text: "Angeline and Shane's elopement was a reminder that the most cherished wedding days are often the simplest ones. A courthouse, a soft bridal look, a long lunch with the people who matter most — love celebrated in its purest form.",
    },
  ],
},
"filipino-inspired-wedding-shane-angeline": {
  image: "/images/journal/filipino-inspired-wedding-shane-angeline.jpg",
  excerpt:
    "Shane and Angeline honored their Filipino heritage at Old Spanish Quarter in Jacksonville — a Filipiniana gown with butterfly sleeves, a Barong Tagalog, and a timeless bridal look.",
  datePublished: "2026-07-11",
  body: [
    {
      type: "p",
      text: "On August 30, 2025, Shane and Angeline celebrated their wedding in Jacksonville, Florida — a day where Filipino tradition, Spanish-inspired architecture, and timeless elegance came together beautifully. After their intimate courthouse elopement in Yulee, this celebration brought their families fully into the story, and once again I had the joy of styling my sister for one of the most meaningful days of her life.",
    },
    { type: "h2", text: "Old Spanish Quarter and St. Joseph Historic Church" },
    {
      type: "p",
      text: "They exchanged vows at St. Joseph Historic Church in Jacksonville, while Old Spanish Quarter held the rest of the day — the getting-ready morning, a quiet first look beneath its archways, portraits through its courtyards, and the evening reception. The venue's stucco walls, graceful arches, and old-world character echo the Spanish colonial influences that shaped the Philippines for centuries, which made it far more than a pretty backdrop. The setting itself honored their heritage.",
    },
    { type: "h2", text: "Filipiniana attire, reimagined" },
    {
      type: "p",
      text: "Angeline's gown was designed by EJ Relampagos of Bohol, Philippines, blending traditional Filipiniana craftsmanship with contemporary bridal elegance. Its signature detail was a pair of detachable butterfly sleeves — a modern take on the iconic terno silhouette — that created a regal shape for the first look and ceremony, then transformed into a sleek bridal gown for the evening. Shane wore a custom Barong Tagalog, also by EJ Relampagos, its fine embroidery a symbol of celebration and cultural pride.",
    },
    {
      type: "p",
      text: "One of my favorite parts of the day: generations of family and friends arrived in Filipino formal attire, turning the reception into a shared celebration of heritage. Guests weren't just attending a wedding — they were part of it.",
    },
    { type: "h2", text: "Her bridal look" },
    {
      type: "p",
      text: "With a gown that striking, the beauty plan was clear — complement, never compete. Angeline's hair was styled in soft, polished waves designed to frame her face while keeping the butterfly sleeves as the focal point, and built to last through Florida's warm weather and a full evening of celebration. Her makeup centered on radiant skin, softly defined eyes, and timeless neutral tones that let her natural beauty and confidence lead.",
    },
    {
      type: "p",
      text: "Before the reception began, Shane and Angeline shared a quiet first look under the venue's archways — a chance to slow down and simply be together before the evening. Their traditional attire against the clean white walls and historic texture made those portraits some of the most striking images of the day.",
    },
    { type: "h2", text: "Vendor credits" },
    {
      type: "ul",
      items: [
        "Ceremony: St. Joseph Historic Church, Jacksonville, Florida",
        "Reception and getting ready: Old Spanish Quarter, Jacksonville, Florida",
        "Photography: Emily Kicsak Photography",
        "Wedding gown and Barong Tagalog: EJ Relampagos, Bohol, Philippines",
        "Bridal hair and makeup: Maureen Ella",
      ],
    },
    {
      type: "p",
      text: "Some weddings are remembered because they are beautiful; others because they tell a story. Shane and Angeline's did both — honoring the generations before them while beginning a new chapter of their own, and proving that heritage and modern elegance belong side by side.",
    },
  ],
},

  // --- 2026-07 additions: bridal-prep ---
  "wedding-hair-makeup-timeline-st-augustine": {
  image: "/images/journal/wedding-hair-makeup-timeline-st-augustine.jpg",
  excerpt:
    "A calm wedding morning starts with a well-planned beauty timeline. Here is how to schedule hair and makeup for a St. Augustine wedding — from your ready-by time to Florida humidity.",
  datePublished: "2026-07-18",
  body: [
    {
      type: "p",
      text: "Your wedding morning should feel exciting, meaningful, and calm — not rushed or overwhelming.",
    },
    {
      type: "p",
      text: "After years of providing bridal hair and makeup for weddings throughout St. Augustine, Jacksonville, Palm Coast, and Northeast Florida, I have learned that one of the most important parts of a peaceful wedding morning is having a thoughtfully planned beauty timeline.",
    },
    {
      type: "p",
      text: "A beautiful hairstyle and makeup look require more than simply choosing an appointment time. Your schedule must also account for photography, getting dressed, travel to the venue, bridal party services, final touch-ups, and all the meaningful little moments that happen throughout the morning. Here is what every bride should know when planning her wedding hair and makeup timeline.",
    },
    { type: "h2", text: "Begin with the time you need to be completely ready" },
    {
      type: "p",
      text: "One of the most common misunderstandings when planning a bridal beauty schedule is using the ceremony time as the deadline. Your hair and makeup should usually be completed well before the ceremony begins.",
    },
    {
      type: "p",
      text: "Before creating your timeline, speak with your wedding planner and photographer to determine your official “ready-by” time. This is the time when your hair and makeup should be finished, your wedding dress should be on, and you should be prepared to begin photography or leave for the ceremony. Your photographer may want time to capture:",
    },
    {
      type: "ul",
      items: [
        "Final hair and makeup details",
        "Bridal portraits",
        "Your wedding dress and accessories",
        "Getting into your dress",
        "A first look with your partner",
        "A first look with your parents or bridal party",
        "Family or wedding party portraits",
        "Travel to the ceremony location",
      ],
    },
    {
      type: "p",
      text: "For example, a bride with a 5:00 p.m. ceremony may need to be completely ready by 2:30 or 3:00 p.m. depending on the photography schedule, venue layout, and travel time. Once we know your ready-by time, we can work backward to determine when beauty services should begin.",
    },
    { type: "h2", text: "Know how many hair and makeup services are needed" },
    {
      type: "p",
      text: "Your beauty timeline will depend heavily on the total number of services being provided. This may include:",
    },
    {
      type: "ul",
      items: [
        "Bridal hair",
        "Bridal makeup",
        "Bridesmaid hair",
        "Bridesmaid makeup",
        "Mother-of-the-bride services",
        "Mother-of-the-groom services",
        "Flower girl styling",
        "Additional family members or honored guests",
      ],
    },
    {
      type: "p",
      text: "It is helpful to confirm the final number of services as early as possible. Adding multiple services close to the wedding day may require an earlier start time or an additional artist. When planning your schedule, count hair and makeup as separate services — a bridesmaid receiving both hair and makeup will need two appointment spaces within the timeline.",
    },
    { type: "h2", text: "How long does wedding hair and makeup take?" },
    {
      type: "p",
      text: "Every wedding and every client is different, but the following time ranges can be helpful when beginning your plans. Bridal hair may take approximately 60 to 90 minutes depending on the style, hair length, texture, extensions, and accessories. Bridal makeup may also take approximately 60 to 90 minutes, allowing time for skin preparation, careful application, lashes, detailing, and final adjustments. Bridesmaid, mother, and guest services commonly require approximately 45 to 60 minutes per service. More intricate hairstyles, thick or very long hair, individual lash applications, or specific beauty requests may require additional time.",
    },
    {
      type: "p",
      text: "Your final schedule should never be created by simply multiplying the number of people by one estimated service time. An experienced bridal artist considers the complete flow of the morning, including artist setup, transitions, final touch-ups, photography, and unexpected interruptions.",
    },
    { type: "h2", text: "The bride should not always be scheduled last" },
    {
      type: "p",
      text: "Many brides assume they should be the final person receiving services. However, being completely last can create unnecessary stress — if the morning falls behind, the bride has no remaining time to spare.",
    },
    {
      type: "p",
      text: "Depending on the size of the wedding party, I may recommend scheduling the bride somewhere in the middle or toward the later portion of the timeline — but not necessarily in the final appointment. This gives the bride time to:",
    },
    {
      type: "ul",
      items: [
        "Step away for a snack or water",
        "Take getting-ready photographs",
        "Receive final touch-ups",
        "Put on her dress without feeling rushed",
        "Enjoy a quiet moment before the ceremony",
      ],
    },
    {
      type: "p",
      text: "Your bridal look will still be refreshed before you leave the getting-ready space.",
    },
    { type: "h2", text: "When is an additional artist needed?" },
    {
      type: "p",
      text: "For larger wedding parties, early photography schedules, or ceremonies requiring travel, an additional hair or makeup artist may be necessary. Adding another professional allows multiple services to take place at the same time, which can prevent the day from beginning extremely early and helps keep the morning comfortable for everyone. An additional artist may be recommended when:",
    },
    {
      type: "ul",
      items: [
        "Several people are receiving both hair and makeup",
        "The bridal party must be ready early",
        "The wedding includes a first look",
        "The getting-ready location is far from the ceremony venue",
        "The venue limits access to the bridal suite",
        "The bride wants a relaxed morning without a very early start",
      ],
    },
    {
      type: "p",
      text: "The goal is not to fit as many services as possible into the shortest amount of time. The goal is to create a realistic schedule that supports a calm experience and beautiful results.",
    },
    { type: "h2", text: "Build extra time into the schedule" },
    {
      type: "p",
      text: "Wedding mornings are full of activity. Family members arrive, flowers are delivered, the photographer begins styling details, someone searches for earrings, and the bride may be pulled away for a special moment. Even the most organized wedding morning can experience small delays. Your timeline should include extra time for:",
    },
    {
      type: "ul",
      items: [
        "Artist setup",
        "Bathroom and meal breaks",
        "Changing into robes or getting-ready outfits",
        "Photography interruptions",
        "Flower deliveries",
        "Hair accessories and veil placement",
        "Final lipstick and powder touch-ups",
        "Getting dressed",
        "Unexpected delays",
      ],
    },
    {
      type: "p",
      text: "A timeline with no breathing room can quickly become stressful. A carefully planned buffer protects the bride and the rest of the wedding party from feeling rushed.",
    },
    { type: "h2", text: "Prepare your getting-ready space" },
    {
      type: "p",
      text: "The environment where hair and makeup services take place can make a significant difference in how smoothly the morning flows. When possible, choose a space with:",
    },
    {
      type: "ul",
      items: [
        "Plenty of natural light",
        "Electrical outlets",
        "Comfortable chairs",
        "Table or counter space",
        "Climate control",
        "Enough room for the beauty team",
        "A separate area for food, drinks, and personal belongings",
        "Extra bathrooms",
      ],
    },
    {
      type: "p",
      text: "Natural light is especially helpful for makeup application. However, your artist will also bring professional lighting when necessary. Try to keep the beauty area free from large bags, food containers, and unnecessary traffic — a clean and organized workspace allows your artists to remain focused and efficient.",
    },
    {
      type: "p",
      text: "For hotel weddings or historic venues in St. Augustine, it is also important to consider parking, elevators, staircases, room access, and the distance between the getting-ready suite and ceremony location.",
    },
    { type: "h2", text: "Consider Florida heat and humidity" },
    {
      type: "p",
      text: "Weddings in Northeast Florida require thoughtful beauty preparation. St. Augustine and Jacksonville can be warm and humid throughout much of the year. Outdoor ceremonies, coastal venues, summer weddings, and garden portraits may expose your hair and makeup to heat, wind, and moisture. Your bridal beauty plan may include:",
    },
    {
      type: "ul",
      items: [
        "Humidity-resistant hairstyling products",
        "Waterproof or water-resistant makeup",
        "Proper skin preparation",
        "Strategic powder application",
        "Secure placement of pins and accessories",
        "A small touch-up kit",
        "Planning outdoor photographs around the weather",
      ],
    },
    {
      type: "p",
      text: "During your bridal preview, we can discuss how your preferred hairstyle and makeup look will perform in your venue and season. A loose, romantic hairstyle may need to be adjusted for a windy coastal ceremony. A bride with naturally textured hair may prefer a style that works with her natural movement instead of fighting against the humidity.",
    },
    {
      type: "p",
      text: "The goal is to preserve the feeling of your inspiration while creating a look that works for you, your hair, your skin, and your wedding environment.",
    },
    { type: "h2", text: "Complete your bridal preview before finalizing the timeline" },
    {
      type: "p",
      text: "Your bridal hair and makeup preview is an important part of the planning process. During your preview, we can determine:",
    },
    {
      type: "ul",
      items: [
        "How long your chosen hairstyle takes",
        "Whether extensions are recommended",
        "How your veil or accessories will be secured",
        "Which makeup products work best for your skin",
        "Whether adjustments are needed for the wedding day",
        "How much preparation time should be included",
      ],
    },
    {
      type: "p",
      text: "The preview gives us the opportunity to refine your look without the pressure of the wedding-day schedule. It also allows you to see how your hair and makeup wear throughout the day. Take photographs in natural light, notice how the makeup feels after several hours, and observe how well the hairstyle holds. This information helps create an even more accurate wedding-day plan.",
    },
    { type: "h2", text: "Prepare your bridal party in advance" },
    {
      type: "p",
      text: "A smooth wedding morning begins before the artists arrive. Share the beauty schedule with your bridal party ahead of time and remind everyone to be present before their scheduled service.",
    },
    {
      type: "p",
      text: "For hair services, members of the bridal party should generally arrive with clean, completely dry hair unless instructed otherwise. For makeup services, they should arrive with a clean face and appropriate moisturizer already applied. Each person should have inspiration photos ready and should communicate any allergies, sensitivities, or specific concerns before services begin.",
    },
    {
      type: "p",
      text: "Bridesmaids should also avoid leaving the getting-ready location during the beauty schedule — a missing client can delay every service that follows.",
    },
    { type: "h2", text: "Eat, hydrate, and enjoy the morning" },
    {
      type: "p",
      text: "Brides often become so focused on the schedule that they forget to eat or drink water. Plan a simple breakfast or lunch that is easy to enjoy while getting ready — choose foods that are filling but not overly messy, greasy, or difficult to eat. Keep water nearby and assign someone to help manage phone calls, questions, and deliveries.",
    },
    {
      type: "p",
      text: "Your wedding morning is part of your celebration. Allow yourself to be present. Listen to music, spend time with your closest friends and family, and enjoy watching your vision come together.",
    },
    { type: "h2", text: "Your wedding morning should feel like you" },
    {
      type: "p",
      text: "A well-planned bridal beauty timeline is about more than staying on schedule. It creates space for you to breathe. It gives your photographer time to capture meaningful moments, allows your bridal party to enjoy the morning, and gives your beauty team the time needed to provide careful, personalized services without rushing. Most importantly, it allows you to begin your wedding day feeling confident, cared for, and completely present.",
    },
    {
      type: "p",
      text: "When you work with Maureen Ella Bridal, your beauty schedule is thoughtfully planned around your wedding details, service count, photography needs, venue, and desired ready-by time. Every wedding morning is different, and your timeline should be created specifically for you.",
    },
    { type: "h2", text: "Planning your wedding in Northeast Florida?" },
    {
      type: "p",
      text: "Maureen Ella provides bridal hair and makeup services for weddings in St. Augustine, Jacksonville, Palm Coast, and surrounding Northeast Florida locations. When submitting your inquiry, please include your wedding date, venue, number of hair and makeup services, and the time you need to be completely ready.",
    },
    {
      type: "p",
      text: "Together, we can create a beauty experience that feels organized, personal, and beautifully calm from the first brushstroke to the final touch-up. A natural next read: what to expect at your bridal hair and makeup preview.",
    },
  ],
},

"bridal-hair-makeup-preview-what-to-expect": {
  image: "/images/journal/bridal-hair-makeup-preview-what-to-expect.jpg",
  excerpt:
    "Your bridal preview turns inspiration photos into a plan. Here is exactly how to prepare — your hair, your skin, and your accessories — for the best possible result.",
  datePublished: "2026-07-20",
  body: [
    {
      type: "p",
      text: "Your bridal hair and makeup preview is one of the most exciting steps in preparing for your wedding day. It is the moment when the inspiration photos you have been saving begin to take shape. More importantly, it gives us the opportunity to create a look that feels beautiful, comfortable, and completely personal to you.",
    },
    {
      type: "p",
      text: "A bridal preview is not simply a practice appointment. It is a collaborative experience where we explore your ideas, consider the details of your wedding, and make thoughtful adjustments before the wedding morning arrives. Whether you are planning a romantic St. Augustine wedding, a coastal celebration in Jacksonville, or an intimate elopement in Northeast Florida, your bridal preview helps create confidence and clarity before your special day. Here is what you can expect — and how to prepare for the best possible experience.",
    },
    { type: "h2", text: "What is a bridal hair and makeup preview?" },
    {
      type: "p",
      text: "A bridal hair and makeup preview is a dedicated appointment where we create and refine your wedding-day beauty look. During the appointment, we will discuss your vision, review your inspiration photos, and consider how your preferred look complements your natural features, wedding dress, accessories, venue, and overall wedding style. Your preview allows us to determine:",
    },
    {
      type: "ul",
      items: [
        "Your preferred bridal hairstyle",
        "Your desired makeup style",
        "The right level of coverage and finish",
        "How your hair responds to the selected style",
        "Whether extensions may be helpful",
        "Where your veil or hair accessories should be placed",
        "Which products work best for your skin",
        "How much time your services may require on the wedding day",
        "Any adjustments you would like before the final look",
      ],
    },
    {
      type: "p",
      text: "The goal is not to transform you into someone else. The goal is to help you look like the most polished, confident, and beautiful version of yourself.",
    },
    { type: "h2", text: "When should you schedule your bridal preview?" },
    {
      type: "p",
      text: "Your bridal preview should be scheduled far enough in advance to allow time for thoughtful adjustments, but close enough to your wedding that your hair length, color, skin condition, and personal preferences are unlikely to change significantly. Many brides schedule their preview a few months before the wedding.",
    },
    {
      type: "p",
      text: "It can be especially helpful to schedule the appointment after you have chosen your wedding dress, veil, jewelry, and general wedding style, since these details can influence your final hair and makeup decisions. For example, a high neckline may pair beautifully with an updo, while a strapless or open-back gown may inspire a softer hairstyle with movement around the shoulders.",
    },
    {
      type: "p",
      text: "Your preview may also be scheduled the same day as your engagement session, bridal shower, dress fitting, or another special date so you can enjoy your finished look afterward. However, remember that the appointment is primarily for planning and refining your wedding-day beauty look.",
    },
    { type: "h2", text: "Send your inspiration before the appointment" },
    {
      type: "p",
      text: "Before your preview, please send two to three hair inspiration photos and two to three makeup inspiration photos. Choose images that clearly show what you are drawn to — they do not all need to feature the exact same style. One photo may show the shape of a hairstyle you love, while another shows the softness around the face or the placement of the bun. Your makeup inspiration may include a complexion finish from one photo and an eye look or lip color from another.",
    },
    {
      type: "p",
      text: "When choosing inspiration, consider models with features similar to yours, including hair color, hair length, hair thickness, hair texture, skin tone, eye shape, and face shape.",
    },
    {
      type: "p",
      text: "Inspiration photos are helpful, but they are a starting point rather than a guaranteed exact copy. Lighting, editing, extensions, filters, hair density, and facial features can all affect how a look appears. My role is to understand what you love about the image and adapt those details into a look that works beautifully for you.",
    },
    { type: "h2", text: "Send photos of your current hair" },
    {
      type: "p",
      text: "Before your appointment, please send clear photographs of your hair from the front and back. These photos help me see your current hair length, texture, thickness, layers, and color before we meet. They are especially helpful when determining whether your desired hairstyle may require:",
    },
    {
      type: "ul",
      items: [
        "Clip-in extensions",
        "Additional padding",
        "Hair pieces",
        "A different placement",
        "More preparation time",
        "A slight adjustment to the inspiration",
      ],
    },
    {
      type: "p",
      text: "Extensions are not always used only for added length. They can also provide fullness, structure, and support for updos, ponytails, braids, and soft waves. Knowing your hair condition ahead of time allows us to begin the appointment with a more realistic and personalized plan.",
    },
    { type: "h2", text: "How to prepare your hair" },
    {
      type: "p",
      text: "For your bridal preview, arrive with freshly washed and fully blow-dried hair unless I have given you different instructions. Your hair should be completely dry before the appointment begins. Avoid arriving with wet or damp hair, as this can take away from the time reserved for styling and may affect the final result.",
    },
    {
      type: "p",
      text: "Use your normal shampoo and conditioner, but avoid applying excessive oils, heavy masks, or styling products that may weigh the hair down. Your hair should feel clean, light, and manageable. Please do not straighten or curl your hair before the appointment unless specifically requested — blow-dried hair gives us a clean foundation and allows me to prepare it according to the needs of your selected style.",
    },
    {
      type: "p",
      text: "If you have naturally curly or textured hair and would like to incorporate your natural texture into the wedding-day style, let me know before the preview so we can discuss the best preparation method.",
    },
    { type: "h2", text: "How to prepare your skin" },
    {
      type: "p",
      text: "Arrive with a clean, makeup-free face. Please complete your normal skincare routine before the appointment, including cleansing and applying an appropriate moisturizer. Avoid trying unfamiliar skincare products, facial treatments, peels, waxing, or strong exfoliants immediately before your preview — these treatments can sometimes cause redness, dryness, irritation, or sensitivity.",
    },
    {
      type: "p",
      text: "Healthy bridal makeup begins with well-cared-for skin. In the weeks before your preview and wedding, focus on consistency rather than experimenting with multiple new products. Drink water, moisturize regularly, and follow the guidance of a licensed skin care professional if you are addressing a specific concern. Please let me know about any allergies, skin sensitivities, reactions, or medical concerns that may affect the products used during your appointment.",
    },
    { type: "h2", text: "Wear a white dress or blouse" },
    {
      type: "p",
      text: "Wear a white, ivory, blouse or dress to your bridal preview when possible. Choose a neckline that is similar to your wedding dress — for example, if your gown has a strapless, off-the-shoulder, high-neck, or V-neck design, wearing a similar neckline will help you visualize how your hair and makeup will look with your dress. A button-down shirt, robe, or top that is easy to remove without disturbing your hairstyle is also a helpful choice.",
    },
    {
      type: "p",
      text: "Wearing white or ivory can affect how your makeup appears and allows you to see the overall bridal effect more clearly than a dark or brightly colored shirt.",
    },
    { type: "h2", text: "Bring your bridal accessories" },
    {
      type: "p",
      text: "Bring any accessories you are considering for your wedding day. This may include:",
    },
    {
      type: "ul",
      items: [
        "Your veil",
        "Hair comb",
        "Hair pins",
        "Tiara",
        "Headband",
        "Flowers",
        "Earrings",
        "Necklace",
        "Hair extensions",
        "Wedding jewelry",
      ],
    },
    {
      type: "p",
      text: "Seeing the accessories with the completed hairstyle helps us determine the most flattering and secure placement. If your veil has not yet arrived, bring a photo that clearly shows its length, comb, and design. The weight and style of a veil may influence the structure of the hairstyle — a long cathedral veil may need more support than a lightweight fingertip veil.",
    },
    {
      type: "p",
      text: "If you are still deciding between accessories, bring the options with you. We can see how each one works with the hairstyle and your overall bridal vision.",
    },
    { type: "h2", text: "Be prepared to discuss your wedding details" },
    {
      type: "p",
      text: "Your beauty look should feel connected to the rest of your wedding. During the preview, we may discuss your wedding venue, ceremony time, indoor or outdoor setting, wedding season, dress style, veil and accessories, wedding colors, photography style, overall level of formality, your usual beauty routine, and the way you want to feel on your wedding day.",
    },
    {
      type: "p",
      text: "A soft and romantic garden wedding may inspire a different look than a formal ballroom celebration. A coastal ceremony may require additional consideration for wind and humidity, while a historic St. Augustine venue may complement a timeless and elegant style. These details help me understand the full picture rather than viewing your hair and makeup separately from the wedding.",
    },
    { type: "h2", text: "Expect a conversation, not just an application" },
    {
      type: "p",
      text: "Your preview is a collaborative appointment. At the beginning, we will talk through your inspiration and priorities. I may ask what you normally wear, what makes you feel most confident, and whether there are any styles or makeup details you strongly dislike.",
    },
    {
      type: "p",
      text: "For makeup, we may discuss natural, soft glam, or full glam; matte, satin, or radiant skin; light or fuller coverage; neutral or defined eyes; individual or strip lashes; brow shape and definition; blush and contour preferences; and lip color and finish. For hair, we may discuss updo, half-up, waves, or ponytail; sleek or textured finish; volume at the crown; face-framing pieces; part placement; hair accessories; veil placement; and concerns about humidity or hold.",
    },
    {
      type: "p",
      text: "Please communicate openly throughout the appointment. You will not hurt my feelings by asking for an adjustment — the preview is the right time to make changes and explore your preferences.",
    },
    { type: "h2", text: "Trust the process" },
    {
      type: "p",
      text: "Hair and makeup often come together in stages. The first curl, the first section of an updo, or the beginning of foundation application will not look like the finished result. Try to allow the process to develop before making a final judgment.",
    },
    {
      type: "p",
      text: "Once the complete hairstyle and makeup look are finished, we will evaluate the overall balance and can then soften, define, add, remove, or reposition details as needed. Sometimes a bride arrives believing she wants a specific look but discovers that she prefers a slightly different direction once she sees it on herself. That is one of the most valuable parts of a preview — it allows us to learn what feels right before the wedding day.",
    },
    { type: "h2", text: "Take photos in different lighting" },
    {
      type: "p",
      text: "Once your preview is complete, take photographs from several angles — from the front, from both sides, from the back, in natural light, indoors, with and without your veil, and smiling and with a relaxed expression.",
    },
    {
      type: "p",
      text: "Makeup can appear different in person, in professional photography, and on a phone camera. Natural light photos are especially helpful when evaluating the complexion, blush, eye makeup, and overall balance. Hair should also be photographed from every angle, particularly if the style includes detailed twists, braids, curls, or accessories. I may take reference photos and notes so the final look can be recreated accurately on your wedding day.",
    },
    { type: "h2", text: "Wear the look for several hours" },
    {
      type: "p",
      text: "After your preview, pay attention to how your hair and makeup wear throughout the day. Notice how your skin feels, whether the foundation remains comfortable, how the makeup looks in different lighting, whether the lashes feel secure, how the lip color wears, whether the hairstyle remains comfortable, how well the curls or updo hold, whether any pins feel tight, and how the look photographs.",
    },
    {
      type: "p",
      text: "Avoid intentionally testing the look through extreme conditions, but enjoy your day normally. The goal is to understand how the style performs and whether you would like any adjustments for the wedding. Keep in mind that the wedding-day application may include additional finishing details based on the weather, location, and final schedule.",
    },
    { type: "h2", text: "Limit the number of opinions" },
    {
      type: "p",
      text: "You are welcome to bring a trusted person to your preview if space allows, but choose your guest carefully. Bring someone who understands your personal style, supports your decisions, and can offer calm and constructive feedback. Too many opinions can make it difficult to recognize what you truly love.",
    },
    {
      type: "p",
      text: "Your bridal beauty look should reflect you — not the preferences of every friend or family member. Ask yourself: do I feel comfortable, do I feel confident, does this look and feel like me, and will I still love this look when I see my wedding photographs years from now? The most important opinion is yours.",
    },
    { type: "h2", text: "What happens after the preview?" },
    {
      type: "p",
      text: "After your preview, your final hair and makeup selections will be documented. Any important notes may include products used, complexion finish, lash style, lip color, hairstyle structure, part placement, accessories, veil placement, extension needs, requested adjustments, and estimated service timing.",
    },
    {
      type: "p",
      text: "If you think of a small change after the appointment, make a note and communicate it before the wedding day. It is common for brides to request slight refinements, such as a softer lip, less volume, more face-framing pieces, or a little additional definition around the eyes. The preview gives us a strong foundation, while the final wedding-day look brings every detail together.",
    },
    { type: "h2", text: "A preview creates confidence" },
    {
      type: "p",
      text: "Your bridal preview should leave you feeling excited and reassured. It removes uncertainty from the wedding morning and gives you the confidence of knowing that your look has already been thoughtfully designed. When your wedding day arrives, you will not be meeting your artist for the first time or wondering whether your ideas will work — we will already understand your preferences, your features, your accessories, and the look we are creating together. That familiarity allows the wedding morning to feel more relaxed, organized, and personal.",
    },
    { type: "h2", text: "Preparing for your bridal preview" },
    {
      type: "p",
      text: "Before your appointment, please remember to:",
    },
    {
      type: "ul",
      items: [
        "Send clear front and back photos of your current hair",
        "Send two to three hair inspiration photos",
        "Send two to three makeup inspiration photos",
        "Arrive with freshly washed and fully blow-dried hair",
        "Arrive with a clean, makeup-free, moisturized face",
        "Wear a white or light-colored top",
        "Choose a neckline similar to your wedding dress",
        "Bring your veil, hair accessories, extensions, and jewelry",
        "Share any allergies, sensitivities, or beauty concerns",
        "Come ready to collaborate and enjoy the experience",
      ],
    },
    {
      type: "p",
      text: "Your bridal preview is a special part of your wedding journey. It is where your vision becomes more personal, your questions begin to feel settled, and you get your first glimpse of how you may look and feel as a bride.",
    },
    { type: "h2", text: "Planning your wedding in Northeast Florida?" },
    {
      type: "p",
      text: "Maureen Ella provides bridal hair and makeup services for weddings, elopements, and special celebrations throughout St. Augustine, Jacksonville, Palm Coast, and surrounding Northeast Florida locations. Every bridal look is created with thoughtful attention to your natural features, personal style, wedding details, and the way you want to feel when you walk down the aisle.",
    },
    {
      type: "p",
      text: "Your wedding beauty experience should feel calm, personal, and beautifully yours — from the bridal preview to the final touch before the ceremony.",
    },
  ],
},

"how-to-choose-a-bridal-hairstylist": {
  image: "/images/journal/how-to-choose-a-bridal-hairstylist.jpg",
  excerpt:
    "Your bridal hairstyle should complement your dress, venue, and wedding style. Here is how to choose a bridal hairstylist whose portfolio, experience, and process truly fit your day.",
  datePublished: "2026-07-22",
  body: [
    {
      type: "p",
      text: "Choosing your bridal hairstylist is about more than finding someone who can create a beautiful updo or soft waves. Your wedding hairstyle becomes part of your complete bridal look — it should complement your dress, veil, accessories, venue, season, and the overall feeling of your celebration.",
    },
    {
      type: "p",
      text: "The right bridal hairstylist will not simply copy an inspiration photo. They will take the time to understand your vision and create a hairstyle that feels personal, flattering, and connected to the rest of your wedding. Whether you are planning a romantic garden wedding, an elegant ballroom celebration, a coastal ceremony, or an intimate elopement in St. Augustine, choosing an artist whose work aligns with your wedding style can make the entire beauty experience feel more intentional. Here is what to consider when choosing the best bridal hairstylist for your wedding day.",
    },
    { type: "h2", text: "Begin with the overall feeling of your wedding" },
    {
      type: "p",
      text: "Before searching for a hairstylist, think about how you want your wedding to feel. Your wedding may be romantic and soft, timeless and elegant, modern and minimal, coastal and relaxed, glamorous and formal, bohemian and organic, vintage-inspired, or classic and traditional.",
    },
    {
      type: "p",
      text: "The feeling of your wedding can help guide your hairstyle. A soft garden wedding may pair beautifully with textured waves, delicate face-framing pieces, or a romantic low bun. A formal ballroom celebration may inspire a more polished chignon, sculpted waves, or a sleek and structured style. A coastal wedding may call for a hairstyle that feels effortless while still being secure enough to withstand wind and humidity.",
    },
    {
      type: "p",
      text: "Your hairstyle does not have to match every decorative detail. However, it should feel like it belongs within the full visual story of your wedding.",
    },
    { type: "h2", text: "Look for a portfolio that reflects your style" },
    {
      type: "p",
      text: "When reviewing a bridal hairstylist's work, ask yourself whether you can imagine yourself in their portfolio. Every artist develops a certain style, even when they are capable of creating many different looks. Some artists may specialize in soft, romantic texture; sleek and polished updos; Hollywood waves; bohemian braids; natural curls and textured hair; modern buns and ponytails; classic bridal styling; or editorial and high-glamour looks.",
    },
    {
      type: "p",
      text: "A portfolio filled with beautiful work does not automatically mean the artist is the right fit for your wedding. Look for consistency in the types of hairstyles you are naturally drawn to. If you want an airy, romantic style but the artist's portfolio is primarily sleek and structured, their work may not fully reflect your vision. Likewise, if you prefer a smooth, refined finish, an artist known mainly for loose and undone texture may not be the best stylistic match. The goal is to find someone whose work already feels connected to the look you want.",
    },
    { type: "h2", text: "Pay attention to real wedding photographs" },
    {
      type: "p",
      text: "Social media can be helpful when searching for a hairstylist, but it is important to look beyond close-up photographs taken immediately after styling. Real wedding photos can show how a hairstyle looks in motion, from different angles, and alongside the bride's dress, veil, makeup, and venue. Look for photographs that show the front of the hairstyle, both side profiles, the back of the hairstyle, the veil placement, the style after the bride is dressed, outdoor portraits, candid moments, and the hairstyle later in the celebration.",
    },
    {
      type: "p",
      text: "A hairstyle may look beautiful from the back but may not flatter the bride from the front. An experienced bridal hairstylist understands that the style must photograph well from every angle. Real wedding galleries also help you see whether the artist's work complements different bridal styles rather than appearing separate from the rest of the wedding.",
    },
    { type: "h2", text: "Consider your wedding dress" },
    {
      type: "p",
      text: "Your wedding dress is one of the most important details to consider when choosing your hairstyle. The neckline, back design, fabric, silhouette, and overall style of your gown can influence whether your hair looks best up, down, or somewhere in between.",
    },
    {
      type: "p",
      text: "Strapless and sweetheart necklines offer flexibility — soft waves, half-up styles, ponytails, and updos can all work beautifully. Wearing the hair down may create a romantic effect, while an updo can highlight the shoulders and neckline. High-neck or detailed gowns often pair well with a polished bun, textured updo, or sleek ponytail, so the hair does not compete with an intricate neckline and lace, beading, or embroidery can remain visible.",
    },
    {
      type: "p",
      text: "Open-back dresses often call for an updo or side-swept style that can showcase the back of the gown; if you prefer wearing your hair down, consider a style that can be placed over one shoulder so the dress details are still visible. Off-the-shoulder gowns pair beautifully with soft updos, romantic waves, and face-framing pieces that complement rather than hide the neckline. A minimalist gown may pair well with a clean, sleek bun or polished ponytail, or a more textured hairstyle can create intentional contrast.",
    },
    {
      type: "p",
      text: "Your hairstylist should consider the complete silhouette rather than viewing the hairstyle separately from the gown.",
    },
    { type: "h2", text: "Think about your veil and accessories" },
    {
      type: "p",
      text: "Your veil, hairpiece, flowers, tiara, pins, or comb should feel naturally incorporated into your hairstyle. Different accessories require different types of support — a long cathedral veil may need a secure foundation, while a lightweight fingertip veil may work with a wider variety of hairstyles. A delicate comb may sit beautifully above a low bun, while a tiara may require volume and structure around the crown.",
    },
    {
      type: "p",
      text: "When reviewing a hairstylist's portfolio, look for examples of veils placed securely, hair combs incorporated naturally, floral accents, pearls or decorative pins, tiaras and headbands, and accessory placement that does not overwhelm the hairstyle. Your accessories should enhance the style rather than look like they were added as an afterthought. A bridal preview is the best time to test the placement of your veil and accessories before the wedding day.",
    },
    { type: "h2", text: "Choose an artist with experience in your hair type" },
    {
      type: "p",
      text: "A beautiful inspiration photo does not always translate exactly to every hair type. Hair texture, density, length, color, layering, and condition all affect the final result. Look for an artist who has experience working with hair similar to yours — this is especially important for brides with naturally curly hair, coily or textured hair, fine hair, very thick hair, short hair, long or heavy hair, hair extensions, or bangs and face-framing layers.",
    },
    {
      type: "p",
      text: "An experienced stylist will know how to adapt the inspiration while protecting the health and integrity of your hair. They should also be honest about whether your desired style may require extensions, padding, additional preparation, or a modified shape. Extensions are not only used for length — they can also add volume, fullness, structure, and support. The right stylist will explain what is realistically possible and offer solutions that preserve the feeling of your inspiration.",
    },
    { type: "h2", text: "Consider your venue and wedding season" },
    {
      type: "p",
      text: "Your wedding environment should influence your hairstyle. A style that works beautifully in a climate-controlled ballroom may need adjustments for an outdoor ceremony in Florida. For weddings in St. Augustine, Jacksonville, Palm Coast, and throughout Northeast Florida, brides should consider heat, humidity, wind, coastal moisture, outdoor portraits, rain, and travel between locations.",
    },
    {
      type: "p",
      text: "A loose hairstyle may need additional support for a beach ceremony. Soft waves may need to be adjusted depending on your natural texture and the expected humidity. An updo may be a more comfortable choice for a warm summer wedding, especially if the ceremony and portraits are outdoors. This does not mean you must give up the style you love — a skilled bridal hairstylist will help you choose a version of the look that is both beautiful and realistic for your venue and season.",
    },
    { type: "h2", text: "Look for consistency, not just one perfect photo" },
    {
      type: "p",
      text: "Many brides find a hairstylist after seeing one beautiful image online. While that photograph can be inspiring, it is important to review the artist's full body of work. Ask yourself: are the hairstyles consistently polished, do the styles look secure, are the pins well hidden, does the texture look intentional, are the front and side views flattering, do the hairstyles suit the individual brides, does the work appear consistent across different hair types, and are there real brides as well as styled shoots?",
    },
    {
      type: "p",
      text: "One exceptional photograph does not always reflect the artist's everyday work. Consistency shows that the stylist has a reliable process and can produce beautiful results across different wedding days, hair types, and environments.",
    },
    { type: "h2", text: "Read reviews about the full experience" },
    {
      type: "p",
      text: "Technical skill is important, but your bridal beauty experience also depends on professionalism, communication, and personality. Read reviews to learn how the stylist makes brides feel — look for comments about clear communication, punctuality, organization, calmness, listening skills, attention to detail, flexibility, professionalism, how well the hairstyle lasted, and how the artist handled changes or unexpected situations.",
    },
    {
      type: "p",
      text: "Your hairstylist will be one of the people with you during the most personal hours of your wedding morning. You should feel comfortable asking questions, expressing concerns, and requesting adjustments. The right stylist should make you feel heard and supported — not rushed, intimidated, or dismissed.",
    },
    { type: "h2", text: "Ask about their wedding-day process" },
    {
      type: "p",
      text: "A professional bridal hairstylist should have a clear process for preparing for your wedding. This may include a bridal contract, a retainer or booking fee, a bridal preview, a final service count, a personalized beauty timeline, arrival and setup details, travel policies, additional artist arrangements, hair preparation instructions, accessory and veil planning, and final payment information.",
    },
    {
      type: "p",
      text: "A structured process protects both the bride and the artist, and helps prevent confusion as the wedding approaches. Ask how the stylist determines the start time, how many services they can complete, and when an additional artist may be needed. A beautiful hairstyle matters, but so does having a wedding morning that runs smoothly.",
    },
    { type: "h2", text: "Schedule a bridal preview" },
    {
      type: "p",
      text: "A bridal preview allows you to experience the stylist's work before the wedding day. During the appointment, you can discuss your dress, venue, wedding style, hair inspiration, veil and accessories, hair texture, extensions, desired level of volume, face-framing pieces, part placement, and comfort and hold.",
    },
    {
      type: "p",
      text: "The preview is also an opportunity to see how well you communicate with the artist. Do they listen carefully? Do they explain their recommendations? Do they ask thoughtful questions? Do you feel comfortable requesting an adjustment? The preview should feel collaborative — you should leave with greater confidence in both your hairstyle and the person creating it.",
    },
    { type: "h2", text: "Do not choose based on price alone" },
    {
      type: "p",
      text: "Wedding budgets are important, and every couple must make choices based on their priorities. However, bridal hair is not only about the time spent styling on the wedding morning — you are also investing in experience, professional products, sanitation, tools and equipment, communication, scheduling, timeline planning, travel, reliability, knowledge of different hair types, experience with veils and accessories, and the ability to work calmly under pressure.",
    },
    {
      type: "p",
      text: "The least expensive option may not provide the experience, service, or peace of mind you need. The most expensive option is not automatically the best fit either. Choose the artist whose work, professionalism, and approach provide the strongest overall value for your wedding.",
    },
    { type: "h2", text: "Choose someone who understands you" },
    {
      type: "p",
      text: "Your bridal hairstyle should not feel like a costume — it should feel like an elevated version of you. Some brides feel most beautiful in polished waves. Others feel more confident with their hair pulled back. Some want soft movement around the face, while others prefer a clean and refined finish.",
    },
    {
      type: "p",
      text: "A good hairstylist will not pressure you into a trend that does not feel authentic. They will help you understand which details are most flattering while still respecting your personal style. Your inspiration photos are important, but so is the way you normally wear your hair, how much volume you enjoy, whether you like your ears covered, and how comfortable you feel with pieces around your face. The best result comes from combining professional guidance with your individual preferences.",
    },
    { type: "h2", text: "Your hairstylist should complement the entire wedding vision" },
    {
      type: "p",
      text: "The best bridal hairstylist is not simply the artist with the most beautiful portfolio. It is the artist whose work, experience, communication, and approach align with the way you want to look and feel on your wedding day. Your hairstyle should complement your wedding dress, your veil, your accessories, your makeup, your venue, your season, your wedding style, and your personality.",
    },
    {
      type: "p",
      text: "When all of these details work together, your bridal look feels thoughtful and complete. You should be able to look back at your wedding photographs and recognize yourself — not only in the way you look, but in the feeling the hairstyle helped create.",
    },
    { type: "h2", text: "Bridal hair and makeup in Northeast Florida" },
    {
      type: "p",
      text: "Maureen Ella provides bridal hair and makeup services for weddings, elopements, and special celebrations throughout St. Augustine, Jacksonville, Palm Coast, and surrounding Northeast Florida locations. Each bridal look is created with careful attention to your natural features, personal preferences, wedding dress, accessories, venue, and overall wedding style.",
    },
    {
      type: "p",
      text: "The goal is not simply to create beautiful hair. It is to create a bridal look that feels connected, intentional, and completely yours.",
    },
  ],
},

"when-to-book-wedding-hair-makeup": {
  metaTitle: "When to Book Wedding Hair & Makeup",
  image: "/images/journal/when-to-book-wedding-hair-makeup.jpg",
  imageAlt:
    "Maureen Ella applying makeup during a bridal beauty appointment",
  imagePosition: "center",
  excerpt:
    "Learn when to book wedding hair and makeup, when to schedule your bridal preview, and what to plan at each stage before your wedding day.",
  datePublished: "2026-08-06",
  body: [
    {
      type: "p",
      text: "The best time to book wedding hair and makeup is usually soon after your date and venue are confirmed. For many couples, that means beginning the search about nine to twelve months before the wedding. Saturdays in popular wedding seasons and dates with large bridal parties may fill earlier, while a weekday, intimate wedding, or shorter engagement can leave more flexibility. The useful answer is not a single deadline: inquire early enough to choose an artist whose work and process feel right, instead of choosing only from whoever still has the date open.",
    },
    {
      type: "p",
      text: "Your beauty artist affects more than your final look. They help shape the wedding-morning schedule, coordinate services for the people getting ready with you, and prepare hair and makeup for the weather, photography, ceremony, and hours ahead. Reserving that relationship early gives you time to make thoughtful decisions without turning beauty planning into a last-minute project.",
    },
    { type: "h2", text: "The short answer: start once your date and venue are set" },
    {
      type: "p",
      text: "You do not need every hairstyle selected or every bridesmaid confirmed before you inquire. You do need the essentials: your wedding date, venue or getting-ready area, an estimated number of hair and makeup services, and a general idea of when you need to be ready. With that information, an artist can confirm availability, explain the booking process, and flag whether the service count may require another artist.",
    },
    {
      type: "ul",
      items: [
        "Nine to twelve months before: a comfortable inquiry window for many weddings.",
        "Twelve months or more: worth considering for a popular Saturday, a destination weekend, or a larger group.",
        "Less than six months: still inquire. Availability changes, and a weekday or intimate celebration may be easier to place.",
        "As soon as possible: the right approach when your wedding is only a few weeks or months away.",
      ],
    },
    {
      type: "p",
      text: "These windows are planning guidance, not rules. Northeast Florida has weddings throughout the year, and every artist manages availability differently. A clear inquiry is always more useful than assuming you are either too early or too late.",
    },
    { type: "h2", text: "Twelve to nine months before: research and reserve" },
    {
      type: "p",
      text: "Begin with real wedding work, not a single perfect image. Look for consistent hair from the front, sides, and back; makeup photographed in daylight and flash; and finished looks across different features, skin tones, hair textures, and ages. Then read reviews for the parts a portfolio cannot show: communication, punctuality, organization, calmness, and how well the look lasted.",
    },
    {
      type: "p",
      text: "When you find a strong fit, review the agreement carefully. Confirm what reserves the date, what services are included, whether travel applies, how the final service count is handled, and what happens if the schedule requires an additional artist. A professional booking process should make expectations clearer for both sides. Your date is generally not reserved by an inquiry alone, so complete the artist's stated agreement and retainer steps if you decide to move forward.",
    },
    { type: "h2", text: "Eight to six months before: shape the beauty plan" },
    {
      type: "p",
      text: "Once booked, start collecting inspiration with a purpose. Save images that show the full hairstyle, the amount of face-framing you like, your preferred makeup intensity, and examples on people with features or hair qualities similar to yours. Also note what you do not like. A clear dislike can be just as informative as an inspiration photo.",
    },
    {
      type: "p",
      text: "This is also a good time to think about veil placement, hair accessories, extensions, and any skin or scalp sensitivities. If you are considering a meaningful haircut, color change, facial, or new skincare routine, give yourself enough time to test it and settle into it. Your wedding should not be the first day you discover how your skin or hair responds.",
    },
    { type: "h2", text: "Four to two months before: schedule your bridal preview" },
    {
      type: "p",
      text: "A bridal preview and booking are two different milestones. Booking secures your wedding date; the preview is the working session where you refine the look. Many brides prefer the preview a few months before the wedding: close enough that hair length, color, skin, and preferences are likely to remain similar, but early enough to adjust accessories, extensions, or the beauty plan without pressure.",
    },
    {
      type: "ul",
      items: [
        "Bring your veil, comb, pins, or other hair accessories if you have them.",
        "Wear a top close to the color and neckline of your wedding attire when possible.",
        "Bring inspiration and be ready to explain what you like about each image.",
        "Take note of how the look feels and wears after you leave, not only how it photographs in the chair.",
        "Share honest feedback. Small changes are the purpose of the preview, not a sign that it failed.",
      ],
    },
    { type: "h2", text: "Six to four weeks before: confirm people, places, and timing" },
    {
      type: "p",
      text: "As the photographer and planner finalize the broader schedule, your artist can build the beauty timeline backward from the time everyone must be completely ready. That deadline is often earlier than the ceremony time because getting dressed, detail photographs, travel, and a first look may all happen afterward.",
    },
    {
      type: "p",
      text: "Confirm the final hair and makeup service count, getting-ready address, room or suite details, access instructions, parking, and the names of everyone receiving a service. Tell your artist about thick, long, curly, or extension-enhanced hair and any accessibility or sensitivity needs that could affect timing. Good scheduling depends on accurate information, and a little detail now protects the calm of the wedding morning.",
    },
    { type: "h2", text: "The final week: prepare, do not experiment" },
    {
      type: "p",
      text: "Follow the preparation instructions your own artist provides, since they may differ by hair type, skin needs, and planned style. In general, keep your routine familiar, avoid aggressive last-minute treatments, gather your accessories, and make sure the getting-ready group has the beauty schedule. Choose a clean, comfortable space with useful light, outlets, surfaces, and room for the team to work.",
    },
    {
      type: "p",
      text: "The goal of booking early is not to spend a year worrying about hair and makeup. It is the opposite. Once the right artist and process are in place, each decision has a natural time, and the wedding morning can feel guided rather than managed by you.",
    },
    { type: "h2", text: "What to include in your first inquiry" },
    {
      type: "ul",
      items: [
        "Wedding date and ceremony location.",
        "Getting-ready location, if it is different or already known.",
        "Estimated number of hair services and makeup services.",
        "Your target ready time, first-look time, or ceremony time.",
        "Whether you are planning a wedding, elopement, or destination celebration.",
        "Any important hair, skin, accessibility, or timing details you already know.",
      ],
    },
    {
      type: "p",
      text: "A thoughtful inquiry makes it easier to receive an accurate answer and begin a real conversation. If your date is set and you are planning in St. Augustine, Jacksonville, Palm Coast, or elsewhere in Northeast Florida, you do not need to wait until every beauty detail is decided. Start with what you know; the rest can be planned together.",
    },
  ],
  faqs: [
    {
      question: "How far in advance should I book wedding hair and makeup?",
      answer:
        "For many weddings, beginning your search about nine to twelve months ahead provides a comfortable planning window. Popular Saturdays, destination dates, and larger groups may benefit from an earlier inquiry, but shorter timelines can still work when an artist has availability.",
    },
    {
      question: "Should I book hair and makeup before I know my final service count?",
      answer:
        "You can usually begin with a realistic estimate. Ask the artist how additions, reductions, minimums, and extra-artist needs are handled, then confirm the final count by the deadline in your agreement.",
    },
    {
      question: "When should I schedule my bridal hair and makeup preview?",
      answer:
        "Many brides schedule a preview two to four months before the wedding. Your artist may recommend a different window based on availability, hair changes, travel, or the complexity of your look.",
    },
    {
      question: "Do I need a hairstyle picked before I book?",
      answer:
        "No. A general sense of the artist's style and the services you need is enough to inquire. Your preview is designed to test and refine the specific look.",
    },
  ],
  relatedLinks: [
    {
      href: "/bridal/services",
      title: "Explore Bridal Services",
      description: "See how on-location bridal hair and makeup are planned.",
    },
    {
      href: "/journal/bridal-hair-makeup-preview-what-to-expect",
      title: "What to Expect at Your Preview",
      description: "Prepare for the session where your wedding-day look takes shape.",
    },
    {
      href: "/journal/wedding-hair-makeup-timeline-st-augustine",
      title: "Build Your Beauty Timeline",
      description: "Plan a calm, on-time wedding morning in St. Augustine.",
    },
  ],
},

"florida-wedding-hair-makeup-humidity": {
  metaTitle: "Florida Wedding Hair & Makeup for Humidity",
  image: "/images/journal/florida-wedding-hair-makeup-humidity.jpg",
  imageAlt:
    "Bridal artist finishing a textured updo for a Florida wedding morning",
  imagePosition: "center",
  excerpt:
    "Planning a Florida wedding? Learn how thoughtful hair, makeup, prep, and timing help bridal beauty hold through heat, humidity, and coastal air.",
  datePublished: "2026-08-06",
  body: [
    {
      type: "p",
      text: "Florida wedding hair and makeup should be planned for the real environment, not only the inspiration photo. In St. Augustine, Jacksonville, Palm Coast, and along the Northeast Florida coast, warmth, humidity, wind, and quick moves between air-conditioning and outdoor air can all influence how hair and makeup wear. The answer is not to make your bridal look stiff or heavy. It is to choose the right structure, preparation, products, and timeline for you.",
    },
    {
      type: "p",
      text: "No responsible artist can promise that weather will never touch a single hair or that makeup will look entirely unchanged after hours of happy tears, hugs, heat, and dancing. What an experienced bridal artist can do is reduce avoidable problems, explain the tradeoffs in each style, and build a look that wears gracefully. Long-lasting beauty begins with an honest plan.",
    },
    { type: "h2", text: "Why Florida humidity changes the beauty plan" },
    {
      type: "p",
      text: "Humidity adds moisture to the air. Hair may return toward its natural texture, fine curls can relax, smooth strands can frizz, and skin can become warmer or shinier. Coastal wind and a veil add movement, while perspiration and frequent touching can disturb even well-set makeup. Your natural hair pattern, density, skin type, ceremony setting, and time outdoors matter more than a season label alone.",
    },
    {
      type: "p",
      text: "That is why two brides at the same venue may need different approaches. One may feel most secure in a textured low bun with controlled face-framing pieces; another may happily accept movement in soft waves because wearing her hair down feels most like herself. The goal is not one so-called humidity-proof style. It is a look whose beauty and maintenance match your priorities.",
    },
    { type: "h2", text: "Choose a hairstyle with informed tradeoffs" },
    {
      type: "p",
      text: "Updos generally keep hair away from the neck and give the stylist more places to anchor the shape, which can be helpful for an outdoor ceremony or a long, warm day. Half-up styles provide structure around the crown while preserving romantic length. Hair worn fully down can be beautiful, but loose curls have more exposure to humidity, wind, shoulders, and constant movement.",
    },
    {
      type: "ul",
      items: [
        "For maximum structure: consider a bun, twist, braid, or pinned textured updo.",
        "For softness with support: consider a half-up style with intentional volume and secure anchoring.",
        "For hair worn down: choose a shape you still love when the curl relaxes and allow time for strategic touch-ups.",
        "For naturally curly hair: decide whether you want to feature, refine, stretch, or reshape your texture; each choice needs different prep.",
        "For fine or shorter hair: ask whether clip-in extensions would add useful density or support, not only length.",
      ],
    },
    {
      type: "p",
      text: "A polished style does not have to look rigid. Texture can be romantic and touchable while the hidden foundation stays secure. During your preview, ask what will happen if the curl softens, the wind lifts the front pieces, or you remove the veil after the ceremony. A good style has a plan for those transitions.",
    },
    { type: "h2", text: "Hair preparation matters as much as hairspray" },
    {
      type: "p",
      text: "Long-lasting wedding hair is built in layers. Clean, completely dry hair gives your stylist a predictable canvas. The right prep products add grip or smoothness where needed; controlled heat reshapes the hair; pins and internal structure support the design; finishing products help manage moisture and movement. Simply coating an unprepared style with more hairspray does not create the same result.",
    },
    {
      type: "ul",
      items: [
        "Follow your artist's wash-day instructions rather than relying on the idea that dirty hair always styles better.",
        "Arrive with hair fully dry unless your artist specifically requests another preparation method.",
        "Avoid untested masks, oils, smoothing treatments, or heavy products immediately before the wedding.",
        "Bring your veil, extensions, and accessories to the preview so their weight and placement can be tested.",
        "Share your hair's real behavior: where it frizzes, what falls first, and how it responds to heat and moisture.",
      ],
    },
    { type: "h2", text: "Long-wearing makeup starts before foundation" },
    {
      type: "p",
      text: "In humid weather, more makeup is not automatically longer-lasting makeup. Thoughtful skin preparation, compatible formulas, thin layers, and targeted setting often wear better than a thick base. Your artist may use different preparation on a dry cheek than on an oil-prone forehead, then balance powders and setting products so the finish remains dimensional in photographs.",
    },
    {
      type: "p",
      text: "Keep skincare consistent in the weeks before the wedding and avoid first-time treatments close to the date. Tell your artist about sensitivities, allergies, excessive dryness, oiliness, or medications that affect your skin. Arrive with a clean face prepared according to their instructions. Skin does not need to be perfect to look beautiful; it needs to be treated with care and realistic expectations.",
    },
    { type: "h2", text: "Airbrush versus traditional makeup in humidity" },
    {
      type: "p",
      text: "Both airbrush and traditionally applied makeup can be suitable for a Florida wedding. Airbrush describes an application method, not an automatic guarantee of durability, and traditional complexion products range widely in finish and wear. The better question is which formula, finish, and application suit your skin, desired coverage, photography, and comfort. Your preview is the place to compare how a recommended approach looks and feels on you.",
    },
    { type: "h2", text: "Protect the look with a realistic timeline" },
    {
      type: "p",
      text: "Even excellent hair and makeup can be undermined by avoidable exposure. If possible, get dressed in a cool room, limit unnecessary outdoor waiting before portraits, and coordinate transportation so you are not standing in direct sun while a car arrives. Ask your photographer and planner where portraits will happen and how long the first look may keep you outside.",
    },
    {
      type: "p",
      text: "Your beauty completion time should leave space for getting dressed, photographs, travel, and small delays without forcing everyone to rush. Finishing too early may create hours of extra wear before the ceremony; finishing too late creates stress and perspiration just when you want to feel composed. The best schedule balances both.",
    },
    { type: "h2", text: "Build a small, useful touch-up kit" },
    {
      type: "p",
      text: "Touch-ups are normal maintenance, not evidence that your makeup failed. Keep a few purposeful items with a trusted person so you do not have to carry a full beauty bag. Blot before adding powder, press rather than wipe, and avoid running your fingers through finished hair. If your artist provides different instructions, follow the plan created for your look.",
    },
    {
      type: "ul",
      items: [
        "Your exact lip color and a small mirror.",
        "Blotting papers or clean tissue for perspiration and shine.",
        "A light pressed powder if your artist recommends one.",
        "A few hairpins that match your hair color.",
        "A small amount of the finishing product recommended by your stylist.",
        "Tissues, cotton swabs, and a clean handkerchief for happy tears.",
      ],
    },
    { type: "h2", text: "Questions to ask at your Florida bridal preview" },
    {
      type: "ul",
      items: [
        "How is this hairstyle likely to change after several hours outside?",
        "Which face-framing pieces can stay soft without becoming distracting in wind?",
        "How will my veil be secured and removed without disturbing the style?",
        "What should I use for makeup touch-ups, and what should I avoid?",
        "Would another hairstyle or finish better match my comfort level and venue conditions?",
        "Should the timeline include a planned touch-up before the ceremony or after portraits?",
      ],
    },
    {
      type: "p",
      text: "The strongest Florida wedding beauty plan respects both the climate and the person wearing it. You should understand the tradeoffs, recognize yourself in the mirror, and feel confident that the look was designed for your actual day. With a thoughtful preview, honest preparation, and a timeline built around Northeast Florida conditions, romantic bridal hair and makeup can remain polished without losing its softness.",
    },
  ],
  faqs: [
    {
      question: "What wedding hairstyle holds best in Florida humidity?",
      answer:
        "Pinned styles such as buns, twists, braids, and textured updos often provide the most structure, but the best choice depends on your natural texture, density, comfort, accessories, and time outdoors. A preview helps you compare durability with the look you love.",
    },
    {
      question: "Can I wear my hair down for a Florida wedding?",
      answer:
        "Yes, as long as you are comfortable with natural movement and possible curl relaxation. Ask your stylist how your hair typically responds to moisture, whether added density would help, and what touch-up plan makes sense.",
    },
    {
      question: "Is airbrush makeup better for humid weather?",
      answer:
        "Not automatically. Airbrush is an application method, and both airbrush and traditional formulas can wear beautifully. Skin preparation, formula compatibility, thin layers, setting, and your individual skin are more useful factors to discuss with your artist.",
    },
    {
      question: "How do I keep bridal makeup fresh in Florida heat?",
      answer:
        "Begin with consistent skincare and professional preparation, then limit unnecessary heat exposure and carry a small touch-up kit. Blot moisture before adding powder and use the exact lip and complexion products your artist recommends.",
    },
  ],
  relatedLinks: [
    {
      href: "/bridal/st-augustine",
      title: "St. Augustine Bridal Hair & Makeup",
      description: "Explore on-location beauty for historic, coastal, and beach weddings.",
    },
    {
      href: "/bridal/prep-guides/hair-prep",
      title: "Bridal Hair Prep Guide",
      description: "Follow the practical steps that give your style a strong foundation.",
    },
    {
      href: "/bridal/prep-guides/makeup-prep",
      title: "Bridal Makeup Prep Guide",
      description: "Prepare your skin and wedding-morning space with confidence.",
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
      metaTitle: authored?.metaTitle,
      image: authored?.image,
      imageAlt: authored?.imageAlt,
      imagePosition: authored?.imagePosition,
      body: authored?.body ?? [],
      datePublished: authored?.datePublished,
      dateModified: authored?.dateModified,
      faqs: authored?.faqs,
      relatedLinks: authored?.relatedLinks,
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
