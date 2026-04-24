"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

/* ================= TYPES ================= */

type SectionProps = {
  children: React.ReactNode;
  className?: string;
};

type PointProps = {
  title: string;
  desc: string;
};

/* ================= PAGE ================= */

export default function TermsPage() {
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
            Terms & Conditions
          </h1>

          <p className="mt-5 text-slate-600 text-sm md:text-base leading-relaxed">
            These terms govern your use of ShopFlow. By accessing or using our platform,
            you agree to comply with these rules and guidelines.
          </p>
        </div>
      </Section>

      {/* INTRO */}
      <Section className="bg-white border-y">
        <AnimatedBlock>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-blue-600">
              Simple & Transparent Rules
            </h2>

            <p className="mt-4 text-slate-600 text-sm md:text-base leading-relaxed">
              We believe in clarity. These terms explain how you can use ShopFlow,
              what you can expect from us, and what we expect from you.
            </p>
          </div>
        </AnimatedBlock>
      </Section>

      {/* TERMS POINTS */}
      <Section>
        <div className="grid md:grid-cols-2 gap-8">

          <AnimatedBlock>
            <Point
              title="1. Account Responsibility"
              desc="You are responsible for maintaining the confidentiality of your account credentials and all activities under your account."
            />
          </AnimatedBlock>

          <AnimatedBlock>
            <Point
              title="2. Acceptable Use"
              desc="You agree not to misuse the platform, attempt unauthorized access, or engage in any harmful activity."
            />
          </AnimatedBlock>

          <AnimatedBlock>
            <Point
              title="3. Data Accuracy"
              desc="You are responsible for ensuring that all data entered into the system is accurate and up to date."
            />
          </AnimatedBlock>

          <AnimatedBlock>
            <Point
              title="4. Service Availability"
              desc="We aim for 99.9% uptime but do not guarantee uninterrupted access due to maintenance or unforeseen issues."
            />
          </AnimatedBlock>

          <AnimatedBlock>
            <Point
              title="5. Intellectual Property"
              desc="All content, design, and software belong to ShopFlow and may not be copied or redistributed without permission."
            />
          </AnimatedBlock>

          <AnimatedBlock>
            <Point
              title="6. Termination"
              desc="We reserve the right to suspend or terminate accounts that violate these terms or engage in misuse."
            />
          </AnimatedBlock>

        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold">
          Ready to use ShopFlow?
        </h2>

        <p className="text-blue-100 mt-3 text-sm">
          Start managing your business with confidence and clarity.
        </p>

        <Link
          href="/dashboard"
          className="inline-block mt-6 bg-white text-blue-700 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition"
        >
          Go to Dashboard
        </Link>
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

/* ================= TERMS POINT CARD ================= */

function Point({ title, desc }: PointProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-200">
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
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
}