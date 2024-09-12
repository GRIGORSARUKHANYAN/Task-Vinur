// jest.config.js
module.exports = {
    preset: 'ts-jest',  // Use ts-jest preset for TypeScript support
    testEnvironment: 'node',  // Set the test environment
    transform: {
      '^.+\\.tsx?$': 'ts-jest',  // Use ts-jest to transform TypeScript files
    },
    moduleFileExtensions: ['js', 'ts', 'json', 'node'], // Add TypeScript to module file extensions
  };
  