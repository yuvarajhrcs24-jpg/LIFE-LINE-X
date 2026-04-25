import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSimulation } from '../../contexts/SimulationContext';
import { useLocation } from '../../contexts/LocationContext';
import { sortByDistance } from '../../utils/geoUtils';
import ResourceCard from './ResourceCard';
import AddResource from './AddResource';

export default function ResourceList() {
  const { t } = useTranslation();
  const { resources } = useSimulation();
  const { location } = useLocation();
  const [filter, setFilter] = useState('all');
  const [showAdd, setShowAdd] = useState(false);

  const filtered = resources.filter(r => filter === 'all' || r.type === filter);
  const sorted = location ? sortByDistance(filtered, location.lat, location.lng) : filtered;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">{t('resources.title')}</h2>
        <button onClick={() => setShowAdd(true)} className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg">{t('resources.add')}</button>
      </div>
      <div className="flex gap-2 flex-wrap">
        {['all', 'food', 'shelter', 'medical', 'water', 'rescue'].map(type => (
          <button key={type} onClick={() => setFilter(type)}
            className={`text-xs px-3 py-1 rounded-full capitalize font-medium transition-colors ${filter === type ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'}`}>
            {type === 'all' ? '🌐 All' : type === 'food' ? '🍱' : type === 'shelter' ? '🏠' : type === 'medical' ? '🏥' : type === 'water' ? '💧' : '🚁'} {t(`resources.${type}`) || type}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sorted.map(resource => <ResourceCard key={resource.id} resource={resource} userLocation={location} />)}
      </div>
      {showAdd && <AddResource onClose={() => setShowAdd(false)} />}
    </div>
  );
}
