import { request } from '~/plugins/request'

/**
 * 获取文章列表
 * @param params
 * @returns {AxiosPromise}
 */
export const getArticles = params =>
  request({
    method: 'GET',
    url: '/api/articles',
    params,
  })

/**
 * 获取你关注的文章列表
 * @param params
 * @returns {AxiosPromise}
 */
export const getFeedArticles = params =>
  request({
    method: 'GET',
    url: '/api/articles/feed',
    params,
    needToken: true,
  })

/**
 * 获取指定文章
 * @param slug 文章唯一标识
 * @returns {AxiosPromise}
 */
export const getSingleArticle = slug =>
  request({
    method: 'GET',
    url: `/api/articles/${slug}`,
  })

/**
 * 点赞操作
 * @param slug 文章唯一标识
 * @param favorited 当前点赞状态
 * @returns {AxiosPromise}
 */
export const favorite = (slug, favorited) =>
  request({
    method: favorited ? 'DELETE' : 'POST',
    url: `/api/articles/${slug}/favorite`,
    needToken: true,
  })

/**
 * 获取评论列表
 * @param slug 文章唯一标识
 * @returns {AxiosPromise}
 */
export const getComments = slug =>
  request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`,
  })

/**
 * 添加comment
 *
 */
export const addComment = (slug, data) =>
  request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    data,
    needToken: true,
  })
