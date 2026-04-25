import VolunteerList from '../components/Volunteers/VolunteerList';
import VolunteerProfile from '../components/Volunteers/VolunteerProfile';
import TaskAssignment from '../components/Volunteers/TaskAssignment';
import { useAuth } from '../contexts/AuthContext';

export default function Volunteers() {
  const { user } = useAuth();
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2"><VolunteerList /></div>
        <div className="space-y-4">
          {user?.role === 'volunteer' && <VolunteerProfile />}
          {user?.role === 'authority' && <TaskAssignment />}
        </div>
      </div>
    </div>
  );
}
