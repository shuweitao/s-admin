<template>
  <div class="table-box">
    <use-search
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <user-content
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    />
    <user-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import UseSearch from "./c-cpns/user-search.vue";
import UserContent from "./c-cpns/user-content.vue";
import UserModal from "./c-cpns/user-modal.vue";
import { ref } from "vue";

// 对content组件的操作
const contentRef = ref<InstanceType<typeof UserContent>>();
const handleQueryClick = (formData: any) => {
  contentRef.value?.fetchPageListData(formData);
};

const handleResetClick = () => {
  contentRef.value?.fetchPageListData();
};

// 对modal组件的操作
const modalRef = ref<InstanceType<typeof UserModal>>();
function handleNewClick() {
  modalRef.value?.setModalVisible();
}
function handleEditClick(itemData: any) {
  console.log(itemData);
  modalRef.value?.setModalVisible(false, itemData);
}
</script>

<style lang="scss" scoped></style>
