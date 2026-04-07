export interface GalleryImage {
  id: string;
  url: string;
  thumbnailUrl: string;
  filename: string;
  dataSource: string;
  resolution: string;
  captureDevice: string;
  timestamp: string;
  coordinates: string;
}

export interface GalleryCollection {
  id: string;
  name: string;
  images: GalleryImage[];
}

export const area18Gallery: GalleryImage[] = [
  {
    id: 'img-1',
    url: 'https://picsum.photos/seed/area18-1/1920/1080',
    thumbnailUrl: 'https://picsum.photos/seed/area18-1/400/300',
    filename: 'ArcCorp_Area18_Plaza_01.raw',
    dataSource: 'CRU-WIKI-S3-B244',
    resolution: '7680 x 4320 (8K)',
    captureDevice: 'Reliant Mako High-Res Sensor',
    timestamp: '2954-11-12 | 18:04:22 SET',
    coordinates: '12.01.5 / 22.4.9'
  },
  {
    id: 'img-2',
    url: 'https://picsum.photos/seed/area18-2/1920/1080',
    thumbnailUrl: 'https://picsum.photos/seed/area18-2/400/300',
    filename: 'ArcCorp_Area18_Transit_02.raw',
    dataSource: 'CRU-WIKI-S3-B245',
    resolution: '7680 x 4320 (8K)',
    captureDevice: 'Reliant Mako High-Res Sensor',
    timestamp: '2954-11-12 | 18:15:00 SET',
    coordinates: '12.01.6 / 22.4.8'
  },
  {
    id: 'img-3',
    url: 'https://picsum.photos/seed/area18-3/1920/1080',
    thumbnailUrl: 'https://picsum.photos/seed/area18-3/400/300',
    filename: 'ArcCorp_Area18_Alley_03.raw',
    dataSource: 'CRU-WIKI-S3-B246',
    resolution: '3840 x 2160 (4K)',
    captureDevice: 'MicroTech MobiGlas Camera',
    timestamp: '2954-11-13 | 09:22:11 SET',
    coordinates: '12.01.8 / 22.5.1'
  },
  {
    id: 'img-4',
    url: 'https://picsum.photos/seed/area18-4/1920/1080',
    thumbnailUrl: 'https://picsum.photos/seed/area18-4/400/300',
    filename: 'ArcCorp_Area18_Spaceport_04.raw',
    dataSource: 'CRU-WIKI-S3-B247',
    resolution: '7680 x 4320 (8K)',
    captureDevice: 'Reliant Mako High-Res Sensor',
    timestamp: '2954-11-14 | 22:00:05 SET',
    coordinates: '12.00.1 / 22.1.9'
  },
  {
    id: 'img-5',
    url: 'https://picsum.photos/seed/area18-5/1920/1080',
    thumbnailUrl: 'https://picsum.photos/seed/area18-5/400/300',
    filename: 'ArcCorp_Area18_AstroArmada_05.raw',
    dataSource: 'CRU-WIKI-S3-B248',
    resolution: '3840 x 2160 (4K)',
    captureDevice: 'MicroTech MobiGlas Camera',
    timestamp: '2954-11-15 | 14:30:00 SET',
    coordinates: '12.02.5 / 22.6.9'
  }
];

export const area18ArchitectureGallery: GalleryImage[] = [
  {
    id: 'arch-1',
    url: 'https://picsum.photos/seed/area18-arch-1/1920/1080',
    thumbnailUrl: 'https://picsum.photos/seed/area18-arch-1/400/300',
    filename: 'ArcCorp_Area18_Tower_01.raw',
    dataSource: 'CRU-WIKI-S3-B249',
    resolution: '7680 x 4320 (8K)',
    captureDevice: 'Reliant Mako High-Res Sensor',
    timestamp: '2954-11-16 | 10:00:00 SET',
    coordinates: '12.03.1 / 22.7.1'
  },
  {
    id: 'arch-2',
    url: 'https://picsum.photos/seed/area18-arch-2/1920/1080',
    thumbnailUrl: 'https://picsum.photos/seed/area18-arch-2/400/300',
    filename: 'ArcCorp_Area18_Bridge_02.raw',
    dataSource: 'CRU-WIKI-S3-B250',
    resolution: '3840 x 2160 (4K)',
    captureDevice: 'MicroTech MobiGlas Camera',
    timestamp: '2954-11-16 | 11:30:00 SET',
    coordinates: '12.03.2 / 22.7.2'
  }
];

export const area18NightGallery: GalleryImage[] = [
  {
    id: 'night-1',
    url: 'https://picsum.photos/seed/area18-night-1/1920/1080',
    thumbnailUrl: 'https://picsum.photos/seed/area18-night-1/400/300',
    filename: 'ArcCorp_Area18_Night_01.raw',
    dataSource: 'CRU-WIKI-S3-B251',
    resolution: '7680 x 4320 (8K)',
    captureDevice: 'Reliant Mako High-Res Sensor',
    timestamp: '2954-11-17 | 02:00:00 SET',
    coordinates: '12.04.1 / 22.8.1'
  },
  {
    id: 'night-2',
    url: 'https://picsum.photos/seed/area18-night-2/1920/1080',
    thumbnailUrl: 'https://picsum.photos/seed/area18-night-2/400/300',
    filename: 'ArcCorp_Area18_Night_02.raw',
    dataSource: 'CRU-WIKI-S3-B252',
    resolution: '3840 x 2160 (4K)',
    captureDevice: 'MicroTech MobiGlas Camera',
    timestamp: '2954-11-17 | 03:30:00 SET',
    coordinates: '12.04.2 / 22.8.2'
  },
  {
    id: 'night-3',
    url: 'https://picsum.photos/seed/area18-night-3/1920/1080',
    thumbnailUrl: 'https://picsum.photos/seed/area18-night-3/400/300',
    filename: 'ArcCorp_Area18_Night_03.raw',
    dataSource: 'CRU-WIKI-S3-B253',
    resolution: '7680 x 4320 (8K)',
    captureDevice: 'Reliant Mako High-Res Sensor',
    timestamp: '2954-11-17 | 04:00:00 SET',
    coordinates: '12.04.3 / 22.8.3'
  }
];

export const area18Galleries: GalleryCollection[] = [
  {
    id: 'general',
    name: 'General Overview',
    images: area18Gallery
  },
  {
    id: 'architecture',
    name: 'Architecture',
    images: area18ArchitectureGallery
  },
  {
    id: 'night',
    name: 'Night Views',
    images: area18NightGallery
  }
];

export const voyagerBarGallery: GalleryImage[] = [
  {
    id: 'voyager-1',
    url: 'https://picsum.photos/seed/voyagerbar-1/1920/1080',
    thumbnailUrl: 'https://picsum.photos/seed/voyagerbar-1/400/300',
    filename: 'VoyagerBar_Interior_01.raw',
    dataSource: 'CRU-WIKI-S3-F001',
    resolution: '3840 x 2160 (4K)',
    captureDevice: 'MicroTech MobiGlas Camera',
    timestamp: '2954-12-01 | 21:00:00 SET',
    coordinates: 'Unknown'
  },
  {
    id: 'voyager-2',
    url: 'https://picsum.photos/seed/voyagerbar-2/1920/1080',
    thumbnailUrl: 'https://picsum.photos/seed/voyagerbar-2/400/300',
    filename: 'VoyagerBar_Drinks_02.raw',
    dataSource: 'CRU-WIKI-S3-F002',
    resolution: '3840 x 2160 (4K)',
    captureDevice: 'MicroTech MobiGlas Camera',
    timestamp: '2954-12-01 | 21:15:00 SET',
    coordinates: 'Unknown'
  },
  {
    id: 'voyager-3',
    url: 'https://picsum.photos/seed/voyagerbar-3/1920/1080',
    thumbnailUrl: 'https://picsum.photos/seed/voyagerbar-3/400/300',
    filename: 'VoyagerBar_Lounge_03.raw',
    dataSource: 'CRU-WIKI-S3-F003',
    resolution: '7680 x 4320 (8K)',
    captureDevice: 'Reliant Mako High-Res Sensor',
    timestamp: '2954-12-01 | 22:30:00 SET',
    coordinates: 'Unknown'
  }
];

export const voyagerBarGalleries: GalleryCollection[] = [
  {
    id: 'general',
    name: 'General Overview',
    images: voyagerBarGallery
  }
];
