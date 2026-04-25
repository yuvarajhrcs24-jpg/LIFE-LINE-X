import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSimulation } from '../../contexts/SimulationContext';
import { useAuth } from '../../contexts/AuthContext';
import { useOffline } from '../../contexts/OfflineContext';
import MessageBubble from './MessageBubble';
import GroupChannels from './GroupChannels';

export default function ChatWindow() {
  const { t } = useTranslation();
  const { messages, channels, sendMessage } = useSimulation();
  const { user } = useAuth();
  const { isOnline, queueAction } = useOffline();
  const [activeChannel, setActiveChannel] = useState('general');
  const [text, setText] = useState('');
  const bottomRef = useRef(null);

  const channelMessages = messages[activeChannel] || [];
  const channelInfo = channels.find(c => c.id === activeChannel);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [channelMessages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const msg = { text: text.trim(), author: user?.name || 'Anonymous', authorId: user?.uid || 'anon' };
    if (isOnline) { sendMessage(activeChannel, msg); }
    else { await queueAction({ type: 'chat_message', store: 'chatMessages', data: { ...msg, channel: activeChannel } }); }
    setText('');
  };

  return (
    <div className="flex gap-4 h-full" style={{ height: '70vh' }}>
      <GroupChannels activeChannel={activeChannel} onSelect={setActiveChannel} />
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <p className="font-semibold text-gray-800 dark:text-gray-200">{channelInfo?.icon} {channelInfo?.name}</p>
          {!isOnline && <p className="text-xs text-yellow-600">📡 Offline — messages will be queued</p>}
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {channelMessages.length === 0 && <p className="text-gray-400 text-center text-sm pt-8">No messages yet. Be the first to send one!</p>}
          {channelMessages.map(msg => <MessageBubble key={msg.id} message={msg} />)}
          <div ref={bottomRef} />
        </div>
        <form onSubmit={handleSend} className="p-3 border-t border-gray-200 dark:border-gray-700 flex gap-2">
          <input className="flex-1 border dark:border-gray-600 rounded-xl px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" placeholder={t('chat.placeholder')} value={text} onChange={e => setText(e.target.value)} />
          <button type="submit" disabled={!text.trim()} className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-sm font-medium">{t('chat.send')}</button>
        </form>
      </div>
    </div>
  );
}
