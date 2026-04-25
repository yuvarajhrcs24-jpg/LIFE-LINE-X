export async function requestNotificationPermission() {
  if (!('Notification' in window)) return false;
  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

export function showLocalNotification(title, body, options = {}) {
  if (Notification.permission !== 'granted') return;
  new Notification(title, { body, icon: '/icons/icon-192.png', badge: '/icons/icon-192.png', ...options });
}

export function showSOSNotification(location) {
  showLocalNotification('🆘 SOS ALERT', `Emergency at ${location?.lat?.toFixed(4)}, ${location?.lng?.toFixed(4)}`, { requireInteraction: true, tag: 'sos' });
}

export function showNewRequestNotification(request) {
  showLocalNotification(`New ${request.priority} Priority Request`, request.description?.substring(0, 100), { tag: `request-${request.id}` });
}

export function showGeoFenceAlert(zone) {
  showLocalNotification('⚠️ Danger Zone Alert', `You are entering: ${zone.name}`, { requireInteraction: true, tag: 'geofence' });
}
