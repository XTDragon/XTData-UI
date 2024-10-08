import {createRouter, createWebHashHistory} from 'vue-router';
import TDGame from "../views/TDGame.vue";
import GameList from "../views/GameList.vue";
import TData from "../views/TData.vue";
import BlogContent from "../views/BlogContent.vue";
import test from "../views/test.vue";
import Login from "../views/Login.vue";
import Manage from "../views/Manage/Manage.vue";
import UserManage from "../views/Manage/UserManage/UserManage.vue";
import BlogManage from "../views/Manage/BlogManage/BlogManage.vue";
import VideoPlayer from "../components/Video/VideoPlayer.vue";
// 1. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
    {
        path: '/',
        component: TData,
    },
    {
        path: '/main',
        component: TData,

    },
    {
        path: '/GameList',
        component: GameList
    },
    {
        path: '/Manage',
        component: Manage,
        children: [
            {
                path: '/UserManage',
                component: UserManage
            },
            {
                path: '/BlogManage',
                component: BlogManage
            },
        ]
    },
    {
        path: '/Game',
        component: TDGame
    },
    {
        path: '/Login',
        component: Login
    },
    {
        path: '/blog/:blogid',
        component: BlogContent
    },
    {
        path: '/test',
        name: 'test',
        component: test
    },
    {
        path: '/test2',
        name: 'test2',
        component: VideoPlayer
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/404'
    }
]

// 2. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
// @ts-ignore
export const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes: routes, // `routes: routes` 的缩写
})

