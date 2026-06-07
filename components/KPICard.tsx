import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
}

export default function KPICard({ title, value, change, changeType = 'neutral', icon: Icon, iconColor = 'text-blue-600', iconBg = 'bg-blue-100' }: KPICardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 border-l-4 border-l-[#3d1cb3] p-3 md:p-5 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-xs md:text-sm text-gray-500 font-medium truncate">{title}</p>
          <p className="text-lg md:text-2xl font-bold text-[#3d1cb3] mt-1 truncate">{value}</p>
          {change && (
            <p className={cn('text-xs mt-1 font-medium truncate', {
              'text-green-600': changeType === 'positive',
              'text-red-500': changeType === 'negative',
              'text-gray-500': changeType === 'neutral',
            })}>
              {change}
            </p>
          )}
        </div>
        <div className={cn('w-9 h-9 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0', iconBg)}>
          <Icon size={18} className={iconColor} />
        </div>
      </div>
    </div>
  );
}
