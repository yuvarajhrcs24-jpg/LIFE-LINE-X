import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { watchLocation, stopWatchingLocation, getCurrentLocation } from '../services/locationService';

const LocationContext = createContext(null);

// Default demo location: New Delhi
const DEFAULT_LOCATION = { lat: 28.6139, lng: 77.2090, accuracy: 100 };

export function LocationProvider({ children }) {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [tracking, setTracking] = useState(false);
  const [error, setError] = useState(null);

  const startTracking = useCallback(() => {
    setTracking(true);
    getCurrentLocation().then(setLocation).catch(() => setLocation(DEFAULT_LOCATION));
    watchLocation((loc) => setLocation(loc));
  }, []);

  const stopTracking = useCallback(() => {
    stopWatchingLocation();
    setTracking(false);
  }, []);

  useEffect(() => {
    getCurrentLocation().then(setLocation).catch(() => setError('Location unavailable, using demo location'));
    return () => stopWatchingLocation();
  }, []);

  return <LocationContext.Provider value={{ location, tracking, error, startTracking, stopTracking, setLocation }}>{children}</LocationContext.Provider>;
}

export const useLocation = () => useContext(LocationContext);
