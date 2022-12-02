<template>
  <div>
    <div class="d-flex">
      <v-icon class="mr-3 mb-4" size="35" color="#2c3639"> mdi-car</v-icon>
      <h1>จองใช้งานรถ</h1>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        prepend-icon="mdi-magnify"
        label="ชื่อรถยนต์"
        single-line
        hide-details
        class="mb-4"
        @keydown.enter="searchCar"
      ></v-text-field>
      <v-btn class="my-auto ml-3" text @click="searchCar">ค้นหา</v-btn>
    </div>
    <v-divider></v-divider>

    <v-row class="mt-4">
      <v-col md="4" v-for="(car, index) in cars" :key="index">
        <CarCard :car="car" :refreshData="refreshData" :toggleSnackbar="toggleSnackbar"/>
      </v-col>
    </v-row>

    <v-snackbar v-model="getShow" timeout="2000" color="orange">
      <p class="subtitle-1 my-auto"> {{ getMsg }} </p>
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="getShow = false"
        >
          ปิด
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name : 'bookcar',
  async asyncData( { store, $axios } ) {
    await store.dispatch( 'Auth/setAuthTrue' )
    const { EM_ID } = await store.getters['Auth/getUser']
    const cars = await $axios.$get( `/car/${ EM_ID }/cars` )
    return { cars }
  },

  data() {
    return {
      search : '',
      getShow : false,
      getMsg : '',
    }
  },
  methods : {
    searchCar() {
      if ( this.search ) {
        const cars = this.cars.filter( car => car.C_NAME.includes( this.search ) )
        this.cars = cars
      } else this.refreshData()
    },
    refreshData() {
      this.$axios.$get( '/car/all' ).then( ( res ) => {
        this.cars = res
      } )
    },
    toggleSnackbar( msg ) {
      this.getMsg = msg
      this.getShow = !this.getShow
    },
  },


}
</script>

<style scoped></style>
