var fs = require('fs');
var browserify = require('browserify');
var readdirp = require('readdirp');
var mkdirp = require('mkdirp');
var cfg = require('./config')();

var pkg = {
    pkgJs: function(options) {
        readdirp({
            root: cfg.jsPath||'./js/',
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
                        fs.writeFile(resolvedPath + '/dist/js/' + files.path, buf, function(err) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("The js file was saved!");
                            }
                        });
                        //else console.log('pow!')
                    });
                });
            });
            //b.bundle().pipe(fs.createWriteStream('./dist/' + files.path));
        }, function(err, res) {
            console.log("success!");

            // all done, move on or do final step for all file entries here
        });
    },


    pkgCss: function(options) {
        var cssBufList = new Array();

        function readFunc(root, cb) {
            readdirp({
                root: root,
                fileFilter: '*.css'
            }, function(files) {
                var data = fs.readFileSync(files.fullPath)
                    //cssBuf.concat(data);
                cssBufList.push(data);

            }, function(err, res) {
                console.log(cssBufList.length);
                cb();
                // all done, move on or do final step for all file entries here
            });
        }

        function mergeFunc() {
            fs.realpath('./', function(err, resolvedPath) {
                var cssBuf = Buffer.concat(cssBufList);
                mkdirp(resolvedPath + '/dist/css', function(err) {
                    if (err) console.error(err)
                    fs.writeFile(resolvedPath + '/dist/css/main.css', cssBuf, function(err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("The css file was saved!");
                        }
                    });
                    //else console.log('csspow!')
                });
            });
        }

        readFunc('./css', function() {

            mergeFunc();
        })

    }

}

//pkg.pkgCss();
module.exports = pkg;
