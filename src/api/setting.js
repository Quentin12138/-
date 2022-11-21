import request from '@/utils/request'

// 获取-角色列表
export const getRoleList = (params) => {
  return request({
    url: '/sys/role',
    method: 'GET',
    params
  })
}
// 新增-角色
export const addRole = (data) => {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}
// 根据id获取角色详情
export const getRoleDetail = (id) => {
  return request({
    url: `/sys/role/${id}`,
    method: 'GET'
  })
}
// 根据id更新角色
export const editRoleDetail = (data) => {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'PUT',
    data
  })
}
// 根据id删除角色
export const delRole = (id) => {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  })
}
