// Last-write-wins conflict resolution strategy
export function resolveConflict(localRecord, remoteRecord) {
  const localTime = new Date(localRecord.updatedAt || localRecord.timestamp || 0).getTime();
  const remoteTime = new Date(remoteRecord.updatedAt || remoteRecord.timestamp || 0).getTime();
  return localTime >= remoteTime ? localRecord : remoteRecord;
}

export function mergeRecords(localRecords, remoteRecords) {
  const merged = {};
  [...localRecords, ...remoteRecords].forEach(record => {
    if (!merged[record.id] || resolveConflict(merged[record.id], record) === record) {
      merged[record.id] = record;
    }
  });
  return Object.values(merged);
}
