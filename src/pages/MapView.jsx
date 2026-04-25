import { useState, Suspense } from 'react';
import DisasterMap from '../components/Map/DisasterMap';
import EvacuationRoutes from '../components/Map/EvacuationRoutes';
import GeoFence from '../components/Map/GeoFence';

export default function MapView() {
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showEvacuation, setShowEvacuation] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">🗺️ Disaster Map</h2>
        <div className="flex gap-2">
          <button onClick={() => setShowHeatmap(!showHeatmap)} className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${showHeatmap ? 'bg-orange-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'}`}>
            🔥 {showHeatmap ? 'Hide' : 'Show'} Heatmap
          </button>
          <button onClick={() => setShowEvacuation(!showEvacuation)} className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${showEvacuation ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'}`}>
            🚶 {showEvacuation ? 'Hide' : 'Show'} Routes
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 rounded-xl overflow-hidden shadow-lg" style={{ height: '500px' }}>
          <Suspense fallback={<div className="h-full bg-gray-200 flex items-center justify-center">Loading map...</div>}>
            <DisasterMap showHeatmap={showHeatmap} showEvacuationRoutes={showEvacuation} />
          </Suspense>
        </div>
        <div className="space-y-4">
          <EvacuationRoutes />
          <div className="card">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm mb-2">Map Legend</h3>
            <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
              {[['🔴', 'High priority emergency'], ['🟡', 'Medium priority'], ['🟢', 'Low priority'], ['🔵', 'Resources'], ['🟣', 'Volunteers'], ['📍', 'Your location'], ['🟢 circle', 'Safe zone'], ['🔴 circle', 'Danger zone']].map(([icon, label]) => (
                <div key={label} className="flex items-center gap-2"><span>{icon}</span><span>{label}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <GeoFence />
    </div>
  );
}
