import React, { useState } from 'react';
import { Compass, CircleDot, Shield, Tag, Radio, Search, MapPin, Rocket, Package } from 'lucide-react';
import { SidebarItem } from '../components/ui/sidebar/SidebarItem';
import { SidebarStatus } from '../components/ui/sidebar/SidebarStatus';
import { Gallery } from '../components/ui/gallery/Gallery';
import { area18Gallery } from '../data/galleryData';
import { SearchInput } from '../components/ui/search/SearchInput';
import { SearchFilter } from '../components/ui/search/SearchFilter';
import { SearchTrendingCard } from '../components/ui/search/SearchTrendingCard';
import { SearchHistoryItem } from '../components/ui/search/SearchHistoryItem';
import { ShipCard } from '../components/ui/faction/ShipCard';
import { ReputationCard } from '../components/ui/faction/ReputationCard';
import { HierarchyCard } from '../components/ui/faction/HierarchyCard';
import { AffiliatedLocationsCard } from '../components/ui/faction/AffiliatedLocationsCard';

export function DesignSystemPage() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="flex-1 overflow-y-auto bg-background p-8">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold font-headline text-slate-900 mb-2">Design System</h1>
          <p className="text-slate-500 max-w-2xl">
            The CitizenWiki design language is characterized by a "Clean-Room White" aesthetic, 
            technical editorial typography, and tonal layering. It prioritizes readability and 
            information density for complex game data.
          </p>
        </div>

        {/* Typography */}
        <section className="space-y-6">
          <div className="border-b border-outline-variant/20 pb-2">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8e9aaf]">Typography</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Display / Headline (Space Grotesk + Noto Sans SC)</p>
                <h1 className="text-4xl font-bold font-headline text-slate-900">Area18, ArcCorp<br/><span className="text-3xl mt-2 block">十八区，弧光星</span></h1>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Section Title (Space Grotesk + Noto Sans SC)</p>
                <h2 className="text-xl font-bold font-headline text-slate-900">Atmospheric Data 大气数据</h2>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Body Text (Inter + Noto Sans SC)</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Area18 is one of the main commercial ports for interplanetary traffic for the surrounding region of ArcCorp. Travelers can find a variety of goods from trusted names.
                  <br/><br/>
                  十八区是弧光星周边星际交通的主要商业港口之一。旅客可以在这里找到各种知名品牌的商品。
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Technical Label</p>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8e9aaf]">Navigation 导航</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Micro Label</p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Classification 分类</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Value / Data</p>
                <p className="text-sm font-medium text-slate-900">1.0 atm 标准大气压</p>
              </div>
            </div>
          </div>
        </section>

        {/* Colors */}
        <section className="space-y-6">
          <div className="border-b border-outline-variant/20 pb-2">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8e9aaf]">Color Palette</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ColorSwatch name="Background" variable="var(--color-background)" hex="#f7f9ff" />
            <ColorSwatch name="Surface" variable="var(--color-surface)" hex="#f7f9ff" />
            <ColorSwatch name="Surface Container" variable="var(--color-surface-container)" hex="#eaeef5" />
            <ColorSwatch name="Outline Variant" variable="var(--color-outline-variant)" hex="#c2c6d6" />
            
            <ColorSwatch name="Primary" variable="var(--color-primary)" hex="#0054c5" textClass="text-white" />
            <ColorSwatch name="Secondary" variable="var(--color-secondary)" hex="#006c49" textClass="text-white" />
            <ColorSwatch name="Tertiary" variable="var(--color-tertiary)" hex="#265b9c" textClass="text-white" />
            <ColorSwatch name="Error" variable="var(--color-error)" hex="#ba1a1a" textClass="text-white" />
            
            <ColorSwatch name="Slate 900 (Text)" variable="#0f172a" hex="#0f172a" textClass="text-white" />
            <ColorSwatch name="Slate 500 (Text)" variable="#64748b" hex="#64748b" textClass="text-white" />
            <ColorSwatch name="Label (#8e9aaf)" variable="#8e9aaf" hex="#8e9aaf" textClass="text-white" />
            <ColorSwatch name="Emerald 500 (Status)" variable="#10b981" hex="#10b981" textClass="text-white" />
          </div>
        </section>

        {/* Components */}
        <section className="space-y-6">
          <div className="border-b border-outline-variant/20 pb-2">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8e9aaf]">Components</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cards */}
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Data Card</p>
              <div className="bg-white rounded-xl border border-outline-variant/20 p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Gravity</span>
                  <Compass className="w-3 h-3 text-slate-300" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-slate-900">1.0</span>
                  <span className="text-xs font-medium text-slate-500">G</span>
                </div>
              </div>
            </div>

            {/* Sidebar Items */}
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Sidebar Navigation</p>
              <div className="bg-background border border-outline-variant/20 rounded-xl p-4 space-y-2 w-64">
                <SidebarItem icon={<CircleDot className="w-5 h-5 text-primary" />} label="Universe" active />
                <SidebarItem icon={<Shield className="w-5 h-5" />} label="Factions" />
                <SidebarItem icon={<Tag className="w-4 h-4 opacity-40" />} label="Bookmark" />
              </div>
            </div>

            {/* Status Indicator */}
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Status Indicator</p>
              <div className="bg-background border border-outline-variant/20 rounded-xl p-4 w-64">
                <div className="flex items-center justify-between py-2 px-1">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Wiki Status: Online</span>
                  </div>
                  <Radio className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Action Buttons</p>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg shadow-sm hover:bg-primary/90 transition-colors">
                  Primary Action
                </button>
                <button className="px-4 py-2 bg-white text-slate-700 border border-outline-variant/20 text-sm font-medium rounded-lg shadow-sm hover:bg-slate-50 transition-colors">
                  Secondary Action
                </button>
              </div>
            </div>

            {/* Faction Components */}
            <div className="col-span-full space-y-6">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Faction Components</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <ShipCard title="Mercury" subtitle="Star Runner" tags={['Courier', 'Data']} />
                  <ReputationCard />
                </div>
                <div className="space-y-4">
                  <HierarchyCard />
                  <AffiliatedLocationsCard />
                </div>
              </div>
            </div>

            {/* Search Components */}
            <div className="col-span-full space-y-6">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Search Components</p>
              
              <div className="bg-white rounded-xl border border-outline-variant/20 p-6 shadow-sm space-y-8">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-2">Search Input</p>
                  <SearchInput value={searchValue} onChange={setSearchValue} onClose={() => {}} />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-2">Quick Filters</p>
                  <div className="flex flex-wrap gap-3">
                    <SearchFilter icon={<MapPin className="w-4 h-4" />} label="Locations" isActive />
                    <SearchFilter icon={<Rocket className="w-4 h-4" />} label="Ships" />
                    <SearchFilter icon={<Shield className="w-4 h-4" />} label="Factions" />
                    <SearchFilter icon={<Package className="w-4 h-4" />} label="Items" />
                  </div>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-2">Trending Cards</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <SearchTrendingCard icon={<MapPin className="w-5 h-5" />} title="Pyro System" subtitle="STAR SYSTEM" />
                    <SearchTrendingCard icon={<Rocket className="w-5 h-5" />} title="Drake Corsair" subtitle="SHIP" />
                  </div>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-2">History Items</p>
                  <div className="max-w-md border border-outline-variant/20 rounded-xl p-2 bg-background">
                    <SearchHistoryItem title="New Babbage Transit Hub" timeAgo="12 MINUTES AGO" />
                    <SearchHistoryItem title="Crusader Ares Ion" timeAgo="2 HOURS AGO" />
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery Preview */}
            <div className="col-span-full space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Visual Database / Gallery</p>
              <div className="bg-white rounded-xl border border-outline-variant/20 p-6 shadow-sm">
                <Gallery images={area18Gallery.slice(0, 3)} />
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}

function ColorSwatch({ name, variable, hex, textClass = "text-slate-900" }: { name: string, variable: string, hex: string, textClass?: string }) {
  return (
    <div className="rounded-xl border border-outline-variant/20 overflow-hidden shadow-sm">
      <div className="h-24 w-full" style={{ backgroundColor: variable }}></div>
      <div className="p-3 bg-white">
        <p className="text-sm font-bold text-slate-900">{name}</p>
        <p className="text-[10px] font-mono text-slate-500 mt-1">{hex}</p>
      </div>
    </div>
  );
}
