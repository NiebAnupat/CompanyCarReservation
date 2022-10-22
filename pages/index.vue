<template>
  <v-row class="mb-0 mt-0 mx-n16" id="pane">
    <v-col cols="8" class="rounded-xl" id="leftSide">
      <div class="">
        <div class="white--text text-h3 text-center" style="margin-top: 16vh">
          เว็บไซต์จองใช้งานรถส่วนกลาง
        </div>
        <div class="text-center">
          <img src="~/assets/img/CarIcon.png" alt="" id="car" />
        </div>
      </div>
    </v-col>
    <v-col cols="4" class="d-flex" id="loginPane">
      <div id="loginBox" class="align-self-center">
        <div class="text-center text-h5">รหัสพนักงาน</div>
        <v-text-field
          v-model="username"
          label="รหัสพนักงาน"
          autofocus
          outlined
          dense
          class="mt-4"
          prepend-inner-icon="mdi-account-tie"
          @keydown.enter="login"
        ></v-text-field>

        <div class="text-center text-h5">หมายเลขบัตรประชาชน</div>
        <v-text-field
          v-model="password"
          label="หมายเลขบัตรประชาชน"
          type="password"
          autofocus
          outlined
          dense
          class="mt-4"
          prepend-inner-icon="mdi-card-account-details"
          @keydown.enter="login"
        ></v-text-field>

        <v-btn
          class="mt-4 white--text"
          color="#3F4E4F"
          block
          x-large
          v-on:click="login"
        >
          <v-icon class="mr-2">mdi-location-enter</v-icon>
          เข้าสู่ระบบ</v-btn
        >
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Index',
  layout: 'default',

  asyncData({ store }) {
    store.dispatch('Auth/setAuthFalse')
  },

  data() {
    return {
      title: 'Vuetify.js',
      username: '',
      password: '',
    }
  },
  methods: {
    async login() {
      await this.$store.dispatch('Auth/setAuthTrue')
      if (this.username == 'admin') this.$router.push('admin/')
      else this.$router.push('user/')
    },
  },
}
</script>

<style scoped>
#pane {
  height: 95vh;
}

#car {
  margin-top: 10vh;
  width: 450px;
  height: 400px;
}

#leftSide {
  background-color: #2c3639;
}

#loginPane {
  padding-left: 15vh;
}

#loginBox {
  width: 400px;
  height: 400px;
}
</style>
