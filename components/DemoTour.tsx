'use client';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const steps = [
  {
    title: 'Welcome to LogiTrack NG',
    description: "Nigeria's smartest logistics platform — manage all your shipments, drivers, and finances in one place.",
    highlight: 'kpi-cards',
    position: 'center',
  },
  {
    title: 'Real-Time Shipment Tracking',
    description: 'Track any shipment in real-time across Nigeria. Click any waybill to see its full journey.',
    highlight: 'shipments',
    position: 'center',
  },
  {
    title: 'Live Driver & Fleet Management',
    description: 'Monitor your drivers and fleet live. See who is on trip, offline, or available instantly.',
    highlight: 'drivers',
    position: 'center',
  },
  {
    title: 'COD Payment Reconciliation',
    description: 'Reconcile Cash-on-Delivery payments instantly. Know who owes what at all times.',
    highlight: 'finance',
    position: 'center',
  },
  {
    title: 'Full Analytics Dashboard',
    description: 'Make data-driven decisions with full analytics — revenue trends, delivery rates, and driver performance.',
    highlight: 'analytics',
    position: 'center',
  },
];

export default function DemoTour() {
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(0);

  const current = steps[step];
  const isLast = step === steps.length - 1;

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => { setActive(true); setStep(0); }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#ffe600] hover:bg-[#f5dc00] text-[#3d1cb3] px-4 py-3 rounded-full shadow-lg font-semibold text-sm flex items-center gap-2 transition-all duration-200 hover:scale-105"
      >
        <span className="text-base">🚀</span>
        Start Demo Tour
      </button>

      {/* Overlay */}
      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Dark backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setActive(false)}
          />

          {/* Tour card */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 z-10">
            {/* Close */}
            <button
              onClick={() => setActive(false)}
              className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-lg text-gray-500"
            >
              <X size={18} />
            </button>

            {/* Step indicator */}
            <div className="flex gap-1.5 mb-4">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? 'bg-[#3d1cb3]' : 'bg-gray-200'}`}
                />
              ))}
            </div>

            {/* Step label */}
            <div className="text-xs font-semibold text-[#3d1cb3] uppercase tracking-wide mb-2">
              Step {step + 1} of {steps.length}
            </div>

            {/* Icon based on step */}
            <div className="text-4xl mb-3">
              {['📊', '🚚', '👥', '💰', '📈'][step]}
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-2">{current.title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">{current.description}</p>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep(s => s - 1)}
                disabled={step === 0}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              <button
                onClick={() => {
                  if (isLast) {
                    setActive(false);
                  } else {
                    setStep(s => s + 1);
                  }
                }}
                className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold bg-[#3d1cb3] hover:bg-[#2d1585] text-white transition-all duration-200"
              >
                {isLast ? 'Finish' : 'Next'}
                {!isLast && <ChevronRight size={16} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
