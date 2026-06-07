'use client';
import { useState } from 'react';
import { X, AlertTriangle, CheckCircle, TrendingUp, DollarSign } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import KPICard from '@/components/KPICard';
import { codReconciliation, invoices, routeAnalytics } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function FinancePage() {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const totalRevenue = 18750000;
  const codCollected = codReconciliation.reduce((s, r) => s + r.cashCollected, 0);
  const codRemitted = codReconciliation.reduce((s, r) => s + r.remitted, 0);
  const codPending = codCollected - codRemitted;

  return (
    <DashboardLayout title="Finance & COD Management">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard title="Total Revenue (Jun)" value={formatCurrency(totalRevenue)} change="+14% vs May" changeType="positive" icon={TrendingUp} iconColor="text-green-600" iconBg="bg-green-100" />
        <KPICard title="COD Collected Today" value={formatCurrency(codCollected)} change="7 drivers active" changeType="neutral" icon={DollarSign} iconColor="text-orange-600" iconBg="bg-orange-100" />
        <KPICard title="COD Pending Remittance" value={formatCurrency(codPending)} change="2 drivers outstanding" changeType="negative" icon={AlertTriangle} iconColor="text-red-600" iconBg="bg-red-100" />
        <KPICard title="Invoices Paid (Jun)" value={formatCurrency(1297000)} change="3 invoices" changeType="positive" icon={CheckCircle} iconColor="text-blue-600" iconBg="bg-blue-100" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Route Revenue Chart */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Revenue by Route</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={routeAnalytics} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 10 }} tickFormatter={(v) => `₦${(v/1000000).toFixed(1)}M`} />
              <YAxis type="category" dataKey="route" tick={{ fontSize: 10 }} width={90} />
              <Tooltip formatter={(v) => [`₦${Number(v).toLocaleString()}`, 'Revenue']} />
              <Bar dataKey="revenue" fill="#3d1cb3" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* COD Reconciliation */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4">COD Reconciliation — Today</h2>
          {/* Mobile cards */}
          <div className="md:hidden space-y-2">
            {codReconciliation.map((r) => (
              <div key={r.driverId} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-800">{r.driver.split(' ')[0]}</span>
                  <span className={`text-xs font-bold ${r.difference < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {r.difference === 0 ? '✓ Cleared' : `₦${Math.abs(r.difference).toLocaleString()} pending`}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Collected: ₦{r.cashCollected.toLocaleString()}</span>
                  <span>Remitted: ₦{r.remitted.toLocaleString()}</span>
                </div>
              </div>
            ))}
            <div className="bg-gray-100 rounded-lg p-3 flex justify-between text-xs font-bold text-gray-800">
              <span>Total pending: <span className="text-red-600">₦{codPending.toLocaleString()}</span></span>
              <span>Collected: ₦{codCollected.toLocaleString()}</span>
            </div>
          </div>
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-500 pb-2">Driver</th>
                  <th className="text-right text-xs font-semibold text-gray-500 pb-2">Collected</th>
                  <th className="text-right text-xs font-semibold text-gray-500 pb-2">Remitted</th>
                  <th className="text-right text-xs font-semibold text-gray-500 pb-2">Diff</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {codReconciliation.map((r) => (
                  <tr key={r.driverId}>
                    <td className="py-2.5 text-xs text-gray-700">{r.driver.split(' ')[0]}</td>
                    <td className="py-2.5 text-xs text-right text-gray-700">₦{r.cashCollected.toLocaleString()}</td>
                    <td className="py-2.5 text-xs text-right text-gray-700">₦{r.remitted.toLocaleString()}</td>
                    <td className="py-2.5 text-xs text-right font-semibold">
                      <span className={r.difference < 0 ? 'text-red-600' : 'text-green-600'}>
                        {r.difference === 0 ? '✓' : `₦${Math.abs(r.difference).toLocaleString()}`}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t-2 border-gray-200">
                <tr>
                  <td className="pt-2.5 text-xs font-bold text-gray-800">Total</td>
                  <td className="pt-2.5 text-xs font-bold text-right text-gray-800">₦{codCollected.toLocaleString()}</td>
                  <td className="pt-2.5 text-xs font-bold text-right text-gray-800">₦{codRemitted.toLocaleString()}</td>
                  <td className="pt-2.5 text-xs font-bold text-right text-red-600">₦{codPending.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      {/* Invoices */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-4 md:p-5 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-gray-800">Invoices</h2>
          <button
            onClick={() => setShowInvoiceModal(true)}
            className="bg-[#ffe600] hover:bg-[#f5dc00] text-[#3d1cb3] px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 w-full sm:w-auto min-h-[44px]"
          >
            + Generate Invoice
          </button>
        </div>
        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-gray-100">
          {invoices.map((inv) => (
            <div key={inv.id} className="p-4 hover:bg-[#f4f3ff] transition-colors">
              <div className="flex items-start justify-between mb-1">
                <span className="font-mono text-[#3d1cb3] text-sm font-bold">{inv.id}</span>
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                  inv.status === 'Paid' ? 'bg-green-100 text-green-800' :
                  inv.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>{inv.status}</span>
              </div>
              <div className="text-sm text-gray-700">{inv.customer}</div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>{inv.date} → Due {inv.dueDate}</span>
                <span className="font-semibold text-gray-800">{formatCurrency(inv.amount)}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f4f3ff]">
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 uppercase tracking-wider">Invoice #</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 uppercase tracking-wider">Customer</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 uppercase tracking-wider">Amount</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 uppercase tracking-wider">Date</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 uppercase tracking-wider">Due Date</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-[#f4f3ff]">
                  <td className="px-4 py-3 text-sm font-mono text-[#3d1cb3] font-medium">{inv.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{inv.customer}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{formatCurrency(inv.amount)}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{inv.date}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{inv.dueDate}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                      inv.status === 'Paid' ? 'bg-green-100 text-green-800' :
                      inv.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>{inv.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generate Invoice Modal */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center sm:p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-bold">Generate Invoice</h2>
              <button onClick={() => setShowInvoiceModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
            </div>
            <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setShowInvoiceModal(false); }}>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Customer</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                  {['Konga Online Shopping', 'Jumia Nigeria', 'MTN Nigeria', 'Dangote Industries', 'GTBank Nigeria'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Period From</label>
                  <input type="text" defaultValue="01/06/2024" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Period To</label>
                  <input type="text" defaultValue="30/06/2024" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Due Date</label>
                <input type="text" defaultValue="15/07/2024" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowInvoiceModal(false)} className="flex-1 border border-gray-200 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 bg-[#ffe600] hover:bg-[#f5dc00] text-[#3d1cb3] rounded-lg py-2.5 text-sm font-medium font-bold transition-all duration-200">Generate</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
