import { createStore } from 'vuex';

export const store = createStore({
  state() {
    return {
      count: 0,
    };
  },
  mutations: {
    inc(state) {
      state.count++;
    },
  },
  getters: {
    // 方式1:Property-Style，最简单常用的方式
    doubleCount(state) {
      return state.count * 2;
    }, // 方式2:Method-Style，可以传参的方式
    nCount(state) {
      return (n) => {
        return state.count * n;
      };
    },
  },
});
