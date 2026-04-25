export default function SOSAlert({ request }) {
  if (!request?.isSOS) return null;
  return (
    <div className="animate-pulse bg-red-600 text-white rounded-xl p-4 border-4 border-red-900 shadow-2xl">
      <div className="flex items-center gap-3">
        <span className="text-3xl">🆘</span>
        <div>
          <p className="font-black text-lg">SOS ALERT!</p>
          <p className="text-red-200 text-sm">{request.author} — {new Date(request.timestamp).toLocaleTimeString()}</p>
          <p className="text-sm mt-1">{request.description}</p>
          <p className="text-xs text-red-200 mt-1">📍 {request.lat?.toFixed(4)}, {request.lng?.toFixed(4)}</p>
        </div>
      </div>
    </div>
  );
}
