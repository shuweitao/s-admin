<template>
  <div class="table-box">
    <page-content
      ref="contentRef"
      :content-config="contentConfig"
      :page-list="pageList"
      :page-total-count="pageTotalCount"
      :show-pagination="true"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
      @del-click="handleDelClick"
      @get-page-list-data="getPageListData"
    >
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
import { getRoleListApi, deleteRoleApi } from "@/api/system";

const pageList = ref([]);
const pageTotalCount = ref(0);

const getPageListData = async (params?: any) => {
  const pageListResult = await getRoleListApi(params);
  const { list } = pageListResult.data;
  pageTotalCount.value = pageListResult.data.page_info.total_count;
  pageList.value = list;
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
  await deleteRoleApi(id);
  getPageListData();
};
</script>

<style lang="scss" scoped></style>
