const mongoose = require('mongoose');
require('./app/models/articles')
const config = require('./config');

console.log(config)

mongoose.connect(config.db, {useNewUrlParser: true});

mongoose.connection
    .on('connected', () => {
        console.log('Mongoose connection success')
        const Article = mongoose.model('Article');
        const list = Article.list()
        console.log(list)
    })
    .on('error', () => {
        console.log('Mongoose connection error')
    })
