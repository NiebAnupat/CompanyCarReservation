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
          :items="payments"
          :search="search"
          :items-per-page="10"
          no-data-text="ไม่มีข้อมูลการชำระเงิน"
          no-results-text="ไม่พบข้อมูลที่ค้นหา"
          class="elevation-1"
        >

          <template v-slot:item.name="{item}">
            <div>
              {{ item.employee.EM_FNAME }}
              &nbsp;
              &nbsp;
              {{ item.employee.EM_LNAME }}
            </div>
          </template>

          <template v-slot:item.date="{item}">
            <div>
              {{ formatDate( item.PM_TIME ) }}
            </div>
          </template>

          <template v-slot:item.time="{item}">
            <div>
              {{ formatTime( item.PM_TIME ) }}
            </div>
          </template>

            <template v-slot:item.amount="{item}">
              <div>
                {{ item.PM_AMOUNT }}
                &nbsp;
                &nbsp;
                บาท
              </div>
            </template>

            <!-- Chip -->
            <template v-slot:item.status="{ item }">
              <v-chip
                :color="
                item.PM_STATUS == 'P'
                  ? 'purple accent-3'
                  : item.PM_STATUS == 'T'
                  ? 'green accent-4'
                  : 'red accent-3'
              "
                text-color="white"
              >
                <v-icon class="mr-1">
                  {{
                    item.PM_STATUS == 'P'
                      ? 'mdi-clock'
                      : item.PM_STATUS == 'T'
                        ? 'mdi-check'
                        : 'mdi-close'
                  }}
                </v-icon>
                <span>{{ getStatusText( item.PM_STATUS ) }}</span>
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
                    @click="setDetail( item )"
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
                    @click="approve( item.PM_ID )"
                  >
                    <v-icon>mdi-check</v-icon>
                  </v-btn>
                </template>
                <span>อนุมัติ</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" icon color="error" @click="reject(item.PM_ID)">
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
        <v-card-title class="headline"> รายละเอียด</v-card-title>
        <v-card-text>
          <v-container>
            <p class="subtitle-2">ผู้ชำระเงิน</p>
            <v-row class="mt-n6">
              <v-col cols="24">
                <v-text-field
                  label="รหัสพนักงาน"
                  v-model="detail.employee.EM_ID"
                  readonly
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="ชื่อ"
                  v-model="detail.employee.EM_FNAME"
                  readonly
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="นามสกุล"
                  v-model="detail.employee.EM_LNAME"
                  readonly
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>

            <p class="subtitle-2 mt-6">รายละเอียดการชำระเงิน</p>
            <v-row class="mt-n6">
              <v-col cols="6">
                <v-text-field
                  v-model="detail.PM_DATE"
                  label="วันที่"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="detail.PM_TIME"
                  label="เวลา"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-n6">
              <v-col cols="12">
                <v-textarea
                  v-model="detail.PM_NOTE"
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
                <img :src="detail.PM_IMG" height="400" alt=""/>
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
    const payments = await $axios.$get( '/payment/get/pending' )
    return { payments }
  },

  data() {
    return {
      dialog : false,
      search : '',
      headers : [
        {
          text : 'รหัสพนักงาน',
          align : 'center',
          sortable : true,
          value : 'employee.EM_ID',
          width : '11%',
          class : 'text-center',
        },

        {
          text : 'ชื่อ-นามสกุล',
          align : 'left',
          sortable : true,
          value : 'name',
          class : 'text-center',
        },

        {
          text : 'วันที่',
          align : 'center',
          sortable : true,
          value : 'date',
          class : 'text-center',
        },

        {
          text : 'เวลา',
          align : 'center',
          sortable : true,
          value : 'time',
          class : 'text-center',
        },

        {
          text : 'จำนวนเงิน (฿)',
          align : 'center',
          sortable : true,
          value : 'amount',
          class : 'text-center',
        },

        {
          text : 'สถานะ',
          value : 'status',
          sortable : false,
          align : 'left',
          width : '10%',
          class : 'text-center',
          divider : true,
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
       employee : {
          EM_ID : '',
         EM_FNAME : '',
         EM_LNAME : '',
        },
        PM_DATE : '',
        PM_TIME : '',
        PM_NOTE : '',
        PM_IMG : '',
      },
    }
  },

  methods : {

    setDetail( item ) {
      this.detail = {
        employee : {
          EM_ID : item.employee.EM_ID,
          EM_FNAME : item.employee.EM_FNAME,
          EM_LNAME : item.employee.EM_LNAME,
        },
        PM_DATE : this.formatDate( item.PM_TIME ),
        PM_TIME : this.formatTime( item.PM_TIME ),
        PM_NOTE : item.PM_NOTE,
        PM_IMG : this.convertBlobToURL(item.PM_IMG),
      }
      this.dialog = true
    },

    async approve( PM_ID ) {
      await this.$axios.put( `/payment/approve/${ PM_ID }` )
      this.refreshData()
    },

    async reject( PM_ID ) {
      await this.$axios.put( `/payment/reject/${ PM_ID }` )
      this.refreshData()
    },

    refreshData(){
      this.$axios.$get( '/payment/get/pending' ).then( res => {
        this.payments = res
      } )
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

    convertBlobToURL(blob) {
      return (
        'data:image/jpeg;base64,' +
        new Buffer(
          new Uint8Array(blob.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          ),
          'binary'
        ).toString('base64')
      )
    },
  }
}
</script>
<style lang=""></style>
