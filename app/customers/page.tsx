'use client';
import { useState } from 'react';
import { Search, Building2, User, X } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { customers } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

export default function CustomersPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'All' | 'Business' | 'Individual'>('All');
  const [selected, setSelected] = useState<typeof customers[0] | null>(null);

  const filtered = customers.filter(c => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.city.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'All' || c.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <DashboardLayout title="Customers">
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none bg-white"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['All', 'Business', 'Individual'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors min-h-[44px] ${typeFilter === t ? 'bg-[#3d1cb3] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden divide-y divide-gray-100">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="p-4 hover:bg-[#f4f3ff] cursor-pointer transition-colors"
            onClick={() => setSelected(c)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${c.type === 'Business' ? 'bg-[#3d1cb3]' : 'bg-[#5b35d5]'}`}>
                  {c.type === 'Business' ? <Building2 size={14} /> : <User size={14} />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{c.name}</p>
                  <p className="text-xs text-gray-500">{c.city}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${c.type === 'Business' ? 'bg-blue-100 text-blue-800' : 'bg-[#f4f3ff] text-[#5b35d5]'}`}>{c.type}</span>
            </div>
            <div className="text-xs text-gray-500">{c.phone}</div>
            <div className="flex items-center justify-between mt-2 text-xs">
              <span className="text-gray-500">{c.totalShipments} shipments</span>
              <span className="font-semibold text-[#3d1cb3]">{formatCurrency(c.totalSpent)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f4f3ff] border-b border-gray-200">
                {['Customer', 'Type', 'Contact', 'City', 'Total Shipments', 'Total Spent', 'Last Shipment'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 px-4 py-3 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  className="hover:bg-[#f4f3ff] cursor-pointer transition-colors"
                  onClick={() => setSelected(c)}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${c.type === 'Business' ? 'bg-[#3d1cb3]' : 'bg-[#5b35d5]'}`}>
                        {c.type === 'Business' ? <Building2 size={14} /> : <User size={14} />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{c.name}</p>
                        <p className="text-xs text-gray-500">{c.address}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.type === 'Business' ? 'bg-blue-100 text-blue-800' : 'bg-[#f4f3ff] text-[#5b35d5]'}`}>{c.type}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">
                    <div>{c.phone}</div>
                    <div className="text-gray-400">{c.email}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{c.city}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800 text-center">{c.totalShipments}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-[#3d1cb3]">{formatCurrency(c.totalSpent)}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{c.lastShipment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center sm:p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-bold">Customer Details</h2>
              <button onClick={() => setSelected(null)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-xl ${selected.type === 'Business' ? 'bg-[#3d1cb3]' : 'bg-[#5b35d5]'}`}>
                  {selected.type === 'Business' ? <Building2 size={22} /> : <User size={22} />}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{selected.name}</h3>
                  <p className="text-sm text-gray-500">{selected.type} • {selected.city}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  ['Phone', selected.phone],
                  ['Email', selected.email],
                  ['Address', selected.address],
                  ['City', selected.city],
                  ['Total Shipments', selected.totalShipments.toLocaleString()],
                  ['Total Spent', formatCurrency(selected.totalSpent)],
                  ['Last Shipment', selected.lastShipment],
                  ['Avg per Shipment', formatCurrency(Math.round(selected.totalSpent / selected.totalShipments))],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-gray-500 text-xs">{label}</p>
                    <p className="font-medium text-gray-900 mt-0.5 text-xs">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
