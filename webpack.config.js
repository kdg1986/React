const config = require('./src/main/webpackConfig');
//module.exports = config;

//개발시
module.exports = [
	require('./src/main/webpackConfig/preconConfig.js')
	,require('./src/main/webpackConfig/spchConfig.js')
	
]
