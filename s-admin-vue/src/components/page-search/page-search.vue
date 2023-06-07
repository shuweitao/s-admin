<template>
  <div class="card mb_10">
    <el-form
      :model="searchForm"
      ref="formRef"
      :label-width="searchConfig.labelWidth ?? '80px'"
    >
      <el-row>
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-form-item :label="item.label" :prop="item.prop">
            <template v-if="item.type === 'input'">
              <el-input
                v-model="searchForm[item.prop]"
                :placeholder="item.placeholder"
              />
            </template>

            <template v-else-if="item.type === 'date-picker'">
              <el-date-picker
                v-model="searchForm[item.prop]"
                type="daterange"
                range-separator="-"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              />
            </template>

            <template v-else-if="item.type === 'select'">
              <el-select
                v-model="searchForm[item.prop]"
                :placeholder="item.placeholder"
                style="width: 100%"
              >
                <template v-for="option in item.options" :key="option.value">
                  <el-option :label="option.label" :value="option.value"/>
                </template>
              </el-select>
            </template>
          </el-form-item>
        </template>

        <!-- 2.重置和搜索的按钮 -->
        <div class="btns">
          <el-button icon="Search" type="primary" @click="handleQueryClick"
          >查询
          </el-button
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

interface IProp {
  searchConfig: {
    labelWidth?: string;
    formItems: any[];
  };
}

const props = defineProps<IProp>();
// 定义自定义事件
const emit = defineEmits(["queryClick", "resetClick"]);

// 定义form的数据
const initialForm: any = {};
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.defaultValue ?? "";
}
const searchForm = reactive(initialForm);

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
const handleExportClick = () => {
};
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
