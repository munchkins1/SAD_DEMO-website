const lum = (s) => { const c = [0, 2, 4].map(i => { const v = parseInt(s.slice(i, i + 2), 16) / 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
// [name, fg, bg, minRatio?] — min defaults to 4.5 (AA text); use 3 for decorative icons/graphics
// Backgrounds marked "effective" are the glass colours composited over the deep atmospheric
// gradient (body: #111e38 -> #060913) so the checks reflect what the eye actually sees.
const pairs = [
  // Page canvas: deep midnight-navy atmospheric gradient
  ['body text on darkest gradient stop', 'f8fafc', '060913'],
  ['body text on lightest gradient stop', 'f8fafc', '111e38'],
  ['light slate muted on gradient', 'cbd5e1', '111e38'],
  ['welcome gold uppercase on gradient', 'c2820a', '060913'],
  // Dark glass cards (effective rgba(15,23,42,.8) over the gradient)
  ['card heading white on glass', 'ffffff', '10192c'],
  ['card slate-700 light on glass', 'f1f5f9', '10192c'],
  ['card slate-600 light on glass', 'e2e8f0', '10192c'],
  ['card slate-500/400 light on glass', 'cbd5e1', '10192c'],
  ['card teal accent (text-teal-500) on glass', '93c5fd', '10192c'],
  ['card teal-600/700 light on glass', 'bfdbfe', '10192c'],
  ['card amber-500/600 light on glass', 'fcd34d', '10192c'],
  ['card amber-700 light on glass', 'fde68a', '10192c'],
  ['card amber-800/900 light on glass', 'fef3c7', '10192c'],
  ['card emerald light on glass', '6ee7b7', '10192c'],
  ['card rose light on glass', 'fda4af', '10192c'],
  // Controls (dark glass inputs)
  ['input text white on input glass', 'ffffff', '0f182b'],
  ['input placeholder on input glass', '94a3b8', '0f182b'],
  // Buttons: flat SOLID fills, white text
  ['btn royal/teal solid + white', 'ffffff', '3330cc'],
  ['btn gold solid + white', 'ffffff', '92600a'],
  ['btn emerald solid + white', 'ffffff', '047857'],
  ['btn rose solid + white', 'ffffff', 'be123c'],
  ['btn slate secondary + light text', 'f8fafc', '1e3a8a'],
  // Status badges -> dark tinted chips with light text
  ['badge amber chip', 'fde68a', '38352b'],
  ['badge amber-900 chip', 'fef3c7', '38352b'],
  ['badge emerald chip', '6ee7b7', '10363b'],
  ['badge rose chip', 'fda4af', '3e2136'],
  ['badge teal chip', 'bfdbfe', '202857'],
  ['badge blue chip', 'bfdbfe', '1a3058'],
  // Top navigation bar (square dark glass) + nav pills
  ['header brand white on bar', 'ffffff', '0f182c'],
  ['header amber subtitle light on bar', 'fde68a', '0f182c'],
  ['header teal badge light on bar', 'bfdbfe', '0f182c'],
  ['header nav inactive text', 'e2e8f0', '1b2437'],
  ['header nav active white on royal pill', 'ffffff', '3330cc'],
  ['header nav active white on gold pill', 'ffffff', '92600a'],
  // Decorative gradient icon chips (icons only, 3:1)
  ['chip blue icon (white) light stop', 'ffffff', '7c84fb', 3],
  ['chip gold icon dark on gold-300', '57330e', 'fcd34d', 3],
  ['chip gold icon dark on gold-600', '57330e', 'd9970f', 3]
];
let fail = 0;
for (const [n, f, b, min] of pairs) { const r = ratio(f, b); const need = min || 4.5; const ok = r >= need; if (!ok) fail++; console.log((ok ? 'PASS' : 'FAIL') + ' ' + n + ' ' + r.toFixed(2) + ' (min ' + need + ')'); }
process.exit(fail ? 1 : 0);

