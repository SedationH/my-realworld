import { request } from '~/utils/index'

export const getArticles = params =>
  request({
    method: 'GET',
    url: '/api/articles',
    params,
  })


