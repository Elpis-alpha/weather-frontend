const { createProxyMiddleware } = require('http-proxy-middleware')


module.exports = function (app) {

  app.use('/api', createProxyMiddleware({

    target: 'https://elpis-weather-app.herokuapp.com',

    changeOrigin: true

  }))

}