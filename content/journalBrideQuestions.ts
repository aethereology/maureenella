/**
 * Journal answers to the questions brides most often search for (from Google's
 * "People also ask"). Each post leads with a direct answer, keeps one primary
 * search intent, and links onward to services and related guides.
 *
 * Pricing guardrail (D004/D009/D013): these posts never state Maureen Ella's own
 * prices. Any dollar figures are third-party national data, named and dated in
 * the copy, and framed as context — never as a quote. Her pricing is shared
 * privately after an inquiry.
 *
 * Hero images live in /public/images/journal/<slug>.jpg — one unique photo per
 * post (none reused from another Journal article).
 */
import type { AuthoredArticle } from "@/content/journal";


export const BRIDE_QUESTION_BODIES: Record<string, AuthoredArticle> = {
  "wedding-hair-and-makeup-order": {
    metaTitle: "Hair or Makeup First on Your Wedding Day?",
    excerpt:
      "Should wedding hair or makeup come first? Here is the order most bridal teams follow, where the bride fits in the schedule, and when to get dressed.",
    image: "/images/journal/wedding-hair-and-makeup-order.jpg",
    imageAlt:
      "Maureen Ella curling a bride's hair after her makeup is complete on a wedding morning",
    imagePosition: "center",
    datePublished: "2026-11-19",
    body: [
      {
        type: "p",
        text: "On most wedding mornings, the order goes like this: skincare and prep first, then hair and makeup, then getting dressed, then the veil, jewelry, and final touch-ups. Whether hair or makeup comes first depends on your artist's process, your hairstyle, and your timeline. Both orders work when they are planned on purpose. The order of the whole morning matters more. The bride should not be scheduled last, she should get dressed after her beauty is finished, and there should be a buffer before photos begin.",
      },
      { type: "h2", text: "The wedding-morning order at a glance" },
      {
        type: "ul",
        items: [
          "Skincare, a real breakfast, and water before anyone sits in a chair.",
          "Hair and makeup services for the bridal party, rotating through the chairs.",
          "The bride's hair and makeup, finished with time to spare rather than at the last minute.",
          "Final touch-ups and lip color.",
          "Getting dressed, ideally while the photographer captures it.",
          "Veil, hair accessories, jewelry, and shoes.",
          "Portraits, a first look, or departure for the ceremony.",
        ],
      },
      { type: "h2", text: "Should hair or makeup be done first?" },
      {
        type: "p",
        text: "Many bridal teams do hair first. Hairspray and setting products can be used freely without misting finished makeup. The warmth of hot tools near the face is over before the complexion goes on. Face-framing pieces can be clipped back while the artist works on the skin, then released at the end.",
      },
      {
        type: "p",
        text: "Other artists prefer makeup first. With your hair pulled back, it is easier to work along the hairline, blend foundation, and apply lashes. Curls styled last also stay at their freshest. This is common when the hairstyle relies on soft, face-framing waves that need to fall naturally around the finished makeup.",
      },
      {
        type: "p",
        text: "With a team of two or more artists, the question often disappears. One person sits for hair while another sits for makeup, and then they switch. Your artist will choose the order that suits your look and keeps the morning moving. The most helpful thing you can do is be ready when your turn comes.",
      },
      { type: "h2", text: "Where should the bride be in the schedule?" },
      {
        type: "p",
        text: "Many brides assume they should be last. Being the very last service is risky: if the morning runs behind, the bride is the person who loses time. Many artists schedule the bride's final service near the end of the morning but not as the last appointment. That leaves a cushion for touch-ups, photos of the finished look, and calm before getting dressed.",
      },
      {
        type: "ul",
        items: [
          "Bridesmaids with longer or more detailed hairstyles often go earlier.",
          "Anyone who needs to leave early, run an errand, or help with setup should be scheduled first.",
          "Mothers of the bride and groom are often placed mid-to-late so they look fresh for photos.",
          "Flower girls and younger guests do best with short, simple styles at a time when they are calm and fed.",
          "The bride's makeup is usually finished close enough to photos that it looks fresh, with a cushion built in.",
        ],
      },
      { type: "h2", text: "When should the bride get dressed?" },
      {
        type: "p",
        text: "After hair and makeup. Getting dressed last protects the gown from foundation and hairspray, and it avoids pulling anything over a finished hairstyle. Wear a button-front shirt or robe while you get ready so you can step out of it without disturbing your hair or makeup. Ask your photographer how much time they want for getting-dressed photos, and build it into the ready-by time.",
      },
      { type: "h2", text: "When do the veil and accessories go in?" },
      {
        type: "p",
        text: "The veil usually goes in after the dress is on, so the fabric does not catch while you step into the gown. Earrings and necklaces come next. Hair accessories may go in during styling or after you are dressed, depending on their weight. Bring your veil and accessories to your bridal preview so your stylist can plan exactly where they sit and how they are secured.",
      },
      { type: "h2", text: "How to keep the order on track" },
      {
        type: "ul",
        items: [
          "Share your photographer's ready-by time with your artist early. It is the real deadline, not the ceremony time.",
          "Confirm the final number of hair and makeup services so the schedule is built for the right number of people.",
          "Arrive with hair prepared exactly as your stylist asked, usually clean and completely dry.",
          "Keep the getting-ready room bright, with outlets, a table, and space for each chair.",
          "Ask one person to keep an eye on the schedule so the bride does not have to.",
          "Eat and drink water throughout the morning. Your look will hold up better when you do.",
        ],
      },
      {
        type: "p",
        text: "The best order is the one your artist plans around your morning and then follows. If you are getting married in St. Augustine, Jacksonville, Palm Coast, or elsewhere in Northeast Florida, Maureen Ella builds a beauty timeline with every booking. Share your date, service count, and ready-by time when you request availability.",
      },
    ],
    faqs: [
      {
        question: "Should hair or makeup be done first for a wedding?",
        answer:
          "Either can work. Many teams do hair first so hairspray and hot tools are finished before the makeup goes on, while others do makeup first so soft, face-framing curls stay fresh. With multiple artists, hair and makeup often happen at the same time on a rotation.",
      },
      {
        question: "Should the bride go last for hair and makeup?",
        answer:
          "Usually not the very last. Scheduling the bride near the end, with a buffer after her service, keeps her makeup fresh for photos while protecting her from losing time if the morning runs behind.",
      },
      {
        question: "Do you get dressed before or after wedding hair and makeup?",
        answer:
          "After. Wear a button-front shirt or robe while getting ready, then step into your dress once your hair and makeup are complete. The veil and jewelry go in after the dress is on.",
      },
      {
        question: "How long before the ceremony should hair and makeup be finished?",
        answer:
          "Hair and makeup should be finished by the ready-by time your photographer and planner set. That is often well before the ceremony, because getting dressed, portraits, a first look, and travel may all come first.",
      },
    ],
    relatedLinks: [
      {
        href: "/journal/wedding-hair-makeup-timeline-st-augustine",
        title: "Plan Your Beauty Timeline",
        description: "Work backward from your ready-by time to a calm, on-time morning.",
      },
      {
        href: "/journal/bridal-hair-makeup-preview-what-to-expect",
        title: "What to Expect at Your Preview",
        description: "Test your look, your veil, and your accessories before the day.",
      },
      {
        href: "/bridal/services",
        title: "Bridal Hair & Makeup Services",
        description: "On-location beauty for brides, bridal parties, and family.",
      },
    ],
  },

  "who-stays-with-the-bride-the-night-before": {
    metaTitle: "Who Stays With the Bride the Night Before?",
    excerpt:
      "Traditionally the maid of honor, a bridesmaid, or the bride's mom stays with her the night before. Here is how to choose, plus a calm night-before beauty plan.",
    image: "/images/journal/who-stays-with-the-bride-the-night-before.jpg",
    imageAlt:
      "A bride in white pajamas laughing with her bridesmaids in matching red pajamas while getting ready",
    imagePosition: "center 40%",
    datePublished: "2026-11-07",
    body: [
      {
        type: "p",
        text: "There is no rule. By tradition, the bride spends the night before the wedding apart from her partner, often with her maid of honor, a few bridesmaids, her mother, or a sister. Today many brides simply choose whoever helps them feel calm. That might be a best friend, family, their partner, or a quiet room alone. The best choice is the person, or the solitude, that will help you sleep well, wake up on time, and be ready when your beauty team arrives.",
      },
      { type: "h2", text: "Where the tradition comes from" },
      {
        type: "p",
        text: "Spending the night apart comes from the old custom that the couple should not see each other before the ceremony. Many couples now plan a first look or get ready together, so the superstition matters less than it once did. What has lasted is the practical side. The night before a wedding is a good time to be surrounded by people who keep you grounded.",
      },
      { type: "h2", text: "Who usually stays with the bride?" },
      {
        type: "ul",
        items: [
          "The maid of honor: a natural choice. She can keep the morning on track and handle questions so you do not have to.",
          "A small group of bridesmaids: fun and sentimental, but keep it small and plan an early night.",
          "Mom, a sister, or another relative: often the most calming option, especially if you are close.",
          "Your partner: increasingly common, especially for couples who live together or plan a first look.",
          "No one: some brides love a quiet hotel room, a long shower, and uninterrupted sleep.",
        ],
      },
      { type: "h2", text: "Questions to help you decide" },
      {
        type: "ul",
        items: [
          "Who helps you relax, and who tends to add energy or stress?",
          "Do you sleep better alone or with familiar company?",
          "Who will actually get up early with you and help the morning run smoothly?",
          "Will a group sleepover turn into a late night you regret at 6 a.m.?",
          "Does the person staying with you also need hair and makeup early in the schedule?",
        ],
      },
      { type: "h2", text: "Stay where you are getting ready if you can" },
      {
        type: "p",
        text: "If your budget and venue allow, sleep where you will get ready. Waking up in your getting-ready suite removes a drive from your morning. It gives your hair and makeup team a set place and arrival time, and you have one less thing to coordinate before photos. If you will get ready somewhere else, plan your arrival time with your artist's schedule in mind, and share parking and access details ahead of time.",
      },
      { type: "h2", text: "A night-before beauty checklist" },
      {
        type: "ul",
        items: [
          "Wash and dry your hair exactly as your stylist instructed. Do not experiment with new products.",
          "Keep skincare familiar. Skip new masks, peels, or treatments.",
          "Drink water and go easy on alcohol and very salty foods, which can show up as puffiness.",
          "Set out a button-front shirt or robe to wear while you get ready.",
          "Gather your veil, hair accessories, jewelry, lip color, and a small touch-up kit in one place.",
          "Confirm the wedding-morning schedule and send it to everyone receiving services.",
          "Charge your phone, set two alarms, and go to bed earlier than you think you need to.",
        ],
      },
      { type: "h2", text: "What the person staying with you can do" },
      {
        type: "p",
        text: "The right companion makes the morning easier. They can start the coffee, make sure you eat breakfast, reply to vendor texts, and keep everyone moving to their hair and makeup slots. They can also tidy the space so your artist has room to set up near good light. Tell them ahead of time how they can help. Most people are glad to have a clear job.",
      },
      {
        type: "p",
        text: "However you spend the night before, a calm morning is the goal. Maureen Ella provides on-location bridal hair and makeup in St. Augustine, Jacksonville, Palm Coast, and across Northeast Florida, with a planned schedule so you can focus on the people around you.",
      },
    ],
    faqs: [
      {
        question: "Is it bad luck for the couple to spend the night before the wedding together?",
        answer:
          "It is a tradition, not a rule. Many couples sleep apart to make seeing each other at the ceremony or first look feel special, while others stay together for comfort. Choose what helps you rest.",
      },
      {
        question: "Should the maid of honor stay with the bride the night before?",
        answer:
          "She often does, because she can help keep the wedding morning organized. It is not required. Choose a person who calms you and who will be up early with you.",
      },
      {
        question: "Should the bride stay at the hotel the night before the wedding?",
        answer:
          "If you are getting ready at a hotel or venue suite, staying there the night before removes travel from your morning and gives your beauty team a set place to start. It is helpful but not essential.",
      },
      {
        question: "What should a bride do the night before her wedding?",
        answer:
          "Keep it simple. Prepare your hair as your stylist instructed, stick to your normal skincare, drink water, lay out your accessories and a button-front top, share the morning schedule, and get to bed early.",
      },
    ],
    relatedLinks: [
      {
        href: "/journal/wedding-morning-parking-hair-makeup-vendor",
        title: "Plan Wedding-Morning Parking",
        description: "Help your beauty team arrive on time and set up smoothly.",
      },
      {
        href: "/bridal/prep-guides/hair-prep",
        title: "Bridal Hair Prep Guide",
        description: "How to prepare your hair the night before and morning of.",
      },
      {
        href: "/journal/wedding-hair-and-makeup-order",
        title: "The Wedding-Morning Order",
        description: "Hair or makeup first, and when to get dressed.",
      },
    ],
  },

  "best-foundation-for-wedding-day": {
    metaTitle: "The Best Foundation for Your Wedding Day",
    excerpt:
      "The best wedding foundation is long-wearing, matched in natural light, suited to your skin type, and tested with flash. Here is how to choose one that lasts.",
    image: "/images/journal/best-foundation-for-wedding-day.jpg",
    imageAlt:
      "Maureen Ella applying foundation to a bride with a brush during her wedding-morning makeup",
    imagePosition: "center 40%",
    datePublished: "2026-11-18",
    body: [
      {
        type: "p",
        text: "No single foundation is best for every bride. The best wedding foundation is a long-wearing formula that matches your skin in natural light and suits your skin type. It should look good in photos with and without flash, and you should test it before the wedding. For most brides, that means a buildable, transfer-resistant foundation with a natural or soft-satin finish, applied in thin layers over well-prepped skin.",
      },
      { type: "h2", text: "What to look for in a wedding-day foundation" },
      {
        type: "ul",
        items: [
          "Long wear: the formula should hold through a day that may last twelve hours or more.",
          "Transfer resistance: less of it ends up on your dress, your partner's jacket, and everyone you hug.",
          "Buildable coverage: sheer enough to look like skin, with room to add coverage only where you need it.",
          "A natural or satin finish: very matte can look flat in photos, and very dewy can read as shine.",
          "The right shade and undertone: match it to your jaw, neck, and chest in daylight, not under store lighting.",
          "No oxidation surprises: some formulas darken after they set, so check the color after an hour.",
          "Comfort: if it feels heavy or tight at 10 a.m., it will feel worse at 9 p.m.",
        ],
      },
      { type: "h2", text: "Choosing foundation by skin type" },
      {
        type: "p",
        text: "Oily skin usually does best with an oil-controlling primer, a long-wear foundation, and powder pressed only where shine appears. Dry skin needs hydration first, then a more flexible formula that will not cling to dry patches. Combination skin often benefits from different prep on different zones. Mature skin tends to look best with thinner layers, less powder, and a soft luminous finish that does not settle into lines. If your skin is sensitive or reactive, tell your artist and test everything ahead of time.",
      },
      { type: "h2", text: "Airbrush or traditional foundation?" },
      {
        type: "p",
        text: "Airbrush foundation is sprayed on in fine, thin layers. Traditional foundation is applied with brushes or sponges. Both can look beautiful and last all day. Airbrush is an application method, not a guarantee of longer wear, and traditional formulas vary widely. The better question is which formula, finish, and technique suit your skin, the coverage you want, and the conditions of your day. Your preview is the place to see how the recommended approach looks and feels on you.",
      },
      { type: "h2", text: "Will SPF foundation cause flashback in photos?" },
      {
        type: "p",
        text: "Flashback is the white or ashy cast that can appear in flash photography. It is most often linked to certain finishing powders and some products with highly reflective mineral ingredients. Not every SPF product causes it. Testing beats any blanket rule: take a photo with your phone's flash at your preview, and look at it before you leave. If you will be outdoors for hours, apply sunscreen as part of your skincare and let your artist build makeup that works over it.",
      },
      { type: "h2", text: "Why the artist's choice matters more than the brand" },
      {
        type: "p",
        text: "Professional artists rarely use a single foundation straight from the bottle. They may mix shades to match your undertone exactly, use a different formula on an oily forehead than on a dry cheek, and add coverage only where it is needed. The result looks like you on a very good day. When you book a professional, share what you like and dislike about foundation rather than bringing a specific product, unless you have a known sensitivity.",
      },
      { type: "h2", text: "If you are doing your own wedding makeup" },
      {
        type: "ul",
        items: [
          "Buy your foundation weeks ahead, not the week of the wedding.",
          "Wear-test it for a full day, including a warm afternoon, before you commit.",
          "Check the shade in daylight and photograph it with and without flash.",
          "Use a primer suited to your skin type and set only where you tend to get shiny.",
          "Apply thin layers. Two light layers wear better than one heavy one.",
          "Carry blotting papers and press, not wipe, when you touch up.",
        ],
      },
      { type: "h2", text: "Foundation in Florida heat and humidity" },
      {
        type: "p",
        text: "For outdoor and coastal weddings in Northeast Florida, preparation matters as much as the product. Calm, hydrated skin, compatible primers, thin layers, and targeted setting usually outlast a heavy base. Limit unnecessary time in direct sun before portraits and keep a small touch-up kit with a trusted person. Thoughtful prep keeps your skin looking fresh well into the reception.",
      },
      {
        type: "p",
        text: "Your preview is where your foundation, finish, and coverage get decided, so you are not guessing on the wedding morning. If you are planning a wedding in St. Augustine, Jacksonville, Palm Coast, or nearby, request availability with Maureen Ella and we will plan a complexion that looks like your skin, only more polished.",
      },
    ],
    faqs: [
      {
        question: "Should I wear SPF foundation on my wedding day?",
        answer:
          "Sun protection matters, especially outdoors. SPF does not have to come from your foundation. Many artists prefer sunscreen as a skincare step under makeup. Whatever you use, test it with a flash photo before the wedding to check for flashback.",
      },
      {
        question: "Is airbrush foundation better for a wedding?",
        answer:
          "Not automatically. Airbrush is an application method that creates thin, even layers, and traditional foundation can wear just as well. The right choice depends on your skin, the coverage you want, and how the look performs at your preview.",
      },
      {
        question: "How do I keep foundation from looking cakey in photos?",
        answer:
          "Start with hydrated, well-prepped skin, apply thin layers, add coverage only where needed, and use powder strategically rather than all over. Blot before adding more powder during touch-ups.",
      },
      {
        question: "What foundation finish is best for wedding photos?",
        answer:
          "A natural or soft-satin finish tends to photograph most like real skin. Very matte finishes can look flat, while very dewy finishes can read as shine under flash or strong sun.",
      },
    ],
    relatedLinks: [
      {
        href: "/journal/bridal-makeup-sensitive-skin",
        title: "Bridal Makeup for Sensitive Skin",
        description: "How to plan wedding makeup when your skin reacts easily.",
      },
      {
        href: "/journal/florida-wedding-hair-makeup-humidity",
        title: "Beauty for Florida Humidity",
        description: "Keep hair and makeup polished in Northeast Florida heat.",
      },
      {
        href: "/bridal/prep-guides/makeup-prep",
        title: "Bridal Makeup Prep Guide",
        description: "Prepare your skin in the weeks and morning before.",
      },
    ],
  },

  "mother-of-the-bride-hair-up-or-down": {
    metaTitle: "Mother of the Bride Hair: Up or Down?",
    excerpt:
      "Up, down, or half-up? How the mother of the bride can choose a hairstyle that suits her dress, hair type, venue, and comfort, and that looks lovely in photos.",
    image: "/images/journal/mother-of-the-bride-hair-up-or-down.jpg",
    imageAlt:
      "A bride laughing with her mother, who wears a navy dress, while they get ready on the wedding morning",
    imagePosition: "center 40%",
    datePublished: "2026-11-10",
    body: [
      {
        type: "p",
        text: "Either can be right. The mother of the bride should choose a style that flatters her dress neckline, suits her hair length and texture, holds up to the venue and weather, and feels like her. As a general guide, an updo or polished low bun works well with off-the-shoulder, high, or detailed necklines and with outdoor Florida weddings. Soft, full waves worn down or half-up suit V-necks and shoulder-length cuts. They also suit women who feel most like themselves with their hair down.",
      },
      { type: "h2", text: "Start with the dress neckline" },
      {
        type: "ul",
        items: [
          "Off-the-shoulder or portrait necklines: an updo or low bun shows off the shoulders and collarbones.",
          "High necklines and halters: hair up keeps the neckline clean and uncluttered.",
          "V-necks and scoop necks: down or half-up waves balance the open neckline.",
          "Sleeves, capes, or detailed beading: a soft updo keeps hair from catching or hiding the details.",
          "Simple, classic dresses: almost anything works, so let hair texture and comfort decide.",
        ],
      },
      { type: "h2", text: "Consider hair length and texture" },
      {
        type: "p",
        text: "Short hair and bobs usually look best with a polished, full blowout or soft waves, with a jeweled pin if you like a little sparkle. Shoulder-length hair can be worn down, half-up, or in a low, textured bun. Long, thick hair can go either way, though an updo is cooler and easier to manage on a warm day. Fine hair often looks fuller in a soft, textured updo than worn down. Curly hair can be beautiful defined and down, or gathered into a romantic shape.",
      },
      { type: "h2", text: "Think about the venue and the weather" },
      {
        type: "p",
        text: "In Northeast Florida, weather is a real factor. Humidity can relax curls and lift flyaways, and beach breezes move everything. If much of your day is outdoors, an updo, low bun, or half-up style will usually stay polished longer than hair worn fully down. For an indoor ballroom or a cooler evening, soft waves worn down are an easy choice.",
      },
      { type: "h2", text: "Coordinate with the bride without matching her" },
      {
        type: "p",
        text: "You do not need to mirror the bride's hairstyle, and you should not compete with it. Ask whether she has a vision for family photos. Some brides love a cohesive look, while others want everyone to feel like themselves. If the bride is wearing her hair down, an elegant updo for her mother photographs beautifully alongside it, and the reverse works too.",
      },
      { type: "h2", text: "When an updo is the better choice" },
      {
        type: "ul",
        items: [
          "You will be outside for much of the day, or the forecast is hot and humid.",
          "Your dress has an off-the-shoulder, high, or embellished neckline.",
          "You want a style that will not need attention during hugs, dancing, and photos.",
          "You prefer a classic, formal look.",
        ],
      },
      { type: "h2", text: "When wearing your hair down is the better choice" },
      {
        type: "ul",
        items: [
          "You rarely wear your hair up and want to recognize yourself in photos.",
          "Your hair is short to shoulder length, or full enough to hold soft waves.",
          "The wedding is indoors or in the evening.",
          "Your neckline is a V or scoop that benefits from the softness of hair down.",
        ],
      },
      {
        type: "p",
        text: "Still undecided? A half-up style keeps hair off your face and lifts volume at the crown while leaving length and softness at the back. It is one of the most flattering and versatile mother-of-the-bride styles.",
      },
      { type: "h2", text: "Tips for a beautiful mother-of-the-bride hairstyle" },
      {
        type: "ul",
        items: [
          "Let the bride know early that you would like hair and makeup, so you are included in the service count and timeline.",
          "Show your stylist a photo of your dress and the jewelry you plan to wear.",
          "If you wear glasses, wear them while your hair is styled so the arms sit comfortably.",
          "Schedule cuts and color a week or two before the wedding so they look settled, not brand new.",
          "Wear a button-front top so you can change without disturbing your hair.",
          "Keep a few matching pins and a small comb in your bag for the evening.",
        ],
      },
      {
        type: "p",
        text: "Maureen Ella styles mothers of the bride and groom as part of on-location wedding services in St. Augustine, Jacksonville, Palm Coast, and across Northeast Florida. When the bride requests availability, include mothers in the service count so everyone has a place in the morning schedule.",
      },
    ],
    faqs: [
      {
        question: "What is the most flattering hairstyle for the mother of the bride?",
        answer:
          "Styles with soft volume at the crown and gentle face-framing pieces are flattering on most people, such as a soft low bun, a half-up style, or a full blowout with soft waves. The best style suits her neckline, hair texture, and comfort.",
      },
      {
        question: "Should the mother of the bride get her hair done professionally?",
        answer:
          "Many mothers do, because they appear in many of the family photos. If you would like professional hair and makeup, tell the bride early so you can be added to the service count and morning schedule.",
      },
      {
        question: "Can the mother of the bride wear her hair down at a beach wedding?",
        answer:
          "Yes, if she is comfortable with movement from wind and humidity. A half-up style or loose low bun will usually stay neater on the beach, while hair worn fully down may need a few touch-ups.",
      },
      {
        question: "When should the mother of the bride get her hair cut and colored?",
        answer:
          "About one to two weeks before the wedding is a common window. It gives a fresh cut time to settle and lets color look natural rather than brand new.",
      },
    ],
    relatedLinks: [
      {
        href: "/journal/hairstyles-that-make-older-women-look-younger",
        title: "Fresh, Flattering Hairstyles",
        description: "Styles with softness and lift for mothers and grandmothers.",
      },
      {
        href: "/journal/what-should-a-mother-of-the-bride-not-do",
        title: "Mother of the Bride Don'ts",
        description: "A kind, practical guide to supporting the bride.",
      },
      {
        href: "/journal/florida-wedding-hair-makeup-humidity",
        title: "Hair for Florida Humidity",
        description: "How to choose styles that hold up to heat and moisture.",
      },
    ],
  },

  "what-should-a-mother-of-the-bride-not-do": {
    metaTitle: "What a Mother of the Bride Should Not Do",
    excerpt:
      "Avoid upstaging the bride, taking over decisions, or rushing the wedding-morning schedule. A kind, practical guide to what a mother of the bride should not do.",
    image: "/images/journal/what-should-a-mother-of-the-bride-not-do.jpg",
    imageAlt:
      "A mother fastening the back of her daughter's wedding dress on the wedding morning",
    imagePosition: "center 40%",
    datePublished: "2026-11-09",
    body: [
      {
        type: "p",
        text: "A mother of the bride should not upstage the bride or take over decisions that belong to the couple. She also should not add guests or expenses without asking, or bring stress into the wedding morning. Her most valuable role is steady support: helping where she is asked, staying calm, and letting the couple's vision lead. Most of the don'ts below come down to one idea. It is your daughter's day, and your calm presence is the best thing you can give her.",
      },
      { type: "h2", text: "Before the wedding" },
      {
        type: "ul",
        items: [
          "Do not treat a financial contribution as a vote on every decision. If you are helping pay, agree early on what that contribution covers.",
          "Do not add guests without checking with the couple. Every name affects the budget, seating, and venue capacity.",
          "Do not compare the wedding to your own or to other family weddings. Traditions can be offered, not required.",
          "Do not share details, photos, or the dress on social media before the couple does.",
          "Do not choose your outfit without checking in. Ask about color and formality, and avoid white or ivory unless the bride invites it.",
          "Do not wait to say you want hair and makeup. The service count and schedule are set weeks in advance.",
        ],
      },
      { type: "h2", text: "On the wedding morning" },
      {
        type: "ul",
        items: [
          "Do not arrive late for your beauty appointment. A missed slot shifts the whole schedule, including the bride's.",
          "Do not offer last-minute critiques of the bride's hair, makeup, or dress. If something needs fixing, mention it quietly to the artist.",
          "Do not crowd the getting-ready room with extra visitors. Artists need space and light, and the bride needs calm.",
          "Do not skip breakfast or water, and gently make sure the bride eats too.",
          "Do not take on every task yourself. Choose one or two useful jobs and let the planner and vendors do theirs.",
        ],
      },
      { type: "h2", text: "At the ceremony and reception" },
      {
        type: "ul",
        items: [
          "Do not bring family tension into the day. Old disagreements can wait.",
          "Do not disappear during family photos. Know the photo schedule and stay close.",
          "Do not overindulge at the bar. You are a host, and guests will look to you.",
          "Do not make toasts or announcements that the couple has not planned for.",
        ],
      },
      { type: "h2", text: "What a mother of the bride should do instead" },
      {
        type: "ul",
        items: [
          "Ask the bride, “How can I help?” and then do that.",
          "Keep a small emergency kit with tissues, pins, a phone charger, and snacks.",
          "Greet guests warmly and help the couple's families feel welcome.",
          "Help keep the morning on schedule so the bride does not have to watch the clock.",
          "Take a moment alone with your daughter before the ceremony. It is often the memory she treasures most.",
        ],
      },
      { type: "h2", text: "A note on beauty for the mother of the bride" },
      {
        type: "p",
        text: "You will appear in many photographs, so plan your hair and makeup with care. Tell the bride early if you would like services, share a photo of your dress, and wear a button-front top on the wedding morning. Ask the artist where you fit in the schedule. Mothers are often scheduled so they are finished in time for the bride's getting-dressed moment, with hair and makeup done and ready to help.",
      },
      {
        type: "p",
        text: "Maureen Ella provides hair and makeup for mothers of the bride and groom alongside bridal services in St. Augustine, Jacksonville, Palm Coast, and across Northeast Florida. Include mothers in the service count when the bride requests availability.",
      },
    ],
    faqs: [
      {
        question: "Can the mother of the bride wear white?",
        answer:
          "Generally no, unless the bride specifically asks. White, ivory, and cream are traditionally reserved for the bride. Ask the bride about her preferred colors for family photos.",
      },
      {
        question: "Does the mother of the bride get her hair and makeup done with the bridal party?",
        answer:
          "Often, yes. Many mothers have hair and makeup done in the same getting-ready space on the wedding morning. Tell the bride early so you are included in the service count and timeline.",
      },
      {
        question: "What does the mother of the bride do on the wedding morning?",
        answer:
          "She arrives on time for her beauty appointment, helps keep the morning calm and on schedule, helps the bride into her dress if asked, and stays close for getting-ready and family photos.",
      },
      {
        question: "What is the mother of the bride's main role?",
        answer:
          "Support. That can include helping with planning tasks the couple assigns, hosting guests warmly, and being a calm, steady presence for the bride on the wedding day.",
      },
    ],
    relatedLinks: [
      {
        href: "/journal/mother-of-the-bride-hair-up-or-down",
        title: "Mother of the Bride Hair",
        description: "How to choose between up, down, and half-up.",
      },
      {
        href: "/journal/what-does-the-mother-of-the-bride-pay-for",
        title: "What Does the Mother of the Bride Pay For?",
        description: "Traditional expectations and how modern families share costs.",
      },
      {
        href: "/journal/wedding-hair-makeup-timeline-st-augustine",
        title: "Wedding-Morning Timeline",
        description: "How beauty services for the whole family are scheduled.",
      },
    ],
  },

  "hairstyles-that-make-older-women-look-younger": {
    metaTitle: "Hairstyles That Make Older Women Look Younger",
    excerpt:
      "Soft volume, face-framing layers, and touchable shapes look fresher than stiff, severe styles. Flattering wedding hairstyles for mothers and grandmothers.",
    image: "/images/journal/hairstyles-that-make-older-women-look-younger.jpg",
    imageAlt:
      "A mother of the bride with a soft, full blowout laughing with a bridesmaid while getting ready",
    imagePosition: "center",
    datePublished: "2026-11-08",
    body: [
      {
        type: "p",
        text: "Hairstyles that make women look more youthful share a few qualities: soft movement instead of stiffness, lift at the crown, and face-framing pieces that draw the eye up toward the cheekbones. The shape should look touchable rather than set. Think of a full blowout with bend at the ends, loose brushed-out waves, curtain or side-swept bangs, a soft low chignon with tendrils, or a polished half-up style. Severe slicked-back buns, flat roots, very tight curls, and heavy, crunchy hairspray tend to look older.",
      },
      {
        type: "p",
        text: "The goal is not to look like someone else. It is to look rested, polished, and like yourself, especially on a day with so many photographs. The guidance below applies to mothers of the bride and groom, grandmothers, and any guest who wants a fresh wedding-day look.",
      },
      { type: "h2", text: "Why some hairstyles look fresher" },
      {
        type: "ul",
        items: [
          "Lift: volume at the crown and roots adds height and energy to the face.",
          "Softness: loose, bent ends and gentle waves look more natural than rigid, uniform curls.",
          "Movement: hair that moves when you laugh or turn looks alive in photos.",
          "Framing: pieces around the face soften the jaw and highlight the eyes and cheekbones.",
          "Shine: healthy, light-reflecting hair looks vibrant, while dry or overly matte hair can look tired.",
        ],
      },
      { type: "h2", text: "Flattering, youthful hairstyles for a wedding" },
      {
        type: "ul",
        items: [
          "A full, polished blowout with soft bend at the ends. It is timeless and works at almost any length.",
          "Loose, brushed-out waves that look modern and relaxed rather than set.",
          "Face-framing layers or curtain bangs that open the eyes and soften the forehead.",
          "A soft, low chignon with a few loose tendrils at the face. It is elegant without looking severe.",
          "A half-up style with gentle volume at the crown, which keeps hair off the face while leaving softness behind.",
          "A low, textured side ponytail or twist, which is graceful, comfortable, and shows off earrings.",
          "A bob or lob styled with movement, finished with a jeweled pin or comb.",
          "A textured pixie with soft, piecey finish rather than a flat, helmet-like shape.",
        ],
      },
      { type: "h2", text: "Styles that can look older, and easy fixes" },
      {
        type: "ul",
        items: [
          "Flat roots: ask for lift at the crown with a round brush, rollers, or gentle backcombing.",
          "Hair pulled tightly back: loosen the front and leave a few face-framing pieces.",
          "Tight, set curls: brush them out into softer waves.",
          "Heavy, stiff hairspray: choose a flexible hold that still lets the hair move.",
          "Heavy one-length hair: talk with your stylist about layers that add shape and movement.",
        ],
      },
      { type: "h2", text: "Color, cut, and shine matter too" },
      {
        type: "p",
        text: "A fresh cut and color can do as much as the style itself. Many women find that soft dimension, such as subtle highlights, lowlights, or a gloss, looks fresher than one flat, very dark shade. Gray and silver hair can look beautiful when it is shiny and well shaped. If you plan to change your cut or color, see your colorist about one to two weeks before the wedding so it looks settled and natural.",
      },
      { type: "h2", text: "Tips for fine or thinning hair" },
      {
        type: "p",
        text: "Volumizing products, root lift, and a textured finish can make fine hair look fuller. A soft updo or half-up style often adds more fullness than hair worn down. Clip-in pieces and toppers are another option for added density. If you plan to wear them, bring them to your preview so your stylist can blend and secure them. Avoid very tight styles that pull on the hairline, and tell your stylist if your scalp is sensitive.",
      },
      { type: "h2", text: "Pair your hairstyle with fresh makeup" },
      {
        type: "p",
        text: "Hair and makeup work together. A softly luminous complexion, defined brows, gentle color on the cheeks, and a comfortable lip color usually look fresher than heavy matte coverage. Ask your makeup artist for thin layers and less powder under the eyes, so the look stays soft through hugs, happy tears, and hours of celebrating.",
      },
      { type: "h2", text: "Planning your wedding-day hairstyle" },
      {
        type: "ul",
        items: [
          "Bring a photo of your dress and the jewelry you plan to wear.",
          "Share how you usually wear your hair. Recognizing yourself in photos matters.",
          "Wear your glasses during styling if you will wear them during the day.",
          "Mention any comfort concerns, like heavy pins, a sensitive scalp, or a hearing aid.",
          "Ask about a quick touch-up plan for the reception.",
        ],
      },
      {
        type: "p",
        text: "Maureen Ella styles mothers, grandmothers, and family members alongside the bride on the wedding morning in St. Augustine, Jacksonville, Palm Coast, and across Northeast Florida. When the bride requests availability, include everyone who would like services so the morning can be planned for the whole family.",
      },
    ],
    faqs: [
      {
        question: "What hairstyle is most flattering for women over 50?",
        answer:
          "Styles with soft volume at the crown and gentle face-framing pieces flatter most women, such as a full blowout with bend, loose waves, a half-up style, or a soft low chignon with tendrils. The best choice suits your hair texture, neckline, and comfort.",
      },
      {
        question: "Should older women wear their hair up or down for a wedding?",
        answer:
          "Either works. Updos with soft, loose pieces are elegant and practical in heat, while hair worn down looks youthful when it has volume and movement. A half-up style offers a bit of both.",
      },
      {
        question: "Do bangs make you look younger?",
        answer:
          "Soft curtain or side-swept bangs can soften the forehead and draw attention to the eyes, which many people find refreshing. Avoid cutting bangs right before the wedding. Try them a few weeks ahead so they have time to grow into shape.",
      },
      {
        question: "What hair color makes an older woman look younger?",
        answer:
          "Soft dimension, like subtle highlights, lowlights, or a shine-boosting gloss, often looks fresher than a single flat, very dark shade. Healthy, shiny gray or silver hair can also look striking. A colorist can recommend tones for your skin.",
      },
    ],
    relatedLinks: [
      {
        href: "/journal/mother-of-the-bride-hair-up-or-down",
        title: "Mother of the Bride: Up or Down?",
        description: "Match your hairstyle to your neckline, hair, and venue.",
      },
      {
        href: "/journal/wedding-hair-extensions",
        title: "Do You Need Hair Extensions?",
        description: "When clip-ins help a wedding style look fuller.",
      },
      {
        href: "/bridal/services",
        title: "Bridal Hair & Makeup Services",
        description: "On-location beauty for brides, bridal parties, and family.",
      },
    ],
  },

  "bridal-hair-trends-2026": {
    metaTitle: "2026 Bridal Hair Trends and How to Wear Them",
    excerpt:
      "Soft volume, undone updos, romantic low buns, sculpted buns, and hair jewelry lead 2026 bridal hair. How to choose a trend that suits you and Florida.",
    image: "/images/journal/bridal-hair-trends-2026.jpg",
    imageAlt:
      "Back view of a bride's half-up hairstyle with a loose braided section and long, soft waves",
    imagePosition: "center 40%",
    datePublished: "2026-11-21",
    body: [
      {
        type: "p",
        text: "Bridal hair in 2026 is about soft volume and personality. Pinterest's 2026 Wedding Trends Report calls it “soft-drama” hair: big, glossy blowouts, soft side parts, undone updos, sculpted buns, and tiaras or earring chains worked into the style. Fashion editors point the same way, with romantic low buns, French twists, old Hollywood curls, face-framing pieces, and the bridal bob. The common thread is hair that looks touchable and personal rather than stiff.",
      },
      {
        type: "p",
        text: "Here are the bridal hair trends worth knowing for 2026, who each one suits, and how to wear it at a Northeast Florida wedding.",
      },
      { type: "h2", text: "1. Soft-drama volume" },
      {
        type: "p",
        text: "The big, glossy, bouncy blowout is back. Pinterest points to rising interest in “telenovela hair,” with full, polished volume and soft curls that move. It suits brides who want to feel glamorous with their hair down. In Florida humidity, volume needs a strong foundation. Your stylist may add structure at the root or suggest a half-up version for outdoor ceremonies, so the shape lasts into the reception.",
      },
      { type: "h2", text: "2. The soft side part" },
      {
        type: "p",
        text: "A soft side part with a sweep of volume is one of the year's most searched details. It works with waves worn down, a low bun, or a half-up style. It flatters many face shapes because it adds asymmetry and softness at the face. Try your part on both sides at your preview, because most people photograph better from one side.",
      },
      { type: "h2", text: "3. Undone updos" },
      {
        type: "p",
        text: "Inspired by 1990s supermodel style, the “Pammy” updo is loose and piecey, with tendrils falling around the face. Editors also highlight windswept strands. It suits relaxed, romantic, and beach weddings. The secret is that a well-made undone updo is anchored firmly underneath, so it looks effortless without falling apart.",
      },
      { type: "h2", text: "4. Romantic low buns" },
      {
        type: "p",
        text: "Low buns remain one of the most requested shapes, from the soft, Victorian-inspired “Brontë bun” to the classic chignon. They work well under a cathedral veil, look elegant from every angle, and keep hair off the neck in warm weather. That makes them one of the most practical choices for a Florida wedding.",
      },
      { type: "h2", text: "5. Sculpted and architectural buns" },
      {
        type: "p",
        text: "For the modern minimalist bride, sculpted shapes are having a moment. Examples include the looped “infinity bun,” architectural buns, and the polished French twist. They pair beautifully with clean crepe or satin gowns and statement earrings. Because they are smooth and secure, they also hold up well in heat. Ask your stylist how much smoothing your texture needs, and protect the finish from humidity with a light touch-up plan.",
      },
      { type: "h2", text: "6. Old Hollywood waves" },
      {
        type: "p",
        text: "Glamorous, sculpted waves, which editors call “silver screen curls,” are a natural match for evening, ballroom, and black-tie weddings. They take careful setting and are best suited to indoor or climate-controlled celebrations. For an outdoor summer ceremony, consider a pinned version that keeps the wave at the front with a secure low shape behind.",
      },
      { type: "h2", text: "7. Face-framing pieces" },
      {
        type: "p",
        text: "Soft tendrils and curtain-style pieces around the face appear in almost every 2026 trend roundup, because they soften updos and flatter the cheekbones. Plan their length and curl at your preview. If they fall flat by the reception, your stylist can show you how to pin them back for dancing.",
      },
      { type: "h2", text: "8. Tiaras, hair jewelry, and earring chains" },
      {
        type: "p",
        text: "Accessories are a big part of soft-drama hair. Pinterest highlights rising searches for tiara hairstyles and for styles designed around earring chains. Bring every accessory to your preview, along with your veil, so your stylist can plan placement, weight, and how the pieces work with your veil and neckline.",
      },
      { type: "h2", text: "9. Braids, from upswept to French curl" },
      {
        type: "p",
        text: "Braids add texture and staying power. Upswept braids and braided crowns frame the face and stay put. For brides who wear braids every day, French curl braids with loose, curly ends, often installed with the pick-and-drop method, are rising on Pinterest. Braids are also one of the most humidity-friendly ways to add detail to a wedding style.",
      },
      { type: "h2", text: "10. The bridal bob" },
      {
        type: "p",
        text: "Short hair is fully part of bridal style in 2026, with feathered and soft bobs on editors' trend lists. A polished bob with soft bend, a jeweled pin, or a slim headband looks modern and intentional. If you are growing your hair for the wedding, a bob styled well can be just as bridal as a long updo.",
      },
      { type: "h2", text: "The classics that never left" },
      {
        type: "p",
        text: "Romantic waves, delicate curls, and half-up styles still appear on 2026 trend lists, and for good reason. They are timeless, flattering on most people, and easy to personalize with accessories. A trend does not need to be new to be right for you.",
      },
      { type: "h2", text: "How to choose a trend that suits you" },
      {
        type: "ul",
        items: [
          "Start with your dress neckline and veil. They shape what will look balanced.",
          "Be honest about your hair's length, density, and texture, and ask whether extensions would help.",
          "Consider the venue and weather. Outdoor Florida weddings favor secure, pinned shapes.",
          "Choose a style you will recognize in photos twenty years from now.",
          "Test it at your preview, and notice how it feels and holds after you leave.",
        ],
      },
      {
        type: "p",
        text: "If you are planning a wedding in St. Augustine, Jacksonville, Palm Coast, or elsewhere in Northeast Florida, Maureen Ella can help you adapt the look you love to your hair, your dress, and your day. Bring your inspiration to your preview, and request availability to start planning.",
      },
      { type: "h2", text: "Sources" },
      {
        type: "ul",
        items: [
          "Pinterest Newsroom, Wedding Trends Report 2026 (April 28, 2026).",
          "Who What Wear, Wedding Hair Trends 2026 (February 25, 2026).",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the most popular bridal hairstyle for 2026?",
        answer:
          "No single style dominates. 2026 trend reports point to soft volume and personality, including glossy blowouts, soft side parts, undone updos, romantic low buns, and sculpted buns, often finished with tiaras or hair jewelry.",
      },
      {
        question: "Are updos still in style for 2026 weddings?",
        answer:
          "Yes. Low buns, French twists, sculpted buns, and loose, undone updos all appear on 2026 trend lists. Updos are also one of the most practical choices for hot, humid weddings.",
      },
      {
        question: "Is wearing your hair down in style for 2026 brides?",
        answer:
          "Very much so. Big, glossy blowouts and soft waves with a side part are among the year's strongest trends. For outdoor Florida weddings, ask your stylist about structure or a half-up version so the style lasts.",
      },
      {
        question: "Can I wear a 2026 trend if I have fine or short hair?",
        answer:
          "Yes. Bridal bobs are a trend of their own, and soft updos or clip-in extensions can add fullness to fine hair. Bring your inspiration to your preview so your stylist can adapt it to your hair.",
      },
    ],
    relatedLinks: [
      {
        href: "/journal/how-to-choose-a-bridal-hairstylist",
        title: "Choose Your Bridal Hairstylist",
        description: "Find a stylist whose work fits your wedding style.",
      },
      {
        href: "/journal/bridal-hair-accessories-veil-heirlooms",
        title: "Veils, Accessories & Heirlooms",
        description: "Plan how your accessories and hairstyle work together.",
      },
      {
        href: "/journal/florida-wedding-hair-makeup-humidity",
        title: "Hair for Florida Humidity",
        description: "Keep your style polished through heat and moisture.",
      },
    ],
  },

  "how-much-should-a-bride-pay-for-hair-and-makeup": {
    metaTitle: "How Much Should a Bride Pay for Hair & Makeup?",
    excerpt:
      "National guides put bridal hair at about $150–$600 and makeup at $200–$500. Here is what a reasonable bridal beauty budget looks like and what drives the price.",
    image: "/images/journal/how-much-should-a-bride-pay-for-hair-and-makeup.jpg",
    imageAlt:
      "Maureen Ella applying makeup to a bride with a finished low updo on her wedding morning",
    imagePosition: "center 40%",
    datePublished: "2026-11-20",
    body: [
      {
        type: "p",
        text: "Most brides should plan to pay a few hundred dollars per service, and more for a full experience. Zola's 2026 cost guide puts bridal hair at roughly $150 to $600 and bridal makeup at roughly $200 to $500. That means professional hair and makeup for the bride alone commonly lands between about $350 and $1,100 before trials, travel, and gratuity. Where you fall depends on your market, the artist's experience, what is included, and how many people are getting ready with you.",
      },
      {
        type: "p",
        text: "A reasonable amount is one that pays for a reliable professional, a look that lasts all day, and a calm morning. The lowest quote does not always do that. Here is how to think about the number, and what you are paying for.",
      },
      { type: "h2", text: "Typical bridal hair and makeup costs" },
      {
        type: "ul",
        items: [
          "Bridal hair: about $150–$600 (Zola, 2026).",
          "Bridal makeup: about $200–$500 (Zola, 2026).",
          "Trials or previews: about $100–$250 for hair and $150–$300 for makeup (Zola, 2026).",
          "Bridesmaids: about $75–$150 per person for hair and $60–$125 for makeup (Zola, 2026).",
        ],
      },
      {
        type: "p",
        text: "Other sources come in lower. WeddingWire's cost guide, built from prices couples reported, shows a typical figure around $300. Sources measure different things, so use any national number as a starting point, not a quote. These figures are national data, not Maureen Ella's pricing. Our collection pricing is shared privately after you inquire.",
      },
      { type: "h2", text: "What affects the price of bridal hair and makeup" },
      {
        type: "ul",
        items: [
          "Experience and portfolio: specialists in bridal work usually charge more than general stylists.",
          "On-location service: travel, setup, and packing a full kit to your getting-ready suite take time.",
          "Start time: very early mornings may carry an added fee with some artists.",
          "Group size: more services may require an additional artist to keep the schedule realistic.",
          "What is included: a preview, lashes, touch-up kits, timeline planning, or touch-up coverage change the value.",
          "Complexity: very long or thick hair, extensions, and detailed styles take longer.",
          "Date and season: popular Saturdays book first and are rarely discounted.",
        ],
      },
      { type: "h2", text: "What you are really paying for" },
      {
        type: "p",
        text: "The time in the chair is only part of the service. A professional bridal artist plans your timeline with your photographer, tests your look at a preview, brings professional products and sanitary tools, travels and sets up on site, and builds hair and makeup to last through heat, hugs, and happy tears. You are paying for a predictable wedding morning as much as a beautiful result.",
      },
      { type: "h2", text: "How to set your bridal beauty budget" },
      {
        type: "ul",
        items: [
          "Decide which services you want: hair, makeup, or both, plus a preview.",
          "Count everyone who wants services, including mothers and flower girls.",
          "Ask exactly what each quote includes before comparing numbers.",
          "Add a line for travel and any early-start fees.",
          "Plan for gratuity, commonly 15 to 20 percent of the service total.",
          "Keep a small cushion for last-minute additions to the service count.",
        ],
      },
      { type: "h2", text: "Signs a quote may be too good to be true" },
      {
        type: "ul",
        items: [
          "No written agreement that spells out services, timing, and policies.",
          "A portfolio with few real wedding photos, or none in natural daylight.",
          "Vague answers about who will do your hair and makeup on the day.",
          "No option for a preview before the wedding.",
          "Few or no reviews from real brides.",
        ],
      },
      { type: "h2", text: "Questions to ask before you book" },
      {
        type: "ul",
        items: [
          "Is a preview included, or priced separately?",
          "Are lashes, touch-up kits, or touch-up coverage included?",
          "Is there a travel fee, minimum service count, or early-start fee?",
          "Will you bring additional artists if my group needs them?",
          "What reserves my date, and when is the balance due?",
        ],
      },
      { type: "h2", text: "Where to save and where to invest" },
      {
        type: "p",
        text: "If the budget is tight, protect your own hair and makeup and your preview. Those appear in every photo, and the preview is where problems get solved. Save elsewhere instead. Let bridesmaids choose whether they want services, offer makeup-only for some, or skip extras. Avoid squeezing a large group into one artist's schedule to save money. A very early start or a rushed morning costs more in stress than an extra artist costs in dollars.",
      },
      {
        type: "p",
        text: "Maureen Ella provides on-location bridal hair and makeup in St. Augustine, Jacksonville, Palm Coast, and across Northeast Florida. Request availability with your date and service count, and you will receive our collection details and pricing privately by email.",
      },
      { type: "h2", text: "Sources" },
      {
        type: "ul",
        items: [
          "Zola, A Guide to Wedding Hair and Makeup Costs (updated March 6, 2026).",
          "WeddingWire, Wedding Hair and Makeup Cost guide (accessed November 2026).",
        ],
      },
    ],
    faqs: [
      {
        question: "Is $500 a lot for bridal hair and makeup?",
        answer:
          "Not by national standards. Zola's 2026 guide puts bridal hair at about $150 to $600 and bridal makeup at about $200 to $500, so $500 for both sits in the lower-to-middle part of the typical range. What is included matters as much as the number.",
      },
      {
        question: "Do I have to pay for a hair and makeup trial?",
        answer:
          "Often, yes. Zola's 2026 guide puts trials at about $100 to $250 for hair and $150 to $300 for makeup when priced separately. Some artists include a preview in a bridal collection, so ask what each quote covers.",
      },
      {
        question: "Does bridal hair and makeup pricing include travel?",
        answer:
          "Not always. Many on-location artists charge travel based on your getting-ready location. At Maureen Ella, any travel fee is itemized in your proposal so you see it in writing before booking.",
      },
      {
        question: "Should the bride pay for her bridesmaids' hair and makeup?",
        answer:
          "Traditionally, bridesmaids pay for their own, but many couples now cover it as a gift, especially when professional hair and makeup is required. Decide early and tell your bridal party.",
      },
    ],
    relatedLinks: [
      {
        href: "/journal/average-cost-of-wedding-hair-and-makeup",
        title: "Average Cost of Hair & Makeup",
        description: "National averages for the bride, bridal party, and trials.",
      },
      {
        href: "/journal/how-much-to-tip-bridal-hair-and-makeup",
        title: "How Much to Tip",
        description: "Standard gratuity for bridal hair and makeup artists.",
      },
      {
        href: "/journal/who-pays-for-wedding-hair-and-makeup",
        title: "Who Pays for Hair & Makeup?",
        description: "Etiquette for brides, bridesmaids, and mothers.",
      },
    ],
  },

  "average-cost-of-wedding-hair-and-makeup": {
    metaTitle: "Average Cost of Wedding Hair and Makeup",
    excerpt:
      "Zola's 2026 data puts the average couple's hair and makeup spend at $982. See per-person costs for the bride, bridesmaids, and trials, and why sources differ.",
    image: "/images/journal/average-cost-of-wedding-hair-and-makeup.jpg",
    imageAlt:
      "A bride in a white robe laughing with her bridesmaids in purple robes on the wedding morning",
    imagePosition: "center",
    datePublished: "2026-11-17",
    body: [
      {
        type: "p",
        text: "The average cost of wedding hair and makeup is roughly $800 to $1,200 in total, according to the Zola Wedding Cost Index, and couples spend $982 on average (Zola, 2026). For the bride alone, national guides put hair at about $150 to $600 and makeup at about $200 to $500. The biggest factor in your total is simple: how many people are getting hair and makeup done.",
      },
      { type: "h2", text: "Average cost of wedding hair and makeup by service" },
      {
        type: "ul",
        items: [
          "Bride's hair: about $150–$600.",
          "Bride's makeup: about $200–$500.",
          "Hair trial: about $100–$250.",
          "Makeup trial: about $150–$300.",
          "Bridesmaid hair: about $75–$150 per person.",
          "Bridesmaid makeup: about $60–$125 per person.",
        ],
      },
      {
        type: "p",
        text: "All of the ranges above come from Zola's 2026 hair and makeup cost guide. They are national figures. Prices in your area, and for any individual artist, may be higher or lower.",
      },
      { type: "h2", text: "Why average cost figures vary so much" },
      {
        type: "p",
        text: "Different sources measure different things. WeddingWire's cost guide is built from prices couples reported in reviews. It shows a typical figure around $300 within a range of about $150 to $600, an average bridal updo around $100, and makeup near $100 for traditional application or $115 for airbrush. Zola's $982 average reflects what couples spend overall, and it may include more than one person's services. Neither number is wrong, but they answer different questions. Compare quotes by what is included, not by headline price.",
      },
      { type: "h2", text: "How to estimate your own total" },
      {
        type: "p",
        text: "Here is an illustration using Zola's national ranges for a bride and four bridesmaids who each want hair and makeup. It is an example, not a quote:",
      },
      {
        type: "ul",
        items: [
          "Bride's hair and makeup: about $350–$1,100.",
          "Four bridesmaids' hair and makeup: about $540–$1,100.",
          "Hair and makeup trial: about $250–$550.",
          "Estimated total before travel and gratuity: about $1,140–$2,750.",
        ],
      },
      {
        type: "p",
        text: "Then add gratuity, commonly 15 to 20 percent of the service total, and any travel or early-start fees. If mothers, flower girls, or other family members want services, add them to the count as well.",
      },
      { type: "h2", text: "What can cost extra" },
      {
        type: "ul",
        items: [
          "Travel to your getting-ready location.",
          "Very early start times.",
          "An additional artist for larger groups or tight timelines.",
          "Touch-up coverage, where an artist stays through photos or the ceremony.",
          "Lashes, extensions styling, or very detailed hairstyles, depending on the artist.",
        ],
      },
      { type: "h2", text: "Is professional wedding hair and makeup worth it?" },
      {
        type: "p",
        text: "For most brides, yes. Your wedding photos last for decades, and professional hair and makeup is built to hold for many hours through heat, hugs, and happy tears. Just as important, a professional team runs the wedding-morning schedule, so you are not managing curling irons and timelines while you try to be present. Bridesmaids can decide for themselves, but the bride's own look is usually the last place to cut corners.",
      },
      { type: "h2", text: "Ways to manage the cost" },
      {
        type: "ul",
        items: [
          "Offer services as optional, so only people who want them are in the count.",
          "Decide early who is paying for bridesmaids' services, and say so in writing.",
          "Choose makeup-only or hair-only for some guests.",
          "Get ready in one location so the team sets up once.",
          "Consider a weekday or off-peak date if your date is flexible.",
          "Confirm your final service count early so the schedule and quote stay accurate.",
        ],
      },
      {
        type: "p",
        text: "Maureen Ella provides on-location bridal hair and makeup in St. Augustine, Jacksonville, Palm Coast, and across Northeast Florida. Share your date and estimated service count when you request availability, and you will receive our collection pricing privately by email.",
      },
      { type: "h2", text: "Sources" },
      {
        type: "ul",
        items: [
          "Zola, A Guide to Wedding Hair and Makeup Costs (updated March 6, 2026), using the Zola Wedding Cost Index.",
          "WeddingWire, Wedding Hair and Makeup Cost guide (accessed November 2026).",
        ],
      },
    ],
    faqs: [
      {
        question: "How much does bridal party hair and makeup cost per person?",
        answer:
          "Zola's 2026 guide puts bridesmaid hair at about $75 to $150 and makeup at about $60 to $125 per person, so about $135 to $275 per person for both, before gratuity and travel.",
      },
      {
        question: "Is the hair and makeup trial included in the price?",
        answer:
          "It depends on the artist. When priced separately, Zola's 2026 guide puts trials at about $100 to $250 for hair and $150 to $300 for makeup. Some bridal collections include a preview.",
      },
      {
        question: "Why does on-location wedding hair and makeup cost more?",
        answer:
          "Artists who come to you spend time traveling, setting up a full kit, and packing out, often on early mornings. That time is reflected in travel fees or in the service price.",
      },
      {
        question: "How much should I budget for wedding hair and makeup?",
        answer:
          "Start with the national average of about $800 to $1,200 total from the Zola Wedding Cost Index. Then adjust for your service count, trials, travel, and a 15 to 20 percent gratuity.",
      },
    ],
    relatedLinks: [
      {
        href: "/journal/how-much-should-a-bride-pay-for-hair-and-makeup",
        title: "How Much Should a Bride Pay?",
        description: "How to set a reasonable bridal beauty budget.",
      },
      {
        href: "/journal/bridal-makeup-artist-cost",
        title: "Bridal Makeup Artist Cost",
        description: "What makeup alone typically costs and includes.",
      },
      {
        href: "/journal/who-pays-for-wedding-hair-and-makeup",
        title: "Who Pays for Hair & Makeup?",
        description: "Etiquette for brides, bridesmaids, and mothers.",
      },
    ],
  },

  "bridal-makeup-artist-cost": {
    metaTitle: "How Much Does a Bridal Makeup Artist Cost?",
    excerpt:
      "Bridal makeup typically runs $200–$500 for the bride, with trials around $150–$300 (Zola, 2026). Here is what is included and what changes the price.",
    image: "/images/journal/bridal-makeup-artist-cost.jpg",
    imageAlt:
      "Maureen Ella applying makeup from a palette to a bride on her wedding morning",
    imagePosition: "center 40%",
    datePublished: "2026-11-16",
    body: [
      {
        type: "p",
        text: "A bridal makeup artist (MUA) typically costs about $200 to $500 for the bride's wedding-day makeup, according to Zola's 2026 cost guide. A makeup trial adds roughly $150 to $300, and bridesmaid makeup runs about $60 to $125 per person. Some cost guides built from couple-reported prices show lower averages. WeddingWire lists about $100 for traditional makeup and $115 for airbrush. Treat any single number as a starting point, not a rule.",
      },
      { type: "h2", text: "Typical bridal makeup artist pricing" },
      {
        type: "ul",
        items: [
          "Bride's wedding-day makeup: about $200–$500 (Zola, 2026).",
          "Makeup trial or preview: about $150–$300 (Zola, 2026).",
          "Bridesmaid makeup: about $60–$125 per person (Zola, 2026).",
          "Traditional vs. airbrush: about $100 vs. $115 on average in couple-reported data (WeddingWire).",
        ],
      },
      {
        type: "p",
        text: "These are national figures, not Maureen Ella's pricing. Our collection and à la carte pricing is shared privately after you inquire.",
      },
      { type: "h2", text: "What is usually included in bridal makeup" },
      {
        type: "ul",
        items: [
          "A consultation about your skin, preferences, and inspiration.",
          "Skin preparation and primer suited to your skin type.",
          "Foundation, concealer, and color matched to you in natural light.",
          "Eye makeup, brows, and lashes. Lashes may be included or priced separately.",
          "Setting for long wear, and your lip color to keep for touch-ups.",
        ],
      },
      { type: "h2", text: "Airbrush vs. traditional makeup: does it cost more?" },
      {
        type: "p",
        text: "Sometimes, but usually not by much. WeddingWire's couple-reported averages put airbrush only slightly above traditional application. More important than cost is fit. Airbrush sprays foundation in thin, even layers, while traditional application uses brushes and sponges. Both can look beautiful and last all day. Choose based on your skin, the coverage you want, and how the look performs at your preview.",
      },
      { type: "h2", text: "What changes the price" },
      {
        type: "ul",
        items: [
          "The artist's experience and specialization in bridal work.",
          "On-location service and travel distance.",
          "Very early start times.",
          "The number of makeup services, and whether a second artist is needed.",
          "Add-ons such as lashes, touch-up kits, or touch-up coverage through photos.",
          "Your wedding date and season.",
        ],
      },
      { type: "h2", text: "Is a makeup trial worth it?" },
      {
        type: "p",
        text: "For most brides, yes. A trial or preview is where your artist chooses the right foundation, tests lashes, and confirms how the look wears over several hours. You can also take flash photos to check for flashback. You leave knowing exactly what to expect, and the wedding morning becomes a repeat of something you already love rather than an experiment.",
      },
      { type: "h2", text: "How to choose a bridal makeup artist" },
      {
        type: "ul",
        items: [
          "Look for real wedding photos in daylight and flash, not only studio images.",
          "Check that their portfolio includes skin tones, ages, and skin types like yours.",
          "Read reviews for punctuality, communication, and how well makeup lasted.",
          "Ask about sanitation and how they handle sensitive or allergy-prone skin.",
          "Get a written agreement that lists services, timing, and policies.",
        ],
      },
      { type: "h2", text: "Booking hair and makeup with one team" },
      {
        type: "p",
        text: "Booking hair and makeup together means one schedule, one point of contact, and artists who plan the morning as a team. Maureen Ella provides both bridal hair and makeup on location in St. Augustine, Jacksonville, Palm Coast, and across Northeast Florida. Request availability with your date and service count, and we will send our pricing privately by email.",
      },
      { type: "h2", text: "Sources" },
      {
        type: "ul",
        items: [
          "Zola, A Guide to Wedding Hair and Makeup Costs (updated March 6, 2026).",
          "WeddingWire, Wedding Hair and Makeup Cost guide (accessed November 2026).",
        ],
      },
    ],
    faqs: [
      {
        question: "Is airbrush makeup more expensive for a wedding?",
        answer:
          "Sometimes slightly. WeddingWire's couple-reported averages put airbrush at about $115 versus about $100 for traditional makeup. Choose the method that suits your skin rather than deciding on price alone.",
      },
      {
        question: "Do bridal makeup artists charge extra for lashes?",
        answer:
          "Some include lashes and some charge separately. Ask whether lashes are part of the bridal service and what style is included.",
      },
      {
        question: "How much should I tip a bridal makeup artist?",
        answer:
          "Fifteen to 20 percent of the service total is standard. Zola's 2026 tipping guide recommends 16 to 20 percent, given when the artist finishes your look. Check your contract first in case gratuity is already included.",
      },
      {
        question: "Does the makeup artist stay for touch-ups?",
        answer:
          "Some artists offer touch-up coverage for an additional fee, subject to availability. If you would like it, mention it when you inquire so it can be included in your proposal.",
      },
    ],
    relatedLinks: [
      {
        href: "/journal/best-foundation-for-wedding-day",
        title: "Best Foundation for Your Wedding",
        description: "How to choose a foundation that lasts and photographs well.",
      },
      {
        href: "/journal/average-cost-of-wedding-hair-and-makeup",
        title: "Average Cost of Hair & Makeup",
        description: "National averages for the bride, bridal party, and trials.",
      },
      {
        href: "/journal/lash-extensions-vs-false-lashes-wedding",
        title: "Lash Extensions vs. False Lashes",
        description: "Which lash option suits your wedding day.",
      },
    ],
  },

  "budget-for-a-100-person-wedding": {
    metaTitle: "Reasonable Budget for a 100-Person Wedding",
    excerpt:
      "At the national average of $292 per guest (The Knot, 2026), a 100-person wedding costs about $29,200. Here is how to build a realistic budget.",
    image: "/images/journal/budget-for-a-100-person-wedding.jpg",
    imageAlt:
      "A bride walking toward her groom at an outdoor ceremony lined with white and blush florals",
    imagePosition: "center 40%",
    datePublished: "2026-11-13",
    body: [
      {
        type: "p",
        text: "A reasonable budget for a 100-person wedding is about $29,000 if you spend at the U.S. national average. The Knot's 2026 Real Weddings Study found couples spent an average of $292 per guest on 2025 weddings, and 100 guests at $292 comes to $29,200. Many couples spend far less or far more. Your location, season, venue style, and priorities move the number more than guest count alone.",
      },
      { type: "h2", text: "National wedding budget benchmarks" },
      {
        type: "ul",
        items: [
          "Average wedding cost: $34,000 for weddings held in 2025 (The Knot 2026 Real Weddings Study).",
          "Average guest count: 117 guests (The Knot, 2026).",
          "Average cost per guest: $292 (The Knot, 2026).",
          "Average number of wedding professionals hired: 13 (The Knot, 2026).",
          "Couples planning 2026 weddings expect to spend $36,000 on average for 145 guests (Zola First Look Report 2026).",
          "Typical Florida wedding budget: about $25,200–$37,800 (Zola Wedding Cost Index, 2026).",
        ],
      },
      { type: "h2", text: "What 100 guests costs at different per-guest budgets" },
      {
        type: "p",
        text: "Per-guest math is the simplest way to sanity-check a budget. These are illustrations, not quotes:",
      },
      {
        type: "ul",
        items: [
          "$150 per guest: about $15,000.",
          "$200 per guest: about $20,000.",
          "$292 per guest (the 2025 national average): about $29,200.",
          "$400 per guest: about $40,000.",
        ],
      },
      { type: "h2", text: "Per-guest costs vs. fixed costs" },
      {
        type: "p",
        text: "Some costs rise with every guest you add: catering, the bar, rentals, cake or dessert, invitations, and favors. Your venue size also has to fit your guest count. Other costs stay about the same whether you invite 60 people or 160. These include your photographer, videographer, attire, officiant, music, and planner. That is why trimming the guest list saves so much. The Knot's 2026 data shows the link: couples spending more than $41,000 averaged 141 guests, while those spending under $12,000 averaged 92.",
      },
      { type: "h2", text: "How to build your wedding budget step by step" },
      {
        type: "ul",
        items: [
          "Start with the total: what the two of you can contribute, plus any family contributions.",
          "Choose your top three priorities, such as food, photography, or the venue, and fund those first.",
          "Get venue and catering quotes early. They usually set the frame for everything else.",
          "Add your fixed-cost vendors: photographer, attire, beauty, music, and officiant.",
          "Keep a contingency cushion for overages, gratuities, and last-minute additions.",
          "Track deposits and due dates in one shared spreadsheet.",
        ],
      },
      { type: "h2", text: "Ways to fit 100 guests into a smaller budget" },
      {
        type: "ul",
        items: [
          "Choose an off-peak day or season, or a Friday or Sunday.",
          "Hold the ceremony and reception at the same venue to save on transportation and rentals.",
          "Consider a brunch, lunch, or afternoon reception.",
          "Offer a limited bar or signature drinks instead of a full open bar.",
          "Go digital for save-the-dates and keep printed pieces simple.",
          "Spend generously on your top priorities and modestly everywhere else.",
        ],
      },
      { type: "h2", text: "Where hair and makeup fits in your budget" },
      {
        type: "p",
        text: "Beauty is one of the fixed costs. It grows with the size of your bridal party, not your guest list. Zola's 2026 data puts the average couple's hair and makeup spend at $982. Plan your number around how many people will be getting ready with you, and confirm whether bridesmaids are paying for their own services.",
      },
      {
        type: "p",
        text: "Maureen Ella provides on-location bridal hair and makeup in St. Augustine, Jacksonville, Palm Coast, and across Northeast Florida. Request availability with your date and estimated service count, and our collection pricing will arrive privately by email so you can plan with real numbers.",
      },
      { type: "h2", text: "Sources" },
      {
        type: "ul",
        items: [
          "The Knot Worldwide, 2026 Real Weddings Study press release (February 18, 2026), covering 10,474 U.S. couples married in 2025.",
          "WeddingPro, Real Weddings Study vendor insights (February 23, 2026).",
          "Zola, The First Look Report 2026 (updated October 16, 2026).",
          "Zola, How Much Does a Wedding Cost? (updated March 6, 2026).",
          "Zola, A Guide to Wedding Hair and Makeup Costs (updated March 6, 2026).",
        ],
      },
    ],
    faqs: [
      {
        question: "Is $20,000 enough for a 100-person wedding?",
        answer:
          "It can be. $20,000 for 100 guests is $200 per guest, below the 2025 national average of $292. It usually works best with an off-peak date, a single venue, and clear priorities.",
      },
      {
        question: "How much does a 100-person wedding cost in Florida?",
        answer:
          "Zola's 2026 cost index puts typical Florida wedding budgets at about $25,200 to $37,800, though it does not break that down by guest count. Your venue, date, and catering style will move the number most.",
      },
      {
        question: "What is the biggest expense for a 100-person wedding?",
        answer:
          "For most couples, the venue and catering. Food, drink, and rentals scale with every guest, so they usually take the largest share of the budget.",
      },
      {
        question: "How many guests does the average wedding have?",
        answer:
          "The Knot's 2026 Real Weddings Study found an average of 117 guests at 2025 weddings. Zola's survey of couples planning 2026 weddings found an average of 145 guests.",
      },
    ],
    relatedLinks: [
      {
        href: "/journal/who-pays-for-what-at-a-wedding",
        title: "Who Pays for What in 2026",
        description: "Traditional roles and how couples split costs today.",
      },
      {
        href: "/journal/average-cost-of-wedding-hair-and-makeup",
        title: "Average Cost of Hair & Makeup",
        description: "Budget your beauty line with national averages.",
      },
      {
        href: "/journal/when-to-book-wedding-hair-makeup",
        title: "When to Book Hair & Makeup",
        description: "A month-by-month guide to booking your beauty team.",
      },
    ],
  },

  "how-much-to-tip-bridal-hair-and-makeup": {
    metaTitle: "How Much to Tip Bridal Hair and Makeup",
    excerpt:
      "The standard tip for bridal hair and makeup artists is 15–20% of the service total, given when your look is finished. Here is who to tip, when, and how.",
    image: "/images/journal/how-much-to-tip-bridal-hair-and-makeup.jpg",
    imageAlt: "Maureen Ella sharing a warm hug with a bride on her wedding day",
    imagePosition: "center 40%",
    datePublished: "2026-11-14",
    body: [
      {
        type: "p",
        text: "Tip bridal hair and makeup artists 15 to 20 percent of the service total, the same as you would at a salon. Zola's 2026 tipping guide recommends 16 to 20 percent, and WeddingWire and Thumbtack both suggest 15 to 20 percent. Tip each artist who worked on you or your wedding party, and give the tip when they finish your look. Before you tip, check your contract. If gratuity or a service charge is already included, an extra tip is optional.",
      },
      { type: "h2", text: "Quick guide to tipping wedding hair and makeup" },
      {
        type: "ul",
        items: [
          "How much: 15–20 percent of the total service cost.",
          "Who: each artist and assistant who worked on you or your group.",
          "When: at the end of your appointment, once your look is finished.",
          "Trials: Zola also suggests tipping at your trial, based on the trial price.",
          "How: cash in a labeled envelope, or the artist's preferred digital payment method.",
        ],
      },
      { type: "h2", text: "How to calculate the tip" },
      {
        type: "p",
        text: "Base the tip on the service total before any travel fee. For example, if hair and makeup for your whole group totals $1,000, a 15 to 20 percent tip is $150 to $200. If two artists worked together, split it between them, or give each artist a tip based on the services they provided. These figures are an example, not a quote.",
      },
      { type: "h2", text: "Who pays the tip?" },
      {
        type: "p",
        text: "Usually, whoever pays for the service also pays the tip. If the bride is covering her bridesmaids' hair and makeup, she typically covers their gratuity too. If bridesmaids pay for their own services, each one tips on her own. Some brides prefer to tip on behalf of everyone so the artists receive one simple thank-you. Decide ahead of time and tell your bridal party so no one is caught off guard on the wedding morning.",
      },
      { type: "h2", text: "Is gratuity already included?" },
      {
        type: "p",
        text: "Read your agreement before the wedding. Some contracts include gratuity, while others list a service charge that may or may not go to the artists. If you are unsure, ask. It is a normal question, and a clear answer helps you budget accurately.",
      },
      { type: "h2", text: "Other meaningful ways to say thank you" },
      {
        type: "ul",
        items: [
          "Leave a detailed Google review. For a small business, reviews make a real difference.",
          "Share your photographer's images with your artist, with the photographer's permission.",
          "Refer friends and family who are planning weddings.",
          "Send a short thank-you note after the honeymoon.",
        ],
      },
      { type: "h2", text: "A tipping checklist for the wedding morning" },
      {
        type: "ul",
        items: [
          "Prepare cash or digital payments the day before.",
          "Label an envelope for each artist and assistant.",
          "Give the envelopes to your maid of honor, a planner, or your mom to hand out.",
          "Include tips for anyone who joins for touch-up coverage later in the day.",
        ],
      },
      {
        type: "p",
        text: "A calm wedding morning comes from planning the small details ahead of time, gratuity included. Maureen Ella provides on-location bridal hair and makeup in St. Augustine, Jacksonville, Palm Coast, and across Northeast Florida. Request availability to start planning yours.",
      },
      { type: "h2", text: "Sources" },
      {
        type: "ul",
        items: [
          "Zola, A Guide to Tipping Wedding Vendors (updated June 1, 2026).",
          "WeddingWire, Wedding Hair and Makeup Cost guide (accessed November 2026).",
          "Thumbtack, How much should you tip a wedding makeup artist? (accessed November 2026).",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you tip for a bridal hair and makeup trial?",
        answer:
          "Many people do. Zola's 2026 tipping guide suggests tipping at your trial as well, based on the trial price, at the same 15 to 20 percent you would give on the wedding day.",
      },
      {
        question: "Should bridesmaids tip their own hair and makeup artist?",
        answer:
          "If bridesmaids pay for their own services, they usually tip on their own too. If the bride is covering their services, she typically covers the tip. Agree on the plan ahead of time.",
      },
      {
        question: "Is it rude not to tip wedding hair and makeup artists?",
        answer:
          "Tipping is customary in the U.S. for beauty services, but it is not mandatory. If your contract already includes gratuity, an extra tip is optional. A thoughtful review is also a valued thank-you.",
      },
      {
        question: "When do you tip the hair and makeup artist on the wedding day?",
        answer:
          "Give the tip when your artist finishes your look, or at the end of the group's services. Ask a trusted person to hold labeled envelopes so you do not have to think about it.",
      },
    ],
    relatedLinks: [
      {
        href: "/journal/how-much-should-a-bride-pay-for-hair-and-makeup",
        title: "How Much Should a Bride Pay?",
        description: "How to set a reasonable bridal beauty budget.",
      },
      {
        href: "/journal/who-pays-for-wedding-hair-and-makeup",
        title: "Who Pays for Hair & Makeup?",
        description: "Etiquette for brides, bridesmaids, and mothers.",
      },
      {
        href: "/bridal/reviews",
        title: "Read Bride Reviews",
        description: "What brides say about their wedding mornings.",
      },
    ],
  },

  "who-pays-for-wedding-hair-and-makeup": {
    metaTitle: "Who Should Pay for Wedding Hair and Makeup?",
    excerpt:
      "The bride pays for her own hair and makeup. Bridesmaids traditionally pay for theirs, but many couples now cover it as a gift. Here is how to decide fairly.",
    image: "/images/journal/who-pays-for-wedding-hair-and-makeup.jpg",
    imageAlt:
      "A bride in a white gown with her bridesmaids in burgundy dresses holding bouquets",
    imagePosition: "center",
    datePublished: "2026-11-15",
    body: [
      {
        type: "p",
        text: "The bride, or whoever is paying for the wedding, covers the bride's hair and makeup. By tradition, bridesmaids pay for their own hair and makeup, along with their attire and travel. Zola's etiquette guide notes that many couples now pay for their wedding party's day-of hair and makeup as a gift. A fair rule of thumb: if you require professional hair and makeup, consider covering it. If it is optional, it is fine for each person to pay for her own. Either way, say so early.",
      },
      { type: "h2", text: "A quick guide to who pays for what" },
      {
        type: "ul",
        items: [
          "The bride: the bride or couple, or family as part of the overall wedding budget.",
          "Bridesmaids and the maid of honor: traditionally themselves, though the couple may cover it as a gift.",
          "Mothers of the bride and groom: usually themselves, or the couple may cover it as a thank-you.",
          "Flower girls: usually the couple or the child's parents.",
          "Other family and guests: typically themselves, if they choose to book services.",
        ],
      },
      { type: "h2", text: "If you require professional hair and makeup" },
      {
        type: "p",
        text: "Some brides want a cohesive, polished look for the whole wedding party, and that is a reasonable wish. If professional hair and makeup is a requirement rather than an option, consider covering at least part of the cost. Bridesmaids already pay for dresses, travel, and showers. If you cannot cover it, tell them the expected cost as early as possible, ideally before they agree to be in the wedding.",
      },
      { type: "h2", text: "If hair and makeup is optional" },
      {
        type: "p",
        text: "When services are optional, let each bridesmaid decide. Some will love being pampered, and others will prefer to do their own makeup or book hair only. Share the artist's information, the cost, and a deadline to opt in, so the final service count and schedule can be set.",
      },
      { type: "h2", text: "How to talk to your bridal party about cost" },
      {
        type: "ul",
        items: [
          "Bring it up early, ideally when you ask them to be in the wedding party.",
          "Put the details in writing: services offered, approximate cost, and who is paying.",
          "Give a clear deadline to opt in or out.",
          "Explain how payment works, whether it is one invoice or individual payments.",
          "Mention gratuity, commonly 15 to 20 percent, so no one is surprised.",
        ],
      },
      { type: "h2", text: "How payment works on the wedding day" },
      {
        type: "p",
        text: "If you are paying for your bridesmaids, Zola recommends paying the hair and makeup artists directly rather than reimbursing each person. If bridesmaids are paying for themselves, ask your artist how individual payments are handled. Most bridal artists work from a single agreement with the bride, so confirm the process before the wedding morning.",
      },
      { type: "h2", text: "Budget-friendly middle grounds" },
      {
        type: "ul",
        items: [
          "Cover hair for everyone and let bridesmaids pay for makeup, or the reverse.",
          "Cover the maid of honor and let others opt in at their own cost.",
          "Make hair and makeup your bridesmaid gift instead of a separate present.",
          "Cover the services and let bridesmaids handle their own gratuity, and say so clearly.",
        ],
      },
      {
        type: "p",
        text: "However you divide the cost, an accurate service count keeps the morning on schedule. Maureen Ella provides on-location hair and makeup for brides, bridal parties, and mothers in St. Augustine, Jacksonville, Palm Coast, and across Northeast Florida. Share your estimated count when you request availability.",
      },
      { type: "h2", text: "Sources" },
      {
        type: "ul",
        items: [
          "Zola, Who Should Pay for the Wedding? (updated September 10, 2025).",
          "Zola, Who Pays for Bridesmaid Hair and Makeup? (updated February 5, 2024).",
          "Emily Post Institute, Wedding Attendants (accessed November 2026).",
        ],
      },
    ],
    faqs: [
      {
        question: "Do bridesmaids pay for their own hair and makeup?",
        answer:
          "Traditionally, yes, along with their attire and travel. Many couples now cover bridesmaids' hair and makeup as a gift, especially when it is required. Make the plan clear early.",
      },
      {
        question: "Should the bride pay for bridesmaids' hair and makeup?",
        answer:
          "She does not have to, but it is a generous gesture, and it is especially considerate if professional hair and makeup is required. If you are not covering it, share the cost early.",
      },
      {
        question: "Who pays for the mother of the bride's hair and makeup?",
        answer:
          "Usually the mother of the bride pays for her own, though some couples cover it as a thank-you. She should tell the bride early so she is included in the service count.",
      },
      {
        question: "Can I require my bridesmaids to get professional hair and makeup?",
        answer:
          "You can ask, but be thoughtful. If it is required, consider covering some or all of the cost, and let bridesmaids know before they commit to being in the wedding.",
      },
    ],
    relatedLinks: [
      {
        href: "/journal/average-cost-of-wedding-hair-and-makeup",
        title: "Average Cost of Hair & Makeup",
        description: "Per-person averages for the bride and bridal party.",
      },
      {
        href: "/journal/what-does-the-mother-of-the-bride-pay-for",
        title: "What Does the Mother of the Bride Pay For?",
        description: "Traditional expectations and modern family budgets.",
      },
      {
        href: "/journal/how-much-to-tip-bridal-hair-and-makeup",
        title: "How Much to Tip",
        description: "Standard gratuity for bridal hair and makeup artists.",
      },
    ],
  },

  "what-does-the-mother-of-the-bride-pay-for": {
    metaTitle: "What Should the Mother of the Bride Pay For?",
    excerpt:
      "Traditionally the bride's family paid for most of the wedding day. Today most families share costs. Here is what the mother of the bride typically pays for.",
    image: "/images/journal/what-does-the-mother-of-the-bride-pay-for.jpg",
    imageAlt: "A bride beside her wedding cake and a bottle of champagne at the reception",
    imagePosition: "center",
    datePublished: "2026-11-11",
    body: [
      {
        type: "p",
        text: "Traditionally, the bride's family, often led by the mother of the bride, paid for most of the wedding day. That included the ceremony, reception, flowers, photography, music, invitations, and the bride's dress and accessories. Today there is no fixed rule. Zola's 2026 survey found that 71 percent of weddings receive some financial help, and among those, 69 percent are supported by both families. In practice, the mother of the bride pays for her own outfit and beauty, plus whatever contribution she and the couple agree on.",
      },
      { type: "h2", text: "What the bride's family traditionally pays for" },
      {
        type: "p",
        text: "According to the Emily Post Institute's traditional division of wedding expenses, the bride and her family cover:",
      },
      {
        type: "ul",
        items: [
          "The bride's wedding gown and accessories.",
          "Ceremony costs and all reception expenses.",
          "Flowers for the ceremony and reception, including the bridesmaids' bouquets.",
          "Invitations, announcements, and other stationery.",
          "Photography and videography.",
          "Music for the ceremony and reception.",
          "Transportation for the bridal party.",
          "Accommodations for the bride's attendants and the bride's gifts to them.",
        ],
      },
      {
        type: "p",
        text: "Zola also notes that it is traditional for the mother of the bride to give the bride her wedding dress, which is often a meaningful gift for both of them.",
      },
      { type: "h2", text: "What the mother of the bride usually pays for today" },
      {
        type: "ul",
        items: [
          "Her own dress, shoes, and accessories.",
          "Her own hair and makeup, unless the couple offers to cover it.",
          "Her own travel and accommodations.",
          "A wedding gift for the couple.",
          "Any contribution she and the couple agree on, whether a set amount or specific vendors.",
          "Optionally, hosting a shower, brunch, or welcome event if she would like to.",
        ],
      },
      { type: "h2", text: "Common ways mothers contribute today" },
      {
        type: "ul",
        items: [
          "A fixed amount the couple can use however they choose.",
          "Specific categories, such as the dress, flowers, or photographer.",
          "A share of the total budget, agreed on with the couple and the other family.",
          "Time and help: addressing invitations, coordinating family travel, or hosting out-of-town guests.",
        ],
      },
      { type: "h2", text: "How to talk about money with the couple" },
      {
        type: "ul",
        items: [
          "Have the conversation early, before the venue is booked.",
          "Be specific about the amount or categories you can cover.",
          "Talk openly about whether a contribution comes with any say in decisions.",
          "Write down what was agreed so there are no misunderstandings later.",
          "Avoid comparing your contribution to the other family's.",
        ],
      },
      { type: "h2", text: "What the groom's family traditionally pays for" },
      {
        type: "p",
        text: "For balance, the Emily Post Institute's traditional division has the groom's family covering the engagement and wedding rings, the rehearsal dinner, the marriage license, the officiant's fee, and the honeymoon. Many families now share costs in ways that ignore these old lines completely.",
      },
      { type: "h2", text: "Should the mother of the bride pay for her own hair and makeup?" },
      {
        type: "p",
        text: "Usually, yes, though some couples cover it as a thank-you. Either way, the mother of the bride should tell the bride early that she would like services, so she is included in the service count and has a place in the wedding-morning schedule.",
      },
      {
        type: "p",
        text: "Maureen Ella provides hair and makeup for mothers of the bride and groom alongside bridal services in St. Augustine, Jacksonville, Palm Coast, and across Northeast Florida. Include mothers in your service count when you request availability.",
      },
      { type: "h2", text: "Sources" },
      {
        type: "ul",
        items: [
          "Emily Post Institute, Wedding Expenses: The Traditional Division, and Wedding Expenses: Who Pays for What (accessed November 2026).",
          "Zola, Who Should Pay for the Wedding? (updated September 10, 2025).",
          "Zola, The First Look Report 2026 (updated October 16, 2026).",
        ],
      },
    ],
    faqs: [
      {
        question: "Does the mother of the bride pay for the wedding dress?",
        answer:
          "By tradition, the bride's family pays for the gown, and Zola notes it is traditional for the mother of the bride to give the bride her dress. Today it depends on the family. Many brides buy their own.",
      },
      {
        question: "Who pays for the mother of the bride's dress?",
        answer:
          "The mother of the bride typically pays for her own dress, shoes, and accessories.",
      },
      {
        question: "Does the mother of the bride pay for the rehearsal dinner?",
        answer:
          "Traditionally, no. The rehearsal dinner is one of the costs the groom's family covers in the traditional division. Today, many families split it or the couple hosts it.",
      },
      {
        question: "Is the mother of the bride expected to pay for the whole wedding?",
        answer:
          "Not anymore. Zola's 2026 survey found that 88 percent of couples contribute financially, and among weddings that receive family help, 69 percent are supported by both families.",
      },
    ],
    relatedLinks: [
      {
        href: "/journal/who-pays-for-what-at-a-wedding",
        title: "Who Pays for What in 2026",
        description: "Traditional roles and how couples split costs today.",
      },
      {
        href: "/journal/what-should-a-mother-of-the-bride-not-do",
        title: "Mother of the Bride Don'ts",
        description: "A kind, practical guide to supporting the bride.",
      },
      {
        href: "/journal/mother-of-the-bride-hair-up-or-down",
        title: "Mother of the Bride Hair",
        description: "How to choose between up, down, and half-up.",
      },
    ],
  },

  "who-pays-for-what-at-a-wedding": {
    metaTitle: "Who Pays for What at a Wedding in 2026",
    excerpt:
      "In 2026, most couples help pay for their own wedding and many families chip in. Here is the traditional who-pays breakdown and how couples split costs today.",
    image: "/images/journal/who-pays-for-what-at-a-wedding.jpg",
    imageAlt:
      "A bride and groom embracing beneath a flowering tree on a historic brick street",
    imagePosition: "center 70%",
    datePublished: "2026-11-12",
    body: [
      {
        type: "p",
        text: "In 2026, most couples help pay for their own wedding, and families often contribute too. Zola's 2026 First Look Report found that 88 percent of couples are contributing financially, 29 percent fully and 59 percent partially. 71 percent of weddings receive some financial help, and in 69 percent of those, both families pitch in. By tradition, the bride's family paid for the ceremony and reception, the groom's family paid for the rehearsal dinner, rings, and honeymoon, and attendants paid for their own attire. Today, most families treat those lists as a starting point, not a rulebook.",
      },
      { type: "h2", text: "The traditional breakdown: the bride and her family" },
      {
        type: "ul",
        items: [
          "The wedding gown and the bride's accessories.",
          "Ceremony costs and all reception expenses.",
          "Flowers for the ceremony, the reception, and the bridesmaids.",
          "Invitations and stationery.",
          "Photography, videography, and music.",
          "Transportation for the bridal party.",
          "Accommodations for the bride's attendants, and her gifts to them.",
        ],
      },
      { type: "h2", text: "The traditional breakdown: the groom and his family" },
      {
        type: "ul",
        items: [
          "The engagement ring and wedding rings.",
          "The rehearsal dinner.",
          "The marriage license and officiant's fee.",
          "The honeymoon.",
        ],
      },
      { type: "h2", text: "The traditional breakdown: attendants" },
      {
        type: "ul",
        items: [
          "Their own wedding attire and accessories, except flowers (Emily Post Institute).",
          "Their own travel (Zola).",
          "Traditionally, their own hair and makeup, though many couples now cover it as a gift (Zola).",
        ],
      },
      { type: "h2", text: "How couples actually split wedding costs in 2026" },
      {
        type: "p",
        text: "Today's weddings are usually a shared effort. Zola's 2026 survey of more than 11,500 engaged couples found nearly nine in ten contributing financially. Most weddings that receive help are supported by both families, not just the bride's. The Knot's 2026 Real Weddings Study found that families covered roughly 62 percent of costs for couples spending more than $41,000, and that Gen Z weddings remain primarily supported by parents and family.",
      },
      { type: "h2", text: "Three common ways to divide wedding costs" },
      {
        type: "ul",
        items: [
          "By category: each family or the couple takes specific vendors, such as the venue, photographer, or flowers.",
          "By percentage: contributors agree to share the total budget in set proportions.",
          "Fixed contributions: each family gives a set amount, and the couple covers the rest.",
        ],
      },
      { type: "h2", text: "Who pays for wedding hair and makeup?" },
      {
        type: "p",
        text: "The bride's hair and makeup is part of the wedding budget, paid for by the bride, the couple, or the family. Bridesmaids traditionally pay for their own, though many couples now cover it as a gift. Mothers of the bride and groom usually pay for their own unless the couple offers. Whatever you decide, tell everyone early so the final service count is accurate.",
      },
      { type: "h2", text: "Tips for the money conversation" },
      {
        type: "ul",
        items: [
          "Talk with both families before you book the venue.",
          "Ask what each person is comfortable contributing, rather than assuming tradition.",
          "Decide whether contributions come with decision-making, and be honest about it.",
          "Write down who is covering what, including deposits and due dates.",
          "Thank every contributor, whatever the amount.",
        ],
      },
      { type: "h2", text: "Average wedding cost for context" },
      {
        type: "p",
        text: "The Knot's 2026 Real Weddings Study found the average 2025 wedding cost $34,000, with 117 guests and $292 spent per guest. Couples planning 2026 weddings told Zola they expect to spend $36,000 on average. Knowing the total helps every contributor understand what their share covers.",
      },
      {
        type: "p",
        text: "Maureen Ella provides on-location bridal hair and makeup in St. Augustine, Jacksonville, Palm Coast, and across Northeast Florida. Request availability, and our collection pricing will arrive privately by email so your budget conversation can include real numbers.",
      },
      { type: "h2", text: "Sources" },
      {
        type: "ul",
        items: [
          "Zola, The First Look Report 2026 (updated October 16, 2026).",
          "Zola, Who Should Pay for the Wedding? (updated September 10, 2025).",
          "Emily Post Institute, Wedding Expenses: The Traditional Division, Wedding Expenses: Who Pays for What, and Wedding Attendants (accessed November 2026).",
          "The Knot Worldwide, 2026 Real Weddings Study press release (February 18, 2026).",
          "WeddingPro, Real Weddings Study vendor insights (February 23, 2026).",
        ],
      },
    ],
    faqs: [
      {
        question: "Who traditionally pays for the wedding?",
        answer:
          "By tradition, the bride's family paid for the ceremony and reception, the groom's family paid for the rehearsal dinner, rings, license, officiant, and honeymoon, and attendants paid for their own attire. Today most couples contribute, and both families often help.",
      },
      {
        question: "Who pays for the rehearsal dinner?",
        answer:
          "Traditionally, the groom's family. Today, many couples host it themselves or split the cost between families.",
      },
      {
        question: "Who pays for the honeymoon?",
        answer:
          "Traditionally, the groom or his family. Today most couples pay for their own honeymoon, sometimes with help from a honeymoon fund.",
      },
      {
        question: "Do bridesmaids pay for their own dresses?",
        answer:
          "Yes, traditionally attendants pay for their own wedding attire and accessories, though the couple usually provides the bouquets.",
      },
    ],
    relatedLinks: [
      {
        href: "/journal/what-does-the-mother-of-the-bride-pay-for",
        title: "What Does the Mother of the Bride Pay For?",
        description: "Her traditional role and how mothers contribute today.",
      },
      {
        href: "/journal/who-pays-for-wedding-hair-and-makeup",
        title: "Who Pays for Hair & Makeup?",
        description: "Etiquette for brides, bridesmaids, and mothers.",
      },
      {
        href: "/journal/budget-for-a-100-person-wedding",
        title: "Budget for a 100-Person Wedding",
        description: "National per-guest averages and how to plan yours.",
      },
    ],
  },
};
