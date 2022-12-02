<template>
  <v-card id="returnCar" elevation="3" class="rounded-xl pa-10">
    <v-card-title class="black--text ml-3">
      <v-icon class="mr-2 ml-n2" color="blue" size="30">
        mdi-car-arrow-right
      </v-icon>
      <h3 class="my-auto">คืนรถ</h3>
      <p class="my-auto ml-3 subtitle-2 text--secondary">(รายการจองล่าสุด)</p>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="4">
          <v-text-field
            label="รหัสการจอง"
            :value="last.R_ID"
            outlined
            readonly
            disabled
            hide-details
          >
          </v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            label="ชื่อรถ"
            :value="last.car.C_NAME"
            outlined
            readonly
            disabled
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            label="วันที่ยืม"
            :value="formatDate(last.R_TIME_BOOK)"
            outlined
            readonly
            disabled
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-text-field
            v-model="returnCarForm.returnDate"
            label="วันที่คืนรถ"
            prepend-icon="mdi-calendar"
            readonly
            outlined
            disabled
            :rules="[(v) => !!v || 'กรุณาเลือกวันที่คืนรถ']"
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="returnCarForm.returnTime"
            label="เวลาที่คืน"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            outlined
            disabled
            :rules="[(v) => !!v || 'กรุณาเลือกเวลาที่คืน']"
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-file-input
            :disabled="isDisabled"
            ref="file"
            label="หลักฐานการคืนรถ"
            prepend-icon="mdi-camera"
            outlined
            :rules="[(v) => !!v || 'กรุณาอัพโหลดหลักฐานการคืนรถ']"
            accept="image/*"
            show-size
            color="#2c3639"
            v-model="image"
          >
          </v-file-input>
        </v-col>
      </v-row>
      <v-row class="mt-n5">
        <v-col cols="12">
          <v-textarea
            :disabled="isDisabled"
            ref="comment"
            label="หมายเหตุ"
            outlined
            color="#2c3639"
            rows="4"
            hide-details
            v-model="note"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn :disabled="(isDisabled) || (!image || !note)" text color="blue" @click="returnCar">ยืนยัน</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  async asyncData({ store, $axios }) {
    store.dispatch('Auth/setAuthTrue')
    const { EM_ID } = store.getters['Auth/getUser']
    var last = await $axios.$get('/reservation/lastToReturn/' + EM_ID)

    var isDisabled = false
    if ( !last ) {
      last = {
        R_ID: 'ไม่มีรายการจอง',
        R_TIME_BOOK: 'ไม่มีรายการจอง',
        car: {
          C_NAME: 'ไม่มีรายการจอง'
        }
      }
      isDisabled = true
    }


    return { last,isDisabled }
  },


  data() {
    const now = new Date()
    const myTimeZone = 7
    now.setTime(now.getTime() + myTimeZone * 60 * 60 * 1000)
    return {
      datePicker: false,
      timePicker: false,
      returnTimeMenu: null,
      dialog: false,
      image: null,
      note: '',
      returnCarForm: {
        returnDate: now.toISOString().substr(0, 10),
        returnTime: now.toISOString().substr(11, 5),
      },
    }
  },

  methods: {
    formatDate(date) {
      // dd/mm/yyyy
      const d = new Date(date)
      const year = d.getFullYear()
      const month = d.getMonth() + 1
      const day = d.getDate()
      return `${day}/${month}/${year}`
    },

    formatTime(time) {
      const t = new Date(time)
      return t.toLocaleTimeString('th-TH', {
        hour: '2-digit',
        minute: '2-digit',
      })
    },
    async returnCar() {
      console.log('returnCar')
      const { R_ID } = this.last
      var form = new FormData()
      form.append('R_ID', R_ID)
      form.append('R_RETURN_NOTE', this.note)
      form.append('img', this.image)
      await this.$axios.$post('/reservation/return', form)
      this.refreshData()
    },

    async refreshData() {
      const { EM_ID } = this.$store.getters['Auth/getUser']
      var last = await this.$axios.$get( '/reservation/lastToReturn/' + EM_ID )

      var isDisabled = false
      if ( !last ) {
        last = {
          R_ID: 'ไม่มีรายการจอง',
          R_TIME_BOOK: 'ไม่มีรายการจอง',
          car: {
            C_NAME: 'ไม่มีรายการจอง'
          }
        }
        isDisabled = true
      }

      this.last = last
      this.isDisabled = isDisabled

      // clear form
      this.$refs.file.reset()
      this.$refs.comment.reset()

    },
  },
}
</script>
<style lang=""></style>
