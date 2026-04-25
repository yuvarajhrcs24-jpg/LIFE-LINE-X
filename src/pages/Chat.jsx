import ChatWindow from '../components/Chat/ChatWindow';

export default function Chat() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">💬 Communication Center</h2>
      <ChatWindow />
    </div>
  );
}
