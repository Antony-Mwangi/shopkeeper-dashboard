import Link from "next/link";
import { LayoutGrid, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo & Primary Nav */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-1.5 rounded-lg group-hover:rotate-6 transition-transform">
              <LayoutGrid size={22} className="text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900">
              Shop<span className="text-blue-600">Flow</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <div className="group relative">
              <button className="flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-blue-600 transition">
                Solutions <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
              </button>
              {/* Optional Dropdown would go here */}
            </div>
            <Link href="#features" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition">
              Pricing
            </Link>
            <Link href="#" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition">
              Enterprise
            </Link>
          </nav>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden sm:block px-5 py-2.5 text-sm font-bold text-slate-700 hover:text-blue-600 transition"
          >
            Log in
          </Link>
          
          <Link
            href="/register"
            className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95"
          >
            Start Free
          </Link>
          
          {/* Mobile Menu Toggle (Visual Only) */}
          <button className="md:hidden p-2 text-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

      </div>
    </header>
  );
}