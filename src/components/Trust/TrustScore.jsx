import { calculateTrustScore, getTrustLevel } from '../../utils/trustScore';

export default function TrustScore({ user }) {
  if (!user) return null;
  const score = calculateTrustScore(user);
  const { level, color, icon } = getTrustLevel(score);
  const colorMap = { green: 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-200', blue: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-200', yellow: 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-200', red: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-200' };
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium ${colorMap[color]}`}>
      <span>{icon}</span>
      <span>{level}</span>
      <span className="font-bold">{score}%</span>
    </div>
  );
}
