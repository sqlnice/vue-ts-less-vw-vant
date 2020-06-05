const path = require("path");
const merge = require("webpack-merge");
const tsImportPluginFactory = require("ts-import-plugin");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // 基本路径
  publicPath: "./",
  // 输出文件目录
  outputDir: "dist",
  assetsDir: "static",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    //  配置对应外网访问时对应的 host ,可从 window.location.host  取到
    // 解决外网访问无法热更新的问题
    // sockHost: "test.lcsw.cn:8057",
    disableHostCheck: true,
    host: "0.0.0.0",
    port: 8000,
    hot: true,
    open: true, // 编译完成自动打开页面
    https: false,
    hotOnly: false,
    proxy: { // 跨域处理
      '/api': {
        target: 'http://192.168.8.245:51810/api',
        changeOrigin: true, //允许跨越 在本地创建一个虚拟服务端
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set("@", resolve("src"));
    config.module
      .rule("ts")
      .use("ts-loader")
      .tap(options => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: "vant",
                libraryDirectory: "es",
                style: true
              })
            ]
          }),
          compilerOptions: {
            module: "es2015"
          }
        });
        return options;
      });
  },
  // configureWebpack: {
  //     externals: {
  //         'vue': 'Vue',
  //         'vue-router': 'VueRouter',
  //         'vuex': 'Vuex',
  //         'aixos': 'aixos',
  //         'dayjs': 'dayjs'
  //     }
  // },
  parallel: require("os").cpus().length > 1
};
