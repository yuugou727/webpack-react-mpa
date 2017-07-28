const path= require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
console.log('NODE_ENV = ' + process.env.NODE_ENV);

const VENDOR_LIST = ['react','react-dom','semantic-ui-react'];
const config = {
	entry: {
		main: './src/main.js',
		contact: './src/contact.js',
		vendor: VENDOR_LIST
	}, 
	output: {
		path: path.join( __dirname, 'dist/'),
		filename: isProd ? '[name]-[chunkhash:8].js' : '[name].js',
	}, 
	module:{
		rules:[
			{
				test: /\.s?css$/,
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
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					'file-loader'
				]
			}
		] 
	},
	plugins: [ 
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: function (module) {
				return module.context && module.context.indexOf('node_modules') !== -1;
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({ 
			name: 'manifest',
			minChunks: Infinity
		}),
		new HtmlWebpackPlugin({
			title: 'Main Page',
			template: './src/index.html',
			favicon: '',
			chunks: ['main','vendor','manifest'],
			minify: {collapseWhitespace: true},
		}),
		new HtmlWebpackPlugin({
			title: 'Contact Page',
			template: './src/index.html',
			filename: 'contact.html', // 指定 template 要輸出的路徑,與template同名可不設
			chunks: ['contact','vendor','manifest'],
			minify: {collapseWhitespace: true},
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