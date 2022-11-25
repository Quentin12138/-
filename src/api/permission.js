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
