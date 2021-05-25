const config = require('eslint-config-kouts/prettier.config.js')
const projectConfig = {
  printWidth: 80
}

module.exports = Object.assign(config, projectConfig)
