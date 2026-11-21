import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Page masthead: an optional quiet italic label, an oversized serif title, and
 * an intro set as a short lede. A faint champagne light falls from the top
 * corner — the "first light" motif in its stillest form (D016).
 */
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
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-56 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(216,191,156,0.42),rgba(216,191,156,0)_68%)]"
      />
      <Container className="relative py-20 sm:py-28 lg:py-32">
        <Reveal>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="mt-4 max-w-4xl text-[clamp(2.9rem,5.5vw,5.5rem)] leading-[0.96] tracking-[-0.035em]">
            {title}
          </h1>
          {intro && (
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-cocoa/85">
              {intro}
            </p>
          )}
        </Reveal>
      </Container>
    </div>
  );
}
