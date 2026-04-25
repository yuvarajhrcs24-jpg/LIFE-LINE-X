import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [highContrast, setHighContrast] = useState(() => localStorage.getItem('highContrast') === 'true');
  const [batteryMode, setBatteryMode] = useState(() => localStorage.getItem('batteryMode') === 'true');
  const [largeIcons, setLargeIcons] = useState(() => localStorage.getItem('largeIcons') === 'true');

  useEffect(() => {
    const root = document.documentElement;
    darkMode ? root.classList.add('dark') : root.classList.remove('dark');
    highContrast ? root.classList.add('high-contrast') : root.classList.remove('high-contrast');
    batteryMode ? root.classList.add('low-power') : root.classList.remove('low-power');
    largeIcons ? root.classList.add('large-icons') : root.classList.remove('large-icons');
    localStorage.setItem('darkMode', darkMode);
    localStorage.setItem('highContrast', highContrast);
    localStorage.setItem('batteryMode', batteryMode);
    localStorage.setItem('largeIcons', largeIcons);
  }, [darkMode, highContrast, batteryMode, largeIcons]);

  const toggle = (setter) => setter(prev => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, highContrast, batteryMode, largeIcons, toggleDark: () => toggle(setDarkMode), toggleContrast: () => toggle(setHighContrast), toggleBattery: () => toggle(setBatteryMode), toggleLargeIcons: () => toggle(setLargeIcons) }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
