## 规划

按照流程记录一些值得注意的点



## 静态文件 template 导入 路由配置

https://www.jsdelivr.com/ cdn资源加速

app.html 使用其他资源

layouts 中进行布局设置

**Routing Guidelines**

- Home page (URL: /#/ )
  - List of tags
  - List of articles pulled from either Feed, Global, or by Tag
  - Pagination for list of articles
- Sign in/Sign up pages (URL: /#/login, /#/register )
  - Uses JWT (store the token in localStorage)
  - Authentication can be easily switched to session/cookie based
- Settings page (URL: /#/settings )
- Editor page to create/edit articles (URL: /#/editor, /#/editor/article-slug-here )
- Article page (URL: /#/article/article-slug-here )
  - Delete article button (only shown to article's author)
  - Render markdown from server client side
  - Comments section at bottom of page
  - Delete comment button (only shown to comment's author)
- Profile page (URL: /#/profile/:username, /#/profile/:username/favorites )
  - Show basic user info
  - List of articles populated from author's created articles or author's favorited articles

```zsh
$ tree pages 
pages
├── article
│   └── _article
│       └── index.vue
├── editor
│   └── _article.vue
├── index.vue
├── login.vue
├── profile
│   └── _username
│       ├── favorites.vue
│       └── index.vue
└── settings.vue
```

对于路由生成文件参考[router](.nuxt/router.js) 好吧 忽略上传了 本地可见 这里列一下

```js
routes: [
  {
    path: '/login',
    component: _6b477114,
    name: 'login',
  },
  {
    path: '/settings',
    component: _72b4ecc8,
    name: 'settings',
  },
  {
    path: '/article/:article',
    component: _0502d6d0,
    name: 'article-article',
  },
  {
    path: '/editor/:article?',
    component: _0f9a8c04,
    name: 'editor-article',
  },
  {
    path: '/profile/:username',
    component: _79a4a67d,
    name: 'profile-username',
  },
  {
    path: '/profile/:username?/favorites',
    component: _0f9747fc,
    name: 'profile-username-favorites',
  },
  {
    path: '/',
    component: _bcc06406,
    name: 'index',
  },
  {
    path: '/register',
    component: _016b5c7c,
    name: 'register',
  },
],
```

[路由配置参考](https://nuxtjs.org/docs/2.x/features/file-system-routing) 注意文件和文件夹名不能有 `-` 必须和非必须的路径 注意区分配置情况

特殊路由处理

```js
router: {
  extendRoutes(routes, resolve) {
    routes.push({
      name: 'register',
      path: '/register',
      component: resolve(__dirname, 'pages/login'),
    })
  },
},
```

