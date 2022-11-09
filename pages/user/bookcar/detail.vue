<template>
  <div>
    <v-dialog v-model="dialog" persistent width="500">
      <v-card>
        <v-card-title class="text-h5"> ยืนยันการจอง </v-card-title>
        <v-card-text> เมื่อยืนยันแล้วจะไม่สามารถแก้ไขข้อมูลได้อีก </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">
            ยกเลิก
          </v-btn>
          <v-btn color="primary" text @click="submit"> ยืนยัน </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- รายละเอียดการจอง -->
    <v-row class="mt-4">
      <v-col md="4">
        <v-card>
          <v-carousel height="200px">
            <v-carousel-item
              v-for="(item, i) in car.images"
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
        </v-card>
      </v-col>
      <v-col md="8">
        <v-card class="rounded-xl pa-8">
          <v-card-title>
            <p class="headline">รายละเอียดการจอง</p>
          </v-card-title>
          <v-divider class="mt-n5 mb-3 mx-3"></v-divider>
          <!-- วัน -->
          <v-row cols="12">
            <v-col md="6">
              <v-menu
                v-model="bookDatePicker"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="bookDate"
                    label="วันที่ต้องการจอง"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="bookDate"
                  @input="bookDatePicker = false"
                  scrollable
                  landscape="true"
                  color="#2c3639"
                ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col md="6">
              <v-menu
                v-model="returnDatePicker"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="returnDate"
                    label="วันที่ต้องการคืน"
                    prepend-icon="mdi-book-refresh"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="returnDate"
                  @input="returnDatePicker = false"
                  scrollable
                  landscape="true"
                  color="#2c3639"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>

          <!-- เวลา -->
          <v-row cols="12" class="mt-4">
            <!-- เวลาจอง -->
            <v-col md="6">
              <v-menu
                ref="bookTimeMenu"
                v-model="bookTimePicker"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="bookTime"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="bookTime"
                    label="เวลาที่ต้องการจอง"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="bookTimePicker"
                  v-model="bookTime"
                  full-width
                  format="24hr"
                  scrollable
                  color="#2c3639"
                  @click:minute="$refs.bookTimeMenu.save(bookTime)"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <!-- เวลาคืน -->
            <v-col md="6">
              <v-menu
                ref="returnMenu"
                v-model="returnTimePicker"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="returnTime"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="returnTime"
                    label="เวลาที่ต้องการคืน"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="returnTimePicker"
                  v-model="returnTime"
                  full-width
                  format="24hr"
                  scrollable
                  color="#2c3639"
                  @click:minute="$refs.returnMenu.save(returnTime)"
                ></v-time-picker>
              </v-menu>
            </v-col>
          </v-row>

          <!-- รายละเอียด -->
          <v-row cols="12" class="mt-4 px-10">
            <v-textarea
              color="#2c3639"
              label="รายละเอียดการจอง"
              hint="เหตุผลประกอบการใช้งาน"
              persistent-hint
            ></v-textarea>
          </v-row>

          <v-card-actions>
            <v-btn color="primary" class="ml-auto" text @click="dialog = true"
              >ยืนยัน</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: 'bookcar-detail',
  async asyncData({ store }) {
    store.dispatch('Auth/setAuthTrue')
    const car = await store.getters['Car/getSelectedCar']
    console.log(car)
    return { car }
  },
  data() {
    return {
      dialog: false,
      bookDatePicker: false,
      returnDatePicker: false,
      bookDate: null,
      returnDate: null,
      bookTimePicker: false,
      returnTimePicker: false,
      bookTime: null,
      returnTime: null,
    }
  },

  methods: {
    submit() {
      this.$router.push('/user')
    },
  },
}
</script>
<style lang="scss"></style>
