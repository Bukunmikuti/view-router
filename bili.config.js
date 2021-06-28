
module.exports = {
	input: './src/index.js',
	output: {
		dir: 'dist',
		//extractCSS: true,
		fileName: 'viewrouter.esm.min.js',
		format: [
			'esm-min', 
		//'umd-min'
		],
		minify: true,
		moduleName: 'ViewRouter', 
		target: 'browser', 
		sourceMap: 'false', 
	},
};