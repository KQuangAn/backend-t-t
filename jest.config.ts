module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    testMatch: ['**/*.spec.ts'],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
  };