import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            return (localStorage.getItem('theme') as Theme) || 'system';
        }
        return 'system';
    });

    useEffect(() => {
        const media = window.matchMedia('(prefers-color-scheme: dark)');
        
        function applyTheme(theme: Theme) {
            const root = window.document.documentElement;
            root.classList.remove('light', 'dark');

            if (theme === 'system') {
                const systemTheme = media.matches ? 'dark' : 'light';
                root.classList.add(systemTheme);
            } else {
                root.classList.add(theme);
            }
        }

        applyTheme(theme);
        localStorage.setItem('theme', theme);

        const listener = () => {
            if (theme === 'system') {
                applyTheme('system');
            }
        };

        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, [theme]);

    return {
        theme,
        setTheme,
    };
}