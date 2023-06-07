import {
  createRouter,
  createWebHashHistory,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";
import { localCache } from "@/utils/cache";
import { TOKEN } from "@/global/constants";
import { firstMenu } from "@/utils/map-menus";
import useTagsViewStore from "@/store/layout/tags-view";

/*
  config
    path                路径
    fullPath            完整路径
    name                唯一name 大驼峰
    redirect            重定向(默认 '')
    component           路由对应组件
    hidden:true         是否在左侧菜单隐藏(默认 false)
    meta
      title             名称 (默认 '')
      icon              左侧菜单icon (默认 '')
      notNeedAuth:true  该路由是否不需要鉴权(默认 false)
      notNeedCache:true    该路由是否需要缓存(默认 false)
      fixed:true        如果设置为true，该路由会固定在visited-view中(默认 false)
*/
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/login",
    name: "login",
    meta: { notNeedCache: true },
    component: () => import("@/views/login/login.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main/main.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    meta: { notNeedCache: true },
    component: () => import("@/views/not-found/not-found.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// const localRoutes = [
//   {
//     path: "/main/analysis/overview",
//     name: "overview",
//     component: () => import("@/views/main/analysis/overview/overview.vue"),
//   },
//   {
//     path: "/main/analysis/dashboard",
//     name: "dashboard",
//     component: () => import("@/views/main/analysis/dashboard/dashboard.vue"),
//   },
//   {
//     path: "/main/system/user",
//     name: "user",
//     component: () => import("@/views/main/system/user/user.vue"),
//   },
//   {
//     path: "/main/system/role",
//     name: "role",
//     component: () => import("@/views/main/system/role/role.vue"),
//   },
// ];

// router.addRoute("main", localRoutes[0]);

const whiteList = ["/login", "/not-found"]; // no redirect whitelist

router.beforeEach((to) => {
  // 只有登录成功(token), 才能真正进入到main页面
  const token = localCache.getCache(TOKEN);
  // if (!token) {
  //   localCache.clear();
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     next();
  //   } else {
  //     return "/login";
  //   }
  // }
  if (to.path === "/main" && !token) {
    return "/login";
  }
  // 如果是进入到main
  if (to.path === "/main") {
    return firstMenu?.url;
  }
});

// 路由后置守卫
router.afterEach((to: RouteLocationNormalized) => {
  const tagsViewStore = useTagsViewStore();
  // 添加路由缓存
  if (to.name && !to.meta.notNeedCache) {
    tagsViewStore.addCacheView(to.name as string);
  }
  // 添加访问过路由
  if (
    JSON.stringify(to.meta) !== "{}" &&
    !to.meta.notNeedCache &&
    !to.meta.notNeedAuth
  ) {
    const { fullPath, name, meta, params, query } = to;
    tagsViewStore.addVisitedView({
      fullPath,
      name,
      meta,
      params,
      query,
    });
  }
});

export default router;
