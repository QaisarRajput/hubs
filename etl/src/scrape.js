const fs = require('fs');
const path = require('path');
const { parse } = require('node-html-parser');
const https = require('https');
const { z } = require('zod');

const subdomainSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  title: z.string().optional(),
  description: z.string().optional(),
  favicon: z.string().optional(),
  ogImage: z.string().optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  categories: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
  lastSyncedAt: z.string().optional(),
});

const registryPath = path.join(__dirname, 'registry.json');
const outDir = path.join(__dirname, '..', '..', 'data', 'subdomains');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function httpGetRaw(url, timeout = 10000) {
  return new Promise((resolve, reject) => {
    try {
      const req = https.get(url, { timeout }, res => {
        // follow simple redirects
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const loc = res.headers.location.startsWith('http') ? res.headers.location : new URL(res.headers.location, url).toString();
          resolve(httpGetRaw(loc, timeout));
          return;
        }
        let data = '';
        res.setEncoding('utf8');
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve({ text: () => Promise.resolve(data) }));
      });
      req.on('error', reject);
      req.on('timeout', () => { req.destroy(); reject(new Error('timeout')) });
    } catch (e) {
      reject(e);
    }
  });
}

async function fetchMeta(url) {
  try {
    const full = 'https://' + url;
    const res = (typeof globalThis.fetch === 'function') ? await globalThis.fetch(full, { timeout: 10000 }) : await httpGetRaw(full, 10000);
    const html = typeof res.text === 'function' ? await res.text() : '';
    const root = parse(html || '');
    const meta = {};
    const titleEl = root.querySelector('title');
    meta.title = titleEl ? titleEl.text.trim() : '';
    const metas = root.querySelectorAll('meta');
    metas.forEach(m => {
      const name = m.getAttribute('name') || m.getAttribute('property');
      const content = m.getAttribute('content') || m.getAttribute('value');
      if (!name || !content) return;
      meta[name.toLowerCase()] = content;
    });
    const linkIcons = root.querySelectorAll('link[rel]');
    for (const l of linkIcons) {
      const rel = l.getAttribute('rel');
      if (rel && rel.includes('icon')) {
        meta.favicon = l.getAttribute('href');
        break;
      }
    }
    // prefer og:* values
    return {
      url: full,
      id: url,
      title: meta['og:title'] || meta.title || '',
      description: meta['og:description'] || meta['description'] || '',
      ogImage: meta['og:image'] || '',
      favicon: meta.favicon || '',
      ogTitle: meta['og:title'] || '',
      ogDescription: meta['og:description'] || '',
      lastSyncedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error('Failed fetch', url, err && err.message);
    return null;
  }
}

async function main() {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const index = [];
  for (const entry of registry) {
    const id = entry.id;
    console.log('Scraping', id);
    const meta = await fetchMeta(id);
    if (!meta) {
      console.warn('No meta for', id);
      continue;
    }
    const outPath = path.join(outDir, id.replace(/[:/]/g, '_') + '.json');
    const merged = Object.assign({}, entry, meta);
    // Validate against shared schema
    const result = subdomainSchema.safeParse(merged);
    if (!result.success) {
      console.warn('Validation failed for', id, result.error.issues.map(i => i.path.join('.') + ': ' + i.message).join('; '));
      continue;
    }
    const validated = result.data;
    fs.writeFileSync(outPath, JSON.stringify(validated, null, 2));
    index.push(validated);
  }
  const indexPath = path.join(__dirname, '..', '..', 'data', 'index.json');
  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
  console.log('Done. Wrote', index.length, 'items');
}

main();
