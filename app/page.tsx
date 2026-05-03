// import Link from "next/link";
// import Footer from "@/components/Footer";
// import { 
//   BarChart3, 
//   Package, 
//   ShieldCheck, 
//   Zap, 
//   ArrowRight, 
//   TrendingUp, 
//   Layers 
// } from "lucide-react";

// export default function HomePage() {
//   return (
//     <main className="min-h-screen bg-white selection:bg-blue-100">
      
//       {/* --- HERO SECTION --- */}
//       <section className="relative pt-16 pb-24 overflow-hidden">
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
//           <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[100px] opacity-60" />
//         </div>

//         <div className="max-w-7xl mx-auto px-6 text-center">
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-900 text-xs font-bold mb-6">
//             <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
//             Trusted by 15,000+ Merchants
//           </div>

//           <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
//             Own your data. <span className="text-blue-600">Scale your shop.</span>
//           </h1>

//           <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
//             Stop guessing your profits. Our unified dashboard transforms your retail 
//             operations into a high-performance business engine.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
//             <Link
//               href="/register"
//               className="group bg-blue-600 text-white px-7 py-3 rounded-xl text-base font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
//             >
//               Get Started Free
//               <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
//             </Link>
//             <Link
//               href="/login"
//               className="px-7 py-3 rounded-xl text-base font-bold text-slate-700 hover:bg-slate-50 transition-colors"
//             >
//               View Demo
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* --- BENTO GRID --- */}
//       <section className="py-20 bg-slate-50">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="mb-12">
//             <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
//               Everything you need to grow.
//             </h2>
//             <p className="text-slate-500 text-base">Simple tools for complex operations.</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-5">
            
//             {/* Inventory Card */}
//             <div className="md:col-span-3 lg:col-span-4 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm group">
//               <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-105 transition-transform">
//                 <Package size={24} />
//               </div>
//               <h3 className="text-xl font-bold mb-3">Smart Inventory</h3>
//               <p className="text-slate-500 text-sm leading-relaxed">
//                 Real-time stock validation and automatic low-stock alerts to keep your shelves full.
//               </p>
//             </div>

//             {/* Sales Card */}
//             <div className="md:col-span-3 lg:col-span-8 bg-slate-900 p-8 rounded-3xl text-white flex flex-col justify-between relative overflow-hidden">
//               <div className="relative z-10">
//                 <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6">
//                   <TrendingUp size={24} />
//                 </div>
//                 <h3 className="text-2xl font-bold mb-3">Real-Time Sales Tracking</h3>
//                 <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
//                   Watch your revenue grow. Every transaction is calculated 
//                   instantly with automated profit margin reports.
//                 </p>
//               </div>
//               <div className="absolute right-[-5%] bottom-[-5%] w-48 h-48 bg-blue-600/20 blur-[60px] rounded-full" />
//             </div>

//             {/* Analytics Card */}
//             <div className="md:col-span-3 lg:col-span-4 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
//               <BarChart3 size={32} className="text-indigo-600 mb-6" />
//               <div>
//                 <h3 className="text-lg font-bold mb-2">Power Analytics</h3>
//                 <p className="text-slate-500 text-sm">Daily and yearly reports generated with one click.</p>
//               </div>
//             </div>

//             {/* UI Card */}
//             <div className="md:col-span-3 lg:col-span-4 bg-blue-600 p-8 rounded-3xl text-white flex flex-col justify-between">
//               <Layers size={32} className="mb-6" />
//               <div>
//                 <h3 className="text-lg font-bold mb-2">Fast Interface</h3>
//                 <p className="text-blue-100 text-sm">Record a sale in under 3 seconds on any device.</p>
//               </div>
//             </div>

//             {/* Security Card */}
//             <div className="md:col-span-6 lg:col-span-4 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
//               <ShieldCheck size={32} className="text-emerald-600 mb-6" />
//               <div>
//                 <h3 className="text-lg font-bold mb-2">Secure & Private</h3>
//                 <p className="text-slate-500 text-sm">Encrypted data backups to protect your business.</p>
//               </div>
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* --- STATS SECTION --- */}
//       <section className="py-16 border-y border-slate-100">
//         <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
//           <div>
//             <div className="text-3xl font-bold text-slate-900 mb-1">99.9%</div>
//             <div className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Uptime</div>
//           </div>
//           <div>
//             <div className="text-3xl font-bold text-slate-900 mb-1">24/7</div>
//             <div className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Support</div>
//           </div>
//           <div>
//             <div className="text-3xl font-bold text-slate-900 mb-1">$0</div>
//             <div className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Setup Fee</div>
//           </div>
//           <div>
//             <div className="text-3xl font-bold text-slate-900 mb-1">10ms</div>
//             <div className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Latency</div>
//           </div>
//         </div>
//       </section>

//       {/* --- CTA SECTION --- */}
//       <section className="py-24 px-6">
//         <div className="max-w-4xl mx-auto bg-slate-900 rounded-[2rem] p-10 md:p-16 text-center relative overflow-hidden">
//           <div className="relative z-10">
//             <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
//               Ready to professionalize?
//             </h2>
//             <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
//               Join the thousands of smart shopkeepers who made the switch today.
//             </p>
//             <Link
//               href="/register"
//               className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl text-base font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/10"
//             >
//               Start Free Trial
//             </Link>
//           </div>
//         </div>
//       </section>
//       <Footer/>
//     </main>
    
//   );

// }


import Link from "next/link";
import Footer from "@/components/Footer";
import { 
  BarChart3, 
  Package, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  TrendingUp, 
  Layers,
  ChevronRight,
  CheckCircle2
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 antialiased">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        {/* Background Mesh Gradient */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-50/60 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-indigo-50/50 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 border border-slate-900/10 text-slate-900 text-[13px] font-semibold mb-8 animate-in fade-in slide-in-from-bottom-3 duration-1000">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              Trusted by 15,000+ Merchants Worldwide
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-[-0.04em] leading-[1.1] mb-8 text-balance">
              Own your data. <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Scale your retail empire.</span>
            </h1>

            <p className="text-xl text-slate-600 max-w-2xl mb-12 leading-relaxed font-medium">
              Stop guessing your profits. Our unified dashboard transforms your retail 
              operations into a high-performance business engine.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Link
                href="/register"
                className="group bg-slate-900 text-white px-8 py-4 rounded-full text-base font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center gap-2"
              >
                Get Started Free
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/login"
                className="group px-8 py-4 rounded-full text-base font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
              >
                Book a Demo
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- BENTO GRID SECTION --- */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 mb-4">The Platform</h2>
            <h3 className="text-4xl font-bold tracking-tight text-slate-900 mb-6">
              Everything you need to grow without the headache.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Sales Tracking (Large) */}
            <div className="md:col-span-8 bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="bg-blue-600/20 w-12 h-12 rounded-2xl flex items-center justify-center text-blue-400 mb-8 border border-blue-400/20">
                    <TrendingUp size={24} />
                  </div>
                  <h4 className="text-3xl font-bold mb-4">Real-Time Revenue Logic</h4>
                  <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                    Watch your revenue grow. Every transaction is calculated 
                    instantly with automated profit margin reports and tax ready data.
                  </p>
                </div>
                <div className="mt-12 flex gap-4">
                  <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-xs font-mono">LIVE_FEED_ACTIVE</div>
                  <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-xs font-mono">MARGIN_SYNC_ON</div>
                </div>
              </div>
              {/* Abstract Glow */}
              <div className="absolute right-[-10%] top-[-10%] w-80 h-80 bg-blue-600/20 blur-[100px] rounded-full group-hover:bg-blue-600/30 transition-colors duration-700" />
            </div>

            {/* Inventory (Small) */}
            <div className="md:col-span-4 bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
              <div className="bg-indigo-50 w-12 h-12 rounded-2xl flex items-center justify-center text-indigo-600 mb-8">
                <Package size={24} />
              </div>
              <h4 className="text-2xl font-bold mb-4">Smart Stock</h4>
              <p className="text-slate-500 text-base leading-relaxed">
                Predictive stock validation and low-stock alerts powered by your sales velocity.
              </p>
            </div>

            {/* Power Analytics */}
            <div className="md:col-span-4 bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm group">
              <BarChart3 size={32} className="text-blue-600 mb-8" />
              <h4 className="text-xl font-bold mb-2">Power Analytics</h4>
              <p className="text-slate-500 text-sm">Deep-dive reports generated in milliseconds. No more spreadsheets.</p>
            </div>

            {/* Fast UI */}
            <div className="md:col-span-4 bg-blue-600 rounded-[2.5rem] p-10 text-white group">
              <Zap size={32} className="mb-8 text-blue-200" />
              <h4 className="text-xl font-bold mb-2">Fast Interface</h4>
              <p className="text-blue-100 text-sm">Record a sale in under 3 seconds. Optimized for mobile and tablet hardware.</p>
            </div>

            {/* Security */}
            <div className="md:col-span-4 bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm group">
              <ShieldCheck size={32} className="text-emerald-600 mb-8" />
              <h4 className="text-xl font-bold mb-2">Enterprise Security</h4>
              <p className="text-slate-500 text-sm">Bank-grade encryption for every transaction and encrypted daily backups.</p>
            </div>

          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-20 border-y border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { label: "Platform Uptime", value: "99.99%" },
              { label: "Global Support", value: "24/7" },
              { label: "Implementation", value: "$0 Fee" },
              { label: "API Latency", value: "<12ms" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-4xl font-bold tracking-tighter mb-2">{stat.value}</span>
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
              Ready to professionalize your workflow?
            </h2>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-10">
              {['No credit card required', 'Cancel anytime', 'Instant setup'].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-400 text-sm">
                  <CheckCircle2 size={16} className="text-blue-500" />
                  {item}
                </div>
              ))}
            </div>
            <Link
              href="/register"
              className="inline-block bg-blue-600 text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-blue-500 transition-all shadow-2xl shadow-blue-600/20 active:scale-95"
            >
              Start Your 14-Day Free Trial
            </Link>
          </div>
          {/* Subtle Background Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent" />
        </div>
      </section>

      <Footer/>
    </main>
  );
}