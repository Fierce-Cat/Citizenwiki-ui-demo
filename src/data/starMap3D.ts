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
  type?: 'star' | 'planet' | 'moon' | 'jump_point' | 'lagrange point';
  parentBody?: string | null;
}

export type ScaleMode = 'realistic' | 'display';

export const StarMapDatabase = {
  stanton: {
    display: {
  "star": {
    "id": "stanton",
    "name": "Stanton",
    "type": "star",
    "color": "#ffcc00",
    "size": 12
  },
  "planets": [
    {
      "id": "arccorp",
      "name": "ArcCorp",
      "type": "planet",
      "color": "#ac665a",
      "textureUrl": "/starmap/textures/bodies/arccorp.webp",
      "hdTextureUrl": "/starmap/textures/bodies-hd/arccorp.webp",
      "cloudsUrl": "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png",
      "distance": 200,
      "size": 5,
      "angle": 5.410520681182422,
      "moons": [
        {
          "id": "lyria",
          "name": "Lyria",
          "type": "moon",
          "color": "#708eb2",
          "textureUrl": "/starmap/textures/bodies/lyria.webp",
          "hdTextureUrl": "/starmap/textures/bodies-hd/lyria.webp",
          "distance": 20,
          "size": 1.4,
          "angle": 0.25535912285929036
        },
        {
          "id": "wala",
          "name": "Wala",
          "type": "moon",
          "color": "#7c969e",
          "textureUrl": "/starmap/textures/bodies/wala.webp",
          "hdTextureUrl": "/starmap/textures/bodies-hd/wala.webp",
          "distance": 32,
          "size": 1.5,
          "angle": 2.512279285198198
        }
      ]
    },
    {
      "id": "crusader",
      "name": "Crusader",
      "type": "planet",
      "color": "#e79893",
      "textureUrl": "/starmap/textures/bodies/crusader.webp",
      "hdTextureUrl": "/starmap/textures/bodies-hd/crusader.webp",
      "distance": 140,
      "size": 8,
      "angle": 3.2812189937493397,
      "moons": [
        {
          "id": "cellin",
          "name": "Cellin",
          "type": "moon",
          "color": "#717f90",
          "textureUrl": "/starmap/textures/bodies/cellin.webp",
          "hdTextureUrl": "/starmap/textures/bodies-hd/cellin.webp",
          "distance": 25,
          "size": 1.5,
          "angle": 4.1887902047863905
        },
        {
          "id": "daymar",
          "name": "Daymar",
          "type": "moon",
          "color": "#d3aa96",
          "textureUrl": "/starmap/textures/bodies/daymar.webp",
          "hdTextureUrl": "/starmap/textures/bodies-hd/daymar.webp",
          "distance": 35,
          "size": 1.8,
          "angle": 1.0471975511965976
        },
        {
          "id": "yela",
          "name": "Yela",
          "type": "moon",
          "color": "#808096",
          "textureUrl": "/starmap/textures/bodies/yela.webp",
          "hdTextureUrl": "/starmap/textures/bodies-hd/yela.webp",
          "distance": 50,
          "size": 1.6,
          "angle": 2.443460952792061
        }
      ]
    },
    {
      "id": "hurston",
      "name": "Hurston",
      "type": "planet",
      "color": "#8a6547",
      "textureUrl": "/starmap/textures/bodies/hurston.webp",
      "hdTextureUrl": "/starmap/textures/bodies-hd/hurston.webp",
      "cloudsUrl": "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png",
      "reflectionUrl": "/starmap/textures/bodies-reflection/hurston.webp",
      "distance": 80,
      "size": 4,
      "angle": 0,
      "moons": [
        {
          "id": "aberdeen",
          "name": "Aberdeen",
          "type": "moon",
          "color": "#dbb458",
          "textureUrl": "/starmap/textures/bodies/aberdeen.webp",
          "hdTextureUrl": "/starmap/textures/bodies-hd/aberdeen.webp",
          "distance": 22,
          "size": 1.4,
          "angle": 0.6374640559984089
        },
        {
          "id": "arial",
          "name": "Arial",
          "type": "moon",
          "color": "#d68e22",
          "textureUrl": "/starmap/textures/bodies/arial.webp",
          "hdTextureUrl": "/starmap/textures/bodies-hd/arial.webp",
          "distance": 15,
          "size": 1.2,
          "angle": 5.642509845357507
        },
        {
          "id": "ita",
          "name": "Ita",
          "type": "moon",
          "color": "#79877a",
          "textureUrl": "/starmap/textures/bodies/ita.webp",
          "hdTextureUrl": "/starmap/textures/bodies-hd/ita.webp",
          "distance": 38,
          "size": 1.1,
          "angle": 1.7453292519943295
        },
        {
          "id": "magda",
          "name": "Magda",
          "type": "moon",
          "color": "#cfa59f",
          "textureUrl": "/starmap/textures/bodies/magda.webp",
          "hdTextureUrl": "/starmap/textures/bodies-hd/magda.webp",
          "distance": 30,
          "size": 1.3,
          "angle": 4.052567256668233
        }
      ]
    },
    {
      "id": "microtech",
      "name": "microTech",
      "type": "planet",
      "color": "#a7b8c1",
      "textureUrl": "/starmap/textures/bodies/microtech.webp",
      "hdTextureUrl": "/starmap/textures/bodies-hd/microtech.webp",
      "cloudsUrl": "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png",
      "reflectionUrl": "/starmap/textures/bodies-reflection/microtech.webp",
      "distance": 260,
      "size": 5.5,
      "angle": 1.027405517478982,
      "moons": [
        {
          "id": "calliope",
          "name": "Calliope",
          "type": "moon",
          "color": "#7c8494",
          "textureUrl": "/starmap/textures/bodies/calliope.webp",
          "hdTextureUrl": "/starmap/textures/bodies-hd/calliope.webp",
          "distance": 22,
          "size": 1.3,
          "angle": 3.3994475972794356
        },
        {
          "id": "clio",
          "name": "Clio",
          "type": "moon",
          "color": "#828d89",
          "textureUrl": "/starmap/textures/bodies/clio.webp",
          "hdTextureUrl": "/starmap/textures/bodies-hd/clio.webp",
          "reflectionUrl": "/starmap/textures/bodies-reflection/clio.webp",
          "distance": 30,
          "size": 1.4,
          "angle": 4.866658632968468
        },
        {
          "id": "euterpe",
          "name": "Euterpe",
          "type": "moon",
          "color": "#828d9f",
          "textureUrl": "/starmap/textures/bodies/euterpe.webp",
          "hdTextureUrl": "/starmap/textures/bodies-hd/euterpe.webp",
          "reflectionUrl": "/starmap/textures/bodies-reflection/euterpe.webp",
          "distance": 40,
          "size": 1.2,
          "angle": 4.9570841415142946
        }
      ]
    }
  ],
  "lagrangePoints": [
    {
      "id": "arc-l1",
      "name": "ARC-L1",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 180.0025433156569,
      "angle": -0.8726646413188808,
      "size": 1.5,
      "y": 0,
      "parentBody": "arccorp"
    },
    {
      "id": "arc-l2",
      "name": "ARC-L2",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 220.00309118590164,
      "angle": -0.8726646413202113,
      "size": 1.5,
      "y": 0,
      "parentBody": "arccorp"
    },
    {
      "id": "arc-l3",
      "name": "ARC-L3",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 200.00282630374775,
      "angle": 2.6179938484003253,
      "size": 1.5,
      "y": 0,
      "parentBody": "arccorp"
    },
    {
      "id": "arc-l4",
      "name": "ARC-L4",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 200.0028081537848,
      "angle": 0.17453293014149568,
      "size": 1.5,
      "y": 0,
      "parentBody": "arccorp"
    },
    {
      "id": "arc-l5",
      "name": "ARC-L5",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 200.0028075167,
      "angle": -1.9198619442723115,
      "size": 1.5,
      "y": 0,
      "parentBody": "arccorp"
    },
    {
      "id": "cru-l1",
      "name": "CRU-L1",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 125.99999258612308,
      "angle": -3.0019663073748952,
      "size": 1.5,
      "y": 0,
      "parentBody": "crusader"
    },
    {
      "id": "cru-l2",
      "name": "CRU-L2",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 153.99989481013773,
      "angle": -3.001965337412294,
      "size": 1.5,
      "y": 0,
      "parentBody": "crusader"
    },
    {
      "id": "cru-l3",
      "name": "CRU-L3",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 139.9999242283498,
      "angle": 0.13962667985500693,
      "size": 1.5,
      "y": 0,
      "parentBody": "crusader"
    },
    {
      "id": "cru-l4",
      "name": "CRU-L4",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 139.99999679964583,
      "angle": -1.9547689820889116,
      "size": 1.5,
      "y": 0,
      "parentBody": "crusader"
    },
    {
      "id": "cru-l5",
      "name": "CRU-L5",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 139.99999055765724,
      "angle": 2.2340213557117394,
      "size": 1.5,
      "y": 0,
      "parentBody": "crusader"
    },
    {
      "id": "hur-l1",
      "name": "HUR-L1",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 71.9999996532419,
      "angle": 0,
      "size": 1.5,
      "y": 0,
      "parentBody": "hurston"
    },
    {
      "id": "hur-l2",
      "name": "HUR-L2",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 88.00000028450349,
      "angle": 0,
      "size": 1.5,
      "y": 0,
      "parentBody": "hurston"
    },
    {
      "id": "hur-l3",
      "name": "HUR-L3",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 80.00000315630825,
      "angle": -3.1415925661999093,
      "size": 1.5,
      "y": 0,
      "parentBody": "hurston"
    },
    {
      "id": "hur-l4",
      "name": "HUR-L4",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 80.00000736452628,
      "angle": 1.0471976275734538,
      "size": 1.5,
      "y": 0,
      "parentBody": "hurston"
    },
    {
      "id": "hur-l5",
      "name": "HUR-L5",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 80.00000577080891,
      "angle": -1.0471976620784518,
      "size": 1.5,
      "y": 0,
      "parentBody": "hurston"
    },
    {
      "id": "mic-l1",
      "name": "MIC-L1",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 233.99929733077448,
      "angle": 1.0274032505590718,
      "size": 1.5,
      "y": 0,
      "parentBody": "microtech"
    },
    {
      "id": "mic-l2",
      "name": "MIC-L2",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 286.0061738546674,
      "angle": 1.0274034960679865,
      "size": 1.5,
      "y": 0,
      "parentBody": "microtech"
    },
    {
      "id": "mic-l3",
      "name": "MIC-L3",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 259.9943592821123,
      "angle": -2.114070090213329,
      "size": 1.5,
      "y": 0,
      "parentBody": "microtech"
    },
    {
      "id": "mic-l4",
      "name": "MIC-L4",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 259.99706966540276,
      "angle": 2.0745856033687335,
      "size": 1.5,
      "y": 0,
      "parentBody": "microtech"
    },
    {
      "id": "mic-l5",
      "name": "MIC-L5",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 260.0011684097299,
      "angle": -0.01959926170205679,
      "size": 1.5,
      "y": 0,
      "parentBody": "microtech"
    }
  ],
  "jumpPoints": [
    {
      "id": "jp-magnus",
      "name": "Stanton-Magnus JP",
      "type": "jump_point",
      "color": "#00ccff",
      "destination": "Magnus System",
      "travelTime": "8m 20s",
      "distance": 120,
      "size": 2.5,
      "angle": 2.7812602496239767,
      "y": 80
    },
    {
      "id": "jp-pyro",
      "name": "Stanton-Pyro JP",
      "type": "jump_point",
      "color": "#ff4400",
      "destination": "Pyro System",
      "travelTime": "12m 45s",
      "distance": 170,
      "size": 2.5,
      "angle": -1.4530250057052194,
      "y": 0
    },
    {
      "id": "jp-terra",
      "name": "Stanton-Terra JP",
      "type": "jump_point",
      "color": "#00ff88",
      "destination": "Terra System",
      "travelTime": "15m 10s",
      "distance": 310,
      "size": 2.5,
      "angle": -0.10273105880196022,
      "y": 0
    }
  ]
},
    realistic: {
  "star": {
    "id": "stanton",
    "name": "Stanton",
    "type": "star",
    "color": "#ffcc00",
    "size": 696000
  },
  "planets": [
    {
      "id": "arccorp",
      "name": "ArcCorp",
      "type": "planet",
      "color": "#ac665a",
      "textureUrl": "/starmap/textures/bodies/arccorp.webp",
      "hdTextureUrl": "/starmap/textures/bodies-hd/arccorp.webp",
      "cloudsUrl": "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png",
      "distance": 28917272.576,
      "size": 800,
      "angle": 5.410520681182422,
      "moons": [
        {
          "id": "lyria",
          "name": "Lyria",
          "type": "moon",
          "color": "#708eb2",
          "textureUrl": "/starmap/textures/bodies/lyria.webp",
          "hdTextureUrl": "/starmap/textures/bodies-hd/lyria.webp",
          "distance": 119827.896,
          "size": 223,
          "angle": 0.25535912285929036
        },
        {
          "id": "wala",
          "name": "Wala",
          "type": "moon",
          "color": "#7c969e",
          "textureUrl": "/starmap/textures/bodies/wala.webp",
          "hdTextureUrl": "/starmap/textures/bodies-hd/wala.webp",
          "distance": 257308.32,
          "size": 283,
          "angle": 2.512279285198198
        }
      ]
    },
    {
      "id": "crusader",
      "name": "Crusader",
      "type": "planet",
      "color": "#e79893",
      "textureUrl": "/starmap/textures/bodies/crusader.webp",
      "hdTextureUrl": "/starmap/textures/bodies-hd/crusader.webp",
      "distance": 19148527.616,
      "size": 7450.01,
      "angle": 3.2812189937493397,
      "moons": [
        {
          "id": "cellin",
          "name": "Cellin",
          "type": "moon",
          "color": "#717f90",
          "textureUrl": "/starmap/textures/bodies/cellin.webp",
          "hdTextureUrl": "/starmap/textures/bodies-hd/cellin.webp",
          "distance": 50863.26,
          "size": 260,
          "angle": 4.1887902047863905
        },
        {
          "id": "daymar",
          "name": "Daymar",
          "type": "moon",
          "color": "#d3aa96",
          "textureUrl": "/starmap/textures/bodies/daymar.webp",
          "hdTextureUrl": "/starmap/textures/bodies-hd/daymar.webp",
          "distance": 63279.908,
          "size": 295,
          "angle": 1.0471975511965976
        },
        {
          "id": "yela",
          "name": "Yela",
          "type": "moon",
          "color": "#808096",
          "textureUrl": "/starmap/textures/bodies/yela.webp",
          "hdTextureUrl": "/starmap/textures/bodies-hd/yela.webp",
          "distance": 79286.88,
          "size": 313,
          "angle": 2.443460952792061
        }
      ]
    },
    {
      "id": "hurston",
      "name": "Hurston",
      "type": "planet",
      "color": "#8a6547",
      "textureUrl": "/starmap/textures/bodies/hurston.webp",
      "hdTextureUrl": "/starmap/textures/bodies-hd/hurston.webp",
      "cloudsUrl": "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png",
      "reflectionUrl": "/starmap/textures/bodies-reflection/hurston.webp",
      "distance": 12850457.6,
      "size": 1000,
      "angle": 0,
      "moons": [
        {
          "id": "aberdeen",
          "name": "Aberdeen",
          "type": "moon",
          "color": "#dbb458",
          "textureUrl": "/starmap/textures/bodies/aberdeen.webp",
          "hdTextureUrl": "/starmap/textures/bodies-hd/aberdeen.webp",
          "distance": 68815.024,
          "size": 274,
          "angle": 0.6374640559984089
        },
        {
          "id": "arial",
          "name": "Arial",
          "type": "moon",
          "color": "#d68e22",
          "textureUrl": "/starmap/textures/bodies/arial.webp",
          "hdTextureUrl": "/starmap/textures/bodies-hd/arial.webp",
          "distance": 52658.856,
          "size": 344.5,
          "angle": 5.642509845357507
        },
        {
          "id": "ita",
          "name": "Ita",
          "type": "moon",
          "color": "#79877a",
          "textureUrl": "/starmap/textures/bodies/ita.webp",
          "hdTextureUrl": "/starmap/textures/bodies-hd/ita.webp",
          "distance": 116686.336,
          "size": 325,
          "angle": 1.7453292519943295
        },
        {
          "id": "magda",
          "name": "Magda",
          "type": "moon",
          "color": "#cfa59f",
          "textureUrl": "/starmap/textures/bodies/magda.webp",
          "hdTextureUrl": "/starmap/textures/bodies-hd/magda.webp",
          "distance": 94246.656,
          "size": 340.83,
          "angle": 4.052567256668233
        }
      ]
    },
    {
      "id": "microtech",
      "name": "microTech",
      "type": "planet",
      "color": "#a7b8c1",
      "textureUrl": "/starmap/textures/bodies/microtech.webp",
      "hdTextureUrl": "/starmap/textures/bodies-hd/microtech.webp",
      "cloudsUrl": "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png",
      "reflectionUrl": "/starmap/textures/bodies-reflection/microtech.webp",
      "distance": 43443216.384,
      "size": 1000,
      "angle": 1.027405517478982,
      "moons": [
        {
          "id": "calliope",
          "name": "Calliope",
          "type": "moon",
          "color": "#7c8494",
          "textureUrl": "/starmap/textures/bodies/calliope.webp",
          "hdTextureUrl": "/starmap/textures/bodies-hd/calliope.webp",
          "distance": 65823.064,
          "size": 240,
          "angle": 3.3994475972794356
        },
        {
          "id": "clio",
          "name": "Clio",
          "type": "moon",
          "color": "#828d89",
          "textureUrl": "/starmap/textures/bodies/clio.webp",
          "hdTextureUrl": "/starmap/textures/bodies-hd/clio.webp",
          "reflectionUrl": "/starmap/textures/bodies-reflection/clio.webp",
          "distance": 95742.64,
          "size": 337.17,
          "angle": 4.866658632968468
        },
        {
          "id": "euterpe",
          "name": "Euterpe",
          "type": "moon",
          "color": "#828d9f",
          "textureUrl": "/starmap/textures/bodies/euterpe.webp",
          "hdTextureUrl": "/starmap/textures/bodies-hd/euterpe.webp",
          "reflectionUrl": "/starmap/textures/bodies-reflection/euterpe.webp",
          "distance": 107710.472,
          "size": 213,
          "angle": 4.9570841415142946
        }
      ]
    }
  ],
  "lagrangePoints": [
    {
      "id": "arc-l1",
      "name": "ARC-L1",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 26025913.832763612,
      "angle": -0.8726646413188808,
      "y": 8.077,
      "size": 50,
      "parentBody": "arccorp"
    },
    {
      "id": "arc-l2",
      "name": "ARC-L2",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 31809447.73710752,
      "angle": -0.8726646413202113,
      "y": 8.077,
      "size": 50,
      "parentBody": "arccorp"
    },
    {
      "id": "arc-l3",
      "name": "ARC-L3",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 28917682.09387138,
      "angle": 2.6179938484003253,
      "y": 8.077,
      "size": 50,
      "parentBody": "arccorp"
    },
    {
      "id": "arc-l4",
      "name": "ARC-L4",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 28917679.46963417,
      "angle": 0.17453293014149568,
      "y": 8.077,
      "size": 50,
      "parentBody": "arccorp"
    },
    {
      "id": "arc-l5",
      "name": "ARC-L5",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 28917679.377520397,
      "angle": -1.9198619442723115,
      "y": 8.077,
      "size": 50,
      "parentBody": "arccorp"
    },
    {
      "id": "cru-l1",
      "name": "CRU-L1",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 17233674.324378558,
      "angle": -3.0019663073748952,
      "y": 0,
      "size": 50,
      "parentBody": "crusader"
    },
    {
      "id": "cru-l2",
      "name": "CRU-L2",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 21063366.581806958,
      "angle": -3.001965337412294,
      "y": 0,
      "size": 50,
      "parentBody": "crusader"
    },
    {
      "id": "cru-l3",
      "name": "CRU-L3",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 19148517.7901096,
      "angle": 0.13962667985500693,
      "y": 0,
      "size": 50,
      "parentBody": "crusader"
    },
    {
      "id": "cru-l4",
      "name": "CRU-L4",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 19148527.716063205,
      "angle": -1.9547689820889116,
      "y": 0,
      "size": 50,
      "parentBody": "crusader"
    },
    {
      "id": "cru-l5",
      "name": "CRU-L5",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 19148526.862313963,
      "angle": 2.2340213557117394,
      "y": 0,
      "size": 50,
      "parentBody": "crusader"
    },
    {
      "id": "hur-l1",
      "name": "HUR-L1",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 11565411.328,
      "angle": 0,
      "y": 0,
      "size": 50,
      "parentBody": "hurston"
    },
    {
      "id": "hur-l2",
      "name": "HUR-L2",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 14135502.848,
      "angle": 0,
      "y": 0,
      "size": 50,
      "parentBody": "hurston"
    },
    {
      "id": "hur-l3",
      "name": "HUR-L3",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 12850457.600000048,
      "angle": -3.1415925661999093,
      "y": 0,
      "size": 50,
      "parentBody": "hurston"
    },
    {
      "id": "hur-l4",
      "name": "HUR-L4",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 12850458.275969112,
      "angle": 1.0471976275734538,
      "y": 0,
      "size": 50,
      "parentBody": "hurston"
    },
    {
      "id": "hur-l5",
      "name": "HUR-L5",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 12850458.019969154,
      "angle": -1.0471976620784518,
      "y": 0,
      "size": 50,
      "parentBody": "hurston"
    },
    {
      "id": "mic-l1",
      "name": "MIC-L1",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 39098900.11076279,
      "angle": 1.0274032505590718,
      "y": 0,
      "size": 50,
      "parentBody": "microtech"
    },
    {
      "id": "mic-l2",
      "name": "MIC-L2",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 47788719.66781083,
      "angle": 1.0274034960679865,
      "y": 0,
      "size": 50,
      "parentBody": "microtech"
    },
    {
      "id": "mic-l3",
      "name": "MIC-L3",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 43442410.29306785,
      "angle": -2.114070090213329,
      "y": 0,
      "size": 50,
      "parentBody": "microtech"
    },
    {
      "id": "mic-l4",
      "name": "MIC-L4",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 43442863.17051981,
      "angle": 2.0745856033687335,
      "y": 0,
      "size": 50,
      "parentBody": "microtech"
    },
    {
      "id": "mic-l5",
      "name": "MIC-L5",
      "type": "lagrange point",
      "color": "#ffffff",
      "distance": 43443548.02896535,
      "angle": -0.01959926170205679,
      "y": 0,
      "size": 50,
      "parentBody": "microtech"
    }
  ],
  "jumpPoints": [
    {
      "id": "jp-magnus",
      "name": "Stanton-Magnus JP",
      "type": "jump_point",
      "color": "#00ccff",
      "destination": "Magnus System",
      "travelTime": "8m 20s",
      "distance": 69555985.31336994,
      "size": 2.5,
      "angle": 2.7812602496239767,
      "y": 20198396.608
    },
    {
      "id": "jp-pyro",
      "name": "Stanton-Pyro JP",
      "type": "jump_point",
      "color": "#ff4400",
      "destination": "Pyro System",
      "travelTime": "12m 45s",
      "distance": 28301398.275199987,
      "size": 2.5,
      "angle": -1.4530250057052194,
      "y": -2676285.679
    },
    {
      "id": "jp-terra",
      "name": "Stanton-Terra JP",
      "type": "jump_point",
      "color": "#00ff88",
      "destination": "Terra System",
      "travelTime": "15m 10s",
      "distance": 51572056.31417717,
      "size": 2.5,
      "angle": -0.10273105880196022,
      "y": -4339551.619
    }
  ]
}
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

export const findBodyPath = (id: string | null, mode: ScaleMode = 'display'): { id: string, name: string }[] => {
  const path: { id: string, name: string }[] = [{ id: 'stanton', name: 'Stanton' }];
  if (!id || id === 'stanton') return path;

  const db = StarMapDatabase.stanton[mode];
  
  // Check planets and moons
  for (const planet of db.planets) {
    if (planet.id === id) {
      path.push({ id: planet.id, name: planet.name });
      return path;
    }
    if (planet.moons) {
      for (const moon of planet.moons) {
        if (moon.id === id) {
          path.push({ id: planet.id, name: planet.name });
          path.push({ id: moon.id, name: moon.name });
          return path;
        }
      }
    }
  }

  // Check jump points
  for (const jp of db.jumpPoints) {
    if (jp.id === id) {
      path.push({ id: jp.id, name: jp.name });
      return path;
    }
  }

  // Check lagrange points
  for (const lp of db.lagrangePoints) {
    if (lp.id === id) {
      // Find parent planet for lagrange point
      const parentId = (lp as any).parentBody;
      if (parentId) {
        const parent = db.planets.find(p => p.id === parentId);
        if (parent) {
          path.push({ id: parent.id, name: parent.name });
        }
      }
      path.push({ id: lp.id, name: lp.name });
      return path;
    }
  }

  return path;
};
