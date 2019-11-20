module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/graphs-deploy/'
    : '/',
  configureWebpack: {
    devtool: 'source-map'
  }
}