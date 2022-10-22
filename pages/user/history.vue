<template>
  <div class="mt-16">
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
              @click=""
              :disabled="item.status == 'รออนุมัติ'"
            >
              <v-icon>mdi-book-search</v-icon>
            </v-btn>
          </template>
          <span>ดูรายละเอียด</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'history',
  asyncData({ store }) {
    store.dispatch('Auth/setAuthTrue')
  },
  data() {
    return {
      search: '',
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

      history: [
        {
          date: '12/12/2020',
          time: '09:30',
          car: 'รถ 1',
          status: 'รออนุมัติ',
        },
        {
          date: '12/12/2020',
          time: '09:30',
          car: 'รถ 1',
          status: 'ไม่อนุมัติ',
        },
        {
          date: '12/12/2020',
          time: '09:30',
          car: 'รถ 1',
          status: 'อนุมัติ',
        },
      ],
    }
  },
}
</script>

<style scoped></style>
