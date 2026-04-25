import { useSimulation } from '../../contexts/SimulationContext';
import { useTranslation } from 'react-i18next';

export default function CrowdVerify({ requestId }) {
  const { requests, updateRequest } = useSimulation();
  const { t } = useTranslation();
  const request = requests.find(r => r.id === requestId);
  if (!request) return null;
  const total = (request.upvotes || 0) + (request.downvotes || 0);
  const pct = total > 0 ? Math.round((request.upvotes / total) * 100) : 0;
  return (
    <div className="flex items-center gap-2">
      <button onClick={() => updateRequest(requestId, { upvotes: (request.upvotes || 0) + 1 })} className="text-xs bg-green-100 hover:bg-green-200 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">👍 {request.upvotes}</button>
      <button onClick={() => updateRequest(requestId, { downvotes: (request.downvotes || 0) + 1 })} className="text-xs bg-red-100 hover:bg-red-200 dark:bg-red-900 text-red-700 dark:text-red-300 px-2 py-1 rounded-full">👎 {request.downvotes}</button>
      {total > 0 && <span className="text-xs text-gray-500">{pct}% verified</span>}
    </div>
  );
}
