"""Tag every inline grid in the page components with a layout class, so
breakpoints in global.css can target grids by role instead of by style text."""
import re, sys

def classify(cols):
    m = re.match(r'repeat\((\d)', cols)
    if m: return f'g-cards g-c{m.group(1)}'
    if cols.startswith('1fr 44px'): return 'g-flow'
    if cols.startswith('76px'): return 'g-keep'
    px = [int(n) for n in re.findall(r'(\d+)px', cols)]
    if px and max(px) >= 290: return 'g-split'
    return 'g-label'          # small label column + content (120px ...)

for path in sys.argv[1:]:
    s = open(path).read()
    out, pos, n = [], 0, 0
    for m in re.finditer(r'gridTemplateColumns: "([^"]+)"', s):
        start = s.rfind('<', 0, m.start())
        tag_head = s[start:m.start()]
        if 'g-split' in tag_head or 'g-cards' in tag_head or 'g-label' in tag_head or 'g-flow' in tag_head or 'g-keep' in tag_head:
            continue
        cls = classify(m.group(1))
        out.append(s[pos:start])
        cm = re.search(r'className="([^"]*)"', tag_head)
        if cm:
            tag_head = tag_head.replace(cm.group(0), f'className="{cm.group(1)} {cls}"', 1)
        else:
            tag_head = re.sub(r'^<(\w+)', lambda t: f'<{t.group(1)} className="{cls}"', tag_head, 1)
        out.append(tag_head)
        pos = m.start(); n += 1
    out.append(s[pos:])
    open(path, 'w').write(''.join(out))
    print(path, n)
