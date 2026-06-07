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
    <div className="bg-white rounded-xl border border-gray-200 border-l-4 border-l-[#3d1cb3] p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-2xl font-bold text-[#3d1cb3] mt-1">{value}</p>
          {change && (
            <p className={cn('text-xs mt-1 font-medium', {
              'text-green-600': changeType === 'positive',
              'text-red-500': changeType === 'negative',
              'text-gray-500': changeType === 'neutral',
            })}>
              {change}
            </p>
          )}
        </div>
        <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0', iconBg)}>
          <Icon size={22} className={iconColor} />
        </div>
      </div>
    </div>
  );
}
