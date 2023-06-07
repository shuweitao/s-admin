import { createApp } from "vue";
import "normalize.css";
import "@/styles/index.scss";
import App from "@/App.vue";
import router from "@/router";
import store, { getUserMenuByRoleId } from "@/store";
import { globalRegister } from "@/global";

async function bootstrap() {
  const app = createApp(App);
  app.use(globalRegister);
  app.use(store);
  await getUserMenuByRoleId();
  app.use(router);
  app.mount("#app");
}

bootstrap();
