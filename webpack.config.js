const path= require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

var isProd = process.env.NODE_ENV === 'production';
console.log('NODE_ENV = ' + process.env.NODE_ENV);

var config = {
	entry: {
		main: './src/main.js',
		contact: './src/contact.js',
		vendor: ['react','react-dom']
	},
	output: {
		path: path.join( __dirname, 'dist/'),
		filename: isProd ? '[name]-[chunkhash:8].js' : '[name].js',
	}, 
	module:{
		rules:[
			{
				test: /\.scss$/,
				use: isProd ? 
					ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: ['css-loader', 'sass-loader'],
						publicPath: './dist'
					}):
					['style-loader', 'css-loader', 'sass-loader'],
				},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			}
		] 
	},
	plugins: [ 
		// new webpack.optimize.CommonsChunkPlugin({
        //     name: ['vendor','manifest'], // 'vendor' keeps long-term cache. split runtime code into 'manifest'
        //     minChunks: Infinity,
        // }),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: function (module) {
				// this assumes your vendor imports exist in the node_modules directory
				return module.context && module.context.indexOf('node_modules') !== -1;
			}
		}),
		//CommonChunksPlugin will now extract all the common modules from vendor and main bundles
		new webpack.optimize.CommonsChunkPlugin({ 
			name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
		}),
		new HtmlWebpackPlugin({
			title: 'My App',
			favicon: '',
			template: './src/index.html',
			chunks: ['main','vendor','manifest'],
			minify: {collapseWhitespace: true,},
		}),
		new HtmlWebpackPlugin({
			title: 'My App',
		    filename: 'contact.html', // 指定 template 要輸出的路徑,與template同名可不設
		    template: './src/index.html',
		    chunks: ['contact','vendor','manifest'],
		    minify: {collapseWhitespace: true,},
		})
	],
	devtool: isProd ? false : 'eval-source-map',
	devServer: {
		contentBase: path.join(__dirname, 'dist/'), // server執行目錄
		compress: true, // gzip
		port: 9527,
		stats: 'errors-only', // 只輸出錯誤訊息
		open: true,// 自動打開瀏覽器
		hot: true, // 啟動 HMR
	}
}

if (isProd) { //production specify plugin
	config.plugins.push(
		new ExtractTextPlugin({
			filename: '[name]-[hash:8].css',
			disable: false, // [for dev] true; [for build] false
			allChunks: true
		}),
		new CleanWebpackPlugin(['dist'],{ // [for build] 清空dist
			verbose: true, //show message
			exclude : []
		})
	);
}
else{ //dev specify plugin
	config.plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()  // [for dev]HMR顯示文件名
	);
}

module.exports = config;