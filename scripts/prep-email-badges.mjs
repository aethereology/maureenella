/**
 * One-off: build email-safe copies of the recognition badges.
 *
 * Output is committed, so this only needs re-running when a badge changes.
 * Uses sharp, already present as a Next transitive dependency.
 *
 * Run: node scripts/prep-email-badges.mjs
 */
import sharp from "sharp";
import { mkdir, stat } from "node:fs/promises";

const SOURCE_DIR = "public/images/badges";
const OUT_DIR = "public/images/email";
const SIZE = 220; // 2x a ~110px display width
const IVORY = { r: 0xf6, g: 0xef, b: 0xe4, alpha: 1 }; // --color-ivory

await mkdir(OUT_DIR, { recursive: true });

for (let i = 1; i <= 5; i += 1) {
  const from = `${SOURCE_DIR}/maureenbadge${i}.png`;
  const to = `${OUT_DIR}/badge-${i}.png`;

  await sharp(from)
    .resize({
      width: SIZE,
      height: SIZE,
      fit: "contain",
      background: { ...IVORY, alpha: 0 },
    })
    .flatten({ background: IVORY })
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toFile(to);

  const { size } = await stat(to);
  console.log(`${to}  ${(size / 1024).toFixed(1)}KB`);
}
