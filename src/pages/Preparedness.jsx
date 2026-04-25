import Checklist from '../components/Preparedness/Checklist';
import SimulationMode from '../components/Preparedness/SimulationMode';
import AIAssistant from '../components/AI/AIAssistant';

export default function Preparedness() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">✅ Disaster Preparedness</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Emergency Checklist</h3>
          <Checklist />
        </div>
        <div className="space-y-6">
          <SimulationMode />
          <AIAssistant />
        </div>
      </div>
    </div>
  );
}
