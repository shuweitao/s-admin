<template>
  <div class="card">
    <el-form :model="searchForm" ref="formRef" label-width="100px">
      <el-row>
        <el-form-item label="管理员账号" prop="account">
          <el-input
            v-model="searchForm.account"
            placeholder="请输入"
            clearable
          />
        </el-form-item>
        <el-form-item label="管理员名称" prop="username">
          <el-input
            v-model="searchForm.username"
            placeholder="请输入"
            clearable
          />
        </el-form-item>

        <el-form-item label="管理员角色" prop="status">
          <el-select v-model="searchForm.roles" placeholder="请选择" clearable>
            <el-option label="全部" value="" />
            <el-option
              v-for="item in mainStore.entireRoles"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="searchForm.status" placeholder="请选择">
            <el-option label="启用" :value="1" />
            <el-option label="禁用" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间" prop="created_at">
          <el-date-picker
            v-model="searchForm.created_at"
            type="datetimerange"
            range-separator="-"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        </el-form-item>
        <!-- 2.重置和搜索的按钮 -->
        <div class="btns">
          <el-button icon="Search" type="primary" @click="handleQueryClick"
            >查询</el-button
          >
          <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
          <el-button icon="Files" @click="handleExportClick">导出</el-button>
        </div>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { FormInstance } from "element-plus";
import useMainStore from "@/store/main/main";

const mainStore = useMainStore();
// 定义自定义事件
const emit = defineEmits(["queryClick", "resetClick"]);

// 定义form的数据
const searchForm = reactive({
  account: "",
  username: "",
  status: 1,
  roles: "",
  created_at: "",
});

const formRef = ref<FormInstance>();

const handleResetClick = () => {
  // 1.form中的数据全部重置
  formRef.value?.resetFields();
  // 2.将事件出去, content内部重新发送网络请求
  emit("resetClick");
};

const handleQueryClick = () => {
  emit("queryClick", searchForm);
};
const handleExportClick = () => {};
</script>

<style lang="scss" scoped>
.el-form-item {
  padding: 0 0 20px 0;
  margin-bottom: 0;
}

.btns {
  text-align: right;
  padding-left: 50px;
}
</style>
