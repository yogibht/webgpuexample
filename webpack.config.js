const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	target: "node",
    mode: "development",
    entry: {
        "webgputest": [ path.resolve(__dirname, "client", "index.ts") ]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].js",
    },
    devtool: "inline-source-map",
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                include: /\.min\.js(\?.*)?$/i
            })
        ]
    },
    module: {
        rules: [
            { test: /\.(js|ts|tsx)$/, use:[{ loader: "ts-loader", options: { configFile: path.resolve(__dirname, "tsconfig.json") } }], exclude: /node_modules/ },
            { test: /\.css$/, use:[{loader: "css-loader"}] },
            { test: /\.scss$/, use:[{loader: "css-loader"}, {loader: "sass-loader"}] },
            { test: /\.(png|jpg|gif|svg)$/, use:[{loader: "file-loader"}] },
            { test: /\.(ttf|woff|woff2|eot)$/, use:[{loader: "url-loader"}] }
        ]
    },
    resolve: {
        alias: {
			"@assets": path.resolve(__dirname, "client", "assets"),
			"@game": path.resolve(__dirname, "client", "game"),
			"@gui": path.resolve(__dirname, "client", "gui"),
			"@utilities": path.resolve(__dirname, "client", "utilities"),
			"@workers": path.resolve(__dirname, "workers"),
            "@env": path.resolve(__dirname, "server", "env.ts")
        },
        extensions: [".js", ".ts", ".tsx"],
    }
};