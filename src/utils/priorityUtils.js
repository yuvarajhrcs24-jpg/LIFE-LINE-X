export const PRIORITIES = { high: 3, medium: 2, low: 1 };
export const PRIORITY_COLORS = { high: 'red', medium: 'yellow', low: 'green' };
export const PRIORITY_LABELS = { high: '🔴 High', medium: '🟡 Medium', low: '🟢 Low' };

export function sortByPriority(items) {
  return [...items].sort((a, b) => (PRIORITIES[b.priority] || 0) - (PRIORITIES[a.priority] || 0));
}

export function getPriorityColor(priority) {
  const map = { high: '#ef4444', medium: '#f59e0b', low: '#22c55e' };
  return map[priority] || '#6b7280';
}

export function getStatusColor(status) {
  const map = { pending: '#f59e0b', accepted: '#3b82f6', 'in-progress': '#8b5cf6', resolved: '#22c55e', cancelled: '#6b7280' };
  return map[status] || '#6b7280';
}

export function autoAssignVolunteers(request, volunteers) {
  return volunteers
    .filter(v => v.available)
    .sort((a, b) => {
      const distA = a.distanceToRequest || 999;
      const distB = b.distanceToRequest || 999;
      const skillMatchA = (a.skills || []).some(s => (request.type || '').includes(s)) ? 0 : 1;
      const skillMatchB = (b.skills || []).some(s => (request.type || '').includes(s)) ? 0 : 1;
      return (skillMatchA + distA) - (skillMatchB + distB);
    })
    .slice(0, 3);
}
