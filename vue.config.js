const fs = require('fs');

module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    https: true,
    https: {
      key: fs.readFileSync('/home/ubuntu/mktop/privkey.pem'),
      cert: fs.readFileSync('/home/ubuntu/mktop/cert.pen'),
      ca: fs.readFileSync('/home/ubuntu/mktop/chain.pen'),
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
    },
    disableHostCheck: true,
  },
};
