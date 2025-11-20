const path = require('path');

module.exports = {
	mode: 'development',
	context: __dirname,
	entry: './src/index.ts',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist/',
	},
	devServer: {
		static: {
			directory: path.join(__dirname, '/'),
			publicPath: '/',
		},
		devMiddleware: {
			publicPath: '/dist/',
		},
		compress: true,
		port: 8080,
		open: {
			app: {
				name: 'google-chrome',
			},
		},
		hot: false,
		liveReload: true,
		historyApiFallback: false,
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: {
					loader: 'ts-loader',
				},
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
};
