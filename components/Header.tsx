'use client';
import { Menu, Bell, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
}

export default function Header({ onMenuClick, title }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-600">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#f97316] rounded-full"></span>
        </button>
        <div className="flex items-center gap-2 pl-3 border-l border-gray-200 cursor-pointer hover:bg-gray-50 rounded-lg px-2 py-1">
          <div className="w-8 h-8 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white text-xs font-bold">
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
