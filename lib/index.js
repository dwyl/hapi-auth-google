const {google}  = require('googleapis');
const plus      = google.plus('v1');
const assert    = require('assert');

// global object set when plugin loads
var OPTIONS;
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
  
  oauth2_client = new google.auth.OAuth2(
    google_client_id,
    google_client_secret,
    base_url + OPTIONS.REDIRECT_URL
  );

  // set auth as a global default
  google.options({
    auth: oauth2_client
  });
  
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

  console.log(url);
  return url;
}

/**
 * this plugin creates a /googleauth where google calls back to
 */

module.exports = {
  name: 'GoogleAuth',
  version: require('../package').version,
  register: function googleauth (server, options) {
    OPTIONS = options;
    OPTIONS.config = OPTIONS.config || {};
    OPTIONS.config.auth = false;
    
    oauth2_client = create_oauth2_client(options);
    
    server.decorate('server', 'generate_google_oauth2_url', generate_google_oauth2_url);
    
    server.route({
      method: 'GET',
      path: OPTIONS.REDIRECT_URL, // must be identical to Authorized redirect URI
      options: OPTIONS.config,
      handler: async function (request, h) {
        var code = request.query.code;
        
        try {
          const {tokens} = await oauth2_client.getToken(code);
          oauth2_client.credentials = tokens;

          const profile = await plus.people.get({ userId: 'me'});

          if(!profile) {
            assert(!err, 'Google Plus API Error: '+ err);
            return h.response('Google Plus API Error:', err);
          }
          
          return options.handler(request, h, tokens, profile.data);

        } catch (err) {
          console.log(err);
          return h.response('Bad Request', err).code(400);
        }
      }
    });
  }
};
