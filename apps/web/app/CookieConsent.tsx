'use client';

import { useEffect, useState } from 'react';
import config from '../../../config/site';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (config.analytics.provider !== 'ga4') return;
    const stored = window.localStorage.getItem('cookie-consent');
    if (!stored) setVisible(true);
  }, []);

  const dismiss = (value: 'accepted' | 'dismissed') => {
    window.localStorage.setItem('cookie-consent', value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{position:'sticky', bottom:16, zIndex:20, margin:'16px auto 0', maxWidth:1100, padding:'16px 18px', border:'1px solid var(--border)', borderRadius:16, background:'var(--surface)', boxShadow:'0 10px 30px rgba(0,0,0,0.08)', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, flexWrap:'wrap'}}>
      <div>
        <strong style={{display:'block', marginBottom:4}}>Cookie preferences</strong>
        <span style={{color:'var(--text-muted)', fontSize:14}}>This site uses analytics only when you choose to allow it.</span>
      </div>
      <div style={{display:'flex', gap:10, flexWrap:'wrap'}}>
        <button onClick={() => dismiss('dismissed')} style={{border:'1px solid var(--border)', background:'var(--surface)', color:'var(--text)', borderRadius:999, padding:'10px 14px', cursor:'pointer'}}>Decline</button>
        <button onClick={() => dismiss('accepted')} style={{border:'none', background:'var(--accent)', color:'var(--accent-contrast)', borderRadius:999, padding:'10px 14px', cursor:'pointer'}}>Accept</button>
      </div>
    </div>
  );
}
