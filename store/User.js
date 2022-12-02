export const state = () => ({
  user: {
    EM_ID: 1,
    EM_ID_CARD: null,
    EM_NAME: null,
    EM_ADDRESS: null,
    EM_GENDER: null,
    EM_TEL: null,
    EM_BIRTHDAY: null,
    DP_ID: null,
    P_ID: null,
    EM_SALARY: null,
    EM_HIRE_DATE: null,
    EM_IS_ACTIVE: null,
    EM_FINE: null,
  },
})

export const getters = {
  user: (state) => state.user,
  fine: (state) => state.user.EM_FINE,
}

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
}

export const actions = {
  async getUser({ commit }, emId) {
    const { data } = await this.$axios.$get('/employee', {
      body: { emId: emId },
    })
    commit('setUser', data)
  },

  async authUser({ commit }, emId, cardId) {
    const { isAuth } = await this.$axios.$get('/employee/login', {
      body: {
        emId: emId,
        cardId: cardId,
      },
    })

    if (isAuth) {
      const { data } = await this.$axios.$get('/employee', {
        body: { emId: emId },
      })
      commit('setUser', data)
    }
  },
}
