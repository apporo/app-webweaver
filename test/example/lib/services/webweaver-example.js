'use strict';

var Devebot = require('devebot');
var chores = Devebot.require('chores');
var lodash = Devebot.require('lodash');
var pinbug = Devebot.require('pinbug');
var util = require('util');

var Service = function(params) {
  params = params || {};

  var express = params.webweaverService.express;
  var appConfig = params.sandboxConfig;

  var sampleOfErrors = {
    'simple-error': {
      constructor: Error,
      message: 'very simple error'
    },
    'error-without-code': {
      constructor: chores.buildError('NoCodeError'),
      message: 'error without code'
    }
  };

  var getLayer2 = function(branches) {
    return {
      name: 'app2',
      middleware: (function() {
        var app2 = express.Router();
        app2.get('/example/:id', function(req, res) {
          res.status(200).json({
            message: 'example [' + req.params.id + '] request successfully'
          });
        });
        app2.get('/error', function(req, res) {
          res.status(200).json({
            entrypoints: lodash.keys(sampleOfErrors)
          });
        });
        app2.get('/error/:sampleId', function(req, res) {
          var sampleId = req.params.sampleId;
          if (sampleOfErrors[sampleId]) {
            var def = sampleOfErrors[sampleId];
            throw new def.constructor(util.format('Status Message [%s]', def.message));
          }
          throw new Error(util.format('Status Message - Unknown sample [%s]', sampleId));
        });
        return app2;
      })(),
      branches: branches
    }
  }

  if (appConfig.enabled !== false) {
    params.webweaverService.push([
      params.webweaverService.getDefaultRedirectLayer(),
      params.webweaverService.getPrintRequestInfoLayer([
        params.webweaverService.getSessionLayer([
          getLayer2()
        ])
      ])
    ], 500);
  }
};

Service.referenceList = [ "webweaverService" ];

module.exports = Service;
