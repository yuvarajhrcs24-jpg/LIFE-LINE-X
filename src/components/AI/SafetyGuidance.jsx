export default function SafetyGuidance({ guidance }) {
  if (!guidance?.length) return null;
  return (
    <div className="card">
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">🛡️ Safety Guidance</h3>
      <ol className="space-y-2">
        {guidance.map((step, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
            <p className="text-sm text-gray-700 dark:text-gray-300">{step}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
