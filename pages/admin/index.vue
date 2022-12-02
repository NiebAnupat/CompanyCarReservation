<template>
  <div>
    <div class="d-flex">
      <v-icon class="mr-3 mb-2" size="35" color="#2c3639">
        mdi-monitor-dashboard
      </v-icon>
      <h1>หน้าหลัก</h1>
    </div>
    <v-divider></v-divider>
    <v-container>
      <h2 class="mt-2">จองรถ</h2>
      <v-divider></v-divider>
      <v-row class="mt-1">
        <v-col cols="4">
          <v-card
            class="pa-4 white--text d-flex flex-column align-center"
            color="#2c3639"
          >
            <v-card-title class="display-2">{{ todayCount }}</v-card-title>
            <v-card-title> การจองวันนี้</v-card-title>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card
            class="pa-4 white--text d-flex flex-column align-center"
            color="info"
          >
            <v-card-title class="display-2"> {{ checkCount }}</v-card-title>
            <v-card-title> ตรวจสอบแล้ว</v-card-title>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card
            class="pa-4 white--text d-flex flex-column align-center"
            color="warning"
          >
            <v-card-title class="display-2">{{ pendingCount }}</v-card-title>
            <v-card-title> ยังไม่ได้ตรวจสอบ</v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-btn block color="primary" @click="navigateBookCar">
            ดูรายการจอง
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn
            block
            color="green accent-4"
            class="white--text"
            @click="navigateReport"
          >
            รายงานการใช้งาน
          </v-btn>
        </v-col>
      </v-row>
      <h2 class="mt-10">ค่าปรับ</h2>
      <v-divider class="mb-5"></v-divider>
      <v-row>
        <v-col cols="6">
          <v-card class="pa-4 d-flex white--text" color="#c90f30">
            <v-card-title> ยอดชำระค่าปรับ</v-card-title>
            <v-card-title class="mx-auto">{{ payCount }}</v-card-title>
            <v-card-title class="ml-auto">รายการ</v-card-title>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="pa-4 d-flex white--text" color="deep-orange darken-1">
            <v-card-title> ตรวจสอบแล้ว</v-card-title>
            <v-card-title class="mx-auto">{{ payCheckCount }}</v-card-title>
            <v-card-title class="ml-auto">รายการ</v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn
            block
            color="purple darken-2"
            class="white--text"
            @click="navigatePayment"
          >
            ตรวจสอบยอดชำระ
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name : 'index',
  async asyncData( { store, $axios } ) {
    store.dispatch( 'Auth/setAuthTrue' )
    store.dispatch( 'Auth/setAdminTrue' )

    const todayCount = await $axios.$get( '/reservation/count/today' )

    const checkCount = await $axios.$get( '/reservation/count/today/check' )

    const pendingCount = await $axios.$get( '/reservation/count/today/pending' )

    const payCount = await $axios.$get( '/payment/count/today' )

    const payCheckCount = await $axios.$get( '/payment/count/today/checked' )

    return { todayCount, checkCount, pendingCount, payCount, payCheckCount }

  },

  data() {
    return {}
  },

  methods : {
    navigateBookCar() {
      this.$router.push( '/admin/bookcar' )
    },

    navigatePayment() {
      this.$router.push( '/admin/payment' )
    },

    navigateReport() {
      this.$router.push( '/admin/report' )
    },
  },
}
</script>
<style lang="scss"></style>
