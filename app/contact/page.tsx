"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

/* ================= TYPES ================= */

type SectionProps = {
  children: React.ReactNode;
  className?: string;
};

type ContactCardProps = {
  title: string;
  desc: string;
  icon: string;
  value: string;
  href: string;
  buttonText: string;
  bg?: string;
};

/* ================= PAGE ================= */

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50 text-black">
      
      {/* TOP NAV */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-10 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        
        <Link
          href="/"
          className="text-sm font-medium text-slate-600 hover:text-blue-600 transition"
        >
          ← Back to Home
        </Link>

        <Link
          href="/login"
          className="text-sm font-semibold bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </Link>

      </div>

      {/* HERO */}
      <Section className="pt-6">
        <div className="max-w-3xl">
          
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Contact & Support
          </h1>

          <p className="mt-5 text-slate-600 text-sm md:text-base leading-relaxed">
            Need help with your ShopFlow account, products, sales tracking,
            or technical setup? Reach out through any of the channels below.
            Our support team is available to assist you quickly.
          </p>

        </div>
      </Section>

      {/* SUPPORT CARDS */}
      <Section className="bg-white border-y">
        
        <div className="grid md:grid-cols-3 gap-6">
          
          <Animated>
            <ContactCard
              icon="📧"
              title="Email Support"
              desc="Send us an email for account support, technical assistance, or business inquiries."
              value="antonymwangiw85@gmail.com"
              href="mailto:antonymwangiw85@gmail.com"
              buttonText="Send Email"
            />
          </Animated>

          <Animated>
            <ContactCard
              icon="💬"
              title="WhatsApp Support"
              desc="Chat with our support team directly on WhatsApp for faster responses."
              value="++254 711 668 298"
              href="https://wa.me/254711668298"
              buttonText="Chat on WhatsApp"
              bg="bg-green-600 hover:bg-green-700"
            />
          </Animated>

          <Animated>
            <ContactCard
              icon="📞"
              title="Call Support"
              desc="Speak directly with our support team during business hours."
              value="+254 711 668 298"
              href="tel:+254711668298"
              buttonText="Call Now"
              bg="bg-blue-600 hover:bg-blue-700"
            />
          </Animated>

        </div>

      </Section>

    
      <Section>
        
        <div className="grid md:grid-cols-3 gap-6">
          
          <Animated>
            <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-md h-full">
              
              <h3 className="text-lg font-bold">
                24/7 System Monitoring
              </h3>

              <p className="text-blue-100 text-sm mt-3 leading-relaxed">
                Our platform continuously monitors system performance
                to ensure reliable service for all users.
              </p>

            </div>
          </Animated>

          <Animated>
            <div className="bg-white border p-6 rounded-2xl shadow-sm h-full">
              
              <h3 className="font-semibold text-blue-600 text-lg">
                Fast Response Time
              </h3>

              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                Average support response time is usually under
                <span className="font-semibold text-black"> 2 hours</span>.
              </p>

            </div>
          </Animated>

          <Animated>
            <div className="bg-white border p-6 rounded-2xl shadow-sm h-full">
              
              <h3 className="font-semibold text-blue-600 text-lg">
                Multi-Channel Support
              </h3>

              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                Reach us via email, WhatsApp, or direct phone call anytime
                you need assistance.
              </p>

            </div>
          </Animated>

        </div>

      </Section>

      {/* FOOTER */}
      <Footer />

    </main>
  );
}


function Section({
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      className={`max-w-7xl mx-auto w-full px-6 md:px-10 py-16 md:py-20 ${className}`}
    >
      {children}
    </section>
  );
}



function ContactCard({
  title,
  desc,
  icon,
  value,
  href,
  buttonText,
  bg = "bg-blue-600 hover:bg-blue-700",
}: ContactCardProps) {
  return (
    <div className="bg-slate-50 border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      
      <div className="text-3xl mb-4">
        {icon}
      </div>

      <h3 className="font-bold text-lg text-blue-600">
        {title}
      </h3>

      <p className="text-sm text-slate-600 mt-3 leading-relaxed flex-1">
        {desc}
      </p>

      <div className="mt-5">
        <p className="text-sm font-semibold text-black break-all">
          {value}
        </p>
      </div>

      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        className={`mt-5 inline-flex items-center justify-center text-white py-3 px-4 rounded-xl font-semibold transition ${bg}`}
      >
        {buttonText}
      </a>

    </div>
  );
}



function Animated({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
}