import request from '@/utils/request'

// 获取-部门列表
export const getDepartmentList = () => {
  return request({
    url: '/company/department',
    method: 'GET'
  })
}
// 新增部门
export const addDepartment = (data) => {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}
// 删除部门
export const delDepartment = (id) => {
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}
// 获取部门
export const getDepartment = (id) => {
  return request({
    url: `/company/department/${id}`,
    method: 'GET'
  })
}
// 获取部门
export const editDepartment = (data) => {
  return request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data
  })
}
