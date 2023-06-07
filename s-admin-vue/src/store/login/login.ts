import { defineStore } from "pinia";
import { IAccount } from "@/types";
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenuByRoleId,
} from "@/api/login";
import { localCache } from "@/utils/cache";
import router from "@/router";
import { TOKEN, USER_INFO, USER_MENUS } from "@/global/constants";
import { RouteRecordRaw } from "vue-router";
import { mapMenusToRoutes } from "@/utils/map-menus";
import useMainStore from "@/store/main/main";

const json = [{
  "id": 1,
  "name": "系统管理",
  "type": 1,
  "url": "/main/system",
  "icon": "el-icon-setting",
  "sort": 2,
  "children": [{
    "id": 2,
    "url": "/main/system/user",
    "name": "用户管理",
    "sort": 100,
    "type": 2,
    "children": [{
      "id": 5,
      "url": null,
      "name": "创建用户",
      "sort": null,
      "type": 3,
      "parentId": 2,
      "permission": "system:users:create"
    }, {
      "id": 6,
      "url": null,
      "name": "删除用户",
      "sort": null,
      "type": 3,
      "parentId": 2,
      "permission": "system:users:delete"
    }, {
      "id": 7,
      "url": null,
      "name": "修改用户",
      "sort": null,
      "type": 3,
      "parentId": 2,
      "permission": "system:users:update"
    }, {
      "id": 8,
      "url": null,
      "name": "查询用户",
      "sort": null,
      "type": 3,
      "parentId": 2,
      "permission": "system:users:query"
    }],
    "parentId": 1
  }, {
    "id": 3,
    "url": "/main/system/department",
    "name": "部门管理",
    "sort": 101,
    "type": 2,
    "children": [{
      "id": 17,
      "url": null,
      "name": "创建部门",
      "sort": null,
      "type": 3,
      "parentId": 3,
      "permission": "system:department:create"
    }, {
      "id": 18,
      "url": null,
      "name": "删除部门",
      "sort": null,
      "type": 3,
      "parentId": 3,
      "permission": "system:department:delete"
    }, {
      "id": 19,
      "url": null,
      "name": "修改部门",
      "sort": null,
      "type": 3,
      "parentId": 3,
      "permission": "system:department:update"
    }, {
      "id": 20,
      "url": null,
      "name": "查询部门",
      "sort": null,
      "type": 3,
      "parentId": 3,
      "permission": "system:department:query"
    }],
    "parentId": 1
  }, {
    "id": 4,
    "url": "/main/system/menu",
    "name": "菜单管理",
    "sort": 103,
    "type": 2,
    "children": [{
      "id": 21,
      "url": null,
      "name": "创建菜单",
      "sort": null,
      "type": 3,
      "parentId": 4,
      "permission": "system:menu:create"
    }, {
      "id": 22,
      "url": null,
      "name": "删除菜单",
      "sort": null,
      "type": 3,
      "parentId": 4,
      "permission": "system:menu:delete"
    }, {
      "id": 23,
      "url": null,
      "name": "修改菜单",
      "sort": null,
      "type": 3,
      "parentId": 4,
      "permission": "system:menu:update"
    }, {
      "id": 24,
      "url": null,
      "name": "查询菜单",
      "sort": null,
      "type": 3,
      "parentId": 4,
      "permission": "system:menu:query"
    }],
    "parentId": 1
  }, {
    "id": 25,
    "url": "/main/system/role",
    "name": "角色管理",
    "sort": 102,
    "type": 2,
    "children": [{
      "id": 26,
      "url": null,
      "name": "创建角色",
      "sort": null,
      "type": 3,
      "parentId": 25,
      "permission": "system:role:create"
    }, {
      "id": 27,
      "url": null,
      "name": "删除角色",
      "sort": null,
      "type": 3,
      "parentId": 25,
      "permission": "system:role:delete"
    }, {
      "id": 28,
      "url": null,
      "name": "修改角色",
      "sort": null,
      "type": 3,
      "parentId": 25,
      "permission": "system:role:update"
    }, {
      "id": 29,
      "url": null,
      "name": "查询角色",
      "sort": null,
      "type": 3,
      "parentId": 25,
      "permission": "system:role:query"
    }],
    "parentId": 1
  }]
}, {
  "id": 41,
  "name": "博客中心",
  "type": 1,
  "url": "/main/story",
  "icon": "el-icon-chat-line-round",
  "sort": 4,
  "children": [{
    "id": 42,
    "url": "/main/story/chat",
    "name": "你的故事",
    "sort": 108,
    "type": 2,
    "children": null,
    "parentId": 41
  }]
}]

interface ILoginStore {
  token: string;
  userInfo: Record<string, any>;
  userMenus: Record<string, any>[];
  permissions: Record<string, any>[];
}

const useLoginStore = defineStore("login", {
  state: (): ILoginStore => ({
    token: localCache.getCache(TOKEN) ?? "",
    userInfo: localCache.getCache(USER_INFO) ?? {},
    userMenus: localCache.getCache(USER_MENUS) ?? [],
    permissions: [],
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.登录
      const res = await accountLoginRequest(account);
      this.token = res.data.token;
      const id = res.data.id;

      // 2.进行本地缓存
      localCache.setCache(TOKEN, this.token);

      // 3.获取用户信息（role）
      const userInfoResult = await getUserInfoById(id);
      const userInfo = userInfoResult.data;
      this.userInfo = userInfo;
      // 4.根据角色获取权限
      const roles = userInfo.roles.map((item: any) => item.id)
      const userMenusResult = await getUserMenuByRoleId(roles);

      const userMenus = userMenusResult.data.permissions;
      // const r = {
      //   id: 999,
      //   name: "测试",
      //   url: "/main/home/home",
      //   // hidden: true,
      // };
      // userMenus[0].children.push(r);
      this.userMenus = userMenus;

      // 5.进行本地存储
      localCache.setCache(USER_INFO, userInfo);
      // localCache.setCache(USER_MENUS, userMenus);

      // 重要: 动态的添加路由
      const routes = mapMenusToRoutes(userMenus);
      routes.forEach((route: RouteRecordRaw) => router.addRoute("main", route));

      // 5.跳转到主页
      router.replace("/main");
    },

    // 页面刷新 重新渲染
    loadLocalCacheAction() {
      const token = localCache.getCache(TOKEN);
      const userInfo = localCache.getCache(USER_INFO);
      const userMenus = localCache.getCache(USER_MENUS);

      // 2.动态添加路由
      if (token && userInfo && userMenus) {
        const routes = mapMenusToRoutes(userMenus);
        routes.forEach((route) => router.addRoute("main", route));
      }
    },

    // 页面刷新 请求接口重新渲染左边菜单
    async getUserMenuByRoleId() {
      const token = localCache.getCache(TOKEN);
      if (token) {
        const userInfo = localCache.getCache(USER_INFO);
        const roles = userInfo.roles.map((item: any) => item.id)
        const userMenusResult = await getUserMenuByRoleId(roles);
        const userMenus = userMenusResult.data.permissions;
        this.userMenus = userMenus;
        localCache.setCache(USER_MENUS, userMenus);

        // 2.动态添加路由
        if (token && userInfo && userMenus) {
          const routes = mapMenusToRoutes(userMenus);
          routes.forEach((route) => router.addRoute("main", route));
        }
      }
    },
  },
  getters: {},
});

export default useLoginStore;
