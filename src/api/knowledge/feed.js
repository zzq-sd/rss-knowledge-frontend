import request from '@/utils/request'

// 查询知识库-RSS Feed源信息列表
export function listFeed(query) {
  return request({
    url: '/knowledge/feed/list',
    method: 'get',
    params: query
  })
}

// 查询知识库-RSS Feed源信息详细
export function getFeed(feedId) {
  return request({
    url: '/knowledge/feed/' + feedId,
    method: 'get'
  })
}

// 新增知识库-RSS Feed源信息
export function addFeed(data) {
  return request({
    url: '/knowledge/feed',
    method: 'post',
    data: data
  })
}

// 修改知识库-RSS Feed源信息
export function updateFeed(data) {
  return request({
    url: '/knowledge/feed',
    method: 'put',
    data: data
  })
}

// 删除知识库-RSS Feed源信息
export function delFeed(feedId) {
  return request({
    url: '/knowledge/feed/' + feedId,
    method: 'delete'
  })
}
