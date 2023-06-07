import { defineStore } from "pinia";
import { mapMenusToRoutes } from "@/utils/map-menus";
import { localCache } from "@/utils/cache";
import { USER_MENUS } from "@/global/constants";
import { RouteLocationNormalized, RouteRecordName } from "vue-router";

const userMenus = localCache.getCache(USER_MENUS);

// const routes = mapMenusToRoutes(userMenus);

interface ITagsViewStore {
  // 缓存路由
  cachedViews: string[],
  // 固定tabbar的路由
  fixedVisitedViews: Record<string, any>[],
  // 访问过的路由
  visitedViews: Record<string, any>[],
}


const useTagsViewStore = defineStore("tags-view", {
  state: (): ITagsViewStore => ({
    // 缓存路由
    cachedViews: [],
    // 固定tabbar的路由
    fixedVisitedViews: [],
    // 访问过的路由
    visitedViews: [],
  }),
  getters: {
    // 获取缓存路由
    getCacheView: (state) => state.cachedViews,
    getVisitedView: (state) => state.visitedViews,
    getFixedVisitedViews: (state) => state.fixedVisitedViews
  },
  actions: {
    // 添加缓存路由
    addCacheView(name: string) {
      if (this.cachedViews.indexOf(name) === -1) this.cachedViews.push(name);
    },
    // 删除缓存路由
    async deleteCacheView(name: string) {
      const index = this.cachedViews.indexOf(name);
      if (index > -1) this.cachedViews.splice(index, 1);
    },
    // 清空缓存路由
    clearCacheView() {
      this.cachedViews = [];
    },
    // 添加固定路由
    addFixedVisitedView(view: Partial<RouteLocationNormalized>) {
      if (!this.fixedVisitedViews.find((item) => item.name === view.name))
        this.fixedVisitedViews.push(view);
    },
    // 清空固定路由
    clearFixedVisitedView() {
      this.fixedVisitedViews = [];
    },
    // 添加访问过的路由
    addVisitedView(view: Partial<RouteLocationNormalized>) {
      if (!this.visitedViews.find((item) => item.name === view.name))
        this.visitedViews.push(view);
    },
    // 删除访问过的路由
    deleteVisitedView(name: string) {
      this.visitedViews = this.visitedViews.filter((item) => {
        return item.name !== name;
      });
    },
    // 删除其他访问过的路由
    deleteOtherVisitedView(view: Partial<RouteLocationNormalized>) {
      let visitedViews = [...this.fixedVisitedViews]
      if (view.name !== 'home') {
        visitedViews = [...this.fixedVisitedViews, view]
      }
      this.visitedViews = visitedViews;
    },
    // 清空访问过的路由
    clearVisitedView() {
      this.visitedViews = [...this.fixedVisitedViews];
    }

  },
});

export default useTagsViewStore;
