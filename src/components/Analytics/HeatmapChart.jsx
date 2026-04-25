import { useSimulation } from '../../contexts/SimulationContext';

export default function HeatmapChart() {
  const { requests } = useSimulation();
  const highPriority = requests.filter(r => r.priority === 'high');
  const medPriority = requests.filter(r => r.priority === 'medium');

  return (
    <div className="card">
      <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">🗺️ Affected Regions Heatmap</h3>
      <p className="text-xs text-gray-500 mb-3">Visual representation of emergency concentration</p>
      <div className="relative h-48 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-400 text-sm">📍 {highPriority.length} critical zones</p>
        </div>
        {highPriority.map((req, i) => (
          <div key={req.id} className="absolute rounded-full animate-pulse" style={{
            left: `${20 + (i * 25) % 60}%`, top: `${20 + (i * 30) % 60}%`,
            width: 60, height: 60,
            background: 'radial-gradient(circle, rgba(239,68,68,0.5) 0%, transparent 70%)',
            transform: 'translate(-50%,-50%)'
          }} />
        ))}
        {medPriority.map((req, i) => (
          <div key={req.id} className="absolute rounded-full" style={{
            left: `${40 + (i * 20) % 40}%`, top: `${30 + (i * 25) % 50}%`,
            width: 40, height: 40,
            background: 'radial-gradient(circle, rgba(245,158,11,0.4) 0%, transparent 70%)',
            transform: 'translate(-50%,-50%)'
          }} />
        ))}
      </div>
      <div className="flex gap-4 mt-2 text-xs text-gray-500">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500 opacity-60"></span> High ({highPriority.length})</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-yellow-500 opacity-60"></span> Medium ({medPriority.length})</span>
      </div>
    </div>
  );
}
