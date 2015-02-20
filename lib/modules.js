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
                else console.log('pow!')
            });
            fs.writeFile(resolvedPath + '/dist/js/' + files.path, buf, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("The file was saved!");
                }
            });
        });
    });
    //b.bundle().pipe(fs.createWriteStream('./dist/' + files.path));
}, function(err, res) {
    // all done, move on or do final step for all file entries here
})


/*readdirp({
    root: './css/',
    fileFilter: '*.css'
}, function(files) {
    b.add(files.fullPath);
    b.bundle().pipe(process.stdout);
    //console.log(__dirname);
}, function(err, res) {
    // all done, move on or do final step for all file entries here
})*/
