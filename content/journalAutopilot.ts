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
  "wedding-hair-up-or-down": {
    metaTitle: "Wedding Hair Up or Down? How to Choose",
    excerpt:
      "Choose up, down, or half-up based on your dress, your hair type, and the weather. Here is how to decide, with Northeast Florida humidity in mind.",
    image: "/images/journal/wedding-hair-up-or-down.jpg",
    imageAlt:
      "A hair artist styling a bride's long wavy half-up hair from behind while the bride sits in a white robe in a pink getting-ready room",
    imagePosition: "center 40%",
    datePublished: "2026-11-25",
    body: [
      {
        type: "p",
        text: "Wear your hair the way that fits your dress, your hair type, and your weather. Up is the steadier choice for heat, wind, fine hair, and high necklines. Down shows off length and suits open necklines and cooler, calmer days. Half-up sits in the middle and works for many brides. If you are unsure, a hair trial will settle it faster than any list.",
      },
      { type: "h2", text: "What should I think about first?" },
      {
        type: "p",
        text: "Start with how you feel. Think about how you wear your hair on a good day and what makes you feel most like yourself in photos. Then look at the practical side: your dress, your veil, your hair type, and where you are getting married. When your gut and the practical side agree, the choice is easy. When they do not, a trial is the place to sort it out.",
      },
      { type: "h2", text: "Does my dress decide it?" },
      {
        type: "p",
        text: "Often, yes. The back and neckline of the dress are the biggest clues. Hair that falls over a detailed back can hide the very thing you chose the dress for. A high neckline or a collar can crowd long hair, and an updo lets the shape of the dress show.",
      },
      {
        type: "ul",
        items: [
          "High neck, halter, or illusion lace: an updo or half-up keeps the detail visible.",
          "Open back or low back: an updo or a low style shows it off, and half-up can still work if the hair sits high enough.",
          "Strapless or sweetheart: almost any style works, so choose by hair type and weather.",
          "V-neck or off-the-shoulder: down, half-up, and updos all look good, so let the rest of the plan lead.",
        ],
      },
      { type: "h2", text: "How does my hair type change the answer?" },
      {
        type: "p",
        text: "Fine or thin hair often does best up, or half-up with extra support, because loose curls can relax and flatten over a long day. Thick hair is more flexible. It tends to hold a curl well, so it can go down, half-up, or up, although a very full updo may need a skilled hand and plenty of pins. Curly and textured hair can look beautiful in any of these, so the key is choosing a style that works with your natural pattern, not against it.",
      },
      {
        type: "p",
        text: "Tell your artist what your hair does on its own. If it frizzes, falls flat, or loses curl within hours, say so at your trial. That detail changes the plan more than any photo you bring. For help with timing and prep, see the hair prep guide linked below.",
      },
      { type: "h2", text: "What about a veil?" },
      {
        type: "p",
        text: "A veil needs something to hold on to. Half-up styles are a popular choice because the top section gives the comb a secure base while the rest of the hair stays loose. With an updo, the veil usually sits just above or below the bun, depending on whether you want the hair detail to show. With hair fully down, your artist can build a small anchor underneath, but a long, heavy veil needs a firm base.",
      },
      {
        type: "p",
        text: "Bring your veil, or a photo of it, to your trial. Placement changes how the whole style looks, and it is much easier to adjust before the wedding than on the morning of.",
      },
      { type: "h2", text: "How do heat, humidity, and wind affect the choice?" },
      {
        type: "p",
        text: "In Northeast Florida, this matters a lot. Warm, humid days in St. Augustine, Jacksonville, Palm Coast, and Ponte Vedra can soften curls and add frizz. A beach or waterfront ceremony adds wind, and loose hair can end up across your face just as the vows begin. Styles that are pinned off the neck and secured at the nape, like a low updo or a half-up with a firm base, tend to hold best in those conditions.",
      },
      {
        type: "p",
        text: "That does not mean you cannot wear your hair down. Cooler months, indoor ceremonies, and shaded venues are friendlier to loose waves. Many brides also start with hair down for the ceremony and photos, then pin it up for dancing. Ask your artist what is realistic for your venue and season. For a closer look at wind and salt air, the Journal has a guide to beach elopement hair and makeup in St. Augustine. Whatever you choose, ask your artist to build the style for the hours you will actually be wearing it, not just the first photo.",
      },
      { type: "h2", text: "Is half-up the safe middle choice?" },
      {
        type: "p",
        text: "For many brides, yes. Half-up keeps hair off your face, shows length and movement, and gives a veil or accessory a place to sit. It is also easier to wear through a long day than a fully loose style. It is not perfect for every head of hair. Very fine hair may need extra support or added fullness, and very hot, humid days can still wear down the lower section.",
      },
      { type: "h2", text: "How do I decide at my trial?" },
      {
        type: "ul",
        items: [
          "Bring a photo of your dress, especially the back and neckline.",
          "Bring your veil or accessories, or clear photos of them.",
          "Save two or three hairstyle photos that you love, in different styles.",
          "Try your top choice, then ask to see a second option.",
          "Take photos from the front, side, and back, and check them in natural light.",
          "Ask how the style will hold through the ceremony, photos, and dancing.",
        ],
      },
      {
        type: "p",
        text: "Many brides change their minds at the trial, and that is a good outcome. It means you found out what works before the wedding day.",
      },
      {
        type: "p",
        text: "Maureen Ella provides bridal hair and makeup in St. Augustine, Jacksonville, Palm Coast, and across Northeast Florida. If you are weighing up, down, or half-up, share your date, venue, and dress details when you request availability, and we can talk through what will work best for you.",
      },
    ],
    faqs: [
      {
        question: "Can I wear my hair down and still have it last all day?",
        answer:
          "Yes, with the right prep and a realistic plan. Thick or naturally wavy hair holds loose styles best. In heat or wind, your artist may suggest pinning a section back so the style stays put.",
      },
      {
        question: "Can I change from hair down to hair up during the reception?",
        answer:
          "Many brides do. Tell your artist ahead of time so the style is built to be pinned up later, and pack a few pins and a clip in your touch-up kit so the change is quick.",
      },
      {
        question: "Should I decide before my hair trial?",
        answer:
          "You do not have to. Bring a favorite and a backup, then see them on your own hair. Seeing the style in person, with your veil, tells you more than a photo ever can.",
      },
      {
        question: "Do bridesmaids need to match the bride's hairstyle?",
        answer:
          "No. Bridesmaid hair can be a softer version of yours, or any style that suits each person. Agreeing on up, down, or half-up for the group helps the photos look cohesive.",
      },
    ],
    relatedLinks: [
      {
        href: "/journal/st-augustine-beach-elopement-hair-makeup",
        title: "St. Augustine Beach Elopement Hair and Makeup",
        description: "Planning hair and makeup for wind, sand, and salt air.",
      },
      {
        href: "/bridal/prep-guides/hair-prep",
        title: "Bridal Hair Prep Guide",
        description: "How to prepare your hair in the weeks before the wedding.",
      },
      {
        href: "/bridal/services",
        title: "Bridal Services",
        description: "Bridal hair and makeup in Northeast Florida.",
      },
    ],
  },
  "airbrush-vs-traditional-wedding-makeup": {
    metaTitle: "Airbrush vs Traditional Wedding Makeup",
    excerpt:
      "Neither is better for every bride. Airbrush is a sprayed, lightweight base that is hard to touch up. Traditional is brushed on and easier to adjust on the day.",
    image: "/images/journal/airbrush-vs-traditional-wedding-makeup.jpg",
    imageAlt:
      "Maureen applying makeup with a large brush to a blonde woman in a white camisole, in a bright getting-ready room by a window",
    imagePosition: "center 40%",
    datePublished: "2026-11-27",
    body: [
      {
        type: "p",
        text: "Neither one is better for every bride. Airbrush sprays a fine, light layer of foundation and tends to feel weightless and wear well in heat. Traditional makeup is applied with brushes and sponges, offers more formulas and finishes, and is easier to adjust on the day. The right choice depends on your skin, your venue, and the artist doing it. The best way to decide is to try both at a preview.",
      },
      { type: "h2", text: "What is the real difference?" },
      {
        type: "p",
        text: "Airbrush uses a small tool that sprays foundation as a mist. Traditional makeup is applied by hand with brushes, sponges, and fingers. Both can give a polished, natural result. The difference is mostly in how the base goes on, how it feels, and how easily it can be changed once it has set.",
      },
      {
        type: "p",
        text: "It also helps to know that airbrush is often only the foundation. Blush, brows, eyes, and lips are usually still done by hand. So the question is really about your base, not your whole look.",
      },
      { type: "h2", text: "When does airbrush make sense?" },
      {
        type: "p",
        text: "Many brides like airbrush because it feels light on the skin, with none of the heavy coat a thick foundation can leave. Search results and bridal guides often point to it for long days, outdoor weddings, and brides who want a smooth, soft-matte finish. Some brides with oily skin find it holds up well and stays fresh.",
      },
      {
        type: "ul",
        items: [
          "You want a very light feel on the skin.",
          "Your ceremony is outdoors, and heat or humidity is a worry.",
          "You like a smooth, even, semi-matte finish.",
          "You are comfortable with a base that is harder to change once it dries.",
        ],
      },
      { type: "h2", text: "When is traditional makeup the better pick?" },
      {
        type: "p",
        text: "Traditional makeup gives your artist a wider range of formulas, textures, and shades to work with. That matters if you have dry or textured skin, want a dewy glow, or want a fuller glam look with more depth. It is also easier to blend, correct, or add to if something needs a tweak. A skilled artist who prepares your skin well and sets the makeup carefully can make traditional makeup wear a long time too.",
      },
      {
        type: "p",
        text: "Airbrush can look flat if it is applied alone, because the finish is so even. Many artists add contour and highlight by hand to bring dimension back. Traditional makeup builds that dimension in naturally.",
      },
      { type: "h2", text: "Does my skin type change the answer?" },
      {
        type: "p",
        text: "Yes, but it is not a simple rule. Dry skin can make airbrush look flat or flaky if it is not well hydrated, so careful skin prep matters, and some formulas suit dry skin better than others. Oily skin is mixed too. Some brides say airbrush kept shine down, while others found it looked shinier or settled into lines. Mature skin does best with a light hand, whichever method you choose. No makeup erases texture completely, and too much product tends to settle into fine lines.",
      },
      {
        type: "p",
        text: "If you have very sensitive skin, or you are managing a skin condition, check with your dermatologist or a licensed esthetician about what is safe for you. Tell your artist about any allergies before your preview.",
      },
      { type: "h2", text: "What about Florida heat, humidity, and photos?" },
      {
        type: "p",
        text: "In St. Augustine, Jacksonville, Palm Coast, and along the beaches, weather is a real factor. Warm, humid air and sea breezes can test any makeup. Airbrush has a reputation for standing up to heat, and many brides choose it for that reason. Still, the products, the prep, and the setting steps matter as much as the tool. A good traditional application, built on the right primer and set well, can last all day.",
      },
      {
        type: "p",
        text: "In photos, the difference is often subtle. Several brides report that they could barely tell the two apart. Skill and finish matter more than the method. If photos are on your mind, schedule your preview near an engagement session or take your own photos in natural light afterward.",
      },
      { type: "h2", text: "What about touch-ups?" },
      {
        type: "p",
        text: "This is where the two differ most. Airbrush dries fast and can be hard to fix once it has set, so a smudge or a worn patch may need more than a quick blot. Traditional makeup is easier to touch up with a little powder, a sponge, or a brush. Whichever you pick, a small kit helps. Blotting paper, translucent powder, lip color, and a few cotton swabs cover most needs.",
      },
      { type: "h2", text: "How do I decide at my preview?" },
      {
        type: "ul",
        items: [
          "Ask which methods your artist offers, and which they would suggest for your skin and venue.",
          "If both are offered, try each base on the same visit, one on each side of the face, or at two previews.",
          "Look at the result in natural light, then check it again after a few hours.",
          "Notice how it feels. A base you forget you are wearing is a good sign.",
          "Ask how the look will hold through the ceremony, photos, and dancing.",
          "Tell your artist about your skin, any past reactions, and your touch-up plans.",
        ],
      },
      {
        type: "p",
        text: "Not every artist offers both, so it is worth asking early. If you love one method and your artist does not use it, you can talk through what finish you are after and how else to get it.",
      },
      {
        type: "p",
        text: "Maureen Ella provides bridal hair and makeup in St. Augustine, Jacksonville, Palm Coast, and across Northeast Florida. If you are weighing your options, share your date, venue, and what you want your skin to look and feel like when you request availability, and we can talk it through together.",
      },
    ],
    faqs: [
      {
        question: "Is airbrush makeup more expensive than traditional makeup?",
        answer:
          "It can be, since it needs extra equipment and time, but it varies by artist. Ask each artist how they price it. Pricing is shared privately after you request availability.",
      },
      {
        question: "Can I do airbrush for my face and traditional for my eyes?",
        answer:
          "Yes, and many artists work this way. Airbrush is often just the foundation, so eyes, brows, blush, and lips are usually done by hand anyway. Ask your artist what they recommend.",
      },
      {
        question: "Does airbrush makeup feel heavy or look fake?",
        answer:
          "It usually feels light, but results depend on skin prep and technique. Dry skin can look flat if it is not hydrated, so a preview is the best way to see how it looks on you.",
      },
      {
        question: "Should my bridesmaids get the same type of makeup as me?",
        answer:
          "Not necessarily. Your party can choose what suits their skin and comfort. What matters most is that the colors and finish look cohesive together in photos, and that your artist plans the timing well.",
      },
    ],
    relatedLinks: [
      {
        href: "/journal/best-foundation-for-wedding-day",
        title: "Best Foundation for Your Wedding Day",
        description: "How to choose a base that suits your skin and lasts.",
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
