import { request } from '~/utils/index'

/**
 * 登录
 * @param data
 * @return {AxiosPromise}
 */

export const login = data => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data,
  })
}
