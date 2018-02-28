var winston = require('winston');
var pjson = require('../package.json');

module.exports = {
	initialize: function(params, app)
	{
    app.get('/status', function (req, res) {
      res.json({status: 'online', application: pjson.name, version: pjson.version, description: pjson.description});
    })
  }
}
