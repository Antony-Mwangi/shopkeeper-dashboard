import Link from "next/link";
import { 
  BarChart3, 
  Package, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  TrendingUp, 
  Layers 
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white selection:bg-blue-100">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-16 pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[100px] opacity-60" />
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-900 text-xs font-bold mb-6">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            Trusted by 15,000+ Merchants
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
            Own your data. <span className="text-blue-600">Scale your shop.</span>
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Stop guessing your profits. Our unified dashboard transforms your retail 
            operations into a high-performance business engine.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href="/register"
              className="group bg-blue-600 text-white px-7 py-3 rounded-xl text-base font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
            >
              Get Started Free
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="px-7 py-3 rounded-xl text-base font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* --- BENTO GRID --- */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
              Everything you need to grow.
            </h2>
            <p className="text-slate-500 text-base">Simple tools for complex operations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-5">
            
            {/* Inventory Card */}
            <div className="md:col-span-3 lg:col-span-4 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm group">
              <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-105 transition-transform">
                <Package size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Inventory</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Real-time stock validation and automatic low-stock alerts to keep your shelves full.
              </p>
            </div>

            {/* Sales Card */}
            <div className="md:col-span-3 lg:col-span-8 bg-slate-900 p-8 rounded-3xl text-white flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6">
                  <TrendingUp size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-3">Real-Time Sales Tracking</h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                  Watch your revenue grow. Every transaction is calculated 
                  instantly with automated profit margin reports.
                </p>
              </div>
              <div className="absolute right-[-5%] bottom-[-5%] w-48 h-48 bg-blue-600/20 blur-[60px] rounded-full" />
            </div>

            {/* Analytics Card */}
            <div className="md:col-span-3 lg:col-span-4 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <BarChart3 size={32} className="text-indigo-600 mb-6" />
              <div>
                <h3 className="text-lg font-bold mb-2">Power Analytics</h3>
                <p className="text-slate-500 text-sm">Daily and yearly reports generated with one click.</p>
              </div>
            </div>

            {/* UI Card */}
            <div className="md:col-span-3 lg:col-span-4 bg-blue-600 p-8 rounded-3xl text-white flex flex-col justify-between">
              <Layers size={32} className="mb-6" />
              <div>
                <h3 className="text-lg font-bold mb-2">Fast Interface</h3>
                <p className="text-blue-100 text-sm">Record a sale in under 3 seconds on any device.</p>
              </div>
            </div>

            {/* Security Card */}
            <div className="md:col-span-6 lg:col-span-4 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <ShieldCheck size={32} className="text-emerald-600 mb-6" />
              <div>
                <h3 className="text-lg font-bold mb-2">Secure & Private</h3>
                <p className="text-slate-500 text-sm">Encrypted data backups to protect your business.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-slate-900 mb-1">99.9%</div>
            <div className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Uptime</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900 mb-1">24/7</div>
            <div className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Support</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900 mb-1">$0</div>
            <div className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Setup Fee</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900 mb-1">10ms</div>
            <div className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Latency</div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto bg-slate-900 rounded-[2rem] p-10 md:p-16 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to professionalize?
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
              Join the thousands of smart shopkeepers who made the switch today.
            </p>
            <Link
              href="/register"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl text-base font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/10"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}