import React, { createContext, useContext, useState } from 'react';
import { lightTheme, darkTheme } from '../constants/theme';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // We'll default to light theme as requested, but allow toggling
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);

  const COLORS = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, COLORS }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
