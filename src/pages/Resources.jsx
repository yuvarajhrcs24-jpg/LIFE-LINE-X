import ResourceList from '../components/Resources/ResourceList';
import ResourceStatus from '../components/Resources/ResourceStatus';

export default function Resources() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2"><ResourceList /></div>
      <div><ResourceStatus /></div>
    </div>
  );
}
