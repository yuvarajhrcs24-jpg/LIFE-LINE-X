import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSimulation } from '../../contexts/SimulationContext';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from '../../contexts/LocationContext';
import { useOffline } from '../../contexts/OfflineContext';
import { sortByPriority } from '../../utils/priorityUtils';
import { analyzeEmergency } from '../../services/aiService';
import RequestCard from './RequestCard';
import { v4 as uuidv4 } from 'uuid';

export default function RequestFeed() {
  const { t } = useTranslation();
  const { requests, addRequest } = useSimulation();
  const { user } = useAuth();
  const { location } = useLocation();
  const { isOnline, queueAction } = useOffline();
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [form, setForm] = useState({ description: '', type: 'unknown', priority: 'medium' });
  const [aiAnalysis, setAiAnalysis] = useState(null);

  const analyzeDesc = () => {
    if (form.description.length > 5) {
      const analysis = analyzeEmergency(form.description);
      setAiAnalysis(analysis);
      setForm(f => ({ ...f, type: analysis.type, priority: analysis.priority }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const req = { ...form, lat: location?.lat || 28.6139, lng: location?.lng || 77.2090, author: user?.name || 'Anonymous', authorId: user?.uid || 'anon', status: 'pending', upvotes: 0, downvotes: 0, reports: 0, authorTrustScore: user?.trustScore || 50 };
    if (isOnline) { addRequest(req); }
    else { await queueAction({ type: 'new_request', store: 'emergencyRequests', data: { ...req, id: uuidv4() } }); }
    setShowForm(false); setForm({ description: '', type: 'unknown', priority: 'medium' }); setAiAnalysis(null);
  };

  const filtered = requests.filter(r => filter === 'all' || r.priority === filter || r.status === filter || r.type === filter);
  const sorted = sortByPriority(filtered);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">{t('requests.title')} <span className="text-sm font-normal text-gray-500">({requests.length})</span></h2>
        <button onClick={() => setShowForm(!showForm)} className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg">{t('requests.new')}</button>
      </div>
      <div className="flex gap-2 flex-wrap">
        {['all', 'high', 'medium', 'low', 'pending', 'resolved'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`text-xs px-3 py-1 rounded-full capitalize font-medium transition-colors ${filter === f ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'}`}>{f}</button>
        ))}
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} className="card space-y-3">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">Submit Emergency Request</h3>
          <textarea required rows={3} className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm resize-none" placeholder="Describe your emergency situation..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} onBlur={analyzeDesc} />
          {aiAnalysis && (
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 rounded-lg p-3 text-sm">
              <p className="font-medium text-blue-700 dark:text-blue-300">🤖 AI Analysis: {aiAnalysis.icon} {aiAnalysis.type} • {aiAnalysis.priority} priority</p>
              <p className="text-blue-600 dark:text-blue-400 text-xs mt-1">{aiAnalysis.guidance[0]}</p>
            </div>
          )}
          <div className="flex gap-2">
            <select className="flex-1 border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
              {['flood','fire','earthquake','medical','violence','infrastructure','food','shelter','unknown'].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <select className="flex-1 border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm" value={form.priority} onChange={e => setForm({...form, priority: e.target.value})}>
              {['high','medium','low'].map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium text-sm">{t('common.submit')}</button>
            <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm">{t('common.cancel')}</button>
          </div>
        </form>
      )}
      <div className="space-y-3">
        {sorted.map(req => <RequestCard key={req.id} request={req} />)}
        {sorted.length === 0 && <p className="text-gray-500 text-center py-8">No requests found.</p>}
      </div>
    </div>
  );
}
