var fs = require('fs');
var browserify = require('browserify');
var readdirp = require('readdirp');
var mkdirp = require('mkdirp');

readdirp({
    root: './js/',
    fileFilter: '*.js'
}, function(files) {
    var b = browserify();
    b.add(files.fullPath);
    b.bundle(function(err, buf) {
        // fs.mkdir('./dist/' + files.parentDir);
        //var cache = {'/etc':'/private/etc'};
        fs.realpath('./', function(err, resolvedPath) {
            if (err) throw err;
            mkdirp(resolvedPath + '/dist/js/' + files.parentDir, function(err) {
                if (err) console.error(err)
                //else console.log('pow!')
            });
            fs.writeFile(resolvedPath + '/dist/js/' + files.path, buf, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("The js file was saved!");
                }
            });
        });
    });
    //b.bundle().pipe(fs.createWriteStream('./dist/' + files.path));
}, function(err, res) {
	 console.log("success!");

    // all done, move on or do final step for all file entries here
});

var cssBufList = new Array();
readdirp({
    root: './css/',
    fileFilter: '*.css'
}, function(files) {
    fs.readFile(files.fullPath, function(err, data) {
        //cssBuf.concat(data);
	cssBufList.push(data);
    });
}, function(err, res) {
    fs.realpath('./', function(err, resolvedPath) {
	var cssBuf=Buffer.concat(cssBufList);
        mkdirp(resolvedPath + '/dist/css', function(err) {
                if (err) console.error(err)
                //else console.log('csspow!')
        });
       fs.writeFile(resolvedPath + '/dist/css/main.css', cssBuf, function(err) {
		if(err){console.log(err);}
		else{
                    console.log("The css file was saved!");
		}	
	});
    });
    // all done, move on or do final step for all file entries here
});
