var fs = require('fs');


function getConfig() {
        var config = {};
    	var resolvedPath=fs.realpathSync('./') 
        var pkgConfig = require(resolvedPath + '/package.json');
        config.jsPath = pkgConfig.jsPath || './js';
        config.cssPath = pkgConfig.cssPath || 'css';
        config.distPath = pkgConfig.disPath || 'dist';
	return config;
}

module.exports=getConfig;
