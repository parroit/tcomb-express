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

var tcombExpress = require('../lib/tcomb-express.js');

describe('tcombExpress', function(){
    it('is defined', function(){
      tcombExpress.should.be.a('function');
    });

});
