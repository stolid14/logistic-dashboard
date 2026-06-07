'use client';
import { useState, useRef, useEffect } from 'react';
import { Menu, Bell, ChevronDown, Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { shipments, customers } from '@/lib/mock-data';

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
}

const NOTIFICATIONS = [
  {
    id: 1,
    text: 'COD not remitted: Kunle Adeyemi owes ₦34,000',
    time: '2 hrs ago',
    color: 'bg-red-50 border-red-200',
    dot: 'bg-red-500',
    label: 'text-red-700',
  },
  {
    id: 2,
    text: 'WB-2024-005 delivery failed — Warri',
    time: '3 hrs ago',
    color: 'bg-red-50 border-red-200',
    dot: 'bg-red-500',
    label: 'text-red-700',
  },
  {
    id: 3,
    text: 'Vehicle ABJ-456-KJ service overdue by 2 weeks',
    time: '1 day ago',
    color: 'bg-orange-50 border-orange-200',
    dot: 'bg-orange-500',
    label: 'text-orange-700',
  },
  {
    id: 4,
    text: 'New shipment from MTN Nigeria — ₦35,000',
    time: '5 hrs ago',
    color: 'bg-blue-50 border-blue-200',
    dot: 'bg-blue-500',
    label: 'text-blue-700',
  },
  {
    id: 5,
    text: 'Driver Musa Ibrahim back online',
    time: '30 min ago',
    color: 'bg-green-50 border-green-200',
    dot: 'bg-green-500',
    label: 'text-green-700',
  },
];

export default function Header({ onMenuClick, title }: HeaderProps) {
  const router = useRouter();
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const query = searchQuery.toLowerCase();
  const shipmentResults = query.length >= 2
    ? shipments.filter(s =>
        s.waybill.toLowerCase().includes(query) ||
        s.customer.toLowerCase().includes(query)
      ).slice(0, 5)
    : [];
  const customerResults = query.length >= 2
    ? customers.filter(c =>
        c.name.toLowerCase().includes(query) ||
        c.phone.toLowerCase().includes(query)
      ).slice(0, 3)
    : [];
  const hasResults = shipmentResults.length > 0 || customerResults.length > 0;

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-gray-800 pl-3 border-l-4 border-[#3d1cb3]">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <div ref={searchRef} className="relative hidden sm:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setSearchOpen(true); }}
              onFocus={() => setSearchOpen(true)}
              placeholder="Search waybills, customers..."
              className="pl-9 pr-8 py-2 border border-gray-200 rounded-lg text-sm w-56 focus:outline-none focus:ring-2 focus:ring-[#3d1cb3]/20 bg-gray-50"
            />
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(''); setSearchOpen(false); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {searchOpen && hasResults && (
            <div className="absolute top-full mt-1 left-0 w-72 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
              {shipmentResults.length > 0 && (
                <div>
                  <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase border-b border-gray-100">
                    Shipments
                  </div>
                  {shipmentResults.map(s => (
                    <button
                      key={s.id}
                      className="w-full text-left px-3 py-2.5 hover:bg-gray-50 flex items-center justify-between gap-2"
                      onClick={() => { router.push('/shipments'); setSearchOpen(false); setSearchQuery(''); }}
                    >
                      <span className="text-sm font-mono text-[#3d1cb3] font-semibold">{s.waybill}</span>
                      <span className="text-xs text-gray-500 truncate">{s.customer}</span>
                    </button>
                  ))}
                </div>
              )}
              {customerResults.length > 0 && (
                <div>
                  <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase border-b border-gray-100">
                    Customers
                  </div>
                  {customerResults.map(c => (
                    <button
                      key={c.id}
                      className="w-full text-left px-3 py-2.5 hover:bg-gray-50 flex items-center justify-between gap-2"
                      onClick={() => { router.push('/customers'); setSearchOpen(false); setSearchQuery(''); }}
                    >
                      <span className="text-sm text-gray-800">{c.name}</span>
                      <span className="text-xs text-gray-400">{c.phone}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {searchOpen && query.length >= 2 && !hasResults && (
            <div className="absolute top-full mt-1 left-0 w-72 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-4 text-sm text-gray-500 text-center">
              No results for &ldquo;{searchQuery}&rdquo;
            </div>
          )}
        </div>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setNotifOpen(o => !o)}
            className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-600"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center">
              5
            </span>
          </button>

          {notifOpen && (
            <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
                <span className="text-xs text-[#3d1cb3] font-medium cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="divide-y divide-gray-50">
                {NOTIFICATIONS.map(n => (
                  <div key={n.id} className={`px-4 py-3 flex gap-3 items-start border-l-4 ${n.color}`}>
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.dot}`} />
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-medium leading-snug ${n.label}`}>{n.text}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-gray-100 text-center">
                <button className="text-xs text-[#3d1cb3] font-medium hover:underline">View all notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* User */}
        <div className="flex items-center gap-2 pl-3 border-l border-gray-200 cursor-pointer hover:bg-gray-50 rounded-lg px-2 py-1">
          <div className="w-8 h-8 rounded-full bg-[#3d1cb3] flex items-center justify-center text-white text-xs font-bold">
            SL
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-medium text-gray-800">Speedway Logistics</div>
            <div className="text-xs text-gray-500">Admin</div>
          </div>
          <ChevronDown size={16} className="text-gray-400" />
        </div>
      </div>
    </header>
  );
}
