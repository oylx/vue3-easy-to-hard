import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import Message from "./components/Message.vue";
import router from "./router/index";
import { store } from './store';

createApp(App)
  .use(router)
  .use(store)
  .component("message", Message)
  .mount("#app");
