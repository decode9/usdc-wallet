const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

module.exports = {
	module: {
		rules,
	},
	//plugins: plugins,
	externals: {
		'better-sqlite3': 'commonjs better-sqlite3',
	},
	resolve: {
		extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss', '.jpg', '.png'],
	},
};
