import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

type Theme = 'sorcery' | 'conspix';
type Mode = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  mode: Mode;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'conspix',
  mode: 'light',
  toggleMode: () => {}
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [theme, setTheme] = useState<Theme>('conspix');
  const [mode, setMode] = useState<Mode>('light');

  useEffect(() => {
    // Set theme based on domain
    const host = window.location.hostname;
    if (host.includes('sorcery.exposed')) {
      setTheme('sorcery');
    } else if (host.includes('conspix.tv')) {
      setTheme('conspix');
    }

    // Check system preference for dark mode
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setMode('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleMode = () => {
    setMode(prev => {
      const newMode = prev === 'light' ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark');
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleMode }}>
      <div className={`${theme} ${mode}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};