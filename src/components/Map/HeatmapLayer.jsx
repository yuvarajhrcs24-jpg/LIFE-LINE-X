import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { useSimulation } from '../../contexts/SimulationContext';

export default function HeatmapLayer({ active }) {
  const map = useMap();
  const { requests } = useSimulation();

  useEffect(() => {
    if (!active) return;
    // Simple CSS-based heatmap visualization using circle overlays
    const L = window.L || {};
    requests.forEach(req => {
      const el = document.createElement('div');
      el.style.cssText = `position:absolute;border-radius:50%;background:radial-gradient(circle,rgba(220,38,38,0.4) 0%,transparent 70%);width:80px;height:80px;transform:translate(-50%,-50%);pointer-events:none;`;
      const marker = L.marker ? null : null; // Would use L.heatLayer in production
    });
  }, [active, requests, map]);

  if (!active) return null;

  // Visual representation using SVG overlay
  return (
    <div className="absolute inset-0 pointer-events-none z-10 opacity-60">
      {requests.filter(r => r.priority === 'high').map(req => (
        <div key={req.id} style={{ position: 'absolute', left: '50%', top: '50%', width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,38,38,0.5) 0%, transparent 70%)', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />
      ))}
    </div>
  );
}
