<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建菜单' : '编辑菜单'"
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
          <el-form-item label="菜单类型" prop="type" required>
            <el-radio-group v-model="formData.type">
              <el-radio :label="MenuEnum.CATALOGUE">目录</el-radio>
              <el-radio :label="MenuEnum.MENU">菜单</el-radio>
              <el-radio :label="MenuEnum.BUTTON">按钮</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="父级菜单" prop="pid">
            <el-tree-select
              class="flex-1"
              v-model="formData.pid"
              :data="menus"
              clearable
              node-key="id"
              :props="{ label: 'name' }"
              :default-expand-all="true"
              placeholder="请选择父级菜单"
              check-strictly
            />
          </el-form-item>
          <el-form-item label="菜单名称" prop="name" required>
            <el-input
              v-model="formData.name"
              placeholder="请输入菜单名称"
              clearable
            />
          </el-form-item>

          <el-form-item
            v-if="formData.type != MenuEnum.BUTTON"
            label="菜单图标"
            prop="icon"
          >
            <SelectIcon v-model:iconValue="formData.icon"/>
          </el-form-item>

          <el-form-item label="路由路径" prop="path" required>
            <el-input v-model="formData.path" placeholder="请输入路由路径" clearable/>
          </el-form-item>


          <el-form-item
            v-if="formData.type != MenuEnum.BUTTON"
            label="是否隐藏"
            prop="hidden"
            required
          >
            <div>
              <el-radio-group v-model="formData.hidden">
                <el-radio :label="0">显示</el-radio>
                <el-radio :label="1">隐藏</el-radio>
              </el-radio-group>
              <div class="form-tips">
                选择隐藏则路由将不会出现在侧边栏，但仍然可以访问
              </div>
            </div>
          </el-form-item>
          <el-form-item
            v-if="formData.type != MenuEnum.BUTTON"
            label="菜单状态"
            prop="status"
            required
          >
            <div>
              <el-radio-group v-model="formData.status">
                <el-radio :label="1">正常</el-radio>
                <el-radio :label="0">停用</el-radio>
              </el-radio-group>
              <div class="form-tips">选择停用则路由将不会出现在侧边栏，也不能被访问</div>
            </div>
          </el-form-item>
          <el-form-item label="菜单排序" prop="sort">
            <div>
              <el-input-number v-model="formData.sort" :min="0" :max="9999"/>
              <div class="form-tips">数值越大越排前</div>
            </div>
          </el-form-item>

          <el-form-item label="备注" prop="description">
            <el-input v-model="formData.description" placeholder="请输入备注"/>
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
import SelectIcon from "@/components/select-icon/index.vue";
import { MenuEnum } from "@/global/constants";
import { editMenuApi, getMenuListApi, newMenuApi } from "@/api/system";
// 定义事件
const emit = defineEmits(["getPageListData"]);

// 表单校验规则
const formRules = reactive({
  name: [{required: true, message: "请输入名称", trigger: "blur"}],
  path: [{required: true, message: "请输入路由路径", trigger: "blur"}],
  pid: [
    {required: true, message: "请选择父级菜单", trigger: ["blur", "change"]},
  ],
});

// 1.定义内部的属性
const dialogVisible = ref(false);
const formData = reactive<any>({
  type: MenuEnum.CATALOGUE,
  pid: 0,
  name: "",
  icon: "",
  path: "",
  description: "",
  status: 1,
  hidden: 0,
  sort: 0
});
const isNewRef = ref(true);
const editData = ref();

const treeProps = {
  children: "children",
  label: "name",
};
const menus = ref();


// 2.定义设置dialogVisible方法
async function setModalVisible(isNew: boolean = true, itemData?: any) {
  formRef.value?.resetFields();
  dialogVisible.value = true;
  isNewRef.value = isNew;

  // 获取所有权限
  const menuResult = await getMenuListApi();
  menuResult.data.unshift({id: 0, name: "顶级", children: []});
  menus.value = menuResult.data;

  if (!isNew && itemData) {
    const itemDataTemp = JSON.parse(JSON.stringify(itemData));
    // 编辑数据
    for (const key in formData) {
      formData[key] = itemDataTemp[key];
    }
    formData.hidden = formData.hidden ? 1 : 0;
    editData.value = itemDataTemp;
  } else {
    // 新建数据
    for (const key in formData) {
      formData[key] = "";
    }
    formData.type = MenuEnum.CATALOGUE;
    formData.pid = 0;
    formData.hidden = 0;
    formData.status = 1;
    formData.sort = 0;
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
      formDataTemp.hidden = formDataTemp.hidden === 1;
      if (!isNewRef.value && editData.value) {
        // 编辑用户的数据
        await editMenuApi(editData.value.id, formDataTemp);
        dialogVisible.value = false;
        emit("getPageListData");
      } else {
        // 创建新的用户
        await newMenuApi(formDataTemp);
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
