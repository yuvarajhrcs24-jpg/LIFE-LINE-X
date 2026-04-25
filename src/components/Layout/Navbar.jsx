import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useOffline } from '../../contexts/OfflineContext';

export default function Navbar() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { darkMode, toggleDark } = useTheme();
  const { isOnline } = useOffline();
  const location = useLocation();

  return (
    <nav className="bg-red-700 dark:bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-2xl">🆘</span>
          <span className="hidden sm:block">LIFE-LINE-X</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-gray-400'}`} title={isOnline ? 'Online' : 'Offline'} />
          <button onClick={toggleDark} className="p-1 rounded hover:bg-red-600 dark:hover:bg-gray-700 text-lg" title="Toggle dark mode">{darkMode ? '☀️' : '🌙'}</button>
          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden md:block text-sm">{user.name}</span>
              <span className="text-xs bg-red-900 dark:bg-gray-700 px-2 py-0.5 rounded-full capitalize">{user.role}</span>
              <button onClick={logout} className="text-xs bg-red-800 hover:bg-red-600 px-2 py-1 rounded">{t('auth.logout')}</button>
            </div>
          ) : (
            <Link to="/login" className="text-sm bg-white text-red-700 hover:bg-red-50 px-3 py-1 rounded font-medium">{t('auth.login')}</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
