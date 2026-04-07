import React from 'react';
import { FactionHeader } from '../components/ui/faction/FactionHeader';
import { FactionLore } from '../components/ui/faction/FactionLore';
import { FactionLineup } from '../components/ui/faction/FactionLineup';
import { ReputationCard } from '../components/ui/faction/ReputationCard';
import { HierarchyCard } from '../components/ui/faction/HierarchyCard';
import { AffiliatedLocationsCard } from '../components/ui/faction/AffiliatedLocationsCard';
import { FactionFABs } from '../components/ui/faction/FactionFABs';

export function FactionsPage() {
  return (
    <div className="flex flex-col lg:flex-row flex-1 overflow-y-auto lg:overflow-hidden">
      {/* Main Content */}
      <main className="flex-1 bg-surface-container-lowest lg:overflow-y-auto relative">
        <div className="max-w-4xl mx-auto w-full p-6 md:p-12 lg:p-16">
          <FactionHeader />
          <FactionLore />
          <FactionLineup />
        </div>
      </main>
      
      {/* Sidebar */}
      <aside className="w-full lg:w-80 bg-surface-container-low border-l border-outline-variant/20 flex flex-col shrink-0 lg:h-full lg:overflow-y-auto">
        <div className="p-6 space-y-8">
          <ReputationCard />
          <HierarchyCard />
          <AffiliatedLocationsCard />
        </div>
      </aside>
      
      <FactionFABs />
    </div>
  );
}
