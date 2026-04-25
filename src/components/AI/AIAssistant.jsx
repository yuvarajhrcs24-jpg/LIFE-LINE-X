import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { analyzeEmergency } from '../../services/aiService';
import SafetyGuidance from './SafetyGuidance';
import EmergencyDetector from './EmergencyDetector';

export default function AIAssistant() {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = () => {
    if (!input.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResult(analyzeEmergency(input));
      setLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-4">
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🤖</span>
          <div>
            <h2 className="font-bold text-gray-800 dark:text-gray-200">{t('ai.title')}</h2>
            <p className="text-xs text-gray-500">Rule-based AI — runs 100% locally, no internet needed</p>
          </div>
        </div>
        <textarea rows={4} className="w-full border dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={t('ai.placeholder')} value={input} onChange={e => setInput(e.target.value)} />
        <button onClick={analyze} disabled={loading || !input.trim()} className="mt-2 w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2 rounded-xl font-medium text-sm">
          {loading ? '🔄 Analyzing...' : t('ai.analyze')}
        </button>
      </div>
      {result && (
        <div className="space-y-4">
          <EmergencyDetector result={result} />
          <SafetyGuidance guidance={result.guidance} />
          <div className="card">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">📍 {t('ai.safeZone')}</h3>
            <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200">
              <span className="text-2xl">🏠</span>
              <div>
                <p className="font-medium text-green-800 dark:text-green-200">{result.nearestSafeZone?.name}</p>
                <p className="text-xs text-green-600 dark:text-green-400">Type: {result.nearestSafeZone?.type}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
