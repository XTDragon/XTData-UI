import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers';
import transform from 'babel-plugin-transform-remove-strict-mode'
import alias from "@rollup/plugin-alias";
// https://vitejs.dev/config/

export default defineConfig({
    // build:{
    //     assetsInlineLimit:0
    // },
    assetsInclude: ['**/*.nes'],
    plugins: [
        transform(),
        vue(),
        AutoImport({ /* options */
            imports: [
                'vue',
                'vue-router',
                {
                    /* 自定义模块 */
                    api: [['default', 'api']],
                    hooks: [['default', 'hooks']],
                    store: [['default', 'store']]
                }
            ],
            dts: 'src/auto-import.d.ts',
        }),

        Components({
            resolvers: [AntDesignVueResolver()],
            // dirs 指定组件所在位置，默认为 src/components
            // 可以让我们使用自己定义组件的时候免去 import 的麻烦
            dirs: ['src/components/'],
            // 配置需要将哪些后缀类型的文件进行自动按需引入，'vue'为默认值
            extensions: ['vue'],
            // 解析组件，这里以 Element Plus 为例
            // 生成components.d.ts
            dts: true,
            // 遍历子目录
            deep: true
        }),
    ],
    // resolve:{
    //     alias: {
    //         "/@": path.resolve(__dirname, "./src"),
    //     },
    // },
    server: {
        port: 3000,
        open: false, //自动打开
        base: "./ ", //生产环境路径
        proxy: { // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
            // 正则表达式写法
            '^/api': {
                target: 'http://localhost:9090/', // 后端服务实际地址
                changeOrigin: true, //开启代理
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }


})
