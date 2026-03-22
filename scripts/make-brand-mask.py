"""Build a luminance mask from brand-m-mark.png (white outline on dark field)."""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "brand-m-mark.png"
OUT = ROOT / "public" / "brand-m-mask.png"


def main() -> None:
    img = Image.open(SRC).convert("RGBA")
    pixels = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            luma = 0.299 * r + 0.587 * g + 0.114 * b
            # White outline → opaque mask; dark background / hollow fill → transparent
            if luma > 135:
                pixels[x, y] = (255, 255, 255, 255)
            else:
                pixels[x, y] = (0, 0, 0, 0)
    img.save(OUT, optimize=True)
    print(f"Wrote {OUT} ({w}x{h})")


if __name__ == "__main__":
    main()
