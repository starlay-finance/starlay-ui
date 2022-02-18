export const IS_VRT = process.env.IS_VRT === 'true'

export const VIEWPORT_DESKTOP = {
  '1920x1080': {
    viewport: {
      width: 1920,
      height: 1080,
    },
  },
  '1280x720': {
    viewport: {
      width: 1280,
      height: 720,
    },
  },
}
export const VIEWPORT_MOBILE_TABLET = {
  '820x1180': {
    viewport: {
      width: 820,
      height: 1180,
      isMobile: true,
      isLandscape: true,
    },
  },
  '390x844': {
    viewport: {
      width: 390,
      height: 844,
      isMobile: true,
      isLandscape: true,
    },
  },
  '320x640': {
    viewport: {
      width: 320,
      height: 640,
      isMobile: true,
      isLandscape: true,
    },
  },
}
export const VIEWPORT_ALL = {
  ...VIEWPORT_DESKTOP,
}

export const VIEWPORTS = {
  Desktop: {
    name: 'Desktop',
    styles: {
      width: '1920px',
      height: '1080px',
    },
    type: 'desktop',
  },
  Laptop: {
    name: 'Laptop',
    styles: {
      width: '1280px',
      height: '720px',
    },
    type: 'desktop',
  },
  iPadAir: {
    name: 'iPadAir',
    styles: {
      width: '820px',
      height: '1180px',
    },
    type: 'tablet',
  },
  iPad: {
    name: 'iPad',
    styles: {
      width: '768px',
      height: '1024px',
    },
    type: 'tablet',
  },
  iPhone12: {
    name: 'iPhone12/12Pro',
    styles: {
      width: '390px',
      height: '844px',
    },
  },
  xperia: {
    name: 'Xperia',
    styles: {
      width: '360px',
      height: '640px',
    },
    type: 'mobile',
  },
  iPhone5: {
    name: 'iPhone5',
    styles: {
      width: '320px',
      height: '568px',
    },
    type: 'mobile',
  },
} as const
