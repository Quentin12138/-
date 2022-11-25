import request from '@/utils/request'
export const getSimpliList = () => {
  return request({
    url: '/sys/user/simple',
    method: 'GET'
  })
}

// 获取员工列表
export const getEmployeeList = (params) => {
  return request({
    url: '/sys/user',
    method: 'GET',
    params
  })
}

// 新增员工
export const addEmployee = (data) => {
  return request({
    url: '/sys/user',
    method: 'POST',
    data
  })
}
// 删除员工
export const delEmployee = (id) => {
  return request({
    url: `/sys/user/${id}`,
    method: 'DELETE'
  })
}

// 批量导入员工
export const batch = (data) => {
  return request({
    url: `/sys/user/batch`,
    method: 'POST',
    data
  })
}

// 删除员工
export const getUserdetailByid = (id) => {
  return request({
    url: `/sys/user/${id}`,
    method: 'GET'
  })
}
