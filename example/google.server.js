require('env2')('.env');
// console.log(process.env);
var Hapi = require('hapi');
var server = new Hapi.Server();
server.connection({
	host: '0.0.0.0',
	port: Number(process.env.PORT)
});

var opts = { REDIRECT_URL: server.info.uri + '/googleauth',
            handler: require('./google_oauth_handler.js') };

server.register([{ register: require('../lib'), options:opts }], function (err) {

});

server.start(function(){ // boots your server
	console.log('Now Visit: http://localhost:'+server.info.port);
});

module.exports = server;
