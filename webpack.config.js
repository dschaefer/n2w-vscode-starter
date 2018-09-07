const path = require('path');

const clientConfig = {
    mode: 'development',
    stats: {
        children: true
    },
    entry: {
        view: './src/view/index.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'out'),
        filename: "[name].js"
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: "initial",
                    name: "vendor",
                    priority: 10,
                    enforce: true
                }
            }
        }
    },
    devtool: 'eval-source-map',
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.json']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                options: {
                    compilerOptions: {
                        module: 'es2015'
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    performance: {
        hints: false
    }
};

const extensionConfig = {
    target: 'node',
    mode: 'none',
    context: __dirname,
    resolve: {
        extensions: [ '.ts', '.js', '.node' ]
    },
    entry: {
        extension: './src/extension/extension.ts'
    },
    output: {
        path: path.resolve(__dirname, 'out'),
        filename: '[name].js',
        libraryTarget: 'commonjs',
        devtoolModuleFilenameTemplate: '[absolute-resource-path]'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    compilerOptions: {
                        sourceMap: true
                    }
                }
            }
        ]
    },
    externals: [
        "vscode"
    ]
};

module.exports = [ clientConfig, extensionConfig ];