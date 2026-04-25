import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useSimulation } from '../../contexts/SimulationContext';
import { useAuth } from '../../contexts/AuthContext';
import { isFakeRequest } from '../../utils/trustScore';
import PriorityBadge from './PriorityBadge';
import StatusTracker from './StatusTracker';

const TYPE_ICONS = { flood: '🌊', fire: '🔥', earthquake: '🏚️', medical: '🏥', violence: '⚠️', infrastructure: '🏗️', food: '🍱', shelter: '🏠', sos: '🆘', unknown: '❓' };

export default function RequestCard({ request }) {
  const { t } = useTranslation();
  const { updateRequest } = useSimulation();
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const { isFake, flags } = isFakeRequest(request);

  const statusOptions = ['pending', 'accepted', 'in-progress', 'resolved'];
  const isAuthority = user?.role === 'authority';

  return (
    <div className={`card border-l-4 ${request.priority === 'high' ? 'border-l-red-500' : request.priority === 'medium' ? 'border-l-yellow-500' : 'border-l-green-500'} ${isFake ? 'opacity-75' : ''}`}>
      {isFake && <div className="flex items-center gap-1 text-xs text-red-600 font-medium mb-2">🚩 Flagged: {flags.join(', ')}</div>}
      <div className="flex items-start gap-3">
        <span className="text-2xl">{TYPE_ICONS[request.type] || '❓'}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <PriorityBadge priority={request.priority} />
            <span className="text-xs text-gray-500 capitalize font-medium">{request.type}</span>
            {request.isSOS && <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full font-bold animate-pulse">SOS</span>}
          </div>
          <p className="text-sm text-gray-800 dark:text-gray-200 mt-1 line-clamp-2">{request.description}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
            <span>👤 {request.author}</span>
            <span>🕐 {formatDistanceToNow(new Date(request.timestamp), { addSuffix: true })}</span>
            <span>👍 {request.upvotes}</span>
          </div>
          {expanded && (
            <div className="mt-3 space-y-2">
              <StatusTracker status={request.status} />
              <p className="text-xs text-gray-500">📍 {request.lat?.toFixed(4)}, {request.lng?.toFixed(4)}</p>
              <div className="flex gap-2 flex-wrap">
                {request.upvotes > 0 && <span className="text-xs text-green-600">✅ {request.upvotes} verifications</span>}
                {request.reports > 0 && <span className="text-xs text-red-600">🚩 {request.reports} reports</span>}
              </div>
              {isAuthority && (
                <div className="flex gap-2 flex-wrap">
                  {statusOptions.map(s => (
                    <button key={s} onClick={() => updateRequest(request.id, { status: s })}
                      className={`text-xs px-2 py-1 rounded border ${request.status === s ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <button onClick={() => updateRequest(request.id, { upvotes: (request.upvotes || 0) + 1 })} className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full hover:bg-green-200">👍 Verify</button>
          <button onClick={() => updateRequest(request.id, { reports: (request.reports || 0) + 1 })} className="text-xs text-red-500 hover:text-red-700">🚩 Report</button>
          <button onClick={() => setExpanded(!expanded)} className="text-xs text-blue-500 hover:text-blue-700">{expanded ? '▲ Less' : '▼ More'}</button>
        </div>
      </div>
    </div>
  );
}
