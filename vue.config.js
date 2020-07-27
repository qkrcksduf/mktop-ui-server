module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    https: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
    disableHostCheck: true,
  },
};
