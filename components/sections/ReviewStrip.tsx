import { testimonials } from "@/lib/content";
import { permissions } from "@/lib/permissions";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/** Editorial pull-quote row of short reviews, divided by hairlines. */
export function ReviewStrip() {
  if (!permissions.testimonialsPublished) return null;
  const items = testimonials.slice(0, 3);
  if (items.length === 0) return null;

  return (
    <section className="border-y border-hairline bg-ivory py-14 sm:py-16">
      <Container>
        <ul className="grid gap-px sm:grid-cols-3">
          {items.map((t, i) => (
            <Reveal
              as="li"
              key={t.id}
              delay={i * 100}
              className="px-0 sm:px-8 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-hairline"
            >
              <p className="pullquote text-xl leading-snug text-espresso sm:text-2xl">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="mt-4 text-[0.7rem] uppercase tracking-[0.2em] text-taupe-deep">
                {t.displayName}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
