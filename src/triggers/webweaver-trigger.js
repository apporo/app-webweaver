'use strict';

const Devebot = require('devebot');
const chores = Devebot.require('chores');

function WebweaverTrigger(params = {}) {
  const L = params.loggingFactory.getLogger();
  const T = params.loggingFactory.getTracer();
  const blockRef = chores.getBlockRef(__filename, params.packageName || 'app-webweaver');

  this.start = function() {
    L.has('silly') && L.log('silly', T.add({ blockRef }).toMessage({
      tags: [ blockRef, 'trigger-starting' ],
      tmpl: ' - trigger[${blockRef}] is starting'
    }));
    return Promise.resolve(params.webweaverService.combine());
  };

  this.stop = function() {
    L.has('silly') && L.log('silly', T.add({ blockRef }).toMessage({
      tags: [ blockRef, 'trigger-stopping' ],
      tmpl: ' - trigger[${blockRef}] is stopping'
    }));
    return Promise.resolve();
  };
};

WebweaverTrigger.referenceList = [ "webweaverService" ];

module.exports = WebweaverTrigger;
