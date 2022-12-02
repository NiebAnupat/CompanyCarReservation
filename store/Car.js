export const state = () => ({
  selectedCar: null,
  cars: [],
})

export const getters = {
  getSelectedCar: (state) => state.selectedCar,
  getCars: (state) => state.cars,
  getFavoriteCars: (state) =>
    state.cars.filter((car) => car.isFavorite === true),
}

export const mutations = {
  setSelectedCar(state, car) {
    state.selectedCar = car
  },
  toggleFavorite(state, car) {
    const index = state.cars.findIndex((c) => c.C_ID === car.C_ID)
    state.cars[index].isFavorite = !state.cars[index].isFavorite
  },

  setCar(state, car) {
    const index = state.cars.findIndex((c) => c.id === car.id)
    state.cars[index] = car
  },

  deleteCar(state, carID) {
    const index = state.cars.findIndex((c) => c.id === carID)
    state.cars.splice(index, 1)
  },

  addCar(state, car) {
    state.cars.push(car)
  },

  initCars(state, cars) {
    state.cars = cars
  },
}

export const actions = {
  setSelectedCar({ commit }, car) {
    commit('setSelectedCar', car)
  },
  async toggleFavorite({ commit, rootGetters }, car) {
    const { C_ID } = car
    const { EM_ID } = await rootGetters['Auth/getUser']
    await this.$axios.$put(`/car/favorite/${C_ID}`, { EM_ID })
    commit('toggleFavorite', car)
  },
  updateCar({ commit }, car) {
    commit('setCar', car)
  },
  deleteCar({ commit }, carID) {
    commit('deleteCar', carID)
  },

  async fetchCars({ commit, rootGetters }) {
    const { EM_ID } = await rootGetters['Auth/getUser']
    const cars = await this.$axios.$get('/car/all')
    const favoriteCars = await this.$axios.$get(`car/favoritecar/${EM_ID}`)
    const allCars = await cars.map((car) => {
      const favoriteCar = favoriteCars.find(
        (favoriteCar) => favoriteCar.C_ID === car.C_ID
      )
      if (favoriteCar) car.isFavorite = true
      else car.isFavorite = false
      return car
    })
    commit('initCars', allCars)
  },

  async addCar({ commit }, car) {
    const formData = new FormData()
    formData.append('name', car.name)
    formData.append('description', car.description)

    // evaluate car level
    switch (car.level) {
      case 'พนักงานทั่วไป':
        formData.append('level', 1)
        break
      case 'ผู้จัดการ':
        formData.append('level', 2)
        break
      case 'ผู้บริหาร':
        formData.append('level', 3)
        break
      default:
        formData.append('level', 0)
        break
    }

    // evaluate car images
    if (car.images.length > 0) {
      car.images.forEach((image) => {
        formData.append('images', image)
      })
    }

    const response = await this.$axios.$post('/car', formData)
    commit('addCar', response)
  },
}
