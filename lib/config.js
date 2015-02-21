var fs = require('fs');


function getConfig() {
        var config = {};
    fs.realpath('./', function(err, resolvedPath) {
        var pkgConfig = require(resolvedPath + '/package.json');
        config.jsPath = pkgConfig.jsPath || 'js';
        config.cssPath = pkgConfig.cssPath || 'css';
        config.distPath = pkgConfig.disPath || 'dist';
	return config;
    });
}

module.exports=getConfig;
