import { useAuth } from '../contexts/AuthContext';
import CitizenDashboard from '../components/Dashboard/CitizenDashboard';
import VolunteerDashboard from '../components/Dashboard/VolunteerDashboard';
import AuthorityDashboard from '../components/Dashboard/AuthorityDashboard';
import { Link } from 'react-router-dom';

export default function Home() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 text-center gap-8 py-16">
        <div>
          <span className="text-8xl">🆘</span>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mt-4">LIFE-LINE-X</h1>
          <p className="text-xl text-gray-500 mt-2">Comprehensive Disaster Management System</p>
          <p className="text-sm text-gray-400 mt-1">Offline-first • AI-powered • Real-time</p>
        </div>
        <div className="grid grid-cols-3 gap-4 max-w-xl">
          {[['🌊', 'Flood Response'], ['🔥', 'Fire Alerts'], ['🏚️', 'Earthquake Aid'], ['🏥', 'Medical Help'], ['🙋', 'Volunteer', ], ['📊', 'Analytics']].map(([icon, label]) => (
            <div key={label} className="card text-center py-4"><span className="text-3xl">{icon}</span><p className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-medium">{label}</p></div>
          ))}
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-xl text-lg">Get Started</Link>
          <Link to="/map" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 font-bold px-8 py-3 rounded-xl text-lg hover:bg-gray-50 dark:hover:bg-gray-700">View Map</Link>
        </div>
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 rounded-xl p-4 max-w-md text-sm text-blue-700 dark:text-blue-300">
          <p className="font-semibold mb-1">🎭 Simulation Mode Active</p>
          <p>The app runs with demo data. Login to access all features, or <Link to="/login" className="underline font-medium">login as demo user</Link>.</p>
        </div>
      </div>
    );
  }

  if (user.role === 'authority') return <AuthorityDashboard />;
  if (user.role === 'volunteer') return <VolunteerDashboard />;
  return <CitizenDashboard />;
}
