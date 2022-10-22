export const state = () => ({
  drawer: false,
})

export const mutations = {
  toggleDrawer(state) {
    state.drawer = !state.drawer
  },

  setDrawer(state, payload) {
    state.drawer = payload
  },
}

export const actions = {
  toggleDrawer({ commit }) {
    commit('toggleDrawer')
  },

  setDrawerVisible({ commit }) {
    commit('setDrawer', true)
  },

  setDrawerHidden({ commit }) {
    commit('setDrawer', false)
  },
}

export const getters = {
  drawer: (state) => state.drawer,
}
