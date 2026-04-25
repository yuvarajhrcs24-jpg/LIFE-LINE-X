import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from '../../contexts/LocationContext';
import { useAuth } from '../../contexts/AuthContext';
import { useOffline } from '../../contexts/OfflineContext';
import { useSimulation } from '../../contexts/SimulationContext';
import { showSOSNotification } from '../../services/notificationService';
import { v4 as uuidv4 } from 'uuid';

export default function SOSButton({ onSOSSent }) {
  const { t } = useTranslation();
  const { location } = useLocation();
  const { user } = useAuth();
  const { isOnline, queueAction } = useOffline();
  const { addRequest } = useSimulation();
  const [state, setState] = useState('idle'); // idle | confirming | sending | sent
  const [countdown, setCountdown] = useState(5);

  const handlePress = () => {
    if (state === 'idle') { setState('confirming'); }
  };

  const confirm = () => {
    setState('sending');
    let count = 5;
    const interval = setInterval(() => {
      count--;
      setCountdown(count);
      if (count <= 0) {
        clearInterval(interval);
        sendSOS();
      }
    }, 1000);
  };

  const sendSOS = async () => {
    const sosRequest = {
      id: uuidv4(),
      type: 'sos',
      priority: 'high',
      status: 'pending',
      description: `🆘 SOS EMERGENCY from ${user?.name || 'Unknown User'}`,
      lat: location?.lat || 28.6139,
      lng: location?.lng || 77.2090,
      author: user?.name || 'Unknown',
      authorId: user?.uid || 'anonymous',
      timestamp: new Date().toISOString(),
      upvotes: 0, downvotes: 0, reports: 0, authorTrustScore: user?.trustScore || 50,
      isSOS: true,
    };
    if (isOnline) {
      addRequest(sosRequest);
    } else {
      await queueAction({ type: 'sos', store: 'emergencyRequests', data: sosRequest });
    }
    showSOSNotification(location);
    setState('sent');
    setCountdown(5);
    onSOSSent?.(sosRequest);
    setTimeout(() => setState('idle'), 5000);
  };

  const cancel = () => { setState('idle'); setCountdown(5); };

  return (
    <div className="flex flex-col items-center gap-4">
      {state === 'idle' && (
        <button onClick={handlePress} className="w-40 h-40 rounded-full bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black text-3xl shadow-2xl border-8 border-red-900 transition-all duration-200 animate-pulse focus:outline-none focus:ring-4 focus:ring-red-400">
          {t('sos.button')}
        </button>
      )}
      {state === 'confirming' && (
        <div className="flex flex-col items-center gap-4 p-6 bg-red-50 dark:bg-red-950 rounded-2xl border-2 border-red-500">
          <p className="text-red-700 dark:text-red-300 font-bold text-lg text-center">{t('sos.confirm')}</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm text-center">This will broadcast your location and alert all responders.</p>
          <div className="flex gap-4">
            <button onClick={confirm} className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-xl text-lg">🆘 Yes, Send SOS</button>
            <button onClick={cancel} className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white px-6 py-3 rounded-xl">{t('sos.cancel')}</button>
          </div>
        </div>
      )}
      {state === 'sending' && (
        <div className="flex flex-col items-center gap-4">
          <div className="w-40 h-40 rounded-full bg-red-600 border-8 border-red-900 flex flex-col items-center justify-center animate-ping absolute opacity-30" />
          <div className="w-40 h-40 rounded-full bg-red-600 border-8 border-red-900 flex flex-col items-center justify-center relative z-10">
            <span className="text-white font-black text-4xl">{countdown}</span>
            <span className="text-red-200 text-sm">{t('sos.sending')}</span>
          </div>
          <button onClick={cancel} className="text-sm text-gray-500 hover:text-gray-700">{t('sos.cancel')}</button>
        </div>
      )}
      {state === 'sent' && (
        <div className="flex flex-col items-center gap-3 p-6 bg-green-50 dark:bg-green-950 rounded-2xl border-2 border-green-500">
          <span className="text-5xl">✅</span>
          <p className="text-green-700 dark:text-green-300 font-bold text-xl">{t('sos.sent')}</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm text-center">Responders have been notified of your location.</p>
          {!isOnline && <p className="text-yellow-600 text-xs">⚠️ Queued - will send when online</p>}
        </div>
      )}
      {state === 'idle' && <p className="text-gray-500 dark:text-gray-400 text-sm text-center max-w-xs">{t('sos.description')}</p>}
    </div>
  );
}
