'use client';
import { useState } from 'react';
import { Plus, Star, Phone, X, Search } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import StatusBadge from '@/components/StatusBadge';
import { drivers } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

export default function DriversPage() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<typeof drivers[0] | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const filtered = drivers.filter(d =>
    !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.vehiclePlate.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout title="Drivers & Fleet">
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search drivers..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none bg-white"
          />
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-[#1e3a5f] hover:bg-[#16304f] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          Add Driver
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Total Drivers', value: drivers.length, color: 'text-gray-800' },
          { label: 'On Trip', value: drivers.filter(d => d.status === 'On Trip').length, color: 'text-blue-600' },
          { label: 'Active', value: drivers.filter(d => d.status === 'Active').length, color: 'text-green-600' },
          { label: 'Offline', value: drivers.filter(d => d.status === 'Offline').length, color: 'text-gray-500' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Driver cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((driver) => (
          <div
            key={driver.id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelected(driver)}
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {driver.avatar.slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{driver.name}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Phone size={11} className="text-gray-400" />
                      <span className="text-xs text-gray-500">{driver.phone}</span>
                    </div>
                  </div>
                  <StatusBadge status={driver.status} />
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-lg font-bold text-[#1e3a5f]">{driver.todayDeliveries}</p>
                <p className="text-[10px] text-gray-500">Today</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-lg font-bold text-gray-800">{driver.totalDeliveries.toLocaleString()}</p>
                <p className="text-[10px] text-gray-500">Total</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <div className="flex items-center justify-center gap-0.5">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <p className="text-lg font-bold text-gray-800">{driver.rating}</p>
                </div>
                <p className="text-[10px] text-gray-500">Rating</p>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-gray-300" />
                {driver.vehicleType} • {driver.vehiclePlate}
              </span>
              <span>{formatCurrency(driver.earnings)}/mo</span>
            </div>
          </div>
        ))}
      </div>

      {/* Driver Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-bold">Driver Details</h2>
              <button onClick={() => setSelected(null)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white text-xl font-bold">
                  {selected.avatar.slice(0, 2)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{selected.name}</h3>
                  <StatusBadge status={selected.status} size="md" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  ['Phone', selected.phone],
                  ['Email', selected.email],
                  ['Vehicle Type', selected.vehicleType],
                  ['Plate Number', selected.vehiclePlate],
                  ['Join Date', selected.joinDate],
                  ['Today Deliveries', selected.todayDeliveries.toString()],
                  ['Total Deliveries', selected.totalDeliveries.toLocaleString()],
                  ['Rating', `${selected.rating}/5`],
                  ['Monthly Earnings', formatCurrency(selected.earnings)],
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

      {/* Add Driver Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-bold">Add New Driver</h2>
              <button onClick={() => setShowAdd(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
            </div>
            <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setShowAdd(false); }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                  <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20" placeholder="e.g. Chukwuemeka Obi" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
                  <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" placeholder="0801-234-5678" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" placeholder="driver@speedway.ng" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Vehicle Type</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                    {['Van', 'Bus', 'Motorcycle', 'Tricycle (Keke)'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Vehicle Plate</label>
                  <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" placeholder="LND-234-AB" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAdd(false)} className="flex-1 border border-gray-200 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 bg-[#1e3a5f] text-white rounded-lg py-2.5 text-sm font-medium hover:bg-[#16304f]">Add Driver</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
