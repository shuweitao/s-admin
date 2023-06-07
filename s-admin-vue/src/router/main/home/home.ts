const home = () => import("@/views/main/home/home.vue");
export default {
  url: "/main/home/home",
  path: "/main/home/home",
  fullPath: "/main/home/home",
  icon: "House",
  name: "home",
  meta: {title: "首页", fixed: true},
  component: home,
  children: [],
};
