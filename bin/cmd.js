#!/usr/bin/env node

var watchify = require('watchify');
var fromArgs = require('watchify/bin/args');
var program = require('commander');
var browserify =require('browserify');

var pkg = require('../lib/modules');

//var b = browserify(watchify.args);

//var w = watchify(b,{});

program
    .version('0.0.1')
    .option('-a, --all', 'Package all js and css files')
    .option('-j, --js', 'Package js files')
    .option('-c, --css', 'Package css files')
    .parse(process.argv);


if (program.css) {
    pkg.pkgCss();
} else if (program.js) {
    pkg.pkgJs();
} else {
    pkg.pkgCss();
    pkg.pkgJs();
}
