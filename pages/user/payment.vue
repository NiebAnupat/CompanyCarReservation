<template>
  <div>
    <div class="d-flex">
      <v-icon class="mr-3" size="35" color="#1F5078">
        mdi-account-credit-card
      </v-icon>
      <h1>ชำระเงิน</h1>
    </div>
    <v-divider class=""></v-divider>

    <v-dialog v-model="submitDialog" persistent width="330">
      <v-card class="pa-1">
        <v-card-title class="text-h5"> ยืนยันชำระเงิน </v-card-title>
        <v-card-text> เมื่อยืนยันแล้วจะไม่สามารถแก้ไขข้อมูลได้อีก </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="submitDialog = false">
            ยกเลิก
          </v-btn>
          <v-btn color="primary" text @click="submit"> ยืนยัน </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row class="mt-3">
      <v-col cols="4" class="">
        <v-card class="pa-3 d-flex justify-center"
          ><img src="~/assets/img/my_qr.png" height="450"
        /></v-card>
      </v-col>
      <v-col cols="8" class="">
        <v-card>
          <v-card-title> รายละเอียดการชำระเงิน</v-card-title>
          <v-card-text>
            <v-row cols="12">
              <v-col cols="6">
                <client-only>
                  <v-file-input
                    chips
                    counter
                    show-size
                    truncate-length="50"
                    accept="image/png, image/jpeg, image/bmp"
                    label="อัพโหลดหลักฐานการชำระเงิน"
                    v-model="payImg"
                  ></v-file-input>
                </client-only>
              </v-col>
              <v-col cols="6">
                <v-menu
                  ref="payTimeMenu"
                  v-model="payTimePicker"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="payTime"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="payTime"
                      label="เวลาที่ชำระเงิน"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="payTimePicker"
                    v-model="payTime"
                    full-width
                    format="24hr"
                    scrollable
                    color="#2c3639"
                    @click:minute="$refs.payTimeMenu.save(payTime)"
                  ></v-time-picker>
                </v-menu>
              </v-col>
            </v-row>

            <v-row cols="12">
              <v-col cols="6">
                <v-menu
                  v-model="payDateMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="payDate"
                      label="วันที่ชำระเงิน"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="payDate"
                    @input="payDatePicker = false"
                    scrollable
                    landscape
                    color="#2c3639"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="payAmount"
                  label="จำนวนเงินที่ชำระ"
                  prepend-icon="mdi-cash"
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row cols="12" class="mt-4 mx-3">
              <v-textarea
                color="#2c3639"
                label="หมายเหตุ"
                outlined
                placeholder="หมายเหตุ"
                v-model="payNote"
              ></v-textarea>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <span class="ml-5 subtitle-2 grey--text"
              >เมื่อชำระเงินแล้ว โปรดรอเจ้าหน้าที่ยืนยันข้อมูล</span
            >
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="submitDialog = true"
              >ยืนยัน</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  asyncData({ store }) {
    store.dispatch('Auth/setAuthTrue')
  },

  data() {
    return {
      submitDialog: false,
      payTimeMenu: false,
      payTime: null,
      payTimePicker: false,
      payDateMenu: false,
      payDate: null,
      payDatePicker: false,
      payAmount: null,
      payNote: null,
      payImg: null,
    }
  },

  methods: {
    async submit() {
      var form = new FormData()
      // combine time and date
      var payDateTime = new Date(
        this.payDate + ' ' + this.payTime
      ).toISOString()

      form.append('PM_TIME', payDateTime)
      form.append('PM_AMOUNT', this.payAmount)
      form.append('PM_NOTE', this.payNote)
      form.append('EM_ID', await this.$store.state.Auth.user.EM_ID)
      form.append('img', this.payImg)

      await this.$axios.post('/payment', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      this.$router.push('/')

      // this.$router.push('/dashboard')
    },
  },
}
</script>
<style lang="scss"></style>
