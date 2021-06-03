import { createStore } from 'vuex';
import count from './count';
import vuexPersist from './vuex-persist';

export const store = createStore({
  modules: {
    count,
  },
  plugins: [vuexPersist],
});
