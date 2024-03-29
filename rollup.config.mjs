import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'

const globals = {
  vue: 'Vue'
}

const rollupConfigsModules = ['pathStore', 'pathStoreVuexPlugin', 'pathStorePiniaPlugin'].map((name) => ({
  input: `src/${name}.js`,
  external: ['vue', 'vuex'],
  output: [
    {
      format: 'umd',
      file: `dist/umd/${name}.js`,
      name,
      globals
    },
    {
      format: 'es',
      file: `dist/es/${name}.js`
    },
    {
      format: 'cjs',
      file: `dist/cjs/${name}.js`
    }
  ],
  plugins: [
    nodeResolve(),
    babel({
      babelHelpers: 'bundled',
      presets: [
        [
          '@vue/cli-plugin-babel/preset',
          {
            useBuiltIns: false,
            modules: false
          }
        ]
      ]
    })
  ]
}))

const rollupConfigsMin = ['pathStore', 'pathStoreVuexPlugin', 'pathStorePiniaPlugin'].map((name) => ({
  input: `src/${name}.js`,
  external: ['vue', 'vuex'],
  output: [
    {
      format: 'umd',
      file: `dist/umd/${name}.min.js`,
      name,
      globals
    }
  ],
  plugins: [
    nodeResolve(),
    babel({
      babelHelpers: 'bundled',
      presets: [
        [
          '@vue/cli-plugin-babel/preset',
          {
            useBuiltIns: false,
            modules: false
          }
        ]
      ]
    }),
    terser()
  ]
}))

const rollupConfigs = rollupConfigsModules.concat(rollupConfigsMin)

export default rollupConfigs
