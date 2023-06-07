<template>
  <div class="table-box">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
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
      <template #image="scope">
        <el-image :src="scope.row.image"></el-image>
      </template>
    </page-content>
  </div>
</template>

<script setup lang="ts">
import PageContent from "@/components/page-content/page-content.vue";
import PageSearch from "@/components/page-search/page-search.vue";
import searchConfig from "./config/search.config";
import contentConfig from "./config/content.config";
import { ref } from "vue";
import { getArticleListApi, deleteArticleApi } from "@/api/article";
import UserContent from "@/views/main/system/user/c-cpns/user-content.vue";
import router from "@/router";

const pageList = ref([]);
const pageTotalCount = ref(0);

const getPageListData = async (params?: any) => {
  const pageListResult = await getArticleListApi(params);
  const {list} = pageListResult.data;
  pageTotalCount.value = pageListResult.data.page_info.total_count;
  pageList.value = list;
};
// 对content组件的操作
const contentRef = ref<InstanceType<typeof UserContent>>();
const handleQueryClick = (formData: any) => {
  contentRef.value?.fetchPageListData(formData);
};

const handleResetClick = () => {
  contentRef.value?.fetchPageListData();
};


const handleNewClick = () => {
  router.push({
    name: 'edit'
  })
};
const handleEditClick = (itemData: any) => {
  router.push({
    name: 'edit',
    query: {id: itemData.id}
  })
};

const handleDelClick = async (id: number) => {
  await deleteArticleApi(id);
  getPageListData();
};
</script>

<style lang="scss" scoped></style>
