export type LocationType = 'system' | 'planet' | 'moon' | 'landing_zone' | 'space_station' | 'jump_point';

export interface LocationData {
  id: string;
  name: string;
  type: LocationType;
  subtitle?: string;
  tag?: string;
  children?: LocationData[];
}

export const locationData: LocationData[] = [
  {
    id: 'stanton',
    name: 'Stanton',
    type: 'system',
    children: [
      {
        id: 'crusader',
        name: 'Crusader',
        type: 'planet',
        subtitle: 'Stanton II',
        children: [
          {
            id: 'orison',
            name: 'Orison',
            type: 'landing_zone',
            subtitle: 'Crusader • Stanton II',
            tag: 'LZ'
          },
          {
            id: 'cellin',
            name: 'Cellin',
            type: 'moon',
            subtitle: 'Crusader Moon'
          },
          {
            id: 'daymar',
            name: 'Daymar',
            type: 'moon',
            subtitle: 'Crusader Moon'
          },
          {
            id: 'yela',
            name: 'Yela',
            type: 'moon',
            subtitle: 'Crusader Moon'
          }
        ]
      },
      {
        id: 'hurston',
        name: 'Hurston',
        type: 'planet',
        subtitle: 'Stanton I',
        children: [
          {
            id: 'lorville',
            name: 'Lorville',
            type: 'landing_zone',
            subtitle: 'Hurston • Stanton I',
            tag: 'LZ'
          },
          {
            id: 'arial',
            name: 'Arial',
            type: 'moon',
            subtitle: 'Hurston Moon'
          },
          {
            id: 'aberdeen',
            name: 'Aberdeen',
            type: 'moon',
            subtitle: 'Hurston Moon'
          },
          {
            id: 'magda',
            name: 'Magda',
            type: 'moon',
            subtitle: 'Hurston Moon'
          },
          {
            id: 'ita',
            name: 'Ita',
            type: 'moon',
            subtitle: 'Hurston Moon'
          }
        ]
      },
      {
        id: 'arccorp',
        name: 'ArcCorp',
        type: 'planet',
        subtitle: 'Stanton III',
        children: [
          {
            id: 'area18',
            name: 'Area18',
            type: 'landing_zone',
            subtitle: 'ArcCorp • Stanton III',
            tag: 'LZ'
          },
          {
            id: 'lyria',
            name: 'Lyria',
            type: 'moon',
            subtitle: 'ArcCorp Moon'
          },
          {
            id: 'wala',
            name: 'Wala',
            type: 'moon',
            subtitle: 'ArcCorp Moon'
          }
        ]
      },
      {
        id: 'microtech',
        name: 'microTech',
        type: 'planet',
        subtitle: 'Stanton IV',
        children: [
          {
            id: 'new_babbage',
            name: 'New Babbage',
            type: 'landing_zone',
            subtitle: 'microTech • Stanton IV',
            tag: 'LZ'
          },
          {
            id: 'calliope',
            name: 'Calliope',
            type: 'moon',
            subtitle: 'microTech Moon'
          },
          {
            id: 'clio',
            name: 'Clio',
            type: 'moon',
            subtitle: 'microTech Moon'
          },
          {
            id: 'euterpe',
            name: 'Euterpe',
            type: 'moon',
            subtitle: 'microTech Moon'
          }
        ]
      },
      {
        id: 'jp-pyro',
        name: 'Pyro Jump Point',
        type: 'jump_point',
        subtitle: 'Jump Point to Pyro',
        tag: 'JP'
      },
      {
        id: 'jp-magnus',
        name: 'Magnus Jump Point',
        type: 'jump_point',
        subtitle: 'Jump Point to Magnus',
        tag: 'JP'
      },
      {
        id: 'jp-nyx',
        name: 'Nyx Jump Point',
        type: 'jump_point',
        subtitle: 'Jump Point to Nyx',
        tag: 'JP'
      }
    ]
  },
  {
    id: 'pyro',
    name: 'Pyro',
    type: 'system',
    children: [
      {
        id: 'pyro_i',
        name: 'Pyro I',
        type: 'planet',
        subtitle: 'Pyro I'
      },
      {
        id: 'pyro_ii',
        name: 'Pyro II',
        type: 'planet',
        subtitle: 'Pyro II'
      },
      {
        id: 'ruin_station',
        name: 'Ruin Station',
        type: 'space_station',
        subtitle: 'Pyro System',
        tag: 'ST'
      }
    ]
  },
  {
    id: 'terra',
    name: 'Terra',
    type: 'system',
    children: []
  },
  {
    id: 'magnus',
    name: 'Magnus',
    type: 'system',
    children: []
  }
];
