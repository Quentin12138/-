import { login } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: ''
  },
  // 修改state中的变量
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    }
  },
  actions: {
    async fetchLogin(store, form) {
      const res = await login(form)
      store.commit('SET_TOKEN', res.data)
      console.log(res)
    }
  }
}
