import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import * as path from "path";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss"

export default defineConfig({
    define: {
        // enable hydration mismatch details in production build
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
    },
    resolve:{
        alias:{
            "~":path.resolve(__dirname,"./src"),
            '@':path.resolve(__dirname,"./src"),
        }
    },
    css: {
        // requireModuleExtension: true,
        postcss: {
            plugins: [
                tailwindcss,
                autoprefixer,
            ]
        }
    },
    plugins: [
        vue(),
        AutoImport({ /* options */
            resolvers: [ElementPlusResolver()],
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
            resolvers: [
                ElementPlusResolver(),
            ],

        }),
    ],
    server: {
        port: 3000,
        open: false, //自动打开
        base: "./ ", //生产环境路径
        proxy: { // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
            // 正则表达式写法
            '^/api': {
                target: 'http://127.0.0.1:9098', // 后端服务实际地址
                changeOrigin: true, //开启代理
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
})
