import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useSimulation } from '../../contexts/SimulationContext';
import { useLocation } from '../../contexts/LocationContext';
import { getPriorityColor } from '../../utils/priorityUtils';

// Fix Leaflet default icon issue with Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png', iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png', shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png' });

const createIcon = (emoji, color = 'white', bg = '#dc2626') => L.divIcon({
  html: `<div style="background:${bg};border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:16px;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3)">${emoji}</div>`,
  className: '', iconSize: [32, 32], iconAnchor: [16, 16], popupAnchor: [0, -16],
});

function LocationUpdater({ center }) {
  const map = useMap();
  useEffect(() => { if (center) map.setView([center.lat, center.lng], map.getZoom()); }, [center, map]);
  return null;
}

export default function DisasterMap({ showHeatmap, showEvacuationRoutes }) {
  const { requests, resources, volunteers, safeZones, dangerZones } = useSimulation();
  const { location } = useLocation();
  const [selectedLayer, setSelectedLayer] = useState('all');

  const center = location ? [location.lat, location.lng] : [28.6139, 77.2090];

  return (
    <div className="relative h-full">
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
        {['all', 'requests', 'resources', 'volunteers'].map(layer => (
          <button key={layer} onClick={() => setSelectedLayer(layer)}
            className={`text-xs px-2 py-1 rounded shadow capitalize ${selectedLayer === layer ? 'bg-red-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>
            {layer}
          </button>
        ))}
      </div>
      <MapContainer center={center} zoom={14} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' />
        <LocationUpdater center={location} />

        {/* User location */}
        {location && <Marker position={[location.lat, location.lng]} icon={createIcon('📍', 'white', '#2563eb')}>
          <Popup>📍 Your Location</Popup>
        </Marker>}

        {/* Danger zones */}
        {dangerZones.map(zone => (
          <Circle key={zone.id} center={[zone.lat, zone.lng]} radius={zone.radiusKm * 1000} color="#ef4444" fillColor="#ef4444" fillOpacity={0.15}>
            <Popup>⚠️ <strong>{zone.name}</strong><br/>Type: {zone.type}<br/>Level: {zone.level}</Popup>
          </Circle>
        ))}

        {/* Safe zones */}
        {safeZones.map(zone => (
          <Circle key={zone.id} center={[zone.lat, zone.lng]} radius={150} color="#22c55e" fillColor="#22c55e" fillOpacity={0.2}>
            <Popup>✅ <strong>{zone.name}</strong><br/>Type: {zone.type}<br/>Capacity: {zone.capacity}</Popup>
          </Circle>
        ))}

        {/* Evacuation routes */}
        {showEvacuationRoutes && location && safeZones.map(zone => (
          <Polyline key={zone.id} positions={[[location.lat, location.lng], [zone.lat, zone.lng]]} color="#22c55e" dashArray="10, 5" weight={2}>
            <Popup>🚶 Route to {zone.name}</Popup>
          </Polyline>
        ))}

        {/* Emergency requests */}
        {(selectedLayer === 'all' || selectedLayer === 'requests') && requests.map(req => (
          <Marker key={req.id} position={[req.lat, req.lng]} icon={createIcon(req.isSOS ? '🆘' : req.type === 'flood' ? '🌊' : req.type === 'fire' ? '🔥' : req.type === 'medical' ? '🏥' : '⚠️', 'white', getPriorityColor(req.priority))}>
            <Popup>
              <strong>{req.isSOS ? '🆘 SOS' : req.type.toUpperCase()}</strong><br/>
              <span className="text-sm">{req.description?.substring(0, 100)}</span><br/>
              <span className="text-xs text-gray-500">Priority: {req.priority} | Status: {req.status}</span><br/>
              <span className="text-xs text-gray-500">By: {req.author}</span>
            </Popup>
          </Marker>
        ))}

        {/* Resources */}
        {(selectedLayer === 'all' || selectedLayer === 'resources') && resources.map(res => (
          <Marker key={res.id} position={[res.lat, res.lng]} icon={createIcon(res.type === 'food' ? '🍱' : res.type === 'medical' ? '🏥' : res.type === 'water' ? '💧' : res.type === 'rescue' ? '🚁' : '🏠', 'white', '#2563eb')}>
            <Popup>
              <strong>{res.name}</strong><br/>
              <span className="text-sm">Type: {res.type} | Status: {res.status}</span><br/>
              <span className="text-xs">Capacity: {res.current}/{res.capacity}</span>
            </Popup>
          </Marker>
        ))}

        {/* Volunteers */}
        {(selectedLayer === 'all' || selectedLayer === 'volunteers') && volunteers.map(vol => (
          <Marker key={vol.id} position={[vol.lat, vol.lng]} icon={createIcon('🙋', 'white', '#7c3aed')}>
            <Popup>
              <strong>{vol.name}</strong><br/>
              <span className="text-sm">Skills: {vol.skills?.join(', ')}</span><br/>
              <span className={`text-xs font-medium ${vol.available ? 'text-green-600' : 'text-red-500'}`}>{vol.available ? '✅ Available' : '🔴 Busy'}</span>
              {vol.currentTask && <><br/><span className="text-xs text-gray-500">Task: {vol.currentTask}</span></>}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
