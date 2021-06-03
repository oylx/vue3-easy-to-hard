import { createApp } from 'vue';
import App from './App.vue';
import '/styles/index.scss';
import Message from './components/Message.vue';
import router from './router/index';
import { store } from './store';
import element3 from 'element3';
import 'element3/lib/theme-chalk/index.css';

createApp(App)
  .use(router)
  .use(store)
  .use(element3)
  .component('message', Message)
  .mount('#app');
