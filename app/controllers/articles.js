const Router = require('koa-router');
const router = new Router();
const mongoose = require('mongoose');
const dateFormat = require('dateformat')
const Article = mongoose.model('Article');
const { resultSuccess, resultError } = require('../util')

// 添加文章
router.post('/addArticle', async (ctx) => {
  const {
    title,
    content,
    tags
  } = ctx.request.body;

  const author = ctx.session.user.name;
  // const coverImg =  `/${Math.round(Math.random() * 9 + 1)}.jpg`;
  const viewCount = 0
  const isPublish = true
  const commentCount = 0
  let tempArticle = new Article({
    title,
    content,
    isPublish,
    viewCount,
    commentCount,
    author,
    // coverImg,
    tags: [].concat(tags)
  });
  const saveResult = await tempArticle.save()
  if (saveResult){
    ctx.body = resultSuccess('保存成功')
  } else {
    ctx.body = resultError('保存失败')
  }
})

// 更新文章
router.post('/updateArticle', async (ctx) => {
  const {
    id,
    title,
    content,
    tags
  } = ctx.request.body;

  const updateResult = await Article.update({ _id: id }, {
    title,
    content,
    tags,
    update_at: dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss')
  })
  if (updateResult.n === 1){
    ctx.body = resultSuccess('更新成功')
  } else {
    ctx.body = resultError('更新失败')
  }
})

//获取全部文章
router.get('/getArticles', async (ctx) => {
  let option = {}
  option.tag = ctx.request.query.tag || null;
  option.isPublish = ctx.request.query.isPublish || true
  option.pageNum = ctx.request.query.pageNum || 1
  const responseData = await Article.list(option)
  ctx.body = resultSuccess(responseData)
});

// 获取文章详情
router.get('/getArticleDetail', async (ctx) => {
  let id = ctx.request.query.id;
  // populate 读取关联的tags表数据
  const data = await Article.detail({ id })
  if (data){
    ctx.body = resultSuccess(data)
  } else {
    ctx.body = resultError(data)
  }
})

// 删除文章
router.get('/delArticle', async(ctx) => {
  let _id = ctx.request.query.id;
  let result = await Article.remove({ _id })
  if (result.n === 1){
    ctx.body = resultSuccess( '删除成功!')
  } else {
    ctx.body = resultError( '文章不存在');
  }
});

module.exports = router;
