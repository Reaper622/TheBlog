const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');

module.exports = {
  mode: 'production',
  entry: {
    // 动态链接库的入口
    react: ['react', 'react-dom']
  },
  output: {
    // 输出动态链接库的名称
    filename: '[name].dll.js',
    path: path.resolve(__dirname, '../dll'),
    // 动态链接库的全局变量名称
    library: '[name]'
  },
  plugins: [
    new DllPlugin({
      // 动态链接库的全局变量名称 与 output.library 保持一致
      name: '[name]',
      // 动态链接库 manifest.json 名称
      path: path.resolve(__dirname, '../dll/[name].manifest.json')
    })
  ]
};
