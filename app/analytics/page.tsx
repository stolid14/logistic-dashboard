'use client';
import DashboardLayout from '@/components/DashboardLayout';
import { revenueData, stateDeliveries, routeAnalytics } from '@/lib/mock-data';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';

const last30 = revenueData.slice(0, 30).map(d => ({ ...d, label: d.date.slice(0, 5) }));

const peakHours = [
  { hour: '6am', Mon: 12, Tue: 15, Wed: 10, Thu: 14, Fri: 18, Sat: 8 },
  { hour: '8am', Mon: 35, Tue: 42, Wed: 38, Thu: 40, Fri: 45, Sat: 20 },
  { hour: '10am', Mon: 65, Tue: 72, Wed: 68, Thu: 70, Fri: 75, Sat: 45 },
  { hour: '12pm', Mon: 55, Tue: 60, Wed: 58, Thu: 62, Fri: 70, Sat: 55 },
  { hour: '2pm', Mon: 78, Tue: 82, Wed: 75, Thu: 80, Fri: 85, Sat: 60 },
  { hour: '4pm', Mon: 90, Tue: 95, Wed: 88, Thu: 92, Fri: 98, Sat: 70 },
  { hour: '6pm', Mon: 75, Tue: 80, Wed: 72, Thu: 78, Fri: 88, Sat: 65 },
  { hour: '8pm', Mon: 40, Tue: 45, Wed: 38, Thu: 42, Fri: 55, Sat: 35 },
];

export default function AnalyticsPage() {
  return (
    <DashboardLayout title="Analytics & Reports">
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-gray-500">Showing data for June 2024</p>
        <div className="flex gap-2">
          {['7 Days', '30 Days', '90 Days'].map(p => (
            <button key={p} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${p === '30 Days' ? 'bg-[#3d1cb3] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Revenue Trend */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-5">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Revenue Trend — 30 Days</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={last30} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="label" tick={{ fontSize: 10 }} interval={4} />
            <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `₦${(v/1000).toFixed(0)}k`} />
            <Tooltip formatter={(v) => [`₦${Number(v).toLocaleString()}`, '']} />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#3d1cb3" strokeWidth={2} dot={false} name="Revenue" />
            <Line type="monotone" dataKey="cod" stroke="#5b35d5" strokeWidth={2} dot={false} name="COD" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        {/* Deliveries by State */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Deliveries by State</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={stateDeliveries} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis type="category" dataKey="state" tick={{ fontSize: 10 }} width={75} />
              <Tooltip />
              <Bar dataKey="deliveries" fill="#3d1cb3" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Routes */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Top Routes by Volume</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={routeAnalytics} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis type="category" dataKey="route" tick={{ fontSize: 10 }} width={95} />
              <Tooltip />
              <Bar dataKey="shipments" fill="#5b35d5" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Peak Hours Heatmap */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Peak Delivery Hours</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-center text-sm">
            <thead>
              <tr>
                <th className="text-xs text-gray-500 font-medium pb-2 text-left">Hour</th>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                  <th key={d} className="text-xs text-gray-500 font-medium pb-2 px-2">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {peakHours.map((row) => (
                <tr key={row.hour}>
                  <td className="text-xs text-gray-500 pr-4 py-1 text-left">{row.hour}</td>
                  {(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const).map(d => {
                    const val = row[d];
                    const intensity = Math.round((val / 100) * 9);
                    const bg = intensity > 7 ? 'bg-[#3d1cb3]' : intensity > 5 ? 'bg-[#5b35d5]' : intensity > 3 ? 'bg-[#c4b8f0]' : 'bg-[#f4f3ff]';
                    const text = intensity > 5 ? 'text-white' : 'text-gray-600';
                    return (
                      <td key={d} className="px-1 py-1">
                        <div className={`${bg} ${text} rounded text-xs py-1.5 px-2 font-medium`}>{val}</div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">* Darker = more deliveries. Data shows number of deliveries per hour per day</p>
      </div>
    </DashboardLayout>
  );
}
