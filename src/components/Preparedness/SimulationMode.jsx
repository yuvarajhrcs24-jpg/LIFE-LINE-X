import { useState } from 'react';
import { useSimulation } from '../../contexts/SimulationContext';
import { analyzeEmergency } from '../../services/aiService';
import { v4 as uuidv4 } from 'uuid';

const SCENARIOS = [
  { name: '🌊 Major Flood', description: 'flooding water rising rapidly urgent help SOS', type: 'flood' },
  { name: '🔥 Building Fire', description: 'fire building burn smoke flame emergency', type: 'fire' },
  { name: '🏚️ Earthquake', description: 'earthquake tremor shake building collapse injured', type: 'earthquake' },
  { name: '🏥 Mass Casualty', description: 'heart attack injured unconscious medical ambulance bleeding', type: 'medical' },
];

export default function SimulationMode() {
  const { addRequest, requests } = useSimulation();
  const [running, setRunning] = useState(false);
  const [log, setLog] = useState([]);

  const runScenario = (scenario) => {
    setRunning(true);
    const analysis = analyzeEmergency(scenario.description);
    const req = {
      id: uuidv4(), type: analysis.type, priority: analysis.priority, status: 'pending',
      description: `[SIMULATION] ${scenario.name}: ${scenario.description}`,
      lat: 28.6139 + (Math.random() - 0.5) * 0.02, lng: 77.2090 + (Math.random() - 0.5) * 0.02,
      author: '🎭 Simulation', authorId: 'sim', timestamp: new Date().toISOString(),
      upvotes: 0, downvotes: 0, reports: 0, authorTrustScore: 50, isSimulation: true,
    };
    addRequest(req);
    setLog(prev => [`✅ Simulated: ${scenario.name} (${analysis.priority} priority)`, ...prev.slice(0, 4)]);
    setRunning(false);
  };

  return (
    <div className="card space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-3xl">🎭</span>
        <div>
          <h3 className="font-bold text-gray-800 dark:text-gray-200">Disaster Simulation Mode</h3>
          <p className="text-xs text-gray-500">Demo mode — adds mock emergency scenarios for training</p>
        </div>
      </div>
      <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-700 dark:text-yellow-300">
        ⚠️ All simulated requests are marked with [SIMULATION] and don't trigger real alerts.
      </div>
      <div className="grid grid-cols-2 gap-2">
        {SCENARIOS.map(s => (
          <button key={s.type} onClick={() => runScenario(s)} disabled={running}
            className="p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-left transition-colors">
            <p className="font-medium text-gray-800 dark:text-gray-200">{s.name}</p>
            <p className="text-xs text-gray-500 mt-1">Click to simulate</p>
          </button>
        ))}
      </div>
      {log.length > 0 && (
        <div className="space-y-1">
          {log.map((entry, i) => <p key={i} className="text-xs text-green-700 dark:text-green-300">{entry}</p>)}
        </div>
      )}
      <p className="text-xs text-gray-500">Total requests (including simulated): {requests.length}</p>
    </div>
  );
}
