import request from '@/utils/request'

// 查询知识库-用户笔记列表
export function listNote(query) {
  return request({
    url: '/knowledge/note/list',
    method: 'get',
    params: query
  })
}

// 查询知识库-用户笔记详细
export function getNote(noteId) {
  return request({
    url: '/knowledge/note/' + noteId,
    method: 'get'
  })
}

// 新增知识库-用户笔记
export function addNote(data) {
  return request({
    url: '/knowledge/note',
    method: 'post',
    data: data
  })
}

// 修改知识库-用户笔记
export function updateNote(data) {
  return request({
    url: '/knowledge/note',
    method: 'put',
    data: data
  })
}

// 删除知识库-用户笔记
export function delNote(noteId) {
  return request({
    url: '/knowledge/note/' + noteId,
    method: 'delete'
  })
}
