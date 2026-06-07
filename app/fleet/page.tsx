'use client';
import { AlertTriangle } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import StatusBadge from '@/components/StatusBadge';
import { vehicles } from '@/lib/mock-data';

function isServiceOverdue(nextService: string): boolean {
  const [day, month, year] = nextService.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  return date < new Date();
}

export default function FleetPage() {
  const overdue = vehicles.filter(v => isServiceOverdue(v.nextService));

  return (
    <DashboardLayout title="Fleet Management">
      {/* Alerts */}
      {overdue.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5 flex items-start gap-3">
          <AlertTriangle className="text-amber-600 flex-shrink-0 mt-0.5" size={18} />
          <div>
            <p className="text-amber-800 font-semibold text-sm">Maintenance Alerts</p>
            <p className="text-amber-700 text-xs mt-0.5">
              {overdue.length} vehicle(s) are overdue for service: {overdue.map(v => v.plate).join(', ')}
            </p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Total Vehicles', value: vehicles.length, cls: 'text-gray-800' },
          { label: 'Available', value: vehicles.filter(v => v.status === 'Available').length, cls: 'text-green-600' },
          { label: 'On Trip', value: vehicles.filter(v => v.status === 'On Trip').length, cls: 'text-blue-600' },
          { label: 'Maintenance', value: vehicles.filter(v => v.status === 'Maintenance' || v.status === 'Inactive').length, cls: 'text-red-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <p className={`text-2xl font-bold ${s.cls}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden divide-y divide-gray-100">
        {vehicles.map((v) => {
          const overdueSvc = isServiceOverdue(v.nextService);
          return (
            <div key={v.id} className={`p-4 ${overdueSvc ? 'bg-amber-50/40' : ''}`}>
              <div className="flex items-start justify-between mb-2">
                <span className="font-mono text-[#3d1cb3] text-sm font-bold">{v.plate}</span>
                <StatusBadge status={v.status} />
              </div>
              <div className="text-sm text-gray-700">{v.type} — {v.model} ({v.year})</div>
              <div className="text-xs text-gray-500 mt-0.5">{v.driver}</div>
              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                <span>Last: {v.lastService}</span>
                <span className={`font-medium ${overdueSvc ? 'text-red-600' : ''}`}>
                  Next: {v.nextService}
                  {overdueSvc && <AlertTriangle size={10} className="inline ml-1 text-red-500" />}
                </span>
              </div>
              <div className="text-xs text-gray-400 mt-1">{v.mileage.toLocaleString()} km</div>
            </div>
          );
        })}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f4f3ff] border-b border-gray-200">
                {['Plate', 'Type', 'Model', 'Driver', 'Status', 'Last Service', 'Next Service', 'Mileage'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 px-4 py-3 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {vehicles.map((v) => {
                const overdueSvc = isServiceOverdue(v.nextService);
                return (
                  <tr key={v.id} className={`hover:bg-[#f4f3ff] transition-colors ${overdueSvc ? 'bg-amber-50/50' : ''}`}>
                    <td className="px-4 py-3 text-sm font-mono font-semibold text-[#3d1cb3]">{v.plate}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{v.type}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{v.model} ({v.year})</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{v.driver}</td>
                    <td className="px-4 py-3"><StatusBadge status={v.status} /></td>
                    <td className="px-4 py-3 text-xs text-gray-600">{v.lastService}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium ${overdueSvc ? 'text-red-600' : 'text-gray-600'}`}>
                        {v.nextService}
                        {overdueSvc && <AlertTriangle size={10} className="inline ml-1 text-red-500" />}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">{v.mileage.toLocaleString()} km</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
