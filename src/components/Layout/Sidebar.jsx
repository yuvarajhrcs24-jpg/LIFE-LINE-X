import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';

const navItems = [
  { to: '/', icon: '🏠', key: 'home' },
  { to: '/map', icon: '🗺️', key: 'map' },
  { to: '/requests', icon: '🆘', key: 'requests' },
  { to: '/resources', icon: '📦', key: 'resources' },
  { to: '/volunteers', icon: '🙋', key: 'volunteers' },
  { to: '/chat', icon: '💬', key: 'chat' },
  { to: '/analytics', icon: '📊', key: 'analytics' },
  { to: '/preparedness', icon: '✅', key: 'preparedness' },
  { to: '/history', icon: '📜', key: 'history' },
  { to: '/settings', icon: '⚙️', key: 'settings' },
];

export default function Sidebar() {
  const { t } = useTranslation();
  return (
    <aside className="w-16 md:w-48 bg-gray-900 dark:bg-gray-950 text-white flex-shrink-0 min-h-screen">
      <nav className="flex flex-col gap-1 p-2 pt-4">
        {navItems.map(item => (
          <NavLink key={item.to} to={item.to} end={item.to === '/'}
            className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-red-700 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
            <span className="text-lg">{item.icon}</span>
            <span className="hidden md:block">{t(`nav.${item.key}`)}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
