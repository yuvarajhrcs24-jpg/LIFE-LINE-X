import { useState, useEffect } from 'react';
import { getOfflineQueue } from '../../services/indexedDB';
import { useTranslation } from 'react-i18next';

export default function OfflineQueue() {
  const [queue, setQueue] = useState([]);
  const { t } = useTranslation();
  useEffect(() => { getOfflineQueue().then(setQueue); }, []);
  if (!queue.length) return <p className="text-gray-500 text-sm">No queued actions.</p>;
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-700 dark:text-gray-300">{t('offline.queue')} ({queue.length})</h3>
      {queue.map(a => (
        <div key={a.id} className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 rounded p-2 text-sm">
          <span className="font-medium">{a.type}</span> — {new Date(a.timestamp).toLocaleTimeString()}
        </div>
      ))}
    </div>
  );
}
