<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建用户' : '编辑用户'"
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
          <el-form-item label="账号" prop="account" required>
            <el-input
              :disabled="!isNewRef"
              v-model="formData.account"
              placeholder="请输入账号"
            />
          </el-form-item>
          <el-form-item label="名称" prop="username" required>
            <el-input v-model="formData.username" placeholder="请输入名称"/>
          </el-form-item>
          <el-form-item v-if="isNewRef" label="密码" prop="password" required>
            <el-input
              v-model="formData.password"
              placeholder="请输入密码"
              show-password
            />
          </el-form-item>
          <el-form-item
            v-if="isNewRef"
            label="确认密码"
            prop="password_confirm"
            required
          >
            <el-input
              v-model="formData.password_confirm"
              placeholder="请输入确认密码"
              show-password
            />
          </el-form-item>
          <el-form-item label="选择角色" prop="roles" required>
            <el-select
              multiple
              v-model="formData.roles"
              placeholder="请选择角色"
              style="width: 100%"
            >
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :label="item.name" :value="item.id"/>
              </template>
            </el-select>
          </el-form-item>

          <el-form-item label="管理员状态" prop="status">
            <el-switch v-model="formData.status"/>
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
import useMainStore from "@/store/main/main";
import { storeToRefs } from "pinia";
import useSystemStore from "@/store/main/system/system";
import { ElMessage, FormInstance } from "element-plus";
import useLoginStore from "@/store/login/login";

// 表单校验规则
const formRules = reactive({
  account: [{required: true, message: "请输入账号", trigger: "blur"}],
  username: [{required: true, message: "请输入名称", trigger: "blur"}],
  password: [{required: true, message: "请输入密码", trigger: "blur"}],
  password_confirm: [
    {required: true, message: "请再次输入密码", trigger: "blur"},
  ],
  roles: [{required: true, message: "请选择角色", trigger: ['blur', 'change']}],
});

// 1.定义内部的属性
const dialogVisible = ref(false);
const formData = reactive<any>({
  account: "",
  username: "",
  password: "",
  password_confirm: "",
  roles: [],
  status: true,
});
const isNewRef = ref(true);
const editData = ref();

// 2.获取roles/departments数据
const mainStore = useMainStore();
const systemStore = useSystemStore();
const {entireRoles} = storeToRefs(mainStore);

// 2.定义设置dialogVisible方法
function setModalVisible(isNew: boolean = true, itemData?: any) {
  formRef.value?.resetFields();
  dialogVisible.value = true;
  isNewRef.value = isNew;
  if (!isNew && itemData) {
    const itemDataTemp = JSON.parse(JSON.stringify(itemData));
    // 编辑数据
    for (const key in formData) {
      formData[key] = itemDataTemp[key];
    }
    formData.roles = itemDataTemp.roles.map((item: any) => item.id);
    formData.status = itemDataTemp.status == 1;
    editData.value = itemDataTemp;
  } else {
    // 新建数据
    for (const key in formData) {
      formData[key] = "";
    }
    formData.status = true;
    editData.value = null;
  }
}

// 表单
const formRef = ref<FormInstance>();

// 3.点击了确定的逻辑
function handleConfirmClick() {
  formRef.value!.validate((valid) => {
    if (valid) {
      dialogVisible.value = false;
      const formDataTemp = JSON.parse(JSON.stringify(formData));
      formDataTemp.status = formDataTemp.status ? 1 : 0;
      if (!isNewRef.value && editData.value) {
        // 编辑用户的数据
        systemStore.editPageDataAction("user", editData.value.id, formDataTemp);
      } else {
        // 创建新的用户
        systemStore.newPageDataAction("user", formDataTemp);
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
