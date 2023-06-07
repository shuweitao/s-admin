<template>
  <div class="card table-main content">
    <div class="header">
      <div class="title">{{ contentConfig?.header?.title ?? "数据列表" }}</div>
      <el-button type="primary" @click="handleNewUserClick">{{
        contentConfig?.header?.btnTitle ?? "新建数据"
      }}</el-button>
    </div>
    <el-table :data="pageList" border v-bind="contentConfig.childrenTree">
      <template v-for="item in contentConfig.propsList" :key="item.prop">
        <template v-if="item.type === 'timer'">
          <el-table-column v-bind="item">
            <template #default="scope">
              {{ formatUTC(scope.row[item.prop]) }}
            </template>
          </el-table-column>
        </template>

        <template v-else-if="item.type === 'handler'">
          <el-table-column v-bind="item">
            <template #default="scope">
              <el-button
                size="small"
                icon="Edit"
                type="primary"
                text
                @click="handleEditBtnClick(scope.row)"
              >
                编辑
              </el-button>
              <el-button
                size="small"
                icon="Delete"
                type="danger"
                text
                @click="handleDeleteBtnClick(scope.row.id)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </template>

        <template v-else-if="item.type === 'custom'">
          <el-table-column align="center" v-bind="item">
            <template #default="scope">
              <slot :name="item.slotName" v-bind="scope" :prop="item.prop">
              </slot>
            </template>
          </el-table-column>
        </template>

        <template v-else>
          <el-table-column v-bind="item" />
        </template>
      </template>
    </el-table>

    <div class="pagination" v-if="showPagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 50, 100]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import useSystemStore from "@/store/main/system/system";
import { formatUTC } from "@/utils/format";
import { ref } from "vue";

interface IProps {
  contentConfig: {
    pageName: string;
    header?: {
      title?: string;
      btnTitle?: string;
    };
    propsList: any;
    childrenTree?: any;
  };
  pageList: any[];
  pageTotalCount?: number;
  showPagination?: boolean;
  childrenTree?: any;
}

const props = defineProps<IProps>();
// 定义事件
const emit = defineEmits([
  "getPageListData",
  "newClick",
  "editClick",
  "delClick",
]);

const currentPage = ref(1);
const pageSize = ref(10);
// 1.发起action，请求pageList的数据
const systemStore = useSystemStore();
fetchPageListData();

// 2.获取pageList数据,进行展示
// const { pageList, pageTotalCount } = storeToRefs(systemStore);

const handleSizeChange = () => {
  fetchPageListData();
};
const handleCurrentChange = () => {
  fetchPageListData();
};

function fetchPageListData(formData: any = {}) {
  // 1.获取offset/size
  const pageInfo = {
    page: currentPage.value,
    pageSize: pageSize.value,
  };
  // 2.发起网络请求
  const params = { ...formData, ...pageInfo };
  emit("getPageListData", params);
}

// 5.删除/新建/编辑的操作
function handleDeleteBtnClick(id: number) {
  // systemStore.deletePageByIdAction(props.contentConfig.pageName, id);
  emit("delClick", id);
}

function handleNewUserClick() {
  emit("newClick");
}

function handleEditBtnClick(itemData: any) {
  emit("editClick", itemData);
}

// 将方法暴露出去给ref调用
defineExpose({ fetchPageListData });
</script>

<style lang="scss" scoped>
.content {
  background-color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  .title {
    font-size: 18px;
    font-weight: bold;
  }
}

.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }

  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
