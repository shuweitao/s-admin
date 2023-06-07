<template>
  <div class="common-layout h_100">
    <el-container class="h_100">
      <el-aside :class="{ collapse: isCollapse }">
        <main-menu/>
      </el-aside>
      <el-container>
        <el-header height="90px">
          <main-header/>
        </el-header>
        <el-main>
          <router-view v-slot="{ Component, route }">
            <transition appear name="fade-transform" mode="out-in">
              <keep-alive :include="cachedViews">
                <component :is="Component" :key="route.fullPath"/>
              </keep-alive>
            </transition>
          </router-view>
        </el-main>
        <el-footer> 2023 © S-Admin By 尼克 Technology.</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MainMenu from "@/components/layout/main-menu/main-menu.vue";
import MainHeader from "@/components/layout/main-header/main-header.vue";
import useCollapse from "@/components/layout/main-header/hooks/use-collapse";
import useTagsViewStore from "@/store/layout/tags-view";

const [isCollapse] = useCollapse();
const tagsViewStore = useTagsViewStore();
const cachedViews = tagsViewStore.cachedViews;
</script>

<style lang="scss" scoped>
.el-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
}

.el-header {
  padding: 0 !important;
}

.el-main {
  box-sizing: border-box;
  padding: 10px 12px;
  overflow-x: hidden;
  background-color: #f0f2f5;
}
</style>
