import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';

export default function LanguageSelector() {
  const { language, setLanguage, languages } = useLanguage();
  const { t } = useTranslation();
  return (
    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">🌐 {t('settings.language')}</p>
      <div className="flex gap-2">
        {languages.map(lang => (
          <button key={lang.code} onClick={() => setLanguage(lang.code)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${language === lang.code ? 'bg-red-600 text-white' : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-500'}`}>
            <span>{lang.flag}</span><span>{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
