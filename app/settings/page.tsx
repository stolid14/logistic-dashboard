'use client';
import { useState } from 'react';
import { Building2, Bell, DollarSign, Link2, Save } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';

export default function SettingsPage() {
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [whatsapp, setWhatsapp] = useState(false);
  const [flutterwave, setFlutterwave] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardLayout title="Settings">
      <div className="max-w-3xl space-y-6">
        {saved && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700 text-sm font-medium flex items-center gap-2">
            <Save size={16} /> Settings saved successfully
          </div>
        )}

        {/* Company Profile */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-lg bg-[#f4f3ff] flex items-center justify-center">
              <Building2 size={18} className="text-[#3d1cb3]" />
            </div>
            <h2 className="text-base font-semibold text-gray-800">Company Profile</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-medium text-gray-700 mb-1">Company Name</label>
              <input defaultValue="Speedway Logistics Ltd" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3d1cb3]/20" />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-medium text-gray-700 mb-1">Registration Number</label>
              <input defaultValue="RC-2019-789012" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3d1cb3]/20" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">Address</label>
              <input defaultValue="14 Ikorodu Road, Maryland, Lagos State" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3d1cb3]/20" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
              <input defaultValue="0801-SPEED-01" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3d1cb3]/20" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
              <input defaultValue="ops@speedwaylogistics.ng" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3d1cb3]/20" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">Logo Upload</label>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                <p className="text-sm text-gray-500">Drag and drop your logo here, or <span className="text-[#3d1cb3] cursor-pointer underline">browse files</span></p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 2MB</p>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-lg bg-[#f4f3ff] flex items-center justify-center">
              <Bell size={18} className="text-[#3d1cb3]" />
            </div>
            <h2 className="text-base font-semibold text-gray-800">Notification Settings</h2>
          </div>
          <div className="space-y-4">
            {[
              { label: 'SMS Alerts', desc: 'Send SMS to customers on delivery status updates', state: smsAlerts, setState: setSmsAlerts },
              { label: 'WhatsApp Integration', desc: 'Send WhatsApp messages for delivery notifications (requires WhatsApp Business API)', state: whatsapp, setState: setWhatsapp },
            ].map((item) => (
              <div key={item.label} className="flex items-start justify-between gap-4 py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-800">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
                <button
                  onClick={() => item.setState(!item.state)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${item.state ? 'bg-[#3d1cb3]' : 'bg-gray-200'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${item.state ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center">
              <DollarSign size={18} className="text-green-600" />
            </div>
            <h2 className="text-base font-semibold text-gray-800">Pricing Configuration</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Base Rate (per kg)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₦</span>
                <input defaultValue="500" className="w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3d1cb3]/20" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">COD Fee (%)</label>
              <input defaultValue="2.5" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3d1cb3]/20" />
            </div>
          </div>
          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs font-semibold text-gray-700 mb-3">Zone Pricing (₦ per km)</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { zone: 'Lagos Intra-city', rate: '1,200' },
                { zone: 'Lagos → Ogun', rate: '3,500' },
                { zone: 'Lagos → Ibadan', rate: '5,000' },
                { zone: 'Lagos → Abuja', rate: '12,000' },
                { zone: 'Lagos → PH', rate: '15,000' },
                { zone: 'Lagos → Kano', rate: '18,000' },
              ].map(z => (
                <div key={z.zone} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                  <span className="text-xs text-gray-600">{z.zone}</span>
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs">₦</span>
                    <input defaultValue={z.rate} className="w-20 border border-gray-200 rounded pl-5 pr-1 py-1 text-xs focus:outline-none text-right" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Integrations */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center">
              <Link2 size={18} className="text-purple-600" />
            </div>
            <h2 className="text-base font-semibold text-gray-800">Integrations</h2>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Flutterwave Payment Gateway', desc: 'Accept online payments via Flutterwave', state: flutterwave, setState: setFlutterwave, status: 'Connected' },
              { name: 'Google Maps API', desc: 'Enable live route tracking and distance calculation', state: true, setState: () => {}, status: 'Active' },
            ].map((integration) => (
              <div key={integration.name} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-800">{integration.name}</p>
                    <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">{integration.status}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{integration.desc}</p>
                </div>
                <button
                  onClick={() => integration.setState(!integration.state)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${integration.state ? 'bg-[#3d1cb3]' : 'bg-gray-200'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${integration.state ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-[#ffe600] hover:bg-[#f5dc00] text-[#3d1cb3] px-8 py-3 rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2 w-full sm:w-auto min-h-[48px]"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
