const STYLES = {
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-300',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-300',
  low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-300',
};
const ICONS = { high: '🔴', medium: '🟡', low: '🟢' };

export default function PriorityBadge({ priority }) {
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border ${STYLES[priority] || STYLES.medium}`}>
      {ICONS[priority]} {priority?.charAt(0).toUpperCase() + priority?.slice(1)}
    </span>
  );
}
