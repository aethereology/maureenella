import type { Block } from "@/content/journal";
import { clsx } from "@/lib/clsx";

/**
 * Renders an article's authored blocks with an editorial reading rhythm.
 * Copy is rendered verbatim; only presentation changes:
 * - a trailing "Sources" heading + list is set apart as smaller citation text;
 * - list items shaped "Label: detail" get a quieter emphasis on the label.
 */
export function ArticleBody({ blocks }: { blocks: Block[] }) {
  const sourcesAt = blocks.findIndex(
    (b) => b.type === "h2" && b.text.trim().toLowerCase() === "sources",
  );
  const main = sourcesAt >= 0 ? blocks.slice(0, sourcesAt) : blocks;
  const sources = sourcesAt >= 0 ? blocks.slice(sourcesAt + 1) : [];
  const sourcesHeading = sourcesAt >= 0 ? (blocks[sourcesAt] as { text: string }).text : "";

  return (
    <>
      <div className="text-[1.0625rem] leading-[1.8] text-cocoa sm:text-[1.125rem]">
        {main.map((block, i) => {
          const prev = main[i - 1];
          const spacing = i === 0 ? "" : prev?.type === "h2" ? "mt-4" : "mt-6";

          if (block.type === "h2") {
            return (
              <h2
                key={i}
                className={clsx(
                  "text-[clamp(1.75rem,3.2vw,2.3rem)] leading-[1.08] tracking-[-0.02em] text-espresso",
                  i === 0 ? "" : "mt-14",
                )}
              >
                {block.text}
              </h2>
            );
          }
          if (block.type === "ul") {
            return (
              <ul key={i} className={clsx("space-y-3", spacing)}>
                {block.items.map((item) => (
                  <li key={item} className="relative pl-7">
                    <span
                      aria-hidden
                      className="absolute left-0 top-[0.9em] h-px w-3.5 bg-rose-deep"
                    />
                    <ListItemText text={item} />
                  </li>
                ))}
              </ul>
            );
          }
          const lead = i === 0 && /^[A-Za-z]/.test(block.text);
          return (
            <p key={i} className={clsx(spacing, lead && "dropcap")}>
              {block.text}
            </p>
          );
        })}
      </div>

      {sources.length > 0 && (
        <section
          aria-labelledby="article-sources-heading"
          className="mt-14 border-t border-hairline pt-6"
        >
          <h2
            id="article-sources-heading"
            className="font-serif text-xl italic text-taupe-ink"
          >
            {sourcesHeading}
          </h2>
          {sources.map((block, i) => {
            if (block.type === "ul") {
              return (
                <ul key={i} className="mt-3 space-y-2 text-[0.9rem] leading-relaxed text-cocoa/85">
                  {block.items.map((item) => (
                    <li key={item} className="relative pl-5">
                      <span aria-hidden className="absolute left-0 top-[0.75em] h-px w-2.5 bg-taupe" />
                      {item}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="mt-3 text-[0.9rem] leading-relaxed text-cocoa/85">
                {block.text}
              </p>
            );
          })}
        </section>
      )}
    </>
  );
}

const LABELLED = /^([^:.!?]{2,48}):\s+(.+)$/;

function ListItemText({ text }: { text: string }) {
  const match = LABELLED.exec(text);
  if (!match) return <>{text}</>;
  return (
    <>
      <span className="font-normal text-espresso">{match[1]}:</span> {match[2]}
    </>
  );
}
