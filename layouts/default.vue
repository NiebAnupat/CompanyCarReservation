<template>
  <v-app>
    <v-app-bar
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
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary app>
      <v-list-item class="my-3">
        <v-list-item-avatar>
          <v-img :src="user.avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ user.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="item in userItems"
          :key="item.title"
          link
          v-on:click="item.action"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-container>
      <Nuxt />
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',

  // async asyncData({ store }) {
  //   isAuth = await store.getters['Auth/isAuth']
  // },

  computed: {
    isAuth() {
      return this.$store.getters['Auth/isAuth']
    },
  },

  data() {
    return {
      drawer: false,
      user: {
        name: 'ผู้ใช้งาน เว็บไซต์',
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
          title: 'ประวัติการจอง',
          icon: 'mdi-history',
          action: () => this.$router.push('/user/history'),
        },
        {
          title: 'ชำระเงิน',
          icon: 'mdi-credit-card',
          action: () => this.$router.push('/user/payment'),
        },
        {
          title: 'ออกจากระบบ',
          icon: 'mdi-logout',
          action: () => this.$router.push('/'),
        },
      ],

      adminItems: [
        {
          title: 'หน้าหลัก',
          icon: 'mdi-view-dashboard',
          action: () => this.$router.push('/admin'),
        },
        {
          title: 'อนุมัติการจอง',
          icon: 'mdi-car',
          action: () => this.$router.push('/admin/bookcar'),
        },
        {
          title: 'จัดการข้อมูลรถ',
          icon: 'mdi-car',
          action: () => this.$router.push('/admin/managecar'),
        },
        {
          title: 'อนุมัติการชำระเงิน',
          icon: 'mdi-credit-card',
          action: () => this.$router.push('/admin/payment'),
        },
        {
          title: 'ออกจากระบบ',
          icon: 'mdi-logout',
          action: () => this.$router.push('/'),
        },
      ],
    }
  },

  methods: {
    visibleDrawer() {
      this.$store.dispatch('setDrawerVisible')
    },
  },
}
</script>

<style lang="scss">
#appBar {
  background-color: #2c3639;
}
</style>
