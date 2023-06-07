<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建栏目' : '编辑栏目'"
      width="35%"
    >
      <div class="form">
        <el-form
          ref="formRef"
          :model="formData"
          :rules="formRules"
          label-width="100px"
          size="large"
        >
          <el-form-item label="栏目名称" prop="title" required>
            <el-input
              v-model="formData.title"
              placeholder="请输入栏目名称"
              clearable
            />
          </el-form-item>


          <el-form-item label="状态" prop="status">
            <el-switch v-model="formData.status"/>
          </el-form-item>

          <el-form-item label="菜单排序" prop="sort">
            <div>
              <el-input-number v-model="formData.sort" :min="0" :max="9999"/>
              <div class="form-tips">数值越大越排前</div>
            </div>
          </el-form-item>

        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { editCategoryApi, newCategoryApi } from "@/api/article";
// 定义事件
const emit = defineEmits(["getPageListData"]);

// 表单校验规则
const formRules = reactive({
  title: [{required: true, message: "请输入栏目名称", trigger: "blur"}],
});

// 1.定义内部的属性
const dialogVisible = ref(false);
const formData = reactive<any>({
  title: "",
  sort: 0,
  status: true,
});
const isNewRef = ref(true);
const editData = ref();

// 2.定义设置dialogVisible方法
async function setModalVisible(isNew: boolean = true, itemData?: any) {
  formRef.value?.resetFields();
  dialogVisible.value = true;
  isNewRef.value = isNew;

  if (!isNew && itemData) {
    const itemDataTemp = JSON.parse(JSON.stringify(itemData));
    // 编辑数据
    for (const key in formData) {
      formData[key] = itemDataTemp[key];
    }
    formData.status = itemDataTemp.status == 1;
    editData.value = itemDataTemp;
  } else {
    // 新建数据
    formData.title = "";
    formData.sort = 0;
    formData.status = true;
    editData.value = null;
  }
}

// 表单
const formRef = ref<FormInstance>();

// 3.点击了确定的逻辑
function handleConfirmClick() {
  formRef.value!.validate(async (valid) => {
    if (valid) {
      const formDataTemp = JSON.parse(JSON.stringify(formData));
      formDataTemp.status = formDataTemp.status ? 1 : 0;
      if (!isNewRef.value && editData.value) {
        // 编辑用户的数据
        await editCategoryApi(editData.value.id, formDataTemp);
        dialogVisible.value = false;
        emit("getPageListData");
      } else {
        // 创建新的用户
        await newCategoryApi(formDataTemp);
        dialogVisible.value = false;
        emit("getPageListData");
      }
    } else {
      ElMessage.error("Oops, 请您输入正确的格式后再操作~~.");
      return false;
    }
  });
}

// 暴露的属性和方法
defineExpose({setModalVisible});
</script>

<style lang="scss" scoped>
.form {
  padding: 0 20px;
}
</style>
