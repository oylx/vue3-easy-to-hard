import { COUNT_INC } from './mutation-types';

export default {
  // 命名空间选项: namespaced: true ，这样所有 actions/mutations/getters都将注册在独立的命名空间中
  namespaced: true,
  // 状态 - State
  state() {
    return {
      count: 0,
    };
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
  // Mutations是唯一改变状态的方式
  mutations: {
    inc(state) {
      // 必须是同步的
      state.count++;
    },
    [COUNT_INC](state) {
      state.count++;
    },
    incBy(state, n) {
      state.count += n;
    },
  },
  // 动作 - Actions 动作类似于mutations，它们主要用于:
  // 实现复杂业务逻辑,处理异步操作
  actions: {
    // 解构rootState, rootGetters访问全局状态/派生状态
    inc({ commit, rootState, rootGetters }) {
      console.log(rootState, rootGetters);
      return new Promise(resolve => {
        // context: commit, dispatch, state
        setTimeout(() => {
          commit("inc");
          resolve();
        }, 1000);
      });
    },
  },
}
