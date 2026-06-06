'use client';
import { useState } from 'react';
import { Search, MapPin, Package, CheckCircle, Clock, Truck } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { shipments } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import StatusBadge from '@/components/StatusBadge';

export default function TrackingPage() {
  const [waybill, setWaybill] = useState('WB-2024-001');
  const [result, setResult] = useState<typeof shipments[0] | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    const found = shipments.find(s => s.waybill.toLowerCase() === waybill.toLowerCase().trim());
    if (found) {
      setResult(found);
      setNotFound(false);
    } else {
      setResult(null);
      setNotFound(true);
    }
  };

  const stepIcons = [Package, Truck, Truck, MapPin, CheckCircle];

  return (
    <DashboardLayout title="Shipment Tracking">
      <div className="max-w-2xl mx-auto">
        {/* Search */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 mb-6 text-center">
          <div className="w-14 h-14 bg-[#1e3a5f]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MapPin className="text-[#1e3a5f]" size={28} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Track Your Shipment</h1>
          <p className="text-gray-500 text-sm mb-6">Enter your waybill number to see real-time tracking updates</p>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                value={waybill}
                onChange={(e) => setWaybill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Enter waybill number e.g. WB-2024-001"
                className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-[#1e3a5f] hover:bg-[#16304f] text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors"
            >
              Track
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-3">Try demo: <button onClick={() => { setWaybill('WB-2024-001'); }} className="text-[#1e3a5f] underline">WB-2024-001</button></p>
        </div>

        {notFound && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-700 font-medium">Waybill not found</p>
            <p className="text-red-500 text-sm mt-1">Please check the waybill number and try again</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            {/* Summary card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Waybill Number</p>
                  <p className="text-xl font-bold text-[#1e3a5f] font-mono">{result.waybill}</p>
                </div>
                <StatusBadge status={result.status} size="md" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-gray-500 mb-1">From</p>
                  <p className="font-medium text-gray-900">{result.origin}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">To</p>
                  <p className="font-medium text-gray-900">{result.destination}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Description</p>
                  <p className="font-medium text-gray-900">{result.description}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Amount</p>
                  <p className="font-medium text-gray-900">{formatCurrency(result.amount)} {result.isCOD && <span className="text-orange-600">(COD)</span>}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Shipped</p>
                  <p className="font-medium text-gray-900">{result.date}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Est. Delivery</p>
                  <p className="font-medium text-gray-900">{result.estimatedDelivery}</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-6">Tracking Timeline</h3>
              <div className="space-y-0">
                {result.timeline.map((step, i) => {
                  const Icon = stepIcons[i] || Package;
                  return (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${step.completed ? 'bg-[#1e3a5f] text-white' : 'bg-gray-100 text-gray-400'}`}>
                          <Icon size={18} />
                        </div>
                        {i < result.timeline.length - 1 && (
                          <div className={`w-0.5 h-10 ${step.completed ? 'bg-[#1e3a5f]' : 'bg-gray-200'}`} />
                        )}
                      </div>
                      <div className="pb-8 flex-1">
                        <p className={`text-sm font-semibold ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>{step.status}</p>
                        {step.location && <p className="text-xs text-gray-500 mt-0.5">{step.location}</p>}
                        {step.time ? (
                          <p className="text-xs text-gray-400 mt-0.5">{step.time}</p>
                        ) : !step.completed && (
                          <p className="text-xs text-gray-300 mt-0.5 flex items-center gap-1"><Clock size={10} /> Pending</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Route Map</h3>
              <div className="bg-gradient-to-br from-[#e8f4f8] to-[#d4e8f0] rounded-xl h-40 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #1e3a5f 1px, transparent 1px)', backgroundSize: '25px 25px' }} />
                <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                  <span className="text-[10px] bg-white px-1 rounded mt-1 text-gray-700">{result.origin.split('(')[0].trim()}</span>
                </div>
                <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
                  <span className="text-[10px] bg-white px-1 rounded mt-1 text-gray-700">{result.destination.split('(')[0].trim()}</span>
                </div>
                <div className="absolute inset-x-16 top-1/2 border-t-2 border-dashed border-[#1e3a5f]/40" />
                <Truck className="text-[#f97316] z-10" size={24} />
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
