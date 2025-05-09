import request from '@/utils/request'

// 查询知识库-用户文章收藏列表
export function listCollection(query) {
  return request({
    url: '/knowledge/collection/list',
    method: 'get',
    params: query
  })
}

// 查询知识库-用户文章收藏详细
export function getCollection(collectionId) {
  return request({
    url: '/knowledge/collection/' + collectionId,
    method: 'get'
  })
}

// 新增知识库-用户文章收藏
export function addCollection(data) {
  return request({
    url: '/knowledge/collection',
    method: 'post',
    data: data
  })
}

// 修改知识库-用户文章收藏
export function updateCollection(data) {
  return request({
    url: '/knowledge/collection',
    method: 'put',
    data: data
  })
}

// 删除知识库-用户文章收藏
export function delCollection(collectionId) {
  return request({
    url: '/knowledge/collection/' + collectionId,
    method: 'delete'
  })
}
