import { useEffect, useState } from 'react';
import { useSimulation } from '../../contexts/SimulationContext';
import { useLocation } from '../../contexts/LocationContext';
import { isInGeoFence } from '../../utils/geoUtils';
import { showGeoFenceAlert } from '../../services/notificationService';

export default function GeoFence() {
  const { dangerZones } = useSimulation();
  const { location } = useLocation();
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (!location) return;
    const inZones = dangerZones.filter(zone => isInGeoFence(location.lat, location.lng, zone));
    if (inZones.length > 0) {
      setAlerts(inZones);
      inZones.forEach(z => showGeoFenceAlert(z));
    } else {
      setAlerts([]);
    }
  }, [location, dangerZones]);

  if (!alerts.length) return null;
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {alerts.map(zone => (
        <div key={zone.id} className="bg-red-600 text-white rounded-xl p-3 shadow-2xl border-2 border-red-900 animate-bounce">
          <p className="font-bold text-sm">⚠️ DANGER ZONE ALERT</p>
          <p className="text-xs">{zone.name}</p>
          <p className="text-xs">Evacuate immediately!</p>
        </div>
      ))}
    </div>
  );
}
