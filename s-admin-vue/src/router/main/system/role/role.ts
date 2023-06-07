export default {
  path: "/main/system/role",
  name: "role",
  meta: { title:'角色管理', notNeedCache: false },
  component: () => import("@/views/main/system/role/role.vue"),
};
