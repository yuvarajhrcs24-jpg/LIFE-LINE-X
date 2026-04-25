import { useState } from 'react';
import { useSimulation } from '../../contexts/SimulationContext';

export default function GeoFenceAlertConfig() {
  const { dangerZones } = useSimulation();
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200">🚧 Geo-Fence Alerts</h3>
        <label className="flex items-center gap-2 cursor-pointer">
          <div className={`w-10 h-5 rounded-full transition-colors ${alertsEnabled ? 'bg-red-600' : 'bg-gray-300'}`} onClick={() => setAlertsEnabled(!alertsEnabled)}>
            <div className={`w-4 h-4 bg-white rounded-full shadow mt-0.5 transition-transform ${alertsEnabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </div>
        </label>
      </div>
      <p className="text-xs text-gray-500 mb-3">You will be alerted when entering danger zones.</p>
      <div className="space-y-2">
        {dangerZones.map(zone => (
          <div key={zone.id} className="flex items-center gap-3 p-2 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200">
            <span className="text-lg">⚠️</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{zone.name}</p>
              <p className="text-xs text-gray-500">Radius: {zone.radiusKm}km • Level: {zone.level}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
