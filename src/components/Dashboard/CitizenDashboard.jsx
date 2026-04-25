import SOSButton from '../SOS/SOSButton';
import SOSAlert from '../SOS/SOSAlert';
import { useSimulation } from '../../contexts/SimulationContext';
import { useState } from 'react';
import AIAssistant from '../AI/AIAssistant';
import EvacuationRoutes from '../Map/EvacuationRoutes';

export default function CitizenDashboard() {
  const { requests } = useSimulation();
  const [latestSOS, setLatestSOS] = useState(null);
  const highPriority = requests.filter(r => r.priority === 'high' && r.status !== 'resolved');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card flex flex-col items-center py-8">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-6">🆘 Emergency Alert</h2>
          <SOSButton onSOSSent={setLatestSOS} />
          {latestSOS && <div className="mt-4 w-full"><SOSAlert request={latestSOS} /></div>}
        </div>
        <div className="space-y-4">
          <div className="card">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">⚠️ Active Alerts ({highPriority.length})</h3>
            {highPriority.slice(0, 3).map(req => (
              <div key={req.id} className={`flex items-center gap-2 p-2 rounded-lg mb-2 ${req.priority === 'high' ? 'bg-red-50 dark:bg-red-950 border border-red-200' : 'bg-yellow-50 dark:bg-yellow-950 border border-yellow-200'}`}>
                <span className="text-lg">{req.type === 'flood' ? '🌊' : req.type === 'fire' ? '🔥' : '⚠️'}</span>
                <div><p className="text-sm font-medium text-gray-800 dark:text-gray-200">{req.description?.substring(0, 60)}...</p><p className="text-xs text-gray-500">{req.author}</p></div>
              </div>
            ))}
          </div>
          <EvacuationRoutes />
        </div>
      </div>
      <AIAssistant />
    </div>
  );
}
