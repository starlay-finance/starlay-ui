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
