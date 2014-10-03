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

tcombExpress.setup = function setup(express) {
    router = express.Router();
};

function tcombExpress(storage) {

    var funcNames = Object.keys(storage);

    funcNames.forEach(function(funcName) {
        var func = storage[funcName];
        router.post('/' + funcName, function(req, res) {
            var results = func.apply(storage, req.body);

            function serveValue(value) {
                res.json(value);
            }
            if (results.then) {
                results.then(serveValue);
            } else {
                serveValue(results);
            }


        });
    });

    return router;
}
