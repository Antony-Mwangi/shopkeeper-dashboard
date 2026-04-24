"use client";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-black">

      
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid md:grid-cols-2 gap-10 items-center">

       
        <div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            Powering Smarter Business Decisions
          </h1>

          <p className="mt-4 text-slate-600 text-sm md:text-base leading-relaxed">
            We help businesses manage inventory, track sales, and gain deep insights
            through powerful analytics — all in one seamless platform.
          </p>

          <div className="mt-6 flex gap-4">
            <button className="bg-black text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-slate-800 transition">
              Get Started
            </button>

            <button className="border px-6 py-3 rounded-lg text-sm font-medium hover:bg-slate-100 transition">
              Learn More
            </button>
          </div>
        </div>


        <div className="flex justify-center">
          <img
            src="/analytics-illustration.svg" // replace with your image
            alt="Analytics illustration"
            className="w-full max-w-md"
          />
        </div>
      </section>

     
      <section className="bg-white border-y">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

          <Stat number="1,200+" label="Businesses" />
          <Stat number="50K+" label="Transactions" />
          <Stat number="99.9%" label="Uptime" />
          <Stat number="24/7" label="Support" />

        </div>
      </section>

      
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">

        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold">
            Our Core Values
          </h2>
          <p className="text-slate-600 text-sm mt-3">
            Everything we build is driven by simplicity, performance, and trust.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">

          <ValueCard
            title="Simplicity"
            desc="We design intuitive systems that are easy to use without sacrificing power."
          />

          <ValueCard
            title="Performance"
            desc="Fast, reliable tools that scale with your business growth."
          />

          <ValueCard
            title="Trust"
            desc="Your data is secure, and your business insights are always accurate."
          />

        </div>
      </section>

     
      <section className="bg-black text-white py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold">
          Ready to grow your business?
        </h2>

        <p className="text-slate-300 mt-3 text-sm">
          Start managing your sales, inventory, and analytics today.
        </p>

        <button className="mt-6 bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-slate-200 transition">
          Get Started Now
        </button>
      </section>

    </div>
  );
}



function Stat({ number, label }: any) {
  return (
    <div className="space-y-2">
      <h3 className="text-2xl md:text-3xl font-bold">{number}</h3>
      <p className="text-xs text-slate-500 uppercase tracking-wide">
        {label}
      </p>
    </div>
  );
}

function ValueCard({ title, desc }: any) {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-slate-600 mt-3 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}