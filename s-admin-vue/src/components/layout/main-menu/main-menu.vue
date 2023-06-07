<template>
  <logo></logo>
  <el-menu
    :default-active="defaultActive"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
  >
    <template v-for="(item, index) in userMenus" :key="index">
      <template v-if="item.name === 'home'">
        <el-menu-item
          v-if="!item.hidden"
          :index="item.name"
          @click="handleItemClick(item)"
        >
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
          <template #title>{{ item.meta?.title }}</template>
        </el-menu-item>
      </template>
      <template v-else>
        <el-sub-menu :index="item.id + ''" v-if="!item.hidden">
          <template #title>
            <!-- 字符串: el-icon-monitor => 组件 component动态组件 -->
            <el-icon>
              <component :is="item.icon" />
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <template
            v-for="(subItem, subIndex) in item.children"
            :key="subItem.id"
          >
            <el-menu-item
              v-if="!subItem.hidden"
              :index="subItem.id + ''"
              @click="handleItemClick(subItem)"
              >{{ subItem.name }}
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </template>
  </el-menu>
  <!--
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon>
            <location/>
          </el-icon>
          <span>系统总览</span>
        </template>
        <el-menu-item index="1-1">核心技术</el-menu-item>
        <el-menu-item index="1-2">商品统计</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="2">
        <template #title>
          <el-icon>
            <location/>
          </el-icon>
          <span>系统管理</span>
        </template>
        <el-menu-item index="2-1">用户管理</el-menu-item>
        <el-menu-item index="2-2">部门管理</el-menu-item>
        <el-menu-item index="2-3">菜单管理</el-menu-item>
        <el-menu-item index="2-4">角色管理</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="3">
        <template #title>
          <el-icon>
            <location/>
          </el-icon>
          <span>商品中心</span>
        </template>
        <el-menu-item index="3-1">商品类别</el-menu-item>
        <el-menu-item index="3-2">商品信息</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="4">
        <template #title>
          <el-icon>
            <location/>
          </el-icon>
          <span>随便聊聊</span>
        </template>
        <el-menu-item index="4-1">你的故事</el-menu-item>
        <el-menu-item index="4-2">故事列表</el-menu-item>
      </el-sub-menu>

    </el-menu>
  -->
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import Logo from "./logo.vue";
import useLoginStore from "@/store/login/login";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import useCollapse from "@/components/layout/main-header/hooks/use-collapse";
import router from "@/router";
import { mapPathToMenu } from "@/utils/map-menus";
import { useRoute } from "vue-router";

const [isCollapse] = useCollapse();

const handleItemClick = (item: Record<string, any>) => {
  router.push(item.path);
};

const loginStore = useLoginStore();
const userMenus = ref(loginStore.userMenus);

const route = useRoute();
const defaultActive = computed(() => {
  if (route.name === "home") {
    return route.name;
  }
  const pathMenu = mapPathToMenu(route.path, loginStore.userMenus);
  return pathMenu.id + "";
});
</script>

<style></style>
