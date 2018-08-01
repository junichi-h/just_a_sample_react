import path from 'path';
import chalk from 'chalk';

import { config } from './gulp/constants/config';

const MODE = process.env.NODE_ENV === 'prod' ? 'production' : 'development';

console.log(
    chalk.cyan(
        `Attempting to bind to HOST environment variable: ${chalk.yellow(
            chalk.bold.bgCyan(process.env.NODE_ENV)
        )}`
    )
);


export default {
	mode: MODE,
	cache: true,
	target: 'web',
	output: {
		path: path.join(__dirname, config.tmp, config.assets, config.js),
    	publicPath: `/${config.assets}/${config.js}/`,
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