<template>
  <div>
    <div class="d-flex">
      <v-icon class="mr-3 mb-4" size="35" color="#2c3639"> mdi-car </v-icon>
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
      ></v-text-field>
      <v-btn class="my-auto ml-3" text v-on:click="searchCar">ค้นหา</v-btn>
    </div>
    <v-divider></v-divider>

    <v-row class="mt-4">
      <v-col md="4" v-for="(car, index) in cars" :key="car.id">
        <CarCard :car="car" :refreshData="refreshData" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'bookcar',
  async asyncData({ store, $axios }) {
    await store.dispatch( 'Auth/setAuthTrue' )
    const cars = await $axios.$get('/car/all')
    return { cars }
  },

  data() {
    return {
      search: '',
    }
  },
  methods: {
    searchCar() {
      console.log('search')
    },
    refreshData() {
      this.$axios.$get('/car/all').then((res) => {
        this.cars = res
      })
    },
  },
}
</script>

<style scoped></style>
