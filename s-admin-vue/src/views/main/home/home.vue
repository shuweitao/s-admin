<template>
  <div class="page">
    <h2>前端技术栈：</h2>
    <div class="item">编程语言：typescript 4.x + JavaScript</div>
    <div class="item">构建工具：Vite 4.x</div>
    <div class="item">前端框架：Vue 3.x + setup</div>
    <div class="item">路由工具：Vue Router 4.x</div>
    <div class="item">状态管理：Pinia 2.x</div>
    <div class="item">UI 框架：Element Plus 2.x</div>
    <div class="item">CSS 预编译：Sass</div>
    <div class="item">HTTP 工具：Axios</div>

    <h2>后端技术栈：</h2>
    <div class="item">编程语言：NestJs + Prisma + typescript 4.x + JavaScript</div>
    <div class="item">数据持久化：MySql + Redis</div>

  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const a = ref(0);
</script>

<style scoped lang="scss">
.item {
  margin-left: 20px;
  font-size: 18px;
  line-height: 26px;
}
</style>
