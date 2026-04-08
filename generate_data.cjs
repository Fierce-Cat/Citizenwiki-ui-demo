const fs = require('fs');
const path = require('path');

const csvPath = 'E:/dev/FSD-star-map/public/data/bodies.csv';
const csvData = fs.readFileSync(csvPath, 'utf8');

const rows = csvData.split('\n').filter(r => r.trim() !== '');
const headers = rows.shift().split(',');

const data = rows.map(row => {
  const values = row.split(',');
  const obj = {};
  headers.forEach((h, i) => {
    obj[h.trim()] = values[i] ? values[i].trim() : '';
  });
  return obj;
});

// We want to construct realistic and display variants for the stanton system
// The bodies to include: Stanton, ArcCorp, Crusader, Hurston, microTech, and Moons, LPs, JPs
// Colors, textures will be manually mapped.
const themeColorsMap = {};
data.forEach(d => {
    if(d.themeColorR && d.themeColorG && d.themeColorB) {
        const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
            const hex = parseInt(x).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
          }).join('');
        themeColorsMap[d.name.toLowerCase()] = rgbToHex(d.themeColorR, d.themeColorG, d.themeColorB);
    }
});

// We need to keep display distances and sizes exactly as they are in the current `starMap3D.ts` manually,
// but fetch realistic from CSV.

const displayHardcoded = {
  stanton: { size: 12, color: '#ffcc00' },
  hurston: { distance: 80, size: 4, color: '#f59e42', moons: { arial: {distance: 15, size: 1.2}, aberdeen: {distance: 22, size: 1.4}, magda: {distance: 30, size: 1.3}, ita: {distance: 38, size: 1.1} } },
  crusader: { distance: 140, size: 8, color: '#cceeff', moons: { cellin: {distance: 25, size: 1.5}, daymar: {distance: 35, size: 1.8}, yela: {distance: 50, size: 1.6} } },
  arccorp: { distance: 200, size: 5, color: '#ffaa88', moons: { lyria: {distance: 20, size: 1.4}, wala: {distance: 32, size: 1.5} } },
  microtech: { distance: 260, size: 5.5, color: '#ddeeff', moons: { calliope: {distance: 22, size: 1.3}, clio: {distance: 30, size: 1.4}, euterpe: {distance: 40, size: 1.2} } }
};

const jumpPointsHardcoded = {
  'Stanton-Pyro JP': { id: 'jp-pyro', name: 'Pyro Jump Point', destination: 'Pyro System', travelTime: '12m 45s', displayDistance: 170, size: 2.5, color: '#ff4400' },
  'Stanton-Magnus JP': { id: 'jp-magnus', name: 'Magnus Jump Point', destination: 'Magnus System', travelTime: '8m 20s', displayDistance: 120, size: 2.5, color: '#00ccff' },
  'Stanton-Terra JP': { id: 'jp-terra', name: 'Terra Jump Point', destination: 'Terra System', travelTime: '15m 10s', displayDistance: 310, size: 2.5, color: '#00ff88' }
};

const textures = {
  hurston: true, crusader: true, arccorp: true, microtech: true,
  arial: true, aberdeen: true, magda: true, ita: true,
  cellin: true, daymar: true, yela: true,
  lyria: true, wala: true,
  calliope: true, clio: true, euterpe: true
};

const clouds = { hurston: true, arccorp: true, microtech: true };
const reflection = { hurston: true, microtech: true, clio: true, euterpe: true };

const stantonSystemBodies = data.filter(d => d.parentStar === 'Stanton' || d.name === 'Stanton');
const stantonLPs = stantonSystemBodies.filter(d => d.type === 'Lagrange Point');
const stantonJPs = stantonSystemBodies.filter(d => d.type === 'Jump Point');
const stantonPlanets = stantonSystemBodies.filter(d => d.type === 'Planet');
const stantonMoons = stantonSystemBodies.filter(d => d.type === 'Moon');
const stantonStar = stantonSystemBodies.find(d => d.name === 'Stanton');

const buildBodyBase = (d) => {
    let id = d.name.toLowerCase().replace(/\s+/g, '-');
    if (d.type === 'Jump Point') {
        id = jumpPointsHardcoded[d.name] ? jumpPointsHardcoded[d.name].id : id;
    }
    const base = {
        id: id,
        name: d.name,
        type: d.type === 'Jump Point' ? 'jump_point' : d.type.toLowerCase(),
        color: themeColorsMap[id] || '#ffffff'
    };
    if (textures[id]) {
        base.textureUrl = `/starmap/textures/bodies/${id}.webp`;
        base.hdTextureUrl = `/starmap/textures/bodies-hd/${id}.webp`;
    }
    if (clouds[id]) {
        base.cloudsUrl = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png';
    }
    if (reflection[id]) {
        base.reflectionUrl = `/starmap/textures/bodies-reflection/${id}.webp`;
    }
    return base;
}

const toRad = (deg) => {
  return parseFloat(deg) * Math.PI / 180;
};

// Build Realistic
const realistic = {
    star: { ...buildBodyBase(stantonStar), size: parseFloat(stantonStar.bodyRadius), color: '#ffcc00' },
    planets: [],
    lagrangePoints: [],
    jumpPoints: []
};

stantonPlanets.forEach(p => {
    const parentName = p.name.toLowerCase();
    const bd = {
        ...buildBodyBase(p),
        distance: parseFloat(p.orbitRadius),
        size: parseFloat(p.bodyRadius),
        angle: toRad(p.orbitAngle),
        moons: stantonMoons.filter(m => m.parentBody === p.name).map(m => ({
            ...buildBodyBase(m),
            distance: parseFloat(m.orbitRadius),
            size: parseFloat(m.bodyRadius),
            angle: toRad(m.orbitAngle)
        }))
    };
    realistic.planets.push(bd);
});

stantonLPs.forEach(lp => {
    // Lagrange points don't have orbitRadius usually, they have coordinates
    // We can compute distance from distance formula if they revolve around Stanton
    // Wait, the CSV has parentBody. For CRU-L1, parentBody is Crusader.
    const parent = stantonSystemBodies.find(b => b.name === lp.parentBody);
    
    // For realistic scale, orbitRadius could be computed or we just use coordinates relative to Stanton?
    // Let's use coordinateX/Y/Z directly but compute distance/angle for consistency?
    // Actually, x,y,z in CSV are relative to the parent? Or Stanton?
    // The CSV has: coordinateX, coordinateY, coordinateZ
    // Let's use distance = sqrt(X^2 + Y^2 + Z^2), angle = atan2(Y, X) or atan2(Z, X).
    // In starMap3D coordinates are X and Z.
    // Let's compute distance and angle from X and Y (if Y is Z).
    
    const x = parseFloat(lp.coordinateX) || 0;
    const z = parseFloat(lp.coordinateY) || 0; // Using Y as Z in our 3d plane
    const y = parseFloat(lp.coordinateZ) || 0;
    
    const dist = Math.sqrt(x*x + z*z + y*y);
    const angle = Math.atan2(z, x);

    realistic.lagrangePoints.push({
        ...buildBodyBase(lp),
        distance: dist,
        angle: angle,
        y: y,
        size: 50, // LPs don't have size, assign a arbitrary realistic small size
        parentBody: lp.parentBody ? lp.parentBody.toLowerCase() : null
    });
});

stantonJPs.forEach(jp => {
    const jpDef = jumpPointsHardcoded[jp.name] || {};
    const x = parseFloat(jp.coordinateX) || 0;
    const z = parseFloat(jp.coordinateY) || 0;
    const y = parseFloat(jp.coordinateZ) || 0;
    
    const dist = Math.sqrt(x*x + z*z + y*y);
    const angle = Math.atan2(z, x);

    realistic.jumpPoints.push({
        ...buildBodyBase(jp),
        destination: jpDef.destination,
        travelTime: jpDef.travelTime,
        distance: dist,
        size: jpDef.size || 500, // Make it big enough to see
        angle: angle,
        y: y,
        color: jpDef.color || '#ffffff'
    });
});

// Build Display
const display = {
    star: { ...buildBodyBase(stantonStar), size: displayHardcoded.stanton.size, color: displayHardcoded.stanton.color },
    planets: [],
    lagrangePoints: [],
    jumpPoints: []
};

stantonPlanets.forEach(p => {
    const hc = displayHardcoded[p.name.toLowerCase()];
    if (!hc) return;

    const bd = {
        ...buildBodyBase(p),
        distance: hc.distance,
        size: hc.size,
        angle: toRad(p.orbitAngle),
        moons: stantonMoons.filter(m => m.parentBody === p.name).map(m => {
            const hcm = hc.moons[m.name.toLowerCase()] || {distance: 20, size: 1};
            return {
                ...buildBodyBase(m),
                distance: hcm.distance,
                size: hcm.size,
                angle: toRad(m.orbitAngle) // match realistic angles
            };
        })
    };
    display.planets.push(bd);
});

stantonLPs.forEach(lp => {
    // For Display, put LP near parent
    const parent = stantonSystemBodies.find(b => b.name === lp.parentBody);
    if (!parent) return;

    let parentHC;
    if (parent.type === 'Planet') parentHC = displayHardcoded[parent.name.toLowerCase()];
    else if (parent.type === 'Star') parentHC = {distance: 0};
    
    if(!parentHC) return;

    const x = parseFloat(lp.coordinateX) || 0;
    const z = parseFloat(lp.coordinateY) || 0;
    let angleRef = Math.atan2(z, x);
    let distRef = Math.sqrt(x*x + z*z);

    // Compute relative distance. Since real Stanton radius is millions, we scale it down drastically for Display.
    // Average distance to planet orbit is maybe 20 million.
    // Display LPs can just be given an orbit distance from Stanton?
    // Wait, let's just scale the distance logarithmically or linearly.
    // If it's a planet's LP (like CRU-L1), we don't have its coordinates relative to Crusader... wait, the coordinates in CSV ARE relative to parentBody? No, they are absolute if parent is Stanton?
    // Let's assume they are relative to parent. Actually, CRU-L1 x=-17065957, Crusader x=-18962176. So they are absolute to Stanton!
    
    // For display, distance = parent.distance + (real_dist_from_parent/real_parent_dist) * display_dist?
    // Or just compute the absolute angle from stanton, and distance from stanton.
    // To make them "near" the planet, same display angle as LP's true absolute angle, and distance is scaled linearly relative to the planet's true distance?
    // Let's do: linear scale per planet.
    let displayRadius = distRef;
    if (parent.type === 'Planet') {
        const trueParentDist = Math.sqrt(parent.coordinateX**2 + parent.coordinateY**2);
        const parentDisplayDist = parentHC.distance;
        displayRadius = distRef * (parentDisplayDist / trueParentDist);
    } else {
        // Parent is Stanton, scale down by average division
        displayRadius = distRef / 200000;
    }

    display.lagrangePoints.push({
        ...buildBodyBase(lp),
        distance: displayRadius,
        angle: angleRef,
        size: 1.5,
        y: 0,
        parentBody: lp.parentBody ? lp.parentBody.toLowerCase() : null
    });
});

stantonJPs.forEach(jp => {
    const jpDef = jumpPointsHardcoded[jp.name] || {};
    
    const x = parseFloat(jp.coordinateX) || 0;
    const z = parseFloat(jp.coordinateY) || 0;
    const y = parseFloat(jp.coordinateZ) || 0;
    
    const angle = Math.atan2(z, x);

    display.jumpPoints.push({
        ...buildBodyBase(jp),
        destination: jpDef.destination,
        travelTime: jpDef.travelTime,
        distance: jpDef.displayDistance || 250,
        size: jpDef.size || 2.5,
        angle: angle,
        y: y > 1000000 ? 80 : 0,
        color: jpDef.color || '#ffffff'
    });
});

const tsFileContent = `import * as THREE from 'three';

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
  type?: 'star' | 'planet' | 'moon' | 'jump_point' | 'lagrange point';
  parentBody?: string | null;
}

export type ScaleMode = 'realistic' | 'display';

export const StarMapDatabase = {
  stanton: {
    display: ${JSON.stringify(display, null, 2)},
    realistic: ${JSON.stringify(realistic, null, 2)}
  }
};

/**
 * Atmosphere scattering configuration per body.
 */
export interface AtmosphereConfig {
  scatterColor: [number, number, number];
  heightFraction: number;
  viewDepthScale: number;
  ambientLight: number;
}

export const atmosphereConfigs: Record<string, AtmosphereConfig> = {
  // Planets
  hurston:   { scatterColor: [0.72, 0.45, 0.20], heightFraction: 0.08, viewDepthScale: 8.0,  ambientLight: 0.50 },
  crusader:  { scatterColor: [0.40, 0.65, 0.95], heightFraction: 0.12, viewDepthScale: 12.0, ambientLight: 0.60 },
  arccorp:   { scatterColor: [0.85, 0.55, 0.25], heightFraction: 0.09, viewDepthScale: 10.0, ambientLight: 0.55 },
  microtech: { scatterColor: [0.50, 0.72, 0.98], heightFraction: 0.10, viewDepthScale: 9.0,  ambientLight: 0.65 },

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

export const getBodyPosition = (id: string, mode: ScaleMode = 'display'): { pos: THREE.Vector3, resolvedId: string } | null => {
  if (id === 'stanton') return { pos: new THREE.Vector3(0, 0, 0), resolvedId: id };
  
  const landingZoneMap: Record<string, string> = {
    'orison': 'crusader',
    'lorville': 'hurston',
    'area18': 'arccorp',
    'new-babbage': 'microtech'
  };
  
  const targetId = landingZoneMap[id] || id;
  const db = StarMapDatabase.stanton[mode];
  
  for (const jp of db.jumpPoints) {
    if (jp.id === targetId) {
      const x = Math.cos(jp.angle) * jp.distance;
      const z = Math.sin(jp.angle) * jp.distance;
      const y = jp.y || 0;
      return { pos: new THREE.Vector3(x, y, z), resolvedId: targetId };
    }
  }

  for (const lp of db.lagrangePoints) {
    if (lp.id === targetId) {
      const x = Math.cos(lp.angle) * lp.distance;
      const z = Math.sin(lp.angle) * lp.distance;
      const y = lp.y || 0;
      return { pos: new THREE.Vector3(x, y, z), resolvedId: targetId };
    }
  }

  for (const planet of db.planets) {
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

export const getBodyData = (id: string, mode: ScaleMode = 'display'): CelestialBody3D | null => {
  const db = StarMapDatabase.stanton[mode];
  if (id === 'stanton') return { ...db.star, type: 'star' } as any;
  
  for (const jp of db.jumpPoints) {
    if (jp.id === id) return jp as CelestialBody3D;
  }
  for (const lp of db.lagrangePoints) {
    if (lp.id === id) return lp as CelestialBody3D;
  }

  for (const planet of db.planets) {
    if (planet.id === id) return { ...planet, type: 'planet' } as any;
    if (planet.moons) {
      for (const moon of planet.moons) {
        if (moon.id === id) return { ...moon, type: 'moon' } as any;
      }
    }
  }
  return null;
};

export const getBodySize = (id: string, mode: ScaleMode = 'display') => {
  const data = getBodyData(id, mode);
  return data ? data.size : 5;
};
`;

fs.writeFileSync('e:/dev/Citizenwiki-ui-demo/src/data/starMap3D.ts', tsFileContent);
