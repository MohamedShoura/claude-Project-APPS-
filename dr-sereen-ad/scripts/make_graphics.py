"""Build the end-card graphics from the clinic reference photo.

Usage: python3 make_graphics.py <clinic_facade.jpg> <fonts_dir> <out_dir>

Outputs (1080x1920 RGBA PNGs):
  logo_white.png      - AM diamond logo lifted from the real sign, recoloured white
  sign_white.png      - full clinic sign (Arabic + English + logo), white
  endcard_titles.png  - logo + "د. سيرين" + tagline, upper safe area
  endcard_sign.png    - clinic sign plate, lower third
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont
from PIL import features

RAQM = features.check("raqm")
if not RAQM:
    import arabic_reshaper
    from bidi.algorithm import get_display

W, H = 1080, 1920
# Crop boxes measured on the 941x1672 clinic reference
SIGN_BOX = (70, 185, 930, 316)
LOGO_BOX = (78, 222, 208, 328)
# fence/railing above the left half of the sign, in reference coords
FENCE_BOX = (60, 160, 350, 206)
ROOF_BOX = (350, 160, 600, 199)


def ar(text):
    # libraqm shapes Arabic natively; otherwise reshape + reorder by hand
    return text if RAQM else get_display(arabic_reshaper.reshape(text))


def lift_dark(img, box, scale, erase=None):
    """Turn the dark navy lettering inside box into a white-on-alpha layer."""
    img = img.copy()
    for e in erase or []:
        ImageDraw.Draw(img).rectangle(e, fill=(235, 228, 210))
    crop = img.crop(box)
    crop = crop.resize((int(crop.width * scale), int(crop.height * scale)), Image.LANCZOS)
    g = np.asarray(crop.convert("L")).astype(np.float32)
    # cream wall ~ 200+, navy letters ~ 40; ramp between them
    alpha = np.clip((125.0 - g) / 60.0, 0, 1)
    rgba = np.zeros((g.shape[0], g.shape[1], 4), np.uint8)
    rgba[..., :3] = 255
    # morphological opening drops thin edge lines (roof tiles, plate edges) but keeps the bold lettering
    a = Image.fromarray((alpha * 255).astype(np.uint8), "L")
    a = a.filter(ImageFilter.MinFilter(5)).filter(ImageFilter.MaxFilter(5))
    rgba[..., 3] = np.asarray(a)
    out = Image.fromarray(rgba, "RGBA")
    return out.filter(ImageFilter.GaussianBlur(0.6))


def centered(draw, y, text, font, fill, shadow=True):
    kw = {"direction": "rtl"} if RAQM else {}
    w = draw.textlength(text, font=font, **kw)
    x = (W - w) / 2
    if shadow:
        draw.text((x + 2, y + 3), text, font=font, fill=(0, 0, 0, 140), **kw)
    draw.text((x, y), text, font=font, fill=fill, **kw)


def main(src, fonts, out):
    out = Path(out)
    out.mkdir(parents=True, exist_ok=True)
    img = Image.open(src).convert("RGB")
    sx = img.width / 941.0
    scale_box = lambda b: tuple(int(v * sx) for v in b)

    logo = lift_dark(img, scale_box(LOGO_BOX), 1.6 / sx)
    logo.save(out / "logo_white.png")
    sign = lift_dark(img, scale_box(SIGN_BOX), 1.15 / sx, erase=[scale_box(FENCE_BOX), scale_box(ROOF_BOX)])
    sign.save(out / "sign_white.png")

    card = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    # soft dark gradient at the top for legibility (titles sit in the upper safe area)
    grad = np.zeros((H, W, 4), np.uint8)
    ramp = np.clip(1 - np.arange(H) / 900.0, 0, 1) ** 1.6
    grad[..., 3] = (ramp[:, None] * 150).astype(np.uint8)
    card = Image.alpha_composite(card, Image.fromarray(grad, "RGBA"))

    d = ImageDraw.Draw(card)
    gold = (232, 200, 140, 255)
    name_font = ImageFont.truetype(str(Path(fonts) / "Tajawal-Bold.ttf"), 120)
    tag_font = ImageFont.truetype(str(Path(fonts) / "Tajawal-Medium.ttf"), 58)

    y = 250
    lw = 230
    lg = logo.resize((lw, int(logo.height * lw / logo.width)), Image.LANCZOS)
    card.alpha_composite(lg, ((W - lg.width) // 2, y))
    y += lg.height + 40
    centered(d, y, ar("د. سيرين"), name_font, (255, 255, 255, 255))
    y += 150
    centered(d, y, ar("حضور استثنائي"), tag_font, gold)
    card.save(out / "endcard_titles.png")

    # sign-only lower plate used under the logo in the final frames
    plate = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sw = 860
    sg = sign.resize((sw, int(sign.height * sw / sign.width)), Image.LANCZOS)
    plate.alpha_composite(sg, ((W - sw) // 2, 1450))
    plate.save(out / "endcard_sign.png")


if __name__ == "__main__":
    main(*sys.argv[1:4])
