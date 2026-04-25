import { useAuth } from '../../contexts/AuthContext';
import { useSimulation } from '../../contexts/SimulationContext';
import SOSButton from '../SOS/SOSButton';
import VolunteerProfile from '../Volunteers/VolunteerProfile';
import RequestFeed from '../Requests/RequestFeed';

export default function VolunteerDashboard() {
  const { user } = useAuth();
  const { requests, volunteers } = useSimulation();
  const myVolunteer = volunteers.find(v => v.name === user?.name);
  const assigned = requests.filter(r => r.status === 'accepted' || r.status === 'in-progress');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card text-center">
          <p className="text-3xl font-bold text-purple-600">{assigned.length}</p>
          <p className="text-sm text-gray-500">Assigned Tasks</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-green-600">{user?.trustScore || 85}%</p>
          <p className="text-sm text-gray-500">Trust Score</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-blue-600">{myVolunteer?.available ? '✅' : '🔴'}</p>
          <p className="text-sm text-gray-500">Status</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VolunteerProfile />
        <div className="card flex flex-col items-center py-6">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Personal SOS</h3>
          <SOSButton />
        </div>
      </div>
      <RequestFeed />
    </div>
  );
}
