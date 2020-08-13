module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    https: true,
    https: {
      key: fs.readFileSync('/home/ubuntu/mktop/keys/privkey.pem'),
      cert: fs.readFileSync('/home/ubuntu/mktop/keys/cert.pem'),
      ca: fs.readFileSync('/home/ubuntu/mktop/keys/fullchain.pem'),
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
    },
    disableHostCheck: true,
  },
};
