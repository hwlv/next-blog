const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema;

var UserSchema = new Schema({
  // 登录名
  name: { type: String, default: '' },
  // 昵称
  username: { type: String, default: '' },
  // 管理员、普通用户
  type: { type: String, default: '' },
  // 邮箱
  email: { type: String, default: '' },
  // 性别
  sex: { type: Number, default: '' },
  provider: { type: String, default: '' },
  phone: { type: String, default: '' },
  // 密码，加密后
  password: { type: String, default: '' },
  salt: { type: String, default: '' },
  authToken: { type: String, default: '' }
}, { collection: 'user' });

const validatePresenceOf = value => value && value.length;

const oAuthTypes = [
  'github',
  'twitter',
  'facebook',
  'google',
  'linkedin'
];

/**
 * Virtuals
 */

// UserSchema
//   .virtual('password')
//   .set(function (password) {
//     this._password = password;
//     this.salt = this.makeSalt();
//     this.hashed_password = this.encryptPassword(password);
//   })
//   .get(function () {
//     return this._password;
//   });

/**
 * Validations 验证
 */

// the below 5 validations only apply if you are signing up traditionally

// UserSchema.path('name').validate(function (name) {
//   if (this.skipValidation()) return true;
//   return name.length;
// }, 'Name cannot be blank');

// UserSchema.path('email').validate(function (email) {
//   if (this.skipValidation()) return true;
//   return email.length;
// }, 'Email cannot be blank');

// UserSchema.path('email').validate(function (email, fn) {
//     const User = mongoose.model('User');
//     if (this.skipValidation()) fn(true);
//
//     // Check only when it is a new user or when email field is modified
//     if (this.isNew || this.isModified('email')) {
//         User.find({ email: email }).exec(function (err, users) {
//             fn(!err && users.length === 0);
//         });
//     } else fn(true);
// }, 'Email already exists');

UserSchema.path('username').validate(function (username) {
  if (this.skipValidation()) return true;
  return username.length;
}, 'Username cannot be blank');

// UserSchema.path('hashed_password').validate(function (hashed_password) {
//   if (this.skipValidation()) return true;
//   return hashed_password.length && this._password.length;
// }, 'Password cannot be blank');

/**
 * Pre-save hook mongoose里的中间件:pre和post
 */

UserSchema.pre('save', function (next) {
  if (!this.isNew) return next();

  if (!validatePresenceOf(this.password) && !this.skipValidation()) {
    next(new Error('Invalid password'));
  } else {
    next();
  }
});

/**
 * Methods
 */

UserSchema.methods = {

  /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */

  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  /**
     * Make salt
     *
     * @return {String}
     * @api public
     */

  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },

  /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */

  encryptPassword: function (password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },

  /**
     * Validation is not required if using OAuth
     */

  skipValidation: function () {
    return ~oAuthTypes.indexOf(this.provider);
  }
};

/**
 * Statics 静态方法
 */

UserSchema.statics = {

  /**
     * Load
     *
     * @param {Object} options
     * @param {Function} cb
     * @api private
     */

  load: function (options, cb) {
    options.select = options.select || 'name username';
    return this.findOne(options.criteria)
      .select(options.select)
      .exec(cb);
  }
};

// function encryptPassword(password) {
//     return crypto.createHash("md5").update(password).digest("base64");
// }

mongoose.model('User', UserSchema);
