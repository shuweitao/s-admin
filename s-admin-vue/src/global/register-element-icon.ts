import { App } from "vue";
/*
import {
  Expand,
  Fold,
  Close,
  Menu,
  HomeFilled,
} from "@element-plus/icons-vue";


const components = [
  Expand,
  Fold,
  Close,
  Menu,
  HomeFilled,
];

export function registerElementIcon(app: App) {
  for (const cpn of components) {
    app.component(cpn.name, cpn);
  }
}
*/


import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export function registerElementIcon(app: App) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
