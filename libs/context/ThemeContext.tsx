import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
  colors: ThemeColors;
}

interface ThemeColors {
  // Backgrounds
  bgPrimary: string;
  bgSecondary: string;
  bgGlass: string;
  
  // Text
  textPrimary: string;
  textSecondary: string;
  textAccent: string;
  
  // Accents
  accentPrimary: string;
  accentSecondary: string;
  accentGlow: string;
  
  // Borders
  borderColor: string;
  borderGlass: string;
  
  // Shadows
  shadowGlass: string;
  shadowCard: string;
}

const lightTheme: ThemeColors = {
  // Backgrounds - Bright, airy, soft greys
  bgPrimary: '#FFFFFF',
  bgSecondary: '#F5F7FA',
  bgGlass: 'rgba(255, 255, 255, 0.7)',
  
  // Text
  textPrimary: '#1E293B',
  textSecondary: '#64748B',
  textAccent: '#6366F1',
  
  // Accents - Vibrant colors
  accentPrimary: '#6366F1', // Indigo
  accentSecondary: '#8B5CF6', // Purple
  accentGlow: 'rgba(99, 102, 241, 0.15)',
  
  // Borders
  borderColor: '#E8ECF1',
  borderGlass: 'rgba(99, 102, 241, 0.2)',
  
  // Shadows
  shadowGlass: '0 8px 32px 0 rgba(99, 102, 241, 0.1)',
  shadowCard: '0 4px 16px 0 rgba(0, 0, 0, 0.08)',
};

const darkTheme: ThemeColors = {
  // Backgrounds - Deep midnight blues/greys
  bgPrimary: '#0F172A',
  bgSecondary: '#1E293B',
  bgGlass: 'rgba(30, 41, 59, 0.7)',
  
  // Text
  textPrimary: '#F1F5F9',
  textSecondary: '#94A3B8',
  textAccent: '#A78BFA',
  
  // Accents - Neon glass accents
  accentPrimary: '#8B5CF6', // Purple
  accentSecondary: '#A78BFA', // Light purple
  accentGlow: 'rgba(139, 92, 246, 0.25)',
  
  // Borders
  borderColor: '#334155',
  borderGlass: 'rgba(139, 92, 246, 0.3)',
  
  // Shadows
  shadowGlass: '0 8px 32px 0 rgba(139, 92, 246, 0.15)',
  shadowCard: '0 4px 16px 0 rgba(0, 0, 0, 0.3)',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('dark');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('admin-theme') as ThemeMode;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setMode(savedTheme);
    }
  }, []);

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem('admin-theme', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const colors = mode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
