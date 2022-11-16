import request from '@/utils/request'

// 登录函数
/**
 * @description: 登录接口
 * @param {*} data.mobile 手机号
 * @param {*} data.password 密码
 * @return {*} promise
 */
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
// 获取用户基本信息
export function getProfile() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}
// 获取用户基本信息
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'GET'
  })
}
