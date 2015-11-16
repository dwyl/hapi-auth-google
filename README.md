# hapi auth *google*

Let people authenticate with your application/website using Google

## Why?

There are
[***900 Million***](http://techcrunch.com/2015/05/28/gmail-now-has-900m-active-users-75-on-mobile/) using GMail so offering people the option of logging into
your App(s) using their Google Account makes a lot of sense.

## What?

This plugin lets you easily integrate Google Authentication
into your Hapi-based Web Application / API.


## How? (*Usage*)

### Install from npmjs

```sh
npm install hapi-auth-google --save
```

### *Required* Environment Variables

To enable Google Auth you will need to have two Environment Variables set:
```sh
GOOGLE_CLIENT_ID=YourAppsClientId.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=SuperSecret
```
To *get* these Environment Variables,
You will need to create an App on https://console.developers.google.com
and get your `CLIENT_ID` & `CLIENT_SECRET`.
We export these two variables prefixed with `GOOGLE_`
to distinguish them from other services.

### Custom Handler Function

This is where you decide what to do with the person's profile details
once they authenticate with Google.

Your custom handler should take the form:
```js
function custom_handler(request, reply, tokens, profile)
```
where:
+ **request** is the hapi request object with all the properties.
+ **reply** is the standard hapy reply object used to send your response to the client or send a rendered view.
+ ***tokens*** are the OAuth2 tokens returned by Google for the session
+ ***profile*** is the person's Google Plus profile
see: 


### Example ?

See: **/example** directory in this repo for a quick example.

### Dependencies

This plugin depends on
[**google-api-nodejs-client**](https://www.npmjs.com/package/googleapis) -
to do the authentication with Google and access to other Google Services. [![Build Status](https://travis-ci.org/google/google-api-nodejs-client.svg?branch=master)](https://travis-ci.org/google/google-api-nodejs-client) [![Coverage Status](https://coveralls.io/repos/google/google-api-nodejs-client/badge.svg?branch=master&service=github)](https://coveralls.io/github/google/google-api-nodejs-client?branch=master) [![Dependency Status](https://david-dm.org/google/google-api-nodejs-client.svg)](https://david-dm.org/google/google-api-nodejs-client)
