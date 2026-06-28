import './globals.css';
import React from 'react';
import config from '../../../config/site';
import { ThemeScript } from './ThemeScript';
import { CookieConsent } from './CookieConsent';
//import { GoogleAnalytics } from './GoogleAnalytics';

export const metadata = {
  title: config.site.name,
  description: config.site.tagline,
  metadataBase: new URL(config.site.url),
  alternates: { canonical: config.site.url },
  manifest: '/manifest.webmanifest',
  icons: { icon: '/favicon.ico' },
  other: {
    'google-adsense-account': `ca-pub-${config.adsense.publisherId}`,
    ...(config.seo.googleSiteVerification ? { 'google-site-verification': config.seo.googleSiteVerification } : {}),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Inline FOUC prevention — runs before first paint */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('theme'),d=window.matchMedia('(prefers-color-scheme:dark)').matches;document.documentElement.classList.toggle('dark',t?t==='dark':d)}catch(e){}})()`
        }} />
        <ThemeScript />
        {/* <GoogleAnalytics />  */}
      </head>
      <body>
        <header style={{padding:20, borderBottom:'1px solid var(--border)', background:'var(--surface)', position:'sticky', top:0, zIndex:10}}>
          <div style={{maxWidth:1100, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, flexWrap:'wrap'}}>
            <div>
              <a href="/" style={{display:'inline-flex', alignItems:'center', gap:10, textDecoration:'none', color:'inherit'}}>
                <img src="/icon.svg" alt="Hubs icon" width={28} height={28} />
                <div>
                  <h1 style={{margin:0, fontSize:20}}>{config.site.name}</h1>
                  <p style={{margin:0, color:'var(--text-muted)', fontSize:13}}>{config.site.tagline}</p>
                </div>
              </a>
            </div>
            <nav style={{display:'flex', gap:12, flexWrap:'wrap', alignItems:'center'}}>
              <a href="/blog">Blog</a>
              <a href="/faq">FAQ</a>
              <a href="/about">About</a>
              {config.monetization.tipUrl && (
                <a href={config.monetization.tipUrl} target="_blank" rel="noopener noreferrer" style={{border:'1px solid var(--accent)', borderRadius:999, padding:'8px 16px', color:'var(--accent)', fontWeight:600, textDecoration:'none', fontSize:14}}>Support Hubs</a>
              )}
            </nav>
          </div>
        </header>
        <main style={{maxWidth:1100, margin:'32px auto', padding:'0 16px'}}>{children}</main>
        <footer style={{padding:40, textAlign:'center', color:'var(--text-muted)'}}>
          <div style={{display:'flex', justifyContent:'center', gap:12, flexWrap:'wrap', marginBottom:12}}>
            <a href="/about">About</a>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/cookies">Cookies</a>
            {config.monetization.tipUrl && (
              <a href={config.monetization.tipUrl} target="_blank" rel="noopener noreferrer">Support Hubs</a>
            )}
          </div>
          <div>© {new Date().getFullYear()} {config.site.name}</div>
        </footer>
        <CookieConsent />
      </body>
    </html>
  );
}
