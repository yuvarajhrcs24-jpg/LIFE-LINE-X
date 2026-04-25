import { createContext, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const { i18n } = useTranslation();
  const [language, setLanguageState] = useState(i18n.language || 'en');

  const setLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  return <LanguageContext.Provider value={{ language, setLanguage, languages: [{ code: 'en', name: 'English', flag: '🇺🇸' }, { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' }] }}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
