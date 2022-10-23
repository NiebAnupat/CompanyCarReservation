//@collapse
export const state = () => ({
  history: [
    {
      date: '12/12/2020',
      time: '09:30',
      returnDate: '1/1/2021',
      returnTime: '10:30',
      returnedDate: '-',
      returnedTime: '-',
      car: 'Mercedes-Benz C-Class',
      status: 'รออนุมัติ',
      reason: 'เพื่อทดสอบ',
      note: 'ไม่มี',
      fine: '0' + ' ฿',
    },
    {
      date: '12/12/2020',
      time: '09:30',
      returnDate: '1/1/2021',
      returnTime: '10:30',
      returnedDate: '-',
      returnedTime: '-',
      car: 'Audi A4',
      status: 'ไม่อนุมัติ',
      reason: 'เพื่อทดสอบ',
      note: 'ไม่อนุมัติเพราะไม่มีรถ',
      fine: '0' + ' ฿',
    },
    {
      date: '12/12/2020',
      time: '09:30',
      returnDate: '1/1/2021',
      returnTime: '10:30',
      returnedDate: '1/1/2021',
      returnedTime: '10:30',
      car: 'BMW 3 Series',
      status: 'อนุมัติ',
      reason: 'เพื่อทดสอบ',
      note: 'อนุมัติเพราะมีรถ',
      fine: '0' + ' ฿',
    },
  ],
})

export const getters = {
  getHistory: (state) => state.history,
}

export const mutations = {
  addHistory(state, payload) {
    state.history.push(payload)
  },
}

export const actions = {
  ADD_HISTORY({ commit }, payload) {
    commit('addHistory', payload)
  },
}
