import { useState } from 'react';

export default function MeshComms() {
  const [meshNodes] = useState([
    { id: 1, name: 'Node A — Hospital', status: 'active', hops: 0, battery: 85 },
    { id: 2, name: 'Node B — Relief Camp', status: 'active', hops: 1, battery: 62 },
    { id: 3, name: 'Node C — Police Station', status: 'degraded', hops: 2, battery: 23 },
  ]);

  return (
    <div className="card space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-3xl">🕸️</span>
        <div>
          <h3 className="font-bold text-gray-800 dark:text-gray-200">WiFi Direct / Mesh Network</h3>
          <p className="text-xs text-gray-500">Store-and-forward mesh communication when infrastructure is down</p>
        </div>
      </div>
      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 rounded-lg p-3 text-sm text-blue-700 dark:text-blue-300">
        <p className="font-medium mb-1">How it works:</p>
        <ol className="text-xs space-y-1 list-decimal ml-4">
          <li>Devices form an ad-hoc mesh network using WiFi Direct</li>
          <li>Messages hop between devices until they reach the destination</li>
          <li>If the next hop is unavailable, messages are stored locally</li>
          <li>Messages forward automatically when a connected node is found</li>
        </ol>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Network Nodes ({meshNodes.length}):</p>
        {meshNodes.map(node => (
          <div key={node.id} className={`flex items-center gap-3 p-2 rounded-lg border ${node.status === 'active' ? 'bg-green-50 dark:bg-green-950 border-green-200' : 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200'}`}>
            <span className="text-lg">{node.status === 'active' ? '🟢' : '🟡'}</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{node.name}</p>
              <p className="text-xs text-gray-500">Hops: {node.hops} • Battery: {node.battery}%</p>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full ${node.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{node.status}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 italic">💡 WiFi Direct stub. In production, this would use dedicated mesh networking hardware or apps like goTenna or Meshtastic.</p>
    </div>
  );
}
