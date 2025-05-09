import request from '@/utils/request'

// 查询知识库-用户Feed订阅关系列表
export function listSubscription(query) {
  return request({
    url: '/knowledge/subscription/list',
    method: 'get',
    params: query
  })
}

// 查询知识库-用户Feed订阅关系详细
export function getSubscription(subscriptionId) {
  return request({
    url: '/knowledge/subscription/' + subscriptionId,
    method: 'get'
  })
}

// 新增知识库-用户Feed订阅关系
export function addSubscription(data) {
  return request({
    url: '/knowledge/subscription',
    method: 'post',
    data: data
  })
}

// 修改知识库-用户Feed订阅关系
export function updateSubscription(data) {
  return request({
    url: '/knowledge/subscription',
    method: 'put',
    data: data
  })
}

// 删除知识库-用户Feed订阅关系
export function delSubscription(subscriptionId) {
  return request({
    url: '/knowledge/subscription/' + subscriptionId,
    method: 'delete'
  })
}
