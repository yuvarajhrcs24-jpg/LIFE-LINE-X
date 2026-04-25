import { useSimulation } from '../../contexts/SimulationContext';
import { useLocation } from '../../contexts/LocationContext';
import { haversineDistance, formatDistance } from '../../utils/geoUtils';

export default function EvacuationRoutes() {
  const { safeZones } = useSimulation();
  const { location } = useLocation();
  if (!location) return null;

  const zonesWithDistance = safeZones.map(z => ({ ...z, distance: haversineDistance(location.lat, location.lng, z.lat, z.lng) })).sort((a, b) => a.distance - b.distance);

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm">🚶 Evacuation Routes</h3>
      {zonesWithDistance.map((zone, i) => (
        <div key={zone.id} className={`flex items-center gap-3 p-2 rounded-lg border ${i === 0 ? 'bg-green-50 dark:bg-green-950 border-green-300' : 'bg-gray-50 dark:bg-gray-800 border-gray-200'}`}>
          <span className="text-2xl">{zone.type === 'medical' ? '🏥' : '🏠'}</span>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{zone.name}</p>
            <p className="text-xs text-gray-500">{formatDistance(zone.distance)} away • Capacity: {zone.capacity}</p>
          </div>
          {i === 0 && <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">Nearest</span>}
        </div>
      ))}
    </div>
  );
}
