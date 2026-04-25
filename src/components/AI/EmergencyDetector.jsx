export default function EmergencyDetector({ result }) {
  if (!result) return null;
  const priorityColors = { high: 'border-red-500 bg-red-50 dark:bg-red-950', medium: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950', low: 'border-green-500 bg-green-50 dark:bg-green-950' };
  return (
    <div className={`card border-l-4 ${priorityColors[result.priority]}`}>
      <div className="flex items-center gap-3">
        <span className="text-4xl">{result.icon}</span>
        <div>
          <h3 className="font-bold text-gray-800 dark:text-gray-200 text-lg capitalize">{result.type} Emergency</h3>
          <div className="flex gap-2 mt-1">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${result.priority === 'high' ? 'bg-red-200 text-red-800' : result.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
              {result.priority?.toUpperCase()} PRIORITY
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${result.confidence === 'high' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
              {result.confidence === 'high' ? '✅ High Confidence' : '❓ Low Confidence'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
