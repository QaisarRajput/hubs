'use client';

import React, { useEffect, useMemo, useState } from 'react';

type SubdomainItem = {
  id: string;
  url: string;
  title?: string;
  description?: string;
  ogImage?: string;
  favicon?: string;
  categories?: string[];
  featured?: boolean;
};

const normalize = (value = '') => value.toLowerCase().trim();

/** Resolve a favicon path against the subdomain's origin. */
function resolveFavicon(favicon: string | undefined, baseUrl: string): string | undefined {
  if (!favicon) return undefined;
  if (favicon.startsWith('http://') || favicon.startsWith('https://')) return favicon;
  // Relative path — resolve against the subdomain's origin
  try {
    const url = new URL(favicon, baseUrl);
    return url.href;
  } catch {
    return favicon;
  }
}

export default function Home() {
  const [items, setItems] = useState<SubdomainItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetch('/data/index.json')
      .then(r => r.json())
      .then(setItems)
      .catch(() => setItems([]));
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach(item => item.categories?.forEach(category => set.add(category)));
    return ['All', ...Array.from(set).sort()];
  }, [items]);

  const filteredItems = useMemo(() => {
    const query = normalize(searchQuery);
    return items.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.categories?.includes(selectedCategory);
      if (!matchesCategory) return false;
      if (!query) return true;

      const haystack = [item.title, item.description, item.id, item.categories?.join(' ')].filter(Boolean).join(' ');
      return normalize(haystack).includes(query);
    });
  }, [items, searchQuery, selectedCategory]);

  const featured = filteredItems.filter(item => item.featured);
  const regular = filteredItems.filter(item => !item.featured);

  return (
    <div>
      <section style={{marginBottom:36}}>
        <div style={{display:'flex', flexDirection:'column', gap:14, maxWidth:840}}>
          <p style={{margin:0, color:'var(--accent)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.16em'}}>Subdomain launcher</p>
          <h1 style={{margin:'0', fontSize:'clamp(2.6rem, 4vw, 4rem)', lineHeight:1.03}}>A lightweight home for every hubs utility.</h1>
          <p style={{margin:0, maxWidth:680, color:'var(--text-muted)', fontSize:18}}>Browse the independent tools hosted across the hubs.dpdns.org network. Each tile is generated from the app's own metadata so the collection feels current and brand-aligned.</p>
          <div style={{display:'flex', flexWrap:'wrap', gap:10, marginTop:12}}>
            <div style={{padding:'12px 16px', borderRadius:999, background:'var(--surface-muted)', color:'var(--text)', fontWeight:600}}>Utilities: {items.length}</div>
            <div style={{padding:'12px 16px', borderRadius:999, background:'var(--surface-muted)', color:'var(--text)', fontWeight:600}}>Categories: {categories.length - 1}</div>
          </div>
        </div>
      </section>

      <section style={{marginBottom:28, display:'grid', gap:16}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr auto', gap:12}}>
          <label style={{display:'flex', flexDirection:'column', gap:8}}>
            <span style={{fontWeight:600, color:'var(--text)'}}>Search utilities</span>
            <input
              value={searchQuery}
              onChange={event => setSearchQuery(event.target.value)}
              placeholder="Search by title, description, domain, or category"
              style={{width:'100%', minWidth:0, border:'1px solid var(--border)', borderRadius:12, padding:'14px 16px', fontSize:16, color:'var(--text)', background:'var(--surface)'}}
            />
          </label>
          <label style={{display:'flex', flexDirection:'column', gap:8}}>
            <span style={{fontWeight:600, color:'var(--text)'}}>Category</span>
            <select
              value={selectedCategory}
              onChange={event => setSelectedCategory(event.target.value)}
              style={{border:'1px solid var(--border)', borderRadius:12, padding:'14px 16px', fontSize:16, color:'var(--text)', background:'var(--surface)'}}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section style={{display:'grid', gap:18}}>
        {featured.length > 0 && (
          <div>
            <h2 style={{margin:'0 0 12px 0'}}>Featured applications</h2>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:16}}>
              {featured.map(item => {
                const faviconSrc = resolveFavicon(item.favicon, item.url);
                return (
                <a key={item.id} href={item.url} style={{display:'block', border:'1px solid var(--accent)', borderRadius:20, overflow:'hidden', textDecoration:'none', color:'inherit', background:'var(--surface)'}}>
                  <div style={{position:'relative', minHeight:160, background:'#eef6ff', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    {item.ogImage ? <img src={item.ogImage} alt={item.title || item.id} style={{maxWidth:'100%', maxHeight:'100%'}}/> : <div style={{opacity:0.6}}>Preview</div>}
                  </div>
                  <div style={{padding:18}}>
                    <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:10}}>
                      {faviconSrc ? <img src={faviconSrc} alt="favicon" width={20} height={20} style={{borderRadius:6}} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} /> : <div style={{width:20, height:20, borderRadius:6, background:'var(--surface-muted)'}} />}
                      <span style={{fontSize:12, color:'var(--accent)', fontWeight:700}}>{item.id}</span>
                    </div>
                    <h3 style={{margin:'0 0 8px 0'}}>{item.title || item.id}</h3>
                    <p style={{margin:0, color:'var(--text-muted)'}}>{item.description || 'No description available.'}</p>
                  </div>
                </a>
                );
              })}
            </div>
          </div>
        )}

        <div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:12, marginBottom:12}}>
            <h2 style={{margin:0}}>Explore all apps</h2>
            <span style={{color:'var(--text-muted)'}}>{filteredItems.length} result{filteredItems.length === 1 ? '' : 's'}</span>
          </div>
          {filteredItems.length === 0 ? (
            <div style={{padding:24, border:'1px dashed var(--border)', borderRadius:16, color:'var(--text-muted)'}}>No matching apps found. Try a different search or category.</div>
          ) : (
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:16}}>
              {regular.map(item => {
                const faviconSrc = resolveFavicon(item.favicon, item.url);
                return (
                <a key={item.id} href={item.url} style={{display:'block', border:'1px solid var(--border)', borderRadius:20, overflow:'hidden', textDecoration:'none', color:'inherit', background:'var(--surface)'}}>
                  <div style={{position:'relative', minHeight:140, background:'#f7f8fb', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    {item.ogImage ? <img src={item.ogImage} alt={item.title || item.id} style={{maxWidth:'100%', maxHeight:'100%'}}/> : <div style={{opacity:0.5}}>Preview</div>}
                  </div>
                  <div style={{padding:16}}>
                    <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:10}}>
                      {faviconSrc ? <img src={faviconSrc} alt="favicon" width={18} height={18} style={{borderRadius:6}} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} /> : <div style={{width:18, height:18, borderRadius:6, background:'var(--surface-muted)'}} />}
                      <span style={{fontSize:12, color:'var(--text-muted)', textTransform:'lowercase'}}>{item.id}</span>
                    </div>
                    <h3 style={{margin:'0 0 10px 0'}}>{item.title || item.id}</h3>
                    <p style={{margin:0, color:'var(--text-muted)'}}>{item.description || 'No description available.'}</p>
                    <div style={{marginTop:14, display:'flex', flexWrap:'wrap', gap:8}}>
                      {item.categories?.map(category => (
                        <span key={category} style={{fontSize:12, color:'var(--accent)', background:'rgba(37,99,235,0.08)', borderRadius:999, padding:'6px 10px'}}>{category}</span>
                      ))}
                    </div>
                  </div>
                </a>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
