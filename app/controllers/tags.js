const Router = require('koa-router');
// 实例化router
const router = new Router();
const mongoose = require('mongoose');
const Tags = mongoose.model('Tags');
const util = require('../util')

// 查找标签
router.get('/getAllTags', async (ctx) => {
  const result = await Tags.find(null, 'name')
  if (result){
    ctx.body = util.resultSuccess(result)
  } else {
    ctx.body = util.resultSuccess('error')
  }
})

//删除标签
router.get('/delTag', async (ctx) => {
  let { name } = ctx.request.query;
  const result = await Tags.deleteOne({ name })
  if (result.n === 1){
    return  ctx.body = util.resultSuccess( '删除成功!')
  } else {
    return  ctx.body = util.resultError( '标签不存在!')
  }
});

//添加标签
router.post('/addTag', async (ctx) => {
  let { name } = ctx.request.body;
  console.log(name)
  const tagsResult = await Tags.findOne({ name })
  console.log('tagsResult')
  console.log(tagsResult)
  if (!tagsResult){
    let tag = new Tags({ name });
    await tag.save()
    ctx.body = util.resultSuccess( '添加成功!')
  } else {
    ctx.body = util.resultError( '该标签已存在!')
  }
});

module.exports = router;
