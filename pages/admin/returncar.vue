<template lang="th">
    <v-row>
    <v-col cols="12" md="12">
      <v-card elevation="3" class="mt-4 rounded-xl pa-3">
        <v-card-title class="white--text ml-3">
          <v-row class="mr-3">
            <v-col class="d-flex">
              <v-icon class="mr-3 mb-2" size="35" color="primary">
               mdi-car-arrow-right
              </v-icon>
              <h2 class="black--text my-auto">ตรวจสอบการคืนรถ</h2>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="4">
              <v-text-field
                prepend-icon="mdi-magnify"
                placeholder="ค้นหา"
                hide-details
                class="mb-3"
                v-model="search"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="pendingBookings"
            :items-per-page="10"
            :search="search"
            class="elevation-1"
            no-data-text="ไม่มีข้อมูลการจอง"
            no-results-text="ไม่พบข้อมูลที่ค้นหา"
          >
           

            <template v-slot:item.detail="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    icon
                    color="primary"
                    class="mr-2"
                    @click="dialog = true"
                  >
                    <v-icon>mdi-book-search</v-icon>
                  </v-btn>
                </template>
                <span>ดูรายละเอียด</span>
              </v-tooltip>
            </template>

          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
    <!-- dialog -->
<v-dialog v-model="dialog" max-width="800px">
  <v-card>
    <v-card-title class="headline"> รายละเอียด </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="8">
            <v-text-field
              v-model="detail.car"
              label="รถที่ยืม"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="detail.date"
              label="วันที่"
              readonly
            ></v-text-field>
          </v-col>
          
        </v-row>
        <v-row class="mt-n6">
            <v-col cols="4">
            <v-text-field
              v-model="detail.time"
              label="เวลายืม"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="detail.returnDate"
              label="วันที่ต้องการคืน"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="detail.returnTime"
              label="เวลาที่ต้องการคืน"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n6">
          <v-col cols="12">
            <v-textarea
              v-model="detail.reason"
              label="วัตถุประสงค์"
              readonly
              outlined
              rows="3"
              hide-details
            ></v-textarea>
          </v-col>
        </v-row>
        <p class="subtitle-2 mt-6">คืนรถ</p>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="detail.returnDate"
              label="วันที่คืน"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="detail.returnTime"
              label="เวลาที่คืน"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n6">
          <v-col cols="12">
            <v-textarea
              v-model="detail.returnNote"
              label="หมายเหตุ"
              readonly
              outlined
              rows="3"
              hide-details
            ></v-textarea>
          </v-col>
        </v-row>
        <p class="subtitle-2 mt-6">หลักฐาน</p>
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
                <v-carousel-item
                  :src="detail.returnedImg"
                >
                </v-carousel-item>
            </v-carousel>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="dialog = false">
        ปิด
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
    <!-- Note Dialog -->
<v-dialog v-model="noteDialog" max-width="600px">
      <v-card class="rounded-xl pa-1">
        <v-card-title class="headline"> หมายเหตุ </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="adminNote"
                  label="หมายเหตุ"
                  outlined
                  rows="3"
                  hide-details
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="mt-n5">
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="noteDialog = false">
            ปิด
          </v-btn>
          <v-btn color="blue darken-1" text @click="addNote"> บันทึก </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {

  asyncData({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    store.dispatch('Auth/setAdminTrue')
  },

  data() {
    return {
      dialog: false,
      noteDialog: false,
      search: '',
      adminNote: '',
      pendingBookings: [
        {
          id: 1,
          date: '2020-01-01',
          car: 'รถยนต์ 1',
          time: '08:00',
          status: 'รออนุมัติ',
        },
        {
          id: 2,
          date: '2020-01-01',
          car: 'รถยนต์ 2',
          time: '08:00',
          status: 'รออนุมัติ',
        },
        {
          id: 3,
          date: '2020-01-07',
          car: 'รถยนต์ 3',
          time: '08:00',
          status: 'รออนุมัติ',
        },
        {
          id: 4,
          date: '2020-01-06',
          car: 'รถยนต์ 4',
          time: '08:00',
          status: 'รออนุมัติ',
        },
        {
          id: 5,
          date: '2020-01-05',
          car: 'รถยนต์ 5',
          time: '08:00',
          status: 'รออนุมัติ',
        },
      ],

      detail: {
        date: '12/12/2020',
        time: '09:30',
        returnDate: '1/1/2021',
        returnTime: '10:30',
        car: 'รถ 1',
        reason: 'จองรถเพื่อไปเที่ยว',
        returnNote: 'ไม่มี',
        returnedDate: '1/1/2021',
        returnedTime: '10:30',
        returnedImg: 'https://img.freepik.com/free-psd/white-sport-car_176382-1598.jpg?w=2000',
      },

      headers: [
        {
          text: 'รหัสการจอง',
          align: 'start',
          sortable: true,
          value: 'id',
          align: 'center',
          width: '11%',
          class: 'text-center',
        },
        {
          text: 'วันที่คืน',
          value: 'date',
          type: 'date',
          align: 'center',
          width: '12%',
        },
        {
          text: 'เวลา',
          value: 'time',
          align: 'center',
          width: '8%',
          sortable: false,
        },
        {
          text: 'ชื่อรถ',
          value: 'car',
          class: 'text-center',
        },
        
        {
          text: 'รายละเอียด',
          value: 'detail',
          align: 'center',
          width: '9%',
          sortable: false,
          class: 'text-center',
        },
       
      ],
    }
  },

  methods: {

  }
}
</script>
<style lang="scss">

</style>
