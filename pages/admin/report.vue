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
          :items="reservations"
          :search="search"
          :items-per-page="10"
          no-data-text="ไม่มีข้อมูลการใช้งานรถ"
          no-results-text="ไม่พบข้อมูลที่ค้นหา"
          class="elevation-1"
        >

          <template v-slot:item.name="{ item }">
            <div>
              {{ item.employee.EM_FNAME }} &nbsp; &nbsp; {{ item.employee.EM_LNAME }}
            </div>
          </template>

          <template v-slot:item.date="{item}">
            <div>
              {{ formatDate( item.R_DATE_MAKE ) }}
            </div>
          </template>

          <template v-slot:item.detail="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  icon
                  color="primary"
                  class="mr-2"
                  @click="showDetail(item)"
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
        <v-card-title class="headline"> รายละเอียดการจอง</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="8">
                <v-text-field
                  v-model="detail.car.C_NAME"
                  label="รถที่ยืม"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="detail.R_BOOK_DATE"
                  label="วันที่"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="detail.R_BOOK_TIME"
                  label="เวลายืม"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="detail.R_RETURN_DATE"
                  label="วันที่ต้องการคืน"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="detail.R_RETURN_TIME"
                  label="เวลาที่ต้องการคืน"
                  readonly
                ></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field
                  v-model="detail.R_STATUS"
                  label="สถานะ"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="detail.R_DATE_RETURNED"
                  label="วันที่คืน"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="detail.R_TIME_RETURNED"
                  label="เวลาที่คืน"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="detail.R_FINE"
                  label="ค่าปรับ"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="detail.R_DESCRIPTION"
                  label="เหตุผล"
                  readonly
                  outlined
                  rows="3"
                  hide-details
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="detail.R_ADMIN_NOTE"
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
  async asyncData( { store, $axios } ) {
    store.dispatch( 'Auth/setAdminTrue' )
    const reservations = await $axios.$get( '/reservation/checked' )
    return { reservations }
  },

  data() {
    return {
      search : '',
      dialog : false,
      headers : [
        {
          text : 'รหัสการจอง',
          align : 'center',
          sortable : true,
          value : 'R_ID',
          class : 'text-center',
          width : '11%',
        },
        {
          text : 'รหัสผู้จอง',
          align : 'center',
          sortable : true,
          value : 'employee.EM_ID',
          class : 'text-center',
          width : '11%',
        },
        {
          text : 'ชื่อผู้จอง',
          align : 'start',
          sortable : true,
          value : 'name',
          class : 'text-center',
          width : '25%',
        },

        {
          text : 'ชื่อรถ',
          align : 'start',
          sortable : true,
          value : 'car.C_NAME',
          class : 'text-center',
          width : '30%',
        },
        {
          text : 'วันที่จอง',
          align : 'start',
          sortable : true,
          value : 'date',
          class : 'text-center',
          divider : true,
          width : '11%',
        },

        {
          text : 'รายละเอียด',
          value : 'detail',
          align : 'center',
          width : '9%',
          sortable : false,
          class : 'text-center',
        },
      ],

      detail : {
        R_ID : '',
        R_BOOK_DATE : '',
        R_BOOK_TIME : '',
        R_RETURN_DATE : '',
        R_RETURN_TIME : '',
        R_STATUS : '',
        R_DATE_RETURNED : '',
        R_TIME_RETURNED : '',
        R_FINE : '',
        R_DESCRIPTION : '',
        R_ADMIN_NOTE : '',
        car : {
          C_NAME : '',
        },
      },
    }
  },

  methods : {
    showDetail( item ) {
      console.log( item )
      this.detail = {
        R_ID : item.R_ID,
        R_BOOK_DATE : this.formatDate(item.R_TIME_BOOK),
        R_BOOK_TIME : this.formatTime(item.R_TIME_BOOK),
        R_RETURN_DATE : this.formatDate(item.R_TIME_RETURN),
        R_RETURN_TIME : this.formatTime(item.R_TIME_RETURN),
        R_STATUS : this.getStatusText(item.R_STATUS),
        R_DATE_RETURNED : item.R_TIME_RETURNED ? this.formatDate(item.R_TIME_RETURNED) : '-',
        R_TIME_RETURNED : item.R_TIME_RETURNED ? this.formatTime(item.R_TIME_RETURNED) : '-',
        R_FINE : item.R_FINE ? item.R_FINE : '-',
        R_DESCRIPTION : item.R_DESCRIPTION,
        R_ADMIN_NOTE : item.R_ADMIN_NOTE,
        car : {
          C_NAME : item.car.C_NAME,
        },
      }
      this.dialog = true
    },

    formatDate( date ) {
      // dd/mm/yyyy
      const d = new Date( date )
      const year = d.getFullYear()
      const month = d.getMonth() + 1
      const day = d.getDate()
      return `${ day }/${ month }/${ year }`
    },

    formatTime( time ) {
      const t = new Date( time )
      return t.toLocaleTimeString( 'th-TH', {
        hour : '2-digit',
        minute : '2-digit',
      } )
    },
    getStatusText( status ) {
      switch ( status ) {
        case 'P':
          return 'รออนุมัติ'
        case 'T':
          return 'อนุมัติ'
        case 'F':
          return 'ไม่อนุมัติ'
      }
    },
  },
}
</script>
<style lang="scss"></style>
