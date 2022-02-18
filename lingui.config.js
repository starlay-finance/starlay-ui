module.exports = {
  locales: ['en'],
  sourceLocale: 'en',
  orderBy: 'origin',
  catalogs: [
    {
      path: '<rootDir>/src/locales/{locale}/messages',
      include: ['<rootDir>/src'],
      exclude: ['**/node_modules/**'],
    },
  ],
  formatOptions: { origins: true, lineNumbers: false },
}
