# Bakes the Arcus duotone into the bookend photo (DEPTH-MOTION-DELTA §C): a gradient map on luminance, navy-deep at 0
# -> navy at .30 -> periwinkle at .68 -> periwinkle-soft at 1, after autocontrast(cutoff=1). The page ships the baked
# file; no CSS filter, blend mode or runtime grade. Writes <out>-{800,1200,1600}.{avif,webp} (AVIF q58, WebP q76).
# Run once when the source photo changes:
#   python3 -I scripts/grade-photos.py public/img/concert-1600.webp public/img/concert-duo
import sys
from PIL import Image, ImageOps
src, out = sys.argv[1], sys.argv[2]
STOPS = [(0.00, (0x0E, 0x12, 0x24)), (0.30, (0x1B, 0x20, 0x36)), (0.68, (0x5B, 0x67, 0xA6)), (1.00, (0xDC, 0xE0, 0xF2))]
def lut():
    r, g, b = [], [], []
    for i in range(256):
        t = i / 255
        for (t0, c0), (t1, c1) in zip(STOPS, STOPS[1:]):
            if t <= t1:
                k = (t - t0) / (t1 - t0)
                c = [round(c0[j] + (c1[j] - c0[j]) * k) for j in range(3)]
                break
        r.append(c[0]); g.append(c[1]); b.append(c[2])
    return r + g + b
im = ImageOps.autocontrast(Image.open(src).convert('L'), cutoff=1)
duo = im.convert('RGB').point(lut())
for w in (1600, 1200, 800):
    o = duo if w == duo.width else duo.resize((w, round(duo.height * w / duo.width)), Image.LANCZOS)
    o.save(f'{out}-{w}.webp', quality=76, method=6)
    o.save(f'{out}-{w}.avif', quality=58)
    print(f'{out}-{w}', o.size)
