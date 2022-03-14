module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^src(.*)$': '<rootDir>/src/$1',
    '\\.svg': '<rootDir>/src/__tests__/svgrMock.js',
    '\\.(jpg|png|webp)': '<rootDir>/src/__tests__/staticImageMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/config/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/src/__tests__/'],
  transform: {
    '^.+.(j|t)sx?$': '<rootDir>/node_modules/babel-jest',
  },
}
