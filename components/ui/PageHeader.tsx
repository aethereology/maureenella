import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/** Editorial page masthead: eyebrow on a hairline, oversized serif title. */
export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="relative overflow-hidden border-b border-hairline bg-ivory">
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-32 font-serif text-[28rem] italic leading-none text-rose/5">M</div>
      <Container className="relative py-20 sm:py-28 lg:py-32">
        <Reveal>
          {eyebrow && (
            <div className="flex items-center gap-4 border-t border-hairline pt-4">
              <span className="index-mark">◦</span>
              <span className="eyebrow">{eyebrow}</span>
            </div>
          )}
          <h1 className="mt-8 max-w-4xl text-[clamp(3rem,5.5vw,5.75rem)] leading-[0.94] tracking-[-0.04em]">
            {title}<span className="text-rose">.</span>
          </h1>
          {intro && (
            <p className="mt-8 max-w-2xl border-l border-rose/50 pl-5 text-lg leading-relaxed text-cocoa/75">
              {intro}
            </p>
          )}
        </Reveal>
      </Container>
    </div>
  );
}
