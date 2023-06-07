<template>
  <div class="border border_br flex flex_direction_column" :style="styles">
    <toolbar
      class="border_b border_br"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <w-editor
      class="overflow_y_auto flex_1"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>
<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor as WEditor, Toolbar } from "@wangeditor/editor-for-vue";
import type { IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
import { addUnit } from "@/utils/util";
import { computed, CSSProperties, onBeforeUnmount, ref, shallowRef } from "vue";
import { UploadInstance } from "element-plus";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    mode?: "default" | "simple";
    height?: string | number;
    width?: string | number;
    toolbarConfig?: Partial<IToolbarConfig>;
  }>(),
  {
    modelValue: "",
    mode: "default",
    height: "100%",
    width: "auto",
    toolbarConfig: () => ({}),
  }
);

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();
const uploadRef = ref<UploadInstance>();
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
const fileType = ref("");

type InsertFnType = (url: string, alt: string, href: string) => void;
let insertFn: InsertFnType;

const fileConfig = {
  server: "/api/upload",
  fieldName: "file",
  // 自定义插入图片
  customInsert(res: any, insertFn: InsertFnType) {
    // TS 语法
    // customInsert(res, insertFn) {                  // JS 语法
    // res 即服务端的返回结果

    // 从 res 中找到 url alt href ，然后插入图片
    insertFn(res.data.url, "", res.data.url);
  },
};
const editorConfig: Partial<IEditorConfig> = {
  MENU_CONF: {
    uploadImage: fileConfig,
    uploadVideo: fileConfig,
  },
};

const styles = computed<CSSProperties>(() => ({
  height: addUnit(props.height),
  width: addUnit(props.width),
}));
const valueHtml = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
</script>

<style lang="scss">
.w-e-full-screen-container {
  z-index: 999;
}

.w-e-text-container [data-slate-editor] ul {
  list-style: disc;
}

.w-e-text-container [data-slate-editor] ol {
  list-style: decimal;
}

h1 {
  font-size: 2em;
}

h2 {
  font-size: 1.5em;
}

h3 {
  font-size: 1.17em;
}

h4 {
  font-size: 1em;
}

h5 {
  font-size: 0.83em;
}

h1,
h2,
h3,
h4,
h5 {
  font-weight: bold;
}

.border {
  border: 1px solid var(--el-border-color);
}

.border_br {
  border-color: var(--el-border-color);
}

.border_b {
  border-bottom-width: 1px;
}

.overflow_y_auto {
  overflow-y: auto;
}
</style>
