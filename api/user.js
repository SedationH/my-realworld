import { request } from '~/utils/index'

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

