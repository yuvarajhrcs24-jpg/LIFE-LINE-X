export function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

export function sortByDistance(items, userLat, userLng) {
  return [...items].sort((a, b) => {
    const dA = haversineDistance(userLat, userLng, a.lat, a.lng);
    const dB = haversineDistance(userLat, userLng, b.lat, b.lng);
    return dA - dB;
  });
}

export function isInGeoFence(lat, lng, fence) {
  const dist = haversineDistance(lat, lng, fence.lat, fence.lng);
  return dist <= fence.radiusKm;
}

export function formatDistance(km) {
  if (km < 1) return `${Math.round(km * 1000)}m`;
  return `${km.toFixed(1)}km`;
}

export function getEvacuationRoute(fromLat, fromLng, safeZones) {
  const nearest = safeZones.reduce((best, zone) => {
    const d = haversineDistance(fromLat, fromLng, zone.lat, zone.lng);
    return d < best.d ? { zone, d } : best;
  }, { zone: null, d: Infinity });
  return nearest.zone;
}
