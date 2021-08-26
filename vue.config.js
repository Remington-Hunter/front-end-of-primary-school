module.exports = {
  configureWebpack:{
    externals:{
      'AMap': 'AMap'
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
