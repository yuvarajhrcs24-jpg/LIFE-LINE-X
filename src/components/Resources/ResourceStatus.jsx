import { useSimulation } from '../../contexts/SimulationContext';
import { predictResourceShortage } from '../../utils/resourceMatch';

export default function ResourceStatus() {
  const { resources, requests } = useSimulation();
  const analyzed = predictResourceShortage(resources, requests);
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm">📊 Resource Status Overview</h3>
      {analyzed.map(r => (
        <div key={r.id} className={`flex items-center gap-3 p-2 rounded-lg border ${r.shortage ? 'border-red-300 bg-red-50 dark:bg-red-950' : 'border-gray-200 bg-gray-50 dark:bg-gray-800'}`}>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{r.name}</p>
            <div className="flex gap-2 text-xs text-gray-500">
              <span>Demand: {r.demand}</span>
              <span className={`font-medium ${r.trend === 'critical' ? 'text-red-600' : r.trend === 'warning' ? 'text-yellow-600' : 'text-green-600'}`}>
                {r.trend === 'critical' ? '🔴 Critical' : r.trend === 'warning' ? '🟡 Warning' : '🟢 OK'}
              </span>
            </div>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${r.status === 'available' ? 'bg-green-100 text-green-800' : r.status === 'limited' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{r.status}</span>
        </div>
      ))}
    </div>
  );
}
