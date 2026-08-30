/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/test/**/*.test.js'],
  testPathIgnorePatterns: ['/node_modules/', '/test/static-checks.js'],
  setupFiles: [],
  collectCoverageFrom: [],
};
