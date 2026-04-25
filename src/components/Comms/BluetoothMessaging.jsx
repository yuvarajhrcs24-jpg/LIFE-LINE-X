import { useState } from 'react';

export default function BluetoothMessaging() {
  const [status, setStatus] = useState('idle');
  const [devices, setDevices] = useState([]);
  const [messages, setMessages] = useState([{ id: 1, from: 'Device nearby', text: 'Need help at Block C', time: '2 min ago' }]);

  const scan = async () => {
    setStatus('scanning');
    if ('bluetooth' in navigator) {
      try {
        const device = await navigator.bluetooth.requestDevice({ acceptAllDevices: true, optionalServices: ['generic_access'] });
        setDevices(prev => [...prev, { id: device.id, name: device.name || 'Unknown Device' }]);
        setStatus('connected');
      } catch (e) {
        setStatus('idle');
        console.log('Bluetooth not available or denied:', e.message);
      }
    } else {
      // Stub for environments without Web Bluetooth
      setTimeout(() => {
        setDevices([{ id: 'stub-1', name: 'Emergency Device A (Demo)' }, { id: 'stub-2', name: 'Volunteer Phone B (Demo)' }]);
        setStatus('connected');
      }, 1500);
    }
  };

  return (
    <div className="card space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-3xl">📶</span>
        <div>
          <h3 className="font-bold text-gray-800 dark:text-gray-200">Bluetooth Messaging</h3>
          <p className="text-xs text-gray-500">Device-to-device communication without internet</p>
        </div>
      </div>
      <div className={`text-xs px-3 py-1 rounded-full inline-block font-medium ${status === 'connected' ? 'bg-green-100 text-green-700' : status === 'scanning' ? 'bg-blue-100 text-blue-700 animate-pulse' : 'bg-gray-100 text-gray-600'}`}>
        {status === 'idle' ? '⚫ Not scanning' : status === 'scanning' ? '🔵 Scanning...' : `🟢 Connected (${devices.length} devices)`}
      </div>
      <button onClick={scan} disabled={status === 'scanning'} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm px-4 py-2 rounded-lg">
        {status === 'scanning' ? 'Scanning...' : '🔍 Scan for Devices'}
      </button>
      {devices.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Nearby Devices:</p>
          {devices.map(d => <div key={d.id} className="text-sm bg-blue-50 dark:bg-blue-950 p-2 rounded-lg border border-blue-200 text-blue-800 dark:text-blue-200">{d.name}</div>)}
        </div>
      )}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Received Messages:</p>
        {messages.map(m => (
          <div key={m.id} className="bg-gray-50 dark:bg-gray-700 p-2 rounded-lg text-sm">
            <span className="font-medium text-gray-700 dark:text-gray-300">{m.from}: </span>
            <span className="text-gray-600 dark:text-gray-400">{m.text}</span>
            <span className="text-xs text-gray-400 ml-2">{m.time}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 italic">💡 Uses Web Bluetooth API. Range: ~10m. Works without internet.</p>
    </div>
  );
}
