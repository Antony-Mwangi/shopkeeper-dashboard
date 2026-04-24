"use client";

import { useEffect, useRef, useState } from "react";

/* ================= TYPES ================= */

type StatProps = {
  target: number;
  label: string;
};

type ValueCardProps = {
  title: string;
  desc: string;
};

type SectionProps = {
  children: React.ReactNode;
  className?: string;
};

/* ================= PAGE ================= */

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-black">

      {/* HERO */}
      <Section>
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
            Powering Smarter Business Decisions
          </h1>

          <p className="mt-5 text-slate-600 text-sm md:text-base leading-relaxed">
            We help businesses manage inventory, track sales, and unlock powerful insights
            through intelligent analytics — all within a seamless platform designed for growth.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <button className="bg-black text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-slate-800 transition">
              Get Started
            </button>

            <button className="border px-6 py-3 rounded-lg text-sm font-medium hover:bg-slate-100 transition">
              Learn More
            </button>
          </div>
        </div>
      </Section>

      {/* STATS */}
      <Section className="bg-white border-y">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <Stat target={1200} label="Businesses" />
          <Stat target={50000} label="Transactions" />
          <Stat target={99} label="Uptime %" />
          <Stat target={24} label="Support (hrs)" />
        </div>
      </Section>

      {/* AI STORY */}
      <Section>
        <AnimatedBlock>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold">
              Our Story
            </h2>

            <p className="mt-4 text-slate-600 text-sm md:text-base leading-relaxed">
              ShopFlow was built after identifying a common challenge across growing businesses:
              disconnected tools, unclear insights, and inefficient workflows. By combining
              inventory management, sales tracking, and analytics into one platform, we enable
              smarter, faster, and more confident decisions every day.
            </p>
          </div>
        </AnimatedBlock>
      </Section>

      {/* VALUES */}
      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold">
            Our Core Values
          </h2>
          <p className="text-slate-600 text-sm mt-3">
            Everything we build is driven by simplicity, performance, and trust.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <AnimatedBlock>
            <ValueCard
              title="Simplicity"
              desc="We design intuitive systems that are easy to use without sacrificing power."
            />
          </AnimatedBlock>

          <AnimatedBlock>
            <ValueCard
              title="Performance"
              desc="Fast, reliable tools that scale seamlessly with your business growth."
            />
          </AnimatedBlock>

          <AnimatedBlock>
            <ValueCard
              title="Trust"
              desc="Your data is secure, and your insights remain accurate and dependable."
            />
          </AnimatedBlock>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-black text-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold">
          Ready to grow your business?
        </h2>

        <p className="text-slate-300 mt-3 text-sm">
          Start managing your sales, inventory, and analytics today.
        </p>

        <button className="mt-6 bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-slate-200 transition">
          Get Started Now
        </button>
      </Section>

    </div>
  );
}

/* ================= REUSABLE SECTION ================= */

function Section({ children, className = "" }: SectionProps) {
  return (
    <section className={`max-w-7xl mx-auto px-6 md:px-10 py-20 ${className}`}>
      {children}
    </section>
  );
}

/* ================= STAT WITH COUNTER ================= */

function Stat({ target, label }: StatProps) {
  const [count, setCount] = useState<number>(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        let start = 0;
        const duration = 1200;
        const stepTime = 16;
        const increment = target / (duration / stepTime);

        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, stepTime);

        observer.disconnect();
      },
      { threshold: 0.5 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="space-y-2">
      <h3 className="text-2xl md:text-3xl font-bold">
        {count.toLocaleString()}+
      </h3>
      <p className="text-xs text-slate-500 uppercase tracking-wide">
        {label}
      </p>
    </div>
  );
}

/* ================= VALUE CARD ================= */

function ValueCard({ title, desc }: ValueCardProps) {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <h3 className="font-semibold text-lg">
        {title}
      </h3>
      <p className="text-sm text-slate-600 mt-3 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

/* ================= SCROLL ANIMATION ================= */

function AnimatedBlock({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

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
      className={`transition-all duration-700 ease-out ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
}