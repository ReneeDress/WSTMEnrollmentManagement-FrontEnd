// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
// vue.config.js
module.exports = {
    // type: string
    // default: "/"
    // 把开发服务器架设在根路径
    publicPath: process.env.NODE_ENV === 'production'
        ? './'
        : '/',

    // type: string  
    // default: "dist"
    // 打包后的文件夹名字
    outputDir: 'school',

    // type: string  
    // default: ""
    // 静态资源目录
    // assetsDir: 'assets',

    // type: string  
    // default: "index.html"
    // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
    // indexPath: 'index.html',

    // type: boolean
    // default: "true"
    // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存,如果是vue cli创建的index.html，则为true，无法使用 Vue CLI 生成的 index HTML，为false
    // filenameHashing: true,

    // type: object
    // default: "undefined"
    // 设置单页面与多页面
    // 多页面情况下，每个“page”应该有一个对应的 JavaScript 入口文件。其值应该是一个对象，对象的 key 是入口的名字，value 是：
    // 一个指定了 entry, template, filename, title 和 chunks 的对象 (除了 entry 之外都是可选的)；
    // 或一个指定其 entry 的字符串。
    // 具体情况看官网 https://cli.vuejs.org/zh/config/#pages
    // pages: {
    //     index: {
    //         // page 的入口
    //         entry: 'src/main.js',
    //         // 模板来源
    //         template: 'public/index.html',
    //         // 在 dist/index.html 的输出
    //         filename: 'index.html',
    //         // 当使用 title 选项时，
    //         // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    //         title: 'Index Page',
    //         // 在这个页面中包含的块，默认情况下会包含
    //         // 提取出来的通用 chunk 和 vendor chunk。
    //         chunks: ['chunk-vendors', 'chunk-common', 'index']
    //     }
    // },

    // type: boolean | error
    // default: "true"
    // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
    // true: eslint-loader 会将 lint 错误输出为编译警告。默认情况下，警告仅仅会被输出到命令行，且不会使得编译失败,在开发和生产环境都会起作用
    // 想要在生产构建时禁用 eslint-loader  ==>  lintOnSave: process.env.NODE_ENV !== 'production'
    // false：无反应
    // error：这会强制 eslint-loader 将 lint 错误输出为编译错误，同时也意味着 lint 错误将会导致编译失败。
    // 通过设置让浏览器 overlay 同时显示警告和错误 在 devServe 配置项中  ==>  overlay: {warnings: true,errors: true}
    // lintOnSave: true,

    // type: boolean
    // default: "false"
    // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
    // 具体信息看官网 https://cn.vuejs.org/v2/guide/installation.html#运行时+编译器vs.只包含运行时
    // runtimeCompiler: false,

    // type: Array<string | RegExp>
    // default: "[]" (RegExp) ==> 正则
    // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来
    // transpileDependencies: [],

    // type: boolean
    // default: "true"
    // SourceMap 一个存储源代码与编译代码对应位置映射的信息文件
    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
    // productionSourceMap: true,

    // type: String
    // default: undefined
    // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。需要注意的是该选项仅影响由 html-webpack-plugin 在构建时注入的标签 - 直接写在模版 (public/index.html) 中的标签不受影响。
    // 这个应该和标签跨域有关  具体细节看  ==> https://developer.mozilla.org/zh-CN/docs/Web/HTML/CORS_settings_attributes
    // crossorigin: '',

    // type: boolean
    // default: "false"
    // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)。如果你构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性。
    // 需要注意的是该选项仅影响由 html-webpack-plugin 在构建时注入的标签 - 直接写在模版 (public/index.html) 中的标签不受影响。
    // 另外，当启用 SRI 时，preload resource hints 会被禁用，因为 Chrome 的一个 bug 会导致文件被下载两次
    // SRI(子资源完整性) https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity
    // integrity: false,

    // type: object | function
    // 调整 webpack 配置
    // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
    // 如果这个值是一个函数，则会接收被解析的配置作为参数。该函数及可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
    // 细节查看 https://cli.vuejs.org/zh/guide/webpack.html#简单的配置方式
    // configureWebpack: config => {
    //     if (process.env.NODE_ENV === 'production') {
    //         // 为生产环境修改配置...
    //     } else {
    //         // 为开发环境修改配置...
    //     }
    // },

    // type: function
    // 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
    // 具体细节查看 https://cli.vuejs.org/zh/guide/webpack.html#链式操作(高级)
    // 你需要熟悉 webpack-chain 的 API 并阅读一些源码以便了解如何最大程度利用好这个选项，但是比起直接修改 webpack 配置，它的表达能力更强，也更为安全。
    // chainWebpack   ==>  我有点理解不了，应该是修改 添加 替换loader

    // css: {
        // type: boolean
        // default: "true"
        // requireModuleExtension: false,

        // type: boolean | object
        // default:生产环境下是 true，开发环境下是 false
        // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
        // 当作为一个库构建时，你也可以将其设置为 false 免得用户自己导入 CSS
        // 提取 CSS 在开发环境模式下是默认不开启的，因为它和 CSS 热重载不兼容。然而，你仍然可以将这个值显性地设置为 true 在所有情况下都强制提取。
        // extract

        // type: boolean
        // default: "false"
        // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能。
        // sourceMap: false,

        // type: object
        // default: {}
        // 向 CSS 相关的 loader 传递选项。css预设器配置项
        // loader 可以通过 loaderOptions 配置，包括：css-loader postcss-loader sass-loader less-loader stylus-loader
        // 具体细节查看 https://cli.vuejs.org/zh/guide/css.html#向预处理器Loader传递选项
        // loaderOptions: {
            // css: {
                // 这里的选项会传递给 css-loader
            // },
            // postcss: {
                // 这里的选项会传递给 postcss-loader
            // }
        // }
    // },
    // type: boolean
    // default: require('os').cpus().length > 1
    // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建
    // 构建时开启多进程处理babel编译
    // parallel: require('os').cpus().length > 1,

    // type: object
    // 单页插件相关配置  向PWA插件传递选项
    // 具体细节 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    // pwa: {},

    // type: object
    // 这是一个不进行任何 schema 验证的对象，因此它可以用来传递任何第三方插件选项。
    // schema数据库对象的集合 (也有其他意思...)
    // pluginOptions: {},

    // type: object
    // 开发配置
    // 细节查看 https://webpack.js.org/configuration/dev-server/#devserver
    // devServer: {
    //     open: true,
    //     hot: true,
    //     historyApiFallback: true,
    //     host: '0.0.0.0',
    //     port: '8081'
    // }
}