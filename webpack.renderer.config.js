const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const isDevelopment = process.env.NODE_ENV !== 'production';

rules.push(
  {
    test: /\.css$/,
    use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: [
      isDevelopment && {
        loader: 'babel-loader',
        options: { plugins: ['react-refresh/babel'] },
      },
      'ts-loader',
    ].filter(Boolean),
  }
);

plugins.push(
  isDevelopment && new ReactRefreshPlugin()
)
plugins.filter(Boolean);

module.exports = {
  target: 'web',
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css']
  },
};
