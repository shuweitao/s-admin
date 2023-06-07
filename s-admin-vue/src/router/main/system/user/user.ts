export default {
  path: "/main/system/user",
  name: "user",
  meta: { title:'用户管理', notNeedCache: false },
  component: () => import("@/views/main/system/user/user.vue"),
};
