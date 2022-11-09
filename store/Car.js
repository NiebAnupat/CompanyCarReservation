export const state = () => ({
  selectedCar: null,
  cars: [
    {
      id: 1,
      name: 'Audi A4',
      images: [
        'https://img.khaorot.com/crop/640x362/2021/03/11/5Cq7JfHF/730-dbfa.jpeg',
        'http://www.headlightmag.com/hlmwp/wp-content/uploads/2020/08/A195681_medium.jpg',
      ],
      description: 'Audi A4 is a great car',
      isFavorite: true,
      level: 'พนักงานทั่วไป',
    },
    {
      id: 2,
      name: 'BMW 3 Series',
      images: [
        'https://s359.kapook.com/pagebuilder/1c9b001c-d011-4ed5-90c9-3ae2adb327b7.jpg',
        'https://www.9carthai.com/wp-content/uploads/2022/05/2023-BMW-3-Series-01.jpeg',
      ],
      description: 'BMW 3 Series is a great car',
      isFavorite: false,
      level: 'พนักงานทั่วไป',
    },
    {
      id: 3,
      name: 'Mercedes-Benz C-Class',
      images: [
        'https://www.headlightmag.com/hlmwp/wp-content/uploads/2022/01/21C0053_003.jpg',
        'https://pbs.twimg.com/media/FSTXdsAUYAIJ9q9?format=jpg&name=900x900',
        'https://www.mercedes-benz.co.th/th/passengercars/mercedes-benz-cars/models/c-class/coupe-c205/design/equipment-lines/_jcr_content/swipeableteaserbox/par/swipeableteaser/asset.MQ6.12.20190625095400.jpeg',
      ],
      description: 'Mercedes-Benz C-Class is a great car',
      isFavorite: true,
      level: 'ผู้บริหาร',
    },
    {
      id: 4,
      name: 'Volvo S60',
      images: [
        'https://www.volvocars.com/images/v/-/media/market-assets/thailand/applications/dotcom/images/pdp/my21/s60-hybrid/imagewithtestdrives60alt-text--volvos60recharge.jpg?h=1920&iar=0&w=2560',
        'http://www.headlightmag.com/hlmwp/wp-content/uploads/2020/01/230845_New_Volvo_S60_R-Design_exterior.jpg',
      ],
      description: 'Volvo S60 is a great car',
      isFavorite: false,
      level: 'ผู้จัดการ',
    },
    {
      id: 5,
      name: 'Volvo V60',
      images: [
        'https://imgcdn.zigwheels.co.th/medium/gallery/exterior/39/401/volvo-v60-16038.jpg',
      ],
      description: 'Volvo V60 is a great car',
      isFavorite: false,
      level: 'ผู้บริหาร',
    },
  ],
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
    const index = state.cars.findIndex((c) => c.id === car.id)
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
}

export const actions = {
  setSelectedCar({ commit }, car) {
    commit('setSelectedCar', car)
  },
  toggleFavorite({ commit }, car) {
    commit('toggleFavorite', car)
  },
  updateCar({ commit }, car) {
    commit('setCar', car)
  },
  deleteCar({ commit }, carID) {
    commit('deleteCar', carID)
  },
}
