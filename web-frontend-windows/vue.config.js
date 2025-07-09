module.exports = {
  runtimeCompiler: true,
  publicPath: process.env.CDN_ENV ? process.env.CDN_ENV : '/',

  configureWebpack: {
    resolve: {
      fallback: {
        "path": require.resolve("path-browserify"),
        "fs": false
      }
    }
  },

  chainWebpack: config => {
    // workaround taken from webpack/webpack#6642
    config.output
      .globalObject('this')
    // Tell that our main wasm file needs to be loaded by file loader
    config.module
      .rule('mainwasm')
      .test(/stellarium-web-engine\.wasm$/)
      .type('javascript/auto')
      .use('file-loader')
        .loader('file-loader')
        .options({name: '[name].[hash:8].[ext]', outputPath: 'js'})
        .end()
    config.plugin('copy')
      .tap((args) => {
         if (args && args[0] && args[0].patterns) {
           const patterns = args[0].patterns
           patterns[0].force = true // so the original `/public` folder keeps priority
           // add other locations.
           patterns.unshift({
             from: '../skydata',
             to: 'skydata',
           })
         }
         return args
       })
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
