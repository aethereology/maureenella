import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

/**
 * Visible breadcrumb trail + matching BreadcrumbList JSON-LD. `items` should
 * include the current page last. Always begins from Home.
 */
export function Breadcrumbs({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const trail = [{ name: "Home", path: "/" }, ...items];
  return (
    <div className="border-b border-hairline bg-porcelain">
      <Container className="py-3.5">
        <BreadcrumbSchema items={trail} />
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-[0.65rem] uppercase tracking-[0.15em] text-cocoa/60">
            {trail.map((item, i) => {
              const last = i === trail.length - 1;
              return (
                <li key={item.path} className="flex items-center gap-1">
                  {last ? (
                    <span aria-current="page" className="text-cocoa">
                      {item.name}
                    </span>
                  ) : (
                    <>
                      <Link href={item.path} className="hover:text-espresso">
                        {item.name}
                      </Link>
                      <span aria-hidden className="text-taupe">
                        /
                      </span>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </Container>
    </div>
  );
}
