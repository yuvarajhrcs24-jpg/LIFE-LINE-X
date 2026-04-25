import { useState, useEffect } from 'react';
import { requestNotificationPermission } from '../../services/notificationService';

export default function NotificationCenter() {
  const [permission, setPermission] = useState(Notification?.permission || 'default');
  const [enabled, setEnabled] = useState(false);

  const enable = async () => {
    const granted = await requestNotificationPermission();
    setPermission(granted ? 'granted' : 'denied');
    setEnabled(granted);
    if (granted) {
      new Notification('🔔 LIFE-LINE-X Notifications Enabled', { body: 'You will receive emergency alerts and SOS notifications.' });
    }
  };

  return (
    <div className="card">
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">🔔 Notification Settings</h3>
      {permission === 'granted' ? (
        <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
          <span>✅</span> <span className="text-sm">Push notifications enabled</span>
        </div>
      ) : permission === 'denied' ? (
        <div className="text-red-600 text-sm">❌ Notifications blocked. Please enable in browser settings.</div>
      ) : (
        <div className="space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">Enable push notifications for SOS alerts and emergency updates.</p>
          <button onClick={enable} className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg">Enable Notifications</button>
        </div>
      )}
    </div>
  );
}
