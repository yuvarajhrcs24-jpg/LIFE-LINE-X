let watchId = null;

export function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) { reject(new Error('Geolocation not supported')); return; }
    navigator.geolocation.getCurrentPosition(
      pos => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy }),
      err => reject(err),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  });
}

export function watchLocation(callback) {
  if (!navigator.geolocation) return null;
  watchId = navigator.geolocation.watchPosition(
    pos => callback({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy }),
    err => console.warn('Location watch error:', err),
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 }
  );
  return watchId;
}

export function stopWatchingLocation() {
  if (watchId !== null) { navigator.geolocation.clearWatch(watchId); watchId = null; }
}
