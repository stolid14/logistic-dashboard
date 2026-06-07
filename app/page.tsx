import Link from 'next/link';
import { Package, MapPin, TrendingUp, CheckCircle, Truck, Users, BarChart3, AlertTriangle, PhoneOff, FileX, Clock, Globe, Server, Headphones, ChevronDown } from 'lucide-react';

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
          <a href="#deliverables" className="hover:text-white transition-colors">What You Get</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Link
            href="/dashboard"
            className="bg-[#ffe600] hover:bg-[#f5dc00] text-[#3d1cb3] px-5 py-2.5 rounded-lg font-bold transition-all duration-200 text-sm"
          >
            See Live Demo
          </Link>
          <a
            href="https://instagram.com/buildwithstolid"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-white/40 hover:text-white/70 text-[10px] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Developed by @buildwithstolid
          </a>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 px-4 py-1.5 rounded-full text-sm mb-6 border border-white/20">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Custom-built for Nigerian logistics companies
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-5 leading-tight">
          Your Logistics Company<br />Deserves Its Own <span className="text-[#ffe600]">Digital Platform</span>
        </h1>
        <p className="text-lg md:text-xl text-white/70 mb-4 max-w-2xl mx-auto leading-relaxed">
          We build you a fully branded logistics management dashboard — your domain, your data, your infrastructure.
          Track shipments, manage drivers, reconcile COD and serve customers professionally.
        </p>
        <p className="text-white/40 text-sm mb-10">Explore the live demo below — this is exactly what we build for you, with your company name and brand.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="bg-[#ffe600] hover:bg-[#f5dc00] text-[#3d1cb3] px-10 py-4 rounded-xl font-extrabold text-lg transition-all duration-200 shadow-lg"
          >
            Explore Live Demo →
          </Link>
          <a
            href="https://wa.me/message/buildwithstolid"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 border border-white/20"
          >
            Get a Custom Quote
          </a>
        </div>
      </div>

      {/* Pain Points */}
      <div id="pain-points" className="bg-[#2d1585] border-y border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-3">
            Still managing operations on WhatsApp and Excel?
          </h2>
          <p className="text-white/50 text-center text-sm mb-12 max-w-xl mx-auto">
            These are the problems costing Nigerian logistics companies money every single day
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: AlertTriangle, title: 'Drivers not remitting COD cash', desc: 'You have no system to track who collected what. Cash leaks happen daily with no proof.' },
              { icon: PhoneOff, title: 'Customers calling all day', desc: '"Where is my package?" — your team answers this 50 times a day instead of growing the business.' },
              { icon: FileX, title: 'No proof of delivery', desc: 'Paper waybills get lost. Customers deny receiving. You have no way to resolve disputes.' },
              { icon: Clock, title: 'No visibility on your fleet', desc: 'Drivers give excuses. You have no data on where they are, how long trips take or why deliveries fail.' },
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
              See how your platform would solve this →
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div id="features" className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-3">
          Everything built into your platform
        </h2>
        <p className="text-white/50 text-center text-sm mb-12 max-w-xl mx-auto">
          One dashboard to run your entire logistics operation — no third-party tools, no WhatsApp groups
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: MapPin, title: 'Real-Time Shipment Tracking', desc: 'Every shipment gets a live tracking page. Customers self-serve — no more calls to your team.' },
            { icon: Truck, title: 'Driver & Fleet Management', desc: 'Monitor every driver and vehicle. Track trips, ratings, availability and performance in real time.' },
            { icon: CheckCircle, title: 'COD Reconciliation', desc: 'Know exactly what each driver collected and what they remitted. Cash disputes become a thing of the past.' },
            { icon: Package, title: 'Digital Waybill Generation', desc: 'Generate and print professional waybills instantly. Every shipment fully documented from pickup to delivery.' },
            { icon: BarChart3, title: 'Revenue & Analytics Reports', desc: 'Revenue by route, driver performance, delivery success rates, peak hours — all in one place.' },
            { icon: Users, title: 'Customer Management (CRM)', desc: 'Full client history, shipment records, spending data and contact details for every customer.' },
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

      {/* What You Get / Deliverables */}
      <div id="deliverables" className="bg-[#2d1585] border-t border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-3">
            What you get when you work with us
          </h2>
          <p className="text-white/50 text-center text-sm mb-12 max-w-xl mx-auto">
            This is not a shared platform. We build it exclusively for your company.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Globe, title: 'Your Own Domain', desc: 'Deployed on your domain — e.g. app.yourcompany.com. Fully branded with your logo and company name.' },
              { icon: Server, title: 'Your Own Infrastructure', desc: 'Your database, your servers, your data. No sharing with other companies. Full ownership from day one.' },
              { icon: Headphones, title: 'Ongoing Support', desc: 'We don\'t disappear after launch. Training, bug fixes and updates are included post-delivery.' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-200">
                  <div className="w-14 h-14 bg-[#ffe600]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-[#ffe600]" size={26} />
                  </div>
                  <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="bg-white/5 border border-[#ffe600]/30 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-white font-bold text-lg mb-6 text-center">Full deliverables include:</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                'Fully branded dashboard with your logo & colors',
                'Shipment tracking & waybill management',
                'Driver and fleet management module',
                'COD collection and reconciliation system',
                'Customer-facing shipment tracking page',
                'Finance, invoicing and revenue reports',
                'Customer CRM with full shipment history',
                'Analytics dashboard with Nigerian route data',
                'SMS/WhatsApp notification integration',
                'Mobile responsive — works on all devices',
                'Source code ownership — it\'s yours',
                'Deployment on your domain & hosting',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle size={15} className="text-[#ffe600] mt-0.5 flex-shrink-0" />
                  <span className="text-white/70 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div id="stats" className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: 'Companies Using This', value: '500+', icon: Users },
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

      {/* FAQ */}
      <div id="faq" className="bg-[#2d1585] border-t border-white/10 py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-white/50 text-center text-sm mb-12">Everything you need to know before getting started</p>
          <div className="space-y-4">
            {[
              {
                q: 'Is this a shared platform or will it be built specifically for my company?',
                a: 'It is built exclusively for your company. You get your own codebase, your own database, your own domain and your own infrastructure. No other logistics company will have access to your data or your platform.',
              },
              {
                q: 'Can I use my own domain name like app.mycompany.com?',
                a: 'Yes. We deploy the finished platform on any domain you choose — whether it\'s a subdomain like app.yourcompany.com or a brand new domain entirely. You own the domain and the hosting.',
              },
              {
                q: 'How long does it take to build?',
                a: 'A standard build typically takes 2–4 weeks depending on the scope, number of custom features required and how quickly feedback is provided. We agree on a timeline before development starts.',
              },
              {
                q: 'Do I own the source code after it is built?',
                a: 'Yes. Full source code ownership is transferred to you upon project completion. You are not locked into us for maintenance — though we do offer ongoing support packages.',
              },
              {
                q: 'Can you integrate SMS and WhatsApp notifications for our customers?',
                a: 'Yes. We integrate SMS notifications (via Termii or similar Nigerian providers) and WhatsApp updates so your customers automatically receive shipment status updates without calling your team.',
              },
              {
                q: 'Can the platform handle multiple branches or hubs?',
                a: 'Yes. The platform supports multiple hubs, warehouses and pickup centres across different cities — Lagos, Abuja, Port Harcourt, Kano and more. We configure it to match your actual operations.',
              },
              {
                q: 'How much does it cost?',
                a: 'Pricing depends on the scope of your project — number of features, integrations needed, number of users and customisations. We offer a custom quote based on your specific requirements. Reach out to us to discuss.',
              },
              {
                q: 'What if I need changes after it is launched?',
                a: 'We include a post-launch support period for bug fixes and minor adjustments. For ongoing development, feature additions or major changes, we offer a retainer or project-based arrangement.',
              },
            ].map((faq, i) => (
              <details key={i} className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer text-white font-medium text-sm hover:bg-white/5 transition-colors list-none">
                  {faq.q}
                  <ChevronDown size={16} className="text-white/40 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
                </summary>
                <div className="px-6 pb-5 text-white/60 text-sm leading-relaxed border-t border-white/10 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-[#ffe600] py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-[#3d1cb3] mb-3">Ready to get your own platform?</h2>
          <p className="text-[#3d1cb3]/70 mb-3 text-base">
            Explore the live demo first — then reach out for a custom quote based on your company's scope and requirements.
          </p>
          <p className="text-[#3d1cb3]/50 text-sm mb-8">No commitment required. We'll discuss your needs and give you a clear breakdown.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="bg-[#3d1cb3] hover:bg-[#2d1585] text-white px-10 py-4 rounded-xl font-extrabold text-base transition-all duration-200 inline-block shadow-lg"
            >
              Explore the Demo →
            </Link>
            <a
              href="https://instagram.com/buildwithstolid"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-gray-100 text-[#3d1cb3] px-10 py-4 rounded-xl font-extrabold text-base transition-all duration-200 inline-block border border-[#3d1cb3]/20"
            >
              DM for Custom Quote
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#2d1585] border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white font-bold text-lg">LogiTrack <span className="text-[#ffe600]">NG</span></div>
          <div className="text-white/40 text-sm">© 2024 LogiTrack NG. Built for Nigerian Logistics Companies.</div>
          <a
            href="https://instagram.com/buildwithstolid"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-white/30 hover:text-white/60 text-xs transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Developed by @buildwithstolid
          </a>
        </div>
      </footer>
    </div>
  );
}
