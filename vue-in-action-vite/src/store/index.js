import { createStore } from 'vuex'
export const store = createStore({
  state() {
    return {
      count: 0
    }
  },
  mutations: {
    inc(state) {
      state.count++
    }
  }
})
