'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Building2, Bell, Wallet, Link2, Save } from 'lucide-react';

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors ${enabled ? 'bg-[#1e3a5f]' : 'bg-gray-200'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );
}

function Section({ title, icon: Icon, children }: { title: string; icon: React.ComponentType<{ size: number; className?: string }>; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gray-50">
        <Icon size={18} className="text-[#1e3a5f]" />
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, defaultValue, type = 'text' }: { label: string; defaultValue: string; type?: string }) {
  return (
    <div>
      <label className="text-xs font-medium text-gray-600 block mb-1">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
      />
    </div>
  );
}

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    sms: true,
    whatsapp: true,
    email: false,
    failedDelivery: true,
    cod: true,
    driverOffline: false,
  });
  const [integrations, setIntegrations] = useState({
    flutterwave: true,
    paystack: false,
    googleMaps: true,
    termii: true,
  });

  const toggle = (key: keyof typeof notifications) =>
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  const toggleInt = (key: keyof typeof integrations) =>
    setIntegrations((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <DashboardLayout title="Settings">
      <div className="max-w-2xl space-y-5">
        {/* Company Profile */}
        <Section title="Company Profile" icon={Building2}>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Company Name" defaultValue="Speedway Logistics Ltd" />
            <Field label="RC Number" defaultValue="RC-1234567" />
            <Field label="Contact Phone" defaultValue="0801-234-5678" />
            <Field label="Email Address" defaultValue="admin@speedway.ng" />
          </div>
          <Field label="Head Office Address" defaultValue="12 Muritala Mohammed Way, Yaba, Lagos" />
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="City" defaultValue="Lagos" />
            <Field label="State" defaultValue="Lagos State" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Company Logo</label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-[#1e3a5f] rounded-xl flex items-center justify-center mx-auto mb-2">
                <Building2 size={20} className="text-white" />
              </div>
              <p className="text-sm text-gray-500">Click to upload logo</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 2MB</p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-[#1e3a5f] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#163050] transition-colors">
            <Save size={14} />Save Profile
          </button>
        </Section>

        {/* Pricing */}
        <Section title="Pricing Configuration" icon={Wallet}>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: 'Local Delivery (per kg)', value: '₦350' },
              { label: 'State Delivery (per kg)', value: '₦800' },
              { label: 'Inter-State (per kg)', value: '₦1,200' },
              { label: 'Express Surcharge (%)', value: '50' },
              { label: 'COD Fee (%)', value: '2' },
              { label: 'Insurance (% of value)', value: '1' },
            ].map(({ label, value }) => (
              <div key={label}>
                <label className="text-xs font-medium text-gray-600 block mb-1">{label}</label>
                <input defaultValue={value} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1e3a5f]/20" />
              </div>
            ))}
          </div>
          <button className="flex items-center gap-2 bg-[#1e3a5f] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#163050] transition-colors">
            <Save size={14} />Update Pricing
          </button>
        </Section>

        {/* Notifications */}
        <Section title="Notifications" icon={Bell}>
          {[
            { key: 'sms' as const, label: 'SMS Alerts to Customers', desc: 'Send SMS on pickup, transit, and delivery' },
            { key: 'whatsapp' as const, label: 'WhatsApp Updates', desc: 'Auto-send WhatsApp messages via Termii' },
            { key: 'email' as const, label: 'Email Notifications', desc: 'Send email receipts and updates' },
            { key: 'failedDelivery' as const, label: 'Failed Delivery Alerts', desc: 'Notify admin on delivery failure' },
            { key: 'cod' as const, label: 'COD Reconciliation Reminders', desc: 'Daily driver COD reminders' },
            { key: 'driverOffline' as const, label: 'Driver Offline Alerts', desc: 'Alert when driver goes offline during shift' },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">{label}</p>
                <p className="text-xs text-gray-400">{desc}</p>
              </div>
              <Toggle enabled={notifications[key]} onChange={() => toggle(key)} />
            </div>
          ))}
        </Section>

        {/* Integrations */}
        <Section title="Integrations" icon={Link2}>
          {[
            { key: 'flutterwave' as const, label: 'Flutterwave', desc: 'Payment collection & disbursements' },
            { key: 'paystack' as const, label: 'Paystack', desc: 'Alternative payment gateway' },
            { key: 'googleMaps' as const, label: 'Google Maps', desc: 'Route planning & tracking maps' },
            { key: 'termii' as const, label: 'Termii (SMS/WhatsApp)', desc: 'Nigerian messaging API for customer updates' },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">{label}</p>
                <p className="text-xs text-gray-400">{desc}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-medium ${integrations[key] ? 'text-green-600' : 'text-gray-400'}`}>
                  {integrations[key] ? 'Connected' : 'Disconnected'}
                </span>
                <Toggle enabled={integrations[key]} onChange={() => toggleInt(key)} />
              </div>
            </div>
          ))}
        </Section>
      </div>
    </DashboardLayout>
  );
}
