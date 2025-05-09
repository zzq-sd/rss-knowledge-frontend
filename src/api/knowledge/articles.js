import request from '@/utils/request'

// 查询知识库-文章信息列表
export function listArticles(query) {
  return request({
    url: '/knowledge/articles/list',
    method: 'get',
    params: query
  })
}

// 查询知识库-文章信息详细
export function getArticles(articleId) {
  return request({
    url: '/knowledge/articles/' + articleId,
    method: 'get'
  })
}

// 新增知识库-文章信息
export function addArticles(data) {
  return request({
    url: '/knowledge/articles',
    method: 'post',
    data: data
  })
}

// 修改知识库-文章信息
export function updateArticles(data) {
  return request({
    url: '/knowledge/articles',
    method: 'put',
    data: data
  })
}

// 删除知识库-文章信息
export function delArticles(articleId) {
  return request({
    url: '/knowledge/articles/' + articleId,
    method: 'delete'
  })
}
