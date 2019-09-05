const Router = require('koa-router')
const router = new Router()
const tagsRouter = require('./tags')
const userRouter = require('./user')
const articleRouter = require('./articles')

// 用户相关
router.use('/user', userRouter.routes(), userRouter.allowedMethods())
// 标签
router.use('/tags', tagsRouter.routes(), tagsRouter.allowedMethods())
// 文章
router.use('/article', articleRouter.routes(), articleRouter.allowedMethods())

module.exports = router
