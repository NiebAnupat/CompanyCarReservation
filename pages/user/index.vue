<template>
  <div class="mt-16">
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
              lastBooking.status == 'รออนุมัติ'
                ? 'purple--text text--accent-3'
                : lastBooking.status == 'อนุมัติ'
                ? 'green--text text--accent-4'
                : 'red--text text--accent-3'
            "
          >
            {{ lastBooking.status }}
          </p>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-btn text class="white--text">ดูรายละเอียด</v-btn>
          </v-card-actions>
        </v-card>
        <v-card
          id="fineCard"
          height="10vh"
          class="d-flex pa-5 rounded-xl white--text mt-4"
        >
          <p class="white--text my-auto title">ยอดค้างชำระ</p>
          <v-spacer></v-spacer>
          <p class="white--text my-auto title">10,000</p>
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
            การจองล่าสุด</v-card-title
          >
          <v-card-text>
            <v-data-table
              :headers="recentHeaders"
              :items="recentBooking"
              :footer-props="{
                'items-per-page-options': [10],
              }"
              height="37vh"
              fixed-header
            >
              <template v-slot:item.status="{ item }">
                <v-chip
                  :color="getColor(item.status)"
                  class="white--text subtitle-2"
                >
                  <v-icon class="mr-2" color="white">{{
                    item.status == 'รออนุมัติ'
                      ? 'mdi-clock'
                      : item.status == 'อนุมัติ'
                      ? 'mdi-check'
                      : 'mdi-close'
                  }}</v-icon>
                  {{ item.status }}
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
            รายการโปรด</v-card-title
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
                      @click="booking(item)"
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
  name: 'dashboard',
  async asyncData({ store }) {
    store.dispatch('Auth/setAuthTrue')
    // const favoriteCars = await store.getters['Car/getFavoriteCars']
    // const recentBooking = await store.getters['Booking/getRecentBooking']
    // const lastBooking = await store.getters['Booking/getLastBooking']
    // console.log(favoriteCars)
    // return { favoriteCars }
  },
  data() {
    return {
      lastBooking: {
        status: 'รออนุมัติ',
        // สีของปุ่ม รออนุมัติ : purple accent-3 , อนุมัติ : green accent-4 , ไม่อนุมัติ : red accent-3
      },
      recentHeaders: [
        {
          text: 'วันที่',
          align: 'center',
          value: 'date',
          width: '20%',
        },
        { text: 'เวลา', value: 'time', align: 'center', width: '43%' },
        { text: 'สถานะ', value: 'status', align: 'start' },
      ],
      recentBooking: [
        {
          date: '1/1/2564',
          time: '10:00 - 11:00',
          status: 'รออนุมัติ',
        },
        {
          date: '2/1/2564',
          time: '10:00 - 11:00',
          status: 'อนุมัติ',
        },
        {
          date: '3/1/2564',
          time: '10:00 - 11:00',
          status: 'ไม่อนุมัติ',
        },
        {
          date: '4/1/2564',
          time: '10:00 - 11:00',
          status: 'รออนุมัติ',
        },
      ],

      favoriteHeaders: [
        {
          text: 'รหัสพาหนะ',
          align: 'center',
          sortable: false,
          value: 'id',
          width: '15%',
          class: 'text-center',
        },

        {
          text: 'ชื่อ',
          value: 'name',
          width: '65%',
          class: 'text-center',
        },

        {
          text: 'ดำเนินการ',
          value: 'action',
          align: 'center',
          sortable: false,
        },
      ],
    }
  },
  methods: {
    getColor(status) {
      switch (status) {
        case 'รออนุมัติ':
          return 'purple accent-3'
        case 'อนุมัติ':
          return 'green accent-4'
        case 'ไม่อนุมัติ':
          return 'red accent-3'
        default:
          return 'black'
      }
    },

    async booking(car) {
      await this.$store.dispatch('Car/setSelectedCar', car)
      this.$router.push('/user/bookcar/detail')
    },

    toggleFavorite(car) {
      this.$store.dispatch('Car/toggleFavorite', car)
    },
  },

  computed: {
    favoriteCars() {
      return this.$store.getters['Car/getFavoriteCars']
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

#myQR {
  margin-left: 25%;
  background-color: transparent;
}
</style>
