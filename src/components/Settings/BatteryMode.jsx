import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function BatteryMode() {
  const { batteryMode, toggleBattery } = useTheme();
  const { t } = useTranslation();
  return (
    <div className={`p-3 rounded-lg transition-colors ${batteryMode ? 'bg-yellow-50 dark:bg-yellow-950 border border-yellow-300' : 'bg-gray-50 dark:bg-gray-700'}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">🔋</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('settings.battery')}</span>
        </div>
        <button onClick={toggleBattery} className={`w-12 h-6 rounded-full transition-colors ${batteryMode ? 'bg-yellow-500' : 'bg-gray-300'}`}>
          <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${batteryMode ? 'translate-x-6' : 'translate-x-0.5'}`} />
        </button>
      </div>
      {batteryMode && <p className="text-xs text-yellow-700 dark:text-yellow-300">⚡ Animations disabled, reduced updates, dimmed interface active</p>}
    </div>
  );
}
