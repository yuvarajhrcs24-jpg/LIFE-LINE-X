import { useTranslation } from 'react-i18next';
import { useSimulation } from '../../contexts/SimulationContext';
import { formatDistance } from '../../utils/geoUtils';

const STATUS_STYLES = {
  available: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  limited: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  unavailable: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

const TYPE_ICONS = { food: '🍱', shelter: '🏠', medical: '🏥', water: '💧', rescue: '🚁' };

export default function ResourceCard({ resource, userLocation }) {
  const { t } = useTranslation();
  const { updateResource } = useSimulation();
  const distance = userLocation ? formatDistance(Math.sqrt((userLocation.lat - resource.lat) ** 2 + (userLocation.lng - resource.lng) ** 2) * 111) : null;

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-3">
        <span className="text-3xl">{TYPE_ICONS[resource.type] || '📦'}</span>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">{resource.name}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{resource.address}</p>
          {distance && <p className="text-xs text-blue-600 dark:text-blue-400">📍 {distance}</p>}
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[resource.status]}`}>{t(`resources.${resource.status}`)}</span>
            <span className="text-xs text-gray-500">{resource.current}/{resource.capacity} used</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
            <div className={`h-1.5 rounded-full ${resource.current / resource.capacity > 0.8 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${Math.min(100, (resource.current / resource.capacity) * 100)}%` }} />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {['available', 'limited', 'unavailable'].map(s => (
            <button key={s} onClick={() => updateResource(resource.id, { status: s })}
              className={`text-xs px-2 py-0.5 rounded border ${resource.status === s ? 'bg-gray-200 dark:bg-gray-600 font-bold' : 'hover:bg-gray-100 dark:hover:bg-gray-700'} text-gray-600 dark:text-gray-400`}>
              {s}
            </button>
          ))}
        </div>
      </div>
      {resource.phone && <p className="text-xs text-gray-500 mt-2">📞 {resource.phone}</p>}
      <div className="flex items-center gap-2 mt-2">
        <span className="text-xs text-gray-400">👍 {resource.upvotes}</span>
        <button onClick={() => updateResource(resource.id, { upvotes: (resource.upvotes || 0) + 1 })} className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 px-2 py-0.5 rounded">Verify</button>
      </div>
    </div>
  );
}
