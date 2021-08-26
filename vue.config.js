module.exports = {
  configureWebpack:{
    externals:{
      'BMap':'BMap',
      'BMapLib':'BMapLib'
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
