import { useTranslation } from 'react-i18next';
import { useSimulation } from '../../contexts/SimulationContext';
import { useAuth } from '../../contexts/AuthContext';

export default function VolunteerList() {
  const { t } = useTranslation();
  const { volunteers, assignVolunteer } = useSimulation();
  const { user } = useAuth();
  const isAuthority = user?.role === 'authority';

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">{t('volunteers.title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {volunteers.map(vol => (
          <div key={vol.id} className="card">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-2xl">{vol.available ? '🙋' : '🔴'}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">{vol.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${vol.available ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>{vol.available ? t('volunteers.available') : t('volunteers.unavailable')}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {vol.skills?.map(s => <span key={s} className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">{s}</span>)}
                </div>
                <p className="text-xs text-gray-500 mt-1">Experience: {vol.experience}</p>
                {vol.currentTask && <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">📋 {vol.currentTask}</p>}
                <p className="text-xs text-gray-500">⭐ Trust: {vol.trustScore}%</p>
              </div>
            </div>
            {isAuthority && vol.available && (
              <button onClick={() => { const task = prompt('Assign task:'); if (task) assignVolunteer(vol.id, task); }}
                className="mt-2 w-full text-sm bg-purple-600 hover:bg-purple-700 text-white py-1.5 rounded-lg">
                {t('volunteers.assign')}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
