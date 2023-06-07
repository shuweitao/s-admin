<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建角色' : '编辑角色'"
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
          <el-form-item label="名称" prop="name" required>
            <el-input
              :disabled="!isNewRef"
              v-model="formData.name"
              placeholder="请输入名称"
            />
          </el-form-item>

          <el-form-item label="备注" prop="description">
            <el-input v-model="formData.description" placeholder="请输入备注" />
          </el-form-item>

          <el-form-item label="管理员状态" prop="status">
            <el-switch v-model="formData.status" />
          </el-form-item>
          <el-form-item label="权限" prop="permissions">
            <el-tree
              ref="treeRef"
              :data="menus"
              show-checkbox
              node-key="id"
              :default-expand-all="true"
              :props="treeProps"
            />
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
import { nextTick, reactive, ref, shallowRef } from "vue";
import { ElMessage, ElTree, FormInstance } from "element-plus";
import { newRoleApi, editRoleApi, getMenuListApi } from "@/api/system";
// 定义事件
const emit = defineEmits(["getPageListData"]);

// 表单校验规则
const formRules = reactive({
  name: [{ required: true, message: "请输入名称", trigger: "blur" }],
});

// 1.定义内部的属性
const dialogVisible = ref(false);
const formData = reactive<any>({
  name: "",
  description: "",
  status: true,
  permissions: [],
});
const isNewRef = ref(true);
const editData = ref();

const treeProps = {
  children: "children",
  label: "name",
};
const menus = ref();

const treeRef = shallowRef<InstanceType<typeof ElTree>>();
// 获取所有选择的节点包括半选中节点
const getDeptAllCheckedKeys = () => {
  const checkedKeys = treeRef.value?.getCheckedKeys();
  const halfCheckedKeys = treeRef.value?.getHalfCheckedKeys()!;
  checkedKeys?.unshift.apply(checkedKeys, halfCheckedKeys);
  return checkedKeys;
};
const setDeptAllCheckedKeys = () => {
  formData.permissions.forEach((v: any) => {
    nextTick(() => {
      treeRef.value?.setChecked(v, true, false);
    });
  });
};

// 2.定义设置dialogVisible方法
async function setModalVisible(isNew: boolean = true, itemData?: any) {
  formRef.value?.resetFields();
  dialogVisible.value = true;
  isNewRef.value = isNew;

  // 获取所有权限
  const menuResult = await getMenuListApi();
  menus.value = menuResult.data;

  if (!isNew && itemData) {
    const itemDataTemp = JSON.parse(JSON.stringify(itemData));
    // 编辑数据
    for (const key in formData) {
      formData[key] = itemDataTemp[key];
    }
    formData.permissions = itemDataTemp.permissions.map((item: any) => item.id);
    setDeptAllCheckedKeys();
    formData.status = itemDataTemp.status == 1;
    editData.value = itemDataTemp;
  } else {
    // 新建数据
    for (const key in formData) {
      formData[key] = "";
    }
    formData.permissions = [];
    formData.status = true;
    editData.value = null;
  }
}

// 表单
const formRef = ref<FormInstance>();

// 3.点击了确定的逻辑
function handleConfirmClick() {
  const permissions = getDeptAllCheckedKeys();
  formRef.value!.validate(async (valid) => {
    if (valid) {
      const formDataTemp = JSON.parse(JSON.stringify(formData));
      formDataTemp.permissions = permissions;
      formDataTemp.status = formDataTemp.status ? 1 : 0;
      if (!isNewRef.value && editData.value) {
        // 编辑用户的数据
        await editRoleApi(editData.value.id, formDataTemp);
        dialogVisible.value = false;
        emit("getPageListData");
      } else {
        // 创建新的用户
        await newRoleApi(formDataTemp);
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
defineExpose({ setModalVisible });
</script>

<style lang="scss" scoped>
.form {
  padding: 0 20px;
}
</style>
