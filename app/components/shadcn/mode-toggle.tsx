import * as React from 'react';
import {Moon, Sun} from 'lucide-react';
import {Button} from '~/components/shadcn/button';

function getSystemTheme() {
  if (typeof window === 'undefined') return 'light' as const;
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? ('dark' as const)
    : ('light' as const);
}

function applyTheme(theme: 'light' | 'dark') {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
}

export function ModeToggle() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = window.localStorage.getItem('theme') as 'light' | 'dark' | null;
    return stored ?? getSystemTheme();
  });

  React.useEffect(() => {
    applyTheme(theme);
    try {
      window.localStorage.setItem('theme', theme);
    } catch (e) {
      // Persisting theme is optional; warn and continue.
      console.warn(e);
    }
  }, [theme]);

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
