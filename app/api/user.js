import request from '../util/request'

// 获取用户信息
export async function getUserInfo() {
  return await request({
    url: '/api/user/userinfo',
    method: 'get'
  })
}

// 获取用户列表
export async function getUsers(params) {
  return await request({
    url: '/api/user/getUsers',
    method: 'get',
    params
  })
}

// 登录
export async function login(data) {
  return await request({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

// 注册
export async function register(data) {
  return await request({
    url: '/api/user/register',
    method: 'post',
    data
  })
}
