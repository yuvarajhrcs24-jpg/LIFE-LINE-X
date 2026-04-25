import { createContext, useContext, useState, useEffect } from 'react';
import { getOfflineQueue, enqueueOfflineAction } from '../services/indexedDB';
import { syncOfflineQueue } from '../services/syncService';

const OfflineContext = createContext(null);

export function OfflineProvider({ children }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [queueSize, setQueueSize] = useState(0);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    const onOnline = async () => {
      setIsOnline(true);
      setSyncing(true);
      await syncOfflineQueue(false);
      setSyncing(false);
      setQueueSize(0);
    };
    const onOffline = () => setIsOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    getOfflineQueue().then(q => setQueueSize(q.length));
    return () => { window.removeEventListener('online', onOnline); window.removeEventListener('offline', onOffline); };
  }, []);

  const queueAction = async (action) => {
    await enqueueOfflineAction(action);
    setQueueSize(prev => prev + 1);
  };

  const manualSync = async () => {
    setSyncing(true);
    await syncOfflineQueue(false);
    setSyncing(false);
    setQueueSize(0);
  };

  return <OfflineContext.Provider value={{ isOnline, queueSize, syncing, queueAction, manualSync }}>{children}</OfflineContext.Provider>;
}

export const useOffline = () => useContext(OfflineContext);
