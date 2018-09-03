var path = require('path');
var extractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './dist/main.js'
    },
    module: {
        // 多个loader是有顺序要求的，从右往左写，因为转换的时候是从右往左转换的
        rules:[
            {
                test: /\.css$/,
                use: extractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader'] // 不再需要style-loader放到html文件内
                }),
                include: path.join(__dirname, 'src'), //限制范围，提高打包速度
                exclude: /node_modules/
            },
            {
                test:/\.less$/,
                use: extractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'less-loader']
                }),
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/
            },
            {
                test:/\.scss$/,
                use: extractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use:['css-loader', 'postcss-loader', 'sass-loader']
                }),
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/
            },
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    query: { //同时可以把babel配置写到根目录下的.babelrc中
                        presets: ['env', 'stage-0'] // env转换es6 stage-0转es7
                    }
                }
            },
            { //file-loader 解决css等文件中引入图片路径的问题
                // url-loader 当图片较小的时候会把图片BASE64编码，大于limit参数的时候还是使用file-loader 进行拷贝
                test: /\.(png|jpg|jpeg|gif|svg)/,
                use: {
                    loader: 'url-loader',
                    options: {
                        outputPath: 'images/', // 图片输出的路径
                        limit: 1 * 1024
                    }
                }
            }
        ]
    }
};
