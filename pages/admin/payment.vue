<template>
  <div>
    <div class="d-flex">
      <v-icon class="mr-3 mb-2" size="35" color="primary">
        mdi-credit-card
      </v-icon>
      <h1>ตรวจสอบยอดชำระค่าปรับ</h1>
    </div>
    <v-divider></v-divider>
  </div>
</template>
<script>
export default {
  asyncData({ store }) {
    store.dispatch('Auth/setAuthTrue')
  },
}
</script>
<style lang="scss"></style>
