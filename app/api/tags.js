import request from '../util/request'

// 获取全部标签
export function getAllTag() {
  return request({
    url: '/api/tags/getAllTags',
    method: 'get'
  })
}

// 获取全部标签数组
export async function getAllTagArray() {
  return await getAllTag().then((res) => {
    return res.data.map( (tag) => tag.name )
  })
}

// 删除标签
export function removedTag(params) {
  request({
    url: '/api/tags/delTag',
    method: 'get',
    params
  })
}

// 添加标签
export function addTag(name) {
  return request({
    url: '/api/tags/addTag',
    method: 'post',
    data: { name }
  })
}
