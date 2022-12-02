<template>
  <div>
    <div class="d-flex">
      <v-icon class="mr-3 mb-2" size="35" color="primary"> mdi-car</v-icon>
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
      <v-col md="4" v-for="(car, index) in cars" :key="car.C_ID">
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
                  v-model="newCar.C_NAME"
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
                  v-model="newCar.C_DESCRIPTION"
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
                  v-model="newCar.car_img"
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
                      v-for="(image, index) in newCar.car_img"
                      :key="index"
                      :src="getImg(image)"
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
            "
          >
            ยกเลิก
          </v-btn>
          <v-btn color="blue darken-1" text @click="addCar"> เพิ่ม</v-btn>
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
                  v-model="editCar.C_NAME"
                  label="ชื่อรถ"
                  outlined
                  :rules="[(v) => !!v || 'กรุณากรอกชื่อรถ']"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="editCar.C_LEVEL"
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
                  v-model="editCar.C_DESCRIPTION"
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
                  v-model="editCar.car_img"
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
                      v-for="(image, index) in editCar.car_img"
                      :key="index"
                      :src="getImg(image)"
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
          <v-btn color="blue darken-1" text @click="updateCar"> แก้ไข</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  async asyncData( { store,$axios } ) {
    await store.dispatch( 'Auth/setAuthTrue' )
    await store.dispatch( 'Auth/setAdminTrue' )
    const cars = await $axios.$get('/car/all')
    return { cars }
  },

  data() {
    return {
      addCarDialog : false,
      inputRef : null,
      newCar : {
        C_NAME : '',
        C_DESCRIPTION : '',
        car_img : [],
        C_LEVEL : '',
      },
      carLevel : ['พนักงานทั่วไป', 'ผู้จัดการ', 'ผู้บริหาร'],
      editCarDialog : false,
      editCar : {
        C_ID : '',
        C_NAME : '',
        C_DESCRIPTION : '',
        car_img : [],
        C_LEVEL : '',
      },
    }
  },

  methods : {
    async addCar() {
      var formData = new FormData()
      formData.append( 'C_NAME', this.newCar.C_NAME )
      formData.append( 'C_DESCRIPTION', this.newCar.C_DESCRIPTION )
      formData.append( 'C_LEVEL', this.getCarLevelAsInt( this.newCar.C_LEVEL ) )
      this.newCar.car_img.forEach( ( file ) => {
        formData.append( 'car_img', file )
      } )
      await this.$axios.$post( '/car/', formData )
      this.addCarDialog = false
      this.refreshData()
    },

    async deleteCar( id ) {
      await this.$axios.$delete( '/car/' + id )
      this.refreshData()
    },

    setEditCar( car ) {
       this.editCar = {
        C_ID : car.C_ID,
        C_NAME : car.C_NAME,
        C_DESCRIPTION : car.C_DESCRIPTION,
        car_img : car.car_img,
        C_LEVEL : this.getCarLevelAsString( car.C_LEVEL ),
      }
      this.editCarDialog = true
    },

    async updateCar() {
      var formData = new FormData()
      formData.append( 'C_ID', this.editCar.C_ID )
      formData.append( 'C_NAME', this.editCar.C_NAME )
      formData.append( 'C_DESCRIPTION', this.editCar.C_DESCRIPTION )
      formData.append( 'C_LEVEL', this.getCarLevelAsInt( this.editCar.C_LEVEL ) )
      this.editCar.car_img.forEach( ( img ) => {
        formData.append( 'car_img', img )
      } )
      await this.$axios.put( '/car/edit', formData )
      this.editCarDialog = false
      this.refreshData()
    },

    openAddCarDialog() {
      this.$refs.nameRef.reset()
      this.$refs.levelRef.reset()
      this.$refs.detailRef.reset()
      this.$refs.imgRef.reset()
      this.addCarDialog = true
    },

    imgIsExist() {
      return this.newCar.car_img.length > 0 ? true : false
    },

    editImgIsExist() {
      return this.editCar.car_img.length > 0 ? true : false
    },

    toImgUrl( img ) {
      return URL.createObjectURL( img )
    },

    getImg(img){
      // check object is file
      if(img instanceof File){
        return this.toImgUrl(img)}
      else{
        return this.convertBlobToURL(img.IMG_FILE)
      }

    },

    getCarLevelAsString( level ) {
     switch ( level ) {
       case 1:
         return 'พนักงานทั่วไป'
       case 2:
         return 'ผู้จัดการ'
       case 3:
         return 'ผู้บริหาร'
       default:
         return 'พนักงานทั่วไป'
     }
    },

    getCarLevelAsInt( level ) {
      switch ( level ) {
        case 'พนักงานทั่วไป':
          return 1
        case 'ผู้จัดการ':
          return 2
        case 'ผู้บริหาร':
          return 3
        default:
          return 1
      }
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

    refreshData() {
      this.$axios.$get('/car/all').then((res) => {
        this.cars = res
      })
    },
  },
}
</script>
<style lang="scss"></style>
