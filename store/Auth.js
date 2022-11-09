export const state = () => ({
  isAuth: true,
  isAdmin: false,
})

export const getters = {
  isAuth: (state) => state.isAuth,
  isAdmin: (state) => state.isAdmin,
}

export const mutations = {
  toggleAuth(state) {
    state.isAuth = !state.isAuth
  },

  setAuth(state, payload) {
    state.isAuth = payload
  },

  setAdmin(state, payload) {
    state.isAdmin = payload
  },
}

export const actions = {
  toggleAuth({ commit }) {
    commit('toggleAuth')
  },

  setAuthFalse({ commit }) {
    commit('setAuth', false)
  },

  setAuthTrue({ commit }) {
    commit('setAuth', true)
  },

  setAdminFalse({ commit }) {
    commit('setAdmin', false)
  },

  setAdminTrue({ commit }) {
    commit('setAdmin', true)
  },
}
