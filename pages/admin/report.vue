<template>
  <div>
    <v-card elevation="3" class="mt-4 rounded-xl pa-3">
      <v-card-title primary-title class="white--text ml-3">
        <v-row class="mr-3">
          <v-col class="d-flex">
            <v-icon class="mr-3 mb-2" size="35" color="primary">
              mdi-chart-bar
            </v-icon>
            <h2 class="black--text my-auto">รายงานการจองรถ</h2>
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
          no-data-text="ไม่มีข้อมูลการใช้งานรถ"
          no-results-text="ไม่พบข้อมูลที่ค้นหา"
          class="elevation-1"
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
  asyncData({ store }) {
    store.dispatch('Auth/setAdminTrue')
  },

  data() {
    return {
      search: '',
      dialog: false,
      headers: [
        {
          text: 'รหัสการจอง',
          align: 'center',
          sortable: true,
          value: 'id',
          class: 'text-center',
          width: '11%',
        },
        {
          text: 'รหัสผู้จอง',
          align: 'center',
          sortable: true,
          value: 'emId',
          class: 'text-center',
          width: '11%',
        },
        {
          text: 'ชื่อผู้จอง',
          align: 'start',
          sortable: true,
          value: 'name',
          class: 'text-center',
          width: '25%',
        },

        {
          text: 'ชื่อรถ',
          align: 'start',
          sortable: true,
          value: 'carName',
          class: 'text-center',
          width: '30%',
        },
        {
          text: 'วันที่จอง',
          align: 'start',
          sortable: true,
          value: 'date',
          class: 'text-center',
          divider: true,
          width: '11%',
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
      items: [
        {
          id: '1',
          emId: '1',
          name: 'นาย สมชาย สมบัติ',
          carName: 'รถยนต์',
          date: '2021-01-01',
        },
      ],

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
}
</script>
<style lang="scss"></style>
