import { useTranslation } from 'react-i18next';
import { useSimulation } from '../../contexts/SimulationContext';

export default function GroupChannels({ activeChannel, onSelect }) {
  const { t } = useTranslation();
  const { channels, messages } = useSimulation();
  return (
    <div className="w-full md:w-48 bg-gray-900 rounded-xl overflow-hidden">
      <div className="p-3 border-b border-gray-700">
        <p className="text-white text-sm font-semibold">{t('chat.channels')}</p>
      </div>
      {channels.map(ch => (
        <button key={ch.id} onClick={() => onSelect(ch.id)}
          className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors ${activeChannel === ch.id ? 'bg-red-700 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
          <span>{ch.icon}</span>
          <span className="flex-1 text-left">{ch.name}</span>
          {messages[ch.id]?.length > 0 && <span className="text-xs bg-gray-700 px-1.5 py-0.5 rounded-full">{messages[ch.id].length}</span>}
        </button>
      ))}
    </div>
  );
}
