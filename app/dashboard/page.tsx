'use client';
import { Package, Truck, Users, AlertTriangle, CheckCircle, Clock, DollarSign } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import KPICard from '@/components/KPICard';
import StatusBadge from '@/components/StatusBadge';
import { shipments, revenueData } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const last7Days = revenueData.slice(0, 7).map(d => ({ ...d, label: d.date.slice(0, 5) }));

const statusCounts = shipments.reduce((acc, s) => {
  acc[s.status] = (acc[s.status] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

const pieData = [
  { name: 'Delivered', value: statusCounts['Delivered'] || 0, color: '#22c55e' },
  { name: 'In Transit', value: statusCounts['In Transit'] || 0, color: '#3b82f6' },
  { name: 'Pending', value: statusCounts['Pending'] || 0, color: '#eab308' },
  { name: 'Failed', value: statusCounts['Failed'] || 0, color: '#ef4444' },
  { name: 'Returned', value: statusCounts['Returned'] || 0, color: '#6b7280' },
];

const recentShipments = shipments.slice(0, 10);

export default function DashboardPage() {
  const todayRevenue = revenueData[5].revenue;
  const todayShipments = revenueData[5].shipments;

  return (
    <DashboardLayout title="Dashboard">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <KPICard title="Shipments Today" value={todayShipments.toString()} change="+12% vs yesterday" changeType="positive" icon={Package} iconColor="text-blue-600" iconBg="bg-blue-100" />
        <KPICard title="Pending" value={statusCounts['Pending']?.toString() || '0'} change="Awaiting pickup" changeType="neutral" icon={Clock} iconColor="text-yellow-600" iconBg="bg-yellow-100" />
        <KPICard title="Delivered" value={statusCounts['Delivered']?.toString() || '0'} change="+8% this week" changeType="positive" icon={CheckCircle} iconColor="text-green-600" iconBg="bg-green-100" />
        <KPICard title="Revenue Today" value={formatCurrency(todayRevenue)} change="+5.2% vs yesterday" changeType="positive" icon={DollarSign} iconColor="text-[#f97316]" iconBg="bg-orange-100" />
        <KPICard title="Active Drivers" value="8" change="2 offline today" changeType="neutral" icon={Users} iconColor="text-purple-600" iconBg="bg-purple-100" />
        <KPICard title="Failed Deliveries" value={statusCounts['Failed']?.toString() || '0'} change="-2 vs yesterday" changeType="positive" icon={AlertTriangle} iconColor="text-red-600" iconBg="bg-red-100" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Revenue — Last 7 Days</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={last7Days} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₦${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => [`₦${Number(v).toLocaleString()}`, 'Revenue']} />
              <Bar dataKey="revenue" fill="#1e3a5f" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Delivery Status</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={3}>
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Legend iconType="circle" iconSize={8} formatter={(v) => <span style={{ fontSize: 11 }}>{v}</span>} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Live Map Placeholder */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm mb-6">
        <h2 className="text-base font-semibold text-gray-800 mb-3">Live Fleet Map — Lagos & Environs</h2>
        <div className="relative bg-gradient-to-br from-[#e8f4f8] to-[#d4e8f0] rounded-lg h-48 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #1e3a5f 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          <div className="absolute top-8 left-1/4 flex flex-col items-center">
            <div className="w-4 h-4 bg-[#f97316] rounded-full border-2 border-white shadow-md animate-pulse" />
            <span className="text-[10px] text-gray-700 mt-1 font-medium bg-white px-1 rounded">Ikeja Hub</span>
          </div>
          <div className="absolute top-16 left-1/2 flex flex-col items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-md animate-pulse" />
            <span className="text-[10px] text-gray-700 mt-1 font-medium bg-white px-1 rounded">VI</span>
          </div>
          <div className="absolute bottom-12 right-1/3 flex flex-col items-center">
            <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-md" />
            <span className="text-[10px] text-gray-700 mt-1 font-medium bg-white px-1 rounded">Lekki</span>
          </div>
          <div className="absolute top-6 right-1/4">
            <Truck size={20} className="text-[#1e3a5f] opacity-70" />
          </div>
          <div className="absolute bottom-8 left-1/3">
            <Truck size={20} className="text-[#f97316]" />
          </div>
          <div className="text-center z-10">
            <div className="text-sm text-gray-600 font-medium bg-white/80 px-4 py-2 rounded-lg shadow-sm">
              8 vehicles tracked in real-time
            </div>
          </div>
        </div>
      </div>

      {/* Recent Shipments */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-800">Recent Shipments</h2>
          <a href="/shipments" className="text-sm text-[#1e3a5f] hover:underline font-medium">View all</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 uppercase tracking-wider">Waybill</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 uppercase tracking-wider">Customer</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 uppercase tracking-wider hidden md:table-cell">Route</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 uppercase tracking-wider">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 uppercase tracking-wider hidden sm:table-cell">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentShipments.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-mono font-medium text-[#1e3a5f]">{s.waybill}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 max-w-[150px] truncate">{s.customer}</td>
                  <td className="px-4 py-3 text-xs text-gray-500 hidden md:table-cell">
                    <span className="truncate block max-w-[200px]">{s.origin} → {s.destination}</span>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800 hidden sm:table-cell">{formatCurrency(s.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
