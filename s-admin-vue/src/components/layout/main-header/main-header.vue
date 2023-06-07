<template>
  <div class="main-header">
    <header-collapse></header-collapse>
    <div class="content">
      <header-crumb/>
      <header-info/>
    </div>
  </div>
  <header-visited-views/>
</template>

<script setup lang="ts">
import HeaderCollapse from "@/components/layout/main-header/c-cpns/header-collapse.vue";
import HeaderCrumb from "@/components/layout/main-header/c-cpns/header-crumb.vue";
import HeaderInfo from "@/components/layout/main-header/c-cpns/header-info.vue";
import HeaderVisitedViews from "@/components/layout/main-header/c-cpns/header-visited-views.vue";

</script>

<style lang="scss" scoped>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 50px;
  padding-left: 15px;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
