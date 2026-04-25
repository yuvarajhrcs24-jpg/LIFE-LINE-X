import { useAuth } from '../../contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';

export default function MessageBubble({ message }) {
  const { user } = useAuth();
  const isOwn = message.authorId === user?.uid;
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`max-w-xs lg:max-w-md ${isOwn ? 'bg-red-600 text-white rounded-l-2xl rounded-tr-2xl' : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-r-2xl rounded-tl-2xl border border-gray-200 dark:border-gray-600'} px-4 py-2 shadow-sm`}>
        {!isOwn && <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">{message.author}</p>}
        <p className="text-sm">{message.text}</p>
        <p className={`text-xs mt-1 ${isOwn ? 'text-red-200' : 'text-gray-400'}`}>{formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}</p>
      </div>
    </div>
  );
}
