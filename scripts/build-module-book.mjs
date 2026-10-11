// scripts/build-module-book.mjs | NickoSystems instruction book builder | rev 2, 11 Oct 2026
// Reads docs/book/modules.json. For every module it joins the hand-written header (diagrams, rules) with the CURRENT code of
// that module's files, so a single file explains one module completely, even to an AI that cannot open the repository.
// Run:  node scripts/build-module-book.mjs        (writes docs/book/module-*.md)
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, statSync } from 'node:fs';
const cfg = JSON.parse(readFileSync('docs/book/modules.json', 'utf8'));
const BASE = `https://github.com/${cfg.repo}/blob/main/`;
const NEVER = new RegExp(cfg.neverInclude || '\\.(png|jpe?g|webp|svg|mp3|mp4|woff2?|ico|pdf|zip|epub)$|package-lock\\.json$|^docs/book/module-');
const all = execSync('git ls-files', { encoding: 'utf8' }).split('\n').filter((f) => f && !NEVER.test(f)).sort();
const lang = (f) => ({ astro: 'astro', ts: 'ts', mjs: 'js', js: 'js', css: 'css', json: 'json', jsonc: 'json', html: 'html', yml: 'yaml', sql: 'sql', md: 'md', py: 'python' }[f.split('.').pop()] || '');
const url = (f) => BASE + f.split('/').map(encodeURIComponent).join('/');
const claimed = new Set();
for (const m of cfg.modules) {
  const inc = (m.include || []).map((r) => new RegExp(r)), exc = (m.exclude || []).map((r) => new RegExp(r));
  let files = all.filter((f) => !exc.some((r) => r.test(f)) && (m.rest ? !claimed.has(f) : inc.some((r) => r.test(f))));
  files.forEach((f) => claimed.add(f));
  const skipped = (m.dataFiles || []).map((f) => `- ${url(f)} (data or vendor file, left out of this book file)`).join('\n');
  if (m.noCode) { writeFileSync(m.out, readFileSync(m.header, 'utf8')); console.log(m.out + ': header only'); continue; }
  let out = readFileSync(m.header, 'utf8').trimEnd() + '\n\n## Part 2. File map (full web addresses)\n\n';
  out += files.map((f) => `- ${url(f)}  (${statSync(f).size} bytes)`).join('\n') + '\n';
  if (skipped) out += '\nLeft out on purpose:\n' + skipped + '\n';
  out += `\n## Part 3. The code\n\nGenerated ${new Date().toISOString().slice(0, 10)} from the current \`main\` branch. Each file starts with "FILE: name".\n\n`;
  for (const f of files) {
    const body = readFileSync(f, 'utf8'), fence = body.includes('```') ? '~~~~' : '```';
    out += `### FILE: ${f}\n${url(f)}\n\n${fence}${lang(f)}\n${body.trimEnd()}\n${fence}\n\n`;
  }
  writeFileSync(m.out, out);
  console.log(m.out + ': ' + files.length + ' files, ' + Math.round(out.length / 1024) + ' KB');
}
