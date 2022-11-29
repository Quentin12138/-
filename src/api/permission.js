import request from '@/utils/request'

// 获取权限点列表
export const getPermissionList = () => {
  return request({
    url: '/sys/permission',
    method: 'GET'
  })
}
// 添加权限点列表
export const addPermission = (data) => {
  return request({
    url: '/sys/permission',
    method: 'POST',
    data
  })
}
// 根据id获取权限点详情
export const getPermissionDetail = (id) => {
  return request({
    url: `/sys/permission/${id}`,
    method: 'GET'
  })
}

// 根据id更新权限点详情
export const updatePermission = (data) => {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'PUT',
    data
  })
}
// 根据id删除权限点详情
export const delPermission = (id) => {
  return request({
    url: `/sys/permission/${id}`,
    method: 'DELETE'
  })
}
