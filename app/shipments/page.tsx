'use client';
import { useState } from 'react';
import { Plus, Search, Filter, X, ChevronDown } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import StatusBadge from '@/components/StatusBadge';
import { shipments, ShipmentStatus } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

const statuses: ShipmentStatus[] = ['Pending', 'In Transit', 'Delivered', 'Failed', 'Returned'];

export default function ShipmentsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedShipment, setSelectedShipment] = useState<typeof shipments[0] | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  function printWaybill() {
    window.print();
  }

  const filtered = shipments.filter((s) => {
    const matchSearch = !search || s.waybill.toLowerCase().includes(search.toLowerCase()) || s.customer.toLowerCase().includes(search.toLowerCase()) || s.origin.toLowerCase().includes(search.toLowerCase()) || s.destination.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <DashboardLayout title="Shipments">
      {/* Filters */}
      <div className="flex flex-col gap-3 mb-5">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search waybill, customer, city..."
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3d1cb3]/20 bg-white min-h-[44px]"
            />
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none bg-white text-gray-700 cursor-pointer min-h-[44px]"
            >
              <option value="All">All Status</option>
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center justify-center gap-2 bg-[#3d1cb3] hover:bg-[#2d1585] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto min-h-[44px]"
        >
          <Plus size={16} />
          <span>Create Shipment</span>
        </button>
      </div>

      <div className="text-sm text-gray-500 mb-3">{filtered.length} shipments found</div>

      {/* Mobile Cards */}
      <div className="md:hidden bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden divide-y divide-gray-100">
        {filtered.map((s) => (
          <div
            key={s.id}
            className="p-4 hover:bg-[#f4f3ff] cursor-pointer transition-colors"
            onClick={() => setSelectedShipment(s)}
          >
            <div className="flex items-start justify-between mb-2">
              <span className="font-semibold text-[#3d1cb3] text-sm font-mono">{s.waybill}</span>
              <StatusBadge status={s.status} />
            </div>
            <div className="text-sm font-medium text-gray-800">{s.customer}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.customerPhone}</div>
            <div className="text-xs text-gray-400 mt-1">{s.origin} → {s.destination}</div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm font-semibold text-gray-800">
                {formatCurrency(s.amount)}
                {s.isCOD && <span className="ml-1 text-[10px] bg-[#f4f3ff] text-[#3d1cb3] px-1.5 py-0.5 rounded">COD</span>}
              </span>
              <span className="text-xs text-gray-400">{s.date}</span>
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
                {['Waybill #', 'Customer', 'Origin', 'Destination', 'Status', 'Driver', 'Amount (₦)', 'Date'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 px-4 py-3 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((s) => (
                <tr
                  key={s.id}
                  className="hover:bg-[#f4f3ff] cursor-pointer transition-colors"
                  onClick={() => setSelectedShipment(s)}
                >
                  <td className="px-4 py-3 text-sm font-mono font-semibold text-[#3d1cb3]">{s.waybill}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 max-w-[130px]">
                    <div className="truncate">{s.customer}</div>
                    <div className="text-xs text-gray-400">{s.customerPhone}</div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600 max-w-[120px]"><div className="truncate">{s.origin}</div></td>
                  <td className="px-4 py-3 text-xs text-gray-600 max-w-[120px]"><div className="truncate">{s.destination}</div></td>
                  <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                  <td className="px-4 py-3 text-sm text-gray-600">{s.driver}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">
                    {formatCurrency(s.amount)}
                    {s.isCOD && <span className="ml-1 text-[10px] bg-[#f4f3ff] text-[#3d1cb3] px-1.5 py-0.5 rounded">COD</span>}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedShipment && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center sm:p-4">
          {/* Waybill print area (hidden in screen, shown in print) */}
          <div className="waybill-print-area hidden">
            <div style={{ textAlign: 'center', borderBottom: '2px solid #3d1cb3', paddingBottom: 12, marginBottom: 16 }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: '#3d1cb3' }}>LogiTrack <span style={{ color: '#3d1cb3' }}>NG</span></div>
              <div style={{ fontSize: 12, color: '#555' }}>Nigeria&apos;s Smartest Logistics Platform</div>
            </div>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: '#888', textTransform: 'uppercase', letterSpacing: 2 }}>Waybill Number</div>
              <div style={{ fontSize: 32, fontWeight: 900, fontFamily: 'monospace', color: '#3d1cb3' }}>{selectedShipment.waybill}</div>
            </div>
            <div className="waybill-barcode" style={{ marginBottom: 20 }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20, borderTop: '1px solid #ddd', paddingTop: 16 }}>
              <div>
                <div style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', marginBottom: 4 }}>From</div>
                <div style={{ fontWeight: 700 }}>{selectedShipment.origin}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', marginBottom: 4 }}>To</div>
                <div style={{ fontWeight: 700 }}>{selectedShipment.destination}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', marginBottom: 4 }}>Customer</div>
                <div style={{ fontWeight: 600 }}>{selectedShipment.customer}</div>
                <div style={{ fontSize: 11, color: '#555' }}>{selectedShipment.customerPhone}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', marginBottom: 4 }}>Driver</div>
                <div style={{ fontWeight: 600 }}>{selectedShipment.driver}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', marginBottom: 4 }}>Description</div>
                <div>{selectedShipment.description}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', marginBottom: 4 }}>Weight</div>
                <div>{selectedShipment.weight} kg</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', marginBottom: 4 }}>Amount</div>
                <div style={{ fontWeight: 700, fontSize: 18, color: '#3d1cb3' }}>{formatCurrency(selectedShipment.amount)}{selectedShipment.isCOD ? ' (COD)' : ''}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', marginBottom: 4 }}>Date</div>
                <div>{selectedShipment.date}</div>
              </div>
            </div>
            <div style={{ borderTop: '1px dashed #ccc', paddingTop: 24, marginTop: 8, display: 'flex', gap: 40 }}>
              <div>Received by: ___________________________</div>
              <div>Date: _______________</div>
            </div>
          </div>

          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-lg font-bold text-gray-900">{selectedShipment.waybill}</h2>
                <p className="text-sm text-gray-500">{selectedShipment.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={printWaybill}
                  className="flex items-center gap-1.5 bg-[#ffe600] hover:bg-[#f5dc00] text-[#3d1cb3] px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  🖨️ Print Waybill
                </button>
                <button onClick={() => setSelectedShipment(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-gray-500">Customer:</span><br /><strong>{selectedShipment.customer}</strong></div>
              <div><span className="text-gray-500">Phone:</span><br /><strong>{selectedShipment.customerPhone}</strong></div>
              <div><span className="text-gray-500">Origin:</span><br /><strong>{selectedShipment.origin}</strong></div>
              <div><span className="text-gray-500">Destination:</span><br /><strong>{selectedShipment.destination}</strong></div>
              <div><span className="text-gray-500">Driver:</span><br /><strong>{selectedShipment.driver}</strong></div>
              <div><span className="text-gray-500">Amount:</span><br /><strong>{formatCurrency(selectedShipment.amount)} {selectedShipment.isCOD ? '(COD)' : ''}</strong></div>
              <div><span className="text-gray-500">Weight:</span><br /><strong>{selectedShipment.weight} kg</strong></div>
              <div><span className="text-gray-500">Status:</span><br /><StatusBadge status={selectedShipment.status} size="md" /></div>
              <div><span className="text-gray-500">Date:</span><br /><strong>{selectedShipment.date}</strong></div>
              <div><span className="text-gray-500">Est. Delivery:</span><br /><strong>{selectedShipment.estimatedDelivery}</strong></div>
            </div>
            {/* Timeline */}
            <div className="px-6 pb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Tracking Timeline</h3>
              <div className="space-y-0">
                {selectedShipment.timeline.map((step, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 ${step.completed ? 'bg-[#3d1cb3] border-[#3d1cb3]' : 'bg-white border-gray-300'}`} />
                      {i < selectedShipment.timeline.length - 1 && (
                        <div className={`w-0.5 h-8 ${step.completed ? 'bg-[#3d1cb3]' : 'bg-gray-200'}`} />
                      )}
                    </div>
                    <div className="pb-6">
                      <p className={`text-sm font-medium ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>{step.status}</p>
                      {step.location && <p className="text-xs text-gray-500">{step.location}</p>}
                      {step.time && <p className="text-xs text-gray-400">{step.time}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center sm:p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-lg max-h-[95vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 md:p-6 border-b sticky top-0 bg-white z-10">
              <h2 className="text-lg font-bold text-gray-900">Create New Shipment</h2>
              <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-gray-100 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"><X size={20} /></button>
            </div>
            <form className="p-4 md:p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setShowCreateModal(false); }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Customer Name</label>
                  <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3d1cb3]/20" placeholder="e.g. Konga Nigeria" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
                  <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3d1cb3]/20" placeholder="0801-234-5678" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Origin</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                    {['Lagos (Ikeja)', 'Lagos (VI)', 'Lagos (Lekki)', 'Abuja (Wuse)', 'Abuja (Garki)', 'Port Harcourt (GRA)', 'Kano (Bompai)', 'Ibadan (Ring Road)', 'Warri', 'Benin City'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Destination</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                    {['Abuja (Wuse II)', 'Lagos (Ikeja)', 'Port Harcourt (Trans-Amadi)', 'Kano (Sabon Gari)', 'Ibadan (Bodija)', 'Aba (Ariaria)', 'Enugu (Independence)', 'Warri (Effurun)', 'Benin City (GRA)'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Amount (₦)</label>
                  <input type="number" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3d1cb3]/20" placeholder="15000" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Weight (kg)</label>
                  <input type="number" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3d1cb3]/20" placeholder="5.0" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3d1cb3]/20" placeholder="Package description" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="cod" className="rounded" />
                <label htmlFor="cod" className="text-sm text-gray-700">Cash on Delivery (COD)</label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 bg-[#3d1cb3] text-white rounded-lg py-2.5 text-sm font-medium hover:bg-[#2d1585]">Create Shipment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
