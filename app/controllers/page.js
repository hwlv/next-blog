const debug = require('debug')('server:auth')
const axios = require('axios')
const config = require('../../config')
module.exports = function (router, app) {
  const routers = {
    '/new': 'new',
    '/detail': 'detail',
    '/about': 'about',
    // '/admin': 'admin',
    '/admin/managerArticle': 'admin/managerArticle',
    '/admin/managerTags': 'admin/managerTags',
    '/admin/managerUser': 'admin/managerUser',
    '/admin/newArticle': 'admin/newArticle',
    '/login': 'login',
    '/404': '404',
    '/': 'index'
  }

  router.get('/admin', async ctx => {
    console.log('admin....')
    if (!ctx.session || !ctx.session.user){
      await app.render(ctx.req, ctx.res, '/404', ctx.query)
    } else {
      await app.render(ctx.req, ctx.res, '/admin', ctx.query)
    }
    ctx.respond = false
  })

  Object.keys(routers).map( (route) => {
    router.get(route, async ctx => {
      await app.render(ctx.req, ctx.res, routers[route], ctx.query)
      ctx.respond = false
    })
  })

}
