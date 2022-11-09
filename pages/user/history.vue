<template>
  <div class="">
    <div class="d-flex">
      <v-icon class="mr-3 mb-4" size="35" color="blue"> mdi-history </v-icon>
      <h1>ประวัติการจอง</h1>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        prepend-icon="mdi-magnify"
        label="ค้นหา"
        single-line
        hide-details
        class="mb-4"
      ></v-text-field>
    </div>
    <v-divider class="mb-3"></v-divider>

    <v-data-table
      :headers="headers"
      :items="history"
      :items-per-page="10"
      :search="search"
      class="elevation-1 rounded-md"
      no-data-text="ไม่มีข้อมูลการใช้งานรถ"
      no-results-text="ไม่พบข้อมูลที่ค้นหา"
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

      <!-- Action -->
      <template v-slot:item.action="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              icon
              color="primary"
              class="mr-2"
              @click="showDetail(item)"
              :disabled="item.status == 'รออนุมัติ'"
            >
              <v-icon>mdi-book-search</v-icon>
            </v-btn>
          </template>
          <span>ดูรายละเอียด</span>
        </v-tooltip>
      </template>

      <template v-slot:no-data>
        <!-- ไม่มีประวัติการจองใช้งาน -->
        <p class="subtitle-2 mt-3">ไม่มีประวัติการจองใช้งาน</p>
      </template>
    </v-data-table>

    <!-- dialog -->
    <v-dialog v-model="dialog" max-width="800px">
      <v-card>
        <v-card-title class="headline"> รายละเอียดการจอง </v-card-title>
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

              <v-col cols="4">
                <v-text-field
                  v-model="detail.status"
                  label="สถานะ"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="detail.returnedDate"
                  label="วันที่คืน"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="detail.returnedTime"
                  label="เวลาที่คืน"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="detail.fine"
                  label="ค่าปรับ"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="detail.reason"
                  label="เหตุผล"
                  readonly
                  outlined
                  rows="3"
                  hide-details
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="detail.note"
                  label="หมายเหตุ"
                  readonly
                  outlined
                  rows="3"
                  hide-details
                ></v-textarea>
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
  name: 'history',
  asyncData({ store }) {
    store.dispatch('Auth/setAuthTrue')
    const history = store.getters['History/getHistory']
    return { history }
  },
  data() {
    return {
      search: '',
      dialog: false,
      headers: [
        {
          text: 'วันที่จอง',
          value: 'date',
          align: 'center',
          type: 'date',
          width: '10%',
          class: 'text-center',
        },
        {
          text: 'เวลา',
          value: 'time',
          align: 'center',
          type: 'time',
          width: '10%',
          class: 'text-center',
        },
        {
          text: 'ชื่อรถ',
          value: 'car',
          align: 'start',
          width: '40%',
          class: 'text-center',
        },
        {
          text: 'สถานะ',
          value: 'status',
          align: 'start',
          width: '10%',
          divider: true,
          class: 'text-center',
        },
        {
          text: 'ดำเนินการ',
          value: 'action',
          align: 'center',
          sortable: false,
          width: '10%',
        },
      ],

      history: [],

      detail: {
        date: '12/12/2020',
        time: '09:30',
        returnDate: '1/1/2021',
        returnTime: '10:30',
        returnedDate: '1/1/2021',
        returnedTime: '10:30',
        fine: '0',
        car: 'รถ 1',
        status: 'รออนุมัติ',
        reason: 'จองรถเพื่อไปเที่ยว',
        note: 'ไม่อนุมัติเพราะไม่มีรถ',
      },
    }
  },
  methods: {
    showDetail(item) {
      this.detail = item
      this.dialog = true
    },
  },
}
</script>

<style scoped></style>
