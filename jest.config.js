module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^src(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/src/__tests__/'],
  transform: {
    '^.+.(j|t)sx?$': [
      '@swc/jest',
      {
        sourceMaps: true,
        module: { type: 'commonjs' },
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
          },
          transform: {
            react: { runtime: 'automatic' },
          },
        },
      },
    ],
  },
}
