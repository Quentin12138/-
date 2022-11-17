import request from '@/utils/request'

export const getDepartmentList = () => {
  return request({
    url: '/company/department',
    mtthod: 'get'
  })
}
