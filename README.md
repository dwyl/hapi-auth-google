# hapi auth *google* <img width="300" alt="login with google" src="https://developers.google.com/accounts/images/sign-in-with-google.png">

Let people authenticate with your application/website using their Google Account.

[![Build Status](https://travis-ci.org/dwyl/hapi-auth-google.svg)](https://travis-ci.org/dwyl/hapi-auth-google)
[![codecov.io](https://codecov.io/github/dwyl/hapi-auth-google/coverage.svg?branch=master)](https://codecov.io/github/dwyl/hapi-auth-google?branch=master)
[![Code Climate](https://codeclimate.com/github/dwyl/hapi-auth-google/badges/gpa.svg)](https://codeclimate.com/github/dwyl/hapi-auth-google)
[![Dependency Status](https://david-dm.org/dwyl/hapi-auth-google.svg)](https://david-dm.org/dwyl/hapi-auth-google)
[![devDependency Status](https://david-dm.org/dwyl/hapi-auth-google/dev-status.svg)](https://david-dm.org/dwyl/hapi-auth-google#info=devDependencies)

## Why?

As of May 2017, Google has over [2 Billion Android users](https://www.theverge.com/2017/5/17/15654454/android-reaches-2-billion-monthly-active-users) alone. In addition, there are over [a billion](https://techcrunch.com/2016/02/01/gmail-now-has-more-than-1b-monthly-active-users/) who use gmail (thus, have a Google account) as of 2016, and THEN there are all the Google For Education users, which was [45 million in 2015](http://www.prnewswire.com/news-releases/google-apps-for-education-anticipated-to-reach-110-million-users-by-2020-300107878.html) and was growing at a rate of 40+%/year. To put it conservatively, there are more than 2 Billion users out there who *could* authenticate with your app using that Google account so offering people the *option* of logging into your App(s) using their Google Account makes a lot of sense.

## What?

This plugin lets you easily integrate Google Authentication
into a Hapi-based Web Application / API.

### Key Advantages of _This_ Plugin:

+ _**Much simpler**_ than "_Passport_" or "_Bell_"; you can read the code in a few minutes: [/lib/index.js](https://github.com/dwyl/hapi-auth-google/blob/master/lib/index.js)
+ **_Only_ One Dependency**: **Google's Official Node.js module** (_nothing else_)
+ _Complete_ **[step-by-step instructions](https://github.com/dwyl/hapi-auth-google/blob/master/GOOGLE-APP-STEP-BY-STEP-GUIDE.md), example && tests** to get you _**up and running in 5 mins**_.
+ Always **up-to-date** - we use this plugin in our/client projects
so we are quick to update it when required.
+ _**We're here to help**_ if you get stuck! [![Get Help!](https://img.shields.io/badge/get-help-brightgreen.svg?style=flat)](https://github.com/dwyl/hapi-auth-google/issues)


![OAuth2 workflow](https://cloud.githubusercontent.com/assets/194400/11186352/34dc4882-8c79-11e5-82ec-cba56deba484.png)


## How? (*Usage*)

### 1. Install `hapi-auth-google` from NPM

Install the plugin from npm and save it to your `package.json`:

```sh
npm install hapi-auth-google --save
```

### 2. Create an App on the Google Developer Console

To get access to the Google Account (Plus) API you will *first*
need to create an app  
by visiting the google developer console:
https://console.developers.google.com

> If you are totally new to using the Google API,
we created
[***GOOGLE-APP-STEP-BY-STEP-GUIDE***](https://github.com/dwyl/hapi-auth-google/blob/master/GOOGLE-APP-STEP-BY-STEP-GUIDE.md) *just* for you!  
( *Note: if you still have any questions*, ***ask***! )

### 3. Export the *Required* Environment Variables

Once you've created your app following the [*GOOGLE-APP-STEP-BY-STEP-GUIDE*](https://github.com/dwyl/hapi-auth-google/blob/master/GOOGLE-APP-STEP-BY-STEP-GUIDE.md)

Export the Environment Variables:
```sh
GOOGLE_CLIENT_ID=YourAppsClientId.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=SuperSecret
PORT=8000
BASE_URL=http://localhost:8000 # Must be identical to "Authorized JavaScript Origin"
JWT_SECRET=SomethingSuperHardToGuess-->grc.com/passwords.htm # Optionally use JWTs
```
We export the two variables prefixed with `GOOGLE_`
to distinguish them from other services you may be using.

The `BASE_URL` is required to know which url your app is using.
it needs to be identical to the `Authorized JavaScript Origin`
that you set in step 2.8 above.

> Note: If you (*or anyone on your team*) are new to
Environment Variables or need a refresher,  
see: [https://github.com/dwyl/**learn-environment-variables**](https://github.com/dwyl/learn-environment-variables)

### 4. Create Your (Custom) Handler Function

This is where you decide what to do with the person's `profile` details  
once they have authorized your App to use Google details.

Your custom handler should have the following signature:
```js
function custom_handler(request, reply, tokens, profile) {
  // save the profile as a session so you can personalize their experience of your app
  // use the reply() to send a response/view to the visitor
}
```
The handler function parameters are:
+ **request** is the hapi request object with all the properties.
+ **reply** is the standard hapi reply object used to send your response to the client or send a rendered view.
+ ***tokens*** are the OAuth2 tokens returned by Google for the session
see: [**sample-auth-token.json**](https://github.com/dwyl/hapi-auth-google/blob/master/test/fixtures/sample-auth-token.json)
+ ***profile*** is the person's Google Plus profile
see: [**sample-profile.json**](https://github.com/dwyl/hapi-auth-google/blob/master/test/fixtures/sample-profile.json)

> If you get stuck check out:
[/example/google_oauth_handler.js](https://github.com/dwyl/hapi-auth-google/blob/master/example/google_oauth_handler.js#L3)

### 5. Register the Plugin into your Hapi.js Server

The final step is to register the plugin into your Hapi.js Server
declaring your desired options:

```js
// declare your desired options for the plugin
var opts = {
  REDIRECT_URL: '/googleauth', // must match google app redirect URI from step 2.8
  handler: require('./google_oauth_handler.js'), // your handler
  config: {  // optional route config (as for any route in hapi)
    description: 'Google auth callback',
    notes: 'Handled by hapi-auth-google plugin',
    tags: ['api', 'auth', 'plugin']
  },
  access_type: 'online', // options: offline, online
  approval_prompt: 'auto', // options: always, auto
  scope: 'https://www.googleapis.com/auth/plus.profile.emails.read', // ask for their email address
  // can use process.env or if you prefer, define here in options:
  BASE_URL: process.env.BASE_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
};

server.register([{ register: require('hapi-auth-google'), options:opts }],
 function (err) {
  if(err){
    // handle the error if the plugin failed to load:  
  }
  // the rest of your app ...
});
```

#### `options` *explained*

+ `REDIRECT_URL` - is the url (*endpoint*) where google will
send the initial OAuth2 `code` to check your application is *real*.
Make *sure* that the url is *identical* to the one you defined when
setting up your app in the google developer console
(*section 2.8 in the step-by-step guide*)
+ `handler` - the handler you defined above in **step 4**
which is your custom logic for google-auth enabled app.
+ `scope` - these are the ***permissions*** your app is requesting.



### Need an *Example* ?

See: **/example** directory in this repo for a quick example.

### Dependencies

This plugin depends on the ***Official***
[**google-api-nodejs-client**](https://www.npmjs.com/package/googleapis) -
to do the authentication with Google and access to other Google Services. [![Build Status](https://travis-ci.org/google/google-api-nodejs-client.svg?branch=master)](https://travis-ci.org/google/google-api-nodejs-client) [![Coverage Status](https://coveralls.io/repos/google/google-api-nodejs-client/badge.svg?branch=master&service=github)](https://coveralls.io/github/google/google-api-nodejs-client?branch=master) [![Dependency Status](https://david-dm.org/google/google-api-nodejs-client.svg)](https://david-dm.org/google/google-api-nodejs-client)

## Background Reading

If you are new to OAuth2, see:
+ Intro to OAuth 2.0: https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2
+ Google OAuth2 in detail: https://developers.google.com/identity/protocols/OAuth2
