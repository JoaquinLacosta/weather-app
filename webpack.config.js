const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/"
    },
    mode: "development",
    devServer: {
        open: true,
        port: 8000,
        historyApiFallback: true,
        publicPath: "/"
    },
    module: {
        rules: [
            {   test: /\.(js|jsx)$/, 
                exclude: /(node_modules|bower_components)/, 
                use: { 
                    loader: 'babel-loader',
                }},
            {
                test: /\.(s*)css$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                  },
                  'css-loader',
                  'sass-loader'
                ]
            },
            {
                test: /\.html$/,
                use: [
                  {
                    loader: 'html-loader'
                  }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/public/index.html",
            filename: "index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "assets/styles/[name].css",
        })
    ]
}