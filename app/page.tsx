import Link from 'next/link';
import { Package, MapPin, TrendingUp, CheckCircle, Star, Truck, Users, BarChart3, AlertTriangle, PhoneOff, FileX, Clock } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3d1cb3] via-[#5b35d5] to-[#2d1585]">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-white">
          LogiTrack <span className="text-[#ffe600]">NG</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-white/80 text-sm">
          <a href="#pain-points" className="hover:text-white transition-colors">Problems We Solve</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#stats" className="hover:text-white transition-colors">Numbers</a>
        </div>
        <Link
          href="/dashboard"
          className="bg-[#ffe600] hover:bg-[#f5dc00] text-[#3d1cb3] px-5 py-2.5 rounded-lg font-bold transition-all duration-200 text-sm"
        >
          See Live Demo
        </Link>
      </nav>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 px-4 py-1.5 rounded-full text-sm mb-6 border border-white/20">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Built specifically for Nigerian logistics companies
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-5 leading-tight">
          Stop Running Your<br />Logistics on <span className="text-[#ffe600]">WhatsApp & Excel</span>
        </h1>
        <p className="text-lg md:text-xl text-white/70 mb-4 max-w-2xl mx-auto leading-relaxed">
          Drivers stealing COD cash. Customers calling every hour. No idea where your vehicles are.
          LogiTrack NG fixes all of it — built for Lagos, Abuja, Port Harcourt and every route in between.
        </p>
        <p className="text-white/50 text-sm mb-10">No setup needed. Click below to see the full dashboard live.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="bg-[#ffe600] hover:bg-[#f5dc00] text-[#3d1cb3] px-10 py-4 rounded-xl font-extrabold text-lg transition-all duration-200 shadow-lg"
          >
            See the Dashboard →
          </Link>
          <Link
            href="/tracking"
            className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 border border-white/20"
          >
            Try Shipment Tracking
          </Link>
        </div>
      </div>

      {/* Pain Points */}
      <div id="pain-points" className="bg-[#2d1585] border-y border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-3">
            Sound familiar?
          </h2>
          <p className="text-white/50 text-center text-sm mb-12">These are the exact problems Nigerian logistics companies deal with every day</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: AlertTriangle, title: 'Drivers collecting COD and not remitting', desc: 'You have no way to track which driver collected what — disputes happen daily.' },
              { icon: PhoneOff, title: '"Where is my package?" calls all day', desc: 'Your customers have no visibility. You spend hours on the phone instead of growing.' },
              { icon: FileX, title: 'Paper waybills getting lost', desc: 'No delivery proof means no way to resolve disputes. Customers deny receiving.' },
              { icon: Clock, title: 'No idea where your vehicles are', desc: 'Drivers give excuses. You have no data on routes, delays, or idle time.' },
            ].map((pain) => {
              const Icon = pain.icon;
              return (
                <div key={pain.title} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all duration-200">
                  <div className="w-10 h-10 bg-[#ffe600]/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-[#ffe600]" size={20} />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-2">{pain.title}</h3>
                  <p className="text-white/50 text-xs leading-relaxed">{pain.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/dashboard"
              className="inline-block bg-[#ffe600] hover:bg-[#f5dc00] text-[#3d1cb3] px-8 py-3.5 rounded-xl font-extrabold text-sm transition-all duration-200"
            >
              See how LogiTrack NG solves this →
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div id="stats" className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: 'Partner Companies', value: '500+', icon: Users },
          { label: 'Deliveries Tracked', value: '2M+', icon: Package },
          { label: 'Platform Uptime', value: '99.2%', icon: TrendingUp },
          { label: 'Nigerian Cities Covered', value: '36', icon: MapPin },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="text-center">
              <Icon className="mx-auto mb-2 text-[#ffe600]" size={26} />
              <div className="text-3xl font-extrabold text-white">{stat.value}</div>
              <div className="text-white/50 text-xs mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Features */}
      <div id="features" className="bg-[#2d1585] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-3">
            Everything you need to run a modern logistics company
          </h2>
          <p className="text-white/50 text-center text-sm mb-12 max-w-xl mx-auto">
            One platform. No spreadsheets. No WhatsApp groups for operations.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: MapPin, title: 'Real-Time Shipment Tracking', desc: 'Every shipment has a live timeline. Customers track themselves — zero calls to your team.' },
              { icon: Truck, title: 'Fleet & Driver Management', desc: 'Know exactly where every vehicle and driver is. Track trips, performance and ratings.' },
              { icon: CheckCircle, title: 'COD Reconciliation', desc: 'Automatically track what each driver collected vs. remitted. No more cash disputes.' },
              { icon: Package, title: 'Digital Waybills', desc: 'Generate and print professional waybills instantly. Full delivery proof with every shipment.' },
              { icon: Star, title: 'Proof of Delivery', desc: 'Photo uploads and digital confirmation eliminate "I never received it" disputes.' },
              { icon: BarChart3, title: 'Analytics & Revenue Reports', desc: 'See your best routes, top customers, driver performance and revenue trends at a glance.' },
            ].map((feat) => {
              const Icon = feat.icon;
              return (
                <div key={feat.title} className="bg-white rounded-xl p-6 border-l-4 border-[#ffe600] hover:shadow-xl transition-all duration-200 shadow-sm">
                  <div className="w-11 h-11 bg-[#3d1cb3]/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="text-[#3d1cb3]" size={20} />
                  </div>
                  <h3 className="text-[#3d1cb3] font-bold text-base mb-2">{feat.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-[#ffe600] py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-[#3d1cb3] mb-3">See it working right now</h2>
          <p className="text-[#3d1cb3]/70 mb-8 text-base">
            No sign-up. No credit card. Just click and explore the full dashboard with real Nigerian logistics data.
          </p>
          <Link
            href="/dashboard"
            className="bg-[#3d1cb3] hover:bg-[#2d1585] text-white px-12 py-4 rounded-xl font-extrabold text-lg transition-all duration-200 inline-block shadow-lg"
          >
            Open the Dashboard →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#2d1585] border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white font-bold text-lg">LogiTrack <span className="text-[#ffe600]">NG</span></div>
          <div className="text-white/40 text-sm">© 2024 LogiTrack NG. Built for Nigerian Logistics Companies.</div>
          <div className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-white/30">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <a
              href="https://instagram.com/buildwithstolid"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-white/60 text-xs transition-colors"
            >
              Developed by @buildwithstolid
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
