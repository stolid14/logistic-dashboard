import Link from 'next/link';
import { Package, MapPin, TrendingUp, CheckCircle, Star, Truck, Users, BarChart3 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a5f] via-[#2a4f80] to-[#1e3a5f]">

      {/* Buildwithstolid Brand Banner */}
      <div className="relative bg-[#3d1cb3] overflow-hidden">
        {/* decorative circle top right */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#5b35d5] opacity-60" />
        <div className="relative max-w-7xl mx-auto px-6 py-10 md:py-14">
          {/* Tag */}
          <div className="inline-flex items-center border border-white/30 text-white/80 text-xs px-3 py-1 rounded-full mb-5">
            For Serious Founders
          </div>
          {/* Headline */}
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-2">
            You paid someone<br />to build it.
          </h2>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#ffe600] leading-tight mb-5">
            It never launched.
          </h2>
          {/* Divider */}
          <div className="w-16 h-0.5 bg-white/20 mb-5" />
          {/* Subtext */}
          <p className="text-white/70 text-base md:text-lg mb-7 max-w-xl leading-relaxed">
            Bad architecture. No ownership. No accountability.<br />
            We build differently. You own everything from day one.
          </p>
          {/* Brand logo row */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-[#3d1cb3] font-extrabold text-sm">B</span>
            </div>
            <span className="text-white font-bold text-base">Buildwithstolid</span>
          </div>
          {/* CTA + website row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="https://instagram.com/buildwithstolid"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#ffe600] hover:bg-yellow-300 text-[#3d1cb3] font-extrabold px-7 py-3.5 rounded-full text-sm transition-colors"
            >
              DM us to start your build &nbsp;&raquo;&raquo;
            </a>
            <a
              href="https://buildwithstolid.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 text-sm hover:text-white transition-colors"
            >
              buildwithstolid.com
            </a>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-white">
          LogiTrack <span className="text-[#f97316]">NG</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-white/80">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#stats" className="hover:text-white transition-colors">Stats</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <Link
          href="/dashboard"
          className="bg-[#f97316] hover:bg-[#ea6c0a] text-white px-5 py-2.5 rounded-lg font-semibold transition-colors text-sm"
        >
          Login to Dashboard
        </Link>
      </nav>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-24 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 px-4 py-1.5 rounded-full text-sm mb-6">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Live Platform — Trusted by 500+ Companies
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Nigeria&apos;s Smartest<br />
          <span className="text-[#f97316]">Logistics Platform</span>
        </h1>
        <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
          Track shipments in real-time, manage your fleet, reconcile COD payments, and grow your logistics business across Lagos, Abuja, Port Harcourt and beyond.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="bg-[#f97316] hover:bg-[#ea6c0a] text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors"
          >
            Try Demo — Free Access
          </Link>
          <Link
            href="/tracking"
            className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors border border-white/20"
          >
            Track a Shipment
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div id="stats" className="bg-white/5 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Partner Companies', value: '500+', icon: Users },
            { label: 'Deliveries Completed', value: '2M+', icon: Package },
            { label: 'Platform Uptime', value: '99.2%', icon: TrendingUp },
            { label: 'Nigerian Cities Covered', value: '36', icon: MapPin },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <Icon className="mx-auto mb-2 text-[#f97316]" size={28} />
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-white/60 text-sm mt-1">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Features */}
      <div id="features" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-white text-center mb-4">
          Built for Nigerian Logistics
        </h2>
        <p className="text-white/60 text-center mb-12 max-w-xl mx-auto">
          Every feature designed around the real challenges of logistics in Nigeria
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: MapPin, title: 'Real-time Tracking', desc: 'Customers get live updates on Lagos-Abuja-PH routes. No more &quot;where is my package&quot; calls.' },
            { icon: Truck, title: 'Fleet Management', desc: 'Track your vans, buses, motorcycles and tricycles. Know who is where at all times.' },
            { icon: CheckCircle, title: 'COD Reconciliation', desc: 'Cash on Delivery is 60% of Nigeria\'s market. We make reconciliation fraud-proof.' },
            { icon: Package, title: 'Waybill Generation', desc: 'Digital waybills replace paper. Auto-generate invoices for Konga, Jumia and corporate clients.' },
            { icon: Star, title: 'Proof of Delivery', desc: 'Digital signatures and photo uploads eliminate delivery disputes.' },
            { icon: BarChart3, title: 'Analytics & Reports', desc: 'Revenue by route, driver performance, delivery success rates across Nigeria.' },
          ].map((feat) => {
            const Icon = feat.icon;
            return (
              <div key={feat.title} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 bg-[#f97316]/20 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="text-[#f97316]" size={22} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{feat.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#f97316] py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to transform your logistics?</h2>
          <p className="text-white/80 mb-8">Join 500+ Nigerian logistics companies already using LogiTrack NG</p>
          <Link
            href="/dashboard"
            className="bg-white text-[#f97316] px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors inline-block"
          >
            Access Demo Dashboard
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white font-bold text-lg">LogiTrack <span className="text-[#f97316]">NG</span></div>
          <div className="text-white/40 text-sm">
            © 2024 LogiTrack NG. Built for Nigerian Logistics Companies.
          </div>
          <div className="flex gap-4 text-white/60 text-sm">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
