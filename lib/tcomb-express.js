/*
 * tcomb-express
 * https://github.com/parroit/tcomb-express
 *
 * Copyright (c) 2014 Andrea Parodi
 * Licensed under the MIT license.
 */

'use strict';

var router;

module.exports = tcombExpress;

tcombExpress.setup = function setup(express){
	router = express.Router();
};

function tcombExpress(storage) {
	console.dir(arguments);	
	router.get('/index', function(req, res) {
	  res.json({ title: 'Express' });
	});

	return router;
}


