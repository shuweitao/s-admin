<template>
  <div>
    <el-breadcrumb separator-icon="ArrowRight">
      <transition-group name="breadcrumb">
        <template v-for="item in breadcrumbs" :key="item.name">
          <el-breadcrumb-item :to="item.path">
            {{ item.name }}
          </el-breadcrumb-item>
        </template>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import useLoginStore from "@/store/login/login";
import { mapPathToBreadcrumbs } from "@/utils/map-menus";

const route = useRoute();
const userMenus = useLoginStore().userMenus;
const breadcrumbs = computed(() => {
  return mapPathToBreadcrumbs(route.path, userMenus);
});
</script>

<style lang="scss" scoped>
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.3s;
  opacity: 0;
  transform: translateX(20px);
}
</style>
