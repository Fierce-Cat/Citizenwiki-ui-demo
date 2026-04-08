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
  hdTextureUrl?: string;
  reflectionUrl?: string;
  cloudsUrl?: string;
  moons?: CelestialBody3D[];
  destination?: string;
  travelTime?: string;
  type?: 'star' | 'planet' | 'moon' | 'jump_point';
}

export interface JumpPoint3D extends CelestialBody3D {
  type: 'jump_point';
}

const CLOUDS = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png';

const getHD = (url?: string) => url?.replace('/bodies/', '/bodies-hd/');
const getRef = (id: string) => {
  const reflective = ['hurston', 'microtech', 'clio', 'euterpe'];
  return reflective.includes(id) 
    ? `/starmap/textures/bodies-reflection/${id}.webp`
    : '/starmap/textures/bodies-reflection/no-reflection.webp';
};

export const stanton3DData = {
  star: { id: 'stanton', name: 'Stanton', size: 12, color: '#ffcc00' },
  planets: [
    { 
      id: 'hurston', name: 'Hurston', distance: 80, size: 4, color: '#f59e42', angle: -Math.PI * 0.1, 
      textureUrl: '/starmap/textures/bodies/hurston.webp',
      hdTextureUrl: '/starmap/textures/bodies-hd/hurston.webp',
      reflectionUrl: '/starmap/textures/bodies-reflection/hurston.webp',
      cloudsUrl: CLOUDS,
      moons: [
        { id: 'arial', name: 'Arial', distance: 15, size: 1.2, color: '#e6c280', angle: Math.PI * 0.2, textureUrl: '/starmap/textures/bodies/arial.webp', hdTextureUrl: '/starmap/textures/bodies-hd/arial.webp' },
        { id: 'aberdeen', name: 'Aberdeen', distance: 22, size: 1.4, color: '#d9b340', angle: Math.PI * 0.8, textureUrl: '/starmap/textures/bodies/aberdeen.webp', hdTextureUrl: '/starmap/textures/bodies-hd/aberdeen.webp' },
        { id: 'magda', name: 'Magda', distance: 30, size: 1.3, color: '#8c8c8c', angle: Math.PI * 1.4, textureUrl: '/starmap/textures/bodies/magda.webp', hdTextureUrl: '/starmap/textures/bodies-hd/magda.webp' },
        { id: 'ita', name: 'Ita', distance: 38, size: 1.1, color: '#a6a6a6', angle: Math.PI * 1.9, textureUrl: '/starmap/textures/bodies/ita.webp', hdTextureUrl: '/starmap/textures/bodies-hd/ita.webp' }
      ]
    },
    { 
      id: 'crusader', name: 'Crusader', distance: 140, size: 8, color: '#cceeff', angle: Math.PI * 0.8, 
      textureUrl: '/starmap/textures/bodies/crusader.webp',
      hdTextureUrl: '/starmap/textures/bodies-hd/crusader.webp',
      moons: [
        { id: 'cellin', name: 'Cellin', distance: 25, size: 1.5, color: '#dddddd', angle: Math.PI * 1.1, textureUrl: '/starmap/textures/bodies/cellin.webp', hdTextureUrl: '/starmap/textures/bodies-hd/cellin.webp' },
        { id: 'daymar', name: 'Daymar', distance: 35, size: 1.8, color: '#ccaa88', angle: Math.PI * 0.4, textureUrl: '/starmap/textures/bodies/daymar.webp', hdTextureUrl: '/starmap/textures/bodies-hd/daymar.webp' },
        { id: 'yela', name: 'Yela', distance: 50, size: 1.6, color: '#aaddff', angle: Math.PI * 1.8, textureUrl: '/starmap/textures/bodies/yela.webp', hdTextureUrl: '/starmap/textures/bodies-hd/yela.webp' }
      ]
    },
    { 
      id: 'arccorp', name: 'ArcCorp', distance: 200, size: 5, color: '#ffaa88', angle: Math.PI * 0.3, 
      textureUrl: '/starmap/textures/bodies/arccorp.webp',
      hdTextureUrl: '/starmap/textures/bodies-hd/arccorp.webp',
      cloudsUrl: CLOUDS,
      moons: [
        { id: 'lyria', name: 'Lyria', distance: 20, size: 1.4, color: '#e6e6e6', angle: Math.PI * 0.5, textureUrl: '/starmap/textures/bodies/lyria.webp', hdTextureUrl: '/starmap/textures/bodies-hd/lyria.webp' },
        { id: 'wala', name: 'Wala', distance: 32, size: 1.5, color: '#80b3ff', angle: Math.PI * 1.5, textureUrl: '/starmap/textures/bodies/wala.webp', hdTextureUrl: '/starmap/textures/bodies-hd/wala.webp' }
      ]
    },
    { 
      id: 'microtech', name: 'MicroTech', distance: 260, size: 5.5, color: '#ddeeff', angle: Math.PI * 1.3, 
      textureUrl: '/starmap/textures/bodies/microtech.webp',
      hdTextureUrl: '/starmap/textures/bodies-hd/microtech.webp',
      reflectionUrl: '/starmap/textures/bodies-reflection/microtech.webp',
      cloudsUrl: CLOUDS,
      moons: [
        { id: 'calliope', name: 'Calliope', distance: 22, size: 1.3, color: '#f2f2f2', angle: Math.PI * 0.3, textureUrl: '/starmap/textures/bodies/calliope.webp', hdTextureUrl: '/starmap/textures/bodies-hd/calliope.webp' },
        { id: 'clio', name: 'Clio', distance: 30, size: 1.4, color: '#e6f2ff', angle: Math.PI * 1.1, textureUrl: '/starmap/textures/bodies/clio.webp', hdTextureUrl: '/starmap/textures/bodies-hd/clio.webp', reflectionUrl: '/starmap/textures/bodies-reflection/clio.webp' },
        { id: 'euterpe', name: 'Euterpe', distance: 40, size: 1.2, color: '#d9e6f2', angle: Math.PI * 1.7, textureUrl: '/starmap/textures/bodies/euterpe.webp', hdTextureUrl: '/starmap/textures/bodies-hd/euterpe.webp', reflectionUrl: '/starmap/textures/bodies-reflection/euterpe.webp' }
      ]
    }
  ]
};

/**
 * Atmosphere scattering configuration per body.
 * Inspired by real atmospheric ray-scattering models:
 * - scatterColor: the fully-scattered atmosphere color (like B0.rgb)
 * - heightFraction: scale height as fraction of planet radius (controls density falloff)
 * - viewDepthScale: optical depth multiplier (higher = thicker/more opaque)
 * - ambientLight: overglow factor (sky lighter before sunrise, 0.25-0.75)
 */
export interface AtmosphereConfig {
  scatterColor: [number, number, number];
  heightFraction: number;
  viewDepthScale: number;
  ambientLight: number;
}

export const atmosphereConfigs: Record<string, AtmosphereConfig> = {
  // Planets
  hurston:   { scatterColor: [0.72, 0.45, 0.20], heightFraction: 0.08, viewDepthScale: 8.0,  ambientLight: 0.50 },  // Dusty/industrial
  crusader:  { scatterColor: [0.40, 0.65, 0.95], heightFraction: 0.12, viewDepthScale: 12.0, ambientLight: 0.60 },  // Blue gas giant haze
  arccorp:   { scatterColor: [0.85, 0.55, 0.25], heightFraction: 0.09, viewDepthScale: 10.0, ambientLight: 0.55 },  // Orange city-smog
  microtech: { scatterColor: [0.50, 0.72, 0.98], heightFraction: 0.10, viewDepthScale: 9.0,  ambientLight: 0.65 },  // Icy blue / Earth-like

  // Moons with thinner atmospheres
  arial:     { scatterColor: [0.80, 0.60, 0.35], heightFraction: 0.05, viewDepthScale: 4.0,  ambientLight: 0.35 },
  aberdeen:  { scatterColor: [0.75, 0.55, 0.20], heightFraction: 0.06, viewDepthScale: 5.0,  ambientLight: 0.40 },
  magda:     { scatterColor: [0.50, 0.50, 0.50], heightFraction: 0.04, viewDepthScale: 3.0,  ambientLight: 0.30 },
  ita:       { scatterColor: [0.55, 0.55, 0.60], heightFraction: 0.04, viewDepthScale: 3.0,  ambientLight: 0.30 },
  cellin:    { scatterColor: [0.70, 0.60, 0.45], heightFraction: 0.05, viewDepthScale: 4.0,  ambientLight: 0.35 },
  daymar:    { scatterColor: [0.80, 0.65, 0.30], heightFraction: 0.06, viewDepthScale: 5.0,  ambientLight: 0.40 },
  yela:      { scatterColor: [0.60, 0.78, 0.95], heightFraction: 0.05, viewDepthScale: 4.5,  ambientLight: 0.40 },
  lyria:     { scatterColor: [0.70, 0.70, 0.75], heightFraction: 0.04, viewDepthScale: 3.5,  ambientLight: 0.30 },
  wala:      { scatterColor: [0.45, 0.60, 0.85], heightFraction: 0.05, viewDepthScale: 4.0,  ambientLight: 0.35 },
  calliope:  { scatterColor: [0.65, 0.75, 0.90], heightFraction: 0.05, viewDepthScale: 4.0,  ambientLight: 0.35 },
  clio:      { scatterColor: [0.55, 0.70, 0.92], heightFraction: 0.05, viewDepthScale: 4.5,  ambientLight: 0.40 },
  euterpe:   { scatterColor: [0.58, 0.68, 0.85], heightFraction: 0.04, viewDepthScale: 3.5,  ambientLight: 0.30 },
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

export const getBodySize = (id: string) => {
  if (id === 'stanton') return stanton3DData.star.size;
  for (const jp of jumpPointsData) {
    if (jp.id === id) return jp.size;
  }
  for (const planet of stanton3DData.planets) {
    if (planet.id === id) return planet.size;
    if (planet.moons) {
      for (const moon of planet.moons) {
        if (moon.id === id) return moon.size;
      }
    }
  }
  return 5;
};
