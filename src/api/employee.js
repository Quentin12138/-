import request from '@/utils/request'
export const getSimpliList = () => {
  return request({
    url: '/sys/user/simple',
    method: 'GET'
  })
}
