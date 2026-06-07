import { cn } from '@/lib/utils';
import { ShipmentStatus } from '@/lib/mock-data';

interface StatusBadgeProps {
  status: ShipmentStatus | string;
  size?: 'sm' | 'md';
}

const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
  'Pending': { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500' },
  'In Transit': { bg: 'bg-[#f4f3ff]', text: 'text-[#3d1cb3]', dot: 'bg-[#3d1cb3]' },
  'Delivered': { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
  'Failed': { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' },
  'Returned': { bg: 'bg-gray-100', text: 'text-gray-800', dot: 'bg-gray-500' },
  'Active': { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
  'Offline': { bg: 'bg-gray-100', text: 'text-gray-800', dot: 'bg-gray-400' },
  'On Trip': { bg: 'bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-500' },
  'Available': { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
  'Maintenance': { bg: 'bg-orange-100', text: 'text-orange-800', dot: 'bg-orange-500' },
  'Inactive': { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400' },
  'Paid': { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
  'Overdue': { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' },
};

export default function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const config = statusConfig[status] || { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400' };
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full font-medium', config.bg, config.text, size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm')}>
      <span className={cn('rounded-full flex-shrink-0', config.dot, size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2')} />
      {status}
    </span>
  );
}
