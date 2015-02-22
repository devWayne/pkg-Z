var watchify = require('watchify');
var fromArgs = require('watchify/bin/args');


var b = browserify(watchify.args);

var w = watchify(b,{});
