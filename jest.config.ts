import type { Config } from 'jest';

const config: Config = {
  // No preset here, configuring everything manually
  setupFiles: ['<rootDir>/jest/setup.js'], // Adjust if your setup file is located elsewhere
  transform: {
    '^.+\\.tsx?$': 'ts-jest',  // Use ts-jest for TypeScript files
    '^.+\\.jsx?$': 'babel-jest', // Use babel-jest for JavaScript files
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/build/', // Ignore build directories if applicable
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Include file extensions used in your project
};

export default config;
