import React from 'react';
import { MapHeader } from './MapHeader';
import { LocationTitle } from './LocationTitle';
import { LocationDescription } from './LocationDescription';
import { LocationDataCards } from './LocationDataCards';
import { LocationHistory } from './LocationHistory';
import { LocationFigure } from './LocationFigure';
import { Gallery } from '../gallery/Gallery';
import { area18Galleries } from '../../../data/galleryData';

export function MainContent() {
  return (
    <main className="flex-1 bg-surface-container-lowest lg:overflow-y-auto">
      <div className="max-w-[960px] mx-auto w-full">
        <MapHeader />
        <LocationTitle />
        <LocationDescription />
        <LocationDataCards />
        <LocationHistory />
        <div className="px-4 md:px-12 pb-8 md:pb-12">
          <Gallery collections={area18Galleries} />
        </div>
      </div>
    </main>
  );
}

