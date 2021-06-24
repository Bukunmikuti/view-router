
module.exports = {
	input: './src/index.js',
	output: {
		dir: 'dist',
		//extractCSS: true,
		fileName: 'viewrouter.js',
		format: [/*'esm-min',*/ 'umd-min'],
		minify: true,
		moduleName: 'ViewRouter', 
		target: 'browser', 
		sourceMap: 'false', 
	},
};