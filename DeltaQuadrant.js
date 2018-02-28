var bodyParser = require('body-parser');
var express = require('express');
var pjson = require('./package.json');
var winston = require('winston');

//*************************************************************************
// Application settings
//*************************************************************************
var isWin = /^win/.test(process.platform);
if (isWin){
  var params = require('../Gravitation/Windows');
}
else{
  var params = require('../Gravitation/Linux');
}
//{ error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
winston.level = 'info';

//*************************************************************************
// Local requires
//*************************************************************************
var dbInit = require('../Gravitation/Tools/dbInit');
var migrations = require('./Config/migrations');
var modules = require('./Controllers/ModuleInit');
var portal = require('./Api/portal');

//*************************************************************************
// Service http functions
//*************************************************************************
var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//*************************************************************************
// Service initialisation
//*************************************************************************
function initialize(){
  winston.info('Boot :: ' + pjson.name + ' :: ' + pjson.version);

  dbInit.initialize(
    params.database,
    params.database.deltaquadrant,
    pjson.name,
    migrations,
    function(pool, err) {
      modules.initialize(params);

      app.listen(params.application_port.delta_quadrant, function () {
      winston.info(pjson.name + ' server gestart op poort ' + params.application_port.delta_quadrant)
    });
  });
};

initialize();
