const crypto = require('crypto')

module.exports = {
  MD5_SUFFIX: '早睡早起身体好……',
  md5: function (pwd) {
    let md5 = crypto.createHash('md5');
    return md5.update(pwd).digest('hex')
  },
  result(data){
    return data
  },
  resultSuccess(data = {}, message = 'success') {
    return { code: 0, message: message, data: data }
  },
  resultError(data = {})
  {
    return { code: 1, message: data, data: data }
  }
  // result(res,httpCode = 500, code = 3,message='服务端异常',data={}) {
  //   let responseData = {};
  //   responseData.code = code;
  //   responseData.message = message;
  //   responseData.data = data;
  //   res.status(httpCode).json(responseData)
  // }
}
