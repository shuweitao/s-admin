<template>
  <div class="visited_views">
    <template v-for="view in visitedViews" :key="view.name">
      <div
        class="fontsize_12 c_666 pointer"
        :class="{ active: currentRoute.name === view.name }"
        @click="goTargetView(view)"
        @contextmenu.prevent="mouseRightClick(view, $event)"
      >
        {{ view.meta.title }}
        <el-icon
          v-if="view.meta && !view.meta.fixed"
          :size="14"
          @click.stop="delTargetVisited(view.name)"
        >
          <Close class="close" />
        </el-icon>
      </div>
    </template>
    <ul
      v-show="visible"
      ref="menu"
      class="menu bg_fff fontsize_13 pointer c_333"
    >
      <li @click="refresh">刷新</li>
      <li
        v-if="mouseRightView?.data?.meta && !mouseRightView?.data?.meta?.fixed"
        @click="close"
      >
        关闭
      </li>
      <li @click="closeOther">关闭其他</li>
      <li @click="closeAll">关闭所有</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import useTagsViewStore from "@/store/layout/tags-view";
const router = useRouter();
const route = useRoute();

const tagsViewStore = useTagsViewStore();
const visitedViews = computed(() => tagsViewStore.visitedViews);

const currentRoute = computed(() => route);
console.log("swt", visitedViews);

// 跳转目标路由
const goTargetView = (view: Record<string, any>) => {
  router.push(view);
};
// 删除已访问路由
const delTargetVisited = (name: string) => {
  tagsViewStore.deleteVisitedView(name);
  tagsViewStore.deleteCacheView(name);
  // 如果删除的是active路由，跳转访问路由最后一个
  if (name === route.name) {
    const visitedViews = tagsViewStore.visitedViews;
    router.push({ name: visitedViews[visitedViews.length - 1].name });
  }
};
// 当前右键view
const mouseRightView = reactive({
  data: { name: "", meta: { fixed: false } },
});
// 右键菜单html
const menu = ref();
// 右键菜单是否显示
const visible = ref(false);
// 隐藏右键菜单
const hideMenu = () => {
  visible.value = false;
};
// 显示右键菜单
const showMenu = (left: number, top: number) => {
  // 浏览器添加click关闭右键菜单
  window.addEventListener("click", hideMenu);
  visible.value = true;
  menu.value.style.left = `${left}px`;
  menu.value.style.top = `${top + 10}px`;
};
// 鼠标右键点击
const mouseRightClick = (view: any, e: any) => {
  // 存储右键view
  mouseRightView.data = view;
  // 显示右键菜单
  showMenu(e.clientX, e.clientY);
};
// 刷新右键路由
const refresh = async () => {
  await tagsViewStore.deleteCacheView(mouseRightView.data.name);
  if (mouseRightView.data.name === route.name) {
    await router.push("/main");
    router.replace({ name: mouseRightView.data.name });
  } else {
    router.push({ name: mouseRightView.data.name });
  }
};
// 关闭右键路由
const close = () => {
  delTargetVisited(mouseRightView.data.name);
};
// 右键关闭其他
const closeOther = () => {
  tagsViewStore.deleteOtherVisitedView(mouseRightView.data);
  if (mouseRightView.data.name !== route.name) {
    router.push({ name: mouseRightView.data.name });
  }
};
// 右键关闭所有
const closeAll = () => {
  tagsViewStore.clearCacheView();
  tagsViewStore.clearVisitedView();
  const visitedViews = tagsViewStore.visitedViews;
  router.push({ name: visitedViews[visitedViews.length - 1].name });
};
</script>

<style lang="scss" scoped>
.visited_views {
  height: 40px;
  line-height: 40px;
  overflow-y: hidden;
  overflow-x: auto;
  white-space: nowrap;
  padding-left: 15px;
  padding-right: 15px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%);

  > div {
    height: 26px;
    margin-right: 5px;
    padding: 0 10px;
    display: inline-block;
    line-height: 26px;
    border: 1px solid #ccc;
    border-radius: 2px;

    &.active {
      background: var(--el-color-primary);
      border: 1px solid var(--el-color-primary);
      color: var(--color-white);
    }

    .el-icon {
      vertical-align: -3px;
    }
  }

  .menu {
    padding: 5px 0;
    position: absolute;
    z-index: 9999;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    border-radius: 5px;

    > li {
      padding: 0 15px;
      height: 30px;
      line-height: 30px;

      &:hover {
        background: #eee;
      }
    }
  }
}

.visited_views::-webkit-scrollbar {
  height: 4px;
}

.visited_views::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}

.visited_views::-webkit-scrollbar-track {
  border-radius: 0;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.1);
}

.close {
  &:hover {
    border-radius: 50%;
    background-color: var(--el-color-danger);
    color: var(--color-white);
  }
}
</style>
