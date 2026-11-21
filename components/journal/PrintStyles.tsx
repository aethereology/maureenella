/**
 * Print stylesheet for printable checklists. Rendered only on pages that opt
 * in, so it never affects the rest of the site. Hides the site chrome (header,
 * footer, breadcrumbs, CTA bands, sticky bars) and prints black on white.
 */
const CSS = `
@media print {
  @page { margin: 16mm 14mm; }
  html, body { background: #fff !important; }
  body { background-image: none !important; }
  body > a[href="#main"],
  header.sticky,
  body footer,
  nav[aria-label="Breadcrumb"],
  div:has(> div > nav[aria-label="Breadcrumb"]),
  [data-tone="dark"],
  .print\\:hidden { display: none !important; }
  #main { opacity: 1 !important; transform: none !important; }
  [data-reveal] { opacity: 1 !important; transform: none !important; }
  *, *::before, *::after {
    color: #000 !important;
    background: transparent !important;
    box-shadow: none !important;
    text-shadow: none !important;
  }
  [data-print-box] { border-color: #000 !important; }
  h2, h3 { break-after: avoid; }
  li { break-inside: avoid; }
  a { text-decoration: none !important; }
}
`;

export function PrintStyles() {
  return <style dangerouslySetInnerHTML={{ __html: CSS }} />;
}
