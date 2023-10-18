const { locales, sourceLocale } = require('./lingui.config.js')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales,
    defaultLocale: sourceLocale,
  },
  redirects: () => [
    {
      source: '/app/launchpad',
      destination: '/app/evm/launchpad',
      permanent: true,
    },
    { source: '/app/lay', destination: '/app/evm/lay', permanent: true },
    {
      source: '/app/markets',
      destination: '/app/evm/markets',
      permanent: true,
    },
    { source: '/app/makai', destination: '/app/evm/makai', permanent: true },
  ],
  headers: async () => {
    return [
      {
        source: '/manifest.json',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET' },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, content-type, Authorization',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              'frame-ancestors https://safe.astar.network https://staging-safe.astar.network',
          },
        ],
      },
    ]
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false,
                      moveElemsAttrsToGroup: false,
                      convertShapeToPath: false,
                      mergePaths: false,
                      collapseGroups: false,
                    },
                  },
                },
                'prefixIds',
              ],
            },
          },
        },
      ],
    })
    config.module.rules.push({
      test: /\.po/,
      use: ['@lingui/loader'],
    })
    return config
  },
}

module.exports = nextConfig
