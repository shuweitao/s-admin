import { App } from "vue";
import { createPinia, PiniaPluginContext } from "pinia";
import { sessionCache } from "@/utils/cache";
import useLoginStore from "./login/login";

const pinia = createPinia();

const piniaPlugin = (context: PiniaPluginContext) => {
  const { store } = context;
  // $subscribe state值发生变化时会执行传入的回调
  store.$subscribe(() => {
    // 每次修改值的时候更新localStorage数据
    sessionCache.setCache(store.$id, store.$state);
  });
  // 每次构建项目的时候从本地存储取值
  const data = sessionCache.getCache(store.$id);
  // 并将取的值赋给state
  return {
    ...data,
  };
};

pinia.use(piniaPlugin);
function registerStore(app: App) {
  app.use(pinia);
  // const loginStore = useLoginStore();
  // loginStore.loadLocalCacheAction();
}

export async function getUserMenuByRoleId() {
  const loginStore = useLoginStore();
  await loginStore.getUserMenuByRoleId();
}
export default registerStore;
