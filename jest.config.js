module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transformIgnorePatterns: ['/node_modules/(?!.*vue-set-path)'],
  testPathIgnorePatterns: ['/node_modules/', 'pathStorePiniaPlugin.spec.js'],
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/'],
  coverageReporters: ['text', 'json-summary'],
}
