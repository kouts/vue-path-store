const VueExamplePlugin = require('vuepress-plugin-vue-example')

module.exports = {
  plugins: [
    VueExamplePlugin({
      componentsPath: '/docs/.examples/'
    })
  ],
  dest: 'public',
  title: 'vue-path-store',
  description: 'A simple state management solution for Vue, that uses the dot notation path syntax',
  themeConfig: {
    nav: [{ text: 'Github', link: 'https://github.com/kouts/vue-path-store' }],
    sidebar: [
      ['/', 'Introduction'],
      ['/installation/', 'Installation']
    ]
  },
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' }],
    ['script', { src: 'https://polyfill.io/v3/polyfill.min.js?features=Array.from' }],
    ['script', { src: 'https://polyfill.io/v3/polyfill.min.js?features=Promise' }],
    ['script', { src: 'https://polyfill.io/v3/polyfill.min.js?features=NodeList.prototype.forEach' }],
    ['script', { src: 'https://polyfill.io/v3/polyfill.min.js?features=Object.assign' }]
  ]
}
