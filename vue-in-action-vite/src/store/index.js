import { createStore } from 'vuex';
import count  from './count';

export const store = createStore({
  modules: {
    count,
  }
});
