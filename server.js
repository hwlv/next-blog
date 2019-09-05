
const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')
const fs = require('fs')
const mongoose = require('mongoose')
const session = require('koa-session')
const bodyParser = require('koa-bodyparser')
const debug = require('debug')('server:main')
const atob = require('atob')
const port = parseInt(process.env.PORT, 10) || 5000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const join = require('path').join;

// 获取 models 目录下所有数据对象
const models = join(__dirname, './app/models');
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^.].*\.js$/))
  .forEach(file => require(join(models, file)));

const util = require('./app/util')
const config = require('./config')
const apiRouter = require('./app/controllers/api')

const Article = mongoose.model('Article');

global.atob = atob

// api请求白名单
const openUrl = [
  '/api/user/login',
  '/api/user/logout',
  '/api/user/register',
  '/api/article/getArticles',
  '/api/article/getArticleDetail'
]

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  // cookie 加密
  server.keys = ['newest secret key', 'older secret key'];

  const SESSION_CONFIG = {
    key: 'koa:sess'   //cookie key (default is koa:sess)
  }
  // 解析post数据放在ctx.request.body里
  server.use(bodyParser())
  // 使用session
  server.use(session(SESSION_CONFIG, server))

  server.use(async (ctx, next) => {
    const path = ctx.path
    // ctx.redis = redis
    debug(`request come: ${path}`)
    if (path.startsWith('/_next')) {
      await handle(ctx.req, ctx.res)
      ctx.respond = false
    } else {
      await next()
    }
  })

  // api请求需要验证session权限
  let apiAuthCheck = async (ctx, next) => {
    const url = ctx.request.url
    // 白名单不验证
    if (openUrl.includes(url.split('?')[0])){
      await next()
      return
    }
    if (!ctx.session || !ctx.session.user) {
      ctx.body = util.result({ code: 401, data: '401', message: '需要登录' })
    } else {
      await next()
    }
  };

  // 主页路由
  router.get('/', async ctx => {
    const pageNum = ctx.request.query.pageNum || 0;
    const articleList = await Article.list({ pageNum })
    await app.render(ctx.req, ctx.res, '/index', articleList)
    ctx.respond = false
  })

  // 详情页
  router.get('/detail/:id', async ctx => {
    // const pageNum = ctx.request.url.split('/')[1] || 0;
    const { id } = ctx.params
    const articleDetail = await Article.detail({ id, view: true })
    console.log(articleDetail)
    await app.render(ctx.req, ctx.res, '/detail', articleDetail)
    ctx.respond = false
  })

  router.use('/api', apiAuthCheck, apiRouter.routes(), apiRouter.allowedMethods())

  router.get('*', async ctx => {
    ctx.req.session = ctx.session
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  // 防止出现控制台报404错误
  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })

  server.use(router.routes())

  // server.use(async (ctx, next) => {
  //   ctx.req.session = ctx.session
  //   ctx.respond = false
  // })

  // 链接数据库
  connect()

  function connect() {
    console.log(config.db)
    mongoose.connection
      .on('error', console.log)
      .on('disconnected', connect)
      .once('open', listen);
    return mongoose.connect(config.db, { keepAlive: 1, useNewUrlParser: true });
  }

  function listen(){
    console.log('数据库连接成功...')
    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`)
    })
  }

})
