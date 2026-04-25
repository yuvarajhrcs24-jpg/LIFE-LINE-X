import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function AccessibilityMode() {
  const { highContrast, toggleContrast, largeIcons, toggleLargeIcons } = useTheme();
  const { t } = useTranslation();

  const Toggle = ({ label, value, toggle, icon }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <div className="flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
      </div>
      <button onClick={toggle} className={`w-12 h-6 rounded-full transition-colors ${value ? 'bg-blue-600' : 'bg-gray-300'}`}>
        <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${value ? 'translate-x-6' : 'translate-x-0.5'}`} />
      </button>
    </div>
  );

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{t('settings.accessibility')}</p>
      <Toggle label="High Contrast" value={highContrast} toggle={toggleContrast} icon="🔆" />
      <Toggle label="Large Icons" value={largeIcons} toggle={toggleLargeIcons} icon="🔍" />
    </div>
  );
}
