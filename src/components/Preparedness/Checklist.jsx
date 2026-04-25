import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_CHECKLISTS = {
  flood: [
    { id: '1', text: 'Store 72-hour water supply (1 gallon/person/day)', done: false },
    { id: '2', text: 'Keep important documents in waterproof bag', done: false },
    { id: '3', text: 'Know your evacuation route', done: false },
    { id: '4', text: 'Have portable battery charger ready', done: false },
    { id: '5', text: 'First aid kit prepared', done: false },
    { id: '6', text: 'Emergency contacts list updated', done: false },
  ],
  fire: [
    { id: '7', text: 'Check smoke detectors (replace batteries)', done: false },
    { id: '8', text: 'Fire extinguisher charged and accessible', done: false },
    { id: '9', text: 'Identify two exit routes from every room', done: false },
    { id: '10', text: 'Family meeting point designated', done: false },
    { id: '11', text: 'Emergency bags packed and ready', done: false },
  ],
  earthquake: [
    { id: '12', text: 'Secure heavy furniture to walls', done: false },
    { id: '13', text: 'Know how to shut off gas/water/electricity', done: false },
    { id: '14', text: 'Emergency food supply (72 hours minimum)', done: false },
    { id: '15', text: 'Sturdy shoes near bed (glass protection)', done: false },
    { id: '16', text: 'Flashlight and batteries in each room', done: false },
  ],
};

export default function Checklist() {
  const { t } = useTranslation();
  const [type, setType] = useState('flood');
  const [items, setItems] = useState(DEFAULT_CHECKLISTS);
  const [newItem, setNewItem] = useState('');

  const toggle = (id) => setItems(prev => ({ ...prev, [type]: prev[type].map(item => item.id === id ? { ...item, done: !item.done } : item) }));
  const addItem = () => {
    if (!newItem.trim()) return;
    setItems(prev => ({ ...prev, [type]: [...(prev[type] || []), { id: uuidv4(), text: newItem, done: false }] }));
    setNewItem('');
  };
  const deleteItem = (id) => setItems(prev => ({ ...prev, [type]: prev[type].filter(item => item.id !== id) }));

  const current = items[type] || [];
  const completed = current.filter(i => i.done).length;

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {Object.keys(DEFAULT_CHECKLISTS).map(t2 => (
          <button key={t2} onClick={() => setType(t2)} className={`text-sm px-3 py-1.5 rounded-lg capitalize font-medium transition-colors ${type === t2 ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'}`}>
            {t2 === 'flood' ? '🌊' : t2 === 'fire' ? '🔥' : '🏚️'} {t2}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">{completed}/{current.length} completed</p>
        <div className="w-32 bg-gray-200 rounded-full h-2">
          <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${current.length ? (completed / current.length) * 100 : 0}%` }} />
        </div>
      </div>
      <div className="space-y-2">
        {current.map(item => (
          <div key={item.id} className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${item.done ? 'bg-green-50 dark:bg-green-950 border-green-200 opacity-75' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>
            <input type="checkbox" checked={item.done} onChange={() => toggle(item.id)} className="w-5 h-5 text-green-600 rounded" />
            <p className={`flex-1 text-sm ${item.done ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}>{item.text}</p>
            <button onClick={() => deleteItem(item.id)} className="text-gray-400 hover:text-red-500 text-xs">✕</button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input className="flex-1 border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm" placeholder="Add custom checklist item..." value={newItem} onChange={e => setNewItem(e.target.value)} onKeyDown={e => e.key === 'Enter' && addItem()} />
        <button onClick={addItem} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">{t('preparedness.add')}</button>
      </div>
    </div>
  );
}
