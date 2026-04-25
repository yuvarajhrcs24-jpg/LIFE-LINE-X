export default function StatsCard({ title, value, icon, color = 'blue', trend }) {
  const colors = { blue: 'bg-blue-50 dark:bg-blue-950 border-blue-200 text-blue-600', red: 'bg-red-50 dark:bg-red-950 border-red-200 text-red-600', green: 'bg-green-50 dark:bg-green-950 border-green-200 text-green-600', yellow: 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200 text-yellow-600', purple: 'bg-purple-50 dark:bg-purple-950 border-purple-200 text-purple-600' };
  return (
    <div className={`card border ${colors[color]} flex items-center gap-4`}>
      <span className="text-3xl">{icon}</span>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className={`text-3xl font-bold ${colors[color].split(' ').pop()}`}>{value}</p>
        {trend && <p className="text-xs text-gray-400 mt-0.5">{trend}</p>}
      </div>
    </div>
  );
}
