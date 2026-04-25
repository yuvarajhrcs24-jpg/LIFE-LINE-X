import { useSimulation } from '../contexts/SimulationContext';
import { formatDistanceToNow } from 'date-fns';

const TYPE_ICONS = { flood: '🌊', fire: '🔥', earthquake: '🏚️', medical: '🏥', violence: '⚠️', infrastructure: '🏗️', food: '🍱', shelter: '🏠' };

export default function History() {
  const { requests, incidents } = useSimulation();
  const sorted = [...requests].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">📜 Incident History</h2>
      <div className="card">
        <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Major Incidents</h3>
        <div className="relative border-l-2 border-gray-200 dark:border-gray-700 ml-4 space-y-6">
          {incidents.map(inc => (
            <div key={inc.id} className="relative pl-6">
              <div className="absolute -left-2.5 top-1 w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600 border-2 border-white dark:border-gray-800" />
              <div className={`p-3 rounded-lg border ${inc.status === 'resolved' ? 'bg-green-50 dark:bg-green-950 border-green-200' : 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200'}`}>
                <div className="flex items-center gap-2">
                  <span>{TYPE_ICONS[inc.type] || '❓'}</span>
                  <p className="font-medium text-gray-800 dark:text-gray-200">{inc.title}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ml-auto ${inc.status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{inc.status}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{formatDistanceToNow(new Date(inc.timestamp), { addSuffix: true })} • {inc.affectedPeople} people affected</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">All Requests ({sorted.length})</h3>
        <div className="space-y-2">
          {sorted.map(req => (
            <div key={req.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <span className="text-xl">{TYPE_ICONS[req.type] || '❓'}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-1">{req.description}</p>
                <div className="flex gap-2 text-xs text-gray-500">
                  <span>{req.author}</span>
                  <span>•</span>
                  <span>{formatDistanceToNow(new Date(req.timestamp), { addSuffix: true })}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${req.priority === 'high' ? 'bg-red-100 text-red-700' : req.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{req.priority}</span>
                <span className="text-xs text-gray-400 capitalize">{req.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
