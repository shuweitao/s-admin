<template>
  <!-- 中间盒子 -->
  <div class="content" @keyup.enter="login">
    <h3 class="t_center c_fff">登录</h3>
    <el-form ref="formRef" :model="param" :rules="rules">
      <el-form-item prop="name">
        <el-input class="input" v-model="param.account" :prefix-icon="User" placeholder="账号">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          class="input"
          v-model="param.password"
          :prefix-icon="Lock"
          placeholder="密码"
          show-password
          autocomplete="{{ true }}"
        ></el-input>
      </el-form-item>

      <!--        <el-form-item prop="code">
                <div style="flex:1;display:flex">
                  <el-input
                    v-model="param.code"
                    prefix-icon="el-icon-user"
                    placeholder="验证码"/>
                  <img style="position: absolute;right:0;height: 100%;border-radius: 4px;" @click="resetCode" :src="codeUrl"
                       alt="">
                </div>
              </el-form-item>-->

      <el-button class="w_100" size="large" type="primary" @click="login"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import { ElMessage, FormInstance } from "element-plus";
import useLoginStore from "@/store/login/login";
import { IAccount } from "@/types";

// 请求参数
const param = reactive<IAccount>({
  account: "admin",
  password: "123456",
});
// 表单校验规则
const rules = reactive({
  account: [
    { required: true, message: "请输入账号", trigger: "blur" },
    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
  ],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

// 表单
const formRef = ref<FormInstance>();
// 登录
const login = () => {
  formRef.value!.validate((valid) => {
    if (valid) {
      const loginStore = useLoginStore();
      loginStore.loginAccountAction(param).then(() => {});
    } else {
      ElMessage.error("Oops, 请您输入正确的格式后再操作~~.");
      return false;
    }
  });
};
</script>
<style lang="scss" scoped>
.content {
  width: 460px;
  margin-top: 200px;

  h3 {
    font-size: 30px;
  }

  .el-form {
    padding-top: 30px;

    .el-form-item {
      border-radius: 4px;
    }
  }

   .input {
    height: 50px;
    font-size: 16px;
    background-color: transparent;
    border: none;
    color: #fff;
  }
}

// :deep(.el-input__wrapper) {
//   height: 50px;
//   font-size: 16px;
//   background-color: transparent;
//   border: none;
//   color: #fff;
// }

</style>
