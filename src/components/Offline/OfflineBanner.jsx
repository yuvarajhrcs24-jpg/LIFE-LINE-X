import { useOffline } from '../../contexts/OfflineContext';
import { useTranslation } from 'react-i18next';

export default function OfflineBanner() {
  const { isOnline, queueSize, syncing, manualSync } = useOffline();
  const { t } = useTranslation();
  if (isOnline && queueSize === 0) return null;
  return (
    <div className={`px-4 py-2 text-sm flex items-center justify-between ${isOnline ? 'bg-blue-600' : 'bg-yellow-600'} text-white`}>
      <span>{isOnline ? `🔄 ${syncing ? 'Syncing...' : `${queueSize} queued actions`}` : `📡 ${t('offline.banner')} ${queueSize > 0 ? `(${queueSize} queued)` : ''}`}</span>
      {isOnline && queueSize > 0 && !syncing && (
        <button onClick={manualSync} className="text-xs bg-white text-blue-700 px-2 py-0.5 rounded font-medium">{t('offline.sync')}</button>
      )}
    </div>
  );
}
