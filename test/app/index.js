'use strict';

var app = require('devebot').launchApplication({
  appRootPath: __dirname
}, [{
  name: 'app-webweaver',
  path: '../../index.js'
}]);

if (require.main === module) app.server.start();

module.exports = app;
