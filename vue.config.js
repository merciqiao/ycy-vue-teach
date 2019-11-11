module.exports = {
  //...
  devServer: {
    port: 9003,
    proxy: {
      '/api': {
        target: 'http://101ycy.com:10001',
        pathRewrite: {'^/api' : ''}
      }
    }
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    },
    moment: {
      locales: [
        'moment'
      ]
    }
  }
};
