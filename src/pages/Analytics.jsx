import AnalyticsDashboard from '../components/Analytics/Dashboard';
import HeatmapChart from '../components/Analytics/HeatmapChart';

export default function Analytics() {
  return (
    <div className="space-y-6">
      <AnalyticsDashboard />
      <HeatmapChart />
    </div>
  );
}
