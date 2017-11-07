'use strict';

const test = require('tape');
const nock = require('nock');

const dir  = __dirname.split('/')[__dirname.split('/').length-1];
const file = dir + __filename.replace(__dirname, '') + " > ";

initTests();

async function initTests() {
    const server = await require('../example/google.server')();
    
    console.log('Testing with Hapi Server v', server.version);


    test(file + 'Visit / root url expect to see a link', async (t) => {
        var options = {
            method: "GET",
            url: "/"
        };

        try {
            let response = await server.inject(options);
            t.equal(response.statusCode, 200, "Server is working.");
            await server.stop();
        } catch(err) {
            // console.log(err);
        };
        
        t.end();
    });

    // test a bad code does not crash the server!
    test(file + '/googleauth?code=oauth2codehere', async (t) => {
        var options = {
            method: "GET",
            url: "/googleauth?code=badcode"
        };

        try {
            let response = await server.inject(options);
            t.equal(response.statusCode, 400, "Server is working.");
            t.ok(response.payload.indexOf('Bad Request') > -1, 'Got: ' + response.payload + ' (As Expected)');
            
            await server.stop();
        } catch(err) {
            // console.log(err);
        };

        t.end();
    });

    test(file + 'Mock /googleauth?code=oauth2codehere', async (t) => {
        // google oauth2 token request url:
        const fs = require('fs');
        const nock = require('nock');
        
        var token_fixture = fs.readFileSync('./test/fixtures/sample-auth-token.json');
        var scope = nock('https://accounts.google.com')
            .persist() // https://github.com/pgte/nock#persist
            .post('/o/oauth2/token')
            .reply(200, token_fixture);

        // see: http://git.io/v4nTR for google plus api url
        // https://www.googleapis.com/plus/v1/people/{userId}
        var sample_profile = fs.readFileSync('./test/fixtures/sample-profile.json');
        var scope = nock('https://www.googleapis.com')
            .get('/plus/v1/people/me')
            .reply(200, sample_profile);

        var options = {
            method: "GET",
            url: "/googleauth?code=myrandomtoken"
        };

        try {
            var expected = 'Hello Alex You Logged in Using Goolge!';
            var response = await server.inject(options);
            
            t.equal(response.statusCode, 200, "/googleauth returns valid oauth2 token");
            t.equal(response.payload, expected, "> " + expected);

            await server.stop();
            
            t.end();
        } catch (err) {
            // console.log(err);
        }
    });
}
