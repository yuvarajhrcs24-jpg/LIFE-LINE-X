import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import TrustScore from '../components/Trust/TrustScore';
import VolunteerProfile from '../components/Volunteers/VolunteerProfile';
import { calculateTrustScore } from '../utils/trustScore';

export default function Profile() {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  if (!user) return <div className="card text-center py-8 text-gray-500">Please login to view your profile.</div>;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="card">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center text-4xl">{user.role === 'citizen' ? '👤' : user.role === 'volunteer' ? '🙋' : '🏛️'}</div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
            <span className="text-xs bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-2 py-0.5 rounded-full capitalize font-medium">{user.role}</span>
          </div>
        </div>
        <div className="mt-4">
          <TrustScore user={user} />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[['confirmations', '✅', 'Verifications'], ['resolvedRequests', '🎯', 'Resolved'], ['fakeFlags', '🚩', 'Flags'], ['trustScore', '⭐', 'Trust Score']].map(([key, icon, label]) => (
          <div key={key} className="card text-center">
            <p className="text-3xl">{icon}</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{user[key] || 0}{key === 'trustScore' ? '%' : ''}</p>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </div>
      {user.role === 'volunteer' && <VolunteerProfile />}
      <div className="card">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Account</h3>
        <button onClick={logout} className="w-full bg-red-100 hover:bg-red-200 dark:bg-red-950 dark:hover:bg-red-900 text-red-700 dark:text-red-300 py-2 rounded-lg font-medium">{t('auth.logout')}</button>
      </div>
    </div>
  );
}
