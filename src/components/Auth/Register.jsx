import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';

export default function Register() {
  const { t } = useTranslation();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'citizen' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try { await register(form.name, form.email, form.password, form.role); navigate('/'); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-6xl">🆘</span>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white mt-2">LIFE-LINE-X</h1>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">{t('auth.register')}</h2>
          {error && <div className="bg-red-50 dark:bg-red-950 border border-red-300 text-red-700 dark:text-red-300 rounded-lg p-3 mb-4 text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input required className="w-full border dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder={t('auth.name')} value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            <input type="email" required className="w-full border dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder={t('auth.email')} value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            <input type="password" required minLength={6} className="w-full border dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder={t('auth.password')} value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
            <div className="grid grid-cols-3 gap-2">
              {['citizen', 'volunteer', 'authority'].map(role => (
                <button key={role} type="button" onClick={() => setForm({...form, role})}
                  className={`py-2 rounded-xl text-sm font-medium capitalize transition-colors border ${form.role === role ? 'bg-red-600 text-white border-red-600' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'}`}>
                  {role === 'citizen' ? '👤' : role === 'volunteer' ? '🙋' : '🏛️'} {t(`auth.roles.${role}`)}
                </button>
              ))}
            </div>
            <button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl">{loading ? t('common.loading') : t('auth.register')}</button>
          </form>
          <p className="text-center mt-4 text-sm text-gray-500">{t('auth.hasAccount')} <Link to="/login" className="text-red-600 hover:text-red-700 font-medium">Login</Link></p>
        </div>
      </div>
    </div>
  );
}
