var JWT = require('jsonwebtoken'); // session stored as a JWT cookie

module.exports = function custom_handler(request, h, tokens, profile) {
  if(profile) {
    // extract the relevant data from Profile to store in JWT object
    var session = {
      firstname : profile.name.givenName, // the person's first name e.g: Anita
      image    :  profile.image,          // profile image url
      id       :  profile.id,             // google+ id
      exp      :  Math.floor(new Date().getTime()/1000) + 7*24*60*60, // Expiry in seconds!
      agent    :  request.headers['user-agent']
    }
    // create a JWT to set as the cookie:
    var token = JWT.sign(session, process.env.JWT_SECRET);
    // TODO: Store the Profile and Oauth tokens in the Redis DB using G+ id as key
    // Detailed Example...? https://github.com/dwyl/hapi-auth-google/issues/2


    // TODO: reply to client with a view
    let response = h.response(`Hello ${session.firstname} You Logged in Using Goolge!`);
    response.state('token', token); // see: http://hapijs.com/tutorials/cookies

    return response;

  } else {
    console.log('no profile');
    return h.response("Sorry, something went wrong, please try again.").code(503);
  }
}
