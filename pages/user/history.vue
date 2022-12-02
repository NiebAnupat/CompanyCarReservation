<template>
  <div class="">
    <div class="d-flex">
      <v-icon class="mr-3 mb-4" size="35" color="blue"> mdi-history</v-icon>
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
      :items="reservations"
      :items-per-page="10"
      :search="search"
      class="elevation-1 rounded-md"
      no-data-text="ไม่มีข้อมูลการใช้งานรถ"
      no-results-text="ไม่พบข้อมูลที่ค้นหา"
    >
      <template v-slot:item.R_DATE_BOOK="{ item }">
        <div>
          {{ formatDate( item.R_TIME_BOOK ) }}
        </div>
      </template>

      <template v-slot:item.R_TIME_BOOK="{ item }">
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
              : item.R_STATUS == 'T'
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
            {{
              item.R_STATUS == 'P'
                ? 'รออนุมัติ'
                : item.R_STATUS == 'T'
                  ? 'อนุมัติ'
                  : 'ไม่อนุมัติ'
            }}
          </span>
        </v-chip>
      </template>

      <template v-slot:item.C_NAME="{ item }">
        <div>
          {{ item.car.C_NAME }}
        </div>
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
              @click="setSelectReservation(item)"
              :disabled="item.R_STATUS == 'P'"
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
        <v-card-title class="headline"> รายละเอียดการจอง</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="8">
                <v-text-field
                  v-model="selected.C_NAME"
                  label="รถที่ยืม"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="selected.R_DATE_BOOK"
                  label="วันที่"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="selected.R_TIME_BOOK"
                  label="เวลายืม"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="selected.R_DATE_RETURN"
                  label="วันที่ต้องการคืน"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="selected.R_TIME_RETURN"
                  label="เวลาที่ต้องการคืน"
                  readonly
                ></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field
                  v-model="selected.R_STATUS"
                  label="สถานะ"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="selected.R_DATE_RETURNED"
                  label="วันที่คืน"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="selected.R_TIME_RETURNED"
                  label="เวลาที่คืน"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="selected.R_FINE"
                  label="ค่าปรับ"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="selected.R_DESCRIPTION"
                  label="เหตุผล"
                  readonly
                  outlined
                  rows="3"
                  hide-details
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="selected.R_ADMIN_NOTE"
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
  name : 'history',
  async asyncData( { store, $axios } ) {
    await store.dispatch( 'Auth/setAuthTrue' )
    await store.dispatch( 'Car/fetchCars' )
    const { EM_ID } = store.getters['Auth/getUser']
    const reservations = await $axios.$get( `/reservation/${ EM_ID }/all` )
    return { reservations }
  },

  created() {
    const select = this.$store.getters['Reservation/selected']
    if ( select ) {
      this.selected = {
        R_ID : select.R_ID,
        R_DATE_BOOK : this.formatDate( select.R_TIME_BOOK ),
        R_TIME_BOOK : this.formatTime( select.R_TIME_BOOK ),
        R_DATE_RETURN : this.formatDate( select.R_TIME_RETURN ),
        R_TIME_RETURN : this.formatTime( select.R_TIME_RETURN ),
        R_DATE_RETURNED : select.R_TIME_RETURNED ? this.formatDate( select.R_TIME_RETURNED ) : '-',
        R_TIME_RETURNED : select.R_TIME_RETURNED ? this.formatTime( select.R_TIME_RETURNED ) : '-' ,
        C_NAME : select.car.C_NAME,
        R_STATUS : this.getStatusText( select.R_STATUS ),
        R_FINE : select.R_FINE || '-',
        R_DESCRIPTION : select.R_DESCRIPTION,
        R_ADMIN_NOTE : select.R_ADMIN_NOTE || '-',
      }
      this.showDetail()
    }
  },

  data() {
    return {
      search : '',
      dialog : false,
      headers : [
        {
          text : 'วันที่จอง',
          value : 'R_DATE_BOOK',
          align : 'center',
          type : 'date',
          width : '10%',
          class : 'text-center',
        },
        {
          text : 'เวลา',
          value : 'R_TIME_BOOK',
          align : 'center',
          type : 'time',
          width : '10%',
          class : 'text-center',
        },
        {
          text : 'ชื่อรถ',
          value : 'C_NAME',
          align : 'start',
          width : '40%',
          class : 'text-center',
        },
        {
          text : 'สถานะ',
          value : 'R_STATUS',
          align : 'start',
          width : '10%',
          divider : true,
          class : 'text-center',
        },
        {
          text : 'ดำเนินการ',
          value : 'action',
          align : 'center',
          sortable : false,
          width : '10%',
        },
      ],
      selected : {
        R_ID : '',
        R_DATE_BOOK : '',
        R_TIME_BOOK : '',
        R_DATE_RETURN : '',
        R_TIME_RETURN : '',
        R_DATE_RETURNED : '',
        R_TIME_RETURNED : '',
        C_NAME : '',
        R_STATUS : '',
        R_FINE : '',
        R_DESCRIPTION : '',
        R_Admin_Note : '',
      },
    }
  },
  methods : {
    showDetail() {
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


    setSelectReservation( item ) {
      this.selected = {
        R_ID : item.R_ID,
        R_DATE_BOOK : this.formatDate( item.R_TIME_BOOK ),
        R_TIME_BOOK : this.formatTime( item.R_TIME_BOOK ),
        R_DATE_RETURN : this.formatDate( item.R_TIME_RETURN ),
        R_TIME_RETURN : this.formatTime( item.R_TIME_RETURN ),
        R_DATE_RETURNED : item.R_TIME_RETURNED ? this.formatDate( item.R_TIME_RETURNED ) : '-',
        R_TIME_RETURNED : item.R_TIME_RETURNED ? this.formatTime( item.R_TIME_RETURNED ) : '-' ,
        C_NAME : item.car.C_NAME,
        R_STATUS : this.getStatusText( item.R_STATUS ),
        R_FINE : item.R_FINE || '-',
        R_DESCRIPTION : item.R_DESCRIPTION || '-',
        R_ADMIN_NOTE : item.R_ADMIN_NOTE || '-',
      }
      this.showDetail()
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

<style scoped></style>
