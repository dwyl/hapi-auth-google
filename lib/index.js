var google       = require('googleapis');
var OAuth2Client = google.auth.OAuth2;
var plus         = google.plus('v1');
var assert       = require('assert');
var OPTIONS;     // global object set when plugin loads
var oauth2_client;
/**
 * create_oauth2_client creates the OAuth2 client
 *  @param {Object} options - the options passed into the plugin
 *  @returns {Object} oauth2_client - the Google OAuth2 client
 */
function create_oauth2_client () {
  var google_client_id = (OPTIONS.GOOGLE_CLIENT_ID) ? OPTIONS.GOOGLE_CLIENT_ID : process.env.GOOGLE_CLIENT_ID;
  var google_client_secret = (OPTIONS.GOOGLE_CLIENT_SECRET) ? OPTIONS.GOOGLE_CLIENT_SECRET : process.env.GOOGLE_CLIENT_SECRET;
  var base_url = (OPTIONS.BASE_URL) ? OPTIONS.BASE_URL : process.env.BASE_URL;
  oauth2_client = new OAuth2Client(
    google_client_id,
    google_client_secret,
    base_url + OPTIONS.REDIRECT_URL
  );
  return oauth2_client;
}


/**
 *  getGoogleAuthURL creates a url where the user is sent to authenticate
 *  no param
 *  @returns {String} url - the url where people visit to authenticate
 */
function generate_google_oauth2_url () {
  var access_type = (OPTIONS.access_type) ? OPTIONS.access_type : 'offline';
  var approval_prompt = (OPTIONS.approval_prompt) ? OPTIONS.approval_prompt : 'force';
  var url = oauth2_client.generateAuthUrl({
    access_type: access_type, // set to offline to force a refresh token
    approval_prompt: approval_prompt,
    scope: OPTIONS.scope // can be a space-delimited string or array of scopes
  });
  return url;
}


/**
 * this plugin creates a /googleauth where google calls back to
 */

exports.register = function googleauth (server, options, next) {
  OPTIONS = options;
  OPTIONS.config = OPTIONS.config || {};
  OPTIONS.config.auth = false;
  
  oauth2_client = create_oauth2_client(options);
  server.decorate('server', 'generate_google_oauth2_url', generate_google_oauth2_url)
  server.route([
    {
      method: 'GET',
      path: OPTIONS.REDIRECT_URL, // must be identical to Authorized redirect URI
      config: OPTIONS.config,
      handler: function google_oauth_handler (req, reply) {
        var code = req.query.code;
        // console.log(' - - - - - - - - - - - - code:');
        // console.log(code);
        oauth2_client.getToken(code, function(err, tokens) {
          // anita's error handler
          if(err){
           return options.handler(req, reply, tokens, null);
          }
          oauth2_client.setCredentials(tokens);
          plus.people.get({ userId: 'me', auth: oauth2_client }, function(err, profile) {
            assert(!err, 'Google Plus API Error: '+err);
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
