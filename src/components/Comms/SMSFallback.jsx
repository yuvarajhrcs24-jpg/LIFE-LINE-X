import { useState } from 'react';
import { buildSOSMessage, isTwilioConfigured, sendSOSSMS } from '../../services/smsService';
import { useLocation } from '../../contexts/LocationContext';
import { useAuth } from '../../contexts/AuthContext';

export default function SMSFallback() {
  const { location } = useLocation();
  const { user } = useAuth();
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('idle');
  const configured = isTwilioConfigured();
  const message = buildSOSMessage(location, user?.name);

  const sendSMS = async () => {
    if (!phone) return;
    setStatus('sending');
    const result = await sendSOSSMS(phone, location, message);
    setStatus(result.stub ? 'stub' : result.success ? 'sent' : 'error');
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <div className="card space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-3xl">📱</span>
        <div>
          <h3 className="font-bold text-gray-800 dark:text-gray-200">SMS Fallback</h3>
          <p className="text-xs text-gray-500">Send SOS via SMS when app notifications fail</p>
        </div>
      </div>
      {!configured && (
        <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-700 dark:text-yellow-300">
          ⚠️ Twilio not configured. Add <code className="bg-yellow-100 dark:bg-yellow-900 px-1 rounded">VITE_TWILIO_*</code> env vars to enable real SMS.
        </div>
      )}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-xs text-gray-600 dark:text-gray-400 font-mono break-all">{message}</div>
      <input className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm" placeholder="Recipient phone number (+91...)" value={phone} onChange={e => setPhone(e.target.value)} />
      <button onClick={sendSMS} disabled={!phone || status === 'sending'} className={`w-full py-2 rounded-lg text-sm font-medium text-white transition-colors ${status === 'sent' ? 'bg-green-600' : status === 'error' ? 'bg-red-600' : 'bg-orange-600 hover:bg-orange-700 disabled:opacity-50'}`}>
        {status === 'idle' ? '📤 Send SMS SOS' : status === 'sending' ? 'Sending...' : status === 'sent' ? '✅ SMS Sent!' : status === 'stub' ? '📋 Logged (Configure Twilio for real SMS)' : '❌ Error'}
      </button>
      <div className="text-xs text-gray-400 space-y-1">
        <p>📋 Also try: <a href="sms:112?body=SOS" className="text-blue-500 underline">SMS 112</a> (Emergency services)</p>
        <p>💡 Missed Call Trigger: Call emergency number, hang up — responder will call back</p>
      </div>
    </div>
  );
}
