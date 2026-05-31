import { Reveal } from "@/components/ui/Reveal";

type Step = { title: string; description: string };

/** Wedding-day process. Copy from docs/PAGE_COPY_DRAFTS.md. */
const STEPS: Step[] = [
  { title: "Inquire for your date", description: "Share your wedding date, venue, getting-ready location, service count, and beauty vision." },
  { title: "Secure your wedding date", description: "Once availability is confirmed, your signed agreement and date reservation hold your date." },
  { title: "Plan your preview", description: "Your bridal preview refines your hair and makeup vision before the wedding day." },
  { title: "Confirm your timeline", description: "We use your photographer or planner timeline, service count, and location to plan a smooth schedule." },
  { title: "Enjoy the morning", description: "On the wedding day: calm energy, beautiful artistry, and everyone ready on time." },
];

export function ProcessSteps() {
  return (
    <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
      {STEPS.map((step, i) => (
        <Reveal as="li" key={step.title} delay={i * 80} className="border-t border-hairline pt-5">
          <span className="block font-serif text-5xl leading-none text-rose/70">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-5 font-serif text-xl text-espresso">{step.title}</h3>
          <p className="mt-2.5 text-sm leading-relaxed text-cocoa/75">{step.description}</p>
        </Reveal>
      ))}
    </ol>
  );
}
