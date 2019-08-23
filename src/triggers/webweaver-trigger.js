'use strict';

const Devebot = require('devebot');
const chores = Devebot.require('chores');

function WebweaverTrigger(params = {}) {
  const { packageName, loggingFactory, webweaverService, webserverTrigger } = params;
  const L = loggingFactory.getLogger();
  const T = loggingFactory.getTracer();
  const blockRef = chores.getBlockRef(__filename, packageName || 'app-webweaver');

  this.start = function() {
    L.has('silly') && L.log('silly', T.add({ blockRef }).toMessage({
      tags: [ blockRef, 'trigger-starting' ],
      tmpl: ' - trigger[${blockRef}] is starting'
    }));
    return Promise.resolve(webserverTrigger.attach(webweaverService.combine()));
  };

  this.stop = function() {
    L.has('silly') && L.log('silly', T.add({ blockRef }).toMessage({
      tags: [ blockRef, 'trigger-stopping' ],
      tmpl: ' - trigger[${blockRef}] is stopping'
    }));
    return Promise.resolve(webserverTrigger.detach(webweaverService.outlet));
  };
};

WebweaverTrigger.referenceHash = {
  webweaverService: "webweaverService",
  webserverTrigger: "app-webserver/webserverTrigger",
};

module.exports = WebweaverTrigger;
