var google       = require('googleapis');
var OAuth2Client = google.auth.OAuth2;
var plus         = google.plus('v1');
var Hoek         = require('hoek');
var oauth2_client;
/**
 *
 */
function create_oauth2_client (options) {
  if(oauth2_client){
    return oauth2_client;
  }
  else {
    oauth2_client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID,
                        process.env.GOOGLE_CLIENT_SECRET,
                        options.REDIRECT_URL);
    return oauth2_client;
  }
}


/**
 *  getGoogleAuthURL creates a url where the user is sent to authenticate
 *  @param {Object} options - the options passed into the plugin
 *  @returns {String} url - the url where people visit to authenticate
 */
function generate_google_oauth2_url (options) {

  var oauth2_client = create_oauth2_client(options);
  var url = oauth2_client.generateAuthUrl({
    access_type: 'offline', // will return a refresh token
    scope: 'https://www.googleapis.com/auth/plus.profile.emails.read'
    // can be a space-delimited string or an array of scopes
  });
  return url;
}

// function get_oauth2_token() {
//
// }


/**
 * this plugin creates a /googleauth where google calls back to
 */
exports.register = function googleauth (server, options, next) {
  var oauth2_client = create_oauth2_client(options);
  server.route([
    {
      method: 'GET',
      path: '/',
      handler: function(req, reply) {
        var url = generate_google_oauth2_url(options);
        reply("<a href='" + url +"'>Click to Login!</a>" );
      }
    },
    {
      method: 'GET',
      path: '/googleauth',
      handler: function google_oauth_handler (req, reply) {
        var code = req.query.code;
        // console.log(' - - - - - - - - - - - - code:');
        // console.log(code);
        oauth2_client.getToken(code, function(err, tokens) {
          oauth2_client.setCredentials(tokens);
          plus.people.get({ userId: 'me', auth: oauth2_client }, function(err, profile) {
            Hoek.assert(!err, 'Google Plus API Error', err);
            options.handler(req, reply, tokens, profile);
          });
        });
      }
    }
  ]);

  next(); // everything worked, continue booting the hapi server!
};

exports.register.attributes = {
    pkg: require('../package.json')
};

exports.authurl = generate_google_oauth2_url;
