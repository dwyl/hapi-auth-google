'use strict';

require('env2')('.env');
const assert = require('assert');
const Hapi = require('hapi');

const server = new Hapi.Server({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8000
});

const options = {
  REDIRECT_URL: '/googleauth',  // must match google app redirect URI
  handler: require('./google_oauth_handler.js'), // your handler
  access_type: 'offline',       // options: offline, online
  approval_prompt: 'auto',      // options: always, auto
  scope: 'https://www.googleapis.com/auth/plus.profile.emails.read' // profile
};

server.register([{plugin: require('../lib'), options}]).then(() => {

  // Returns HTML with "Login with Google" button
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      var url = server.generate_google_oauth2_url();

      var imgsrc = 'https://developers.google.com/accounts/images/sign-in-with-google.png';
      var btn = '<a href="' + url +'"><img src="' + imgsrc + '" alt="Login With Google"></a>';

      return btn;      
    }
  });

  server.start().then(() => {
    console.log('Hapi.js Version Running', server.version);

    console.log('Registered Routes:')
    server.table().forEach((route) => console.log(`${route.method}\t${route.path}`));

    console.log('Now Visit: http://localhost:' + server.info.port);
  }).catch(err => {
    console.log('Error!', err);
    process.exit(1);
  });

}).catch(err => {
  console.log(err);
  assert(!err, "Failed to load the plugin!");
});

// process.on('uncaughtException', function(data) {
//   console.log(data);
// });

module.exports = server;
