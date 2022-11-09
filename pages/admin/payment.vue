<template>
  <div>
    <v-card elevation="3" class="mt-4 rounded-xl pa-3">
      <v-card-title primary-title class="white--text ml-3">
        <v-row class="mr-3">
          <v-col class="d-flex">
            <v-icon class="mr-3 mb-2" size="35" color="primary">
              mdi-credit-card
            </v-icon>
            <h2 class="black--text my-auto">ตรวจสอบการชำระเงิน</h2>
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
          :items="items"
          :search="search"
          :items-per-page="10"
          no-data-text="ไม่มีข้อมูลการชำระเงิน"
          no-results-text="ไม่พบข้อมูลที่ค้นหา"
          class="elevation-1"
        >
          <!-- Chip -->
          <template v-slot:item.status="{ item }">
            <v-chip
              :color="
                item.status == 'รออนุมัติ'
                  ? 'purple accent-3'
                  : item.status == 'อนุมัติ'
                  ? 'green accent-4'
                  : 'red accent-3'
              "
              text-color="white"
            >
              <v-icon class="mr-1">
                {{
                  item.status == 'รออนุมัติ'
                    ? 'mdi-clock'
                    : item.status == 'อนุมัติ'
                    ? 'mdi-check'
                    : 'mdi-close'
                }}
              </v-icon>
              <span v-text="item.status"></span>
            </v-chip>
          </template>

          <template v-slot:item.action="{ item }">
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
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  icon
                  color="success"
                  class="mr-2"
                  @click=""
                >
                  <v-icon>mdi-check</v-icon>
                </v-btn>
              </template>
              <span>อนุมัติ</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" icon color="error" @click="">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </template>
              <span>ไม่อนุมัติ</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <!-- dialog -->
    <v-dialog v-model="dialog" max-width="800px">
      <v-card>
        <v-card-title class="headline"> รายละเอียด </v-card-title>
        <v-card-text>
          <v-container>
            <p class="subtitle-2">ผู้จอง</p>
            <v-row class="mt-n6">
              <v-col cols="24">
                <v-text-field
                  label="รหัสพนักงาน"
                  v-model="detail.emId"
                  readonly
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="ชื่อ"
                  v-model="detail.name"
                  readonly
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="นามสกุล"
                  v-model="detail.surname"
                  readonly
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
            <p class="subtitle-2 mt-6">การจอง</p>
            <v-row class="mt-n6">
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
            <v-row>
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
            <p class="subtitle-2 mt-6">การชำระเงิน</p>
            <v-row class="mt-n6">
              <v-col cols="6">
                <v-text-field
                  v-model="detail.payDate"
                  label="วันที่"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="detail.payTime"
                  label="เวลา"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-n6">
              <v-col cols="12">
                <v-textarea
                  v-model="detail.payNote"
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
              <v-col cols="12" class="text-center">
                <img :src="detail.payImg" height="400" alt="" />
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
  </div>
</template>
<script>
export default {
  asyncData({ store }) {
    store.dispatch('Auth/setAdminTrue')
  },

  data() {
    return {
      dialog: false,
      search: '',
      headers: [
        {
          text: 'รหัสพนักงาน',
          align: 'center',
          sortable: true,
          value: 'emId',
          width: '11%',
          class: 'text-center',
        },

        {
          text: 'ชื่อ-นามสกุล',
          align: 'left',
          sortable: true,
          value: 'name',
          class: 'text-center',
        },

        {
          text: 'วันที่',
          align: 'center',
          sortable: true,
          value: 'date',
          class: 'text-center',
        },

        {
          text: 'เวลา',
          align: 'center',
          sortable: true,
          value: 'time',
          class: 'text-center',
        },

        {
          text: 'จำนวนเงิน (฿)',
          align: 'center',
          sortable: true,
          value: 'amount',
          class: 'text-center',
        },

        {
          text: 'สถานะ',
          value: 'status',
          sortable: false,
          align: 'left',
          width: '10%',
          class: 'text-center',
          divider: true,
        },

        {
          text: 'การจัดการ',
          value: 'action',
          align: 'center',
          sortable: false,
          width: '16%',
        },
      ],

      items: [
        {
          emId: 'E001',
          name: 'นาย สมชาย สมบัติ',
          date: '01/01/2564',
          time: '10:00',
          amount: '500',
          status: 'รออนุมัติ',
        },
        {
          emId: 'E002',
          name: 'นาย สมหญิง สมบัติ',
          date: '01/02/2564',
          time: '08:00',
          amount: '500',
          status: 'รออนุมัติ',
        },
        {
          emId: 'E003',
          name: 'นาย สมเด็จ สมบัติ',
          date: '01/01/2564',
          time: '09:00',
          amount: '700',
          status: 'รออนุมัติ',
        },
        {
          emId: 'E004',
          name: 'นาย สมเด็จ สมบัติ',
          date: '01/01/2564',
          time: '08:00',
          amount: '500',
          status: 'รออนุมัติ',
        },
        {
          emId: 'E005',
          name: 'นาย สมเด็จ สมบัติ',
          date: '01/03/2564',
          time: '08:00',
          amount: '500',
          status: 'รออนุมัติ',
        },
      ],

      detail: {
        emId: 'E001',
        name: 'สมชาย ',
        surname: 'สมบัติ',
        date: '12/12/2020',
        time: '09:30',
        returnDate: '1/1/2021',
        returnTime: '10:30',
        car: 'รถ 1',
        reason: 'จองรถเพื่อไปเที่ยว',
        payNote: 'ไม่มี',
        payDate: '29/09/2022',
        payTime: '20:23',
        payImg: require('@/assets/img/bill.jpg'),
      },
    }
  },
}
</script>
<style lang=""></style>
