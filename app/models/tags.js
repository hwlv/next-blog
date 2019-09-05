const mongoose = require('mongoose')
console.log('common.less..')
const Schema = mongoose.Schema;
const TagsSchema = new Schema({
  name: String
}, {
  collection: 'tags'
})

mongoose.model('Tags', TagsSchema);
