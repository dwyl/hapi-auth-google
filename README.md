# hapi auth *google* <img width="300" alt="login with google" src="https://developers.google.com/accounts/images/sign-in-with-google.png">

Let people authenticate with your application/website using Google

[![Build Status](https://travis-ci.org/dwyl/hapi-auth-google.svg)](https://travis-ci.org/dwyl/hapi-auth-google)
[![codecov.io](https://codecov.io/github/dwyl/hapi-auth-google/coverage.svg?branch=master)](https://codecov.io/github/dwyl/hapi-auth-google?branch=master)
[![Code Climate](https://codeclimate.com/github/dwyl/hapi-auth-google/badges/gpa.svg)](https://codeclimate.com/github/dwyl/hapi-auth-google)
[![Dependency Status](https://david-dm.org/dwyl/hapi-auth-google.svg)](https://david-dm.org/dwyl/hapi-auth-google)
[![devDependency Status](https://david-dm.org/dwyl/hapi-auth-google/dev-status.svg)](https://david-dm.org/dwyl/hapi-auth-google#info=devDependencies)

## Why?

There are
[***900 Million***](http://techcrunch.com/2015/05/28/gmail-now-has-900m-active-users-75-on-mobile/) people using GMail so offering people the *option* of logging into
your App(s) using their Google Account makes a lot of sense.

## What?

This plugin lets you easily integrate Google Authentication
into your Hapi-based Web Application / API.

![OAuth2 workflow](https://cloud.githubusercontent.com/assets/194400/11186352/34dc4882-8c79-11e5-82ec-cba56deba484.png)


## How? (*Usage*)

### 1. Install `hapi-auth-google` from npmjs

Install the plugin from npm and save it to your `package.json`:

```sh
npm install hapi-auth-google --save
```

### 2. Create an App on the Google Developer Console

To get access to the Google Account API you will *first*
need to create an app by visiting the google developer console:
https://console.developers.google.com



### 3. Export the *Required* Environment Variables

To enable Google Auth you will need to have two Environment Variables set:
```sh
GOOGLE_CLIENT_ID=YourAppsClientId.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=SuperSecret
```
To *get* these Environment Variables,
You will need to create an App on
and get your `CLIENT_ID` & `CLIENT_SECRET`.
We export these two variables prefixed with `GOOGLE_`
to distinguish them from other services.

> If you are new to Environment Variables or need a reminder,
see: https://github.com/dwyl/learn-environment-variables

### 4. Create Your (Custom) Handler Function

This is where you decide what to do with the person's `profile` details
once they authenticate with Google.

Your custom handler should take the form:
```js
function custom_handler(request, reply, tokens, profile)
```
where:
+ **request** is the hapi request object with all the properties.
+ **reply** is the standard hapi reply object used to send your response to the client or send a rendered view.
+ ***tokens*** are the OAuth2 tokens returned by Google for the session
see: [**sample-auth-token.json**](https://github.com/dwyl/hapi-auth-google/blob/master/test/fixtures/sample-auth-token.json)
+ ***profile*** is the person's Google Plus profile
see: [**sample-profile.json**](https://github.com/dwyl/hapi-auth-google/blob/master/test/fixtures/sample-profile.json)

### 5. Load the Plugin into your Hapi.js Server



### Need an *Example* ?

See: **/example** directory in this repo for a quick example.

### Dependencies

This plugin depends on the ***Official***
[**google-api-nodejs-client**](https://www.npmjs.com/package/googleapis) -
to do the authentication with Google and access to other Google Services.d [![Build Status](https://travis-ci.org/google/google-api-nodejs-client.svg?branch=master)](https://travis-ci.org/google/google-api-nodejs-client) [![Coverage Status](https://coveralls.io/repos/google/google-api-nodejs-client/badge.svg?branch=master&service=github)](https://coveralls.io/github/google/google-api-nodejs-client?branch=master) [![Dependency Status](https://david-dm.org/google/google-api-nodejs-client.svg)](https://david-dm.org/google/google-api-nodejs-client)

## Background Reading

If you are new to OAuth2, see:https://developers.google.com/identity/protocols/OAuth2
