export default {
  path: "/main/system/test",
  name: "test",
  meta: { title:'测试', notNeedCache: false },
  component: () => import("@/views/main/system/test/test.vue"),
};
