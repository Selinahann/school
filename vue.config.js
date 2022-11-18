module.exports = {
  lintOnSave: false,
  // publicPath: '/public/dist/',
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/scss/base.scss";'
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7001',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
