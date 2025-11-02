const VueExamplePlugin = require('vuepress-plugin-vue-example')

module.exports = {
  plugins: [
    VueExamplePlugin({
      componentsPath: '/docs/.examples/'
    })
  ],
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  silenceDeprecations: [
                    'legacy-js-api',
                    'import',
                    'global-builtin',
                    'color-functions',
                    'abs-percent'
                  ]
                }
              }
            }
          ]
        }
      ]
    }
  },
  dest: 'public',
  title: 'vue-path-store',
  // eslint-disable-next-line max-len
  description:
    // eslint-disable-next-line max-len
    'A simple state management solution for Vue, that uses the dot notation path syntax',
  themeConfig: {
    nav: [{ text: 'Github', link: 'https://github.com/kouts/vue-path-store' }],
    sidebar: [
      ['/', 'Introduction'],
      {
        title: 'PathStore',
        collapsable: false,
        children: [
          ['/path-store/installation/', 'Installation'],
          ['/path-store/usage/', 'Usage'],
          ['/path-store/api/', 'API']
        ]
      },
      ['/path-store-vuex-plugin/', 'PathStore Vuex Plugin'],
      ['/path-store-pinia-plugin/', 'PathStore Pinia Plugin'],
      ['/examples/', 'Examples']
    ]
  },
  head: [
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      }
    ],
    [
      'script',
      { src: 'https://polyfill.io/v3/polyfill.min.js?features=Array.from' }
    ],
    [
      'script',
      { src: 'https://polyfill.io/v3/polyfill.min.js?features=Promise' }
    ],
    [
      'script',
      {
        src: 'https://polyfill.io/v3/polyfill.min.js?features=NodeList.prototype.forEach'
      }
    ],
    [
      'script',
      { src: 'https://polyfill.io/v3/polyfill.min.js?features=Object.assign' }
    ]
  ]
}
