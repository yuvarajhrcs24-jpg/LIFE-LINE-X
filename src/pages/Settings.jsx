import { useTranslation } from 'react-i18next';
import DarkMode from '../components/Settings/DarkMode';
import LanguageSelector from '../components/Settings/LanguageSelector';
import AccessibilityMode from '../components/Settings/AccessibilityMode';
import BatteryMode from '../components/Settings/BatteryMode';
import NotificationCenter from '../components/Notifications/NotificationCenter';
import GeoFenceAlertConfig from '../components/Notifications/GeoFenceAlert';
import BluetoothMessaging from '../components/Comms/BluetoothMessaging';
import MeshComms from '../components/Comms/MeshComms';
import SMSFallback from '../components/Comms/SMSFallback';
import OfflineQueue from '../components/Offline/OfflineQueue';
import { isConfigured, firebaseConfig } from '../services/firebase';

export default function Settings() {
  const { t } = useTranslation();
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">{t('settings.title')}</h2>
      <div className="card space-y-4">
        <h3 className="font-semibold text-gray-700 dark:text-gray-300">Appearance</h3>
        <DarkMode />
        <LanguageSelector />
        <AccessibilityMode />
        <BatteryMode />
      </div>
      <NotificationCenter />
      <GeoFenceAlertConfig />
      <div className="card">
        <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">📡 Offline Storage</h3>
        <OfflineQueue />
      </div>
      <div className="card space-y-4">
        <h3 className="font-semibold text-gray-700 dark:text-gray-300">🔥 Firebase Configuration</h3>
        <div className={`p-3 rounded-lg border ${isConfigured() ? 'bg-green-50 dark:bg-green-950 border-green-300' : 'bg-yellow-50 dark:bg-yellow-950 border-yellow-300'}`}>
          <p className={`text-sm font-medium ${isConfigured() ? 'text-green-700 dark:text-green-300' : 'text-yellow-700 dark:text-yellow-300'}`}>
            {isConfigured() ? '✅ Firebase configured and connected' : '⚠️ Using simulation mode (no Firebase)'}
          </p>
          <p className="text-xs text-gray-500 mt-1">Add VITE_FIREBASE_* environment variables to enable real-time sync.</p>
        </div>
      </div>
      <BluetoothMessaging />
      <MeshComms />
      <SMSFallback />
    </div>
  );
}
