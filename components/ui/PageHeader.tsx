import { Container } from "@/components/ui/Container";

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
    <div className="border-b border-hairline bg-ivory">
      <Container className="py-16 sm:py-24">
        {eyebrow && (
          <div className="flex items-center gap-4 border-t border-hairline pt-4">
            <span className="index-mark">◦</span>
            <span className="eyebrow">{eyebrow}</span>
          </div>
        )}
        <h1 className="mt-6 max-w-4xl text-5xl leading-[1.02] sm:text-6xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cocoa/80">
            {intro}
          </p>
        )}
      </Container>
    </div>
  );
}
