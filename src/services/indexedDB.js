import { openDB } from 'idb';

const DB_NAME = 'lifeline-x';
const DB_VERSION = 1;

let dbInstance = null;

export async function getDB() {
  if (dbInstance) return dbInstance;
  dbInstance = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      const stores = ['emergencyRequests','resources','chatMessages','volunteerTasks','userProfile','offlineQueue','incidents','checklistItems'];
      stores.forEach(s => { if (!db.objectStoreNames.contains(s)) db.createObjectStore(s, { keyPath: 'id' }); });
    }
  });
  return dbInstance;
}

export async function dbGet(store, id) { const db = await getDB(); return db.get(store, id); }
export async function dbPut(store, item) { const db = await getDB(); return db.put(store, item); }
export async function dbDelete(store, id) { const db = await getDB(); return db.delete(store, id); }
export async function dbGetAll(store) { const db = await getDB(); return db.getAll(store); }
export async function dbClear(store) { const db = await getDB(); return db.clear(store); }

export async function enqueueOfflineAction(action) {
  const db = await getDB();
  await db.put('offlineQueue', { id: Date.now().toString(), ...action, timestamp: new Date().toISOString() });
}

export async function getOfflineQueue() { return dbGetAll('offlineQueue'); }
export async function clearOfflineQueue() { return dbClear('offlineQueue'); }
