const path = require('path');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
// const DefinePlugin = require('webpack/lib/DefinePlugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  resolve: {
    // 针对npm中的第三方模块优先用jsnext:main指向ES6模块化语法的的文件
    mainFields: ['jsnext:main', 'browser', 'main']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'happypack/loader?id=css']
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'happypack/loader?id=scss']
      }
    ]
  },
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js'
  },
  plugins: [
    new ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash].css'
    }),
    new DllReferencePlugin({
      // react 动态链接库文件内容
      manifest: require('../dll/react.manifest.json')
    }),
    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, '../dll', 'react.dll.js')
    }),
    // 使用 ParallelUglifyPlugin 并行压缩输出的 JS
    new ParallelUglifyPlugin({
      exclude: /node_modules/,
      // UglifyJS 的参数
      uglifyJS: {
        output: {
          // 紧凑输出
          beautify: false,
          // 去除注释
          comments: false
        },
        compress: {
          // 删除无用代码时不产生警告
          warnings: false,
          // 去除所有的 console
          drop_console: true,
          // 内嵌定义但只用到一次的变量
          collapse_vars: true,
          // 提取出使用多次但没有定义为变量的静态值
          reduce_vars: true
        }
      }
    }),
    new CleanWebpackPlugin()
  ],
  optimization: {
    // 代码分割
    splitChunks: {
      // 对入口文件与异步导入文件都进行处理
      chunks: 'all',
      // 最小尺寸必须大于此值，否则不执行代码分割,单位为字节
      minSize: 30000,
      // 其他入口文件引用次数达到1再进行代码分割
      minChunks: 1,
      // 入口文件请求的chunks不超过3个
      maxInitialRequests: 3,
      // 同时最多加载五个请求，异步请求的chunks不超过5个
      maxAsyncRequests: 5,
      // 文件中间生成的连接符
      automaticNameDelimiter: '~',
      // 文件生成名,基于 chunks 和 cache group 来生成
      name: true,
      cacheGroups: {
        // node_modules 内的依赖库
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          // 优先级 多个分组冲突时根据优先级决定代码属于那一块
          priority: -10,
          name: 'vendors'
        },
        // utils 工具库
        utils: {
          test: /[\\/]src[\\/]utils[\\/]/,
          priority: -20,
          // 复用之前已经打包过的，不在重新打包已经打包过的模块
          reuseExistingChunk: true,
          name: 'utils'
        }
      }
    }
  }
};

module.exports = prodConfig;
