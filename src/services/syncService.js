import { getOfflineQueue, clearOfflineQueue, dbPut } from './indexedDB';

export async function syncOfflineQueue(isFirebaseEnabled = false) {
  const queue = await getOfflineQueue();
  if (!queue.length) return { synced: 0 };
  let synced = 0;
  for (const action of queue) {
    try {
      if (isFirebaseEnabled) {
        // In production, would push to Firestore here
      } else {
        // In simulation: just mark as synced
        await dbPut(action.store || 'emergencyRequests', { ...action.data, syncedAt: new Date().toISOString() });
      }
      synced++;
    } catch (e) { console.warn('Sync failed for action', action.id, e); }
  }
  await clearOfflineQueue();
  return { synced };
}
