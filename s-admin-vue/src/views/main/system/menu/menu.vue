<template>
  <div class="table-box">
    <page-content
      ref="contentRef"
      :content-config="contentConfig"
      :page-list="pageList"
      :show-pagination="false"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
      @del-click="handleDelClick"
      @get-page-list-data="getPageListData"
    >
      <template #type="scope">
        <div v-if="scope.row.type == 'M'">目录</div>
        <div v-if="scope.row.type == 'C'">菜单</div>
        <div v-if="scope.row.type == 'A'">按钮</div>
      </template>

      <template #hidden="scope">
        {{ scope.row.hidden ? "隐藏" : "显示" }}
      </template>

      <template #status="scope">
        <el-tag size="small" :type="scope.row.status ? '' : 'danger'">
          {{ scope.row.status == 1 ? "启用" : "禁用" }}
        </el-tag>
      </template>
    </page-content>
    <page-modal ref="modalRef" @get-page-list-data="getPageListData" />
  </div>
</template>

<script setup lang="ts">
import PageContent from "@/components/page-content/page-content.vue";
import PageModal from "./c-cpns/page-modal.vue";
import contentConfig from "./config/content.config";
import { ref } from "vue";
import { getMenuListApi, deleteRoleApi, deleteMenuApi } from "@/api/system";

const pageList = ref([]);

const getPageListData = async (params?: any) => {
  const pageListResult = await getMenuListApi(params);
  pageList.value = pageListResult.data;
};

// 对modal组件的操作
const modalRef = ref<InstanceType<typeof PageModal>>();

const handleNewClick = () => {
  modalRef.value?.setModalVisible();
};
const handleEditClick = (itemData: any) => {
  modalRef.value?.setModalVisible(false, itemData);
};

const handleDelClick = async (id: number) => {
  await deleteMenuApi(id);
  getPageListData();
};
</script>

<style lang="scss" scoped></style>
