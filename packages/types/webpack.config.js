// 引入一个包
const path = require('node:path')

// webpack中所有的配置信息都应该写在module.exports中
module.exports = [
  {
    mode: 'production',
    // 指定入口文件
    entry: './index.ts',
    // 指定打包文件所在目录
    output: {
      // 指定打包文件目录
      path: path.resolve(__dirname, 'dist/cjs'),
      // 打包后的文件名
      filename: 'index.js',
      libraryTarget: 'commonjs', // 设置输出模块类型为 CommonJS
    },
    resolve: {
      extensions: ['.ts', '.js'], // 支持的文件扩展名
    },
    // 指定webpack打包时要使用模块
    module: {
      // 指定图片、资源等要加载的规则
      rules: [
        {
          // test指定的是规则生效的文件
          test: /\.ts$/, // 匹配所有以ts结尾的文件
          loader: 'ts-loader', // 用ts-loader去处理以ts结尾的文件
          // 要排除的文件
          exclude: /node-modules/,
          options: {
            configFile: 'tsconfig.cjs.json', // 指定 tsconfig.json 文件路径
          },
        },
      ],
    },
  },
  {
    mode: 'production',
    // 指定入口文件
    entry: './index.ts',
    // 指定打包文件所在目录
    output: {
      // 指定打包文件目录
      path: path.resolve(__dirname, 'dist/esm'),
      // 打包后的文件名
      filename: 'index.js',
      libraryTarget: 'module', // 设置输出模块类型为 CommonJS
      module: true,
    },
    experiments: {
      outputModule: true,
    },
    resolve: {
      extensions: ['.ts', '.js'], // 支持的文件扩展名
    },
    // 指定webpack打包时要使用模块
    module: {
      // 指定图片、资源等要加载的规则
      rules: [
        {
          // test指定的是规则生效的文件
          test: /\.ts$/, // 匹配所有以ts结尾的文件
          loader: 'ts-loader', // 用ts-loader去处理以ts结尾的文件
          // 要排除的文件
          exclude: /node-modules/,
          options: {
            configFile: 'tsconfig.esm.json', // 指定 tsconfig.json 文件路径
          },
        },
      ],
    },
  },
]
