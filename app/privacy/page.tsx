"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

/* ================= TYPES ================= */

type SectionProps = {
  children: React.ReactNode;
  className?: string;
};

type StatProps = {
  target: number;
  label: string;
};

type PolicyCardProps = {
  title: string;
  desc: string;
};

/* ================= PAGE ================= */

export default function PrivacyPage() {
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
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            Your Privacy Matters
          </h1>

          <p className="mt-5 text-slate-600 text-sm md:text-base leading-relaxed">
            At ShopFlow, we are committed to protecting your data and ensuring
            transparency in how your information is collected, used, and stored.
          </p>
        </div>
      </Section>

      {/* TRUST STATS */}
      <Section className="bg-white border-y">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <Stat target={1200} label="Businesses Protected" />
          <Stat target={50000} label="Secure Transactions" />
          <Stat target={99} label="Data Protection %" />
          <Stat target={24} label="Monitoring (hrs)" />
        </div>
      </Section>

      {/* POLICY INTRO */}
      <Section>
        <AnimatedBlock>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold">
              How We Handle Your Data
            </h2>

            <p className="mt-4 text-slate-600 text-sm md:text-base leading-relaxed">
              We collect only the data necessary to provide and improve our services.
              Your information is never sold, and we prioritize security at every level
              of our platform.
            </p>
          </div>
        </AnimatedBlock>
      </Section>

      {/* POLICY DETAILS */}
      <Section>
        <div className="grid md:grid-cols-3 gap-8">

          <AnimatedBlock>
            <PolicyCard
              title="Data Collection"
              desc="We collect essential information such as account details, sales data, and usage activity to improve your experience."
            />
          </AnimatedBlock>

          <AnimatedBlock>
            <PolicyCard
              title="Data Usage"
              desc="Your data is used strictly to operate, maintain, and enhance the platform — never for unauthorized purposes."
            />
          </AnimatedBlock>

          <AnimatedBlock>
            <PolicyCard
              title="Data Protection"
              desc="We use encryption, secure servers, and best practices to protect your data from unauthorized access."
            />
          </AnimatedBlock>

          <AnimatedBlock>
            <PolicyCard
              title="Third Parties"
              desc="We do not sell your data. Limited sharing may occur only with trusted services required to operate the platform."
            />
          </AnimatedBlock>

          <AnimatedBlock>
            <PolicyCard
              title="User Control"
              desc="You have full control over your data, including access, updates, and deletion requests at any time."
            />
          </AnimatedBlock>

          <AnimatedBlock>
            <PolicyCard
              title="Policy Updates"
              desc="We may update this policy periodically. You will always be informed of major changes affecting your data."
            />
          </AnimatedBlock>

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

/* ================= STAT ================= */

function Stat({ target, label }: StatProps) {
  const [count, setCount] = useState<number>(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;

      let start = 0;
      const duration = 1200;
      const step = target / (duration / 16);

      const timer = setInterval(() => {
        start += step;

        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      observer.disconnect();
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="space-y-2">
      <h3 className="text-2xl md:text-3xl font-bold text-blue-600">
        {count.toLocaleString()}+
      </h3>
      <p className="text-xs text-slate-500 uppercase tracking-wide">
        {label}
      </p>
    </div>
  );
}

/* ================= POLICY CARD ================= */

function PolicyCard({ title, desc }: PolicyCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blue-200">
      <h3 className="font-semibold text-lg text-blue-600">
        {title}
      </h3>
      <p className="text-sm text-slate-600 mt-3 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

/* ================= ANIMATION ================= */

function AnimatedBlock({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
}