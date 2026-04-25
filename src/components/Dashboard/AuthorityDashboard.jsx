import AnalyticsDashboard from '../Analytics/Dashboard';
import TaskAssignment from '../Volunteers/TaskAssignment';
import ResourceStatus from '../Resources/ResourceStatus';
import GeoFenceAlertConfig from '../Notifications/GeoFenceAlert';
import HeatmapChart from '../Analytics/HeatmapChart';

export default function AuthorityDashboard() {
  return (
    <div className="space-y-6">
      <AnalyticsDashboard />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TaskAssignment />
        <ResourceStatus />
        <HeatmapChart />
        <GeoFenceAlertConfig />
      </div>
    </div>
  );
}
