import React from 'react';
import { ShipCard } from './ShipCard';

export function FactionLineup() {
  const ships = [
    {
      title: 'Mercury',
      subtitle: 'Star Runner',
      tags: ['Courier', 'Data'],
      modelClass: 'S-CLASS SHIP MODEL'
    },
    {
      title: 'Hercules',
      subtitle: 'Starlifter C2',
      tags: ['Transport', 'Heavy'],
      modelClass: 'L-CLASS SHIP MODEL'
    },
    {
      title: 'Ares',
      subtitle: 'Ion Star Fighter',
      tags: ['Combat', 'S7 Weapon'],
      modelClass: 'S-CLASS SHIP MODEL'
    },
    {
      title: 'Spirit',
      subtitle: 'E1 Executive',
      tags: ['Tourism', 'Luxury'],
      modelClass: 'M-CLASS SHIP MODEL'
    }
  ];

  return (
    <section className="mb-12">
      <h2 className="font-sans text-sm font-black uppercase tracking-[0.2em] text-slate-800 border-b border-slate-100 pb-4 mb-6">
        Manufacturing Lineup
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ships.map((ship, idx) => (
          <ShipCard 
            key={idx} 
            title={ship.title} 
            subtitle={ship.subtitle} 
            tags={ship.tags} 
            modelClass={ship.modelClass} 
          />
        ))}
      </div>
    </section>
  );
}
