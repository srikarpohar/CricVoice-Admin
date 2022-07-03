const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const Dotenv = require('dotenv-webpack');


function createConfig(env) {
  const isProd = env.mode === 'production';

  let config = {
    mode : isProd ? 'production' : 'development',
    entry: {
      admin: { 
        import: "./src/index.tsx",
      }
    },
    output: {
      path: resolve(__dirname, "dist"),
      filename: "cricvoice.[name].bundle.js",
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: "babel-loader",
          exclude: /node_modules/,
        }, 
        {
            test: /\.scss?$/,
            exclude: /node_modules/,
            use: [
                'style-loader',
                'css-loader',
                'postcss-loader',
                'sass-loader'
            ]
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          exclude: /node_modules/, 
          type: 'asset/resource',
        }
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html",
        inject: "body",
        favicon: "./public/cricvoice-logo.ico",
        manifest: "./public/manifest.json"
      }),
      new Dotenv({
          path: `./.env`
      }),
    ],
  };
  
  if (isProd) {
    config['optimization'] = {
      minimizer: [new TerserWebpackPlugin()],
    };
  } else {
    config['optimization'] = {
      runtimeChunk: 'single',
    },
    config['devServer'] = {
      port: 3300,
      historyApiFallback: true,
      open: true,
      compress: true,
      client: {
        logging: 'error'
      }
    };
  }
  return config;
}

module.exports = (env) => createConfig(env);