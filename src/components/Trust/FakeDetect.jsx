import { isFakeRequest } from '../../utils/trustScore';

export default function FakeDetect({ request }) {
  const { isFake, flags } = isFakeRequest(request);
  if (!isFake && !flags.length) return null;
  return (
    <div className={`text-xs flex items-center gap-1 px-2 py-1 rounded-lg ${isFake ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'}`}>
      <span>{isFake ? '🚩 Likely Fake' : '⚠️ Suspicious'}</span>
      {flags.length > 0 && <span>— {flags[0]}</span>}
    </div>
  );
}
