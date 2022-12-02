export const state = () => ({
  list: [],
  selected: null,
  loading: false,
})

export const getters = {
  list: (state) => state.list,
  selected: (state) => state.selected,
  loading: (state) => state.loading,
}

export const mutations = {
  setList(state, payload) {
    state.list = payload
  },

  setSelected(state, payload) {
    state.selected = payload
  },

  setLoading(state, payload) {
    state.loading = payload
  },
}

export const actions = {
  async getList({ commit }) {
    commit('setLoading', true)
    const { data } = await this.$axios.get('/reservations')
    commit('setList', data)
    commit('setLoading', false)
  },
  async getSelected({ commit }, id) {
    commit('setLoading', true)
    const { data } = await this.$axios.get(`/reservations/${id}`)
    commit('setSelected', data)
    commit('setLoading', false)
  },

  async setSelected({ commit }, reservation) {
    console.log(reservation)
    commit('setSelected', reservation)
  },
  async create({ commit }, payload) {
    commit('setLoading', true)
    this.$axios
      .post('/reservation', payload)
      .then((result) => {
        if (result.status === 200) {
          this.$router.push('/user')
          commit('setLoading', false)
        } else {
          this.$router.push('/error')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async update({ commit }, payload) {
    commit('setLoading', true)
    await this.$axios.put(`/reservation/${payload.id}`, payload)
    commit('setLoading', false)
  },
  async delete({ commit }, id) {
    commit('setLoading', true)
    await this.$axios.delete(`/reservations/${id}`)
    commit('setLoading', false)
  },
}
