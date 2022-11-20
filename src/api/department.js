import request from '@/utils/request'

// 获取-部门列表
export const getDepartmentList = () => {
  return request({
    url: '/company/department',
    mtthod: 'GTE'
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
// 新增部门
export const delDepartment = (id) => {
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}
