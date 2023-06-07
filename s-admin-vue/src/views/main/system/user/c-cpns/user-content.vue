<template>
  <div class="card table-main content">
    <div class="header">
      <div class="title">用户列表</div>
      <el-button type="primary" @click="handleNewUserClick">新建用户</el-button>
    </div>
    <el-table :data="pageList" border>
      <!--      <el-table-column align="center" type="selection" width="50px"/>-->
      <el-table-column align="center" type="index" label="序号" width="60px" />

      <el-table-column
        align="center"
        label="账号"
        prop="account"
        width="150px"
      />
      <el-table-column
        align="center"
        label="名称"
        prop="username"
        width="150px"
      />
      <el-table-column align="center" label="角色" prop="roles" width="150px">
        <template #default="scope">
          <el-tag size="small" v-for="item in scope.row.roles">
            {{ item.name }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" prop="status" width="100px">
        <template #default="scope">
          <el-tag size="small" :type="scope.row.status ? '' : 'danger'">
            {{ scope.row.status == 1 ? "启用" : "禁用" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" prop="created_at">
        <template #default="scope">
          {{ formatUTC(scope.row.created_at) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="更新时间" prop="updated_at">
        <template #default="scope">
          {{ formatUTC(scope.row.updated_at) }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="180px">
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
    </el-table>

    <div class="pagination">
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
import useMainStore from "@/store/main/main";
import { formatUTC } from "@/utils/format";
import { ref } from "vue";

// 定义事件
const emit = defineEmits(["newClick", "editClick"]);

const currentPage = ref(1);
const pageSize = ref(10);
// 1.发起action，请求pageList的数据
const systemStore = useSystemStore();
const mainStore = useMainStore();
fetchPageListData();

// 2.获取pageList数据,进行展示
const { pageList, pageTotalCount } = storeToRefs(systemStore);

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
  systemStore.postPageListAction("user", params);
  mainStore.fetchEntireDataAction();
}

// 5.删除/新建/编辑的操作
function handleDeleteBtnClick(id: number) {
  systemStore.deletePageByIdAction("user", id);
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
  margin-top: 10px;
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
