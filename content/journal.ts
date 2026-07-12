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

const BODIES: Record<
  string,
  { excerpt: string; image?: string; body: Block[]; datePublished?: string }
> = {
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

  // --- D011 migration: bridal prep + beauty favorites (Batch B) ---
  "bridal-hair-prep-guide": {
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
  image: "/images/portfolio/pf-florida-saintaugustine-kckelveyryan-181.jpg",
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
      datePublished: authored?.datePublished,
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
