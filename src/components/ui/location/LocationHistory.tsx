import React from 'react';

export function LocationHistory() {
  return (
    <section className="px-4 md:px-12 py-10 md:py-16 space-y-6 md:space-y-8">
      <h3 className="font-sans text-xs md:text-sm font-black uppercase tracking-[0.3em] text-slate-800 border-b border-slate-100 pb-4">
        BACKGROUND & HISTORY
      </h3>
      <div className="prose prose-slate max-w-none space-y-4 md:space-y-6">
        <p className="text-slate-500 leading-relaxed text-sm md:text-[15px] font-normal">
          Area 18 serves as the massive commercial heart of <span className="text-primary font-semibold">ArcCorp</span>, a planet almost entirely covered by industrial and corporate infrastructure. Originally established as a central hub for the company's research and development, it has evolved into one of the most bustling trade and transit ports in the Stanton system.
        </p>
        <p className="text-slate-500 leading-relaxed text-sm md:text-[15px] font-normal">
          Known for its iconic neon-soaked skyline and the massive holographic advertisements that dominate the clouds, the zone offers a unique blend of high-end corporate luxury and gritty industrial reality. From the Riker Memorial Spaceport, thousands of vessels depart daily, carrying everything from refined ores to top-tier quantum components. The Archive notes that despite the dense population, the automated security systems maintained by ArcCorp keep the landing zone one of the safest commercial environments in known space.
        </p>
      </div>
    </section>
  );
}

