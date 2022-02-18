module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'styled-components',
      {
        ssr: true,
        displayName: process.env.NODE_ENV === 'development',
      },
    ],
    'babel-plugin-macros',
  ],
}
