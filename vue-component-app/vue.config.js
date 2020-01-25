const webpack = require('webpack')
module.exports = {    
  configureWebpack: {
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ],
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js'
      }
  },
  chainWebpack:
    config => {
      config.optimization.delete('splitChunks')
      if(config.plugins.has('extract-css')) {
        const extractCSSPlugin = config.plugin('extract-css')
        extractCSSPlugin && extractCSSPlugin.tap(() => [{
          filename: '[name].css',
          chunkFilename: '[name].css'
        }])
      }
    },
}