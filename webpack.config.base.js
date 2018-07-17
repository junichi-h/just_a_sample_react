import path from 'path';
import webpack from 'webpack';

const MODE = process.env.NODE_ENV === 'production' ? 'production' : 'development';

export default {
	mode: MODE,
	cache: true,
	target: 'web',
	output: {
		path: path.join(__dirname, '.tmp', 'assets', 'js'),
    	publicPath: '/assets/js/',
    	filename: '[name].bundle.js',
    	chunkFilename: '[chunkhash].js',
    	sourceMapFilename: '[name].map'
	},
	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /(node_modules|bower_components)/,
	        	include: __dirname,
	        	use: [
	        		{
	        			loader: 'babel-loader',
		        		options: {
		        			cacheDirectory: true

		        		}
	        		}
	        	]
			},
			{
				enforce: 'pre',
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader'
			},
			{
		        test: /\.css$/,
		        use: [
		          {
		            loader: 'style-loader'
		          },
		          {
		            loader: 'css-loader',
		            options: {
		              sourceMap: true,
		              minimize: true
		            }
		          }
		        ]
		    }

		]
	},
	resolve: {
		descriptionFiles: ['package.json'],
    	enforceExtension: false,
    	modules: ['src', 'src/js', 'web_modules', 'node_modules']
	}
}