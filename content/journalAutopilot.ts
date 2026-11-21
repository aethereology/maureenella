/**
 * Journal posts written by the scheduled Journal Autopilot (cloud routine that
 * runs Mon/Wed/Fri). See journal-autopilot/RUNBOOK.md for the full process.
 *
 * Same guardrails as content/journalBrideQuestions.ts:
 * - Never state Maureen Ella's own prices, collection names, or travel /
 *   retainer / touch-up amounts (D004/D009/D013/D014). Third-party figures are
 *   allowed only when named, dated, and listed under a "Sources" heading (D015).
 * - One unique hero per post: /images/journal/<slug>.jpg, taken from the
 *   journal-autopilot/photos pool and never reused.
 * - No invented reviews, clients, credentials, awards, or statistics.
 *
 * New posts are appended at the END of this object. Each must also have a
 * matching entry in seed/blog_posts.json. `npm run validate:journal` checks all
 * of the above before anything is pushed.
 */
import type { AuthoredArticle } from "@/content/journal";

export const AUTOPILOT_BODIES: Record<string, AuthoredArticle> = {
  "winter-wedding-makeup": {
    metaTitle: "Winter Wedding Makeup: What Looks Best",
    excerpt:
      "The best winter wedding makeup is a hydrated, glowing base with richer lips or defined eyes. Here is how to plan it for Northeast Florida's mild winters.",
    image: "/images/journal/winter-wedding-makeup.jpg",
    imageAlt:
      "Maureen Ella in a portrait with soft glam makeup, a deep berry lip, and long waves, in a black leather jacket",
    imagePosition: "center 30%",
    datePublished: "2026-11-21",
    body: [
      {
        type: "p",
        text: "The makeup that looks best for a winter wedding is a hydrated, luminous base with one richer feature. That usually means a deeper lip, like berry, wine, or a warm rose, or softly defined eyes with fuller lashes. Winter light is lower and warmer, and indoor air is drier, so skin prep matters more than any single product. In Northeast Florida, winter is mild, so you can wear the season's richer colors without worrying about snow or heavy layers.",
      },
      { type: "h2", text: "What makes winter wedding makeup different?" },
      {
        type: "p",
        text: "Three things change in winter: the light, the air, and the mood. The sun sets earlier, so many ceremonies and portraits happen in golden, low light or by candle and string light. Indoor heating and air conditioning can leave skin feeling dry or tight. And winter weddings tend to feel a little more formal, which makes a more polished look feel natural.",
      },
      {
        type: "ul",
        items: [
          "Warm, low light is flattering, so you do not need to overcorrect your color.",
          "Dry indoor air shows up on skin that was not hydrated, so prep matters.",
          "Evening ceremonies and candlelit rooms can handle slightly more definition.",
          "Richer colors feel seasonal, but they still need to feel like you.",
        ],
      },
      { type: "h2", text: "Is a dark lip right for a winter wedding?" },
      {
        type: "p",
        text: "It can be, and it is one of the most popular seasonal choices. A berry or wine lip looks beautiful with ivory and champagne gowns and with winter bouquets of deep reds, greens, and white. If a bold lip feels like too much, choose a deeper version of your natural lip color instead. A rosy mauve, a soft brick, or a warm raisin shade can read rich without feeling dramatic.",
      },
      {
        type: "p",
        text: "Deeper lip colors show wear faster, especially after a toast or a kiss. Plan on a precise application, a long-wear formula, and the exact shade in your touch-up kit. If you want a closer look at choosing a shade, the Journal has a guide to wedding day lip colors.",
      },
      { type: "h2", text: "How do you keep skin from looking dry?" },
      {
        type: "p",
        text: "Start well before the wedding. Gentle, consistent skincare in the weeks leading up gives makeup a smoother surface to sit on. Drink water, and use a moisturizer that suits your skin. Skip anything new close to the date, including exfoliating products and treatments. If you have a skin concern or want to try a facial, talk to a licensed esthetician or a dermatologist about timing.",
      },
      {
        type: "p",
        text: "On the morning of the wedding, hydrated skin takes makeup better. Your artist will prep your skin, then choose a base that looks like skin rather than a mask. Cream formulas and a light hand with powder help the finish look fresh instead of flat. Powder is still useful where you need it, usually the center of the face, but a little goes a long way.",
      },
      { type: "h2", text: "What eye makeup works best in winter?" },
      {
        type: "p",
        text: "Winter is a good season for a bit more definition. Warm browns, soft bronze, plum, and taupe all look lovely in candlelight. A softly smoked lash line with a fuller lash can make your eyes stand out in photos taken in lower light. If you plan to wear lashes, try them at your preview so you know they are comfortable for a long day.",
      },
      {
        type: "ul",
        items: [
          "Warm neutrals for a classic, timeless look.",
          "Soft bronze or champagne shimmer on the lid for evening light.",
          "A deeper plum or brown liner for definition without harshness.",
          "Balanced brows so the whole face feels finished.",
        ],
      },
      { type: "h2", text: "What about blush and cheeks in winter?" },
      {
        type: "p",
        text: "Winter calls for a healthy, flushed look. Cream blush in rose, peach, or soft berry blends into skin and has a natural finish. A little glow on the high points of the cheeks catches candlelight nicely. Pick one focus. If your lips are deep, keep the cheeks softer. If your lips are soft, you can let the cheeks and eyes do a bit more.",
      },
      { type: "h2", text: "Does winter in Northeast Florida change your plan?" },
      {
        type: "p",
        text: "A little. Winter days in St. Augustine, Jacksonville, Palm Coast, and Amelia Island are usually milder and less humid than summer, which helps makeup last. But the weather is not predictable. A cool morning can turn into a warm afternoon, and a ceremony outdoors by the water can be breezy. Because heat and humidity are usually less of a concern, you can focus more on the look itself. Ask your artist about a touch-up plan and a small kit for the evening.",
      },
      {
        type: "p",
        text: "If you are getting married outdoors, ask your photographer about the light at your ceremony time. Late afternoon winter light is soft and gold, and makeup can be a touch warmer to match it.",
      },
      {
        type: "p",
        text: "Dress and venue matter too. A satin or crepe gown in ivory reads cleaner next to a deep lip, while a lace or beaded gown often looks best with softer, glowing makeup. A historic ballroom, a church, or a restaurant with warm lighting each shows color differently. Your artist can help you match the makeup to the room you will be standing in, so the look feels planned rather than borrowed from a photo.",
      },
      { type: "h2", text: "How to plan your winter look at your preview" },
      {
        type: "ul",
        items: [
          "Bring your dress photo, your bouquet colors, and a few looks you love.",
          "Try your lip color, lashes, and any shimmer in natural light as well as indoors.",
          "Take photos at your preview to see how the look reads on camera.",
          "Decide on a touch-up shade and what you will carry on the day.",
          "Tell your artist if your skin runs dry or sensitive.",
        ],
      },
      {
        type: "p",
        text: "Maureen Ella provides bridal hair and makeup in St. Augustine, Jacksonville, Palm Coast, and across Northeast Florida. If you are planning a winter wedding, share your date, venue, and the look you have in mind when you request availability.",
      },
    ],
    faqs: [
      {
        question: "Should I wear a red or berry lip at my winter wedding?",
        answer:
          "You can, if it feels like you. Deep lips look lovely in winter. If you are unsure, try a softer version, like mauve or brick, at your preview and check how it looks in photos before deciding.",
      },
      {
        question: "Is winter wedding makeup different from summer makeup?",
        answer:
          "It is usually richer and more hydrated. Winter light is warmer and indoor air is drier, so artists focus on skin prep and a glowing finish, while summer looks focus more on heat and humidity.",
      },
      {
        question: "Can I wear shimmer eyeshadow at a winter wedding?",
        answer:
          "Yes. Soft champagne, bronze, or taupe shimmer looks beautiful in candlelight and evening photos. Keep it blended and placed on the lid so it adds light without looking heavy.",
      },
      {
        question: "How far ahead should I schedule my bridal makeup preview?",
        answer:
          "Many brides book a preview a few weeks to a couple of months before the wedding. That leaves time to adjust a color or lash choice, and to see how your skin looks in the season.",
      },
    ],
    relatedLinks: [
      {
        href: "/journal/wedding-day-lip-colors",
        title: "Wedding Day Lip Colors",
        description: "How to choose a shade that lasts and looks like you.",
      },
      {
        href: "/bridal/prep-guides/makeup-prep",
        title: "Bridal Makeup Prep Guide",
        description: "Skin prep and planning ahead of your wedding day.",
      },
      {
        href: "/bridal/services",
        title: "Bridal Services",
        description: "Bridal hair and makeup in Northeast Florida.",
      },
    ],
  },
};
