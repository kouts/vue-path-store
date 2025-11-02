import { config } from '@kouts/eslint-config'

export default [
  ...config({
    vueVersion: 2,
    ts: false,
    env: ['browser'],
  }),
  {
    name: 'docs-overrides',
    // Disable vue/require-name-property and multi-word-component-names in docs
    files: ['docs/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/require-name-property': 'off',
    },
  },
]
