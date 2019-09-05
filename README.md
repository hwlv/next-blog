
# koa-blog
#### 环境

## 使用
>  npm i  
   npm start

#### 介绍
koa next blog 

#### 软件架构
软件架构说明

## 文档
[next.js官网](https://nextjs.org/)  
[中文文档](https://nextjs.frontendx.cn/)  
[github](https://github.com/zeit/next.js)  



## next 相关知识点
建议看官方的文档和demo。demo有100多种例子供参考。[examples](https://github.com/zeit/next.js/tree/7.0.0-canary.8/examples)。这里只是做一些补充。

### nextjs使用dotenv设置环境变量。[参考nextjs官方demo](https://github.com/zeit/next.js/tree/7.0.0-canary.8/examples/with-dotenv)
### _document.js
服务端渲染会用到。如果用到统计代码，可以写在这里。
### _app.js
- 页面布局，相当于layout.js。
- 重写getInitialProps方法。这样每个页面切换的时候都会调用这个方法给页面传入自定义数据，比如初始化store。前提是要执行特定的代码，保证不会丢失props。代码如下：
```js
static async getInitialProps ({ Component, ctx }) {
  return {
    pageProps: Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {}
  }
}
```
### Link组件
Link有href和as属性。href 是真实的页面地址，as 为显示在浏览器地址栏里的地址。例如以下代码，真实地址为 /task/detail?id=1 ，但显示在浏览器的地址为 /tasks/1 。注意Link组件渲染的a标签点击的时候默认是不刷新页面的。如果这个时候手动刷新页面，服务端没有为‘/tasks/1’配置路由就会报错。建议如果想简单使用Link组件，可以不使用as属性。
```js
<Link
  href={{ pathname: '/task/detail', query: { id: task.id } }}
  as={`/tasks/${task.id}`}
>
  <a>{task.title}</a>
</Link>
```
### withRouter
nextjs提供的高阶组件，给包裹的组件props提供router对象包括pathname,query等属性。参考官网[using-with-router](https://github.com/zeit/next.js/tree/7.0.0-canary.8/examples/using-with-router)

### getInitialProps方法
getInitialProps只能存在于pages的页面中。它返回了对象数据并绑定在页面的props上面。当页面初始化加载(包括刷新)的时候它是在服务端运行，等取到数据才会渲染页面。当通过Link组件或者API方法跳转的时候，它是在客户端运行，异步获取数据渲染页面。这样既实现了SEO的需求，又增强了用户体验。

### 渲染原理
我们可以先看一下浏览器network返回的数据。
<p align="center">
<img src="./doc/img/nextjs-response.png" />
</p>
 
## github OAuth 2.0授权。
第三方授权现在比较流行的。比如像博客这种对登录权限要求不是特别严格的项目可以直接接入第三方授权，下面是接入github授权的流程。
1. 添加授权App。[github profile](https://github.com/settings/profile)=>[Developer settings](https://github.com/settings/apps) => 点击 [New Github App](https://github.com/settings/apps/new)
其中 GitHub App name 和 User authorization callback URL 比较重要。User authorization callback URL 就是完成授权后，github跳转的路径。
2. 拿到Client ID 和 Client Secret 到项目中。这个时候可以访问https://github.com/login/oauth/authorize?client_id=(你的Client ID) 测试是否打开授权页面。如果授权成功页面会跳转到User authorization callback URL并
附带参数code。
3. 流程图。
<p align="center">
<img src="./doc/img/githubauth.png" />
</p>

## 在nextjs项目中怎么使用css
本项目使用的是styled-jsx。文档[styled-jsx](https://github.com/zeit/styled-jsx)。
如果想在项目同时支持引入less文件和css文件，需要在next.config.js加入以下配置：
```js
const withCss = require('@zeit/next-css')
const withLess = require('@zeit/next-less')
module.exports = withLess(withCss({/**其他配置**/}))
```
1. 深入了解
> styled-jsx中使用sass。要修改.babelrc文件
```js
"presets": [
    [
      "next/babel",
      {
        "styled-jsx": {
          "plugins": ["styled-jsx-plugin-sass"]
        }
      }
    ]
  ]
```
2. css高亮。 
vscode的vscode-styled-jsx插件。webstorm要在代码块上面加上 { /*language=SCSS*/ }，这样写属性还会有提示和自动补全。例如：
```jsx harmony 
 { /*language=SCSS*/ }
  <style jsx >
  {
   `p {
     color: blue;
   }`
  }
  </style>          
```

### next.js中使用redux
当在服务器使用 Redux 渲染时，一定要在响应中包含应用的 state，这样客户端可以把它作为初始 state。这点至关重要，因为如果在生成 HTML 前预加载了数据，我们希望客户端也能访问这些数据。否则，客户端生成的 HTML 与服务器端返回的 HTML 就会不匹配，客户端还需要重新加载数据。
把数据发送到客户端，需要以下步骤：
- 为每次请求创建全新的 Redux store 实例；
- 按需 dispatch 一些 action；
- 从 store 中取出 state；
- 把 state 一同返回给客户端。

文档：[Redux on the Server](https://redux.js.org/recipes/server-rendering)  

## next.js中使用codemirror

## hooks用法
https://github.com/KieSun/Dream/issues/15


### next.js中使用antd
参考官网demo配置，[with-ant-design](https://github.com/zeit/next.js/tree/canary/examples/with-ant-design)
true会加载less文件


### 评论系统
使用的gitalk。
https://gitalk.github.io/

### 编辑器

选的是ace editor，然后发现有react封装好的，就直接用了。(在线体验)[http://securingsincity.github.io/react-ace/]
参考[brace使用](https://juejin.im/post/5a425cce6fb9a045204c7c11)

代码高亮：用highlight.js实现，样式参考[github](https://highlightjs.org/static/demo/styles/github.css)

### 部署
1. 通过npm   


    npm run build  
    
    npm start

2. 通过pm2

根目录下新建ecosystem.config.js 文件。    

    npm2 start ecosystem.config.js


### 其他
用webstorm 2019.1.3之前的版本的同学，会发现eslint插件会有报错。升级到1.3就好了。最新版本的破解方式可以参考[这里](https://zhile.io/2018/08/22/jetbrains-license-server-crack.html)
样式：
https://www.cupfox.com/


### koa相关
koa-router 嵌套验证

### 其他博客
docsify，hexo, gatsby

### next 问题
1. antd design 组件的类名，style-component 不生效。
2. 组件引入css文件会被默认引入

## 参考

https://blog.jaggerwang.net/nextjs-antd-react-app-develop-tour/
编辑器：
https://juejin.im/post/5a425cce6fb9a045204c7c11
koa:
https://juejin.im/post/5d3c51ad6fb9a07ead5a42bf

主页列表：https://www.gatsbyjs.org/blog/

## 文章详情左侧导航菜单
https://github.com/lxx2013/utils/blob/master/jianshu-index.js
https://www.v2ex.com/amp/t/549551
https://github.com/icanleric/other/blob/master/Typora%202%20Html%E5%B8%A6%E7%9B%AE%E5%BD%95.md
https://github.com/vuejs/vuejs.org/blob/master/themes/vue/source/js/common.js
