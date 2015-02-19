var fs = require('fs');
var browserify = require('browserify');
var b = browserify();

fs.readfile('./js/',function(err,files){

	if(err)throw err;
	console.log()
})