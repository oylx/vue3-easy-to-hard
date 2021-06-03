import { createStore } from 'vuex';
import count from './modules/count';
import vuexPersist from './plugins/vuex-persist';

export const store = createStore({
  modules: {
    count,
  },
  // plugins: [vuexPersist],
});
