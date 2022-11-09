<template>
  <div>
    <div class="d-flex">
      <v-icon class="mr-3 mb-2" size="35" color="primary"> mdi-car </v-icon>
      <h1>จัดการข้อมูลรถ</h1>
      <v-spacer></v-spacer>

      <v-btn
        color="#2C3639"
        small
        class="white--text my-auto"
        @click="openAddCarDialog"
      >
        <v-icon>mdi-plus</v-icon>
        เพิ่มรถ
      </v-btn>
    </div>
    <v-divider></v-divider>

    <v-row class="mt-4">
      <v-col md="4" v-for="(car, index) in cars" :key="car.id">
        <AdminCarCard
          :car="car"
          :setEditCar="setEditCar"
          :deleteCar="deleteCar"
        />
      </v-col>
    </v-row>

    <!-- Add Car Dialog -->
    <v-dialog v-model="addCarDialog" max-width="700px" eager>
      <v-card class="pa-3">
        <v-card-title>
          <span class="headline font-weight-bold">เพิ่มรถ</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="newCar.name"
                  label="ชื่อรถ"
                  outlined
                  ref="nameRef"
                  :rules="[(v) => !!v || 'กรุณากรอกชื่อรถ']"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-select
                  :items="carLevel"
                  label="ระดับการเข้าถึง"
                  :menu-props="{ offsetY: true }"
                  ref="levelRef"
                  :rules="[(v) => !!v || 'กรุณาเลือกระดับ']"
                ></v-select>
              </v-col>
            </v-row>
            <v-row class="mt-n5">
              <v-col cols="12">
                <v-textarea
                  v-model="newCar.description"
                  label="รายละเอียด"
                  outlined
                  rows="3"
                  ref="detailRef"
                  :rules="[(v) => !!v || 'กรุณากรอกรายละเอียด']"
                ></v-textarea>
              </v-col>
            </v-row>
            <!-- อัปโหลดรูป -->
            <v-row class="mt-n5">
              <v-col cols="12">
                <v-file-input
                  v-model="newCar.images"
                  label="รูปภาพ"
                  outlined
                  show-size
                  counter
                  multiple
                  small-chips
                  accept="image/png, image/jpeg"
                  ref="imgRef"
                  :rules="[(v) => !!v || 'กรุณาอัปโหลดรูปภาพ']"
                ></v-file-input>
              </v-col>
            </v-row>

            <v-row class="mt-n5">
              <v-col cols="12">
                <v-carousel
                  height="300px"
                  cycle
                  show-arrows-on-hover
                  hide-delimiter-background
                  delimiter-icon="mdi-minus"
                  class="pa-1"
                >
                  <div v-if="imgIsExist()">
                    <v-carousel-item
                      v-for="(image, index) in newCar.images"
                      :key="index"
                      :src="toImgUrl(image)"
                    >
                    </v-carousel-item>
                  </div>
                  <v-carousel-item v-else>
                    <v-row class="grey darken-2 fill-height">
                      <v-col class="d-flex align-center justify-center">
                        <h1 class="display-1 font-weight-bold white--text">
                          ไม่พบรูปภาพ
                        </h1>
                      </v-col>
                    </v-row>
                  </v-carousel-item>
                </v-carousel>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="
              addCarDialog = false
              clearNewCar
            "
          >
            ยกเลิก
          </v-btn>
          <v-btn color="blue darken-1" text @click="addCar"> เพิ่ม </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit Car Dialog -->
    <v-dialog v-model="editCarDialog" max-width="700px" eager>
      <v-card class="pa-3">
        <v-card-title>
          <span class="headline font-weight-bold">แก้ไขรถ</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="editCar.name"
                  label="ชื่อรถ"
                  outlined
                  :rules="[(v) => !!v || 'กรุณากรอกชื่อรถ']"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="editCar.level"
                  :items="carLevel"
                  label="ระดับการเข้าถึง"
                  :menu-props="{ offsetY: true }"
                  :rules="[(v) => !!v || 'กรุณาเลือกระดับ']"
                ></v-select>
              </v-col>
            </v-row>
            <v-row class="mt-n5">
              <v-col cols="12">
                <v-textarea
                  v-model="editCar.description"
                  label="รายละเอียด"
                  outlined
                  rows="3"
                  :rules="[(v) => !!v || 'กรุณากรอกรายละเอียด']"
                ></v-textarea>
              </v-col>
            </v-row>
            <!-- อัปโหลดรูป -->
            <v-row class="mt-n5">
              <v-col cols="12">
                <v-file-input
                  v-model="editCar.images"
                  label="รูปภาพ"
                  outlined
                  show-size
                  counter
                  multiple
                  small-chips
                  accept="image/png, image/jpeg"
                  :rules="[(v) => !!v || 'กรุณาอัปโหลดรูปภาพ']"
                ></v-file-input>
              </v-col>
            </v-row>

            <v-row class="mt-n5">
              <v-col cols="12">
                <v-carousel
                  height="300px"
                  cycle
                  show-arrows-on-hover
                  hide-delimiter-background
                  delimiter-icon="mdi-minus"
                  class="pa-1"
                >
                  <div v-if="editImgIsExist()">
                    <v-carousel-item
                      v-for="(image, index) in editCar.images"
                      :key="index"
                      :src="typeof image == 'object' ? toImgUrl(image) : image"
                    >
                    </v-carousel-item>
                  </div>
                  <v-carousel-item v-else>
                    <v-row class="grey darken-2 fill-height">
                      <v-col class="d-flex align-center justify-center">
                        <h1 class="display-1 font-weight-bold white--text">
                          ไม่พบรูปภาพ
                        </h1>
                      </v-col>
                    </v-row>
                  </v-carousel-item>
                </v-carousel>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="editCarDialog = false">
            ยกเลิก
          </v-btn>
          <v-btn color="blue darken-1" text @click="updateCar()"> แก้ไข </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  async asyncData({ store }) {
    store.dispatch('Auth/setAuthTrue')
    store.dispatch('Auth/setAdminTrue')
    const cars = await store.getters['Car/getCars']
    return { cars }
  },

  data() {
    return {
      addCarDialog: false,
      inputRef: null,
      newCar: {
        name: '',
        description: '',
        images: [],
        level: '',
      },
      carLevel: ['พนักงานทั่วไป', 'ผู้จัดการ', 'ผู้บริหาร'],
      editCarDialog: false,
      editCar: {
        id: '',
        name: '',
        description: '',
        images: [],
        level: '',
      },
    }
  },

  methods: {
    addCar() {
      this.$store.dispatch('Car/addCar', this.newCar)
      this.addCarDialog = false
    },

    deleteCar(id) {
      console.log('delete Car id: ' + id)
      this.$store.dispatch('Car/deleteCar', id)
    },

    setEditCar(car) {
      // console.log(car)
      this.editCar = {
        id: car.id,
        name: car.name,
        description: car.description,
        images: car.images,
        level: car.level,
      }
      this.editCarDialog = true
    },

    updateCar() {
      this.$store.dispatch('Car/updateCar', this.editCar)
      this.editCarDialog = false
    },

    openAddCarDialog() {
      this.$refs.nameRef.reset()
      this.$refs.levelRef.reset()
      this.$refs.detailRef.reset()
      this.$refs.imgRef.reset()
      this.addCarDialog = true
    },

    imgIsExist() {
      return this.newCar.images.length > 0 ? true : false
    },

    editImgIsExist() {
      return this.editCar.images.length > 0 ? true : false
    },

    toImgUrl(img) {
      return URL.createObjectURL(img)
    },
  },
}
</script>
<style lang="scss"></style>
