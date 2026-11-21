"""
One-off: build the self-hosted web fonts in app/fonts from the full TTF sources.

The source TTFs (Cormorant Garamond regular + italic, Jost) are full variable
fonts — about 2 MB together, with Cyrillic, Greek and Vietnamese glyphs the
site never uses. This keeps the Latin set plus the few symbols the site renders,
keeps the variable weight axis and every OpenType feature (small caps, old-style
figures, ligatures, stylistic sets), and writes WOFF2. Result: about 142 KB.

Output is committed, so this only needs re-running when a source font changes or
the site starts using a character outside the kept set (scan content first).
Both fonts are SIL OFL 1.1 with no Reserved Font Name, so subsets keep their names.

Requires: pip install fonttools brotli
Run:      python scripts/subset-fonts.py
"""

from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

FONT_DIR = Path(__file__).resolve().parent.parent / "app" / "fonts"

# Google Fonts' "latin" range.
LATIN = (
    "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,"
    "U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,"
    "U+FEFF,U+FFFD"
)

# Symbols the site renders (arrows, star, check, bullets, infinity, plus).
# Kept only where the source font actually has the glyph.
SYMBOLS = [0x2190, 0x2192, 0x2197, 0x2605, 0x2713, 0x25E6, 0x221E, 0xFF0B]

FONTS = [
    ("CormorantGaramond-Regular.ttf", "CormorantGaramond-Latin.woff2"),
    ("CormorantGaramond-Italic.ttf", "CormorantGaramond-Italic-Latin.woff2"),
    ("Jost-Regular.ttf", "Jost-Latin.woff2"),
]

for source_name, output_name in FONTS:
    source = FONT_DIR / source_name
    output = FONT_DIR / output_name
    cmap = TTFont(source).getBestCmap()
    unicodes = LATIN + "".join(f",U+{cp:04X}" for cp in SYMBOLS if cp in cmap)
    subset.main(
        [
            str(source),
            f"--unicodes={unicodes}",
            "--layout-features=*",
            "--flavor=woff2",
            "--no-hinting",
            "--desubroutinize",
            f"--output-file={output}",
        ]
    )
    print(f"{source_name}: {source.stat().st_size // 1024} KB -> {output_name}: {output.stat().st_size // 1024} KB")
