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
        v-for="(item, i) in car.images"
        :key="i"
        :src="typeof item == 'object' ? toImgUrl(item) : item"
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
      <v-spacer></v-spacer>
      <v-btn color="primary" class="ml-auto" text @click="setEditCar(car)">
        แก้ไข</v-btn
      >
      <v-btn color="error" class="ml-auto" text @click="deleteCar(car.id)">
        ลบ</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'AdminCarCard',
  props: {
    car: {
      type: Object,
      required: true,
    },
    setEditCar: {
      type: Function,
      required: true,
    },
    deleteCar: {
      type: Function,
      required: true,
    },
  },
  methods: {
    toImgUrl(img) {
      return URL.createObjectURL(img)
    },
  },
}
</script>
<style lang="scss"></style>
