'use strict';
const path = require('path');
// 统一路径解析
function resolve(dir) {
  return path.resolve(__dirname, dir);
}

// 包括生产和开发的环境配置信息
module.exports = {
  settings: {
    enableESLint: false, // 调试模式是否开启ESLint，默认开启ESLint检测代码格式
    enableESLintFix: false, // 是否自动修正代码格式，默认不自动修正
    enableStyleLint: true, // 是否开启StyleLint，默认开启ESLint检测代码格式
    enableStyleLintFix: false // 是否需要StyleLint自动修正代码格式
  },
  webpack: {
    resolve: {
      // webpack的resolve配置
      extensions: ['.js', '.jsx', '.vue', 'json'], // 用于配置webpack在尝试过程中用到的后缀列表
      alias: {
        '@': resolve('src'),
        $components: resolve('src/components'),
        $pages: resolve('src/pages'),
        $plugins: resolve('src/plugins'),
        $utils: resolve('src/utils'),
        $assets: resolve('src/assets'),
        $public: resolve('public'),
        $router: resolve('src/router'),
        $store: resolve('src/store'),
        $data: resolve('src/data'),
        $config: resolve('src/config'),
        $mixins: resolve('src/mixins'),
      },
    },
    // 从输出的 bundle 中排除依赖
    externals: [
      {
        react: {
          commonjs: 'react',
          commonjs2: 'react',
          amd: 'react',
          root: ['React'],
        },
      },
      {
        'react-dom': {
          commonjs: 'react-dom',
          commonjs2: 'react-dom',
          amd: 'react-dom',
          root: ['ReactDOM'],
        },
      },
    ],
    template: resolve('./src/index.html'), // 默认html模板
    // sassResources中的sass文件会自动注入每一个sass文件中
    sassResources: [
      resolve('./src/assets/css/common.scss'),
      resolve('./src/assets/css/mixin.scss'),
    ],
  },
  dev: {
    entry: {
      // webpack构建入口
      index: './src/index.js', // 调试模式的入口
    },
    // 用于开启本地调试模式的相关配置信息
    NODE_ENV: 'development',
    port: 80,
    autoOpenBrowser: true,
    assetsPublicPath: '/', // 设置静态资源的引用路径（根域名+路径）
    assetsSubDirectory: '',
    hostname: 'localhost',
    cssSourceMap: false,
  },
  build2lib: {
    entry: {
      // webpack构建入口
      index: './src/main.js', // 构建lib的入口
    },
    // 用于构建生产环境代码的相关配置信息
    NODE_ENV: 'production', // development / production
    libraryName: 'JSONSchemaEditor', // 构建第三方功能包时最后导出的引用变量名
    assetsRoot: resolve('./dist'), // 打包后的文件绝对路径（物理路径）
    assetsPublicPath: '/', // 设置静态资源的引用路径（根域名+路径）
    assetsSubDirectory: '', // 资源引用二级路径
    productionSourceMap: false,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css', 'json'],
    bundleAnalyzerReport: false,
  },
  build: {
    entry: { // webpack构建入口
      index: './src/index.js', // 构建测试Demo的入口
    },
    // 用于构建生产环境代码的相关配置信息
    NODE_ENV: 'production',
    assetsRoot: resolve('./test'), // 打包后的文件绝对路径（物理路径）
    assetsPublicPath: '/json-schema-editor/test/', // 设置静态资源的引用路径（根域名+路径）
    assetsSubDirectory: '', // 资源引用二级路径
    productionSourceMap: false,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css', 'json'],
    bundleAnalyzerReport: false,
  }
};
