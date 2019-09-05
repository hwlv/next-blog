import axios from 'axios';
import qs from 'qs';

const isServer = typeof window == "undefined"

import { notification, message } from 'antd';

const errorMeg = (content) => {
  // isServer && message.error(content, 1000);
  console.log('error: ' + content)
};

const service = axios.create({
  baseURL: '/',
  timeout: 5000,
  headers: {  }
})

// 请求拦截
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    // if (config.qs) {
    //   config.data = qs.stringify(config.data)
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code && res.code !== 0) {
      if (res.code === 401) {
        // errorMeg('请重新登陆')
        !isServer && message.error('请先登陆', 1000)
      } else {
        errorMeg(res.message)
      }
      // !isServer && notification.error({
      //   message: res.message,
      //   duration: 1
      // })
      return Promise.reject(res || 'Error')
    } else {
      return Promise.resolve(response.data);
    }
  },
  error => {
    errorMeg(error)
    return Promise.reject(error)
  }
)

export default service
