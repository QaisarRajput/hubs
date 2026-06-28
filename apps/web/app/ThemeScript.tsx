'use client';

import { useEffect } from 'react';

export function ThemeScript() {
  useEffect(() => {
    const stored = window.localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = stored ? stored === 'dark' : prefersDark;
    document.documentElement.classList.toggle('dark', dark);
  }, []);

  return null;
}
