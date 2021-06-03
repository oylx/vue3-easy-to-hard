import { createStore } from 'vuex';
import { COUNT_INC } from './mutation-types';

export const store = createStore({
  // 状态 - State
  state() {
    return {
      count: 0,
    };
  },
  // Mutations是唯一改变状态的方式
  mutations: {
    inc(state) {
      state.count++;
    },
    incBy(state, n) {
      state.count += n;
    },
    incBy1(state, payload) {
      state.count += payload.num;
    },
    // 利用计算属性定义type
    [COUNT_INC](state) {},
  },
  // 派生状态 - Getters
  getters: {
    // 方式1:Property-Style，最简单常用的方式
    doubleCount(state) {
      return state.count * 2;
    },
    // 方式2:Method-Style，可以传参的方式
    nCount(state) {
      return (n) => {
        return state.count * n;
      };
    },
  },
  // 动作 - Actions 动作类似于mutations，它们主要用于:
  // 实现复杂业务逻辑,处理异步操作
  actions: {
    inc({ commit, dispatch, getters, }) {
      setTimeout(() => {
        commit('inc');
      }, 1000);
    },
  },
});
