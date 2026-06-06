'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { stateDeliveries, revenueData, routeAnalytics } from '@/lib/mock-data';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid,
} from 'recharts';

function N(n: number) { return `₦${n.toLocaleString('en-NG')}`; }

const peakData = [
  { hour: '6AM', mon: 12, tue: 8, wed: 15, thu: 20, fri: 18, sat: 25, sun: 5 },
  { hour: '8AM', mon: 45, tue: 52, wed: 38, thu: 61, fri: 55, sat: 70, sun: 15 },
  { hour: '10AM', mon: 78, tue: 82, wed: 65, thu: 90, fri: 85, sat: 95, sun: 30 },
  { hour: '12PM', mon: 60, tue: 70, wed: 55, thu: 75, fri: 80, sat: 88, sun: 40 },
  { hour: '2PM', mon: 85, tue: 90, wed: 72, thu: 95, fri: 92, sat: 100, sun: 45 },
  { hour: '4PM', mon: 70, tue: 75, wed: 60, thu: 80, fri: 88, sat: 85, sun: 35 },
  { hour: '6PM', mon: 40, tue: 45, wed: 35, thu: 50, fri: 60, sat: 65, sun: 20 },
  { hour: '8PM', mon: 15, tue: 18, wed: 12, thu: 20, fri: 25, sat: 30, sun: 8 },
];

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;
const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const maxPeak = 100;

function heatBg(value: number) {
  const pct = value / maxPeak;
  if (pct > 0.8) return { background: '#1e3a5f', color: 'white' };
  if (pct > 0.6) return { background: '#1e3a5f99', color: 'white' };
  if (pct > 0.4) return { background: '#1e3a5f55', color: '#1e3a5f' };
  if (pct > 0.2) return { background: '#1e3a5f22', color: '#4b5563' };
  return { background: '#f3f4f6', color: '#6b7280' };
}

export default function AnalyticsPage() {
  const totalDeliveries = stateDeliveries.reduce((s, d) => s + d.deliveries, 0);
  const totalRevenue = revenueData.reduce((s, d) => s + d.revenue, 0);

  return (
    <DashboardLayout title="Analytics">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: '30-Day Revenue', value: N(totalRevenue) },
          { label: '30-Day Deliveries', value: totalDeliveries.toLocaleString() },
          { label: 'Avg. Daily Revenue', value: N(Math.round(totalRevenue / 30)) },
          { label: 'Avg. Daily Deliveries', value: Math.round(totalDeliveries / 30) },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-400">{label}</p>
            <p className="text-xl font-bold text-gray-900 mt-1">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-800 mb-4">Revenue Trend — Last 30 Days</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={false} axisLine={false} />
              <YAxis tickFormatter={(v) => `₦${(v / 1000).toFixed(0)}k`} axisLine={false} tickLine={false} className="text-xs" width={55} />
              <Tooltip formatter={(v) => N(Number(v))} />
              <Line type="monotone" dataKey="revenue" stroke="#1e3a5f" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-800 mb-4">Deliveries by State</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={stateDeliveries}>
              <XAxis dataKey="state" axisLine={false} tickLine={false} className="text-xs" />
              <YAxis axisLine={false} tickLine={false} className="text-xs" />
              <Tooltip />
              <Bar dataKey="deliveries" fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-800 mb-4">Top Routes by Revenue</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={routeAnalytics} layout="vertical">
              <XAxis type="number" tickFormatter={(v) => `₦${(v / 1000000).toFixed(1)}M`} axisLine={false} tickLine={false} className="text-xs" />
              <YAxis type="category" dataKey="route" axisLine={false} tickLine={false} className="text-xs" width={100} />
              <Tooltip formatter={(v) => N(Number(v))} />
              <Bar dataKey="revenue" fill="#1e3a5f" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-800 mb-4">Peak Delivery Hours</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr>
                  <th className="text-left text-gray-400 font-normal pb-2 pr-2">Hour</th>
                  {dayLabels.map((d) => (
                    <th key={d} className="text-gray-400 font-normal pb-2 px-1 text-center">{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {peakData.map((row) => (
                  <tr key={row.hour}>
                    <td className="text-gray-500 pr-2 py-1 font-medium">{row.hour}</td>
                    {days.map((d) => {
                      const style = heatBg(row[d]);
                      return (
                        <td key={d} className="px-1 py-0.5">
                          <div
                            style={style}
                            className="w-8 h-7 rounded flex items-center justify-center text-xs font-medium"
                          >
                            {row[d]}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs text-gray-400">Low</span>
            <div className="flex gap-1">
              {['#f3f4f6', '#1e3a5f22', '#1e3a5f55', '#1e3a5f99', '#1e3a5f'].map((c, i) => (
                <div key={i} style={{ background: c }} className="w-5 h-3 rounded" />
              ))}
            </div>
            <span className="text-xs text-gray-400">High</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-800 mb-4">Daily Shipments — Last 30 Days</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={revenueData}>
            <XAxis dataKey="date" tick={false} axisLine={false} />
            <YAxis axisLine={false} tickLine={false} className="text-xs" />
            <Tooltip />
            <Bar dataKey="shipments" fill="#22c55e" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardLayout>
  );
}
