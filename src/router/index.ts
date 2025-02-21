import {createRouter, createWebHashHistory} from 'vue-router';
import TDGame from "../views/TDGame.vue";
import GameList from "../views/GameList.vue";
import TData from "../views/TData.vue";
import BlogContent from "../views/BlogContent.vue";
import VideoList from "../views/VideoList.vue";
import Login from "../views/Login.vue";
import Manage from "../views/Manage/Manage.vue";
import UserManage from "../views/Manage/UserManage/UserManage.vue";
import BlogManage from "../views/Manage/BlogManage/BlogManage.vue";
import Test from "../views/test.vue";
import VideoPlayer from '@/components/Video/VideoPlayer.vue';
import { getToken } from '@/utils/auth';
import { UserStore } from '@/store/userStore';


// 1. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [

    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        component: () => import ('@/views/Login.vue')
    }
]



const Whitelist = ['/', '/login', '/error', '/404']

// 2. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
// @ts-ignore
export const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes: routes, // `routes: routes` 的缩写
})

const LOGIN_PAGE_NAME = '/login'



// 定义全局前置守卫（里面有两个坑要注意）
router.beforeEach((to, from, next) => {


    // 通过自定义方法获取用户 token 用来判断用户登录状态
    const token = getToken("satoken")
    const userstore=UserStore();
    if (Whitelist.indexOf(to.path) == -1){
        if (!token && to.path !== LOGIN_PAGE_NAME) {
            console.log(to.path)
          // 如果没有登录而且前往的页面不是登录页面，跳转到登录页
        } else if (!token && to.name === LOGIN_PAGE_NAME) {
          // 如果没有登录而且前往的页面是登录页面，跳转到登录页面
          // 这里有一个坑，一定要注意这一步和上一步得分开写
          // 如果把前两步判断合并为 if (!token) next({ name:login })
          // 则会形成登录页面无限刷新的错误，具体成因后面解释
          next()
        } else {
          // 如果登录了
          if (!userstore.user?.router) {
            // 如果没有获取路由信息，先获取路由信息而后跳转
            userstore.getRouter().then(() => {
                console.log(userstore);
              // 这里也是一个坑，不能使用简单的 next()
              // 如果直接使用 next() 刷新后会一直白屏
              next({ ...to, replace: true })
            })
          } else {
            // 如果已经获取路由信息，直接跳转
            next()
          }
        }
    } else {
        /*当前路由在白名单里面，直接放行*/
        next()
    }

  })

