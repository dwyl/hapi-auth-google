var assert = require('assert');
require('env2')('.env');
// console.log(process.env);
var Hapi = require('hapi');
var server = new Hapi.Server();
server.connection({
	host: 'localhost',
	port: Number(process.env.PORT)
});

var opts = { REDIRECT_URL: server.info.uri + '/googleauth',
            handler: require('./google_oauth_handler.js') };

var hapi_auth_google = require('../lib');

server.register([{ register: require('../lib'), options:opts }], function (err) {
  // handle the error if the plugin failed to load:
  assert(!err, "FAILED TO LOAD PLUGIN!!! :-(")
});

server.route({
  method: 'GET',
  path: '/',
  handler: function(req, reply) {
    var url = server.generate_google_oauth2_url();
    reply("<a href='" + url +"'>Click to Login!</a>" );
  }
});

server.start(function(err){ // boots your server
  assert(!err, "FAILED TO Start Server");
	console.log('Now Visit: http://localhost:'+server.info.port);
});

module.exports = server;
