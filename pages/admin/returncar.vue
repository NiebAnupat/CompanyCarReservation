<template>
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
            :items="returnCars"
            :items-per-page="10"
            :search="search"
            class="elevation-1"
            no-data-text="ไม่มีข้อมูลการจอง"
            no-results-text="ไม่พบข้อมูลที่ค้นหา"
          >

            <template v-slot:item.R_BOOK_DATE="{item}">
              <div>
                {{ formatDate( item.R_TIME_RETURNED ) }}
              </div>
            </template>

            <template v-slot:item.R_BOOK_TIME="{item}">
              <div>
                {{ formatTime( item.R_TIME_RETURNED ) }}
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
                    @click="setDetail(item)"
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
        <v-card-title class="headline"> รายละเอียด</v-card-title>
        <v-card-text>
          <v-container>
            <p class="subtitle-2">ผู้จอง</p>
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
            <p class="subtitle-2 mt-7">การจอง</p>
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

            </v-row>
            <v-row class="mt-n6">
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
            </v-row>
            <v-row class="mt-n6">
              <v-col cols="12">
                <v-textarea
                  v-model="detail.R_DESCRIPTION"
                  label="วัตถุประสงค์"
                  readonly
                  outlined
                  rows="3"
                  hide-details
                ></v-textarea>
              </v-col>
            </v-row>
            <p class="subtitle-2 mt-7">คืนรถ</p>
            <v-row>
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
              <v-col cols="4">
                <v-text-field
                v-model="detail.R_FINE"
                label="ค่าปรับ"
                readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-n6">
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
            <p class="subtitle-2 mt-7">หลักฐาน</p>
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
                    :src="detail.R_RETURN_IMG"
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
  </v-row>
</template>
<script>
export default {

  async asyncData( { store, $axios } ) {
    await store.dispatch( 'Auth/setAdminTrue' )
    const returnCars = await $axios.$get( '/reservation/returned' )
    return { returnCars }
  },

  data() {
    return {
      dialog : false,
      noteDialog : false,
      search : '',

      detail : {
        R_ID : '',
        R_BOOK_DATE : '',
        R_BOOK_TIME : '',
        R_RETURN_DATE : '',
        R_RETURN_TIME : '',
        R_DESCRIPTION : '',
        R_DATE_RETURNED : '',
        R_TIME_RETURNED : '',
        R_ADMIN_NOTE : '',
        R_RETURN_IMG : '',
        R_FINE : '',
        employee : {
          EM_ID : '',
          EM_FNAME : '',
          EM_LNAME : ''
        },
        car : {
          C_NAME : ''
        }
      },

      headers : [
        {
          text : 'รหัสการจอง',
          align : 'center',
          sortable : true,
          value : 'R_ID',
          width : '11%',
          class : 'text-center',
        },
        {
          text : 'วันที่คืน',
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
          text : 'รายละเอียด',
          value : 'detail',
          align : 'center',
          width : '9%',
          sortable : false,
          class : 'text-center',
        },

      ],
    }
  },

  methods : {

    setDetail( item ) {
      this.detail = {
        R_ID : item.R_ID,
        R_BOOK_DATE : this.formatDate(item.R_TIME_BOOK),
        R_BOOK_TIME : this.formatTime(item.R_TIME_BOOK),
        R_RETURN_DATE :  this.formatDate(item.R_TIME_RETURN),
        R_RETURN_TIME : this.formatTime(item.R_TIME_RETURN),
        R_DESCRIPTION : item.R_DESCRIPTION,
        R_DATE_RETURNED : this.formatDate(item.R_TIME_RETURNED),
        R_TIME_RETURNED : this.formatTime(item.R_TIME_RETURNED),
        R_ADMIN_NOTE : item.R_ADMIN_NOTE,
        R_RETURN_IMG : this.convertBlobToURL(item.R_RETURN_IMG),
        R_FINE : item.R_FINE,
        employee : {
          EM_ID : item.employee.EM_ID,
          EM_FNAME : item.employee.EM_FNAME,
          EM_LNAME : item.employee.EM_LNAME
        },
        car : {
          C_NAME : item.car.C_NAME
        }
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
<style lang="scss">

</style>
