const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const dotenv = require('dotenv')
const webpack = require('webpack')

const localEnv = dotenv.config().parsed

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: '[name]-[fullhash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: process.env.BASE_URL ?? '/',
        clean: true
    },
    devServer: {
        historyApiFallback: true
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: "ts-loader",
                options: {
                    transpileOnly: false, // Ensures type checking
                },
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false,
                            modules: {
                                localIdentName: '[local]--[name]--[hash:base64:5]'
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL),
            'process.env.MAP_KEY': localEnv.MAP_KEY
                ? JSON.stringify(localEnv.MAP_KEY)
                : JSON.stringify(process.env.MAP_KEY),
            'process.env.API_KEY': localEnv.API_KEY
                ? JSON.stringify(localEnv.API_KEY)
                : JSON.stringify(process.env.API_KEY)
        })
    ],
};
