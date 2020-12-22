import { request } from '~/plugins/request'

/**
 * 登录
 * @param data
 * @return {AxiosPromise}
 */
export const login = data =>
  request({
    method: 'POST',
    url: '/api/users/login',
    data,
  })

/**
 * 注册
 * @param data
 * @return {AxiosPromise}
 */
export const register = data =>
  request({
    method: 'POST',
    url: '/api/users',
    data,
  })

/**
 * 更改用户信息
 * @param data
 * @returns {AxiosPromise}
 */
export const updateUser = data =>
  request({
    method: 'PUT',
    url: '/api/user',
    data,
  })
