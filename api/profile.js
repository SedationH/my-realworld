import { request } from '~/plugins/request'

/**
 * 关注作者
 * @param username 用户名
 * @param following 关注状态
 * @returns {*}
 */
export const follow = (username, following) =>
  request({
    method: following ? 'DELETE' : 'POST',
    url: `/api/profiles/${username}/follow`,
    needToken: true,
  })

/**
 * 获得当前用户信息
 * @param username 用户名
 */
export const getProfile = username =>
  request({
    method: 'GET',
    url: `/api/profiles/${username}`,
  })
