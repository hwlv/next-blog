
const mongoose = require('mongoose');
const config = require('../config');
require('../app/models/article')
require('../app/models/user')
console.log(config)
mongoose.connect(config.db, { useNewUrlParser: true });

mongoose.connection
  .on('connected', () => {
    console.log('Mongoose connection success')
    const Article = mongoose.model('Article');
    const User = mongoose.model('User');
    // const list = Article.find().then((res) => {
    //     console.log(res)
    // })
    const userList = User.find().then((res) => {
      console.log(res)
    })

  })
  .on('error', () => {
    console.log('Mongoose connection error')
  })
