import api from '@/api'

const user = {
  namespaced: true,
  state: {
    info: {},
    views: []
  },
  getters: {},
  mutations: {
    SET_INFO (state, payload) {
      state.info = payload
    },
    SET_VIEWS (state, payload) {
      state.views = payload
    }
  },
  actions: {
    async login ({ dispatch, state, commit }, payload) {
      await api.user.login(payload)
      dispatch('fetchUserInfo')
    },
    async fetchUserInfo ({ commit }) {
      const res = await api.user.info()
      const view = await api.user.view()
      commit('SET_INFO', res)
      commit('SET_VIEWS', view.data.map(item => item.view_id))
    }
  }
}

export default user
