import { createApp } from 'vue';
import App from './App.vue';
import ant from 'ant-design-vue'
import './styles/index.less';
import 'ant-design-vue/dist/reset.css';
createApp(App).use(ant).mount('#app');
