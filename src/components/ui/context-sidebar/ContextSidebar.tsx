import React from 'react';
import { SectionGuide } from './SectionGuide';
import { Affiliations } from './Affiliations';
import { NearbyFacilities } from './NearbyFacilities';
import { LiveTraffic } from './LiveTraffic';

export function ContextSidebar() {
  return (
    <aside className="w-full lg:w-80 bg-background border-t lg:border-t-0 lg:border-l border-outline-variant/20 flex flex-col py-8 px-6 space-y-8 lg:overflow-y-auto shrink-0">
      <SectionGuide />
      <Affiliations />
      <NearbyFacilities />
      <LiveTraffic />
    </aside>
  );
}

