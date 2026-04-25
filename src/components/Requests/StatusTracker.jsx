const STEPS = ['pending', 'accepted', 'in-progress', 'resolved'];
const ICONS = { pending: '⏳', accepted: '✅', 'in-progress': '🔄', resolved: '🎉' };

export default function StatusTracker({ status }) {
  const currentIdx = STEPS.indexOf(status);
  return (
    <div className="flex items-center gap-1">
      {STEPS.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${i <= currentIdx ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
            <span>{ICONS[step]}</span>
            <span className="hidden sm:block capitalize">{step}</span>
          </div>
          {i < STEPS.length - 1 && <div className={`w-4 h-0.5 ${i < currentIdx ? 'bg-blue-600' : 'bg-gray-300'}`} />}
        </div>
      ))}
    </div>
  );
}
