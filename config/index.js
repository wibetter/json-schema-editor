'use strict';

const path = require('path');

// 包括生产和开发的环境配置信息
module.exports = {
  sassResources: [
    path.resolve(__dirname, '../src/assets/css/common.scss'),
    path.resolve(__dirname, '../src/assets/css/mixin.scss'),
  ],
  template: path.resolve(__dirname, '../src/index.html'), // 首页使用的模板，主要供开发调试使用
  envParams: {
    // 项目系统环境变量
    common: {
      // 通用参数
      '#version#': '20200608.1',
    },
    local: {
      // 本地开发环境
      '#dataApiBase#': 'http://localhost:1024', // 数据接口根地址
      '#assetsPublicPath#': 'http://localhost:1024', // 静态资源根地址
      '#routeBasePath#': '/', // 路由根地址
    },
    online: {
      // 线上正式环境配置参数
      '#dataApiBase#': '/', // 数据接口根地址 "//goodtool666.cn/"格式
      '#assetsPublicPath#': '', // 静态资源根地址 "//goodtool666.cn/_spa/sportNews"格式
      '#routeBasePath#': '/', // 路由根地址 "/_spa/sportNews/"格式
    },
  },
  dev: {
    // 本地开发环境相关配置信息
    env: {
      NODE_ENV: 'development',
    },
    port: 80,
    autoOpenBrowser: true,
    assetsPublicPath: '/', // 设置静态资源的引用路径（根域名+路径）
    assetsSubDirectory: '',
    hostname: 'localhost',
    proxyTable: {
      '/apiTest': {
        target: 'http://api-test.com.cn', // 不支持跨域的接口根地址
        ws: true,
        changeOrigin: true,
      },
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  },
  build: {
    // 生产环境相关配置信息
    env: {
      NODE_ENV: 'production',
    },
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'), // 打包后的文件绝对路径（物理路径）
    assetsPublicPath: '/', // 设置静态资源的引用路径（根域名+路径）
    assetsSubDirectory: '', // 资源引用二级路径
    productionSourceMap: false,
    // Gzip off by default as many popular public hosts such as
    // Surge or Netlify already gzip all public assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css', 'json'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: false,
  },
};
