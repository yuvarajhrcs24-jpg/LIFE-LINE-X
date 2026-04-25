import { useSimulation } from '../../contexts/SimulationContext';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import StatsCard from './StatsCard';

const COLORS = ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#8b5cf6'];

export default function AnalyticsDashboard() {
  const { t } = useTranslation();
  const { requests, resources, volunteers, incidents } = useSimulation();

  const totalRequests = requests.length;
  const resolved = requests.filter(r => r.status === 'resolved').length;
  const activeVolunteers = volunteers.filter(v => v.available).length;
  const availableResources = resources.filter(r => r.status === 'available').length;

  const byType = ['flood','fire','earthquake','medical','violence','infrastructure','food','shelter'].map(type => ({ type: type.charAt(0).toUpperCase() + type.slice(1), count: requests.filter(r => r.type === type).length })).filter(d => d.count > 0);
  const byPriority = [
    { name: 'High 🔴', value: requests.filter(r => r.priority === 'high').length },
    { name: 'Medium 🟡', value: requests.filter(r => r.priority === 'medium').length },
    { name: 'Low 🟢', value: requests.filter(r => r.priority === 'low').length },
  ];
  const statusData = [
    { status: 'Pending', count: requests.filter(r => r.status === 'pending').length },
    { status: 'Accepted', count: requests.filter(r => r.status === 'accepted').length },
    { status: 'In Progress', count: requests.filter(r => r.status === 'in-progress').length },
    { status: 'Resolved', count: requests.filter(r => r.status === 'resolved').length },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">{t('analytics.title')}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard title={t('analytics.totalRequests')} value={totalRequests} icon="🆘" color="red" trend="+3 today" />
        <StatsCard title={t('analytics.resolved')} value={resolved} icon="✅" color="green" trend={`${Math.round(resolved/totalRequests*100)}% rate`} />
        <StatsCard title={t('analytics.volunteers')} value={activeVolunteers} icon="🙋" color="purple" />
        <StatsCard title={t('analytics.resources')} value={availableResources} icon="📦" color="blue" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Requests by Type</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={byType}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="type" tick={{ fontSize: 11 }} /><YAxis /><Tooltip /><Bar dataKey="count" fill="#ef4444" radius={[4, 4, 0, 0]} /></BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Priority Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart><Pie data={byPriority} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
              {byPriority.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
            </Pie><Tooltip /></PieChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Request Status</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={statusData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="status" tick={{ fontSize: 11 }} /><YAxis /><Tooltip /><Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} /></BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Recent Incidents</h3>
          <div className="space-y-2">
            {incidents.map(inc => (
              <div key={inc.id} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-lg">{inc.type === 'flood' ? '🌊' : inc.type === 'fire' ? '🔥' : '🏚️'}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{inc.title}</p>
                  <p className="text-xs text-gray-500">Affected: {inc.affectedPeople} people</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${inc.status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{inc.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
