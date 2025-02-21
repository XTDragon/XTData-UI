// router/index.js
// 定义静态路由
const staticRoutes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录页面',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  }
]

// 定义登录页面名称（为了方便理解才定义的）
const LOGIN_PAGE_NAME = 'login'
