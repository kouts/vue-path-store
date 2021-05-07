import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'

const rollupConfigs = [
  {
    name: 'pathStore',
    file: 'pathStore'
  },
  {
    name: 'vuexPathStore',
    file: 'vuexPathStore'
  }
].map(({ name, file }) => ({
  input: `src/${file}.js`,
  external: ['vue', 'vuex'],
  output: [
    {
      format: 'umd',
      file: `dist/${file}.umd.js`,
      name,
      globals: {
        vue: 'Vue',
        vuex: 'Vuex'
      }
    },
    {
      format: 'umd',
      file: `dist/${file}.umd.min.js`,
      name,
      globals: {
        vue: 'Vue',
        vuex: 'Vuex'
      }
    },    
    {
      format: 'es',
      file: `dist/${file}.js`
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
            useBuiltIns: false
          }
        ]
      ]
    }),
    terser({
      include: [/^.+\.min\.js$/]      
    })
  ]  
}))

export default rollupConfigs
