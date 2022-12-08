import {createRouter, createWebHashHistory} from 'vue-router';
import index from '../components/index.vue'
import fc from "../components/games/fc/fc.vue"
import test from "../components/test.vue";
import TDGame from "/src/views/TDGame.vue"

// 1. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
    {path: '/', component: index},
    {path: '/test', component: test},
    {path: '/2', component: fc},
    {path: '/main', component: TDGame},
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

