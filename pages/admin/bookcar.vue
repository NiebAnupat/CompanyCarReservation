<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-card elevation="3" class="mt-4 rounded-xl pa-3">
        <v-card-title class="white--text ml-3">
          <v-row class="mr-3">
            <v-col class="d-flex">
              <v-icon class="mr-3 mb-2" size="35" color="primary">
                mdi-book-check
              </v-icon>
              <h2 class="black--text my-auto">อนุมัติการจอง</h2>
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
            :items="pendingReservations"
            :items-per-page="10"
            :search="search"
            ref="dataTable"
            class="elevation-1"
            no-data-text="ไม่มีข้อมูลการจอง"
            no-results-text="ไม่พบข้อมูลที่ค้นหา"
          >

            <template v-slot:item.R_BOOK_DATE="{item}">
              <div>
                {{ formatDate( item.R_TIME_BOOK ) }}
              </div>
            </template>

            <template v-slot:item.R_BOOK_TIME="{item}">
              <div>
                {{ formatTime( item.R_TIME_BOOK ) }}
              </div>
            </template>

            <!-- Chip -->
            <template v-slot:item.R_STATUS="{ item }">
              <v-chip
                :color="
                  item.R_STATUS == 'P'
                    ? 'purple accent-3'
                    : item.status == 'T'
                    ? 'green accent-4'
                    : 'red accent-3'
                "
                text-color="white"
              >
                <v-icon class="mr-1">
                  {{
                    item.R_STATUS == 'P'
                      ? 'mdi-clock'
                      : item.R_STATUS == 'T'
                        ? 'mdi-check'
                        : 'mdi-close'
                  }}
                </v-icon>
                <span>
                  {{ getStatusText( item.R_STATUS ) }}
                </span>
              </v-chip>
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
            <template v-slot:item.action="{ item }">
              <!-- Admin Note -->
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    icon
                    color="primary"
                    class="mr-2"
                    @click="showAdminNote(item)"
                  >
                    <v-icon>mdi-comment-text-outline</v-icon>
                  </v-btn>
                </template>
                <span>เพิ่มหมายเหตุ</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    icon
                    color="success"
                    class="mr-2"
                    @click="approveBooking(item)"
                  >
                    <v-icon>mdi-check</v-icon>
                  </v-btn>
                </template>
                <span>อนุมัติ</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    icon
                    color="error"
                    @click="rejectBooking(item)"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </template>
                <span>ไม่อนุมัติ</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
    <!-- Detail dialog -->
    <v-dialog v-model="dialog" max-width="800px">
      <v-card class="pa-2">
        <v-card-title class="headline"> รายละเอียด</v-card-title>
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
                  label="เหตุผล"
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
    <!-- Note Dialog -->
    <v-dialog v-model="noteDialog" max-width="600px">
      <v-card class="rounded-xl pa-1">
        <v-card-title class="headline"> หมายเหตุ</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="R_ADMIN_NOTE"
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
          <v-btn color="blue darken-1" text @click="addNote"> บันทึก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  async asyncData( { store, $axios } ) {
    store.dispatch( 'Auth/setAuthTrue' )
    const pendingReservations = await $axios.$get( '/reservation/pending' )
    return {
      pendingReservations
    }
  },

  data() {
    return {
      dialog : false,
      noteDialog : false,
      search : '',
      selectedR_ID : '',
      R_ADMIN_NOTE : '',
      headers : [
        {
          text : 'รหัสการจอง',
          sortable : true,
          value : 'R_ID',
          align : 'center',
          width : '11%',
          class : 'text-center',
        },
        {
          text : 'วันที่',
          value : 'R_BOOK_DATE',
          type : 'date',
          align : 'center',
          width : '12%',
        },
        {
          text : 'เวลา',
          value : 'R_BOOK_TIME',
          align : 'center',
          width : '8%',
          sortable : false,
        },
        {
          text : 'ชื่อรถ',
          value : 'car.C_NAME',
          class : 'text-center',
        },
        {
          text : 'สถานะ',
          value : 'R_STATUS',
          sortable : false,
          align : 'left',
          width : '10%',
          class : 'text-center',
          divider : true,
        },

        {
          text : 'รายละเอียด',
          value : 'detail',
          align : 'center',
          width : '9%',
          sortable : false,
          class : 'text-center',
        },
        {
          text : 'การจัดการ',
          value : 'action',
          align : 'center',
          sortable : false,
          width : '16%',
        },
      ],
      detail : {
        emId : '',
        name : '',
        surname : '',
        date : '',
        time : '',
        returnDate : '',
        returnTime : '',
        car : '',
        reason : '',
      },
    }
  },

  methods : {
    async approveBooking( item ) {
      const R_ID = item.R_ID
      await this.$axios.put( `/reservation/approve/${ R_ID }` )
      this.refreshData()
    },

    async rejectBooking( item ) {
      const R_ID = item.R_ID
      await this.$axios.put( `/reservation/reject/${ R_ID }` )
      this.refreshData()
    },

    showAdminNote( item ) {
      this.selectedR_ID = item.R_ID
      this.R_ADMIN_NOTE = item.R_ADMIN_NOTE
      this.noteDialog = true
    },

    async addNote() {
      await this.$axios.put( `/reservation/admin-note/${ this.selectedR_ID }`, {
        R_ADMIN_NOTE : this.R_ADMIN_NOTE
      } )
      this.noteDialog = false
      this.refreshData()
    },
    showDetail( item ) {
      this.detail = {
        emId : item.employee.EM_ID,
        name : item.employee.EM_FNAME,
        surname : item.employee.EM_LNAME,
        date : this.formatDate( item.R_TIME_BOOK ),
        time : this.formatTime( item.R_TIME_BOOK ),
        returnDate : this.formatDate( item.R_TIME_RETURN ),
        returnTime : this.formatTime( item.R_TIME_RETURN ),
        car : item.car.C_NAME,
        reason : item.R_DESCRIPTION,
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

    refreshData() {
      this.$axios.$get( '/reservation/pending' ).then(  res  => {
        this.pendingReservations = res
      } )
    },

    refreshTable() {
      // this.$refs.dataTable.
    },
  },
}
</script>
<style lang="scss"></style>
