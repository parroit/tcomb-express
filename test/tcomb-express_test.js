/*
 * tcomb-express
 * https://github.com/parroit/tcomb-express
 *
 * Copyright (c) 2014 Andrea Parodi
 * Licensed under the MIT license.
 */

'use strict';

var chai = require('chai');
chai.expect();
chai.should();

var request = require('request');
var rimraf = require('rimraf');
var tcombExpress = require('../lib/tcomb-express.js');
var webAuth = require('web-auth');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');


tcombExpress.setup(express);


describe('tcombExpress', function() {
    it('is defined', function() {
        tcombExpress.should.be.a('function');
    });


    after(function(done) {
        if (this.server) {
            this.server.close();
        }

        done();
    });

    before(function(done) {
        if (fs.existsSync('./test/assets')) {

            rimraf.sync('./test/assets');
        }
        this.app = express();

        this.app.use(bodyParser.json());



        var w = new webAuth.storage.PouchImplementation('test/assets');
        var auth = webAuth.storage.interface(w);
        var _this = this;



        var authRoutes = tcombExpress(auth);

        this.app.use('/test', authRoutes);


        this.app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.json({
                message: err.message,
                error: err
            });
        });





        auth.save({
            username: 'parroit',
            password: 'secret',
            email: 'parroit@eban.so',
            admin: true
        })

        .then(function(result) {
            _this.server = _this.app.listen(6000, function() {
                done();
            });
        })

        .catch(done);

    });

    it('define a route for each function', function(done) {
        request({
                uri: 'http://localhost:6000/test/get',
                method: 'post',
                body: '["parroit"]',
                headers: {
                    'content-type': 'application/json'
                }
            },
            function(error, response, body) {
                if (error) {
                    return done(new Error(error));
                }

                response.statusCode.should.be.equal(200);

                var user = JSON.parse(response.body);
                delete user._rev;
                user.should.be.deep.equal({
                    _id: 'parroit',
                    admin: true ,
                    email: 'parroit@eban.so',
                    password: 'secret',
                    username: 'parroit'
                });

                done();
            });
    });

});
