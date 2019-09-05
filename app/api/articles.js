import request from '../util/request'

// 获取文章列表
export async function getArticles(params) {
  return request({
    url: '/api/article/getArticles',
    method: 'get',
    params
  })
}

// 添加文章
export function addArticle(data) {
  return request({
    url: '/api/article/addArticle',
    method: 'post',
    data
  })
}

// 更新文章
export function updateArticle(data) {
  return request({
    url: '/api/article/updateArticle',
    method: 'post',
    data
  })
}

// 删除文章
export function deleteArticle(params) {
  return request({
    url: '/api/article/delArticle',
    method: 'get',
    params
  })
}

// 获取文章详情
export function getArticleDetail(params) {
  return request({
    url: '/api/article/getArticleDetail',
    method: 'get',
    params
  })
}

