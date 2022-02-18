module.exports = ({ config }) => {
  // disable storybook loader
  const fileLoaderRule = config.module.rules.find((rule) =>
    rule.test.test('.svg'),
  )
  fileLoaderRule.exclude = /\.svg$/

  config.module.rules.push({
    test: /\.svg$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          svgoConfig: {
            plugins: {
              // see: https://github.com/svg/svgo#what-it-can-do
              removeViewBox: false, // to enable overwriteing width/height by CSS
              moveElemsAttrsToGroup: false, // to prevent attribute destruction for overwriting color
              convertShapeToPath: false,
            },
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
}
