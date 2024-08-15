const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development', // Set this to 'production' for production builds
    entry: './src/index.ts', // Ensure this points to your main TypeScript file
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'), // Output directory
    },
    resolve: {
        extensions: ['.ts', '.js'], // Resolve .ts and .js files
        fallback: {
            "path": require.resolve("path-browserify"),
            "stream": require.resolve("stream-browserify"),
            "assert": require.resolve("assert/"),
            crypto: require.resolve('crypto-browserify'),
            http: require.resolve('stream-http'),
            https: require.resolve('stream-http'),
            os: require.resolve('os-browserify/browser'),
            querystring: require.resolve('querystring-es3'),
            util: require.resolve('util'),
            zlib: require.resolve('browserify-zlib'),
            "vm": require.resolve("vm-browserify"),
            fs: false, // Use 'false' if you don't need fs in the browser
            net: false, // Use 'false' if you don't need net in the browser
            tls: false, // Use 'false' if you don't need tls in the browser
            dns: false, // Use 'false' if you don't need dns in the browser
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/, // Use ts-loader for TypeScript files
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    externals: {
        child_process: 'commonjs2 child_process',
    },
    plugins: [
        new webpack.IgnorePlugin({
            resourceRegExp: /^async_hooks$/,
        }),
    ],
};
