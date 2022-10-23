<template>
  <div class="mt-16">
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
            <v-card-title class="display-2">{{ bookCount }}</v-card-title>
            <v-card-title> การจองวันนี้ </v-card-title>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card
            class="pa-4 white--text d-flex flex-column align-center"
            color="info"
          >
            <v-card-title class="display-2"> {{ checkCount }}</v-card-title>
            <v-card-title> ตรวจสอบแล้ว </v-card-title>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card
            class="pa-4 white--text d-flex flex-column align-center"
            color="warning"
          >
            <v-card-title class="display-2">{{ uncheckCount }}</v-card-title>
            <v-card-title> ยังไม่ได้ตรวจสอบ </v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-btn block color="primary"> ดูรายการจอง </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn block color="green accent-4" class="white--text">
            ประวัติการจอง
          </v-btn>
        </v-col>
      </v-row>
      <h2 class="mt-10">ค่าปรับ</h2>
      <v-divider class="mb-5"></v-divider>
      <v-row>
        <v-col cols="6">
          <v-card class="pa-4 d-flex white--text" color="#c90f30">
            <v-card-title> ยอดชำระค่าปรับ </v-card-title>
            <v-card-title class="mx-auto">{{ payCount }}</v-card-title>
            <v-card-title class="ml-auto">รายการ</v-card-title>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="pa-4 d-flex white--text" color="#c90f30">
            <v-card-title> ตรวจสอบแล้ว </v-card-title>
            <v-card-title class="mx-auto">{{ payCheckCount }}</v-card-title>
            <v-card-title class="ml-auto">รายการ</v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn block color="purple darken-2" class="white--text">
            ตรวจสอบยอดชำระเงิน
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name: 'index',

  data() {
    return {
      bookCount: 10,
      checkCount: 4,
      uncheckCount: 6,
      payCount: 3,
      payCheckCount: 2,
    }
  },
}
</script>
<style lang="scss"></style>
