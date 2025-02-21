import {createApp} from 'vue'
import App from './App.vue'
import {router} from './router/index';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './tailwind.css'
import { setupCalendar } from 'v-calendar';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'


const pinia = createPinia()

const app = createApp(App);

app.use(ElementPlus);
app.use(router);
app.use(Antd);
app.use(pinia);
app.use(setupCalendar, {})

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app');
