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
      <v-spacer></v-spacer>
      <v-btn color="primary" class="ml-auto" text @click="setEditCar(car)">
        แก้ไข</v-btn
      >
      <v-btn color="error" class="ml-auto" text @click="deleteCar(car.C_ID)">
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
