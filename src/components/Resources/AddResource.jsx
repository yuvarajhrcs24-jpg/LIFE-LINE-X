import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSimulation } from '../../contexts/SimulationContext';
import { useLocation } from '../../contexts/LocationContext';
import { useAuth } from '../../contexts/AuthContext';

export default function AddResource({ onClose }) {
  const { t } = useTranslation();
  const { addResource } = useSimulation();
  const { location } = useLocation();
  const { user } = useAuth();
  const [form, setForm] = useState({ name: '', type: 'food', status: 'available', address: '', phone: '', capacity: 50, current: 0 });

  const handleSubmit = (e) => {
    e.preventDefault();
    addResource({ ...form, lat: location?.lat || 28.6139, lng: location?.lng || 77.2090, capacity: Number(form.capacity), current: Number(form.current), addedBy: user?.uid, upvotes: 0 });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">{t('resources.add')}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input required className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm" placeholder="Resource Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          <select className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
            {['food', 'shelter', 'medical', 'water', 'rescue'].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <input className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm" placeholder="Address" value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
          <input className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm" placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
          <div className="flex gap-2">
            <input type="number" min="1" className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm" placeholder="Capacity" value={form.capacity} onChange={e => setForm({...form, capacity: e.target.value})} />
            <input type="number" min="0" className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm" placeholder="Current occupancy" value={form.current} onChange={e => setForm({...form, current: e.target.value})} />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium">{t('common.submit')}</button>
            <button type="button" onClick={onClose} className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg">{t('common.cancel')}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
