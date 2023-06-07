<template>
  <div class="article-edit">
    <el-card class="!border-none mb_10" shadow="never">
      <el-page-header
        :content="$route.meta.title as string"
        @back="removeTab"
      />
    </el-card>
    <el-card shadow="never">
      <el-form
        ref="formRef"
        class="ls-form"
        :model="formData"
        label-width="85px"
        :rules="rules"
      >
        <div class="flex">
          <div>
            <el-form-item label="文章标题" prop="title">
              <div class="w_320">
                <el-input
                  v-model="formData.title"
                  placeholder="请输入文章标题"
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 3 }"
                  maxlength="64"
                  show-word-limit
                  clearable
                />
              </div>
            </el-form-item>
            <el-form-item label="文章栏目" prop="category_id">
              <el-select
                class="w_320"
                v-model="formData.category_id"
                placeholder="请选择文章栏目"
                clearable
              >
                <el-option
                  v-for="item in article_cate"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="文章简介" prop="desc">
              <div class="w_320">
                <el-input
                  v-model="formData.desc"
                  placeholder="请输入文章简介"
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 6 }"
                  :maxlength="200"
                  show-word-limit
                  clearable
                />
              </div>
            </el-form-item>
            <el-form-item label="摘要" prop="abstract">
              <div class="w_320">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 6, maxRows: 6 }"
                  v-model="formData.abstract"
                  maxlength="200"
                  show-word-limit
                  clearable
                />
              </div>
            </el-form-item>
            <el-form-item label="文章封面" prop="image">
              <div>
                <el-upload
                  class="avatar-uploader"
                  action="/api/upload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img
                    v-if="formData.image"
                    :src="formData.image"
                    class="avatar"
                  />
                  <el-icon v-else class="avatar-uploader-icon">
                    <Plus />
                  </el-icon>
                </el-upload>
                <div class="form-tips">建议尺寸：240*180px</div>
              </div>
            </el-form-item>
            <el-form-item label="作者" prop="author">
              <div class="w_320">
                <el-input
                  v-model="formData.author"
                  placeholder="请输入作者名称"
                />
              </div>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <div>
                <el-input-number v-model="formData.sort" :min="0" :max="9999" />
                <div class="form-tips">默认为0， 数值越大越排前</div>
              </div>
            </el-form-item>
            <el-form-item label="初始浏览量" prop="click">
              <div>
                <el-input-number v-model="formData.click" :min="0" />
              </div>
            </el-form-item>
            <el-form-item label="文章状态" required prop="status">
              <el-radio-group v-model="formData.status">
                <el-radio :label="1">显示</el-radio>
                <el-radio :label="0">隐藏</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div class="ml_20">
            <el-form-item label="文章内容" prop="content">
              <editor v-model="formData.content" :height="667" :width="375" />
            </el-form-item>
          </div>
        </div>
      </el-form>
    </el-card>
    <el-button type="primary" @click="handleSave">保存</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import type { FormInstance } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import { reactive, ref, shallowRef } from "vue";
import {
  getCategoryListApi,
  newArticleApi,
  editArticleApi,
  getArticleDetailApi,
} from "@/api/article";
import Editor from "@/components/editor/index.vue";
import type { UploadProps } from "element-plus";

import useTagsViewStore from "@/store/layout/tags-view";

const tagsViewStore = useTagsViewStore();

const route = useRoute();
const router = useRouter();
type articleInfo = {
  id?: number;
  title: string;
  image: string;
  category_id: number;
  desc: string;
  author: string;
  content: string;
  click: number;
  sort: number;
  status: number;
  abstract: string;
};
const formData = reactive<articleInfo>({
  id: 0,
  title: "",
  image: "",
  category_id: 0,
  desc: "",
  author: "",
  content: "",
  click: 0,
  sort: 0,
  status: 1,
  abstract: "",
});

const formRef = shallowRef<FormInstance>();
const rules = reactive({
  title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
  category_id: [{ required: true, message: "请选择文章栏目", trigger: "blur" }],
});
const article_cate = ref<Record<string, any>>([]);
getCategoryListApi().then((res) => {
  article_cate.value = res.data.list;
});

const getDetails = async () => {
  if (route.query.id) {
    const data = await getArticleDetailApi(+route.query.id);
    Object.keys(formData).forEach((key) => {
      //@ts-ignore
      formData[key] = data.data[key];
    });
  }
};

const removeTab = () => {
  tagsViewStore.deleteVisitedView(route.name as string);
  tagsViewStore.deleteCacheView(route.name as string);

  router.back();
};
const handleSave = async () => {
  await formRef.value?.validate();
  if (route.query.id) {
    await editArticleApi(formData.id!, formData);
  } else {
    delete formData.id;
    await newArticleApi(formData);
  }
  removeTab();
};

const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  // formData.image = URL.createObjectURL(uploadFile.raw!)
  formData.image = response.data.url;
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type.indexOf("image") == -1) {
    ElMessage.error("请选择图片");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("图片不能大于 2MB!");
    return false;
  }
  return true;
};

route.query.id && getDetails();
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
