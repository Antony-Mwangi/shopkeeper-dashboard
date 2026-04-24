"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

/* ================= TYPES ================= */

type SectionProps = {
  children: React.ReactNode;
  className?: string;
};

type SupportCardProps = {
  title: string;
  desc: string;
  icon: string;
};

/* ================= PAGE ================= */

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent successfully (demo)");
    setForm({ name: "", email: "", message: "" });
  };

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
          href="/dashboard"
          className="text-sm font-semibold bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </Link>
      </div>

      {/* HERO */}
      <Section className="pt-6">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Contact & Support
          </h1>

          <p className="mt-5 text-slate-600 text-sm md:text-base leading-relaxed">
            Need help? Our support team is ready to assist you with setup,
            troubleshooting, and account management.
          </p>
        </div>
      </Section>

      {/* SUPPORT CARDS */}
      <Section className="bg-white border-y">
        <div className="grid md:grid-cols-3 gap-6">

          <Animated>
            <SupportCard
              icon="💬"
              title="Live Chat Support"
              desc="Get instant help from our support agents (response within minutes)."
            />
          </Animated>

          <Animated>
            <SupportCard
              icon="📧"
              title="Email Support"
              desc="Send us an email and we’ll respond within 24 hours."
            />
          </Animated>

          <Animated>
            <SupportCard
              icon="🧠"
              title="AI Help Center"
              desc="Instant answers to common issues using our smart assistant."
            />
          </Animated>

        </div>
      </Section>

      {/* CONTACT FORM */}
      <Section>
        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* FORM */}
          <Animated>
            <div className="bg-white border rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-blue-600 mb-4">
                Send us a message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  type="email"
                  className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  rows={5}
                  className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Send Message
                </button>

              </form>
            </div>
          </Animated>

          {/* INFO */}
          <Animated>
            <div className="space-y-6">

              <div className="bg-blue-600 text-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-bold">24/7 Support Availability</h3>
                <p className="text-blue-100 text-sm mt-2">
                  Our system monitors issues around the clock.
                </p>
              </div>

              <div className="bg-white border p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-blue-600">Response Time</h3>
                <p className="text-sm text-slate-600 mt-2">
                  Average response time: <b>under 2 hours</b>
                </p>
              </div>

              <div className="bg-white border p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-blue-600">Support Channels</h3>
                <p className="text-sm text-slate-600 mt-2">
                  Email, chat, and AI support available 24/7.
                </p>
              </div>

            </div>
          </Animated>

        </div>
      </Section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}

/* ================= SECTION ================= */

function Section({ children, className = "" }: SectionProps) {
  return (
    <section className={`max-w-7xl mx-auto w-full px-6 md:px-10 py-20 ${className}`}>
      {children}
    </section>
  );
}

/* ================= SUPPORT CARD ================= */

function SupportCard({ title, desc, icon }: SupportCardProps) {
  return (
    <div className="bg-slate-50 border rounded-xl p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <div className="text-2xl mb-3">{icon}</div>
      <h3 className="font-semibold text-blue-600">{title}</h3>
      <p className="text-sm text-slate-600 mt-2 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

/* ================= ANIMATION ================= */

function Animated({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
}