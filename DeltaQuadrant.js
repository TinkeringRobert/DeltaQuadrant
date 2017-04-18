var pjson = require('./package.json');

// External requires
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var winston = require('winston');

//{ error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
winston.level = 'silly';

// Application settings
var isWin = /^win/.test(process.platform);
if (isWin){
  var params = require('../Gravitation/Windows');
}
else{
  var params = require('../Gravitation/Linux');
}

// Local requires
var dbInit = require('./Config/DbInit');
var modules = require('./Controllers/ModuleInit');

//*******************
// 1. Parse forms & JSON in body
//*******************
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/status', function (req, res) {
  res.json(
    {
      status: 'online',
      application: pjson.name,
      version: pjson.version,
      description: pjson.description
    }
  );
});

function initialize(){
  console.log('Boot Home automation server :: ' + pjson.name + ' :: ' + pjson.version);

  //infraRecv.initialize(params, broker);
  dbInit.initialize(params.database.deltaquadrant, pjson.name, function() {
    modules.initialize(params);

    app.listen(params.application_port.delta_quadrant, function () {
        console.log('Server gestart op poort ' + params.application_port.relaystation);
    });

    winston.info("System started");
  });

};

initialize();
