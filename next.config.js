/* eslint-disable */
require('dotenv').config();
const webpack = require('webpack')
const path = require('path')
const Dotenv = require('dotenv-webpack')
const withCss = require('@zeit/next-css')

// const configs = {
//     // 编译文件的输出目录。默认.next 目录。
//     distDir: 'dest',
//     // 是否给每个路由生成Etag。如果页面请求的Etag相同，可以直接使用浏览器缓存。默认为true。
//     // 如果用了Nginx可以使用Nginx的etag
//     generateEtags:true,
//     // 页面内容缓存配置
//     onDemandEntries:{
//         // 内容在内存中缓存的时长 ms
//         maxInactiveAge: 25*1000,
//         // 同时缓存多少个页面
//         pagesBufferLength: 2
//     },
//     // 配置页面后缀名解析扩展
//     pageExtensions: ['jsx', 'js'],
//     // 配置构建 ID。 Next.js 使用构建时生成的常量来标识你的应用服务是哪个版本。
//     generateBuildId: async ()=> {
//         if(process.env.YOUR_BUILD_ID){
//             return process.env.YOUR_BUILD_ID
//         }
//         // null 则使用默认的unique id
//         return null
//     },
//
// }
// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
    require.extensions['.css'] = file => {}
}else{

}

module.exports = withCss({
    webpack(config) {
        const eslintRule = {
            enforce: 'pre',
            test: /.(js|jsx)$/,
            loader: 'eslint-loader',
            exclude: [
                path.resolve(__dirname, '/node_modules'),
            ],
        }
        config.module.rules.push(eslintRule)
        config.plugins = [
            ...config.plugins,
            new webpack.DefinePlugin({
              TWO: '1+1',
            }),
            // Read the .env file
            new Dotenv({
              path: path.join(__dirname, '.env'),
              systemvars: true
            })
          ]
        return config
    }
})
