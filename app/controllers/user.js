const Router = require('koa-router');
const router = new Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const { md5, MD5_SUFFIX, resultSuccess, resultError } = require('../util')

// 获取用户列表
router.get('/getUsers', async (ctx) => {
  const { pageNum, password } = ctx.request.query;
  let skip = (pageNum - 1) < 0 ? 0 : (pageNum - 1) * 10;
  let responseData = {
    total: 0,
    list: []
  };
  const count = await User.countDocuments()
  responseData.total = count;
  const userResult = await User.find(null, '_id username type password', { skip: skip, limit: 10 })

  console.log(userResult)
  if (userResult){
    responseData.list = userResult;
    ctx.body = resultSuccess(responseData)
  } else {
    ctx.body = resultError('获取失败')
  }
})

// 登录
router.post('/login', async (ctx) => {
  const { username, password } = ctx.request.body;
  const user =  await User.findOne({
    username,
    password: md5(password + MD5_SUFFIX)
  })
  if (user){
    ctx.session.user = {
      name: user.username
    }
    ctx.body = resultSuccess('login success')
  } else {
    ctx.body = resultError('登录失败')
  }
})

// 获取用户信息
router.get('/userinfo', async (ctx) => {
  let result
  const name = ctx.session.user && ctx.session.user.username
  ctx.body = resultSuccess({ name })
})

// 登出
router.get('/logout', async ctx => {
  ctx.session = null
  ctx.body = {
    code: 1,
    message: 'logout success',
    data: 'success'
  }
})

// 注册
router.post('/register', async (ctx) => {
  const { username, password } = ctx.request.body;
  //验证用户是否已经在数据库中
  const user = await User.findOne({ username })
  if (user)  {
    console.log(user)
    ctx.body = resultError('用户名已存在')
  } else {
    //保存到数据库
    let user = new User({
      username,
      password: md5(password + MD5_SUFFIX),
      type: 'user'
    })
    const saveResult = await user.save()
    if (saveResult){
      const findUser = User.findOne({ username })
      console.log(findUser)
      if (findUser){
        let data = {};
        data.username = findUser.username;
        data.userType = findUser.type;
        data.userId = findUser._id;
        ctx.body = resultSuccess('注册成功')
      } else {
        ctx.body = resultError('注册失败')
      }
    } else {
      ctx.body = resultError('注册失败')
    }
  }
})

module.exports = router;
