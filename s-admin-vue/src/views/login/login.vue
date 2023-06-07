<template>
  <div class="flex flex_justify_center login_main w_100 h_100">
    <account></account>
  </div>
</template>
<script setup lang="ts">
import Account from "@/views/login/c-cpns/account.vue";

</script>
<style lang="scss" scoped>
.login_main {
  background: url("../../assets/imgs/login_bg.svg");

}
</style>
