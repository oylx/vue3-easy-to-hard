export default {
  namespaced: true,
  getters: {
    // 参数3/4用于访问全局状态/派生状态
    someGetter(state, getters, rootState, rootGetters) {
      rootState.foo; // 根状态'foo'
      rootState['bar/foo']; // bar模块状态'foo'
    },
  },
  actions: {
    // 解构rootState, rootGetters访问全局状态/派生状态
    someAction({ dispatch, commit, getters, rootState, rootGetters, }) {
      rootState.foo; // 根状态'foo'
      rootState['bar/foo']; // bar模块状态'foo'
      // 派发全局注册的action
      dispatch('someOtherAction', null, { root: true });
      // 派发bar模块中的action
      dispatch('bar/someOtherAction', null, { root: true });
      // 提交全局注册的mutation
      commit('someMutation', null, { root: true });
      // 提交bar模块中的mutation
      commit('bar/someMutation', null, { root: true });
    },
  },
};
