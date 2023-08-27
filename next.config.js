const { locales, sourceLocale } = require('./lingui.config.js')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales,
    defaultLocale: sourceLocale,
  },
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
            value: 'frame-ancestors https://safe.astar.network',
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
