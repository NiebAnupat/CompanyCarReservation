<template>
  <v-app>
    <!-- <v-app-bar
      app
      flat
      :value="isAuth"
      id="appBar"
      class="white--text rounded-b-lg"
    >
      <v-app-bar-nav-icon
        color="white"
        v-on:click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-icon size="35" color="white">mdi-van-passenger</v-icon>
        <span class="text-h5 ml-3">จองใช้งานรถส่วนกลาง</span></v-toolbar-title
      >
    </v-app-bar> -->

    <v-navigation-drawer
      v-model="drawer"
      app
      expand-on-hover
      v-if="isAuth"
      color="#2C3639"
    >
      <v-list-item class="my-3 white--text">
        <v-list-item-avatar class="ml-n2">
          <v-img :src="isAdmin ? admin.avatar : user.avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{
            isAdmin ? admin.name : user.name
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider color="#fff"></v-divider>

      <v-list>
        <v-list-item
          v-for="item in isAdmin ? adminItems : userItems"
          :key="item.title"
          link
          v-on:click="item.action"
          class="white--text"
        >
          <v-list-item-icon>
            <v-icon color="#fff">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-list>
          <v-list-item link v-on:click="logout" class="red--text lighten-1">
            <v-list-item-icon>
              <v-icon color="red lighten-1">mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>ออกจากระบบ</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-container class="ma-auto" style="height: 95%">
      <Nuxt class="ml-10 pb-5" />
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',

  async asyncData({ store }) {
    const isAuth = await store.getters['Auth/isAuth']
    const isAdmin = await store.getters['Auth/isAdmin']

    return { isAuth, isAdmin }
  },

  computed: {
    isAuth() {
      return this.$store.getters['Auth/isAuth']
    },

    isAdmin() {
      return this.$store.getters['Auth/isAdmin']
    },
  },

  data() {
    return {
      drawer: false,
      user: {
        name: 'ผู้ใช้งาน เว็บไซต์',
        avatar: 'https://ui-avatars.com/api/background=random',
      },

      admin: {
        name: 'ผู้ดูแล ระบบ',
        avatar: 'https://ui-avatars.com/api/background=random',
      },

      userItems: [
        {
          title: 'หน้าหลัก',
          icon: 'mdi-monitor-dashboard',
          action: () => this.$router.push('/user'),
        },
        {
          title: 'จองใช้งานรถ',
          icon: 'mdi-car',
          action: () => this.$router.push('/user/bookcar'),
        },
        {
          title: 'คืนรถ',
          icon: 'mdi-car-arrow-right',
          action: () => this.$router.push('/user/returncar'),
        },
        {
          title: 'ประวัติการจอง',
          icon: 'mdi-history',
          action: () => this.$router.push('/user/history'),
        },
        {
          title: 'ชำระเงิน',
          icon: 'mdi-credit-card',
          action: () => this.$router.push('/user/payment'),
        },
      ],

      adminItems: [
        {
          title: 'หน้าหลัก',
          icon: 'mdi-view-dashboard',
          action: () => this.$router.push('/admin'),
        },
        {
          title: 'ตรวจสอบการจอง',
          icon: 'mdi-book-check',
          action: () => this.$router.push('/admin/bookcar'),
        },
        {
          title: 'จัดการข้อมูลรถ',
          icon: 'mdi-car',
          action: () => this.$router.push('/admin/managecar'),
        },
        {
          title: 'ตรวจสอบการคืนรถ',
          icon: 'mdi-car-arrow-right',
          action: () => this.$router.push('/admin/returncar'),
        },
        {
          title: 'ตรวจสอบการชำระเงิน',
          icon: 'mdi-credit-card',
          action: () => this.$router.push('/admin/payment'),
        },
        {
          title: 'รายงานการใช้งานรถ',
          icon: 'mdi-chart-bar',
          action: () => this.$router.push('/admin/report'),
        },
      ],
    }
  },

  methods: {
    logout() {
      this.$store.dispatch('Auth/setAdminFalse')
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss">
#appBar {
  background-color: #2c3639;
}
</style>
