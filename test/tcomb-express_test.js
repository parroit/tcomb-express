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

var tcombExpress = require('../lib/tcomb-express.js');
var webAuth = require('web-auth');
var express = require('express');
var bodyParser = require('body-parser');

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

        this.app = express();

        this.app.use(bodyParser.json());

        var authRoutes = tcombExpress(webAuth.storage.pouchImplementation);

        this.app.use('/test', authRoutes);
        

        this.app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });


        this.server = this.app.listen(6000, function() {
            done();
        });

    });

    it('define a route for each function', function(done) {
        request('http://localhost:6000/test/index', function(error, response, body) {
            if (error) {
                return done(new Error(error));
            }


            response.statusCode.should.be.equal(200);

            JSON.parse(response.body).should.be.deep.equal({title:'Express'});

            done();
        });
    });

});
