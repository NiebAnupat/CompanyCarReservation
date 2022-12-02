<template>
  <v-card>
    <v-carousel
      height="200px"
      cycle
      show-arrows-on-hover
      hide-delimiter-background
      delimiter-icon="mdi-minus"
    >
      <v-carousel-item
        v-for="(item, i) in car.car_img"
        :key="i"
        :src="convertBlobToURL(item.IMG_FILE)"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>
    <v-card-title>
      <div>
        <div class="headline">{{ car.C_NAME }}</div>
        <div class="subtitle-1 mt-1">{{ car.C_DESCRIPTION }}</div>
      </div>
    </v-card-title>
    <v-card-actions>
      <!-- รายการโปรด -->
      <v-btn
        icon
        @click="toggleFavorite(car.C_ID)"
        :color="car.favorite.length > 0 ? 'red' : 'grey'"
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
    refreshData: {
      type: Function,
      required: true,
    },
  },
  methods: {
    async booking() {
      await localStorage.setItem( 'car', JSON.stringify( this.car ) )
      await this.$router.push( '/user/bookcar/detail' )
    },
    async toggleFavorite(C_ID) {
      const EM_ID = this.$store.getters['Auth/getUser'].EM_ID
      await this.$axios.$put(`/car/favorite/${C_ID}`, { EM_ID })
      this.refreshData()
    },

    convertBlobToURL(blob) {
      return (
        'data:image/jpeg;base64,' +
        new Buffer(
          new Uint8Array(blob.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          ),
          'binary'
        ).toString('base64')
      )
    },
  },
}
</script>
<style lang="scss"></style>
