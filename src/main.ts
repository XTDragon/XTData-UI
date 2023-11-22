import {createApp} from 'vue'
import App from './App.vue'
import {router} from './router/index';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createPinia } from 'pinia'
import './tailwind.css'
import { setupCalendar } from 'v-calendar';

const app = createApp(App);
app.use(ElementPlus)
app.use(router);
app.use(Antd);
app.use(createPinia())
app.use(setupCalendar, {})

app.mount('#app');

