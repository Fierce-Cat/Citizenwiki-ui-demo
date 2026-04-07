import * as THREE from 'three';

export interface CelestialBody3D {
  id: string;
  name: string;
  distance: number;
  size: number;
  color: string;
  angle: number;
  y?: number;
  textureUrl?: string;
  cloudsUrl?: string;
  moons?: CelestialBody3D[];
  destination?: string;
  travelTime?: string;
  type?: 'star' | 'planet' | 'moon' | 'jump_point';
}

export interface JumpPoint3D extends CelestialBody3D {
  type: 'jump_point';
}

const TEXTURES = {
  mars: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_day_4096.jpg', // Fallback
  jupiter: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg', // Fallback
  earthNight: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_lights_2048.png',
  earth: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_day_4096.jpg',
  moon: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg',
  clouds: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'
};

export const stanton3DData = {
  star: { id: 'stanton', name: 'Stanton', size: 12, color: '#ffcc00' },
  planets: [
    { id: 'hurston', name: 'Hurston', distance: 80, size: 4, color: '#f59e42', angle: -Math.PI * 0.1, textureUrl: TEXTURES.mars, cloudsUrl: TEXTURES.clouds,
      moons: [
        { id: 'arial', name: 'Arial', distance: 15, size: 1.2, color: '#e6c280', angle: Math.PI * 0.2, textureUrl: TEXTURES.moon },
        { id: 'aberdeen', name: 'Aberdeen', distance: 22, size: 1.4, color: '#d9b340', angle: Math.PI * 0.8, textureUrl: TEXTURES.moon },
        { id: 'magda', name: 'Magda', distance: 30, size: 1.3, color: '#8c8c8c', angle: Math.PI * 1.4, textureUrl: TEXTURES.moon },
        { id: 'ita', name: 'Ita', distance: 38, size: 1.1, color: '#a6a6a6', angle: Math.PI * 1.9, textureUrl: TEXTURES.moon }
      ]
    },
    { id: 'crusader', name: 'Crusader', distance: 140, size: 8, color: '#cceeff', angle: Math.PI * 0.8, textureUrl: TEXTURES.jupiter, 
      moons: [
        { id: 'cellin', name: 'Cellin', distance: 25, size: 1.5, color: '#dddddd', angle: Math.PI * 1.1, textureUrl: TEXTURES.moon },
        { id: 'daymar', name: 'Daymar', distance: 35, size: 1.8, color: '#ccaa88', angle: Math.PI * 0.4, textureUrl: TEXTURES.moon },
        { id: 'yela', name: 'Yela', distance: 50, size: 1.6, color: '#aaddff', angle: Math.PI * 1.8, textureUrl: TEXTURES.moon }
      ]
    },
    { id: 'arccorp', name: 'ArcCorp', distance: 200, size: 5, color: '#ffaa88', angle: Math.PI * 0.3, textureUrl: TEXTURES.earthNight, cloudsUrl: TEXTURES.clouds,
      moons: [
        { id: 'lyria', name: 'Lyria', distance: 20, size: 1.4, color: '#e6e6e6', angle: Math.PI * 0.5, textureUrl: TEXTURES.moon },
        { id: 'wala', name: 'Wala', distance: 32, size: 1.5, color: '#80b3ff', angle: Math.PI * 1.5, textureUrl: TEXTURES.moon }
      ]
    },
    { id: 'microtech', name: 'MicroTech', distance: 260, size: 5.5, color: '#ddeeff', angle: Math.PI * 1.3, textureUrl: TEXTURES.earth, cloudsUrl: TEXTURES.clouds,
      moons: [
        { id: 'calliope', name: 'Calliope', distance: 22, size: 1.3, color: '#f2f2f2', angle: Math.PI * 0.3, textureUrl: TEXTURES.moon },
        { id: 'clio', name: 'Clio', distance: 30, size: 1.4, color: '#e6f2ff', angle: Math.PI * 1.1, textureUrl: TEXTURES.moon },
        { id: 'euterpe', name: 'Euterpe', distance: 40, size: 1.2, color: '#d9e6f2', angle: Math.PI * 1.7, textureUrl: TEXTURES.moon }
      ]
    }
  ]
};

export const jumpPointsData: JumpPoint3D[] = [
  { id: 'jp-pyro', name: 'Pyro Jump Point', destination: 'Pyro System', travelTime: '12m 45s', distance: 170, size: 2.5, angle: Math.PI * 0.6, y: 0, color: '#ff4400', type: 'jump_point' },
  { id: 'jp-magnus', name: 'Magnus Jump Point', destination: 'Magnus System', travelTime: '8m 20s', distance: 120, size: 2.5, angle: Math.PI * 0.5, y: 80, color: '#00ccff', type: 'jump_point' },
  { id: 'jp-nyx', name: 'Nyx Jump Point', destination: 'Nyx System', travelTime: '15m 10s', distance: 310, size: 2.5, angle: Math.PI * 1.4, y: 0, color: '#00ff88', type: 'jump_point' }
];

export const getBodyPosition = (id: string): { pos: THREE.Vector3, resolvedId: string } | null => {
  if (id === 'stanton') return { pos: new THREE.Vector3(0, 0, 0), resolvedId: id };
  
  // Map landing zones to their parent planets
  const landingZoneMap: Record<string, string> = {
    'orison': 'crusader',
    'lorville': 'hurston',
    'area18': 'arccorp',
    'new-babbage': 'microtech'
  };
  
  const targetId = landingZoneMap[id] || id;
  
  // Check jump points
  for (const jp of jumpPointsData) {
    if (jp.id === targetId) {
      const x = Math.cos(jp.angle) * jp.distance;
      const z = Math.sin(jp.angle) * jp.distance;
      const y = jp.y || 0;
      return { pos: new THREE.Vector3(x, y, z), resolvedId: targetId };
    }
  }

  for (const planet of stanton3DData.planets) {
    if (planet.id === targetId) {
      const x = Math.cos(planet.angle) * planet.distance;
      const z = Math.sin(planet.angle) * planet.distance;
      return { pos: new THREE.Vector3(x, 0, z), resolvedId: targetId };
    }
    if (planet.moons) {
      for (const moon of planet.moons) {
        if (moon.id === targetId) {
          const px = Math.cos(planet.angle) * planet.distance;
          const pz = Math.sin(planet.angle) * planet.distance;
          const mx = px + Math.cos(moon.angle) * moon.distance;
          const mz = pz + Math.sin(moon.angle) * moon.distance;
          return { pos: new THREE.Vector3(mx, 0, mz), resolvedId: targetId };
        }
      }
    }
  }
  return null;
};

export const getBodyData = (id: string): CelestialBody3D | null => {
  if (id === 'stanton') return { ...stanton3DData.star, type: 'star' } as any;
  
  for (const jp of jumpPointsData) {
    if (jp.id === id) return jp;
  }

  for (const planet of stanton3DData.planets) {
    if (planet.id === id) return { ...planet, type: 'planet' } as any;
    if (planet.moons) {
      for (const moon of planet.moons) {
        if (moon.id === id) return { ...moon, type: 'moon' } as any;
      }
    }
  }
  return null;
};
