import { useState } from 'react';
import { useSimulation } from '../../contexts/SimulationContext';
import { autoAssignVolunteers } from '../../utils/priorityUtils';

export default function TaskAssignment() {
  const { volunteers, requests, assignVolunteer } = useSimulation();
  const [selectedRequest, setSelectedRequest] = useState('');

  const pendingRequests = requests.filter(r => r.status === 'pending' || r.status === 'accepted');
  const selectedReq = pendingRequests.find(r => r.id === selectedRequest);
  const suggested = selectedReq ? autoAssignVolunteers(selectedReq, volunteers) : [];

  return (
    <div className="card space-y-4">
      <h3 className="font-bold text-gray-800 dark:text-gray-200">🎯 Auto-Assign Volunteers</h3>
      <select className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm" value={selectedRequest} onChange={e => setSelectedRequest(e.target.value)}>
        <option value="">Select a request to assign...</option>
        {pendingRequests.map(r => <option key={r.id} value={r.id}>{r.type} — {r.description?.substring(0, 50)}...</option>)}
      </select>
      {suggested.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Suggested volunteers (sorted by suitability):</p>
          {suggested.map(vol => (
            <div key={vol.id} className="flex items-center gap-3 p-2 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200">
              <span className="text-xl">🙋</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{vol.name}</p>
                <p className="text-xs text-gray-500">{vol.skills?.join(', ')}</p>
              </div>
              <button onClick={() => assignVolunteer(vol.id, `Assigned to: ${selectedReq?.description?.substring(0, 30)}...`)}
                className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg">
                Assign
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
