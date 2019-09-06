const webpack = require('webpack');

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    // 服务器根路径
    contentBase: './dist',
    // 打包后自动打开浏览器，设置为 false 即可关闭
    open: true,
    // DevServer 地址， 可设置为 0.0.0.0 来局域网广播
    host: '127.0.0.1',
    // 端口号
    port: 8090,
    // 开始模块热更替
    hot: true,
    // 及时HMR不生效，也不让浏览器自动刷新
    // hotOnly: true,
    // 代理客户端自动注入,若为 false 则为 iframe
    inline: true,
    // 出现错误时，在浏览器中显示全屏覆盖层
    overlay: true,
    // 配置单页应用,所有的路径都执行 index.html
    historyApiFallback: true,
    // 配置代理
    proxy: {}
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // scss文件中@import的scss文件也要经过前两个loader
              importLoaders: 2
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js'
  }
};

module.exports = devConfig;
