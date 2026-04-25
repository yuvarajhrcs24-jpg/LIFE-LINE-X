import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function DarkMode() {
  const { darkMode, toggleDark } = useTheme();
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <div className="flex items-center gap-2">
        <span className="text-xl">{darkMode ? '🌙' : '☀️'}</span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('settings.darkMode')}</span>
      </div>
      <button onClick={toggleDark} className={`w-12 h-6 rounded-full transition-colors ${darkMode ? 'bg-blue-600' : 'bg-gray-300'}`}>
        <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0.5'}`} />
      </button>
    </div>
  );
}
