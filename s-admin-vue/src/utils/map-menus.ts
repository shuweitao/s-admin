import router from "@/router";
import { RouteRecordRaw } from "vue-router";
import useTagsViewStore from "@/store/layout/tags-view";
import useLoginStore from "@/store/login/login";

function loadLocalRoutes() {
  // 1.动态获取所有的路由对象，放到数组中
  // 路由对象都在独立的文件中
  // 从文件中将所有路由对象先读取到数组中
  const localRoutes: RouteRecordRaw[] = [];

  // 1.1 读取router/main所有的ts文件
  const files: Record<string, any> = import.meta.glob("@/router/main/**/*.ts", {
    eager: true, // 不需要懒加载组件
  });

  // 1.2 将加载的对象放到localRoutes
  for (const key in files) {
    const module = files[key];
    localRoutes.push(module.default);
  }

  return localRoutes;
}

export let firstMenu: any = null;

export function mapMenusToRoutes(userMenus: Record<string, any>[]) {
  const localRoutes = loadLocalRoutes();
  // console.log(localRoutes);
  let routes: RouteRecordRaw[] = [];
  addHomeRoute(routes);

  for (const menu of userMenus) {
    if (menu.children) {
      for (const submenu of menu.children) {
        const route = localRoutes.find((item) => item.path === submenu.path);
        if (route) {
          // 1.给route的顶层菜单增加重定向功能(但是只需要添加一次即可)
          if (!routes.find((item) => item.path === menu.path)) {
            routes.push({path: menu.path, redirect: route.path});
          }

          routes.push(route);
        }
        // 记录第一个被匹配到的菜单
        if (!firstMenu && route) firstMenu = submenu;
      }
    } else {
      const route = localRoutes.find((item) => item.path === menu.path);
      if (route) {
        if (!firstMenu && route) firstMenu = menu;
      }
    }
  }
  // console.log(routes);
  return routes;
}

/**
 * 根据路径去匹配需要显示的菜单
 * @param path 需要匹配的路径
 * @param userMenus 所有的菜单
 */
export function mapPathToMenu(path: string, userMenus: Record<string, any>[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.path === path) {
        return submenu;
      }
    }
  }
}

interface IBreadcrumbs {
  name: string;
  path: string;
}

export function mapPathToBreadcrumbs(
  path: string,
  userMenus: Record<string, any>[]
) {
  // 1.定义面包屑
  const breadcrumbs: IBreadcrumbs[] = [];

  // 2.遍历获取面包屑层级
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.path === path) {
        // 1.顶层菜单
        breadcrumbs.push({name: menu.name, path: menu.path});
        // 2.匹配菜单
        breadcrumbs.push({name: submenu.name, path: submenu.path});
      }
    }
  }
  return breadcrumbs;
}

// 添加首页
export function addHomeRoute(routes: RouteRecordRaw[]) {
  const localRoutes = loadLocalRoutes();
  const route = localRoutes.find((item) => item.name === "home");
  if (route) {
    const tagsViewStore = useTagsViewStore();
    tagsViewStore.addFixedVisitedView(route);
    tagsViewStore.addCacheView(route.name as string);

    const loginStore = useLoginStore();
    loginStore.userMenus.unshift(route);
    // 记录第一个被匹配到的菜单
    if (!firstMenu && route) firstMenu = route;
    routes.push(route);
  }
}
