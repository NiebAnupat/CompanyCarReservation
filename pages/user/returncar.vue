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
            outlined
            readonly
            value="ABC"
            disabled
            hide-details
          >
          </v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            label="ชื่อรถ"
            outlined
            readonly
            value="รถยนต์ 1"
            disabled
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            label="วันที่ยืม"
            outlined
            readonly
            disabled
            value="12-2-2022"
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <!-- <v-menu
            v-model="datePicker"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }"> -->
          <v-text-field
            v-model="returnCarForm.returnDate"
            label="วันที่คืนรถ"
            prepend-icon="mdi-calendar"
            readonly
            outlined
            disabled
            :rules="[(v) => !!v || 'กรุณาเลือกวันที่คืนรถ']"
          ></v-text-field>
          <!-- </template>
            <v-date-picker
              v-model="returnCarForm.returnDate"
              @input="datePicker = false"
              scrollable
              landscape="true"
              color="#2c3639"
            ></v-date-picker>
          </v-menu> -->
        </v-col>
        <v-col cols="4">
          <!-- <v-menu
            ref="returnTimeMenu"
            v-model="timePicker"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="returnCarForm.returnTime"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }"> -->
          <v-text-field
            v-model="returnCarForm.returnTime"
            label="เวลาที่คืน"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            outlined
            disabled
            :rules="[(v) => !!v || 'กรุณาเลือกเวลาที่คืน']"
          ></v-text-field>
          <!-- </template>
            <v-time-picker
              v-if="timePicker"
              v-model="returnCarForm.returnTime"
              full-width
              format="24hr"
              scrollable
              color="#2c3639"
              @click:minute="
                $refs.returnTimeMenu.save(returnCarForm.returnTime)
              "
            ></v-time-picker>
          </v-menu> -->
        </v-col>
        <v-col cols="4">
          <v-file-input
            label="หลักฐานการคืนรถ"
            prepend-icon="mdi-camera"
            outlined
            :rules="[(v) => !!v || 'กรุณาอัพโหลดหลักฐานการคืนรถ']"
            accept="image/*"
            show-size
            color="#2c3639"
          >
          </v-file-input>
        </v-col>
      </v-row>
      <v-row class="mt-n5">
        <v-col cols="12">
          <v-textarea
            label="หมายเหตุ"
            outlined
            color="#2c3639"
            rows="4"
            hide-details
          ></v-textarea>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text color="blue">ยืนยัน</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data() {
    const now = new Date()
    const myTimeZone = 7
    now.setTime(now.getTime() + myTimeZone * 60 * 60 * 1000)
    return {
      datePicker: false,
      timePicker: false,
      returnTimeMenu: null,
      dialog: false,
      returnCarForm: {
        bookingId: '',
        returnDate: now.toISOString().substr(0, 10),
        returnTime: now.toISOString().substr(11, 5),
      },
    }
  },
}
</script>
<style lang=""></style>
