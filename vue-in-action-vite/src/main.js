import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import element3 from 'element3';
import 'element3/lib/theme-chalk/index.css';
import '/styles/index.scss';

createApp(App).use(router).use(store).use(element3).mount('#app');
