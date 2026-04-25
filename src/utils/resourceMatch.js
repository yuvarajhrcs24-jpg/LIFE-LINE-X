export function matchResourcesToRequest(request, resources) {
  const typeMap = {
    medical: ['medical', 'hospital', 'first_aid'],
    food: ['food', 'kitchen', 'relief'],
    shelter: ['shelter', 'camp'],
    water: ['water', 'supply'],
    rescue: ['rescue', 'ngo'],
  };
  const wanted = typeMap[request.type] || ['shelter'];
  return resources.filter(r => wanted.some(t => (r.type || '').includes(t)) && r.status !== 'unavailable');
}

export function predictResourceShortage(resources, requests) {
  const demand = {};
  requests.filter(r => r.status !== 'resolved').forEach(r => { demand[r.type] = (demand[r.type] || 0) + 1; });
  return resources.map(r => ({
    ...r,
    demand: demand[r.type] || 0,
    shortage: (demand[r.type] || 0) > (r.capacity || 10),
    trend: (demand[r.type] || 0) > (r.capacity || 10) ? 'critical' : (demand[r.type] || 0) > (r.capacity || 10) * 0.7 ? 'warning' : 'ok'
  }));
}
