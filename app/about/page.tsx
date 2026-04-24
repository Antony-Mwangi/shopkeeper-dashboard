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

type ValueCardProps = {
  title: string;
  desc: string;
};

/* ================= PAGE ================= */

export default function AboutPage() {
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
            Powering Smarter Business Decisions
          </h1>

          <p className="mt-5 text-slate-600 text-sm md:text-base leading-relaxed">
            ShopFlow helps modern businesses manage inventory, track sales,
            and unlock real-time insights through intelligent analytics —
            all within a fast, scalable platform built for growth.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/dashboard"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
            >
              Get Started
            </Link>

            <Link
              href="/"
              className="border border-blue-200 text-blue-600 px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-50 transition"
            >
              Learn More
            </Link>
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

      {/* STORY */}
      <Section>
        <AnimatedBlock>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold">
              Our Story
            </h2>

            <p className="mt-4 text-slate-600 text-sm md:text-base leading-relaxed">
              ShopFlow was born from a simple observation: growing businesses
              were overwhelmed by disconnected tools and unclear data.
              We built a unified system that combines inventory, sales,
              and analytics into one seamless experience — enabling smarter,
              faster, and more confident decisions every day.
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
            Everything we build is guided by clarity, performance, and trust.
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
              desc="Fast, reliable tools built to scale with your business growth."
            />
          </AnimatedBlock>

          <AnimatedBlock>
            <ValueCard
              title="Trust"
              desc="Secure systems and accurate insights you can depend on."
            />
          </AnimatedBlock>
        </div>
      </Section>

      {/* CTA */}
      {/* <Section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center rounded-t-3xl">
        <h2 className="text-2xl md:text-3xl font-bold">
          Ready to grow your business?
        </h2>

        <p className="text-blue-100 mt-3 text-sm">
          Start managing your sales, inventory, and analytics today.
        </p>

        <Link
          href="/dashboard"
          className="inline-block mt-6 bg-white text-blue-700 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition"
        >
          Get Started Now
        </Link>
      </Section> */}

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

/* ================= STAT (ANIMATED COUNTER) ================= */

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

/* ================= VALUE CARD ================= */

function ValueCard({ title, desc }: ValueCardProps) {
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

/* ================= SCROLL ANIMATION ================= */

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