import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const { t } = useTranslation();
  const { login, simUsers } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try { await login(email, password); navigate('/'); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const quickLogin = async (user) => {
    try { await login(user.email, 'demo123'); navigate('/'); }
    catch (e) { setError(e.message); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-6xl">🆘</span>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white mt-2">LIFE-LINE-X</h1>
          <p className="text-gray-500 mt-1">Disaster Management System</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">{t('auth.login')}</h2>
          {error && <div className="bg-red-50 dark:bg-red-950 border border-red-300 text-red-700 dark:text-red-300 rounded-lg p-3 mb-4 text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="email" required className="w-full border dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder={t('auth.email')} value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" required className="w-full border dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder={t('auth.password')} value={password} onChange={e => setPassword(e.target.value)} />
            <button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors">{loading ? t('common.loading') : t('auth.login')}</button>
          </form>
          <div className="mt-4">
            <p className="text-xs text-gray-400 text-center mb-3">— Or quick demo login —</p>
            <div className="grid grid-cols-3 gap-2">
              {simUsers.map(u => (
                <button key={u.uid} onClick={() => quickLogin(u)} className="text-xs py-2 px-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg capitalize font-medium transition-colors">
                  {u.role === 'citizen' ? '👤' : u.role === 'volunteer' ? '🙋' : '🏛️'}<br/>{u.role}
                </button>
              ))}
            </div>
          </div>
          <p className="text-center mt-4 text-sm text-gray-500">{t('auth.noAccount')} <Link to="/register" className="text-red-600 hover:text-red-700 font-medium">Register</Link></p>
        </div>
      </div>
    </div>
  );
}
