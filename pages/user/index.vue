<template>
  <div>
    <div class="d-flex">
      <v-icon class="mr-3 mb-2" size="35" color="#2c3639">
        mdi-monitor-dashboard
      </v-icon>
      <h1>หน้าหลัก</h1>
    </div>
    <v-divider class="mb-5"></v-divider>
    <v-row>
      <!-- First Column -->
      <v-col cols="4" md="5">
        <v-card id="statusCard" height="10vh" class="d-flex pa-5 rounded-xl">
          <p class="white--text my-auto title">การจองในขณะนี้</p>
          <v-spacer></v-spacer>
          <p
            class="my-auto title"
            :class="
             getLastColorText(last.R_STATUS)
            "
          >
            {{
              getStatusText( last.R_STATUS )
            }}
          </p>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-btn text class="white--text" :disabled="last.R_STATUS == '_' ? true : false" @click="checkDetail(last)"
            >ดูรายละเอียด
            </v-btn
            >
          </v-card-actions>
        </v-card>
        <v-card
          id="fineCard"
          height="10vh"
          class="d-flex pa-5 rounded-xl white--text mt-4"
        >
          <p class="white--text my-auto title">ยอดค้างชำระ</p>
          <v-spacer></v-spacer>
          <p v-if="fine != null" class="white--text my-auto title">
            {{ fine }}
          </p>
          <v-spacer></v-spacer>
          <p class="white--text my-auto title">บาท</p>
        </v-card>

        <!-- รายการล่าสุด -->
        <v-card
          id="recentBooking"
          elevation="3"
          height="53vh"
          class="mt-4 rounded-xl"
        >
          <v-card-title class="white--text ml-3">
            <v-icon class="mr-2 ml-n2" color="blue" size="30">
              mdi-history
            </v-icon>
            การจองล่าสุด
          </v-card-title
          >
          <v-card-text>
            <v-data-table
              :headers="recentHeaders"
              :items="recent"
              :footer-props="{
                'items-per-page-options': [10],
              }"
              height="37vh"
              fixed-header
            >
              <template v-slot:item.R_DATE_BOOK="{ item }">
                <div>
                  {{
                    // Show date only
                    formatDate( item.R_TIME_BOOK )
                  }}
                </div>
              </template>

              <template v-slot:item.R_TIME_BOOK="{ item }">
                <div>
                  {{
                    // Show time only
                    formatTime( item.R_TIME_BOOK )
                  }}
                </div>
              </template>

              <template v-slot:item.R_STATUS="{ item }">
                <v-chip
                  :color="getColor(item.R_STATUS)"
                  class="white--text subtitle-2"
                >
                  <v-icon class="mr-2" color="white">{{
                      item.R_STATUS == 'P'
                        ? 'mdi-clock'
                        : item.R_STATUS == 'T'
                          ? 'mdi-check'
                          : 'mdi-close'
                    }}
                  </v-icon>
                  {{
                    item.R_STATUS == 'P'
                      ? 'รออนุมัติ'
                      : item.R_STATUS == 'T'
                        ? 'อนุมัติ'
                        : 'ไม่อนุมัติ'
                  }}
                </v-chip>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
        <!-- End รายการล่าสุด -->
      </v-col>
      <!-- End First Column -->
      <!-- Second Column -->
      <v-col cols="4" md="7">
        <!-- รายการโปรด -->
        <v-card id="favorite" elevation="3" height="77vh" class="rounded-xl">
          <v-card-title class="white--text ml-3">
            <v-icon class="mr-3 ml-n2" color="red">mdi-heart</v-icon>
            รายการโปรด
          </v-card-title
          >
          <v-card-text>
            <v-data-table
              :headers="favoriteHeaders"
              :items="favoriteCars"
              :footer-props="{
                'items-per-page-options': [20],
              }"
              height="61vh"
              fixed-header
              no-data-text="ไม่มีรายการโปรด"
              class="rounded-md"
            >
              <template v-slot:item.action="{ item }">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      v-bind="attrs"
                      v-on="on"
                      color="blue darken-1"
                      @click="booking(item.car)"
                    >
                      <v-icon>mdi-book</v-icon>
                    </v-btn>
                  </template>
                  <span>จองรถ</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      v-bind="attrs"
                      v-on="on"
                      color="red"
                      @click="toggleFavorite(item)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                  <span>ลบรายการโปรด</span>
                </v-tooltip>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
        <!-- End รายการโปรด -->
      </v-col>
      <!-- End Second Column -->
      <!-- Third Column -->
      <!-- <v-col cols="4" md="4">

        </v-col> -->
      <!-- End Third Column -->
    </v-row>
  </div>
</template>

<script>
export default {
  name : 'dashboard',
  async asyncData( { store, $axios } ) {
    store.dispatch( 'Auth/setAuthTrue' )
    const { EM_ID } = await store.getters['Auth/getUser']
    const recent = await $axios.$get( '/reservation/recent/' + EM_ID )
    var last = await $axios.$get( '/reservation/latest/' + EM_ID )
    const fine = await $axios.$get( `/employee/${ EM_ID }/fine` )
    const favoriteCars = await $axios.$get( `/car/favoritecar/${ EM_ID }/` )
    if ( !last ) {
      last = { R_STATUS : '_' }
    }
    return { recent, last, fine, favoriteCars }
  },
  data() {
    return {
      recentHeaders : [
        {
          text : 'วันที่',
          align : 'center',
          value : 'R_DATE_BOOK',
          width : '20%',
        },
        { text : 'เวลา', value : 'R_TIME_BOOK', align : 'center', width : '43%' },
        { text : 'สถานะ', value : 'R_STATUS', align : 'start' },
      ],
      recentBooking : [
        {
          date : '1/1/2564',
          time : '10:00 - 11:00',
          status : 'รออนุมัติ',
        },
        {
          date : '2/1/2564',
          time : '10:00 - 11:00',
          status : 'อนุมัติ',
        },
        {
          date : '3/1/2564',
          time : '10:00 - 11:00',
          status : 'ไม่อนุมัติ',
        },
        {
          date : '4/1/2564',
          time : '10:00 - 11:00',
          status : 'รออนุมัติ',
        },
      ],

      favoriteHeaders : [
        {
          text : 'รหัสพาหนะ',
          align : 'center',
          sortable : false,
          value : 'car.C_ID',
          width : '15%',
          class : 'text-center',
        },

        {
          text : 'ชื่อ',
          value : 'car.C_NAME',
          width : '65%',
          class : 'text-center',
        },

        {
          text : 'ดำเนินการ',
          value : 'action',
          align : 'center',
          sortable : false,
        },
      ],
    }
  },
  methods : {
    getColor( status ) {
      switch ( status ) {
        case 'P':
          return 'purple accent-3'
        case 'T':
          return 'green accent-4'
        case 'F':
          return 'red accent-3'
        default:
          return 'black'
      }
    },

    getStatusText( status ) {
      switch ( status ) {
        case 'P':
          return 'รออนุมัติ'
        case 'T':
          return 'อนุมัติ'
        case 'F':
          return 'ไม่อนุมัติ'
        default:
          return 'ไม่พบการจอง'
      }
    },

    getLastColorText( status ) {
      switch ( status ) {
        case 'P':
          return 'purple--text text--accent-3'
        case 'T':
          return 'green--text text--accent-4'
        case 'F':
          return 'red--text text--accent-3'
        default:
          return 'red--text text--accent-3'
      }
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

    async booking( car ) {
      await localStorage.setItem( 'car', JSON.stringify( car ) )
      await this.$router.push( '/user/bookcar/detail' )
    },

    toggleFavorite( car ) {
      this.$store.dispatch( 'Car/toggleFavorite', car )
    },

    async checkDetail( reservation ) {
      await this.$store.dispatch( 'Reservation/setSelected', reservation )
      this.$router.push( '/user/history' )
    },
  },

}
</script>

<style scoped lang="scss">
#statusCard {
  background-color: #2c3639;
}

#fineCard {
  background-color: #c90f30;
}

#recentBooking {
  background-color: #3f4e4f;
}

#favorite {
  background-color: #2c3639;
}

#payCard {
  background-color: #3f4e4f;
}
</style>
