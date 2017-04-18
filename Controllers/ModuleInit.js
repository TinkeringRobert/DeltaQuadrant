// Local requires
var winston = require('winston');
var udp = require('./UdpController');

module.exports = {
	initialize: function(params)
	{
		winston.debug('Starting : ModuleInit');
	  udp.initialize(params);
	}
}
