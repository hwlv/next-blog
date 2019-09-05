'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const dateFormat = require('dateformat')
// const Imager = require('imager');
// const config = require('../../config');
// const imagerConfig = require(config.root + '/config/imager.js');

const Schema = mongoose.Schema;

// const getTags = tags => tags.join(',');
// const setTags = tags => tags.split(',');

/**
 * Article Schema
 */

const ArticleSchema = new Schema({
  //文章标题
  title: { type: String, default: '', trim: true },
  //文章内容
  content: { type: String, default: '', trim: true },
  //是否是markdown还是html
  content_is_html: { type: Boolean },
  // 创建人
  user: { type: Schema.ObjectId, ref: 'User' },
  // 评论
  // comments: [{
  //   body: { type: String, default: '' },
  //   user: { type: Schema.ObjectId, ref: 'User' },
  //   createdAt: { type: Date, default: Date.now }
  // }],
  //浏览量
  viewCount: { type: Number },
  //爱心数量
  likeNum: { type: Number },
  // 标签
  tags: { type: Schema.ObjectId, ref: 'Tags' },
  // 文章图片
  image: {
    cdnUri: String,
    files: []
  },
  //文章发表日期
  createdAt: { type: String, default: dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss') },
  //文章更新日期
  update_at: { type: String, default: dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss') },
  isPublish: { type: Boolean, default: false }
}, {
  collection: 'article'
});

/**
 * Validations
 */

ArticleSchema.path('title').required(true, 'Article title cannot be blank');
// ArticleSchema.path('body').required(true, 'Article body cannot be blank');

/**
 * Pre-remove hook
 */

ArticleSchema.pre('remove', function (next) {
  // const imager = new Imager(imagerConfig, 'S3');
  // const files = this.image.files;

  // if there are files associated with the item, remove from the cloud too
  // imager.remove(files, function (err) {
  //   if (err) return next(err);
  // }, 'article');

  next();
});

/**
 * Methods
 */

ArticleSchema.methods = {

  /**
   * Save article and upload image
   *
   * @param {Object} images
   * @api private
   */

  uploadAndSave: function (image) {
    const err = this.validateSync();
    if (err && err.toString()) throw new Error(err.toString());
    return this.save();

    /*
        if (images && !images.length) return this.save();
        const imager = new Imager(imagerConfig, 'S3');

        imager.upload(images, function (err, cdnUri, files) {
          if (err) return cb(err);
          if (files.length) {
            self.image = { cdnUri : cdnUri, files : files };
          }
          self.save(cb);
        }, 'article');
        */
  }
};

/**
 * Statics 静态方法
 */

ArticleSchema.statics = {
  // 文章列表
  async list(options) {
    const pageNum = options.pageNum || 0
    const limit = options.limit || 8
    const tag = options.tag || null
    let searchCondition
    if (tag) {
      searchCondition.tags = tag;
    }
    let responseData = {
      total: 0,
      list: []
    };
    let skip = (pageNum - 1) < 0 ? 0 : (pageNum - 1) * limit;
    const count = await this.countDocuments(searchCondition)
    responseData.total = count;
    const result = await this.find(searchCondition, '_id title  tags viewCount isPublish createdAt image').populate('tags')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
    responseData.list = result;
    return responseData
  },

  // 文章详情
  async detail(options) {
    const { id, view } = options
    const data = await this.findOne({ _id: id })
      .populate('tags')
      .exec()
    if (view){
      data.viewCount = data.viewCount + 1;
      console.log(data.viewCount)
      const dd = await this.updateOne({ _id: id }, { viewCount: data.viewCount })
      console.log(dd)
    }
    return data
  }

};

mongoose.model('Article', ArticleSchema);
