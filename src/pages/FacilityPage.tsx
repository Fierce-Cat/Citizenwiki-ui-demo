import React from 'react';
import { Gallery } from '../components/ui/gallery/Gallery';
import { voyagerBarGallery } from '../data/galleryData';
import { Building2, MapPin, Info, ArrowRight } from 'lucide-react';

export function FacilityPage() {
  return (
    <div className="flex flex-col lg:flex-row flex-1 overflow-y-auto lg:overflow-hidden">
      {/* Main Content */}
      <main className="flex-1 bg-surface-container-lowest lg:overflow-y-auto relative">
        <div className="max-w-4xl mx-auto w-full p-6 md:p-12 lg:p-16">
          {/* Header Section */}
          <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8 relative">
            <img 
              src="https://picsum.photos/seed/voyagerbar-header/1920/1080" 
              alt="Voyager Bar" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase border border-white/20">
                    Facility
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase border border-white/20">
                    Commercial
                  </span>
                </div>
                <h1 className="font-headline text-4xl md:text-5xl font-bold text-white">
                  Voyager Bar
                </h1>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <section>
              <p className="text-slate-600 text-lg leading-relaxed">
                A popular chain of bars found across the UEE, known for their signature cocktails and vibrant atmosphere. A favorite hangout for pilots, traders, and locals alike.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-sm font-black uppercase tracking-[0.2em] text-slate-800 border-b border-slate-100 pb-4 mb-6">
                Overview
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600">
                <p>
                  The Voyager Bar franchise has established itself as a staple of station and city life across the Stanton system and beyond. Offering a mix of high-end beverages and a relaxed environment, it serves as a neutral ground for traders, mercenaries, and corporate workers to unwind. 
                </p>
                <p>
                  The interior design typically features neon lighting, comfortable seating, and a panoramic view of the surrounding locale if available. Each location maintains a consistent standard of quality while often incorporating subtle nods to the local culture or environment.
                </p>
              </div>
            </section>

            <div>
              <Gallery images={voyagerBarGallery} />
            </div>
          </div>
        </div>
      </main>

      {/* Sidebar */}
      <aside className="w-full lg:w-80 bg-surface-container-low border-l border-outline-variant/20 flex flex-col shrink-0 lg:h-full lg:overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Affiliations Card */}
          <div className="bg-white rounded-2xl border border-outline-variant/20 p-6 shadow-sm">
            <h3 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Affiliations
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Parent Organization</div>
                <div className="text-sm font-bold text-slate-900">Voyager Franchise Group</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Status</div>
                <div className="text-sm font-medium text-emerald-600">Active / Operational</div>
              </div>
            </div>
          </div>

          {/* Locations Card */}
          <div className="bg-white rounded-2xl border border-outline-variant/20 p-6 shadow-sm">
            <h3 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Known Locations
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Area18', system: 'ArcCorp, Stanton' },
                { name: 'Grim HEX', system: 'Yela, Stanton' },
                { name: 'Lorville', system: 'Hurston, Stanton' },
                { name: 'Orison', system: 'Crusader, Stanton' }
              ].map((loc, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-outline-variant/10 hover:border-primary/30 transition-colors cursor-pointer group">
                  <div>
                    <div className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{loc.name}</div>
                    <div className="text-[10px] text-slate-500">{loc.system}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
