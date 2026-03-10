

import Link from "next/link";
import { Twitter, Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t pt-20 pb-10 w-full">
      <div className={`max-w-7xl mx-auto px-6 transition-all duration-300 ease-in-out
        lg:px-8`}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">ShopFlow</h3>
            <p className="text-gray-500 leading-relaxed mb-6">
              The world s most powerful commerce engine for scaling retail operations.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-400 hover:text-blue-600 transition"><Twitter size={20} /></Link>
              <Link href="#" className="text-gray-400 hover:text-blue-600 transition"><Github size={20} /></Link>
              <Link href="#" className="text-gray-400 hover:text-blue-600 transition"><Linkedin size={20} /></Link>
            </div>
          </div>

          
          <div>
            <h4 className="font-semibold text-gray-900 mb-6 uppercase text-xs tracking-widest">Product</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><Link href="#" className="hover:text-blue-600 transition">Inventory Tracking</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition">Sales Reports</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition">Staff Management</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition">API Docs</Link></li>
            </ul>
          </div>

          
          <div>
            <h4 className="font-semibold text-gray-900 mb-6 uppercase text-xs tracking-widest">Company</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><Link href="#" className="hover:text-blue-600 transition">About Us</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition">Contact Support</Link></li>
            </ul>
          </div>

          
          <div>
            <h4 className="font-semibold text-gray-900 mb-6 uppercase text-xs tracking-widest">Stay Updated</h4>
            <div className="flex flex-col gap-3">
              <p className="text-sm text-gray-500">Get the latest retail insights.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="bg-gray-50 border border-gray-200 rounded-l-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition">
                  <Mail size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-tighter">
              All Systems Operational
            </span>
          </div>
          <p className="text-gray-400 text-xs">
            © {new Date().getFullYear()} ShopFlow Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}