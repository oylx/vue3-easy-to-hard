import { createApp } from 'vue';
import App from './App.vue';
import '/styles/index.scss';
import router from './router/index';
import { store } from './store';
import element3 from 'element3';
import 'element3/lib/theme-chalk/index.css';

createApp(App)
  .use(router)
  .use(store)
  .use(element3)
  .mount('#app');
