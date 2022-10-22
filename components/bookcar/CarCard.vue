<template>
  <v-card>
    <v-carousel height="200px">
      <v-carousel-item
        v-for="(item, i) in car.image"
        :key="i"
        :src="item"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>
    <v-card-title>
      <div>
        <div class="headline">{{ car.name }}</div>
        <div class="subtitle-1 mt-1">{{ car.description }}</div>
      </div>
    </v-card-title>
    <v-card-actions>
      <!-- รายการโปรด -->
      <v-btn
        icon
        @click="toggleFavorite"
        :color="car.isFavorite ? 'red' : 'grey'"
      >
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" class="ml-auto" text @click="booking()">จอง</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'CarCard',
  props: {
    car: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async booking() {
      await this.$store.dispatch('Car/setSelectedCar', this.car)
      this.$router.push('/user/bookcar/detail')
    },
    async toggleFavorite() {
      await this.$store.dispatch('Car/toggleFavorite', this.car)
      console.log(this.$store.getters['Car/getCars'])
    },
  },
}
</script>
<style lang="scss"></style>
